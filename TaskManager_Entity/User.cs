using System;

namespace TaskManager_Entity
{
    public class User
    {
        /// <summary>
        /// UserId
        /// </summary>
        /// <value></value>
        public int UserId { get; set; }

        /// <summary>
        /// FirstName
        /// </summary>
        /// <value></value>
        public string FirstName { get; set; }

        /// <summary>
        /// LastName
        /// </summary>
        /// <value></value>
        public string LastName { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        /// <value></value>
        public string Email { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        /// <value></value>
        public string Password { get; set; }

        /// <summary>
        /// IsActive
        /// </summary>
        /// <value></value>
        public int IsActive { get; set; }
    }
}