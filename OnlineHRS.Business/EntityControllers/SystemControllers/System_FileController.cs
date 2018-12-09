using System;
using System.Collections.Generic;
using System.Data.SqlClient;

using System.Text;


namespace OnlineHRS.Business.EntityControllers.SystemControllers
{
   internal class System_FileController : DataAccess.SqlServerDataAccess
    {
        internal void SaveFile(string tableName, string fileName, string fileContent)
        {
            base.ExecuteProcedureUpdate("SPS_SaveFile", false, false,
                new SqlParameter("TableName", tableName),
                new SqlParameter("FileName", fileName),
                new SqlParameter("FileContent", fileContent/*Convert.FromBase64String(fileContent)*/));
        }

        internal string GetFile(string tableName, string fileName)
        {
           return base.ExecuteProcedureSelect("SPS_GetFile", 
                new SqlParameter("TableName", tableName),
                new SqlParameter("FileName", fileName));
        }
    }
}
