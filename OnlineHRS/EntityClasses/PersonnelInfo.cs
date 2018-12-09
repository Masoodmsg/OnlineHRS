using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineHRS
{
    public class PersonnelInfo 
    {
        
        public global::System.Int32 ID
        {
            get
            {
                return _ID;
            }
            set
            {
                _ID = value;
            }
        }
        private global::System.Int32 _ID;
      
        public global::System.String Code
        {
            get
            {
                return _Code;
            }
            set
            {

                _Code = value;
               }
        }
        private global::System.String _Code;
       
        public global::System.String FirstName
        {
            get
            {
                return _FirstName;
            }
            set
            {

                _FirstName = value;


            }
        }
        private global::System.String _FirstName;
       
        public global::System.String LastName
        {
            get
            {
                return _LastName;
            }
            set
            {
                
                _LastName = value;
             
            }
        }
        private global::System.String _LastName;
       
      
      
        public int CompanyID
        {
            get
            {
                return _CompanyID;
            }
            set
            {

                _CompanyID = value;
            }
        }
        private int _CompanyID;
       
      
        public System.Byte UserType
        {
            get
            {
                return _UserType;
            }
            set
            {
               
                _UserType = value;
            }
        }
        private System.Byte _UserType;
        
     
       
        public Nullable<global::System.Byte> ManagerUserType
        {
            get
            {
                return _ManagerUserType;
            }
            set
            {

                _ManagerUserType = value;
            }
        }
        private Nullable<global::System.Byte> _ManagerUserType;
      

       
        public global::System.String CompanyName
        {
            get
            {
                return _CompanyName;
            }
            set
            {

                _CompanyName = value;
              
            }
        }
        private global::System.String _CompanyName;
      

    }
}