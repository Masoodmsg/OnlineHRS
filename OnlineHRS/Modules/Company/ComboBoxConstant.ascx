<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>
<script runat="server">
    //'{"ID":0,"Code":0,"FirstName":0,"LastName":0,"NationalCode":0,"UnitName":0,"ServiceLocationTitle":0,"PostName":0,"EmploymentTypeTitle":0,"EducationGradeTitle":0,"StatusTypeTitle":0}'
    protected void Page_Load(object sender, EventArgs e)
    {
        //gridRols.Listeners.RowClick.Handler = ((ASP.modules_system_roles_ascx)sender).ID;// sender.GetType().BaseType.ToString();// "alert('44444')";

        string comboBoxConstantInfo = ((UserControl)sender).ID;

        if (!string.IsNullOrEmpty(comboBoxConstantInfo))
        {
            string[] data = comboBoxConstantInfo.Split(';');

            comboBoxConstant.ID = data[0];
            comboBoxConstant.Listeners.AfterRender.Handler = data[1];
            comboBoxConstant.FieldLabel = data[2];
            
        }

    }
</script>
<ext:ComboBox runat="server" ID="comboBoxConstant" ValueField="ID" DisplayField="DisplayLabel" Editable="false" QueryMode="Local">

    <Store>
        <ext:Store
            runat="server">
            <Model>
                <ext:Model runat="server">
                    <Fields>
                        <ext:ModelField Name="DisplayLabel" />
                        <ext:ModelField Name="ID" Type="Int" />

                    </Fields>
                </ext:Model>
            </Model>
        </ext:Store>
    </Store>

</ext:ComboBox>
