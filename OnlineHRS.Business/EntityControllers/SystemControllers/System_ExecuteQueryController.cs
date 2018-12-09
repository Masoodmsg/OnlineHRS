using System;
using System.Collections.Generic;
using System.Data.SqlClient;

using System.Text;


namespace OnlineHRS.Business.EntityControllers.SystemControllers
{
    internal class System_ExecuteQueryController : DataAccess.SqlServerDataAccess
    {
        internal string ExecuteDynamicQuery(string tableName, string queryType, string parametersJson, string whereClause, string join, string paging, bool isID)
        {
            return base.ExecuteDynamicQuery(tableName, queryType, parametersJson, whereClause, join, paging, isID);
        }

        internal string ExecuteStoreProcedureSelect(string spName, string parametersJson)
        {
            return base.ExecuteProcedureSelect(spName, new SqlParameter("ParametersJson", parametersJson));
        }
        internal string ExecuteStoreProcedureUpdate(string spName,string spMode, bool isID, bool isResult , string parametersJson)
        {
            return base.ExecuteProcedureUpdate(spName, isID, isResult, new SqlParameter("Mode", spMode), 
                                                             new SqlParameter("ParametersJson", parametersJson));
        }
    }
}
