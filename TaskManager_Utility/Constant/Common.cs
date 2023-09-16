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
        public const string RemainderEmailSent = "Remaider sent to user's email";
        public const string FailedToSendRemainder = "Failed to send remaider email";
        public const string FailedToRegister = "Failed to register";
        public const string RegisterSuccessfully = "User registered successfully";
        public const string EmailSentSuccessfully = "Email sent successfully";
        public const string FailtoSendEmail = "Fail to send email";
        public const string EmptyFile = "Uploaded file is empty";
        public const string UploadFileSuccessfully = "File uploaded successfully";
        public const string InvalidFile = "Uploaded file is invalid";
        public const string FailedToActiveTask = "Failed to modify task activation";
        public const string ActiveTaskChangeSuccessfully = "Modify task activation successfully";
        public const string FailedToActiveUser = "Failed to modify user activation";
        public const string ActiveUserChangeSuccessfully = "Modify user activation successfully";
        public const string TaskUpdatedSuccessfully = "Task data updated successfully";
        public const string FailedToUpdateTask = "Failed to update task data";
        public const string TaskAddedSuccessfully = "Task data added successfully";
        public const string FailedToAddTask = "Failed to add task data";
        #endregion
    }
}
