using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager_DAL.Services.CommonService;
using TaskManager_Data.Entities;
using TaskManager_Utility.Constant;
using TaskManager_Utility.Helper;

namespace TaskManager_DAL.Services.User
{
    public class UserService : IUserService
    {
        #region Fields

        private readonly ILogger<UserService> _logger;
        private readonly IConfiguration _configuration;
        private readonly ICommonService _iCommonService;

        #endregion

        public UserService(ILogger<UserService> logger, IConfiguration configuration, ICommonService iCommonService)
        {
            _logger = logger;
            _configuration = configuration;
            _iCommonService = iCommonService;
        }

        #region Methods

        public async Task<object> GetAllUsers()
        {
            try
            {
                var response = await Task.Run(() => SQLHelper.ExecuteDataset(_configuration.GetConnectionString("DefaultConnection"), "SP_GetAllUsers"));

                if (response != null && response.Tables != null && response.Tables[0] != null)
                {
                    var users = SQLHelper.ConvertDataTableToGenericList<UserMaster>(response.Tables[0]).ToList();
                    return StatusBuilder.ResponseSuccessStatusWithValue(null, users); ;
                }
                else
                    return null;
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        public async Task<object> SendRemainder(string email)
        {
            try
            {
                string finalTemplate = "Dear Sir/Madam,<br />This is a gentle remainder for your task.<br>Kindly complete it ASAP.<br /><br />Regards,<br />TaskFlow";
                bool isSent = _iCommonService.SendEmail(finalTemplate, new Dictionary<string, string>(), "Task Remainder", email, null);
                if (isSent)
                    return StatusBuilder.ResponseSuccessStatus(Common.RemainderEmailSent);
                else
                    return StatusBuilder.ResponseFailStatus(Common.FailedToSendRemainder);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        public async Task<object> ChangeActiveUser(int UserMasterId, bool IsActive)
        {
            try
            {
                var response = await Task.Run(() => SQLHelper.ExecuteDataset(_configuration.GetConnectionString("DefaultConnection"), "SP_ChangeActiveUser", new SqlParameter[] {
                new SqlParameter("@UserMasterId",UserMasterId),
                new SqlParameter("@IsActive",IsActive)
                }));

                if (response != null && response.Tables != null && response.Tables[0] != null)
                {
                    if (response.Tables[0].Rows.Count > 0)
                    {
                        if ((int)response.Tables[0].Rows[0][0] <= 0)
                            return StatusBuilder.ResponseFailStatus(Common.FailedToActiveUser);
                        else
                            return StatusBuilder.ResponseSuccessStatus(Common.ActiveUserChangeSuccessfully);
                    }
                }
                return StatusBuilder.ResponseFailStatus(Common.FailedToActiveUser);
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
