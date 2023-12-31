﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager_DAL.Services.User;
using TaskManager_Data.Entities;
using TaskManager_Utility.Helper;

namespace TaskManager_API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    [EnableCors]
    public class UserController : ControllerBase
    {
        #region Fields

        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        #endregion

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        #region Methods

        [HttpGet]
        [Authorize]
        [Route("GetAllUsers")]
        public async Task<object> GetAllUsers()
        {
            try
            {
                return await _userService.GetAllUsers();
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("SendRemainder/{email}")]
        public async Task<object> SendRemainder(string email)
        {
            try
            {
                return await _userService.SendRemainder(email);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("ChangeActiveUser/{UserMasterId}/{IsActive}")]
        public async Task<object> ChangeActiveUser(int UserMasterId, bool IsActive)
        {
            try
            {
                return await _userService.ChangeActiveUser(UserMasterId, IsActive);
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
