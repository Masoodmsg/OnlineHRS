using Ext.Net;
using OnlineHRS.Business.FacadeControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Utility;

namespace OnlineHRS.ModalWindowPages
{
    public partial class PersonnelsSelectList : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [DirectMethod()]
        public static string ExecuteStoreProcedureSelect(string spName, string parametersJson, string tokenID, string companyID)
        {
            try
            {
                companyID =Utility.Helper.Decrypt(companyID);
                spName = Utility.Helper.Decrypt(spName);
                parametersJson = Helper.SetJsonValue(parametersJson, "CompanyID", companyID, "int");
                HttpRequestManagement.AddRequest(HttpContext.Current.Request, "Select", spName, parametersJson);

              

                SystemFacadeController ctrl = new SystemFacadeController();

                return ctrl.ExecuteStoreProcedureSelect(spName, parametersJson);

            }
            catch (Exception ex)
            {
                //response.Success = false;
                string msg = Helper.GetSqlExceptionMessage(ex);
                //X.Msg.Info("خطا", msg, UI.Danger).Show();
                X.Msg.Info(new InfoPanel() { Title = "خطا", UI = UI.Danger, Html = msg, TitleAlign = TitleAlign.Right, TextAlign =Ext.Net.TextAlign.Right }).Show();
                return "Error";
            }
            //return response;
        }

        [DirectMethod()]
        public static string ExecuteStoreProcedureUpdate(string spName, string spMode, bool isID, bool isResult, string parametersJson, string tokenID, string companyID)
        {

            try
            {
                spMode = Utility.Helper.Decrypt(spMode);
                companyID = Utility.Helper.Decrypt(companyID);
                spName = Utility.Helper.Decrypt(spName);
                parametersJson = Helper.SetJsonValue(parametersJson, "CompanyID", companyID, "int");
                HttpRequestManagement.AddRequest(HttpContext.Current.Request, spMode, spName, parametersJson);
                //IsValidRequest(tokenID, companyID);

                //DirectResponse response = new DirectResponse();
                SystemFacadeController ctrl = new SystemFacadeController();

                return ctrl.ExecuteStoreProcedureUpdate(spName, spMode, isID, isResult, parametersJson);
                //response.Success = true;
            }
            catch (Exception ex)
            {
                //response.Success = false;
                string msg = Helper.GetSqlExceptionMessage(ex);
                //X.Msg.Info("خطا", msg, UI.Danger).Show();
                X.Msg.Info(new InfoPanel() { Title = "خطا", UI = UI.Danger, Html = msg, TitleAlign = TitleAlign.Right, TextAlign = Ext.Net.TextAlign.Right }).Show();
                return "Error";
            }
            //return response;
        }
        //[DirectMethod()]
        //public static DirectResponse GetPostTitles(int companyID)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {

        //        CompanyFacadeController ctrl = new CompanyFacadeController();
        //        Object job = ctrl.GetPostTitles(companyID);
        //        string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(job);
        //        response.Result = jsonData;
        //        response.Success = true;

        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = ex.Message,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //    return response;
        //}
    }
}