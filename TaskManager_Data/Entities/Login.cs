﻿using System;
using System.Collections.Generic;
using System.Text;

namespace TaskManager_Data.Entities
{
    public class Login
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginResponse
    {
        //public string jwtToken { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        //public string refreshToken { get; set; }
        public string UserId { get; set; }
        public string RoleId { get; set; }
        //public List<TMSMenuRolePermission> TMSMenuRolePermission { get; set; }
    }
}
