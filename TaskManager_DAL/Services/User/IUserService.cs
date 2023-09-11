using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager_DAL.Services.User
{
    public interface IUserService
    {
        Task<object> GetAllUsers();
        Task<object> SendRemainder(string email);
        Task<object> ChangeActiveUser(int UserMasterId, bool IsActive);
    }
}
