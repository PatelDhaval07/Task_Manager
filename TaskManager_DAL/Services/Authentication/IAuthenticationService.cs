using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TaskManager_Data.Entities;

namespace TaskManager_DAL.Services.Authentication
{
    public interface IAuthenticationService
    {
        Task<object> Login(Login login);
        Task<object> RefreshToken(Token tokenModel);
        Task<object> Register(User user);
    }
}
