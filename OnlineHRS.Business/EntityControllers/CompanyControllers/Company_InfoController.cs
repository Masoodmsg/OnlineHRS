using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility;

namespace OnlineHRS.Business.EntityControllers.CompanyControllers
{
    internal class Company_InfoController : DataAccess.SqlServerDataAccess
    {

        internal int CompanyRegistration(string companyJson, string password)
        {
           
            return int.Parse(base.ExecuteProcedureUpdate("SPC_CompanyRegistration",true, false,
                new SqlParameter("JsonParameters", companyJson), 
                new SqlParameter("Password", Helper.GetMD5HashNumber(password))));
        }
        internal string GetCompanyInfo(int companyID)
        {
            string json = base.ExecuteProcedureSelect("SPC_GetCompanyInfo",
                new SqlParameter("CompanyID", companyID));

            return json;

           
        }
        internal void EditCompanyInfo(string companyInfoJson, string mode)
        {
             base.ExecuteProcedureUpdate("SPC_CompanyUpdate", false, false,
               new SqlParameter("JsonParameters", companyInfoJson),
               new SqlParameter("Mode", mode));

        }
      

        //protected override bool CheckBeforeUpdate(Company_Info obj, ref string errorMessag)
        //{
        //    if (obj.EmailCompany != null && obj.EmailCompany != string.Empty &&
        //        _Context.Company_Info.Where(W => W.EmailCompany == obj.EmailCompany.Trim() && W.ID != obj.ID).Count() > 0)
        //    {
        //        errorMessag = ".آدرس ایمیل شرکت تکراری میباشد";
        //        return false;
        //    }
        //    else if (obj.PostCode != null && obj.PostCode != string.Empty &&
        //        _Context.Company_Info.Where(W => W.PostCode == obj.PostCode && W.ID != obj.ID).Count() > 0)
        //    {
        //        errorMessag = ".کد پستی شرکت تکراری میباشد";
        //        return false;
        //    }
        //    else if (obj.EconomicCode != null && obj.EconomicCode != string.Empty &&
        //        _Context.Company_Info.Where(W => W.EconomicCode == obj.EconomicCode && W.ID != obj.ID).Count() > 0)
        //    {
        //        errorMessag = ".کد اقتصادی شرکت تکراری میباشد";
        //        return false;
        //    }
        //    else if (obj.PhoneNumberCompany != null && obj.PhoneNumberCompany != string.Empty &&
        //        _Context.Company_Info.Where(W => W.PhoneNumberCompany == obj.PhoneNumberCompany && W.ID != obj.ID).Count() > 0)
        //    {
        //        errorMessag = ".شماره تلفن شرکت تکراری میباشد";
        //        return false;
        //    }
        //    else if (obj.TFN != null && obj.TFN != string.Empty &&
        //        _Context.Company_Info.Where(W => W.TFN == obj.TFN && W.ID != obj.ID).Count() > 0)
        //    {
        //        errorMessag = ".شماره پرونده مالیاتی شرکت تکراری میباشد";
        //        return false;
        //    }
        //    else if (obj.WorkshopCode != null && obj.WorkshopCode != string.Empty &&
        //        _Context.Company_Info.Where(W => W.WorkshopCode == obj.WorkshopCode && W.ID != obj.ID).Count() > 0)
        //    {
        //        errorMessag = ".کد کارگاه شرکت تکراری میباشد";
        //        return false;
        //    }
        //    return true;
        //} 

    }
}
