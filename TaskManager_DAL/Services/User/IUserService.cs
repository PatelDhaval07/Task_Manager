using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager_DAL.Services.User
{
    public interface IUserService
    {
        Task<object> GetAllUsers();
    }
}
