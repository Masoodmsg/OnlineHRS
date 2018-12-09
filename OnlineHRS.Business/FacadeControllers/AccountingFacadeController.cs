using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OnlineSalarySystem.Business.EntityControllers;
namespace OnlineSalarySystem.Business.FacadeControllers
{
    public class AccountingFacadeController
    {
        public void CompanyRegistration(Company company)
        {
            CompanyController ctrl = new CompanyController();
            ctrl.CompanyRegistration(company);
        }

        public Company LoginCompany(string username, string password)
        {
            CompanyController ctrl = new CompanyController();
            return ctrl.LoginCompany(username, password);
        }
    }
}
