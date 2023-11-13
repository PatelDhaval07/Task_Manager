
export const CommonErrorMessage = 'Error! Something went wrong!';
export const LoginMessage = 'Login Successfull!';
export const LoginErrorMessage = 'Login UnSuccessfull!';
export const AppLoginUrl = 'AppLoginUrl';
export const AdminModulesId = 2;
export const ProcurementDealTracking = 1;
export const GetColumnList = '/CommonList/GetCommonGridColumnData?ModuleID=';
export const GetUrlList = '/CommonList/GetCommonGridUrlData?moduleID=';
export const ProcurementDealTrackingComponentSlug = "ProcurementDealTracking";
export const DefaultBooleanFalse = false;
export const DefaultBooleanTrue = true;
export const SidebarMenu = 1;
export const TopMenu = 2;
export const Admin = 2;
export const EncryptionKey = "8080808080808080";
export const EncryptionReplaceKey = "PdfhSADjbh";
export const NoPermissionMessage = "User does not have permission to access application.";
export const DefaultIdValue = 0;
export const PAGE_SIZE = 10;
export const PAGINATIONPERPAGE = [5, 10, 20, 50, 100];
//Submit Button Text
export const SubmitLoginText = 'Login';



//Common Service end point URL
export const UserDetail = '/users/UserDetail';
export const GetAllDropdownMasterList = '/Dropdown/GetAllDropdownMaster';
export const GetConfigData = "/GetConfigData?configKey=";
export const GetMenuItems = '/module/GetMenuItems?ComponentId=';
export const ValidateUser = "/authentication/login";
export const RegisterUser = "/authentication/register";
export const ForgotPassword = "/authentication/forgotpassword/";
export const ChangePassword = "/authentication/changepassword";
export const GetAllUsers = "/user/GetAllUsers";
export const SendRemainder = "/user/SendRemainder/";
export const GetAllTasks = "/task/GetAllTasks";
export const UploadTasks = "/task/UploadTask";
export const ChangeTaskActivation = "/task/ChangeActiveTask/";
export const ChangeUserActivation = "/user/ChangeActiveUser/";
export const GetTaskDetail = "/task/GetTaskFromId/";
export const GetTaskFromUserId = "/Task/GetTaskFromUserId";
export const GetStatusCount = "/Task/GetStatusCount";
export const AddorUpdateTask = "/task/AddorUpdateTaskMaster";
export const GetCalendarTasks = "/task/GetAllCalendarTask/";

export const FrontDashboard = "/admin/dashboard";
export const UserList = "/admin/user/userList";
export const TaskList = "/admin/task/taskList";
export const AddTask = "/admin/task/taskOperation/add";
export const FrontAuthenticate = "/Authenticate/";
export const FrontLogin = "/auth/login";
export const FrontChangePassword = "/admin/user/changepassword";
export const FrontLogout = "Logout";
export const FrontLoginRedirection = "/#/Login";
export const Unauthorized = "/unauthorized";
export const Siteundermaintenance = "/siteundermaintenance";

export const INVOICEFILEFORMATES = ['xlsx'];
export const uploadSizeError = "Error! Select File for less than 20MB";
export const FILETYPEERROR = 'The file type is invalid. Please select a valid file type.';

//Session Storage related 
export const Defaultbooleanfalse = false;
export const Defaultbooleantrue = true;
export const ClientIP = 'ClientIP';
export const ScreenId = "ScreenId";
export const AllDropdownMaster = 'AllDropdownMaster';
export const LoginUserDetails = "UserDetails";
export const UserPermissionList = "PermissionList";
//Local Storage related 
export const AuthToken = "AuthToken";
//API Responce related 
export const ResponseData = 'responseData';

//Get end user IP Address from third Party API
export const GetIPAddress = 'https://api.ipify.org?format=json';

//Status Code 
export const StatusCodeOk = 200;
export const StatusCodeUnauthorized = 401;
export const IsSuccess = 1;

//Top Menu slug module type = 2
export const ICMLogoutSlug = 'ICMLogout';
export const ICMAdminSlug = 'ICMAdmin';


// AccessLog Log Urls
export const AccessLogOperation = '/AccessLog/AccessLogOperation';


//Other Cost slugs
// export const OtherCostMasterSlug = 'OtherCostMaster';
// export const OtherCostMasterAddSlug = 'OtherCostMasterAdd';
// export const OtherCostMasterEditSlug = 'OtherCostMasterEdit';
// export const OtherCostMasterViewSlug = 'OtherCostMasterView';



export const HedgingCost = 1;
export const TransferPricingMarkup = 2;

//Column names from Common Grid
export const NoRecordFound = "No record found!";

//Operation name for URL Binding 
export const AddOperation = "Add";
export const EditOperation = "Edit";
export const GetOperation = "Get";
export const DeleteOperation = "Delete";
export const ViewOperation = "View";
export const SyncOperation = "Sync";



//Default sorting columns name for all listing
export const DefaultSortingOrder = 'desc';
export const OtherCostDefaultSortingColumn = 'OtherCostMasterId';
export const OriginDefaultSortingColumn = 'OriginMasterId';
export const TransportationDefaultSortingColumn = 'transportationMasterId';

//Add Update Delete Operation Constant 
export const Add = 1;
export const Update = 2;
export const Delete = 3;
export const Defaultnull = null;

//Popup model related 
export const CommonDeleteMessage = "Do you confirm the deletion of this data?";
export const ApproveMessage = "Are you sure you wish to approve?";
export const DropMessage = "Are you sure you wish to Drop this other cost?";
export const PopUpYes = "Yes";
export const PopUpNo = "No";
export const PopUpModelSize = '350px';

//Delete short description for common 
export const DeleteShortDesc = ' deleted';
