using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OnlineHRS.Business.EntityControllers.CompanyControllers;
using OnlineHRS.Business.EntityControllers.SystemControllers;
using Utility.DBConstants;
using System.Data.Entity;
using OnlineHRS.Business.EntityControllers.PersonnelControllers;
using Utility;

namespace OnlineHRS.Business.FacadeControllers
{
    public class CompanyFacadeController
    {
        public int CompanyRegistration(string companyJson, string password)
        {
            Company_InfoController InformationCtrl = new Company_InfoController();
            
           return InformationCtrl.CompanyRegistration(companyJson, password);
           
        }
        public string GetCompanyInfo(int companyID)
        {
            Company_InfoController InformationCtrl = new Company_InfoController();
            // Personnel_InfoController userInfo = new Personnel_InfoController();

            string comInfo = InformationCtrl.GetCompanyInfo(companyID);
          
            return comInfo;
        }
        public void EditCompanyInfo(string companyInfoJson, string mode)
        {
            Company_InfoController InformationCtrl = new Company_InfoController();
            // Personnel_InfoController userCtrl = new Personnel_InfoController();
            InformationCtrl.EditCompanyInfo( companyInfoJson,  mode);
            //company.Personnel_Info = userCtrl.GetByID(company.ID);

            //return company;
        }



      

        public int SaveOrganizationUnit(string editInfoJson, string editMode)
        {
            Company_OrganizationController ctrl = new Company_OrganizationController();
            return ctrl.OrganizationUpdate(editMode, editInfoJson);

        }
        public string GetOrganizationUnit(int companyID, int orgID, int orgVersionID)
        {
            Company_OrganizationController ctrl = new Company_OrganizationController();
            return ctrl.GetOrganizationUnit(companyID, orgID,  orgVersionID);
        }
        public string GetOrganizationTree(int companyID, int orgVersionID, string orgAccess)
        {
            Company_OrganizationController ctrl = new Company_OrganizationController();
            //Company_OrganizationLevelController orgLevel = new Company_OrganizationLevelController();
            string jsonData = ctrl.GetOrganizationTree(companyID, orgVersionID,orgAccess);
            //Object icons = orgLevel.GetOrganizationLevelIcons(companyID);
           // List<Object> data = new List<object>();
            //data.Add(units);
            //data.Add(icons);
            return jsonData;
        }

        public void PasteOrganizationUnit(int companyID, string mode, int orgUnitSourceID, int orgUnitDestinationID, int orgVerID)
        {
            Company_OrganizationController ctrl = new Company_OrganizationController();
            if (mode == "Cut")
            {
                //ctrl.CutOrganizationUnit(companyID, mode, orgUnitSourceID, orgUnitDestinationID);
                ctrl.OrganizationUpdate(mode,
                    Helper.ObjectToJson(new { ID = orgUnitSourceID, ParentID = orgUnitDestinationID, CompanyID = companyID, OrgVersionID = orgVerID }));
                    
            }
            else if (mode == "Copy")
            {
                //ctrl.CutOrganizationUnit(companyID, mode, orgUnitSourceID, orgUnitDestinationID);
                ctrl.OrganizationUpdate(mode,
                     Helper.ObjectToJson(new { ID = orgUnitSourceID, ParentID = orgUnitDestinationID, CompanyID = companyID, OrgVersionID = orgVerID }));
            }
            else if (mode == "Delete")
            {
                ctrl.OrganizationUpdate(mode, Helper.ObjectToJson(new { ID = orgUnitSourceID,  CompanyID = companyID, OrgVersionID = orgVerID }));
            }
        }

        public string GetFieldsCompany(int companyID)
        {
            Company_FieldController ctrl = new Company_FieldController();
            return ctrl.GetFieldsCompany(companyID);

        }

        public void SaveFieldCatagory(string editInfoJson, string editMode)
        {
            Company_FieldController ctrl = new Company_FieldController();

            ctrl.FieldCatagoryUpdate(editInfoJson, editMode);
        }
        public string GetCategoryCompany(int companyID)
        {
            Company_FieldController ctrl = new Company_FieldController();
            return ctrl.GetCategoryCompany(companyID);
        }
        public string GetFields(int companyID, int categoryID = 0)
        {
            Company_FieldController ctrl = new Company_FieldController();
            if (categoryID != 0)
                return ctrl.GetCategoryFields(companyID, categoryID);
            else
                return ctrl.GetFields(companyID);
        }
       

      
        public string GetPostInfo(int companyID, int postID)
        {
            Company_PostController postCtrl = new Company_PostController();
            Company_PersonnelPostController personnelPostCtrl = new Company_PersonnelPostController();
            string post = postCtrl.GetPostInfo(companyID, postID);
            string personnelPost = personnelPostCtrl.GetPersonnelsPost(companyID, postID);
            
            return "[" + post + "," + personnelPost + "]";
        }
       

       
       
        public string GetJobStatus(int companyID)
        {
            Company_JobStatusController ctrl = new Company_JobStatusController();
            return ctrl.GetJobStatus(companyID);
        }
        public string GetJobStatusTitle(int companyID)
        {
            Company_JobStatusController ctrl = new Company_JobStatusController();
            return ctrl.GetJobStatusTitle(companyID);
        }
        public string JobStatusUpdate(string jobStatusJson, string mode)
        {
            Company_JobStatusController ctrl = new Company_JobStatusController();
            return ctrl.JobStatusUpdate(jobStatusJson, mode);
            
        }
    }
}
