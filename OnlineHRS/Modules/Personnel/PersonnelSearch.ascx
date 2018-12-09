<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<script runat="server">
    //'{"ID":0,"Code":0,"FirstName":0,"LastName":0,"NationalCode":0,"UnitName":0,"ServiceLocationTitle":0,"PostName":0,"EmploymentTypeTitle":0,"EducationGradeTitle":0,"StatusTypeTitle":0}'
    protected void Page_Load(object sender, EventArgs e)
    {
        //gridRols.Listeners.RowClick.Handler = ((ASP.modules_system_roles_ascx)sender).ID;// sender.GetType().BaseType.ToString();// "alert('44444')";

        string personnelActionInfo = ((UserControl)sender).ID;

        if (!string.IsNullOrEmpty(personnelActionInfo))
        {
            string[] personnelActions = personnelActionInfo.Split(';');
            string path = personnelActions[0];
            Toolbar toolbarActionPanel = Ext.Net.Utilities.ControlUtils.FindControl<Ext.Net.Toolbar>(this.LoadControl(path));
            gridPersonnelSearch.TopBar.Add(toolbarActionPanel);

            if (personnelActions.Length > 1)
                gridPersonnelSearch.Listeners.RowDblClick.Handler = personnelActions[1];

            if (personnelActions.Length > 2)
                TabPersonnelsSearch.Title = personnelActions[2];

            if (personnelActions.Length > 3)
            {
                TabPersonnelsSearch.ID = personnelActions[3];

            }

        }

    }
</script>
<ext:Panel runat="server" Layout="BorderLayout" RTL="true" ID="TabPersonnelsSearch" Title="مدیریت پرسنل" Icon="GroupGear" Cls="personnel-search" >

    <Items>

        <ext:UserControlLoader runat="server" Path="~\Modules\Personnel\PersonnelSearchFilters.ascx" />
        <ext:GridPanel
            runat="server"
            Region="Center"
            MultiSelect="false"
            IDMode="Parent"
            ID="gridPersonnelSearch" AutoLoad="false">
            <Store>
                <ext:Store
                    runat="server" PageSize="5" AutoLoad="false">
                    <Model>
                        <ext:Model runat="server">
                            <Fields>
                                <ext:ModelField Name="ID" Type="Int" />
                                <ext:ModelField Name="Code" />
                                <ext:ModelField Name="FirstName" />
                                <ext:ModelField Name="LastName" />
                                <ext:ModelField Name="NationalCode" />
                                <ext:ModelField Name="UnitName" />
                                <ext:ModelField Name="ServiceLocationTitle" />
                                <ext:ModelField Name="PostName" />
                                <ext:ModelField Name="EmploymentTypeTitle" />
                                <ext:ModelField Name="EducationGradeTitle" />
                                <ext:ModelField Name="StatusTypeTitle" />
                                <ext:ModelField Name="FullName" />
                            </Fields>
                        </ext:Model>
                    </Model>
                    <Proxy>
                        <ext:PageProxy>
                            <Reader>
                                <ext:JsonReader>
                                </ext:JsonReader>

                            </Reader>
                        </ext:PageProxy>

                    </Proxy>

                </ext:Store>

            </Store>

            <ColumnModel runat="server">

                <Columns>
                    <ext:RowNumbererColumn Width="35" runat="server" Text="ردیف" Align="Center" />
                    <ext:Column
                        runat="server"
                        Text="کد پرسنلی"
                        DataIndex="Code"
                        Width="100">
                    </ext:Column>
                    <ext:Column
                        runat="server"
                        Text="نام و نام خانوادگی"
                        Sortable="true"
                        DataIndex="FullName"
                        Hidden="true"
                        Width="150">
                    </ext:Column>
                    <ext:Column
                        runat="server"
                        Text="نام"
                        Sortable="true"
                        DataIndex="FirstName"
                        Width="100">
                    </ext:Column>
                    <ext:Column
                        runat="server"
                        Text="نام خانوادگی"
                        Sortable="true"
                        DataIndex="LastName"
                        Width="100">
                    </ext:Column>
                    <ext:Column
                        runat="server"
                        Text="کد ملی"
                        Sortable="true"
                        DataIndex="NationalCode"
                        Width="100">
                    </ext:Column>
                    <ext:Column
                        runat="server"
                        Text="محل خدمت"
                        Sortable="true"
                        DataIndex="UnitName"
                        Width="200">
                    </ext:Column>
                    <ext:Column
                        runat="server"
                        Text="واحد سازمانی"
                        Sortable="true"
                        DataIndex="ServiceLocationTitle"
                        Flex="1">
                    </ext:Column>
                    <ext:Column
                        runat="server"
                        Text="پست"
                        Sortable="true"
                        DataIndex="PostName"
                        Flex="1" />
                    <ext:Column
                        runat="server"
                        Text="نوع استخدام "
                        Sortable="true"
                        DataIndex="EmploymentTypeTitle"
                        Width="70">
                    </ext:Column>
                    <ext:Column
                        runat="server"
                        Text="مدرک تحصیلی"
                        Sortable="true"
                        DataIndex="EducationGradeTitle"
                        Width="100">
                    </ext:Column>
                    <ext:Column
                        runat="server"
                        Text="وضعيت"
                        Sortable="true"
                        DataIndex="StatusTypeTitle"
                        Width="60">
                    </ext:Column>

                </Columns>
            </ColumnModel>

            <BottomBar>
                <ext:PagingToolbar runat="server"  AfterPageText="صفحه بعد" BeforePageText="صفحه قبل" NextText="صفحه بعد" PrevText="صفحه قبل" FirstText="صفحه اول" LastText="صفحه آخر" RefreshText="بارگذاری مجدد" >
                    <Items>
                        <ext:Label runat="server" Text="تعداد نمایش در صفحه:" />
                        <ext:ToolbarSpacer runat="server" Width="10" />
                        <ext:ComboBox runat="server" Width="80" Editable="false">
                            <Items>
                                <ext:ListItem Text="1" Value="1" />
                                <ext:ListItem Text="2" Value="2" />
                                <ext:ListItem Text="5" Value="5" />
                                <ext:ListItem Text="10" Value="10" />
                                <ext:ListItem Text="20" Value="20" />
                                <ext:ListItem Text="50" Value="50" />
                                <ext:ListItem Text="100" Value="100" />
                                <ext:ListItem Text="همه" Value="10000" />
                            </Items>
                            <SelectedItems>
                                <ext:ListItem Value="5" />
                            </SelectedItems>
                            <Listeners>
                                <Select Handler="#{gridPersonnelSearch}.store.pageSize = parseInt(this.getValue(), 10); #{gridPersonnelSearch}.store.reload(); changePagePersonnel(this.up(), 1)" />
                            </Listeners>
                        </ext:ComboBox>
                    </Items>
                    <Listeners>
                        <BeforeChange Fn="changePagePersonnel" />
                    </Listeners>
                </ext:PagingToolbar>
            </BottomBar>
        </ext:GridPanel>

    </Items>
</ext:Panel>
