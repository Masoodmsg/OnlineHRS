using Ext.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OnlineSalarySystem.Business;
using OnlineSalarySystem.Business.FacadeControllers;
using System.Web.UI;
namespace OnlineSalarySystem
{
    public partial class Default
    {
        [DirectMethod()]
        public DirectResponse ShowCompanyInfo()
        {
            DirectResponse response = new DirectResponse();
            Company info = Session["CompanyInfo"] as Company;
            string Json = Newtonsoft.Json.JsonConvert.SerializeObject(info);
            response.Result = Json;
            response.Success = true;
            return response;

        }
        [DirectMethod(ShowMask = true, Target = MaskTarget.Page, Msg = "در حال ویرایش اطلاعات...")]
        public void EditCompanyInfo(string companyJson)
        {
            Company info = Newtonsoft.Json.JsonConvert.DeserializeObject<Company>(companyJson);
        }
    }
}