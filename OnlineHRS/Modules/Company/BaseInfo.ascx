<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>


<ext:DesktopModuleProxy ID="BaseInfoModuleProxy" runat="server">
    <Module ModuleID="BaseInfoModule">
        <Shortcut Name="مدیریت اطلاعات پایه" IconCls="x-baseinfo1-icon" SortIndex="6"  TextCls="shortcut-text"  />
        <Launcher Text="مدیریت اطلاعات پایه" Icon="Information" />
        <Window>
            <ext:Window ID="BaseInfoWindow" runat="server" Resizable="false" Height="700" Icon="Cog" Title="مدیریت اطلاعات پایه" Width="1000"
                BodyPadding="5" Layout="FitLayout" CloseAction="Destroy" RTL="true">

                <Items>
                    <ext:TabPanel
                        ID="TabPanelBaseInfo"
                        runat="server"
                        Plain="false" 
                        Layout="FitLayout" 
                        BodyPadding="1" >
                        <Plugins>
                            <ext:TabScrollerMenu PageSize="20" runat="server" MaxText="1000"/>
                        </Plugins>
                        <Items>
                              <ext:Panel ID="TabEmploymentType" Icon="PageEdit" Layout="FitLayout" runat="server" Title="تعريف نوع استخدام" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', ' نوع استخدام','نوع استخدام جدید' ,'BaseInfo', 'EmploymentType',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                            <ext:Panel ID="TabBusinessAnalysisJobStatus" Icon="StatusBusy" Layout="FitLayout" Title="تعریف وضعیت های شغلی" RTL="true" runat="server">
                                <Items>
                                    <ext:GridPanel
                                        ID="gridJobStatus"
                                        runat="server"
                                        Frame="true">
                                        <Store>
                                            <ext:Store>
                                              
                                                <Model>
                                                    <ext:Model>
                                                        <Fields>
                                                            <ext:ModelField Name="ID" Type="Int" />
                                                            <ext:ModelField Name="Title" Type="String" />
                                                            <ext:ModelField Name="Status" />
                                                            <ext:ModelField Name="StatusTitle" Type="String" />
                                                            <ext:ModelField Name="IsExperience" Type="Boolean" />
                                                            <ext:ModelField Name="ExperienceTitle" />
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
                                        <Plugins>
                                            <ext:RowEditing AutoCancel="false" CancelBtnText="انصراف" SaveBtnText="ذخیره" ClicksToEdit="1" >
                                                <Listeners>
                                                    <Edit Handler="editJobStatus('Save',this,App.gridJobStatus)"></Edit>
                                                </Listeners>

                                            </ext:RowEditing>
                                        </Plugins>
                                        <TopBar>
                                            <ext:Toolbar runat="server">
                                                <Items>
                                                    <ext:Button runat="server" Text="وضعیت شغلی جدید" Icon="Add">
                                                        <Listeners>
                                                            <Click Fn="addJobStatus" />
                                                        </Listeners>
                                                    </ext:Button>
                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <ColumnModel>
                                            <Columns>
                                                <ext:RowNumbererColumn Width="25" />

                                                <ext:Column
                                                    Text="عنوان"
                                                    DataIndex="Title"
                                                    Width="400">
                                                    <Editor>
                                                        <ext:TextField runat="server" AllowBlank="false" />
                                                    </Editor>
                                                </ext:Column>
                                                <ext:Column Text="وضعیت" DataIndex="StatusTitle" Flex="1">
                                                    <Editor>
                                                        <ext:ComboBox SelectOnTab="true" Editable="false">
                                                            <Items>
                                                                <ext:ListItem Text="شاغل" Value="1" />
                                                                <ext:ListItem Text="غیر شاغل" Value="0" />
                                                            </Items>
                                                        </ext:ComboBox>
                                                    </Editor>
                                                </ext:Column>

                                                <ext:Column
                                                    Text="سنوات(سابقه)"
                                                    DataIndex="ExperienceTitle"
                                                    Flex="1" >
                                                    <Editor>
                                                        <ext:ComboBox SelectOnTab="true" Editable="false">
                                                            <Items>
                                                                <ext:ListItem Text="محاسبه شود" Value="1" />
                                                                <ext:ListItem Text="محاسبه نشود" Value="0" />
                                                            </Items>
                                                        </ext:ComboBox>
                                                    </Editor>
                                                    
                                                    
                                                </ext:Column>

                                                <ext:CommandColumn runat="server" Width="60">
                                                    <Commands>
                                                        <ext:GridCommand Icon="Delete" CommandName="Delete">
                                                            <ToolTip Text="حذف" />
                                                        </ext:GridCommand>
                                                        <ext:CommandSeparator />
                                                        <ext:GridCommand Icon="NoteEdit" CommandName="Edit">
                                                            <ToolTip Text="ویرایش" />
                                                        </ext:GridCommand>
                                                    </Commands>
                                                    <Listeners>
                                                        <Command Handler="editJobStatus(command,record,this.up().up())" />

                                                    </Listeners>
                                                </ext:CommandColumn>
                                            </Columns>
                                        </ColumnModel>
                                        <Listeners>
                                            <AfterRender Handler="gridJobStatusBinder(this)">
                                            </AfterRender>
                                            <RowClick Handler="this.editingPlugin.cancelEdit()"></RowClick>
                                        </Listeners>
                                    </ext:GridPanel>
                                </Items>

                            </ext:Panel>
                             <ext:Panel ID="TabMarriedStatus" Icon="Group" Layout="FitLayout" runat="server" Title="تعريف وضعيت تاهل" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'وضعيت تاهل','وضعيت تاهل جدید' ,'BaseInfo', 'MarriedStatus',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                              <ext:Panel ID="TabMilitaryServiceStatus" Icon="UserStar" Layout="FitLayout" runat="server" Title="تعريف وضعيت نظام وظيفه" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'وضعيت نظام وظيفه','وضعيت نظام وظيفه جدید' ,'BaseInfo', 'MilitaryServiceStatus',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                             
                            <ext:Panel ID="TabPhysicalStatus" Icon="HeartBroken" Layout="FitLayout" runat="server" Title="تعريف وضعيت جسمانی" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'وضعيت جسمانی','وضعيت جسمانی جدید' ,'BaseInfo', 'PhysicalStatus',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                            <ext:Panel ID="TabSponsorshipStatus" Icon="UserHome" Layout="FitLayout" runat="server" Title="تعريف وضعيت تكفل" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'وضعيت تكفل','وضعيت تكفل جدید' ,'BaseInfo', 'SponsorshipStatus',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                             <ext:Panel ID="TabFields" Icon="BookEdit" Layout="FitLayout" runat="server" Title="تعريف رشته تحصيلی" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'رشته تحصيلی','رشته تحصيلی جدید' ,'BaseInfo', 'Field',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>

                             <ext:Panel ID="TabUnivercityType" Icon="Building" Layout="FitLayout" runat="server" Title="تعريف نوع دانشگاه" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'نوع دانشگاه','نوع دانشگاه جدید' ,'BaseInfo', 'UnivercityType',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                            <ext:Panel ID="TabUnivercites" Icon="Rosette" Layout="FitLayout" runat="server" Title="تعريف دانشگاه" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', ' دانشگاه ها','دانشگاه جدید' ,'BaseInfo', 'Univercity',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                           
                             <ext:Panel ID="TabContractType" Icon="TextSignature" Layout="FitLayout" runat="server" Title="تعريف نوع قرارداد" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', ' نوع قرارداد','نوع قرارداد جدید' ,'BaseInfo', 'ContractType',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                            <ext:Panel ID="TabContractBy" Icon="PageEdit" Layout="FitLayout" runat="server" Title="تعريف طرف قرارداد" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'طرف قرارداد','طرف قرارداد جدید' ,'BaseInfo', 'ContractBy',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                            <ext:Panel ID="TabActivityScope" Icon="ApplicationViewTile" Layout="FitLayout" runat="server" Title="تعريف حوزه فعاليت" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'حوزه های فعاليت','حوزه فعاليت جدید' ,'BaseInfo', 'ActivityScope',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                            <ext:Panel ID="TabInsuranceType" Icon="Tick" Layout="FitLayout" runat="server" Title="تعريف نوع بيمه" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'نوع بيمه','نوع بيمه جدید' ,'BaseInfo', 'InsuranceType',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                            <ext:Panel ID="TabComputerSkill" Icon="Monitor" Layout="FitLayout" runat="server" Title="تعريف سطح مهارت رايانه" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'سطح مهارت رايانه','سطح جدید' ,'BaseInfo', 'ComputerSkill',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                             <ext:Panel ID="TabForeignSkill" Icon="SortAscending" Layout="FitLayout" runat="server" Title="تعريف سطح مهارت زبان خارجه" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'سطح مهارت زبان خارجه','سطح جدید' ,'BaseInfo', 'ForeignSkill',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                             <ext:Panel ID="TabForeignLanguage" Icon="Font" Layout="FitLayout" runat="server" Title="تعريف زبان خارجه" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'زبان خارجه','زبان خارجه جدید' ,'BaseInfo', 'ForeignLanguage',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                            <ext:Panel ID="TabFamilyKinship" Icon="GroupLink" Layout="FitLayout" runat="server" Title="تعريف نسبت خانوادگی " RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'نسبت خانوادگی','نسبت خانوادگی جدید' ,'BaseInfo', 'FamilyKinship',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                             <ext:Panel ID="TabYear" Icon="Date" Layout="FitLayout" runat="server" Title="تعريف سال" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'سال','سال جدید' ,'BaseInfo', 'Year',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>
                        </Items>
                    </ext:TabPanel>
                </Items>


            </ext:Window>
        </Window>
    </Module>
</ext:DesktopModuleProxy>
