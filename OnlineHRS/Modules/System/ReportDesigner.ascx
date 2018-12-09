<%@ Control Language="C#"  %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<script runat="server">

    protected void Page_Load(object sender, EventArgs e)
    {


        string info = ((UserControl)sender).ID;

        if (!string.IsNullOrEmpty(info))
        {
            string[] filters = info.Split(';');
            string subSystem = filters[0];
            byte reportTypeID = byte.Parse(filters[1]);

            panelReportDesigner.Listeners.AfterRender.Handler = string.Format("loadReportDesigner(this, '../../ReportDesigner.aspx?SubSystem={0}&ReportTypeID={1}','{0}',{1})", subSystem, reportTypeID);
            btnRefreshReports.Handler = string.Format("getReports(this.up('panel'), '{0}', {1})", subSystem, reportTypeID);

            if (subSystem == "Salary")
            {
                if (reportTypeID == 1/*فرمت فیش*/)
                {
                    TabReportDesigner.ID = "TabSalaryReportDesigner";
                    TabReportDesigner.Title = "طراحی فیش";
                    treeReports.Title = "فرمت های فیش";
                    treeReports.ID = "treeSalaryReports";
                    panelReportDesigner.ID = "panelSalaryReportDesigner";
                    btnRefreshReports.ID = "btnRefreshReportsSalary";
                }
            }
        }

    }


</script>
<ext:Panel ID="TabReportDesigner" runat="server" Icon="Map" Layout="BorderLayout">

    <Items>
       
        <ext:TreePanel
            runat="server"
            Region="West"
            Width="250"
            AutoScroll="true"
            Split="true"
            UseArrows="true"
            ID="treeReports" MultiSelect="false" RootVisible="false" Collapsible="true">
            
           <%--  <Listeners>
                <ItemClick Fn="loadReport" />
            </Listeners>--%>
          <TopBar>
              <ext:Toolbar runat="server" >
                 <Items>
                     <ext:Button runat="server" Icon="ArrowRefresh" ID="btnRefreshReports" ToolTip="بارگذاری گزارشات" />
                     <ext:Button runat="server" Icon="Delete"  Handler="deleteReport(this.up('panel'))" ToolTip="حذف گزارش"/>
                     <ext:Button runat="server" Icon="PageWhiteEdit"  Handler="renameReport(this.up('panel'))" ToolTip="تغییر نام گزارش"/>
                 </Items>
              </ext:Toolbar>
          </TopBar>
            <Fields>
                <ext:ModelField Name="id" Type="Int" />
                <ext:ModelField Name="text" />
               
            </Fields>
            <ColumnModel>
                <Columns>
                    <ext:TreeColumn
                        runat="server"
                        Text="نام گزارش"
                        Flex="2"
                        Sortable="true"
                        DataIndex="text" />
                   
                    <ext:ActionColumn runat="server"
                      
                        Width="80"
                        MenuDisabled="true"
                        Align="Center">
                        <Items>
                            <ext:ActionItem Tooltip="تغییر نام گزارش" Icon="PageWhiteEdit" Handler="renameReportEditing" >
                                <IsDisabled Handler="return !record.data.leaf;" />
                            </ext:ActionItem>
                             <ext:ActionItem Tooltip="حذف گزارش" Icon="Delete" Handler="deleteReport">
                                <IsDisabled Handler="return !record.data.leaf;" />
                            </ext:ActionItem>
                            <ext:ActionItem Tooltip="نمایش گزارش" Icon="Eye" Handler="loadReport" >
                                <IsDisabled Handler="return !record.data.leaf;"  />
                            </ext:ActionItem>
                        </Items>
                    </ext:ActionColumn>
                </Columns>

            </ColumnModel>
            <Plugins>
                <ext:CellEditing runat="server"   ClicksToEdit="2" >
                    <Listeners>
                       
                        <Edit Fn="renameReport" />
                    </Listeners>
                </ext:CellEditing>
              
            </Plugins>
            <Editor>
                <ext:TextField runat="server" />
            </Editor>
        </ext:TreePanel>

        <ext:Panel runat="server" ID="panelReportDesigner"  Layout="BorderLayout" Region="Center" Split="true">
           <%-- <Loader runat="server" Url="../../ReportDesigner.aspx?SubSystem=Salary&ReportTypeID=1" Mode="Frame">
                <LoadMask ShowMask="true" Msg="در حال بارگذاری..."></LoadMask>
            </Loader>--%>
        </ext:Panel>

    </Items>

</ext:Panel>
