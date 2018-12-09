using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Utility
{
    public enum ActionMode
    {
        Insert,
        Update,
        Delete,
        SelectById,
        Select
    }
    public enum Actions : long
    {
        AdminChangePass = 1
    }
    public enum ErrorType
    {
        Warrning,
        Error
    }
    public enum MapType : short
    {
        Architecture = 1,
        Electronic = 2,
        Mechanic = 3,
        Building = 4
    }
    //public enum RequestTypes : long
    //{
    //    ControlMapRequest = 1,
    //    SelectObserverRequest = 2,
    //    InspectionRequest = 3 ,
    //    SupervisionRequest = 4 ,
    //    ExecutiveContractRequest = 5,
    //    SupportRequest = 6 ,
    //    LabratoryReporRequest = 7
    //}

    public enum WorkFlows : long
    {
        ControlMapWorkFlow = 1,
        ObserverRefWorkFlow = 2,
        InspectionWorkFlow = 3,
        SupervisionWorkFlow = 4 ,
        ExecutiveContractWorkFlow = 5 ,
        SupportWorkFlow = 6 ,
        LabratoryReportWorkFlow = 7,
        SafetyExcavationWorkFlow = 8 ,
        VotingWorkFlow = 9 
    }

    public enum TicketStatus : long
    {
        OpenTicket = 1,
        CloseTicket=2,
        AllTicket=3
    }
}
