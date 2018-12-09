using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Microsoft.SqlServer.Server;
using System.IO;
using System.Globalization;
using System.Data.SqlTypes;
public class SqlFunctions
{
    private readonly static string Key = "Computer Services Co. Cloud-HRS";
    private readonly static byte[] IV = new byte[8]
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
    [SqlFunction]
    public static SqlInt32 AddJalaliDate(SqlInt32 date, int increment, SqlString interval)
    {
        PersianCalendar calendar = new PersianCalendar();
        string str = date.ToString();
        int year = int.Parse(str.Substring(0, 4));
        int month = int.Parse(str.Substring(4, 2));
        int day = int.Parse(str.Substring(6, 2));
        DateTime time = calendar.ToDateTime(year, month, day, 0, 0, 0, 0);
        switch (interval.ToString())
        {
            case "Year":
                time = calendar.AddYears(time, increment);
                break;

            case "Month":
                time = calendar.AddMonths(time, increment);
                break;

            case "Day":
                time = calendar.AddDays(time, increment);
                break;
        }
        year = calendar.GetYear(time);
        month = calendar.GetMonth(time);
        day = calendar.GetDayOfMonth(time);
        return SqlInt32.Parse(year.ToString("D4") + month.ToString("D2") + day.ToString("D2"));
    }

    [SqlFunction]
    public static SqlString GetCurrentDate(SqlByte format)
    {
        PersianCalendar calendar = new PersianCalendar();
        DateTime now = DateTime.Now;
        if (format == 1)
        {
            return (calendar.GetYear(now).ToString("D4") + calendar.GetMonth(now).ToString("D2") + calendar.GetDayOfMonth(now).ToString("D2"));
        }
        if (format == 2)
        {
            return (calendar.GetYear(now).ToString("D4") + "/" + calendar.GetMonth(now).ToString("D2") + "/" + calendar.GetDayOfMonth(now).ToString("D2"));
        }
        return "";
    }

    [SqlFunction]
    public static SqlString GetCurrentDateTime()
    {
        PersianCalendar calendar = new PersianCalendar();
        DateTime now = DateTime.Now;
        return (calendar.GetYear(now).ToString("D4") + "/" + calendar.GetMonth(now).ToString("D2") + "/" + calendar.GetDayOfMonth(now).ToString("D2") + " " + calendar.GetHour(now).ToString("D2") + ":" + calendar.GetMinute(now).ToString("D2") + ":" + calendar.GetSecond(now).ToString("D2"));
    }

    [SqlFunction]
    public static SqlString IntToStr(SqlInt64 num)
    {
        if (!num.IsNull)
        {
            return num.ToSqlString();
        }
        return SqlString.Null;
    }

    [SqlFunction]
    public static SqlInt64 StrToInt(SqlString str)
    {
        if (!str.IsNull)
        {
            return str.ToSqlInt64();
        }
        return SqlInt64.Null;
    }

    [SqlProcedure]
    public static void ExportAssembly(string assemblyName, string destinationPath)
    {
        string sql = @"SELECT af.name, af.content FROM sys.assemblies a INNER JOIN sys.assembly_files af ON a.assembly_id = af.assembly_id WHERE a.name = @assemblyname";
        using (SqlConnection conn = new SqlConnection("context connection=true"))   //Create current context connection
        {
            using (SqlCommand cmd = new SqlCommand(sql, conn))
            {
                SqlParameter param = new SqlParameter("@assemblyname", System.Data.SqlDbType.VarChar);
                param.Value = assemblyName;
                cmd.Parameters.Add(param);
                cmd.Connection.Open();  //Open the context connetion
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read()) //Iterate through assembly files
                    {
                        string assemblyFileName = reader.GetString(0);  //get assembly file name from the name (first) column
                        System.Data.SqlTypes.SqlBytes bytes = reader.GetSqlBytes(1);         //get assembly binary data from the content (second) column
                        string outputFile = Path.Combine(destinationPath, assemblyFileName);
                        SqlContext.Pipe.Send(string.Format("Exporting assembly file [{0}] to [{1}]", assemblyFileName, outputFile)); //Send information about exported file back to the calling session
                        using (FileStream byteStream = new FileStream(outputFile, FileMode.CreateNew))
                        {
                            byteStream.Write(bytes.Value, 0, (int)bytes.Length);
                            byteStream.Close();
                        }
                    }
                }
            }
            conn.Close();
        }

    }

    [SqlFunction]
    public static SqlString Encrypt(SqlString value)
    {

        //if (value == "")
        //    return "";
        byte[] bytes = Encoding.ASCII.GetBytes(value.ToString());
        System.Security.Cryptography.TripleDESCryptoServiceProvider cryptoServiceProvider1 = new System.Security.Cryptography.TripleDESCryptoServiceProvider();
        System.Security.Cryptography.MD5CryptoServiceProvider cryptoServiceProvider2 = new System.Security.Cryptography.MD5CryptoServiceProvider();
        cryptoServiceProvider1.Key = cryptoServiceProvider2.ComputeHash(Encoding.ASCII.GetBytes(Key));
        cryptoServiceProvider1.IV = IV;
        byte[] inArray = cryptoServiceProvider1.CreateEncryptor().TransformFinalBlock(bytes, 0, bytes.Length);
        return Convert.ToBase64String(inArray, 0, inArray.Length);

    }

    [SqlFunction]
    public static SqlString Decrypt(SqlString value)
    {

        //if (value == "")
        //    return "";
        value = value.ToString().Replace(" ", "+");
        byte[] inputBuffer = Convert.FromBase64String(value.ToString());
        System.Security.Cryptography.TripleDESCryptoServiceProvider cryptoServiceProvider1 = new System.Security.Cryptography.TripleDESCryptoServiceProvider();
        System.Security.Cryptography.MD5CryptoServiceProvider cryptoServiceProvider2 = new System.Security.Cryptography.MD5CryptoServiceProvider();
        cryptoServiceProvider1.Key = cryptoServiceProvider2.ComputeHash(Encoding.ASCII.GetBytes(Key));
        cryptoServiceProvider1.IV = IV;
        byte[] bytes = cryptoServiceProvider1.CreateDecryptor().TransformFinalBlock(inputBuffer, 0, inputBuffer.Length);
        return Encoding.ASCII.GetString(bytes, 0, bytes.Length);

    }

    public static SqlInt64 GetMD5HashNumber(SqlString strText)
    {
        Int64 hashCode = 0;
        if (!string.IsNullOrEmpty(strText.ToString()))
        {
            //Unicode Encode Covering all characterset
            byte[] byteContents = Encoding.Unicode.GetBytes(strText.ToString());

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
}