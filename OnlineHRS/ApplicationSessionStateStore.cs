using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineHRS
{
    /// <summary>
    /// Stores session-specific values in application state so the values are available
    /// immediately, even on pages that do not have access to the session object (e.g. enableSessionState=false).
    /// <para/>
    /// If you use this class, make sure <c>RemoveAllItems</c> is called when sessions end
    /// to ensure memory is reclaimed.
    /// <para/>
    /// All methods on this class are thread-safe.
    /// </summary>
    public static class ApplicationSessionStateStore
    {
        private static bool _enabled;
        public static List<ModuleItem> ModuleItems = new List<ModuleItem>();
        public static Dictionary<string, string> EncryptMaping = new Dictionary<string, string>();
        /// <summary>
        /// Enables this class for use.  This is a safety check.  By invoking this method, 
        /// the caller commits to calling <c>RemoveAllItems</c> when sessions terminate.
        /// </summary>
        public static bool IsEnabled
        {
            get { return _enabled; }
            set { _enabled = value; }
        }

        public static void AssertEnabled()
        {
            if (!_enabled)
            {
                throw new InvalidOperationException("Use of ApplicationSessionStateStore is not enabled.  See 'IsEnabled' property documentation for proper usage.");
            }
        }

        public static T GetItem<T>(string sessionId, string key) where T : class
        {
            return GetItem<T>(sessionId, key, false);
        }

        public static T GetItem<T>(string key) where T : class
        {
            return GetItem<T>(HttpContext.Current.Session.SessionID, key, false);
        }

        public static T GetAndRemoveItem<T>(string sessionId, string key) where T : class
        {
            return GetItem<T>(sessionId, key, true);
        }

        public static T GetAndRemoveItem<T>(string key) where T : class
        {
            return GetItem<T>(HttpContext.Current.Session.SessionID, key, true);
        }

        public static void SetItem<T>(string key, T value)
        {
            SetItem(HttpContext.Current.Session.SessionID, key, value);
        }

        public static void SetItem(string sessionId, string key, object value)
        {
            AssertEnabled();
            HttpContext context = HttpContext.Current;
            HttpApplicationState appState = context.Application;
            IDictionary<string, object> sessionDic;

            appState.Lock();
            try
            {
                sessionDic = (IDictionary<string, object>)appState.Get(sessionId);
                if (sessionDic == null)
                {
                    sessionDic = new Dictionary<string, object>();
                    appState.Set(sessionId, sessionDic);
                }
            }
            finally
            {
                appState.UnLock();
            }

            lock (sessionDic)
            {
                sessionDic[key] = value;
            }
        }

        public static void RemoveAllItems()
        {
            RemoveAllItems(HttpContext.Current.Session.SessionID);
        }

        public static void RemoveAllItems(string sessionId)
        {
            HttpContext.Current.Application.Remove(sessionId);
        }

        private static T GetItem<T>(string sessionId, string key, bool removeItem) where T : class
        {
            AssertEnabled();
            HttpContext context = HttpContext.Current;
            HttpApplicationState appState = context.Application;
            IDictionary<string, object> sessionDic = (IDictionary<string, object>)appState.Get(sessionId);

            if (sessionDic == null)
            {
                return null;
            }
            else
            {
                object value;
                lock (sessionDic)
                {
                    if (sessionDic.TryGetValue(key, out value))
                    {
                        if (removeItem)
                        {
                            sessionDic.Remove(key);
                        }
                    }
                }
                return value as T;
            }
        }
    }
}

