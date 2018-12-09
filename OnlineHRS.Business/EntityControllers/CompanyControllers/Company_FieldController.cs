using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineHRS.Business.EntityControllers.CompanyControllers
{
   internal class Company_FieldController : DataAccess.SqlServerDataAccess
    {
       internal string GetFieldsCompany(int companyID)
        {
            string Json = base.ExecuteProcedureSelect("SPC_GetFieldsCompany",
                 new SqlParameter("CompanyID", companyID));

            return Json;
        }

       internal string GetCategoryCompany(int companyID)
       {
            string Json = base.ExecuteProcedureSelect("SPC_GetCategoryCompany",
                  new SqlParameter("CompanyID", companyID));

            return Json;
        }

       internal string GetFields(int companyID)
       {
            string Json = base.ExecuteProcedureSelect("SPC_GetFields",
                  new SqlParameter("CompanyID", companyID));

            return Json;
        }

       internal string GetCategoryFields(int companyID, int categoryID)
       {
            string Json = base.ExecuteProcedureSelect("SPC_GetCategoryFields",
                  new SqlParameter("CompanyID", companyID), 
                  new SqlParameter("CategoryID", categoryID));

            return Json;
        }

        internal void FieldCatagoryUpdate(string editInfoJson, string editMode)
        {
            base.ExecuteProcedureUpdate("SPC_GetCategoryFields",false, false,
                 new SqlParameter("JsonParameters", editInfoJson),
                 new SqlParameter("Mode", editMode));
        }
    }
}
