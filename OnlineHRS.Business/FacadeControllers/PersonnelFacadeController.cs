using OnlineHRS.Business.EntityControllers.PersonnelControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineHRS.Business.FacadeControllers
{
   public class PersonnelFacadeController
    {
        public string Login(string jsonInfo)
        {
            Personnel_InfoController ctrl = new Personnel_InfoController();
            string userLogin = ctrl.Login(jsonInfo);

            return userLogin;
        }
        public void ChangePassword(int companyID, int userID, string oldPass, string newPass)
        {
            Personnel_InfoController userLogin = new Personnel_InfoController();
            userLogin.ChangePassword(companyID, userID, oldPass, newPass);
        }

        public void EditPersonnelInfo(string mode, string editInfoJson)
        {
            Personnel_InfoController user = new Personnel_InfoController();
            user.EditPersonnelInfo(mode, editInfoJson);
        }
        public string UserSearch(string user, int parentID)
        {
            Personnel_InfoController roleCtrl = new Personnel_InfoController();
            return roleCtrl.UserSearch(user, parentID);
        }

        public string PersonnelSearch(int userID, string whereJson)
        {
            Personnel_InfoController roleCtrl = new Personnel_InfoController();
            return roleCtrl.PersonnelSearch(userID, whereJson);
        }

        public string GetPersonnelInfo(string personnelInfoJson)
        {
            Personnel_InfoController roleCtrl = new Personnel_InfoController();
            return roleCtrl.GetPersonnelInfo(personnelInfoJson);
        }

       
    }
}
