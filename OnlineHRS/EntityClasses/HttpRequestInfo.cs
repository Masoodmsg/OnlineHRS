using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineHRS
{
    public class HttpRequestInfo
    {
        public string SessionID { get; set; }
        public int UserID { get; set; }
        public int? CompanyID { get; set; }
        public string RequestTime { get; set; }
        public int RequestDate { get; set; }
        public string SessionTime { get; set; }
        public int SessionDate { get; set; }
        public string IP { get; set; }
        //public string FilePath { get; set; }
        public string Extension { get; set; }
        public string HttpMethod { get; set; }
        public int Length { get; set; }
        public string Browser { get; set; }
        //public string BrowserVersion { get; set; }
        // public string ContentType { get; set; }
        //public string Content { get; set; }
        public string MethodParameterJson { get; set; }
        public string MethodCallName { get; set; }
       // public string HttpRequest { get; set; }

        public string QueryType { get; set; }
    }
}