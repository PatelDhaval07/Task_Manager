using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager_DAL.Services.TaskMaster
{
    public interface ITaskService
    {
        Task<object> GetAllTasks();
        Task<object> UploadTasklist(IFormFile file);
        Task<object> ChangeActiveTask(int TaskMasterId, bool IsActive);
    }
}
