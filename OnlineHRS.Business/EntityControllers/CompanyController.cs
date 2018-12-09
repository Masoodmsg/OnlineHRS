using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineSalarySystem.Business.EntityControllers
{
    internal class CompanyController : EFEntityController<Company, OnlineSalarySystemEntities>
    {
        internal void CompanyRegistration(Company company)
        {
            try
            {
                if (!IsExistsUsername(company.Username))
                    Add(company);
                else
                    throw new Exception("نام کاربری تکراری است");
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
        }
        internal bool IsExistsUsername(string username)
        {
           return (_Context.Company.Where(w => w.Username == username).Count() > 0);
        }


        internal Company LoginCompany(string username, string password)
        {
            Company company = _Context.Company.Where(w => w.Username == username && w.Password == password).FirstOrDefault();
            if (company != null)
                return company;
            else
                throw new Exception("شرکتی با این نام کاربری یا کلمه عبور وجود ندارد.");
        }
    }
}
