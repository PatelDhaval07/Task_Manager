using System;
using System.Collections.Generic;
using System.Text;

namespace TaskManager_Data.Entities
{
    public class TaskExcelData
    {
        public string CompanyName { get; set; }
        public string PartnerName { get; set; }
        public string CompanyNumber { get; set; }
        public DateTime DueDate { get; set; }
        public int WorkNature { get; set; }
        public string ReviewingPerson { get; set; }
        public bool RecordIn { get; set; }
        public bool JobsInPlanner { get; set; }
        public DateTime StartDate { get; set; }
    }
}
