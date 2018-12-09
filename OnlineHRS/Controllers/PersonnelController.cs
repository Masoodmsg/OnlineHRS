
using System;
using System.Collections.Generic;
using System.Linq;
using Ext.Net;
using System.Web;
using OnlineHRS.Business;
using OnlineHRS.Business.FacadeControllers;
using System.Web.UI;
using Utility;
using Utility.DBConstants;

namespace OnlineHRS
{
    public partial class Default //Personnel
    {

        //[DirectMethod()]
        //public static DirectResponse EditPersonnelInfo(string mode, string userInfoJson)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {
        //        //Personnel_Info editInfo = Newtonsoft.Json.JsonConvert.DeserializeObject<Personnel_Info>(userInfoJson);
        //        //editInfo.ID = PersonnelInfo.ID;
        //        PersonnelFacadeController ctrl = new PersonnelFacadeController();
        //        ctrl.EditPersonnelInfo(mode, userInfoJson);
        //        response.Success = true;
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
        //public static DirectResponse ChangePassword(int companyID, string oldPass, string newPass)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {

        //        PersonnelFacadeController ctrl = new PersonnelFacadeController();
        //        ctrl.ChangePassword(companyID, Personnel.ID, oldPass, newPass);
        //        response.Success = true;
        //        //X.Msg.Info(new InfoPanel() { RenderTo = "CompanyManagemenWindow", UI = UI.Success, Title = "تغییر کلمه عبور", Html = "تغییر کلمه عبور با موفقیت انجام شد", IconCls = "#Accept" }).Show();

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
        //public static DirectResponse UserSearch(string user, int companyID)
        //{

        //    PersonnelFacadeController roleCtrl = new PersonnelFacadeController();
        //    DirectResponse response = new DirectResponse();

        //    string Json = roleCtrl.UserSearch(user, companyID);

        //    //string Json = Newtonsoft.Json.JsonConvert.SerializeObject(users);
        //    response.Result = Json;
        //    response.Success = true;
        //    return response;
        //}

        //[DirectMethod()]
        //public static DirectResponse PersonnelSearch(int userID, string whereJson)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {
        //        PersonnelFacadeController roleCtrl = new PersonnelFacadeController();


        //        string Json = roleCtrl.PersonnelSearch(userID, whereJson);

        //        //string Json = Newtonsoft.Json.JsonConvert.SerializeObject(users);
        //        response.Result = Json;
        //        response.Success = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        string msg = Helper.GetSqlExceptionMessage(ex);
        //        //X.Msg.Info("خطا", msg, UI.Danger).Show();
        //        X.Msg.Info(new InfoPanel() { Title = "خطا", UI = UI.Danger, Html = msg, RTL = true }).Show();
        //        //X.Msg.Show(new MessageBoxConfig
        //        //{
        //        //    Title = "خطا",
        //        //    Message = ex.Message,
        //        //    Buttons = MessageBox.Button.OK,
        //        //    Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        //});
        //    }
        //    return response;
        //}

        //[DirectMethod()]
        //public static DirectResponse GetPersonnelInfo(string personnelInfoJson)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {
        //        PersonnelFacadeController roleCtrl = new PersonnelFacadeController();


        //        string Json = roleCtrl.GetPersonnelInfo(personnelInfoJson);

        //        //string Json = Newtonsoft.Json.JsonConvert.SerializeObject(users);
        //        response.Result = Json;
        //        response.Success = true;
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
