using System;
using System.Collections.Generic;
using System.Data.SqlClient;

using System.Text;


namespace OnlineHRS.Business.EntityControllers.SystemControllers
{
   internal class System_HttpRequestController: DataAccess.SqlServerDataAccess
    {
        internal void InsertHttpRequests(string reaquestInfoJson)
        {
            base.ExecuteDynamicQuery("System_HttpRequetsInfo",
                 "insert", 
                 reaquestInfoJson,null,null,null,false);
        }
    }
}
