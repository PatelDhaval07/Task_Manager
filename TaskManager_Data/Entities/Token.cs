using System;
using System.Collections.Generic;
using System.Text;

namespace TaskManager_Data.Entities
{
    public class Token
    {
        public string jwtToken { get; set; }
        public string refreshTOken { get; set; }
        public string language { get; set; }
    }
}
