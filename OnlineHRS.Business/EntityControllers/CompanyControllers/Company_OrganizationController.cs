using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OnlineHRS.DataAccess;
using System.Data.SqlClient;

namespace OnlineHRS.Business.EntityControllers.CompanyControllers
{
    internal class Company_OrganizationController
    {
        internal string GetOrganizationUnit(int companyID, int orgID, int orgVersionID)
        {
            //return _Context.Company_Organization.Where(W => W.CompanyID == companyID && W.ID == orgID).ToList();
            SqlServerDataAccess sql = new SqlServerDataAccess();
            return sql.ExecuteProcedureSelect("SPC_GetOrganizationUnit",
                                                   new SqlParameter("CompanyID", companyID),
                                                   new SqlParameter("OrgVersionID", orgVersionID),
                                                   new SqlParameter("ID", orgID));

        }
        internal string GetOrganizationTree(int companyID, int orgVersionID, string orgAccess)
        {
            SqlServerDataAccess sql = new SqlServerDataAccess();
            return sql.ExecuteProcedureSelect("SPC_GetOrganizationTree",
                                                   new SqlParameter("CompanyID", companyID),
                                                   new SqlParameter("VersionID", orgVersionID),
                                                   new SqlParameter("OrgAccess", orgAccess));
            
            //return String.Concat(_Context.SPC_GetOrganizationTree(companyID, orgVersionID, orgAccess));
        }

        internal void CutOrganizationUnit(int companyID, string mode, int orgUnitSourceID, int orgUnitDestinationID)
        {
            //base.Update(new Company_Organization { ID = orgUnitSourceID, ParentID = orgUnitDestinationID });
            SqlServerDataAccess sql = new SqlServerDataAccess();
            sql.ExecuteProcedureUpdate("SPC_CutOrganizationUnit", false, false,
                                                   new SqlParameter("OrgUnitSourceID", orgUnitSourceID),
                                                   new SqlParameter("OrgUnitDestinationID", orgUnitDestinationID));
        }
        internal int OrganizationUpdate(string mode, string jsonParameters)
        {

            //org.ID = (int)_Context.SPC_OrganizationUpdate(mode, org.ID, org.CompanyID, org.Code, org.Name, org.Desc,
            //                               org.ParentID, org.ActiveState, org.OrgLevelID, org.UnitPropDate,
            //                               org.CityID, org.CityName, org.CreateDate, org.Degree, org.HistoryDesc, org.OrgVersionID).First();

          

            SqlServerDataAccess sql = new SqlServerDataAccess();
            return int.Parse( sql.ExecuteProcedureUpdate("SPC_OrganizationUpdate", true, false,
                                                   new SqlParameter("Mode", mode),
                                                   new SqlParameter("JsonParameters", jsonParameters)));

        }

       
    }
}
