using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Taskmanager_API.Controllers
{
    /// <summary>
    /// User Controller
    /// </summary>
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        /// <summary>
        /// Define IConfiguration object
        /// </summary>
        public IConfiguration objIConfiguration;

        /// <summary>
        /// Initialize Helper object
        /// </summary>
        //Helper objHelper = new Helper();

        /// <summary>
        ///  User Dictionary Object
        /// </summary>
        /// <typeparam name="string"></typeparam>
        /// <typeparam name="dynamic"></typeparam>
        /// <returns></returns>
        dynamic objUserDictionary = new Dictionary<string, dynamic>();

        /// <summary>
        /// Message for Acknowledgement
        /// </summary>
        string message = string.Empty;

        /// <summary>
        /// Boolean result of request
        /// </summary>
        bool isSuccess = false;

        /// <summary>
        /// Initialize User DAL object
        /// </summary>        
        //UserDAL objUserDAL = new UserDAL();

        /// <summary>
        /// Initialize Common object
        /// </summary>
        //Common objCommon = new Common();
        public IActionResult Index()
        {
            return View();
        }
    }
}
