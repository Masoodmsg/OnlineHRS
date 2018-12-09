using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;
using System.Configuration;
using System.Web.Security;
using System.Drawing;
using System.Text.RegularExpressions;
using System.IO;
using System.Security.Cryptography;
using System.IO.Compression;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace Utility
{
    public class Helper
    {
        private static string Key = "Computer Services Co. Cloud-HRS";
        private static byte[] IV = new byte[8]
        {
          (byte) 99,
          (byte) 100,
          (byte) 101,
          (byte) 7,
          (byte) 37,
          (byte) 55,
          (byte) 97,
          (byte) 92
        };

        public static string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }

            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }


        public static string GetPersianDate(DateTime date, Boolean Reverse = false)
        {
            if (date > DateTime.MinValue)
            {
                PersianCalendar PC = new PersianCalendar();
                string Year = PC.GetYear(date).ToString();
                string Month = (PC.GetMonth(date) < 10) ? "0" + PC.GetMonth(date).ToString() : PC.GetMonth(date).ToString();
                string Day = (PC.GetDayOfMonth(date) < 10) ? "0" + PC.GetDayOfMonth(date).ToString() : PC.GetDayOfMonth(date).ToString();

                if (!Reverse)
                    return string.Format("{0}/{1}/{2}", Day, Month, Year);
                else
                    return string.Format("{0}/{1}/{2}", Year, Month, Day);
            }
            else
                return "";
        }

        public static string GetFullPersianDate(DateTime date, Boolean Reverse = false)
        {
            if (date > DateTime.MinValue)
            {
                PersianCalendar PC = new PersianCalendar();
                string Year = PC.GetYear(date).ToString();
                string Month = (PC.GetMonth(date) < 10) ? "0" + PC.GetMonth(date).ToString() : PC.GetMonth(date).ToString();
                string Day = (PC.GetDayOfMonth(date) < 10) ? "0" + PC.GetDayOfMonth(date).ToString() : PC.GetDayOfMonth(date).ToString();
                string strTime = string.Format("{0}:{1}:{2}", date.Hour, date.Minute, date.Second);

                if (!Reverse)
                    return string.Format("{0}/{1}/{2} - {3}", Day, Month, Year, strTime);
                else
                    return string.Format("{0}/{1}/{2} - {3}", Year, Month, Day, strTime);
            }
            else
                return "";
        }

        public static DateTime ShamsiDateToGregorianDate(string date)
        {
            var pc = new PersianCalendar();
            string[] parts = date.Split('/');
            if (parts.Length != 3)
                throw new Exception("Incorrect format in shamsi date.");

            return pc.ToDateTime(int.Parse(parts[0]), int.Parse(parts[1]), int.Parse(parts[2]), 0, 0, 0, 0);
        }

        public static DateTime ShamsiDateToGregorianDate(string date, string time)
        {
            var pc = new PersianCalendar();
            string[] parts = date.Split('/');
            if (parts.Length != 3)
                throw new Exception("Incorrect format in shamsi date.");

            string[] arrTime = time.Split(':');
            if (arrTime.Length != 3)
                throw new Exception("Incorrect format in shamsi date.");

            return pc.ToDateTime(int.Parse(parts[0]), int.Parse(parts[1]), int.Parse(parts[2]), int.Parse(arrTime[0]),
                                 int.Parse(arrTime[1]), int.Parse(arrTime[2]), 0);
        }

        public static bool CheckNationalID(string nid)
        {
            int i = 0;
            Int64 n = 0;
            Int64 m = 0;
            nid = nid.Trim();
            if (nid.Length != 10)
            {
                return false;
            }
            Int64 intnid = 0;
            if (!Int64.TryParse(nid, out intnid))
            {
                return false;
            }

            Int64 ld = Convert.ToInt64(nid.Substring(9, 1));
            for (i = 0; i < 10; i++)
            {
                if (i < 9)
                {
                    n = n + Convert.ToInt64(nid.Substring(i, 1)) * (10 - i);
                }
            }

            m = n % 11;
            if (nid == "0000000000" || nid == "1111111111" || nid == "2222222222" || nid == "3333333333"
                || nid == "4444444444" || nid == "5555555555" || nid == "66666666666" || nid == "7777777777"
                || nid == "8888888888" || nid == "9999999999")
            {
                return false;
            }

            if (!((m == 0 && ld == 0) || (m == 1 && ld == 1) || (m > 1 && ld == 11 - m)))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public static string ReversePersianDateStr(string PersianDateStr)
        {
            if (PersianDateStr.Length == 10)
            {
                string Year = PersianDateStr.Substring(6, 4);
                string Month = PersianDateStr.Substring(3, 2);
                string Day = PersianDateStr.Substring(0, 2);
                return Year + "/" + Month + "/" + Day;
            }
            else
                return "";
        }

        public static bool IsDateValid(string PersianDateStr, bool isReverse = false)
        {
            if (PersianDateStr.Length == 10)
            {
                string Year = PersianDateStr.Substring(6, 4);
                string Month = PersianDateStr.Substring(3, 2);
                string Day = PersianDateStr.Substring(0, 2);
                bool flag = false;
                try
                {
                    int intYear = Convert.ToInt32(Year);
                    int intMonth = Convert.ToInt32(Month);
                    int intDay = Convert.ToInt32(Day);
                }
                catch
                {
                    flag = true;
                }
                if (!flag)
                    return IsDateValid(Year, Month, Day);
                else
                {
                    Year = PersianDateStr.Substring(0, 4);
                    Month = PersianDateStr.Substring(5, 2);
                    Day = PersianDateStr.Substring(8, 2);
                    return IsDateValid(Year, Month, Day);
                }

            }
            else
                return false;
        }

        public static bool IsDateValid(string YearStr, string MonthStr, string DayStr)
        {
            try
            {
                int Year, Month, Day;
                if (YearStr != "")
                    Year = Convert.ToInt32(YearStr);
                else
                    Year = 0;
                Month = Convert.ToInt32(MonthStr);
                Day = Convert.ToInt32(DayStr);
                bool Result = true;
                if (Year != 0 || Month != 0 || Day != 0)
                {
                    if (Day == 0)
                        Result = false;
                    if (Month == 0)
                        Result = false;
                    int FYear = 0;
                    bool IsFDigit = int.TryParse(YearStr, out FYear);
                    if (YearStr == "" || YearStr.Length < 4 || FYear < 1250 || FYear > 1450)
                        Result = false;
                }
                else
                    Result = false;
                return Result;
            }
            catch
            {
                return false;
            }
        }

        public static bool CheckForSQLInjection(string SqlStr)
        {
            bool IsSqlInjection = false;
            string[] sqlCheckList = {"--",";--",";","/*","*/","@@","@","char","nchar","varchar","nvarchar","alter","begin",
                                        "cast","create","cursor","declare","delete","drop","end","exec","execute","fetch",
                                        "insert","kill","open","select","sys","sysobjects","syscolumns","table","update"};
            string CheckString = SqlStr.Replace("'", "''");
            for (int i = 0; i <= sqlCheckList.Length - 1; i++)
            {
                if (CheckString.IndexOf(sqlCheckList[i], StringComparison.OrdinalIgnoreCase) >= 0)
                    IsSqlInjection = true;
            }
            return IsSqlInjection;
        }

        public static string GetEntitySQLDateTimeFormat(DateTime Date)
        {
            string Year = Date.Year.ToString();
            string Month = Date.Month.ToString();
            string Day = Date.Day.ToString();
            string Hour = Date.Hour.ToString();
            string Min = Date.Minute.ToString();
            string Sec = Date.Second.ToString();
            return Year + "-" + Month + "-" + Day + " " + Hour + ":" + Min + ":" + Sec;
        }

        public static string GetMD5HashString(string MainStr)
        {
            return FormsAuthentication.HashPasswordForStoringInConfigFile(MainStr, "md5");
        }
        //public static System.Numerics.BigInteger GetMD5HashNumber(string data)
        //{

        //    return new System.Numerics.BigInteger(System.Security.Cryptography.MD5.Create().ComputeHash(System.Text.Encoding.UTF8.GetBytes(data)));
        //}
        public static Int64 GetMD5HashNumber(string strText)
        {
            Int64 hashCode = 0;
            if (!string.IsNullOrEmpty(strText))
            {
                //Unicode Encode Covering all characterset
                byte[] byteContents = Encoding.Unicode.GetBytes(strText);

                byte[] hashText = System.Security.Cryptography.MD5.Create().ComputeHash(byteContents);
                //32Byte hashText separate
                //hashCodeStart = 0~7  8Byte
                //hashCodeMedium = 8~23  8Byte
                //hashCodeEnd = 24~31  8Byte
                //and Fold
                Int64 hashCodeStart = BitConverter.ToInt64(hashText, 0);
                Int64 hashCodeMedium = BitConverter.ToInt64(hashText, 8);
                //Int64 hashCodeEnd = BitConverter.ToInt64(hashText, 8);
                hashCode = hashCodeStart ^ hashCodeMedium;//^ hashCodeEnd;
            }
            return (hashCode);
        }
        public static string SQLServerStrDateTime(DateTime dateTime)
        {
            return string.Format("'{0}'", dateTime.ToString("yyyyMMdd HH:mm:ss.fff tt", CultureInfo.InvariantCulture));
        }
        public static string SQLServerDateTime(DateTime dateTime)
        {
            return dateTime.ToString("yyyyMMdd HH:mm:ss.fff tt", CultureInfo.InvariantCulture);
        }

        public static string StripHtml(string input)
        {
            const string html = "<.*?>";
            return Regex.Replace(input, html, string.Empty);
        }



        public static System.Transactions.TransactionOptions GetUnCommittedTransactionOption()
        {
            System.Transactions.TransactionOptions transactionOptions = new System.Transactions.TransactionOptions();
            transactionOptions.IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted;
            return transactionOptions;
        }

        public static System.Transactions.TransactionOptions GetCommittedTransactionOption()
        {
            System.Transactions.TransactionOptions transactionOptions = new System.Transactions.TransactionOptions();
            transactionOptions.IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted;
            return transactionOptions;
        }
        public static string GetSqlExceptionMessage(Exception exception)
        {
            string msg = string.Empty;
            if (exception is System.Data.SqlClient.SqlException || (exception.InnerException != null && exception.InnerException is System.Data.SqlClient.SqlException))
            {

                System.Data.SqlClient.SqlException sqlException = exception.InnerException as System.Data.SqlClient.SqlException;
                sqlException = sqlException == null ? exception as System.Data.SqlClient.SqlException : sqlException;
                if (sqlException.Number == 2627/*رکورد تکراری*/)//Class = 14
                {
                    if (sqlException.Message.Contains("System_Constant"))
                        return ".شماره کد تکراری است";
                    if (sqlException.Message.Contains("PersonnelDetailsInfo__CompanyID_Code"))
                        return ". کد پرسنلی تکراری است";
                }
                else if (sqlException.Number == 547/*اطلاعات وابسته*/)//Class = 16
                {
                    if (sqlException.Message.Contains("DELETE"))
                    {
                        if (sqlException.Procedure == "SPF_SalaryTypesUpdate")
                            return "این نوع فیش قابل حذف نیست زیرا دارای اطلاعات وابسته است";

                        return "این رکورد قابل حذف نیست زیرا دارای اطلاعات وابسته است";
                    }
                    if (sqlException.Message.Contains("INSERT"))
                    {
                        return "چنین رکوردی در جدول مبدا وجود ندارد";
                    }
                }
                else if(sqlException.Number == 220/*overflow update*/ || sqlException.Number == 232/*overflow insert*/)//Class = 16
                {
                    if (sqlException.Message.Contains("Time"))
                        return "مقدار ساعت وارد شده بیش از حد مجاز است. لطفا مقدار کوچکتری را وارد کنید";

                    return "مقدار وارد شده بیش از حد مجاز است. لطفا مقدار کوچکتری را وارد کنید";
                }
                return exception.Message;
            }
            return exception.Message;
        }

        public static string ObjectToJson(Object obj)
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(obj);
        }
        public static T GetJsonValue<T>(string json, string fieldName)
        {
            var token = JToken.Parse(json);
            return (token is JArray) ? token.First.Value<T>(fieldName) : token.Value<T>(fieldName);

        }
        public static string GetJsonValue(string json, string fieldName, string fieldType)
        {
            string subStr;
            int startIndex = json.IndexOf(fieldName);
            int[] endIndexes = new int[3];
           
            if (startIndex != -1)
            {
                subStr = json.Substring(startIndex);

                int endIndex;

                endIndexes[0] = subStr.IndexOf("},");
                endIndexes[1] = subStr.IndexOf(",");
                endIndexes[2] = subStr.IndexOf("}");
                endIndex = endIndexes.Where(index => index > -1).Min();

                if (fieldType == "int")
                    subStr = subStr.Substring(0, endIndex).Split(':')[1];
                else
                    subStr = subStr.Substring(0, endIndex).Split(':')[1].Replace("\"", "");

                return subStr;
            }
            else
                throw new Exception("فیلدی با این نام وجود ندارد");
           

        }

        public static string SetJsonValue(string json, string fieldName, string newValue, string fieldType)
        {
            string oldValue = GetJsonValue(json, fieldName, fieldType);
            json = json.Replace(oldValue, newValue);
            return json;
        }
        public static List<T> GetJsonValueList<T>(string json, string fieldName)
        {
            var token = JToken.Parse(json);
            //if (token is JArray)
            //{

            //JArray array = token as JArray;
            List<T> list = new List<T>();
            foreach (var item in token.Children())
            {
                list.Add(item.Value<T>(fieldName));
            }
            return list;
            //}
            //return null;
        }
        public static bool IsJsonArray(string json)
        {

            //string content = File.ReadAllText(json);
            var token = JToken.Parse(json);

            if (token is JArray)
            {
                return true;
                //IEnumerable<Phone> phones = token.ToObject<List<Phone>>();
            }
            //else if (token is JObject)
            //{
            //    return false;
            //    //token.ToObject<Phone>();
            //}
            return false;
        }


        public static string Encrypt(string value)
        {
            try
            {
                if (value == "")
                    return "";
                byte[] bytes = Encoding.ASCII.GetBytes(value);
                TripleDESCryptoServiceProvider cryptoServiceProvider1 = new TripleDESCryptoServiceProvider();
                MD5CryptoServiceProvider cryptoServiceProvider2 = new MD5CryptoServiceProvider();
                cryptoServiceProvider1.Key = cryptoServiceProvider2.ComputeHash(Encoding.ASCII.GetBytes(Helper.Key));
                cryptoServiceProvider1.IV = Helper.IV;
                byte[] inArray = cryptoServiceProvider1.CreateEncryptor().TransformFinalBlock(bytes, 0, bytes.Length);
                return Convert.ToBase64String(inArray, 0, inArray.Length);
            }
            catch
            {
                return "";
            }
        }

        public static string Decrypt(string value)
        {
            try
            {
                if (value == "")
                    return "";
                value = value.Replace(" ", "+");
                byte[] inputBuffer = Convert.FromBase64String(value);
                TripleDESCryptoServiceProvider cryptoServiceProvider1 = new TripleDESCryptoServiceProvider();
                MD5CryptoServiceProvider cryptoServiceProvider2 = new MD5CryptoServiceProvider();
                cryptoServiceProvider1.Key = cryptoServiceProvider2.ComputeHash(Encoding.ASCII.GetBytes(Helper.Key));
                cryptoServiceProvider1.IV = Helper.IV;
                byte[] bytes = cryptoServiceProvider1.CreateDecryptor().TransformFinalBlock(inputBuffer, 0, inputBuffer.Length);
                return Encoding.ASCII.GetString(bytes, 0, bytes.Length);
            }
            catch
            {
                return "";
            }
        }

        public static string CompressString(string text)
        {
            byte[] buffer = Encoding.UTF8.GetBytes(text);
            var memoryStream = new MemoryStream();
            using (var gZipStream = new GZipStream(memoryStream, CompressionMode.Compress, true))
            {
                gZipStream.Write(buffer, 0, buffer.Length);
            }

            memoryStream.Position = 0;

            var compressedData = new byte[memoryStream.Length];
            memoryStream.Read(compressedData, 0, compressedData.Length);

            var gZipBuffer = new byte[compressedData.Length + 4];
            Buffer.BlockCopy(compressedData, 0, gZipBuffer, 4, compressedData.Length);
            Buffer.BlockCopy(BitConverter.GetBytes(buffer.Length), 0, gZipBuffer, 0, 4);
            return Convert.ToBase64String(gZipBuffer);
        }

        public static string ZipStr(String str)
        {
            using (MemoryStream output = new MemoryStream())
            {
                using (DeflateStream gzip =
                  new DeflateStream(output, CompressionMode.Compress))
                {
                    using (StreamWriter writer =
                      new StreamWriter(gzip, System.Text.Encoding.UTF8))
                    {
                        writer.Write(str);
                    }
                }

                return Convert.ToBase64String(output.ToArray());
            }
        }

    }
}