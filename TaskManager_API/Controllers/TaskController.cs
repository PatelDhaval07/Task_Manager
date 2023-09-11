using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager_DAL.Services.TaskMaster;
using TaskManager_Data.Entities;
using TaskManager_Utility.Helper;

namespace TaskManager_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class TaskController : ControllerBase
    {
        #region Fields

        private readonly ILogger<TaskController> _logger;
        private readonly ITaskService _taskService;

        #endregion

        #region Methods

        public TaskController(ILogger<TaskController> logger, ITaskService taskService)
        {
            _logger = logger;
            _taskService = taskService;
        }

        [Route("GetAllTasks")]
        [HttpGet]
        [Authorize]
        public async Task<object> GetAllTasks()
        {
            try
            {
                return await _taskService.GetAllTasks();
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        [HttpPost]
        [Authorize]
        [Route("UploadTask")]
        public async Task<object> UploadTasks()
        {
            try
            {
                var file = Request.Form.Files[0];
                return await _taskService.UploadTasklist(file);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("ChangeActiveTask/{TaskMasterId}/{IsActive}")]
        public async Task<object> ChangeActiveTask(int TaskMasterId, bool IsActive)
        {
            try
            {
                return await _taskService.ChangeActiveTask(TaskMasterId, IsActive);
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
