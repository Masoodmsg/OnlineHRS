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
    public partial class ItemFormulaInstanceWindow : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

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

        [DirectMethod()]
        public DirectResponse ExecuteStoreProcedureSelect(string spName, string parametersJson)
        {
            DirectResponse response = new DirectResponse();
            try
            {
                SystemFacadeController ctrl = new SystemFacadeController();
                response.Result = ctrl.ExecuteStoreProcedureSelect(Helper.Decrypt(spName), parametersJson);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                string msg = Helper.GetSqlExceptionMessage(ex);
                //X.Msg.Info("خطا", msg, UI.Danger).Show();
                X.Msg.Info(new InfoPanel() { Title = "خطا", UI = UI.Danger, Html = msg, RTL = true }).Show();

            }
            return response;
        }

        [DirectMethod()]
        public DirectResponse ExecuteStoreProcedureUpdate(string spName, string spMode, bool isID, bool isResult, string parametersJson)
        {
            DirectResponse response = new DirectResponse();
            try
            {
                SystemFacadeController ctrl = new SystemFacadeController();

                response.Result = ctrl.ExecuteStoreProcedureUpdate(Helper.Decrypt(spName), Helper.Decrypt(spMode), isID, isResult, parametersJson);
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                string msg = Helper.GetSqlExceptionMessage(ex);
                //X.Msg.Info("خطا", msg, UI.Danger).Show();
                X.Msg.Info(new InfoPanel() { Title = "خطا", UI = UI.Danger, Html = msg, RTL = true }).Show();

            }
            return response;
        }
    }
}