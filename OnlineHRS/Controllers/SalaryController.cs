using Ext.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OnlineHRS.Business;
using OnlineHRS.Business.FacadeControllers;
using System.Web.UI;
using Utility;
using Utility.DBConstants;
namespace OnlineHRS
{
    public partial class Default
    {
        //[DirectMethod()]
        //public static DirectResponse GroupSalaryCalculation(string dataJson)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {
        //        ApplicationSessionStateStore.SetItem("StatusSalaryCalc", 1);
              
        //        System.Threading.Thread.Sleep(10000);
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        string msg = Helper.GetSqlExceptionMessage(ex);
        //        //X.Msg.Info("خطا", msg, UI.Danger).Show();
        //        X.Msg.Info(new InfoPanel() { Title = "خطا", UI = UI.Danger, Html = msg, RTL = true }).Show();
        //    }
        //    return response;
        //}

        //[DirectMethod()]
        //public static DirectResponse GetStatusGroupSalaryCalc()
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {

        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        string msg = Helper.GetSqlExceptionMessage(ex);
        //        //X.Msg.Info("خطا", msg, UI.Danger).Show();
        //        X.Msg.Info(new InfoPanel() { Title = "خطا", UI = UI.Danger, Html = msg, RTL = true }).Show();
        //    }
        //    return response;
        //}
    }
}