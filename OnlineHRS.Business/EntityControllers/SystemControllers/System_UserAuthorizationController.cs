using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineHRS.Business.EntityControllers.SystemControllers
{
    internal class System_UserAuthorizationController : DataAccess.SqlServerDataAccess
    {
        
        internal string GetUserAuthorization(int userID, int companyID)
        {
           
            string Json = base.ExecuteProcedureSelect("SPS_SystemUserAuthorization",
                   new SqlParameter("UserID", userID),
                   new SqlParameter("CompanyID", companyID));

            return Json;

        }
        internal string GetUserTypeAuthorization(byte userTypeID)
        {
           
            string Json = base.ExecuteProcedureSelect("SPS_GetUserTypeAuthorization",
                   new SqlParameter("UserTypeID", userTypeID));

            return Json;

        }

        internal string GetModuleItems()
        {

            string Json = base.ExecuteProcedureSelect("SPS_GetModuleItems");

            return Json;

        }
    }
}
