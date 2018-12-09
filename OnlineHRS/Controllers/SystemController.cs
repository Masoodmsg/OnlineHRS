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
using System.Web.Security;
namespace OnlineHRS
{
    public partial class Default //System
    {
        [DirectMethod(ShowMask = true, Target = MaskTarget.Page, Msg = "...در حال اعتبار سنجی")]
        public DirectResponse Login(string jsonInfo, bool isReg)
        {
            //IsValidRequest(tokenID,"0");
            HttpRequestManagement.AddRequest(HttpContext.Current.Request, "Select", "Login", jsonInfo);
            DirectResponse response = new DirectResponse();
            try
            {
                PersonnelFacadeController ctrl = new PersonnelFacadeController();
                string personnelInfoJson = ctrl.Login(jsonInfo);
                PersonnelInfo personnelInfo = Newtonsoft.Json.JsonConvert.DeserializeObject<List<PersonnelInfo>>(personnelInfoJson)[0];
                Personnel = personnelInfo;
                RemoveModule("registerationModule", "loginCompanyModule");
                //FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(1, username.Trim(),
                //   DateTime.Now, DateTime.Now.AddMinutes(Session.Timeout), false, PersonnelInfo.ID.ToString(),
                //                                                             FormsAuthentication.FormsCookiePath);

                //string encryptedTicket = FormsAuthentication.Encrypt(authTicket);
                //HttpCookie authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
                //HttpContext.Current.Response.Cookies.Add(authCookie);
                //string s = Context.User.Identity.Name;
                System.Diagnostics.Stopwatch s = new System.Diagnostics.Stopwatch();
                s.Start();
                string organizationsRoleAccess = UserAuthorization(personnelInfo);
                s.Stop();
                X.Msg.Info("زمان لاگین", s.ElapsedMilliseconds.ToString(), UI.Info).Show();


                if (isReg)
                    ApplicationSessionStateStore.EncryptMaping.Add(Utility.Helper.Encrypt(personnelInfo.CompanyID.ToString()), personnelInfo.CompanyID.ToString());

                //RemoveModule("registerationModule", "loginCompanyModule", "loginPersonnelModule");
                //response.Result = "{\"title\": '" + personnelInfo.FirstName + " " + personnelInfo.LastName + "(" + personnelInfo.CompanyName + ")', \"companyID\": " + CompanyID.ToString() + ", \"orgAccess\": '" + organizationsRoleAccess + "'}";
                response.Result = Helper.ObjectToJson(new
                {
                    title = personnelInfo.FirstName + " " + personnelInfo.LastName + "(" + personnelInfo.CompanyName + ")",
                    companyID = Helper.Encrypt(personnelInfo.CompanyID.ToString()),
                    orgAccess = organizationsRoleAccess,
                    userID = personnelInfo.ID,
                    userType = personnelInfo.UserType
                });

                response.Success = true;

            }
            catch (Exception ex)
            {
                response.Success = false;
                X.Msg.Show(new MessageBoxConfig
                {
                    Title = "خطا",
                    Message = ex.ToString(),
                    Buttons = MessageBox.Button.OK,
                    Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
                    MaskClickAction = MaskClickActions.Hide
                });
            }
            return response;
        }
        private static void IsValidRequest(string tokenID, string companyID)
        {
            //Request["ASP.NET_SessionId"])/*
            //int valueParsed;

            if (!Ext.Net.X.IsAjaxRequest ||
                string.Compare(HttpContext.Current.Session.SessionID, tokenID, StringComparison.OrdinalIgnoreCase) != 0 ||
                !Int32.TryParse(companyID, out int valueParsed))
            {
                throw new Exception("خطا امنیتی رخ داده است");

            }
        }
        private string UserAuthorization(PersonnelInfo userLogin)
        {
            SystemFacadeController authorization = new SystemFacadeController();
            if (userLogin.UserType == UserTypes.CompanyManager || userLogin.UserType == UserTypes.SysAdmin)
            {
                string modulesPathJson = authorization.GetUserTypeAuthorization(userLogin.UserType);
                List<ModulePath> modulesPath = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ModulePath>>(modulesPathJson);            //UserControl loader = new UserControl();
                foreach (ModulePath module in modulesPath)
                {
                    DesktopModuleProxy desktopModuleProxy = Ext.Net.Utilities.ControlUtils.FindControl<Ext.Net.DesktopModuleProxy>(this.LoadControl(module.Path));
                    desktopModuleProxy.RegisterModule();
                }
                return "";

            }
            else
            {
                string accessesJson = authorization.UserAuthorization(userLogin.ID, userLogin.CompanyID);
                if (accessesJson == string.Empty)
                    return string.Empty;

                List<UserAuthorizationInfo> accesses = Newtonsoft.Json.JsonConvert.DeserializeObject<List<UserAuthorizationInfo>>(accessesJson);
                string organizationRoleAccess = "";
                accesses.Select(S => S.OrganizationIDs).Distinct().ToList().ForEach(i => organizationRoleAccess += i + ",");

                List<string> modulesPath = accesses.Select(S => S.Path).Distinct().ToList();

                //----------------------------------------------------------------------------------------------------------------------------------------------
                Control userControl;
                DesktopModuleProxy desktopModuleProxy;
                List<UserAuthorizationInfo> userModuleItemAccess;
                List<string> inaccessibilityItemsID;
                Control inaccessibilityControl;
                Ext.Net.Observable controlAccess;

                foreach (string path in modulesPath)
                {

                    userControl = this.LoadControl(path);
                    desktopModuleProxy = Ext.Net.Utilities.ControlUtils.FindControl<Ext.Net.DesktopModuleProxy>(userControl);

                    userModuleItemAccess = accesses.Where(W => W.Path == path).ToList();

                    inaccessibilityItemsID = ApplicationSessionStateStore.ModuleItems.Where(W => W.ModuleID == userModuleItemAccess[0].ModuleID &&
                                                                                               !userModuleItemAccess.Select(s => s.ControlID).Contains(W.ControlID)).
                                                                                                Select(s => s.ControlID).ToList();
                    inaccessibilityItemsID.ForEach(controlID =>
                    {
                        inaccessibilityControl = Ext.Net.Utilities.ControlUtils.FindControl(desktopModuleProxy.Module.Window[0], controlID);
                        inaccessibilityControl.Visible = false;
                    });


                    foreach (UserAuthorizationInfo itemAccess in userModuleItemAccess)
                    {
                        controlAccess = Ext.Net.Utilities.ControlUtils.FindControl<Ext.Net.Observable>(desktopModuleProxy.Module.Window[0], itemAccess.ControlID);

                        if (itemAccess.AccessType == AccessTypes.Full || itemAccess.AccessType == null)
                        {
                            continue;
                        }
                        else if (itemAccess.AccessType == AccessTypes.ReadOnly)
                        {

                            var commandColumns = Ext.Net.Utilities.ControlUtils.FindChildControls<Ext.Net.CommandColumn>(controlAccess, false);
                            commandColumns.ForEach(i => i.Visible = false);

                            var buttons = Ext.Net.Utilities.ControlUtils.FindChildControls<Ext.Net.ButtonBase>(controlAccess, false);
                            buttons.ForEach(i => i.Visible = false);

                            var fields = Ext.Net.Utilities.ControlUtils.FindChildControls<Ext.Net.Field>(controlAccess, false);
                            fields.ForEach(i => i.CustomConfig.Add(new Ext.Net.ConfigItem("readOnly", "true")));


                        }
                        else if (itemAccess.AccessType == AccessTypes.Inaccessibility)
                        {
                            controlAccess.Visible = false;
                        }
                    }

                    desktopModuleProxy.RegisterModule();
                }
                return organizationRoleAccess.Remove(organizationRoleAccess.LastIndexOf(','));
            }
        }



        //[DirectMethod()]
        //public static DirectResponse SaveFile(string tableName, string fileName, string fileContent)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {
        //        SystemFacadeController fileCtrl = new SystemFacadeController();


        //        fileCtrl.SaveFile(tableName, fileName, fileContent);

        //        //string Json = Newtonsoft.Json.JsonConvert.SerializeObject(users);
        //        response.Result = "";
        //        response.Success = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        string msg = Helper.GetSqlExceptionMessage(ex);
        //        //X.Msg.Info("خطا", msg, UI.Danger).Show();
        //        X.Msg.Info(new InfoPanel() { Title = "خطا", UI = UI.Danger, Html = msg, TitleAlign = TitleAlign.Right, TextAlign = TextAlign.Right }).Show();

        //    }
        //    return response;
        //}

        //[DirectMethod()]
        //public static DirectResponse GetFile(string tableName, string fileName)
        //{
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {
        //        SystemFacadeController fileCtrl = new SystemFacadeController();
        //        response.Result = fileCtrl.GetFile(tableName, fileName); ;
        //        response.Success = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        string msg = Helper.GetSqlExceptionMessage(ex);
        //        //X.Msg.Info("خطا", msg, UI.Danger).Show();
        //        X.Msg.Info(new InfoPanel() { Title = "خطا", UI = UI.Danger, Html = msg, TitleAlign = TitleAlign.Right, TextAlign = TextAlign.Right }).Show();

        //    }
        //    return response;
        //}

        //[DirectMethod()]
        //public static DirectResponse ExecuteDynamicQuery(string tableName, string queryType, string parametersJson, string whereClause, string join, string paging, bool isID, string tokenID)
        //{


        //    IsValidRequest(tokenID);
        //    DirectResponse response = new DirectResponse();
        //    try
        //    {
        //        SystemFacadeController ctrl = new SystemFacadeController();
        //        response.Result = ctrl.ExecuteDynamicQuery(Utility.Helper.Decrypt(tableName)/* Decrypt(tableName)*/, Utility.Helper.Decrypt(queryType)/*Decrypt(queryType)*/,  parametersJson,  whereClause,  join,  paging,  isID);
        //        response.Success = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Success = false;
        //        string msg = Helper.GetSqlExceptionMessage(ex);
        //        //X.Msg.Info("خطا", msg, UI.Danger).Show();
        //        X.Msg.Info(new InfoPanel() { Title = "خطا", UI = UI.Danger, Html = msg, TitleAlign = TitleAlign.Right, TextAlign = TextAlign.Right }).Show();

        //    }
        //    return response;
        //}

        [DirectMethod()]
        public static string ExecuteStoreProcedureSelect(string spName, string parametersJson, string tokenID, string companyID)
        {
            try
            {
                companyID = Decrypt(companyID);
                spName = Decrypt(spName);
                parametersJson = Helper.SetJsonValue(parametersJson, "CompanyID", companyID, "int");
                HttpRequestManagement.AddRequest(HttpContext.Current.Request, "Select", spName, parametersJson);

                IsValidRequest(tokenID, companyID);

                SystemFacadeController ctrl = new SystemFacadeController();

                return ctrl.ExecuteStoreProcedureSelect(spName, parametersJson);

            }
            catch (Exception ex)
            {
                //response.Success = false;
                string msg = Helper.GetSqlExceptionMessage(ex);
                //X.Msg.Info("خطا", msg, UI.Danger).Show();
                X.Msg.Info(new InfoPanel() { Title = "خطا", UI = UI.Danger, Html = msg, TitleAlign = TitleAlign.Right, TextAlign = TextAlign.Right }).Show();
                return "Error";
            }
            //return response;
        }

        [DirectMethod()]
        public static string ExecuteStoreProcedureUpdate(string spName, string spMode, bool isID, bool isResult, string parametersJson, string tokenID, string companyID)
        {

            try
            {
                spMode = Decrypt(spMode);
                spName = Decrypt(spName);
                companyID = Decrypt(companyID);
                parametersJson = Helper.SetJsonValue(parametersJson, "CompanyID", companyID, "int");
                HttpRequestManagement.AddRequest(HttpContext.Current.Request, spMode, spName, parametersJson);
                IsValidRequest(tokenID, companyID);
                
                //DirectResponse response = new DirectResponse();
                SystemFacadeController ctrl = new SystemFacadeController();

                return ctrl.ExecuteStoreProcedureUpdate(spName, spMode, isID, isResult, parametersJson);
                //response.Success = true;
            }
            catch (Exception ex)
            {
                //response.Success = false;
                string msg = Helper.GetSqlExceptionMessage(ex);
                //X.Msg.Info("خطا", msg, UI.Danger).Show();
                X.Msg.Info(new InfoPanel() { Title = "خطا", UI = UI.Danger, Html = msg, TitleAlign = TitleAlign.Right, TextAlign = TextAlign.Right }).Show();
                return "Error";
            }
            //return response;
        }


    }


}