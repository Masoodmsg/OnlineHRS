<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<ext:DesktopModuleProxy ID="DesktopModuleProxyOrganizationStructure" runat="server">
    <Module ModuleID="OrganizationStructureModule">
        <Shortcut Name="تشکیلات" IconCls="x-organization-icon" SortIndex="4" />
        <Launcher Text="تشکیلات" Icon="Building" />
        <Window>
            <ext:Window ID="OrganizationStructureWindow" runat="server" Resizable="true" Height="600"
                Maximizable="true" Icon="ChartOrganisation" Title="تشکیلات" Width="900" BodyPadding="5"
                Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static" ManageHeight="true">
                <Items>

                    <ext:TabPanel
                        ID="TabPanelOrganizationStructure"
                        runat="server"
                        ActiveTabIndex="0"
                        Width="600"
                        Height="250"
                        Plain="false" Layout="FitLayout" BodyPadding="1">
                        <Items>
                            <ext:Panel ID="TabPanelOrganizationLevel" Icon="BuildingAdd"
                                Frame="true" Layout="FitLayout" runat="server"
                                Title="تعریف سطح سازمانی واحدها">
                                <Items>
                                    <ext:GridPanel
                                        runat="server"
                                        Region="Center"
                                        Title="سطح های سازمانی"
                                        MultiSelect="false"
                                        AutoLoad="false"
                                        ID="TabPanelOrgLevel_gridOrgLevel">
                                        <Store>
                                            <ext:Store runat="server">
                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="Title" />
                                                            <ext:ModelField Name="Code" />
                                                            <ext:ModelField Name="ID" Type="Int" />
                                                            <ext:ModelField Name="ParentTitle" />
                                                            <ext:ModelField Name="ParentID" />
                                                            <ext:ModelField Name="Icon" />
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
                                                <%--<ext:Column
                                                    runat="server"
                                                    Text=""
                                                    Sortable="true"
                                                    DataIndex="ID"
                                                    Hidden="true"
                                                    Width="3">
                                                </ext:Column>--%>
                                                <ext:Column
                                                    runat="server"
                                                    Text=""
                                                    Sortable="true"
                                                    DataIndex="ParentID"
                                                    Hidden="true"
                                                    Width="3">
                                                </ext:Column>
                                                <ext:RowNumbererColumn Width="35" runat="server" Text="ردیف" Align="Center" />
                                                <ext:Column runat="server"
                                                    Text="آیکون"
                                                    Width="50">
                                                    <Renderer Fn="organizationLevelIcon" />
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="عنوان سطح"
                                                    DataIndex="Title"
                                                    Width="150">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="کد"
                                                    Sortable="true"
                                                    DataIndex="Code"
                                                    Width="50" Align="Center">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="شماره سطح"
                                                    Sortable="true"
                                                    DataIndex="LevelNo"
                                                    Width="80" Align="Center">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="واحدهای بالادست"
                                                    Sortable="true"
                                                    DataIndex="ParentTitle"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:CommandColumn runat="server" Width="60">
                                                    <Commands>
                                                        <ext:GridCommand Icon="Delete" CommandName="Delete">
                                                            <ToolTip Text="حذف" />
                                                        </ext:GridCommand>
                                                        <ext:CommandSeparator />
                                                        <ext:GridCommand Icon="Pencil" CommandName="Edit">
                                                            <ToolTip Text="ویرایش" />
                                                        </ext:GridCommand>
                                                    </Commands>

                                                    <Listeners>
                                                        <Command Handler="editOrganisationLevel(command,record,this.up('panel'))" />
                                                    </Listeners>
                                                </ext:CommandColumn>

                                            </Columns>
                                        </ColumnModel>

                                        <TopBar>
                                            <ext:Toolbar runat="server">
                                                <Items>
                                                    <ext:Button runat="server" Text="ایجاد سطح جدید" Icon="Add" ID="btnAddOrgLevel">
                                                        <Listeners>
                                                            <Click Handler="editOrganisationLevel('Add',null,this.up('panel'))" />
                                                        </Listeners>

                                                    </ext:Button>

                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <Listeners>
                                            <AfterRender Handler="getOrganizationLevel(this)">
                                            </AfterRender>

                                        </Listeners>

                                    </ext:GridPanel>
                                </Items>
                            </ext:Panel>

                            <ext:Panel ID="TabOrgStrucManagment" runat="server"
                                Icon="ChartOrganisation" Title="مدیریت واحدهای سازمانی" Layout="BorderLayout">


                                <Items>
                                    <ext:FormPanel ID="TabOrgStrucManagment_OrgUnitInfo" AutoScroll="true" runat="server" Region="Center" Frame="true" Layout="TableLayout">
                                        <LayoutConfig>
                                            <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                                        </LayoutConfig>
                                        <FieldDefaults LabelAlign="Top" MsgTarget="Side" />
                                        <Items>
                                            <ext:TextField runat="server" ID="TabOrgStrucManagment_txtTopOfUnit" ColSpan="2" FieldLabel="واحد مافوق" Editable="false" Enabled="false" FieldStyle="text-align:center;font-weight:bold !important" DisabledCls="field-disabled" Disabled="true"></ext:TextField>
                                            <ext:TextField runat="server" ID="TabOrgStrucManagment_txtUnitName" ColSpan="2" FieldLabel="نام واحد" AllowBlank="false" BlankText="این فیلد باید پر باشد"></ext:TextField>
                                            <ext:TextField runat="server" ID="TabOrgStrucManagment_txtCode" FieldLabel="کد واحد" />

                                            <ext:ComboBox runat="server" ID="TabOrgStrucManagment_cmbDegree" FieldLabel="درجه" Editable="false">
                                                <Items>
                                                    <ext:ListItem Text="بدون درجه" Value="0" />
                                                    <ext:ListItem Text="درجه 1" Value="1" />
                                                    <ext:ListItem Text="درجه 2" Value="2" />
                                                    <ext:ListItem Text="درجه 3" Value="3" />
                                                    <ext:ListItem Text="درجه 4" Value="4" />
                                                    <ext:ListItem Text="ممتاز" Value="10" />
                                                </Items>
                                            </ext:ComboBox>
                                            <ext:ComboBox runat="server" AllowBlank="false" BlankText="یک واحد سازمانی را انتخاب کنید" QueryMode="Local"
                                                ID="TabOrgStrucManagment_cmbOrgUnit" FieldLabel="واحد سازمانی" ColSpan="2" Editable="false"
                                                ValueField="ID" DisplayField="Title">
                                                <Store>
                                                    <ext:Store
                                                        runat="server">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="Title" />
                                                                    <ext:ModelField Name="ID" Type="Int" />
                                                                    <ext:ModelField Name="Icon" />
                                                                    <ext:ModelField Name="ParentTitle" />
                                                                </Fields>
                                                            </ext:Model>
                                                        </Model>

                                                    </ext:Store>
                                                </Store>
                                                <ListConfig>
                                                    <ItemTpl runat="server">

                                                        <Html>
                                                            <div style="border-bottom: solid 1px #EBE7E7">
                                                              
                                                                <table style="width:100%">
                                                                    <tr>
                                                                        <td style="width:30%"> {Title}</td>
                                                                        <td style="width:60%">{ParentTitle}</td>
                                                                        <td style="width:10% ;background-image: url(data:image/jpeg;base64,{Icon}); background-repeat   : no-repeat !important;background-position : 3px 50% !important; padding-left:24px !important;"></td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </Html>
                                                    </ItemTpl>
                                                    <%-- <Tpl runat="server">

                                                        <Html>
                                                            <tpl for=".">
						                                        <tpl if="[xindex] == 1">
                                                                    <table style="width:100%">
								                                        <tr style="font-weight:bold;border-bottom:solid 1px black">
									                                        <th style="width:30%;text-align:right">نام واحد</th>
									                                        <th style="width:60%;text-align:right">واحدهای بالادستی</th>
                                                                            <th style="width:10%;text-align:right">آیکون</th>
								                                        </tr>
						                                        </tpl>
                                                                    <tr>
                                                                        <td style="width:30%"> {Title}</td>
                                                                        <td style="width:60%">{ParentTitle}</td>
                                                                        <td style="width:10% ;background-image: url(data:image/jpeg;base64,{Icon}); background-repeat   : no-repeat !important;background-position : 3px 50% !important; padding-left:24px !important;"></td>
                                                                    </tr>
                                                               <tpl if="[xcount-xindex]==0">
							                                        </table>
						                                       </tpl>
					                                        </tpl>
                                                        </Html>
                                                    </Tpl>--%>
                                                </ListConfig>
                                                <Listeners>
                                                    <%--<Change Handler="if(this.valueCollection.getCount() > 0) {this.icon='data:image/jpeg;base64,' + this.valueCollection.getAt(0).data.Icon;this.iconEl.src = this.valueCollection.getAt(0).data.Icon}" />--%>
                                                    <AfterRender Handler="getOrganizationLevel(this)"></AfterRender>
                                                </Listeners>
                                            </ext:ComboBox>

                                            <ext:TextField runat="server" ID="TabOrgStrucManagment_txtUnitPropDate" FieldLabel="ابلاغ و تشکیلات" Icon="Date" RTL="false" LabelStyle="direction:rtl"
                                                Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="0" AllowBlank="false" BlankText=".این فیلد باید پر باشد" InputMaskString="9999/99/99">
                                                <%--<Plugins>
                                                    <ext:InputMask runat="server" Mask="yzzz/mn/dt" AllowInvalid="true">
                                                        <MaskSymbols>
                                                            <ext:MaskSymbol Name="d" Regex="[0123]" Placeholder="D" />
                                                            <ext:MaskSymbol Name="t" Regex="[0-9]" Placeholder="D" />
                                                            <ext:MaskSymbol Name="m" Regex="[01]" Placeholder="M" />
                                                            <ext:MaskSymbol Name="n" Regex="[0-9]" Placeholder="M" />
                                                            <ext:MaskSymbol Name="y" Regex="[1]" Placeholder="Y" />
                                                            <ext:MaskSymbol Name="z" Regex="[0-9]" Placeholder="Y" />
                                                        </MaskSymbols>
                                                    </ext:InputMask>
                                                </Plugins>--%>

                                            </ext:TextField>

                                            <ext:TextField runat="server" ID="TabOrgStrucManagment_txtCreateDate" FieldLabel="تاریخ تصویب" Icon="Date" RTL="false" LabelStyle="direction:rtl"
                                                Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="0" AllowBlank="false" BlankText=".این فیلد باید پر باشد" InputMaskString="9999/99/99">
                                              <%--  <Plugins>
                                                    <ext:InputMask runat="server" Mask="yzzz/mn/dt" AllowInvalid="true">
                                                        <MaskSymbols>
                                                            <ext:MaskSymbol Name="d" Regex="[0123]" Placeholder="D" />
                                                            <ext:MaskSymbol Name="t" Regex="[0-9]" Placeholder="D" />
                                                            <ext:MaskSymbol Name="m" Regex="[01]" Placeholder="M" />
                                                            <ext:MaskSymbol Name="n" Regex="[0-9]" Placeholder="M" />
                                                            <ext:MaskSymbol Name="y" Regex="[1]" Placeholder="Y" />
                                                            <ext:MaskSymbol Name="z" Regex="[0-9]" Placeholder="Y" />
                                                        </MaskSymbols>
                                                    </ext:InputMask>
                                                </Plugins>--%>

                                            </ext:TextField>
                                            <ext:TextField runat="server" ID="TabOrgStrucManagment_txtLocationCity" FieldLabel="شهر استقرار" Editable="false"
                                                Enabled="false" AllowBlank="false" BlankText="شهر محل استقرار انتخاب نشده است">
                                                <Triggers>
                                                    <ext:FieldTrigger Icon="Search" Handler="openCitiesModalWindow(App.TabOrgStrucManagment,App.TabOrgStrucManagment_txtLocationCity)" />
                                                </Triggers>
                                            </ext:TextField>
                                            <ext:ComboBox runat="server" ID="TabOrgStrucManagment_cmbStatus" FieldLabel="وضعیت" Editable="false" AllowBlank="false">
                                                <Items>
                                                    <ext:ListItem Text="فعال" Value="1" />
                                                    <ext:ListItem Text="غیر فعال" Value="2" />
                                                </Items>

                                            </ext:ComboBox>
                                            <ext:TextField runat="server" ID="TabOrgStrucManagment_txtHistoryDesc" ColSpan="2" FieldLabel="سوابق"></ext:TextField>
                                            <ext:TextField runat="server" ID="TabOrgStrucManagment_txtDesc" ColSpan="2" FieldLabel="ملاحظات"></ext:TextField>
                                        </Items>
                                        <Buttons>
                                            <ext:Button ID="btnSaveOrgStrucManagment" runat="server" Text="ذخیره" Icon="Disk" TabIndex="12" Handler="saveOrganizationUnit(this.up().up())">
                                            </ext:Button>
                                        </Buttons>

                                       <%-- <KeyMap runat="server">
                                            <Binding>
                                                <ext:KeyBinding Handler="saveOrganizationUnit(this.up().up())">
                                                    <Keys>
                                                        <ext:Key Code="ENTER" />
                                                    </Keys>
                                                </ext:KeyBinding>
                                            </Binding>
                                        </KeyMap>--%>
                                        <KeyMap runat="server">
                                            <ext:KeyBindItem Handler="saveOrganizationUnit(this.up().up())" Key="ENTER" />

                                        </KeyMap>
                                    </ext:FormPanel>

                                    <ext:TreePanel
                                        runat="server"
                                        Region="West"
                                        Width="350"
                                        AutoScroll="true"
                                        Split="true"
                                        UseArrows="true"
                                        ID="TabOrgStrucManagment_treeOrganisation" MultiSelect="false" RootVisible="false">
                                        <TopBar>
                                            <ext:Toolbar runat="server" Layout="TableLayout">
                                                <LayoutConfig>
                                                    <ext:TableLayoutConfig Columns="5" ItemCls="width-full" />
                                                </LayoutConfig>
                                                <Items>
                                                    <ext:FieldSet runat="server" ColSpan="5" StyleSpec="width: 99%; background-color: #d7d2d2;margin-bottom: 10px;">
                                                        <Items>
                                                            <ext:ComboBox ID="TabOrgStrucManagment_ddlOrgVersioning" Editable="false" LabelAlign="Top" runat="server" FieldLabel="ساختار سازماني" ColSpan="5" StyleSpec="width: 100%;">
                                                                <%-- <Store>
                                                                    <ext:Store
                                                                        runat="server">
                                                                        <Model>
                                                                            <ext:Model runat="server">
                                                                                <Fields>
                                                                                    <ext:ModelField Name="Title" />
                                                                                    <ext:ModelField Name="ID" Type="Int" />
                                                                                   
                                                                                </Fields>
                                                                            </ext:Model>
                                                                        </Model>

                                                                    </ext:Store>
                                                                </Store>--%>
                                                                <Listeners>
                                                                    <AfterRender Handler="selectOrgVersion(this,'Org')" />
                                                                    <Select Handler="selectOrgVersion(this,'Org')" />
                                                                </Listeners>
                                                            </ext:ComboBox>
                                                        </Items>

                                                    </ext:FieldSet>

                                                    <%-- <ext:MenuSeparator runat="server" ColSpan="5" />--%>

                                                    <ext:Button runat="server" Text="واحد جدید" Icon="ChartOrganisationAdd" Handler="addNewOrgUnit(this.up().up())">
                                                    </ext:Button>
                                                    <ext:Button runat="server" Text="حذف واحد" Icon="ChartOrganisationDelete" Handler="deleteOrganisationUnit(this.up().up())">
                                                    </ext:Button>

                                                    <ext:Button runat="server" Text="برش" Icon="CutRed" Handler="cutOrganizationUnit(this.up().up())">
                                                    </ext:Button>
                                                    <ext:Button runat="server" Text="کپی" Icon="PageCopy" Handler="copyOrganizationUnit(this.up().up())">
                                                    </ext:Button>
                                                    <ext:Button runat="server" Text="چسباندن" Icon="PastePlain" Handler="pasteOrganizationUnit(this.up().up())">
                                                    </ext:Button>


                                                    <ext:TextField ID="fieldFilter" runat="server" EnableKeyEvents="true" FieldLabel="عنوان واحد" EmptyText="جستجو"
                                                        ColSpan="5" LabelWidth="55" MarginSpec="5 0 5 0">
                                                        <Triggers>
                                                            <ext:FieldTrigger Icon="Clear" />
                                                        </Triggers>
                                                        <Listeners>
                                                            <KeyUp Fn="filterTree" Buffer="250" />
                                                            <TriggerClick Handler="clearFilter(this);" />
                                                        </Listeners>
                                                    </ext:TextField>
                                                    <ext:ToolbarSpacer />

                                                    <%--  <ext:Button runat="server" Text="ایجاد سطح جدید" Icon="ChartOrganisationAdd" ID="Button3">
                                                    </ext:Button>--%>
                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <View>
                                            <ext:TreeView runat="server">
                                                <Plugins>
                                                    <ext:TreeViewDragDrop runat="server" EnableDrag="true" EnableDrop="true" NodeHighlightOnDrop="true" />
                                                </Plugins>
                                                <Listeners>
                                                    <BeforeDrop Fn="confirmCutOrgUnitDragDrop"></BeforeDrop>

                                                </Listeners>
                                            </ext:TreeView>
                                        </View>

                                        <Listeners>
                                            <%--<AfterRender Handler="getOrganisationTree(this)" />--%>
                                            <ItemContextMenu Fn="showTreeOrgUnitContextMenu" />
                                            <ItemClick Fn="getOrganizationUnit" />


                                        </Listeners>

                                    </ext:TreePanel>
                                </Items>

                            </ext:Panel>

                            <ext:Panel ID="TabOrgUnitDegree" Icon="AwardStarGold2" Layout="FitLayout" runat="server" Title="مدیریت درجه واحد ها" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'درجه واحد ها','ایجاد درجه جدید' ,'Company_Organization', 'UnitDegree',1))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                        </Items>
                        <%--<Listeners>
                            <TabChange Fn="text"></TabChange>
                        </Listeners>--%>
                    </ext:TabPanel>

                </Items>


            </ext:Window>

        </Window>
    </Module>
</ext:DesktopModuleProxy>
