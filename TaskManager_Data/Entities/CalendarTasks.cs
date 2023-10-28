using System;
using System.Collections.Generic;
using System.Text;

namespace TaskManager_Data.Entities
{
    public class CalendarTasks
    {
        public int TaskMasterId { get; set; }
        public string TaskName { get; set; }
        public int UserId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyNo { get; set; }
        public DateTime DueDate { get; set; }
        public int WorkNatureId { get; set; }
        public int ReviewingUserId { get; set; }
        public bool RecordIn { get; set; }
        public bool JobsInPlanner { get; set; }
        public DateTime WorkStartDate { get; set; }
        public int Status { get; set; }
        public int ColourId { get; set; }
        public string ColourName { get; set; }
    }

    public class UnassignedTasks
    {
        public int TaskMasterId { get; set; }
        public string TaskName { get; set; }
    }
}
