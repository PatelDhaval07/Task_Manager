using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace TaskManager_Utility.Enums.EnumList
{
    #region StatusType
    public enum StatusType
    {
        Fail,
        Success,
        Exception
    }
    #endregion

    #region UserType
    public enum UserType
    {
        Admin = 1,
        Customer = 2,
        Employee = 3
    }
    #endregion

    #region Project
    public enum ProjectType
    {
        [DescriptionAttribute("Aviation")]
        Aviation = 1,
        [DescriptionAttribute("BFSI")]
        BFSI = 2,
        [DescriptionAttribute("Digital Marketing")]
        DigitalMarketing = 3,
        [DescriptionAttribute("E-Commerce")]
        ECommerce = 4,
        [DescriptionAttribute("Education")]
        Education = 5,
        [DescriptionAttribute("FMCG")]
        FMCG = 6,
        [DescriptionAttribute("Health Care")]
        HealthCare = 7,
        [DescriptionAttribute("Logistics")]
        Logistics = 8,
        [DescriptionAttribute("Manufacturing")]
        Manufacturing = 9,
        [DescriptionAttribute("Media & Entertainmnet")]
        MediaEntertainment = 10,
        [DescriptionAttribute("NGO")]
        NGO = 11,
        [DescriptionAttribute("Real Estate")]
        RealEstate = 12,
        [DescriptionAttribute("ISV")]
        ISV = 13,
        [DescriptionAttribute("Telecom")]
        Telecom = 14,
        [DescriptionAttribute("Travel & Hospitality")]
        TravelHospitality = 15
    }
    #endregion

    #region Ticket 
    public enum TicketHistory
    {
        History = 1,
        Comment = 2
    }
    #endregion
    #region TicketStatus
    public enum TicketStatus
    {
        [DescriptionAttribute("Open")]
        Open = 1,
        [DescriptionAttribute("Close")]
        Closed = 2,
        [DescriptionAttribute("ReOpen")]
        Reopen = 3,
        [DescriptionAttribute("In Progress")]
        InProgress = 4
    }
    #endregion

    #region ProjectMapStatus
    //For project employee role map status

    public enum ProjectMapStatus
    {
        [Description("Mapped")]
        Mapped = 1,
        [Description("Not mapped")]
        NotMapped = 2
    }
    #endregion
}

