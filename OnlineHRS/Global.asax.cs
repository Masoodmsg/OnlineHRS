using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace OnlineHRS
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            ApplicationSessionStateStore.IsEnabled = true;

            Business.FacadeControllers.SystemFacadeController moduleItemsCtrl = new Business.FacadeControllers.SystemFacadeController();
            string moduleItemsJson = moduleItemsCtrl.GetModuleItems();
            ApplicationSessionStateStore.ModuleItems = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ModuleItem>>(moduleItemsJson);
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------
            string encryptMapsJson = moduleItemsCtrl.ExecuteDynamicQuery("System_EncryptMaps", "select", Utility.Helper.ObjectToJson(new { Decrypt = 0, Encrypt = 0 }), "", "", "", false);
            string encryptMapsCompanyIDJson = moduleItemsCtrl.ExecuteDynamicQuery("Company_Info", "select", Utility.Helper.ObjectToJson(new { ID = 0 }), "", "", "", false);

            List<EncryptMap> encryptMaps = Newtonsoft.Json.JsonConvert.DeserializeObject<List<EncryptMap>>(encryptMapsJson);
            List<CompanyID> encryptCompanyIDMaps = Newtonsoft.Json.JsonConvert.DeserializeObject<List<CompanyID>>(encryptMapsCompanyIDJson);
            encryptMaps.ForEach(item => ApplicationSessionStateStore.EncryptMaping.Add(item.Encrypt, item.Decrypt));
            encryptCompanyIDMaps.ForEach(item => ApplicationSessionStateStore.EncryptMaping.Add(Utility.Helper.Encrypt(item.ID.ToString()),item.ID.ToString()));
        }

        protected void Session_Start(object sender, EventArgs e)
        {
            // Session.Timeout = 120;
            HttpRequestManagement.AddSession(Request);
            //Ext.Net.X.Call("setTokenID", Session.SessionID);
        }

        //protected void Application_BeginRequest(object sender, EventArgs e)
        //{

        //    //HttpRequestManagement.AddRequest(Request);
        //}

        //protected void Application_AcquireRequestState(object sender, EventArgs e)
        //{
        //    (Application["AcquireRequestState"] as List<string>).Add(Context.Request.FilePath);
        //    HttpContext context = HttpContext.Current;
        //    if (context != null && context.Session != null)
        //    {
        //        context.Session["foo"] = "foo";
        //    }
        //}

        //protected void Application_AuthenticateRequest(object sender, EventArgs e)
        //{

        //}

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {
            
            HttpRequestManagement.RemoveSession(Request);
            ApplicationSessionStateStore.RemoveAllItems();
        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}