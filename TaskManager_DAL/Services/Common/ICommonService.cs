using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager_DAL.Services.CommonService
{
    public interface ICommonService
    {
        Task<object> SendEmailbyUserId(string userId, string loggedInUserId);
        bool SendEmail(string body, Dictionary<string, string> replacements, string subject, string toEmail, string bccEmail);
    }
}
