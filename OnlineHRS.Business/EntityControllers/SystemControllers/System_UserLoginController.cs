using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility;

namespace OnlineSalarySystem.Business.EntityControllers.SystemControllers
{
    internal class System_UserLoginController : EFEntityController<System_UserLogin, OnlineSalarySystemEntities>
    {
        internal void AddUserLogin(System_UserLogin userLogin)
        {
            try
            {
                if (!IsExistsUsername(userLogin.Username))
                    Add(userLogin);
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
            return (_Context.System_UserLogin.Where(w => w.Username == username).Count() > 0);
        }


        internal System_UserLogin Login(string username, string password)
        {
            string passHash = Helper.GetMD5HashString(password);
            System_UserLogin userLogin = _Context.System_UserLogin.Where(w => w.Username == username && w.Password == passHash).FirstOrDefault();
            if (userLogin != null)
                return userLogin;
            else
                throw new Exception("نام کاربری یا کلمه عبور اشتباه است.");
        }

        internal void ChangePassword(System_UserLogin currentUserLogin, string oldPass, string newPass)
        {
            //System_UserLogin userLogin = _Context.System_UserLogin.Where(W => W.UserInfoID == userInfoID).FirstOrDefault();
            string passHash = Helper.GetMD5HashString(oldPass);
            if (currentUserLogin.Password != passHash)
                throw new Exception("!کلمه عبور قدیم صحیح نیست");

            currentUserLogin.Password = Helper.GetMD5HashString(newPass);
            Update(currentUserLogin);
        }
    }
}
