using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineHRS.Business.EntityControllers.CompanyControllers
{
    internal class Company_JobStatusController : DataAccess.SqlServerDataAccess
    {
        internal string GetJobStatus(int companyID)
        {
           return base.ExecuteProcedureSelect("SPC_GetJobStatus",new SqlParameter("CompanyID", companyID));
        }
        internal string JobStatusUpdate(string jobStatusJson, string mode)
        {
            return base.ExecuteProcedureSelect("SPC_JobStatusUpdate",
                new SqlParameter("JsonParameters", jobStatusJson),
                new SqlParameter("Mode", mode));
        }
        internal string GetJobStatusTitle(int companyID)
        {
            return base.ExecuteProcedureSelect("SPC_GetJobStatusTitle", new SqlParameter("CompanyID", companyID));
        }
    }
}
