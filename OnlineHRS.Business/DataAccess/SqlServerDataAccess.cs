using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
namespace OnlineHRS.DataAccess
{
    internal class SqlServerDataAccess : IDisposable
    {

        private SqlConnection _connection = null;
        private SqlCommand _command = null;
        private SqlDataAdapter _dataAdapter = null;

        // private StringBuilder _JsonData = null;
        public SqlServerDataAccess()
        {
            Connection.Open();
            Command.Connection = Connection;
            Command.CommandType = CommandType.StoredProcedure;
            //DataAdapter.SelectCommand = Command;
            //_JsonData = new StringBuilder();
        }
        public SqlConnection Connection
        {
            get
            {
                if (_connection == null)
                    _connection = new SqlConnection(GetConnectionString());
                return _connection;
            }
            set { _connection = value; }
        }
        public SqlDataAdapter DataAdapter
        {
            get
            {
                if (_dataAdapter == null)
                    _dataAdapter = new SqlDataAdapter();
                return _dataAdapter;
            }
            set { _dataAdapter = value; }
        }
        public SqlCommand Command
        {
            get
            {
                if (_command == null)
                    _command = new SqlCommand();
                return _command;
            }
            set { _command = value; }
        }


        public string ExecuteProcedureSelect(string procedureName, params SqlParameter[] parameters)
        {
            if (Connection.State == ConnectionState.Closed)
                Connection.Open();

            Command.CommandType = CommandType.StoredProcedure;
            Command.CommandText = "dbo." + procedureName;
            Command.Parameters.Clear();


            //Command.Parameters.Add("@" + parameter.Name, parameter.DbType).Value = parameter.Value;
            Command.Parameters.AddRange(parameters);


            try
            {
                SqlDataReader reader = Command.ExecuteReader();
               
                if (reader.HasRows)
                {
                    byte i = 0;
                    StringBuilder jsonDataSet = new StringBuilder();
                    StringBuilder jsonData = new StringBuilder();
                    while (reader.HasRows)
                    {
                        jsonData.Clear();
                        while (reader.Read() && !reader.IsDBNull(0))
                        {
                            jsonData.Append(reader.GetString(0));
                        }

                       
                        i++;
                        if (reader.NextResult() || i > 1  )
                        {
                            jsonDataSet.Append("\"Table");
                            jsonDataSet.Append(i.ToString());
                            jsonDataSet.Append("\": ");
                            jsonDataSet.Append(jsonData.ToString());
                            jsonDataSet.AppendLine(",");

                            if (!reader.HasRows)
                            {
                               
                                jsonDataSet.Insert(0,"{ ");
                                jsonDataSet.Append("}");
                            }
                           

                        }
                        else
                            jsonDataSet.Append(jsonData.ToString());
                    }
                    
                    
                    reader.Close();
                    return jsonDataSet.ToString();
                }

                reader.Close();
                return string.Empty;
                //DataAdapter.Fill(jsonDT);
                // Count = Command.Parameters["@RowCount"].Value.ToString();

            }
            finally
            {
                Connection.Close();
            }

        }
        public string ExecuteProcedureUpdate(string procedureName, bool isID, bool isResult, params SqlParameter[] parameters)
        {
            if (Connection.State == ConnectionState.Closed)
                Connection.Open();

            Command.CommandType = CommandType.StoredProcedure;
            Command.CommandText = "dbo." + procedureName;
            Command.Parameters.Clear();

            try
            {
                if (isResult)
                {
                    Command.Parameters.AddRange(parameters);
                    SqlDataReader reader = Command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        StringBuilder jsonData = new StringBuilder();
                        while (reader.Read() && !reader.IsDBNull(0))
                        {
                            jsonData.Append(reader.GetString(0));
                        }
                        reader.Close();
                        return jsonData.ToString();
                    }

                    reader.Close();
                    return string.Empty;
                }
                else
                {
                    if (isID)
                        Command.Parameters.Add("@OutputID", SqlDbType.Int).Direction = ParameterDirection.Output;

                    Command.Parameters.AddRange(parameters);
                    int rowAffected = Command.ExecuteNonQuery();

                    if (isID)
                    {
                        string id = Command.Parameters["@OutputID"].Value.ToString();
                        if (!string.IsNullOrEmpty(id))
                            return id;
                    }

                    return rowAffected.ToString();
                }



            }
            finally
            {
                Connection.Close();
            }

        }
        public string ExecuteDynamicQuery(string tableName, string queryType, string parametersJson, string whereClause, string join, string paging, bool isID)
        {
            if (Connection.State == ConnectionState.Closed)
                Connection.Open();

            Command.CommandText = "dbo.ExecuteDynamicQuery";
            Command.Parameters.Clear();
            //Command.Parameters.Add("@" + parameter.Name, parameter.DbType).Value = parameter.Value;
            Command.Parameters.AddRange(new SqlParameter[] {
                new SqlParameter("TableName", tableName),
                new SqlParameter("QueryType", queryType),
                new SqlParameter("ParametersJson", parametersJson),
                new SqlParameter("WhereClause", whereClause),
                new SqlParameter("Join", join),
                new SqlParameter("Paging", paging),
                new SqlParameter("IsID", isID) });


            try
            {
                SqlDataReader reader = Command.ExecuteReader();
                if (reader.HasRows)
                {
                    StringBuilder jsonData = new StringBuilder();
                    while (reader.Read() && !reader.IsDBNull(0))
                    {
                        jsonData.Append(reader.GetString(0));
                        //jsonData.Append(Convert.ToBase64String((byte[]) reader[0]));
                    }
                    reader.Close();
                    return jsonData.ToString();
                }

                reader.Close();
                return string.Empty;

            }
            finally
            {
                Connection.Close();
            }

        }
        public string GetConnectionString()
        {
            return System.Configuration.ConfigurationManager.ConnectionStrings["OnlineHRS"].ToString();
        }


        public void Dispose()
        {
            if (Connection.State == ConnectionState.Open)
                Connection.Close();
        }
    }
}
