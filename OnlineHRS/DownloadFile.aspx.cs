using OnlineHRS.Business.FacadeControllers;
using Stimulsoft.Report;
using Stimulsoft.Report.Mobile;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace OnlineHRS
{
    public partial class DownloadFile : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string fileType = Request.QueryString["FileType"].ToString();
                string data = Request.QueryString["jsonData"].ToString();

                if (fileType == "SalaryFish")
                {
                    SystemFacadeController ctrl = new SystemFacadeController();
                    string otherItemsJson = ctrl.ExecuteStoreProcedureSelect("SPF_PersonnelSalaryPrintFish", data);

                    System.Data.DataSet ds = Newtonsoft.Json.JsonConvert.DeserializeObject<System.Data.DataSet>(otherItemsJson);
                    ds.Tables[1].TableName = "Benefit";
                    ds.Tables[3].TableName = "سایر عوامل";
                    GenerateReport(this, int.Parse(ds.Tables[0].Rows[0]["ReportID"].ToString()), ds, "Pdf");
                }
            }
        }

        public static void GenerateReport(Page page, int reportID,DataSet ds , string format, params DataTable[] dtSub)
        {
            SystemFacadeController ctrl = new SystemFacadeController();
            string jsonFile = ctrl.ExecuteStoreProcedureSelect("SPS_GetFile",Utility.Helper.ObjectToJson(new { TableName = "Reports", FileName = reportID.ToString() + ".mrt" }));
            //ctrl.GetFile("Reports", reportID.ToString() + ".mrt");
            byte[] filesUpdload = Convert.FromBase64String(Utility.Helper.GetJsonValue<string>(jsonFile, "File"));
           
           
            if (filesUpdload == null || filesUpdload.Length <= 0)
                return;
            StiReport stiReport = new Stimulsoft.Report.StiReport();
            stiReport.Load(filesUpdload);
            stiReport.RegData(ds);
            stiReport.Render(false);
            switch (format)
            {
                case "Pdf":
                    StiReportResponse.ResponseAsPdf(page, stiReport);
                    break;
                case "Word2007":
                    StiReportResponse.ResponseAsWord2007(page, stiReport);
                    break;
                case "Excel2007":
                    StiReportResponse.ResponseAsExcel2007(page, stiReport);
                    break;
                case "Csv":
                    StiReportResponse.ResponseAsCsv(page, stiReport);
                    break;
                case "ImageJpeg":
                    StiReportResponse.ResponseAsJpeg(page, stiReport);
                    break;
            }
        }
    }

   
}