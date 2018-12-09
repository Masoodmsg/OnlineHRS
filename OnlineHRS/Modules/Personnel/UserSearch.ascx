<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>
<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        //gridRols.Listeners.RowClick.Handler = ((ASP.modules_system_roles_ascx)sender).ID;// sender.GetType().BaseType.ToString();// "alert('44444')";
        if (!string.IsNullOrEmpty(((UserControl)sender).ID))
            userSearch.Listeners.Select.Handler = ((UserControl)sender).ID;
    }

</script>
<ext:ComboBox runat="server"
   
    HideSelected="true"
   
    TriggerAction="All"
    
    EmptyText="جستجو" IDMode="Parent" ID="userSearch" QueryDelay="1000">
   <%-- <Store>
        <ext:Store
            runat="server">
            <Model>
                <ext:Model runat="server">
                    <Fields>
                        <ext:ModelField Name="text" />
                        <ext:ModelField Name="value" Type="Int" />

                    </Fields>
                </ext:Model>
            </Model>
            <Listeners>
                <Add Fn="isExistsUser" />
            </Listeners>
        </ext:Store>
    </Store>--%>

    <Listeners>
        <%--<KeyPress Fn="setKeyUp"></KeyPress>--%>

        <BeforeQuery Fn="userSearch"></BeforeQuery>
        
        <Focus Handler="setCurrentSelectUser(this)"></Focus>
        
    </Listeners>

</ext:ComboBox>
