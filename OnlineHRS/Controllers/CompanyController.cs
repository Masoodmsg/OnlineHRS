using Ext.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OnlineHRS.Business;
using OnlineHRS.Business.FacadeControllers;
using System.Web.UI;
using Utility;
using Utility.DBConstants;
namespace OnlineHRS
{
    public partial class Default
    {
        //[DirectMethod()]
        //public DirectResponse CompanyRegistration(string jsonData, string username, string password)
        //{
        //    /*short personType, short? legalPersonType, string legalPersonTypeTitle, string name, string email, string username, string password, string employerName, string employerFamily, string employerNationalCode*/
        //    CompanyFacadeController ctrl = new CompanyFacadeController();
        //    //Company_Info company = new Company_Info();
        //    //Personnel_Info user = new Personnel_Info();
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {

        //      /*  company.PersonType = personType;
        //        company.PersonTypeTitle = personType == 1 ? "حقیقی" : "حقوقی";
        //        company.LegalPersonType = personType == 1 ? null : legalPersonType;
        //        company.LegalPersonTypeTitle = personType == 1 ? null : legalPersonTypeTitle;
        //        company.Name = name.Trim();
        //        company.BranchCode = 1;
        //        company.BranchName = "شعبه مرکزی";

        //        user.FirstName = employerName.Trim();
        //        user.LastName = employerFamily.Trim();
        //        user.NationalCode = employerNationalCode;
        //        //user.Username = username.Trim().ToLower();
        //        user.Password = Helper.GetMD5HashString(password.Trim());
        //        user.UserType = UserTypes.CompanyManager;
        //        user.RegisterDate = Helper.GetPersianDate(DateTime.Now, true);
        //        user.Activated = true;
        //        user.Email = email.Trim();
        //        user.PostName = "مدیر عامل";
        //        //user.Company_Info = company;
        //        company.Personnel_Info = user;*/
        //       int companyID = ctrl.CompanyRegistration(jsonData, password);

        //        response.Success = true;
        //        X.Call("setCompanyID", companyID);
                
        //        //Login(username.Trim().ToLower(), password.Trim());

        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        string msg = Helper.GetSqlExceptionMessage(ex);
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = msg,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //    return response;
        //}




        //[DirectMethod()]
        //public static DirectResponse ShowCompanyInfo(int companyID)
        //{
        //    DirectResponse response = new DirectResponse();
        //    CompanyFacadeController ctrl = new CompanyFacadeController();
            
        //    string Json = ctrl.GetCompanyInfo(companyID);
        //    response.Result = Json;
        //    response.Success = true;
        //    return response;

        //}
        //[DirectMethod()]
        //public static DirectResponse EditCompanyInfo(string companyInfoJson)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {

        //        CompanyFacadeController ctrl = new CompanyFacadeController();
               
        //        ctrl.EditCompanyInfo(companyInfoJson, "Edit");
        //        response.Success = true;

        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = ex.Message,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //    return response;
        //}

       

       
        //[DirectMethod()]
        //public static DirectResponse SaveOrganizationUnit(string orgUnitJson, string editMode)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {

        //        CompanyFacadeController ctrl = new CompanyFacadeController();
        //        //Company_Organization editInfo = Newtonsoft.Json.JsonConvert.DeserializeObject<Company_Organization>(orgUnitJson);

        //        response.Result = ctrl.SaveOrganizationUnit(orgUnitJson, editMode);
        //        response.Success = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = ex.Message,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //    return response;
        //}
        //[DirectMethod()]
        //public static DirectResponse GetOrganizationTree(int companyID, int orgVersionID, string orgAccess)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {
        //        CompanyFacadeController ctrl = new CompanyFacadeController();
        //        string organizationJson = ctrl.GetOrganizationTree(companyID, orgVersionID, orgAccess);
        //        //string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(organization);
        //        response.Result = organizationJson;
        //        response.Success = true;

        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        string msg = Helper.GetSqlExceptionMessage(ex);
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = msg,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //    return response;
        //}

        //[DirectMethod()]
        //public static DirectResponse GetOrganizationUnit(int companyID, int orgID, int orgVersionID)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {

        //        CompanyFacadeController ctrl = new CompanyFacadeController();
        //        string jsonData = ctrl.GetOrganizationUnit(companyID, orgID, orgVersionID);
                
        //        response.Result = jsonData;
        //        response.Success = true;
        //        return response;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = ex.Message,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //    return response;
        //}

        //[DirectMethod()]
        //public static DirectResponse PasteOrganizationUnit(string mode, int orgUnitSourceID, int orgUnitDestinationID, int orgVerID, int companyID)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {

        //        CompanyFacadeController ctrl = new CompanyFacadeController();
        //        ctrl.PasteOrganizationUnit(companyID, mode, orgUnitSourceID, orgUnitDestinationID, orgVerID);

        //        response.Success = true;
        //        return response;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        string msg = Helper.GetSqlExceptionMessage(ex);
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = msg,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //    return response;
        //}

        //[DirectMethod()]
        //public static DirectResponse GetFieldsTree(int companyID)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {

        //        CompanyFacadeController ctrl = new CompanyFacadeController();
        //        string jsonData = ctrl.GetFieldsCompany(companyID);
                
        //        response.Result = jsonData;
        //        response.Success = true;

        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = ex.Message,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //    return response;
        //}


        //[DirectMethod()]
        //public static DirectResponse GetCategories(int companyID)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {

        //        CompanyFacadeController ctrl = new CompanyFacadeController();
        //        string jsonData = ctrl.GetCategoryCompany(companyID);
               
        //        response.Result = jsonData;
        //        response.Success = true;

        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = ex.Message,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //    return response;
        //}
        //[DirectMethod()]
        //public static DirectResponse GetFields(int companyID, int categoryID)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {

        //        CompanyFacadeController ctrl = new CompanyFacadeController();
        //        string jsonData = ctrl.GetFields(companyID, categoryID);
               
        //        response.Result = jsonData;
        //        response.Success = true;

        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = ex.Message,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //    return response;
        //}
        //[DirectMethod()]
        //public static void SaveFieldCatagory( string fieldJson, string editMode)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {

        //        CompanyFacadeController ctrl = new CompanyFacadeController();
                
        //        //editInfo.ActiveDate = Utility.Helper.GetPersianDate(DateTime.Now.Date, true);
        //        ctrl.SaveFieldCatagory(fieldJson, editMode);
        //        response.Success = true;

        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = ex.Message,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //}
        //[DirectMethod()]
        //public static DirectResponse GetPostInfo(int companyID, int postID)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {
        //        CompanyFacadeController ctrl = new CompanyFacadeController();
        //        string jsonData = ctrl.GetPostInfo(companyID, postID);
                
        //        response.Result = jsonData;
        //        response.Success = true;

        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        string msg = Helper.GetSqlExceptionMessage(ex);
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = msg,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //    return response;
        //}

        
        //[DirectMethod()]
        //public static DirectResponse GetJobStatus(int companyID)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {
        //        CompanyFacadeController ctrl = new CompanyFacadeController();
        //        string jsonData = ctrl.GetJobStatus(companyID);
        //        response.Result = jsonData;
        //        response.Success = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        string msg = Helper.GetSqlExceptionMessage(ex);
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = msg,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //    return response;
        //}
        //[DirectMethod()]
        //public static DirectResponse GetJobStatusTitle(int companyID)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {
        //        CompanyFacadeController ctrl = new CompanyFacadeController();
        //        string jsonData = ctrl.GetJobStatusTitle(companyID);
        //        response.Result = jsonData;
        //        response.Success = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        string msg = Helper.GetSqlExceptionMessage(ex);
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = msg,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //    return response;
        //}
        //[DirectMethod()]
        //public static DirectResponse EditJobStatus(string jsonData, string editMode)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {
        //        CompanyFacadeController ctrl = new CompanyFacadeController();
        //        //Company_JobStatus editInfo = Newtonsoft.Json.JsonConvert.DeserializeObject<Company_JobStatus>(jsonData);

        //        jsonData = ctrl.JobStatusUpdate(jsonData, editMode);
        //        //jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(jobStatus);
        //        response.Result = jsonData;
        //        response.Success = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        string msg = Helper.GetSqlExceptionMessage(ex);
        //        X.Msg.Show(new MessageBoxConfig
        //        {
        //            Title = "خطا",
        //            Message = msg,
        //            Buttons = MessageBox.Button.OK,
        //            Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
        //        });
        //    }
        //    return response;
        //}
    }
}