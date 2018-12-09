<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<ext:DesktopModuleProxy ID="DesktopModuleProxyAccessManagement" runat="server">
    <Module ModuleID="AccessManagementModule">
        <Shortcut Name="مدیریت دسترسی ها" IconCls="x-useraccess-icon" SortIndex="2" />
        <Launcher Text="مدیریت دسترسی ها" Icon="UserMagnify" />
        <Window>
            <ext:Window ID="AccessManagemenWindow" runat="server" Height="550"
                Icon="User" Title="مدیریت نقش ها و دسترسی کاربران" Width="800" BodyPadding="5"
                Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static" ManageHeight="true">
                <Items>
                    <ext:TabPanel
                        ID="TabPanelAccessManagement"
                        runat="server"
                        ActiveTabIndex="0"
                        Width="600"
                        Height="250"
                        Plain="false" Layout="FitLayout" BodyPadding="1">
                        <Items>
                            <ext:Panel ID="tabRoleManagement" runat="server"
                                StyleSpec="width:100%"
                                Title="مدیریت نقش ها"
                                Icon="UserMature"
                                Layout="BorderLayout" Frame="true">
                                <Items>

                                    <ext:GridPanel
                                        runat="server"
                                        Region="Center"
                                        Title="نقش ها"
                                        MultiSelect="false"
                                        ID="tabRoleManagement_gridRoles">
                                        <Store>
                                            <ext:Store runat="server">
                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="Title" Type="String" />
                                                            <ext:ModelField Name="ID" Type="Int" />
                                                            <ext:ModelField Name="UserID" Type="Int" />
                                                            <ext:ModelField Name="OrganizationIDs" Type="String" />
                                                        </Fields>
                                                    </ext:Model>
                                                </Model>
                                                <Proxy>
                                                    <ext:AjaxProxy>
                                                        <Reader>
                                                            <ext:JsonReader>
                                                            </ext:JsonReader>
                                                        </Reader>
                                                    </ext:AjaxProxy>
                                                </Proxy>

                                            </ext:Store>
                                        </Store>
                                        <ColumnModel runat="server">
                                            <Columns>

                                                <ext:RowNumbererColumn Width="35" runat="server" Text="ردیف" Align="Center" />
                                                <ext:Column
                                                    runat="server"
                                                    Text="نام نقش"
                                                    Sortable="true"
                                                    DataIndex="Title"
                                                    Flex="1">
                                                    <Editor>
                                                        <ext:TextField runat="server" AllowBlank="false" BlankText="فیلد باید پر باشد" />
                                                    </Editor>
                                                </ext:Column>

                                                <ext:CommandColumn runat="server" Width="60">
                                                    <Commands>
                                                        <ext:GridCommand Icon="Delete" CommandName="Delete">
                                                            <ToolTip Text="حذف نقش" />
                                                        </ext:GridCommand>
                                                        <ext:CommandSeparator />
                                                        <ext:GridCommand Icon="NoteEdit" CommandName="Edit">
                                                            <ToolTip Text="ویرایش نقش" />
                                                        </ext:GridCommand>
                                                    </Commands>
                                                    <%--<PrepareToolbar Fn="prepare" />--%>
                                                    <Listeners>
                                                        <Command Handler="editRole(command,record)" />
                                                    </Listeners>
                                                </ext:CommandColumn>

                                            </Columns>
                                        </ColumnModel>

                                        <TopBar>
                                            <ext:Toolbar runat="server">
                                                <Items>
                                                    <ext:Button runat="server" Text="ایجاد نقش جدید" Icon="UserAdd" ID="btnAddRole">
                                                        <Listeners>
                                                            <Click Handler="addRole()" />
                                                        </Listeners>
                                                    </ext:Button>

                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <Plugins>
                                            <ext:RowEditing runat="server" AutoCancel="false" SaveBtnText="ذخیره" CancelBtnText="انصراف" ClicksToEdit="1">
                                                <Listeners>
                                                    <Edit Handler="editRole('Save',this)" />
                                                </Listeners>
                                            </ext:RowEditing>
                                        </Plugins>

                                        <Listeners>

                                            <AfterRender Handler="gridRolesDataBind(this)" />
                                           
                                            <RowClick Handler="selectRole(e)" />
                                           

                                        </Listeners>
                                    </ext:GridPanel>



                                    <ext:TabPanel
                                        ID="TabAccesses"
                                        runat="server"
                                        Width="500"
                                        Region="East"
                                        Split="true"
                                        Plain="false" Layout="FitLayout" BodyPadding="1">
                                        <Items>
                                            <ext:TreePanel
                                                runat="server"
                                                Width="350" Icon="Accept" Title="دسترسی نقش" OverflowY="Scroll"
                                                ID="treeModuleRoleAccess" Layout="AnchorLayout" BodyStyle="overflow-y:scroll">
                                                <Root>
                                                    <ext:Node Text="دسترسی ها" Expanded="true" AllowDrag="false" Icon="ApplicationDouble" Checked="false">
                                                    </ext:Node>
                                                </Root>

                                                <ColumnModel>
                                                    <Columns>
                                                        <ext:TreeColumn runat="server" Flex="1" DataIndex="text" Sortable="false" Selectable="false" />

                                                        <ext:ComponentColumn runat="server" Width="150" Sortable="false" Resizable="false" Selectable="false">
                                                            <Component>
                                                                <ext:ComboBox runat="server" Editable="false" ID="cmbAccessType" TriggerCls="rtl">
                                                                    <Items>
                                                                        <ext:ListItem Text="دسترسی کامل" Value="1" />
                                                                        <ext:ListItem Text="فقط خواندنی" Value="2" />
                                                                        <ext:ListItem Text="عدم دسترسی" Value="3" />
                                                                    </Items>
                                                                    <Listeners>
                                                                        <Select Handler="selectAccessType()"></Select>
                                                                    </Listeners>
                                                                </ext:ComboBox>

                                                            </Component>
                                                            <Listeners>
                                                                <BeforeBind Handler="return e.record.data.leaf;" />

                                                            </Listeners>
                                                        </ext:ComponentColumn>
                                                    </Columns>
                                                </ColumnModel>
                                                <Listeners>
                                                    <AfterRender Handler="treeModuleDataBind()">
                                                    </AfterRender>
                                                    <CheckChange Fn="checkChangeTreePanel">
                                                    </CheckChange>
                                                </Listeners>
                                            </ext:TreePanel>



                                            <ext:Panel ID="TabOrganizationRoleAccess" runat="server"
                                                Icon="ChartOrganisation" Title="ساختارهای نقش" Layout="FitLayout" RTL="true">
                                                <Listeners>
                                                    <AfterRender Handler="App.TabOrganizationRoleAccess.items.add(new OrganizitionTreeSelect().getOrganizitionTree())">
                                                    </AfterRender>
                                                </Listeners>
                                            </ext:Panel>
                                        </Items>
                                    </ext:TabPanel>
                                </Items>
                                <Buttons>
                                    <ext:Button ID="btnRoleAccess" runat="server" Text="ذخیره" Icon="PageSave" TabIndex="12"
                                        Handler="saveRoleAccess">
                                    </ext:Button>
                                </Buttons>
                                <%--<KeyMap runat="server">
                                    <Binding>
                                        <ext:KeyBinding Handler="saveRoleAccess">
                                            <Keys>
                                                <ext:Key Code="ENTER" />
                                            </Keys>
                                        </ext:KeyBinding>
                                    </Binding>
                                </KeyMap>--%>
                                <KeyMap runat="server">
                                    <ext:KeyBindItem Handler="saveRoleAccess" Key="ENTER" />

                                </KeyMap>
                            </ext:Panel>

                            <ext:Panel ID="TabPanelUserRoleAssigment" runat="server" Title="تخصیص نقش به پرسنل" Layout="BorderLayout" Frame="true">
                                <TopBar>
                                    <ext:Toolbar runat="server" Layout="FitLayout">
                                        <Items>
                                            <ext:UserControlLoader runat="server" Path="~\Modules\Personnel\UsersSelect.ascx" />
                                        </Items>
                                    </ext:Toolbar>
                                </TopBar>
                                <Items>
                                    <ext:UserControlLoader runat="server" Path="~\Modules\System\Roles.ascx" />
                                </Items>
                                <%--<Listeners>
                                    <BeforeActivate Handler="gridRoleAssigmentDataBind()"></BeforeActivate>
                                </Listeners>--%>
                                <Buttons>
                                    <ext:Button ID="btnSetUserRoleAssigment" runat="server" Text="ذخیره" Icon="Disk" TabIndex="12"
                                        Handler="setUserRoleAssigment(this.up('panel').down('grid'))">
                                    </ext:Button>
                                </Buttons>

                            </ext:Panel>

                            <ext:Panel ID="TabPanelUserRoles" runat="server" Title="نقش های پرسنل" Layout="BorderLayout" Frame="true">
                                <TopBar>
                                    <ext:Toolbar runat="server" Layout="FitLayout">
                                        <Items>
                                            <ext:UserControlLoader runat="server" Path="~\Modules\Personnel\UserSearch.ascx" UserControlID="getUserRolesAssigment( item, records,this.up().up().down('grid'))"></ext:UserControlLoader>
                                        </Items>
                                    </ext:Toolbar>
                                </TopBar>
                                <Items>
                                    <ext:UserControlLoader runat="server" Path="~\Modules\System\Roles.ascx"></ext:UserControlLoader>
                                </Items>

                                <Buttons>
                                    <ext:Button ID="btnUserRoles" runat="server" Text="ذخیره" Icon="Disk" TabIndex="12"
                                        Handler="setUserRoleAssigment(this.up('panel').down('grid'))">
                                    </ext:Button>
                                </Buttons>

                            </ext:Panel>
                        </Items>
                    </ext:TabPanel>

                </Items>


            </ext:Window>

        </Window>
    </Module>
</ext:DesktopModuleProxy>
