using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OnlineHRS.Business.EntityControllers.SystemControllers;


namespace OnlineHRS.Business.FacadeControllers
{
    public class SystemFacadeController
    {
        public string UserAuthorization(int userID, int companyID)
        {
            //Personnel_InfoRoleAccessController roleAccess = new Personnel_InfoRoleAccessController();
            System_UserAuthorizationController userAuthorization = new System_UserAuthorizationController();
            //List<int> roleIDs = roleAccess.GetUserRolesIDs(userID);
            return userAuthorization.GetUserAuthorization(userID, companyID);

        }
        public string GetUserTypeAuthorization(byte userTypeID)
        {
            System_UserAuthorizationController userAuthorization = new System_UserAuthorizationController();
            return userAuthorization.GetUserTypeAuthorization(userTypeID);

        }
        public string GetModuleItems()
        {

            System_UserAuthorizationController userAuthorization = new System_UserAuthorizationController();
            return userAuthorization.GetModuleItems();

        }
      

        public void InsertHttpRequests(string reaquestInfoJson)
        {
            System_HttpRequestController ctrl = new System_HttpRequestController();
            ctrl.InsertHttpRequests(reaquestInfoJson);
        }

        public void SaveFile(string tableName, string fileName, string fileContent)
        {
            System_FileController ctrl = new System_FileController();
            ctrl.SaveFile( tableName,  fileName,  fileContent);
        }
        public string GetFile(string tableName, string fileName)
        {
            System_FileController ctrl = new System_FileController();
            return  ctrl.GetFile(tableName, fileName);
        }
        public string ExecuteDynamicQuery(string tableName, string queryType, string parametersJson, string whereClause, string join, string paging, bool isID)
        {
            System_ExecuteQueryController ctrl = new System_ExecuteQueryController();
            return ctrl.ExecuteDynamicQuery(tableName, queryType, parametersJson, whereClause, join, paging, isID);
        }
        public string ExecuteStoreProcedureSelect(string spName, string parametersJson)
        {
            System_ExecuteQueryController ctrl = new System_ExecuteQueryController();
            return ctrl.ExecuteStoreProcedureSelect(spName, parametersJson);
        }
        public string ExecuteStoreProcedureUpdate(string spName, string spMode, bool isID, bool isResult, string parametersJson)
        {
            System_ExecuteQueryController ctrl = new System_ExecuteQueryController();
            return ctrl.ExecuteStoreProcedureUpdate(spName, spMode, isID, isResult, parametersJson);
        }

        public void SaveReport(int companyID,string title ,string subSystem, byte reportTypeID ,string reportTypeTitle ,string reportName ,byte[] file )
        {
            System_ReportController ctrl = new System_ReportController();
            ctrl.SaveReport(companyID, title, subSystem, reportTypeID, reportTypeTitle, reportName, file);
        }
      
    }
}
