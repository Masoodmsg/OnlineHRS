using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility;

namespace OnlineHRS.Business.EntityControllers.PersonnelControllers
{
    internal class Personnel_InfoController : DataAccess.SqlServerDataAccess
    {
       
       
        internal string Login(string jsonInfo)
        {
            //long passHash = Helper.GetMD5HashNumber(password);
          
            string personnelInfoJson = base.ExecuteProcedureSelect("SPS_Login", 
                new SqlParameter("ParametersJson", jsonInfo));

           if (string.IsNullOrEmpty(personnelInfoJson))
            {
                throw new Exception("نام کاربری یا کلمه عبور اشتباه است.");
            }
            return personnelInfoJson;


        }

        internal void ChangePassword(int companyID ,int userID, string oldPass, string newPass)
        {



            base.ExecuteProcedureUpdate("SPP_PersonnelInfoUpdate", false, false,
                new SqlParameter("Mode", "ChangePassword"),
                new SqlParameter("ParametersJson", Helper.ObjectToJson(new { CompanyID = companyID,
                                                                           ID = userID,
                                                                           OldPassword = Helper.GetMD5HashNumber(oldPass),
                                                                           NewPassword = Helper.GetMD5HashNumber(newPass) })));

        }

        internal string PersonnelSearch(int userID, string whereJson)
        {
            string personnelInfoJson = base.ExecuteProcedureSelect("SPP_PersonnelSearch",
                new SqlParameter("ParametersJson", whereJson),
                new SqlParameter("PersonnelID", userID));

            return personnelInfoJson;
        }

       

        internal string GetPersonnelInfo(string personnelInfoJson)
        {
            string personnelInfo = base.ExecuteProcedureSelect("SPP_GetPersonnelInfo",
               new SqlParameter("ParametersJson", personnelInfoJson));

            return personnelInfo;
        }

        internal void EditPersonnelInfo(string mode,string editInfoJson)
        {


            base.ExecuteProcedureUpdate("SPP_PersonnelInfoUpdate",false, false,
                new SqlParameter("Mode", mode),
                new SqlParameter("JsonParameters", editInfoJson));
        }
      
        public string UserSearch(string user, int parentID)
        {

           
            string personnelInfoJson = base.ExecuteProcedureSelect("SPP_UserSearch",
                new SqlParameter("CompanyID", parentID),
                new SqlParameter("NameCode", user));

            return personnelInfoJson;
        }

        
    }
}
