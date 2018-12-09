using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Utility.DBConstants
{
   

    public sealed class UserTypes
    {
        /// <summary>
        /// مدیر عامل شرکت
        /// </summary>
        public const byte CompanyManager = 1;
        /// <summary>
        /// پرسنل شرکت
        /// </summary>
        public const byte Personnel = 2;
        /// <summary>
        /// مدیر سیستم
        /// </summary>
        public const byte Admin = 3;
        /// <summary>
        /// پشتیبان سیستم
        /// </summary>
        public const byte Suporter = 4;
        /// <summary>
        /// مدیر ارشد سیستم
        /// </summary>
        public const byte SysAdmin = 5;
        /// <summary>
        /// برنامه نویس سیستم
        /// </summary>
        public const byte Programmer = 6;
    }

    public sealed class SystemRoles
    {
        /// <summary>
        /// نقش کارفرما
        /// </summary>
        public const int CompanyManager = 1;
    }
    public sealed class AccessTypes
    {
        public const byte Full = 1;
        public const byte ReadOnly = 2;
        /// <summary>
        /// عدم دسترسی
        /// </summary>
        public const byte Inaccessibility = 3;
    }
}
