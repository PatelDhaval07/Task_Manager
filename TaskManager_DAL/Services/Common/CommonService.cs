using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TaskManager_Utility.Helper;
using System.Data.SqlClient;
using TaskManager_Data.Entities;
using System.Linq;
using System.Globalization;
using System.IO;
using MimeKit;
using System.Net.Mail;
using System.Net;
using MailKit.Security;
using System.Threading;
using TaskManager_Utility.Constant;

namespace TaskManager_DAL.Services.CommonService
{
    public class CommonService : ICommonService
    {
        #region  Fields
        private readonly IConfiguration _configuration;
        #endregion

        public CommonService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<object> SendEmailbyUserId(string userId, string loggedInUserId)
        {
            try
            {
                var dataSet = await Task.Run(() => SQLHelper.ExecuteDataset(
                                            _configuration.GetConnectionString("DefaultConnection"), "SP_GetUserbyId",
                                            new SqlParameter[] { new SqlParameter("@UserId", userId) }));

                if (dataSet != null && dataSet.Tables != null && dataSet.Tables[0] != null)
                {
                    if (dataSet.Tables[0].Rows.Count > 0)
                    {
                        var userDTO = SQLHelper
                            .ConvertDataTableToGenericList<User>(dataSet.Tables[0])
                            .FirstOrDefault();
                        string password = CultureInfo.CurrentCulture.DateTimeFormat.GetAbbreviatedMonthName(DateTime.UtcNow.Month)
           + "@" + DateTime.UtcNow.Year + "#";
                        userDTO.Password = PasswordHashUtil.HashPassword(password);
                        // send new assigned mail
                        Dictionary<string, string> replacement = new Dictionary<string, string>();
                        replacement.Add("${{UserName}}$", userDTO.FirstName + " " + userDTO.LastName);
                        replacement.Add("${{UserEmail}}$", userDTO.Email);
                        replacement.Add("${{URL}}$", _configuration.GetSection("Origins").GetSection("UrlStagingUI").Value);
                        replacement.Add("${{Password}}$", password);

                        string finaleTemplate = "Test";
                        var isSent = SendEmail(finaleTemplate, replacement, "Welcome to Task Manager System", userDTO.Email, null);
                        if (isSent)
                            return StatusBuilder.ResponseSuccessStatus(Common.EmailSentSuccessfully);
                    }
                }
                return StatusBuilder.ResponseFailStatus(Common.FailtoSendEmail);
            }
            catch (System.Exception ex)
            {
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        public bool SendEmail(string body, Dictionary<string, string> replacements, string subject, string toEmail, string bccEmail)
        {
            var builder = new ConfigurationBuilder()
                 .AddJsonFile("appsettings.json", true, true);

            IConfigurationRoot configuration = builder.Build();

            replacements.ToList().ForEach(x =>
            {
                body = body.Replace(x.Key, Convert.ToString(x.Value));
            });
            // Plug in your email service here to send an email.
            var msg = new MimeMessage();
            msg.From.Add(new MailboxAddress(configuration.GetSection("EmailCredentials").GetSection("From").Value, configuration.GetSection("EmailCredentials").GetSection("From").Value));
            msg.To.Add(MailboxAddress.Parse(toEmail));


            if (!string.IsNullOrEmpty(bccEmail))
                msg.Bcc.Add(MailboxAddress.Parse(bccEmail));

            msg.Subject = subject;
            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = body;
            msg.Body = bodyBuilder.ToMessageBody();
            using (var smtp = new MailKit.Net.Smtp.SmtpClient())
            {
                smtp.Connect(configuration.GetSection("EmailCredentials").GetSection("Host").Value, Convert.ToInt16(configuration.GetSection("EmailCredentials").GetSection("Port").Value), SecureSocketOptions.SslOnConnect);
                smtp.Authenticate(credentials: new NetworkCredential(configuration.GetSection("EmailCredentials").GetSection("UserName").Value, configuration.GetSection("EmailCredentials").GetSection("Password").Value));
                smtp.Send(msg, CancellationToken.None);
                smtp.Disconnect(true, CancellationToken.None);
            }
            return true;
        }
    }
}
