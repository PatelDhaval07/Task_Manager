using System;
using System.Collections.Generic;
using System.Text;

namespace TaskManager_Data.Entities
{
    public class TasksMaster
    {
        public int TaskMasterId { get; set; }
        public string TaskName { get; set; }
        public int UserId { get; set; }
        public string PartnerName { get; set; }
        public string CompanyName { get; set; }
        public string CompanyNo { get; set; }
        public DateTime DueDate { get; set; }
        public int WorkNatureId { get; set; }
        public string WorkNature { get; set; }
        public int ReviewingUserId { get; set; }
        public string ReviewingPerson { get; set; }
        public bool RecordIn { get; set; }
        public bool JobsInPlanner { get; set; }
        public DateTime WorkStartDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
