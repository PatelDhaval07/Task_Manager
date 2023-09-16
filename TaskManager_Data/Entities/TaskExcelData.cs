using System;
using System.Collections.Generic;
using System.Text;

namespace TaskManager_Data.Entities
{
    public class TaskExcelData
    {
        public string TaskName { get; set; }
        public string CompanyName { get; set; }
        public string PartnerName { get; set; }
        public string CompanyNumber { get; set; }
        public string DueDate { get; set; }
        public string WorkNature { get; set; }
        public string ReviewingPerson { get; set; }
        public string RecordIn { get; set; }
        public string JobsInPlanner { get; set; }
        public string StartDate { get; set; }
    }
}
