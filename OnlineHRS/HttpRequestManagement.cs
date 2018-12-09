using OnlineHRS.Business.FacadeControllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace OnlineHRS
{

    public static class HttpRequestManagement
    {


        private static SystemFacadeController systemFacade = new SystemFacadeController();
        private static List<HttpRequestInfo> _requests = new List<HttpRequestInfo>();
        private static Dictionary<string, List<HttpRequestInfo>> _sessions = new Dictionary<string, List<HttpRequestInfo>>();

        public static void AddSession(HttpRequest request)
        {
            string sessionID = request["ASP.NET_SessionId"];

            if (sessionID != null && !_sessions.ContainsKey(sessionID))
            {
                List<HttpRequestInfo> requestsInfo = new List<HttpRequestInfo>();
                HttpRequestInfo requestInfo = new HttpRequestInfo();
                requestInfo.SessionID = sessionID;
                requestInfo.SessionTime = DateTime.Now.ToLongTimeString();
                requestInfo.SessionDate = int.Parse(Utility.Helper.GetPersianDate(DateTime.Now, true).Replace("/", ""));
                requestInfo.IP = request.UserHostAddress;
                //requestInfo.FilePath = request.CurrentExecutionFilePath;
                requestInfo.Extension = request.CurrentExecutionFilePathExtension;
                requestInfo.Length = request.ContentLength;
                requestInfo.HttpMethod = request.HttpMethod;
                requestInfo.Browser = request.Browser.Browser + "  " + request.Browser.Version;
                //requestInfo.BrowserVersion = request.Browser.Version;
                //requestInfo.ContentType = request.ContentType;
                requestInfo.MethodParameterJson = request["submitDirectEventConfig"];
                requestInfo.MethodCallName = !string.IsNullOrEmpty(request["__EVENTARGUMENT"]) ? request["__EVENTARGUMENT"].Substring(9) : "";
                //requestInfo.HttpRequest = request["HTTP_X_REQUESTED_WITH"] == "XMLHttpRequest" ? "XHR" : request["HTTP_X_REQUESTED_WITH"];
                //requestInfo.Content = (new System.IO.StreamReader(request.InputStream, System.Text.Encoding.UTF8)).ReadToEnd();

                requestsInfo.Add(requestInfo);
                _sessions.Add(sessionID, requestsInfo);
            }
        }
        public static void AddRequest(HttpRequest request, string queryType, string spName, string jsonParameters)
        {
            //if (!request.CurrentExecutionFilePathExtension.Equals(".axd"))
            //{
            string sessionID = request["ASP.NET_SessionId"];


            if (!string.IsNullOrEmpty(sessionID) && _sessions.ContainsKey(sessionID))
            {
                List<HttpRequestInfo> requests = _sessions[sessionID];

                HttpRequestInfo requestInfo = new HttpRequestInfo();
                requestInfo.SessionID = sessionID;
                requestInfo.SessionTime = requests[0].SessionTime;
                //requestInfo.UserID = requests[0].UserID;
                requestInfo.RequestDate = int.Parse(Utility.Helper.GetPersianDate(DateTime.Now, true).Replace("/", ""));
                requestInfo.RequestTime = DateTime.Now.ToLongTimeString();
                requestInfo.SessionDate = requests[0].SessionDate;
                requestInfo.IP = request.UserHostAddress;
                //requestInfo.FilePath = request.CurrentExecutionFilePath;
                requestInfo.Extension = request.CurrentExecutionFilePathExtension;
                requestInfo.Length = request.ContentLength;
                //requestInfo.HttpMethod = request.HttpMethod;
                requestInfo.Browser = request.Browser.Browser + "  " + request.Browser.Version;
                //requestInfo.BrowserVersion = request.Browser.Version;
                //requestInfo.ContentType = request.ContentType;
                requestInfo.MethodParameterJson = jsonParameters;// request["submitDirectEventConfig"] == null ? request.Form.ToString() : request["submitDirectEventConfig"];
                requestInfo.MethodCallName = spName;// !string.IsNullOrEmpty(request["__EVENTARGUMENT"]) ? request["__EVENTARGUMENT"].Substring(9) : string.Empty;
                                                    //requestInfo.MethodCallName = requestInfo.MethodCallName == string.Empty ? request.Params["_methodName_"] : requestInfo.MethodCallName;
               // requestInfo.HttpRequest = request["HTTP_X_REQUESTED_WITH"] == "XMLHttpRequest" ? "XHR" : request["HTTP_X_REQUESTED_WITH"];
                requestInfo.QueryType = queryType;

                // requestInfo.Content = (new System.IO.StreamReader(request.InputStream, System.Text.Encoding.UTF8)).ReadToEnd();


                requests.Add(requestInfo);
            }
            else
            {
                AddSession(request);
            }
            //}
        }

        public static Dictionary<string, List<HttpRequestInfo>> Sessions
        {
            get { return _sessions; }

        }
        public static void RemoveSession(HttpRequest request)
        {
            string sessionID = request["ASP.NET_SessionId"];//b0yevujbfvgqn2hgerhz0h2v
            if (_sessions.ContainsKey(sessionID))
            {
                List<HttpRequestInfo> requests = _sessions[sessionID];

                var userInfo = ApplicationSessionStateStore.GetItem<PersonnelInfo>("UserInfo");
                if (userInfo != null)
                {
                    requests.ForEach(item => { item.UserID = userInfo.ID; item.CompanyID = userInfo.CompanyID; });
                }
                systemFacade.InsertHttpRequests(Newtonsoft.Json.JsonConvert.SerializeObject(requests));
                _sessions.Remove(sessionID);
            }
        }
        public static int OnlineUserCount
        {
            get { return _sessions.Count; }

        }
    }


}