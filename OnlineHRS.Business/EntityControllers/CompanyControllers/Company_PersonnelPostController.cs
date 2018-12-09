using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineHRS.Business.EntityControllers.CompanyControllers
{
    internal class Company_PersonnelPostController
    {
       
        internal string GetPersonnelsPost(int companyID, int postID)
        {
           // return _Context.SPC_GetPersonnelsPost(companyID, postID).ToList();
            DataAccess.SqlServerDataAccess sql = new DataAccess.SqlServerDataAccess();
            return sql.ExecuteProcedureSelect("SPC_GetPersonnelsPost", new SqlParameter("CompanyID", companyID),
                 new SqlParameter("PostID", postID));
        }
       
    }
}
