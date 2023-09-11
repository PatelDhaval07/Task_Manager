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
                                if (workSheet.Cells[1, 1].Value.ToString() == "Company Name" && workSheet.Cells[1, 2].Value.ToString() == "Partner Name"
                                    && workSheet.Cells[1, 3].Value.ToString() == "Company Number" && workSheet.Cells[1, 4].Value.ToString() == "Due Date"
                                    && workSheet.Cells[1, 5].Value.ToString() == "Nature of work" && workSheet.Cells[1, 6].Value.ToString() == "Person Reviewing" &&
                                    workSheet.Cells[1, 7].Value.ToString() == "Record In" && workSheet.Cells[1, 8].Value.ToString() == "Jobs in planner" &&
                                    workSheet.Cells[1, 9].Value.ToString() == "Work Start Date")
                                {
                                    TaskExcelData taskList = new TaskExcelData();

                                    for (int i = 2; i <= totalRows; i++)
                                    {
                                        //taskList.Add(new TaskExcelData
                                        //{
                                        if (workSheet.Cells[i, 1].Value != null && workSheet.Cells[i, 2].Value != null && workSheet.Cells[i, 3].Value != null &&
                                            workSheet.Cells[i, 4].Value != null && workSheet.Cells[i, 5].Value != null && workSheet.Cells[i, 6].Value != null &&
                                            workSheet.Cells[i, 7].Value != null && workSheet.Cells[i, 8].Value != null && workSheet.Cells[i, 9].Value != null)
                                        {
                                            var workNature = (int)((TaskWorkNature)Enum.Parse(typeof(TaskWorkNature), workSheet.Cells[i, 5].Value.ToString()));
                                            taskList.CompanyName = workSheet.Cells[i, 1].Value.ToString();
                                            taskList.PartnerName = workSheet.Cells[i, 2].Value.ToString();
                                            taskList.CompanyNumber = workSheet.Cells[i, 3].Value.ToString();
                                            taskList.DueDate = Convert.ToDateTime(workSheet.Cells[i, 4].Value);
                                            taskList.WorkNature = workNature;
                                            taskList.ReviewingPerson = workSheet.Cells[i, 6].Value.ToString();
                                            taskList.RecordIn = Convert.ToBoolean(workSheet.Cells[i, 7].Value);
                                            taskList.JobsInPlanner = Convert.ToBoolean(workSheet.Cells[i, 8].Value);
                                            taskList.StartDate = Convert.ToDateTime(workSheet.Cells[i, 9].Value);
                                            //});

                                            var response = await Task.Run(() => SQLHelper.ExecuteDataset(_configuration.GetConnectionString("DefaultConnection"), "SP_UploadTasks",
                                                new SqlParameter[]
                                                {
                                           new SqlParameter("@CompanyName", taskList.CompanyName),
                                           new SqlParameter("@PartnerFirstName", taskList.PartnerName.Split(' ')[0]),
                                           new SqlParameter("@PartnerLastName", taskList.PartnerName.Split(' ')[1]),
                                           new SqlParameter("@CompanyNumber", taskList.CompanyNumber),
                                           new SqlParameter("@DueDate", taskList.DueDate),
                                           new SqlParameter("@WorkNatureId", taskList.WorkNature),
                                           new SqlParameter("@ReviewingPersonFN", taskList.ReviewingPerson.Split(' ')[0]),
                                           new SqlParameter("@ReviewingPersonLN", taskList.ReviewingPerson.Split(' ')[1]),
                                           new SqlParameter("@RecordIn", taskList.RecordIn),
                                           new SqlParameter("@JobsInPlanner", taskList.JobsInPlanner),
                                           new SqlParameter("@StartDate", taskList.StartDate),
                                                }));
                                        }
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

        #endregion
    }
}
