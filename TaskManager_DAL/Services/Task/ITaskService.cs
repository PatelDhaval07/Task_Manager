using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TaskManager_Data.Entities;

namespace TaskManager_DAL.Services.TaskMaster
{
    public interface ITaskService
    {
        Task<object> GetAllTasks();
        Task<object> UploadTasklist(IFormFile file, string userId);
        Task<object> ChangeActiveTask(int TaskMasterId, bool IsActive);
        Task<object> AddorUpdateTaskMaster(TasksMaster tasksMaster, string userId);
        Task<object> GetTaskFromId(int taskMasterId);
        Task<object> GetStatusCount(string userId);
        Task<object> GetTaskFromUserId(string userId);
    }
}
