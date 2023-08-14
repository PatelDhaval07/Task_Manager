using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager_Data.Entities;
using TaskManager_Utility.Helper;

namespace TaskManager_DAL.Services.User
{
    public class UserService : IUserService
    {
        #region Fields

        private readonly ILogger<UserService> _logger;
        private readonly IConfiguration _configuration;

        #endregion

        public UserService(ILogger<UserService> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
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

        #endregion
    }
}
