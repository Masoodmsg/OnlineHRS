<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<ext:DesktopModuleProxy ID="DesktopModulePersonnelsManagement" runat="server">
    <Module ModuleID="PersonnelsManagementModule">
        <Shortcut Name="مدیریت پرسنل" IconCls="x-personnel-icon" SortIndex="7" />
        <Launcher Text="مدیریت پرسنل" Icon="Building" />
        <Window>
            <ext:Window ID="PersonnelsManagementWindow" runat="server" Resizable="true" Height="600"
                Maximizable="true" Icon="Group" Title="مدیریت پرسنل" Width="900" BodyPadding="5"
                Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static" ManageHeight="true">
                <Items>

                    <ext:TabPanel
                        ID="TabPanelPersonnelsManagement"
                        runat="server"
                        ActiveTabIndex="0"
                        Plain="false" Layout="FitLayout" BodyPadding="1">
                        <%--<LayoutConfig>
                            <ext:FitLayoutConfig ItemCls="width-full" />
                        </LayoutConfig>--%>
                        <Items>
                            <ext:UserControlLoader runat="server" Path="~\Modules\Personnel\PersonnelSearch.ascx"
                                UserControlID="~\Modules\Personnel\PersonnelEditActionPanel.ascx;personnelEdit('Edit',this)" />


                        </Items>
                        <Bin>
                            <ext:UserControlLoader runat="server" Path="~\Modules\Personnel\PersonnelInfo.ascx" />
                        </Bin>
                    </ext:TabPanel>

                </Items>


            </ext:Window>

        </Window>
    </Module>
</ext:DesktopModuleProxy>
