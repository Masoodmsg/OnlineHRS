using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineHRS.Business.EntityControllers.SystemControllers
{
    internal class System_ReportController : DataAccess.SqlServerDataAccess
    {
        internal void SaveReport(int companyID, string title, string subSystem, byte reportTypeID, string reportTypeTitle, string reportName, byte[] file)
        {
            base.ExecuteProcedureUpdate("SPS_SaveReport", false, false,
                new SqlParameter("CompanyID", companyID),
                new SqlParameter("Title", title),
                new SqlParameter("SubSystem", subSystem),
                new SqlParameter("ReportTypeID", reportTypeID),
                new SqlParameter("ReportTypeTitle", reportTypeTitle),
                new SqlParameter("ReportName", reportName),
                new SqlParameter("File", file));
        }

      

        
    }

}

