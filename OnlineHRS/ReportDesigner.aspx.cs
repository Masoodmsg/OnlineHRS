using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using OnlineHRS.Business.FacadeControllers;
using Ext.Net;
using Utility;
using Stimulsoft.Report;
using Stimulsoft.Report.Dictionary;

namespace OnlineHRS
{

    public partial class ReportDesigner : System.Web.UI.Page
    {
        private class ReportFile
        {
            public string File { get; set; }
        }
        private class Item
        {
            public string Title { get; set; }
        }
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //[DirectMethod(ClientProxy = ClientProxy.Ignore)]
        public void LoadReport(string paramsJson)
        {
            //X.Msg.Info(new InfoPanel() { Title = "خطا", UI = UI.Danger, Html = "aaa", TitleAlign = TitleAlign.Right, TextAlign = Ext.Net.TextAlign.Right }).Show();

            SystemFacadeController ctrl = new SystemFacadeController();
            string fileName = Utility.Helper.GetJsonValue<string>(paramsJson, "ID") + ".mrt";// Newtonsoft.Json.Linq.JObject.Parse(paramsJson).Value<string>("ID") + ".mrt";
            string data = ctrl.ExecuteStoreProcedureSelect("SPS_GetFile", Utility.Helper.ObjectToJson(new { TableName = "Reports", FileName = fileName }));
            //ctrl.GetFile("Reports", fileName);
            //var o = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ReportFile>>(data);
            byte[] mrt = Convert.FromBase64String(Utility.Helper.GetJsonValue<string>(data, "File"));

            if (StiMobileDesigner1.Report == null)
            {
                StiReport report = new StiReport();
                report.Load(mrt);
                StiMobileDesigner1.Report = report;
            }
            else
            {
                StiMobileDesigner1.Report.Load(mrt);

            }//= report;
            CreateDataSource(StiMobileDesigner1.Report);
        }

        private void SaveReport(Stimulsoft.Report.StiReport report)
        {
            string subSystem = Request.QueryString["SubSystem"].ToString();
            byte reportTypeID = byte.Parse(Request.QueryString["ReportTypeID"].ToString());
            int companyID = ApplicationSessionStateStore.GetItem<PersonnelInfo>("UserInfo").CompanyID;
            string mode = ApplicationSessionStateStore.GetItem<string>("Mode");

            int reportID = 0;
            if (Request.QueryString["paramsJson"] != null)
                reportID = Utility.Helper.GetJsonValue<int>(Request.QueryString["paramsJson"], "ID");


            SystemFacadeController ctrl = new SystemFacadeController();
            ctrl.ExecuteStoreProcedureUpdate("SPS_SaveReport", mode, false, false,
                Utility.Helper.ObjectToJson(new
                {
                    ID = reportID,
                    CompanyID = companyID,
                    Title = report.ReportFile.Replace(".mrt", ""),
                    SubSystem = subSystem,
                    ReportTypeID = reportTypeID,
                    ReportTypeTitle = "",
                    ReportName = report.ReportName,
                    File = Convert.ToBase64String(report.SaveToByteArray())
                }));

            //ctrl.SaveReport(companyID, report.ReportName.Replace(".mrt", ""), subSystem, byte.Parse(reportTypeID), "", report.ReportFile, report.SaveToByteArray());
        }

        private void CreateDataSource(Stimulsoft.Report.StiReport report)
        {

            int companyID = ApplicationSessionStateStore.GetItem<PersonnelInfo>("UserInfo").CompanyID;
            SystemFacadeController ctrl = new SystemFacadeController();
            string subSystem = Request.QueryString["SubSystem"].ToString();
            byte reportTypeID = byte.Parse(Request.QueryString["ReportTypeID"].ToString());

            if (subSystem == "Salary" && reportTypeID == 1/*فیش*/)
            {

                StiDataSource otherDS = report.DataSources["سایر عوامل"];
                if (otherDS != null)
                {
                    report.DataSources.Remove(otherDS);
                }

                string otherItemsJson = ctrl.ExecuteStoreProcedureSelect("SPF_GetOtherItems", Utility.Helper.ObjectToJson(new { CompanyID = companyID }));
                List<Item> otherItems = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Item>>(otherItemsJson);

                StiDataTableSource dataTableSource = new StiDataTableSource();
                dataTableSource.Name = "سایر عوامل";
                dataTableSource.Alias = "سایر عوامل";
                dataTableSource.NameInSource = "سایر عوامل";
                foreach (Item item in otherItems)
                {
                    StiDataColumn col = new StiDataColumn(item.Title, item.Title, item.Title, typeof(String));
                    dataTableSource.Columns.Add(col);
                }
                report.DataSources.Add(dataTableSource);
            }
            //ctrl.SaveReport(companyID, report.ReportName.Replace(".mrt", ""), subSystem, byte.Parse(reportTypeID), "", report.ReportFile, report.SaveToByteArray());
        }
        protected void StiMobileDesigner1_SaveReport(object sender, Stimulsoft.Report.MobileDesign.StiMobileDesigner.StiSaveReportEventArgs e)
        {
            SaveReport(e.Report);
        }



        protected void StiMobileDesigner1_CreateReport(object sender, Stimulsoft.Report.MobileDesign.StiMobileDesigner.StiCreateReportEventArgs e)
        {
            ApplicationSessionStateStore.SetItem<string>("Mode", "Insert");

            StiMobileDesigner1.Report = e.Report;
            string subSystem = Request.QueryString["SubSystem"].ToString();
            byte reportTypeID = byte.Parse(Request.QueryString["ReportTypeID"].ToString());
            if (subSystem == "Salary" && reportTypeID == 1/*فیش*/)
            {
                //CreateDataSource(e.Report);
                LoadReport("{\"ID\":1 }");

                // StiMobileDesigner1.Report = e.Report;
            }
        }

        protected void StiMobileDesigner1_GetReport(object sender, Stimulsoft.Report.MobileDesign.StiMobileDesigner.StiGetReportEventArgs e)
        {

            //Ext.Net.X.Call("removeTrial()");
            // this.RegisterClientScriptBlock("trial", "removeTrial()");
            //Page.RegisterStartupScript("page", "<script type=\"text/javascript\">removeTrial();alert(\"ggg\")</script>");
            //Page.ClientScript.RegisterClientScriptBlock(Page.GetType(), "trial", "<script type=\"text/javascript\">removeTrial();alert(\"ggg\")</script>");
            //ScriptManager.RegisterClientScriptBlock(Page, Page.GetType(), "trial", "alter('dgdryrt');removeTrial()", true);
            //ScriptManager.RegisterStartupScript(this, this.GetType(), "script234", "alert('577687676867687366588')", true);

        }
        protected void StiMobileDesigner1_SaveAsReport(object sender, Stimulsoft.Report.MobileDesign.StiMobileDesigner.StiSaveAsReportEventArgs e)
        {
            SaveReport(e.Report);
        }


        protected void StiMobileDesigner1_PreRender(object sender, EventArgs e)
        {

            string mode = Request.QueryString["Mode"];
            //if (!IsPostBack)
            //{
            if (mode != null && mode == "1"/*GetReport*/)
            {
                ApplicationSessionStateStore.SetItem<string>("Mode", "Update");
                LoadReport(Request.QueryString["paramsJson"]);
            }
            //}
        }
    }
}