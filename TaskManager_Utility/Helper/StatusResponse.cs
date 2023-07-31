using System;
using System.Collections.Generic;
using System.Text;
using TaskManager_Utility.Enums.EnumList;

namespace TaskManager_Utility.Helper
{
    public class StatusResponse
    {
        public StatusType StatusType { get; set; }
        public string Message { get; set; }
        public dynamic Data { get; set; }
        public Exception ServiceException { get; set; }
    }

    public class StatusResponse<T>
    {
        public T Data { get; set; }
        public IEnumerable<T> List { get; set; }
        public StatusType StatusType { get; set; }
        public string Message { get; set; }
        public Exception ServiceException { get; set; }
    }
}
