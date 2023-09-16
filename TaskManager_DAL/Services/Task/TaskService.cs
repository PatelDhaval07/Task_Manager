using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager_DAL.Services.CommonService;
using TaskManager_Utility.Helper;
using TaskManager_Data.Entities;
using TaskManager_Utility.Enums.EnumList;
using Microsoft.AspNetCore.Http;
using System.IO;
using OfficeOpenXml;
using TaskManager_Utility.Constant;
using System.Data.SqlClient;

namespace TaskManager_DAL.Services.TaskMaster
{
    public class TaskService : ITaskService
    {
        #region Fields
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private readonly ICommonService _iCommonService;

        #endregion

        public TaskService(ILogger<TaskService> logger, IConfiguration configuration, ICommonService commonService)
        {
            _logger = logger;
            _configuration = configuration;
            _iCommonService = commonService;
        }

        #region Methods

        public async Task<object> GetAllTasks()
        {
            try
            {
                var response = await Task.Run(() => SQLHelper.ExecuteDataset(_configuration.GetConnectionString("DefaultConnection"), "SP_GetAllTasks"));

                if (response != null && response.Tables != null && response.Tables[0] != null)
                {
                    var tasks = SQLHelper.ConvertDataTableToGenericList<TasksMaster>(response.Tables[0]).ToList();
                    foreach (var item in tasks)
                    {
                        var workNature = (TaskWorkNature)item.WorkNatureId;
                        item.WorkNature = workNature.ToString();
                    }
                    return StatusBuilder.ResponseSuccessStatusWithValue(null, tasks); ;
                }
                else
                    return null;
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        public async Task<object> UploadTasklist(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return StatusBuilder.ResponseFailStatus(Common.EmptyFile);

                //Get file
                var fileDetail = new FileInfo(file.FileName);
                var fileExtension = fileDetail.Extension;

                if (fileExtension.Contains(".xlsx"))
                {
                    using (MemoryStream ms = new MemoryStream())
                    {
                        await file.CopyToAsync(ms);

                        using (ExcelPackage package = new ExcelPackage(ms))
                        {
                            ExcelWorksheet workSheet = package.Workbook.Worksheets["Sheet1"];
                            if (workSheet.Cells.Value != null)
                            {
                                int totalRows = workSheet.Dimension.Rows;
                                if (workSheet.Cells[1, 1].Value.ToString() == "Task Name" && workSheet.Cells[1, 2].Value.ToString() == "Company Name" && workSheet.Cells[1, 3].Value.ToString() == "Partner Name"
                                    && workSheet.Cells[1, 4].Value.ToString() == "Company Number" && workSheet.Cells[1, 5].Value.ToString() == "Due Date"
                                    && workSheet.Cells[1, 6].Value.ToString() == "Nature of work" && workSheet.Cells[1, 7].Value.ToString() == "Person Reviewing" &&
                                    workSheet.Cells[1, 8].Value.ToString() == "Record In" && workSheet.Cells[1, 9].Value.ToString() == "Jobs in planner" &&
                                    workSheet.Cells[1, 10].Value.ToString() == "Work Start Date")
                                {
                                    TaskExcelData taskList = new TaskExcelData();

                                    for (int i = 2; i <= totalRows; i++)
                                    {
                                        //taskList.Add(new TaskExcelData
                                        //{
                                        var workNature = workSheet.Cells[i, 6].Value != null ? (int)((TaskWorkNature)Enum.Parse(typeof(TaskWorkNature), workSheet.Cells[i, 6].Value.ToString())) : 0;
                                        taskList.TaskName = workSheet.Cells[i, 1].Value != null ? workSheet.Cells[i, 1].Value.ToString() : null;
                                        taskList.CompanyName = workSheet.Cells[i, 2].Value != null ? workSheet.Cells[i, 2].Value.ToString() : null;
                                        taskList.PartnerName = workSheet.Cells[i, 3].Value != null ? workSheet.Cells[i, 3].Value.ToString() : null;
                                        taskList.CompanyNumber = workSheet.Cells[i, 4].Value != null ? workSheet.Cells[i, 4].Value.ToString() : null;
                                        taskList.DueDate = workSheet.Cells[i, 5].Value != null ? workSheet.Cells[i, 5].Value.ToString() : null;
                                        taskList.WorkNature = workNature != 0 ? workNature.ToString() : null;
                                        taskList.ReviewingPerson = workSheet.Cells[i, 7].Value != null ? workSheet.Cells[i, 7].Value.ToString() : null;
                                        taskList.RecordIn = workSheet.Cells[i, 8].Value != null ? workSheet.Cells[i, 8].Value.ToString() : null;
                                        taskList.JobsInPlanner = workSheet.Cells[i, 9].Value != null ? workSheet.Cells[i, 9].Value.ToString() : null;
                                        taskList.StartDate = workSheet.Cells[i, 10].Value != null ? workSheet.Cells[i, 10].Value.ToString() : null;
                                        //});

                                        var response = await Task.Run(() => SQLHelper.ExecuteDataset(_configuration.GetConnectionString("DefaultConnection"), "SP_UploadTasks",
                                            new SqlParameter[]
                                            {
                                                new SqlParameter("@TaskName", taskList.TaskName),
                                           new SqlParameter("@CompanyName", taskList.CompanyName),
                                           new SqlParameter("@PartnerFirstName", taskList.PartnerName != null? taskList.PartnerName.Split(' ')[0] : null),
                                           new SqlParameter("@PartnerLastName", taskList.PartnerName != null? taskList.PartnerName.Split(' ')[1] : null),
                                           new SqlParameter("@CompanyNumber", taskList.CompanyNumber),
                                           new SqlParameter("@DueDate", taskList.DueDate),
                                           new SqlParameter("@WorkNatureId", taskList.WorkNature),
                                           new SqlParameter("@ReviewingPersonFN", taskList.ReviewingPerson !=null  ? taskList.ReviewingPerson.Split(' ')[0] : null),
                                           new SqlParameter("@ReviewingPersonLN", taskList.ReviewingPerson != null ? taskList.ReviewingPerson.Split(' ')[1] : null),
                                           new SqlParameter("@RecordIn", taskList.RecordIn),
                                           new SqlParameter("@JobsInPlanner", taskList.JobsInPlanner),
                                           new SqlParameter("@StartDate", taskList.StartDate),
                                            }));
                                    }
                                    return StatusBuilder.ResponseSuccessStatus(Common.UploadFileSuccessfully);
                                }
                                else
                                    return StatusBuilder.ResponseFailStatus(Common.InvalidFile);
                            }
                            else
                                return StatusBuilder.ResponseFailStatus(Common.EmptyFile);
                        }
                    }
                }
                else
                    return StatusBuilder.ResponseFailStatus(Common.InvalidFile);

            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        public async Task<object> ChangeActiveTask(int TaskMasterId, bool IsActive)
        {
            try
            {
                var response = await Task.Run(() => SQLHelper.ExecuteDataset(_configuration.GetConnectionString("DefaultConnection"), "SP_ChangeActiveTask", new SqlParameter[] {
                new SqlParameter("@TaskMasterId",TaskMasterId),
                new SqlParameter("@IsActive",IsActive)
                }));

                if (response != null && response.Tables != null && response.Tables[0] != null)
                {
                    if (response.Tables[0].Rows.Count > 0)
                    {
                        if ((int)response.Tables[0].Rows[0][0] <= 0)
                            return StatusBuilder.ResponseFailStatus(Common.FailedToActiveTask);
                        else
                            return StatusBuilder.ResponseSuccessStatus(Common.ActiveTaskChangeSuccessfully);
                    }
                }
                return StatusBuilder.ResponseFailStatus(Common.FailedToActiveTask);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }

        public async Task<object> AddorUpdateTaskMaster(TasksMaster tasksMaster, string userId)
        {
            try
            {
                var response = await Task.Run(() => SQLHelper.ExecuteDataset(_configuration.GetConnectionString("DefaultConnection"), "SP_AddorUpdateTask", new SqlParameter[] {
                new SqlParameter("@TaskMasterId",tasksMaster.TaskMasterId),
                new SqlParameter("@TaskName",tasksMaster.TaskName),
                new SqlParameter("@CompanyName",tasksMaster.CompanyName),
                new SqlParameter("@CompanyNumber",tasksMaster.CompanyNo),
                new SqlParameter("@PartnerId",tasksMaster.UserId.ToString()),
                new SqlParameter("@CompanyNumber",tasksMaster.CompanyNo),
                new SqlParameter("@DueDate",tasksMaster.DueDate.ToString()),
                new SqlParameter("@WorkNatureId",tasksMaster.WorkNatureId.ToString()),
                new SqlParameter("@ReviewingUserId",tasksMaster.ReviewingUserId.ToString()),
                new SqlParameter("@RecordIn",tasksMaster.RecordIn.ToString()),
                new SqlParameter("@JobsInPlanner",tasksMaster.JobsInPlanner.ToString()),
                new SqlParameter("@StartDate",tasksMaster.WorkStartDate.ToString()),
                new SqlParameter("@CreatedBy",Convert.ToInt32(userId)),
                new SqlParameter("@UpdatedBy",Convert.ToInt32(userId)),
                }));

                if (response != null && response.Tables != null && response.Tables[0] != null)
                {
                    if (response.Tables[0].Rows.Count > 0)
                    {
                        if (tasksMaster.TaskMasterId > 0)
                        {
                            if ((int)response.Tables[0].Rows[0][0] > 0)
                                return StatusBuilder.ResponseSuccessStatus(Common.TaskUpdatedSuccessfully);
                            else
                                return StatusBuilder.ResponseFailStatus(Common.FailedToUpdateTask);
                        }
                        else
                        {
                            if ((int)response.Tables[0].Rows[0][0] > 0)
                                return StatusBuilder.ResponseSuccessStatus(Common.TaskAddedSuccessfully);
                            else
                                return StatusBuilder.ResponseFailStatus(Common.FailedToAddTask);
                        }
                    }
                }
                return StatusBuilder.ResponseFailStatus(null);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusBuilder.ResponseExceptionStatus(ex);
            }
        }
        #endregion
    }
}
