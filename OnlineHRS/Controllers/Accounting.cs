using Ext.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OnlineSalarySystem.Business;
using OnlineSalarySystem.Business.FacadeControllers;
using System.Web.UI;

namespace OnlineSalarySystem
{
    public partial class Default
    {
        [DirectMethod(ShowMask = true, Target = MaskTarget.Page, Msg = "در حال ثبت نام...")]
        public DirectResponse Register(short personType, short? legalPersonType, string legalPersonTypeTitle, string name, string familyName, string email, string username, string password)
        {
            Company company = new Company();
            DirectResponse response = new DirectResponse();
            try
            {
                AccountingFacadeController ctrl = new AccountingFacadeController();
                company.PersonType = personType;
                company.PersonTypeTitle = personType == 1 ? "حقیقی" : "حقوقی";
                company.LegalPersonType = personType == 1 ? null : legalPersonType;
                company.LegalPersonTypeTitle = personType == 1 ? null : legalPersonTypeTitle;
                company.Name = name;
                company.FamilyName = personType == 1 ? familyName : null;
                company.Username = username;
                company.Password = password;
                company.EmailCompany = email;
                company.RegisterDate = DateTime.Now;
                ctrl.CompanyRegistration(company);
                response.Success = true;
                LoginCompany(username, password);

            }
            catch (Exception ex)
            {
                response.Success = false;
                X.Msg.Show(new MessageBoxConfig
                {
                    Title = "خطا",
                    Message = ex.Message,
                    Buttons = MessageBox.Button.OK,
                    Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),
                    //AnimEl = this.Button8.ClientID,
                    //Fn = new JFunction { Fn = "showResult" }
                });
            }
            return response;
        }


        [DirectMethod(ShowMask = true, Target = MaskTarget.Page, Msg = "در حال اعتبار سنجی...")]
        public DirectResponse LoginCompany(string username, string password)
        {
            Company company;
            DirectResponse response = new DirectResponse();
            try
            {
                AccountingFacadeController ctrl = new AccountingFacadeController();
                company = ctrl.LoginCompany(username, password);
                RemoveModule("registerationModule", "loginCompanyModule", "loginPersonnelModule");
                Session["CompanyInfo"] = company;
                response.Success = true;

            }
            catch (Exception ex)
            {
                response.Success = false;
                X.Msg.Show(new MessageBoxConfig
                {
                    Title = "خطا",
                    Message = ex.Message,
                    Buttons = MessageBox.Button.OK,
                    Icon = (MessageBox.Icon)Enum.Parse(typeof(MessageBox.Icon), "ERROR"),

                    //AnimEl = this.Button8.ClientID,
                    //Fn = new JFunction { Fn = "showResult" }
                });
            }
            return response;
        }
       
    }
}