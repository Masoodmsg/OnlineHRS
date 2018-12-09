using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineHRS
{
    public class UserAuthorizationInfo
    {

        public global::System.String ControlID
        {
            get
            {
                return _ControlID;
            }
            set
            {

                _ControlID = value;
               
            }
        }
        private global::System.String _ControlID;
       

      
        public Nullable<global::System.Byte> AccessType
        {
            get
            {
                return _AccessType;
            }
            set
            {
               
                _AccessType = value;
                
            }
        }
        private Nullable<global::System.Byte> _AccessType;
      
        public global::System.String Path
        {
            get
            {
                return _Path;
            }
            set
            {

                _Path = value;
               
            }
        }
        private global::System.String _Path;
      
        public global::System.String OrganizationIDs
        {
            get
            {
                return _OrganizationIDs;
            }
            set
            {
                _OrganizationIDs = value;
                
            }
        }
        private global::System.String _OrganizationIDs;

        public global::System.String ControlType
        {
            get
            {
                return _ControlType;
            }
            set
            {
                _ControlType = value;

            }
        }
        private global::System.String _ControlType;

        public int ModuleID { set; get; }
    }
}