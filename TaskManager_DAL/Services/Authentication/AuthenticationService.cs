using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using TaskManager_Data.Entities;
using TaskManager_Utility.Helper;
using System.Data.SqlClient;
using System.Linq;
using TaskManager_Utility.Constant;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Globalization;
using TaskManager_DAL.Services.CommonService;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace TaskManager_DAL.Services.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        #region Fields
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private readonly ICommonService _iCommonService;
        private readonly IHostingEnvironment _IHostingEnvironment;
        #endregion

        public AuthenticationService(ILogger<AuthenticationService> logger, IConfiguration configuration, ICommonService commonService, IHostingEnvironment hostingEnvironment)
        {
            _logger = logger;
            _configuration = configuration;
            _iCommonService = commonService;
            _IHostingEnvironment = hostingEnvironment;
        }

        #region Methods

        public async Task<object> Login(Login login)
        {
            try
            {
                var dataSet = await Task.Run(
                    () =>
                        SQLHelper.ExecuteDataset(
                            _configuration.GetConnectionString("DefaultConnection"),
                            "SP_GetUserDetailsFromEmail",
                            new SqlParameter[] { new SqlParameter("@Email", login.Email), }
                        )
                );
                if (dataSet != null && dataSet.Tables != null && dataSet.Tables[0] != null)
                {
                    if (dataSet.Tables[0].Rows.Count > 0)
                    {
                        var userDTO = SQLHelper
                            .ConvertDataTableToGenericList<UserMaster>(dataSet.Tables[0])
                            .FirstOrDefault();

                        var isPasswordMatched = PasswordHashUtil.VerifyHashedPassword(
                            userDTO.Password,
                            login.Password
                        );
                        if (!userDTO.IsActive)
                        {
                            return StatusBuilder.ResponseFailStatus(Common.AccountInActive);
                        }
                        else if (!isPasswordMatched)
                        {
                            return StatusBuilder.ResponseFailStatus(Common.InvalidEmailOrPassword);
                        }

                        var securityKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
                        );
                        var credentials = new SigningCredentials(
                            securityKey,
                            SecurityAlgorithms.HmacSha256
                        );
                        var claims = new[]
                        {
                            new Claim(ClaimTypes.Email, userDTO.Email),
                            new Claim(ClaimTypes.Role, userDTO.RoleId.ToString()),
                            new Claim(ClaimTypes.NameIdentifier, userDTO.UserId.ToString()),
                            new Claim(ClaimTypes.Name, userDTO.FirstName+ ' '+userDTO.LastName)
                        };
                        var token = new JwtSecurityToken(
                            _configuration["Jwt:Issuer"],
                            _configuration["Jwt:Issuer"],
                            claims,
                            expires: DateTime.Now.AddMinutes(
                                Convert.ToDouble(_configuration["Jwt:TokenValidityInMinutes"])
                            ),
                            signingCredentials: credentials
                        );

                        LoginResponse loginResponse = new LoginResponse();
                        loginResponse.FirstName = userDTO.FirstName;
                        loginResponse.LastName = userDTO.LastName;
                        loginResponse.UserId = userDTO.UserId.ToString();
                        loginResponse.RoleId = userDTO.RoleId.ToString();
                        loginResponse.refreshToken = GenerateRefreshToken();

                        loginResponse.jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

                        return StatusBuilder.ResponseSuccessStatusWithValue(null, loginResponse);
                    }
                }
                return StatusBuilder.ResponseFailStatus(Common.InvalidEmailOrPassword);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusBuilder.ResponseFailStatus(Common.InvalidEmailOrPassword);
            }
        }

        public async Task<object> Register(UserMaster user)
        {
            try
            {
                string password = CultureInfo.CurrentCulture.DateTimeFormat.GetAbbreviatedMonthName(DateTime.UtcNow.Month) + "@" + DateTime.UtcNow.Year + "#";
                user.Password = PasswordHashUtil.HashPassword(password);

                user.Email = user.Email;

                var response = await Task.Run(() => SQLHelper.ExecuteDataset(_configuration.GetConnectionString("DefaultConnection"), "SP_RegisterUser",
                    new SqlParameter[]
                    {
                        new SqlParameter("@FirstName", user.FirstName),
                        new SqlParameter("@LastName", user.LastName),
                        new SqlParameter("@Email", user.Email),
                        new SqlParameter("@Password", user.Password)
                    }));

                if (response != null && response.Tables != null && response.Tables[0] != null)
                {
                    if (response.Tables[0].Rows.Count > 0 && (int)response.Tables[0].Rows[0][0] < 0)
                        return StatusBuilder.ResponseFailStatus(Common.AlreadyExistEmail);
                    else
                    {
                        // send new assigned mail
                        Dictionary<string, string> replacement = new Dictionary<string, string>();
                        replacement.Add("${{UserName}}$", user.FirstName + " " + user.LastName);
                        replacement.Add("${{Password}}$", password);
                        replacement.Add("${{UserEmail}}$", user.Email);
                        replacement.Add("${{URL}}$", _configuration.GetSection("Origins").GetSection("UrlStagingUI").Value);

                        string newPath = Path.Combine(_IHostingEnvironment.ContentRootPath, "ExternalFiles", "Templates", "WelcomeMail.html");
                        if (File.Exists(newPath))
                        {
                            string finaleTemplate = File.ReadAllText(newPath);
                            _iCommonService.SendEmail(finaleTemplate, replacement, "Welcome to Task Manager", user.Email, null);
                        }
                        return StatusBuilder.ResponseSuccessStatus(Common.RegisterSuccessfully);
                    }
                }
                else
                    return StatusBuilder.ResponseFailStatus(Common.FailedToRegister);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        ///Generate Refresh TOken Access
        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        //Refresh Token

        public async Task<object> RefreshToken(Token tokenModel)
        {
            if (tokenModel is null)
            {
                return StatusBuilder.ResponseFailStatus("Invalid client request");
            }

            string accessToken = tokenModel.jwtToken;
            string refreshToken = tokenModel.refreshTOken;

            var principal = GetPrincipalFromExpiredToken(accessToken);
            if (principal == null)
            {
                return StatusBuilder.ResponseFailStatus("Invalid access token or refresh token");
            }

            var oldlangualgeClaim = principal.Claims
                .Where(x => x.Type == "Language")
                .FirstOrDefault();
            principal.Claims.ToList().Remove(oldlangualgeClaim);
            principal.Claims.ToList().Add(new Claim("Language", tokenModel.language));

            var newAccessToken = CreateToken(principal.Claims.ToList());
            var newRefreshToken = GenerateRefreshToken();

            return StatusBuilder.ResponseSuccessStatusWithValue(
                null,
                new
                {
                    jwtToken = await Task.Run(
                        () => new JwtSecurityTokenHandler().WriteToken(newAccessToken)
                    ),
                    refreshToken = newRefreshToken
                }
            );
        }

        private JwtSecurityToken CreateToken(List<Claim> authClaims)
        {
            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
            );
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Issuer"],
                authClaims,
                expires: DateTime.Now.AddMinutes(
                    Convert.ToDouble(_configuration["Jwt:TokenValidityInMinutes"])
                ),
                signingCredentials: credentials
            );

            return token;
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
                ),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(
                token,
                tokenValidationParameters,
                out SecurityToken securityToken
            );

            return principal;
        }

        #endregion
    }
}
