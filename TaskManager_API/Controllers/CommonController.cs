using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TaskManager_DAL.Services;
using TaskManager_DAL.Services.CommonService;
using TaskManager_Utility.Helper;

namespace TaskManager_API.Controllers
{
    public class CommonController : Controller
    {
        #region Fields
        private readonly ILogger<CommonController> _logger;
        private readonly ICommonService _commonService;
        #endregion

        public CommonController(ILogger<CommonController> logger, ICommonService commonService)
        {
            _logger = logger;
            _commonService = commonService;
        }

        #region methods

        [Authorize]
        [HttpGet]
        [Route("sendEmail/{userId}")]
        public async Task<object> SendEmail(string userId)
        {
            try
            {
                return await _commonService.SendEmailbyUserId(userId, GetUserId());
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        protected string GetUserId()
        {
            return HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                .Value;
        }
        #endregion
    }
}
