using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineHRS.Business.EntityControllers.CompanyControllers
{
    internal class Company_PostController 
    {
       
        internal string GetPostInfo(int companyID, int postID)
        {
            DataAccess.SqlServerDataAccess sql = new DataAccess.SqlServerDataAccess();
           return sql.ExecuteProcedureSelect("SPC_GetPostInfo", new SqlParameter("CompanyID", companyID),
                new SqlParameter("PostID", postID));


        }
    }
}
