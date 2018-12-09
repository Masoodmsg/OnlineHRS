using Ext.Net;
using OnlineHRS.Business.FacadeControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace OnlineHRS.ModalWindowPages
{
    public partial class SalaryInputFormItem : System.Web.UI.Page
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
    }
}