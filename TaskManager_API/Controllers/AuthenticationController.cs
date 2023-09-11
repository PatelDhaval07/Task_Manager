using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager_DAL.Services.Authentication;
using TaskManager_Data.Entities;
using TaskManager_Utility.Helper;
using Microsoft.AspNetCore.Authorization;

namespace TaskManager_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class AuthenticationController : ControllerBase
    {
        #region Fields
        private readonly ILogger<AuthenticationController> _logger;
        private readonly IAuthenticationService _authenticationService;
        #endregion

        public AuthenticationController(ILogger<AuthenticationController> logger, IAuthenticationService authenticationService)
        {
            _logger = logger;
            _authenticationService = authenticationService;
        }


        #region Methods

        [HttpPost]
        [Route("login")]
        public async Task<object> Login(Login login)
        {
            try
            {
                return await _authenticationService.Login(login);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }


        [Route("Register")]
        [HttpPost]
        public async Task<object> Register(UserMaster user)
        {
            try
            {
                return await _authenticationService.Register(user);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        [HttpGet]
        [Route("ForgotPassword/{email}")]
        public async Task<object> ForgotPassword(string email)
        {
            try
            {
                return await _authenticationService.ForgotPassword(email);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        [HttpPost]
        [Authorize]
        [Route("changepassword")]
        public async Task<object> ChangePassword(ChangePassword passwordModel)
        {
            try
            {
                return await _authenticationService.ChangePassword(passwordModel);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        #endregion
    }
}
