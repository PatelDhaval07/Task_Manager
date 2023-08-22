using System;
using System.Collections.Generic;
using System.Text;

namespace TaskManager_Utility.Constant
{
    public class Common
    {
        public const string NoDataFound = "No data found.";
        public const string AlreadyExistEmail = "Email id already exist";

        #region  login
        public const string SomethingWentWrong = "Something went wrong!";
        public const string AuthenticationFailed = "Invalid user email!";
        public const string InvalidEmailOrPassword = "Invalid email or password!";
        public const string InvalidOldPassword = "Invalid old password!";
        public const string AccountInActive =
            "Your Account has been inactive please contact to admin for more details!";
        public const string ForgotPasswordEmailSent = "Password sent to your email";
        public const string SameOldNewPassword = "Please enter different new password than old password"; 
        public const string FailedToChangePassword = "Failed to change password";
        public const string ChangePasswordSuccessfully = "Change Password successfully";
        public const string FailedToRegister = "Failed to register";
        public const string RegisterSuccessfully = "User registered successfully";
        public const string EmailSentSuccessfully = "Email sent successfully";
        public const string FailtoSendEmail = "Fail to send email";
        #endregion
    }
}
