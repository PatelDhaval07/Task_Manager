﻿using System;
using System.Collections.Generic;
using System.Text;

namespace TaskManager_Data.Entities
{
    public class ChangePassword
    {
        public string Email { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
