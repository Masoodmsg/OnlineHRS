<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>


<ext:DesktopModuleProxy ID="DesktopModuleProxyBusinessAnalysis" runat="server">
    <Module ModuleID="BusinessAnalysisModule">
        <Shortcut Name="تجزیه و تحلیل مشاغل" IconCls="x-businessanalysis-icon" SortIndex="5" />
        <Launcher Text="تجزیه و تحلیل مشاغل" Icon="ChartCurve" />
        <Window>
            <ext:Window ID="BusinessAnalysisWindow" runat="server" Resizable="true" Height="650"
                Maximizable="true" Icon="ChartCurve" Title="تجزیه و تحلیل مشاغل" Width="1000" BodyPadding="5"
                Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static" ManageHeight="true">
                <Items>

                    <ext:TabPanel
                        ID="TabPanelBusinessAnalysis"
                        runat="server"
                        ActiveTabIndex="2"
                        Width="600"
                        Height="250"
                        Plain="false" Layout="FitLayout" BodyPadding="1">
                        <Plugins>
                            <ext:TabScrollerMenu PageSize="20" runat="server" MaxText="1000" />
                        </Plugins>
                        <Items>

                            <ext:Panel ID="TabBusinessAnalysisPost" runat="server"
                                Icon="ChartOrganisation" Title="مديريت پست هاي سازماني" Layout="BorderLayout">
                                <Items>

                                    <ext:TreePanel
                                        runat="server"
                                        Region="West"
                                        Width="350"
                                        AutoScroll="true"
                                        Split="true"
                                        UseArrows="true" Collapsible="true" Title="ساختار سازمانی" Icon="Building"
                                        ID="TabBusinessAnalysisPost_treePost" MultiSelect="false" RootVisible="false">
                                        <TopBar>
                                            <ext:Toolbar runat="server" Layout="TableLayout">
                                                <LayoutConfig>
                                                    <ext:TableLayoutConfig Columns="5" ItemCls="width-full" />
                                                </LayoutConfig>
                                                <Items>
                                                    <ext:FieldSet runat="server" ColSpan="5" StyleSpec="width: 99%; background-color: #d7d2d2;margin-bottom: 10px;">
                                                        <Items>

                                                            <ext:ComboBox ID="TabBusinessAnalysisPost_ddlOrgVersioning" Editable="false" ValueField="ID" DisplayField="Title" QueryMode="Local" LabelAlign="Top" runat="server" FieldLabel="ساختار سازماني" ColSpan="5" StyleSpec="width: 100%;">
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
                                                                    <AfterRender Handler="selectOrgVersion(this,'Post')" />
                                                                    <Select Handler="selectOrgVersion(this,'Post')" />
                                                                </Listeners>
                                                            </ext:ComboBox>
                                                        </Items>

                                                    </ext:FieldSet>

                                                    <%-- <ext:MenuSeparator runat="server" ColSpan="5" />--%>

                                                    <ext:Button runat="server" Text="پست جدید" Icon="UserAdd" Handler="addNewPost(this.up().up())">
                                                    </ext:Button>
                                                    <ext:Button runat="server" Text="حذف پست" Icon="UserDelete" Handler="deleteOrgPost(this.up().up())">
                                                    </ext:Button>

                                                    <ext:Button runat="server" Text="برش" Icon="CutRed" Handler="cutPost(this.up().up())">
                                                    </ext:Button>
                                                    <ext:Button runat="server" Text="کپی" Icon="PageCopy" Handler="copyOrganizationUnit(this.up().up())">
                                                    </ext:Button>
                                                    <ext:Button runat="server" Text="چسباندن" Icon="PastePlain" Handler="pasteOrganizationUnit(this.up().up())">
                                                    </ext:Button>


                                                    <ext:TextField runat="server" EnableKeyEvents="true" FieldLabel="عنوان پست" EmptyText="جستجو"
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
                                            <ItemContextMenu Fn="showTreePostContextMenu" />
                                            <ItemClick Fn="getOrganizationPostInfo" />


                                        </Listeners>

                                    </ext:TreePanel>

                                    <ext:TabPanel ID="TabOrgPost" runat="server" Layout="FitLayout" Region="Center" Split="true">

                                        <Items>

                                            <ext:FormPanel ID="TabBusinessAnalysisPost_OrgPostInfo" AutoScroll="true" runat="server"
                                                Frame="true" Layout="TableLayout" Title="واحد سازمانی" Icon="House">
                                                <LayoutConfig>
                                                    <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                                                </LayoutConfig>
                                                <FieldDefaults LabelAlign="Top" MsgTarget="Side" />
                                                <Items>
                                                    <ext:TextField runat="server" ID="TabBusinessAnalysisPost_txtTopOfUnit" ColSpan="2" FieldLabel="واحد مافوق" Editable="false" Enabled="false" FieldStyle="text-align:center;font-weight:bold !important"></ext:TextField>
                                                    <ext:TextField runat="server" ID="TabBusinessAnalysisPost_txtUnitName" ColSpan="2" FieldLabel="نام واحد" AllowBlank="false" BlankText="این فیلد باید پر باشد"></ext:TextField>
                                                    <ext:TextField runat="server" ID="TabBusinessAnalysisPost_txtCode" FieldLabel="کد واحد" />

                                                    <ext:ComboBox runat="server" ID="TabBusinessAnalysisPost_cmbDegree" FieldLabel="درجه" Editable="false">
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
                                                        ID="TabBusinessAnalysisPost_cmbOrgUnit" FieldLabel="واحد سازمانی" ColSpan="2" Editable="false"
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

                                                        </ListConfig>
                                                        <Listeners>
                                                            <%--<Change Handler="if(this.valueCollection.getCount() > 0) {this.icon='data:image/jpeg;base64,' + this.valueCollection.getAt(0).data.Icon;this.iconEl.src = this.valueCollection.getAt(0).data.Icon}" />--%>
                                                            <AfterRender Handler="getOrganizationLevel(this)"></AfterRender>
                                                        </Listeners>
                                                    </ext:ComboBox>
                                                    <ext:TextField runat="server" ID="TabBusinessAnalysisPost_txtUnitPropDate" AllowBlank="true" FieldLabel="ابلاغ و تشکیلات" Icon="Date" Note="مثال: 1394/05/08" Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" InputMaskString="9999/99/99">
                                                       <%-- <Plugins>
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
                                                        <Triggers>
                                                            <ext:FieldTrigger Icon="Date" />

                                                        </Triggers>
                                                    </ext:TextField>
                                                    <ext:TextField runat="server" ID="TabBusinessAnalysisPost_txtCreateDate" FieldLabel="تاریخ تصویب" Icon="Date" Note="مثال: 1394/05/08" Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" InputMaskString="9999/99/99">
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
                                                        <Triggers>
                                                            <ext:FieldTrigger Icon="Date" />

                                                        </Triggers>
                                                    </ext:TextField>
                                                    <ext:TextField runat="server" ID="TabBusinessAnalysisPost_txtLocationCity" FieldLabel="شهر استقرار" Editable="false"
                                                        Enabled="false" AllowBlank="false" BlankText="شهر محل استقرار انتخاب نشده است">
                                                        <Triggers>
                                                            <ext:FieldTrigger Icon="Search" Handler="openCitiesModalWindow(App.TabOrgPost,App.TabBusinessAnalysisPost_txtLocationCity)" />
                                                        </Triggers>
                                                    </ext:TextField>
                                                    <ext:ComboBox runat="server" ID="TabBusinessAnalysisPost_cmbStatus" FieldLabel="وضعیت" Editable="false" AllowBlank="false">
                                                        <Items>
                                                            <ext:ListItem Text="فعال" Value="1" />
                                                            <ext:ListItem Text="غیر فعال" Value="2" />
                                                        </Items>

                                                    </ext:ComboBox>
                                                    <ext:TextField runat="server" ID="TabBusinessAnalysisPost_txtHistoryDesc" ColSpan="2" FieldLabel="سوابق"></ext:TextField>
                                                    <ext:TextField runat="server" ID="TabBusinessAnalysisPost_txtDesc" ColSpan="2" FieldLabel="ملاحظات"></ext:TextField>
                                                </Items>
                                                <Buttons>
                                                    <ext:Button ID="btnSaveBusinessAnalysisPost" runat="server" Text="ذخیره" Icon="Disk" TabIndex="12" Handler="saveOrganizationPostUnit(this.up().up())">
                                                    </ext:Button>
                                                </Buttons>

                                               <%-- <KeyMap runat="server">
                                                    <Binding>
                                                        <ext:KeyBinding Handler="saveOrganizationPostUnit(this.up().up())">
                                                            <Keys>
                                                                <ext:Key Code="ENTER" />
                                                            </Keys>
                                                        </ext:KeyBinding>
                                                    </Binding>
                                                </KeyMap>--%>
                                                <KeyMap runat="server">
                                                    <ext:KeyBindItem Handler="saveOrganizationPostUnit(this.up().up())" Key="ENTER" />

                                                </KeyMap>
                                            </ext:FormPanel>

                                            <ext:FormPanel ID="TabBusinessAnalysisPost_PostInfo" AutoScroll="true" runat="server" Frame="true" Layout="TableLayout" Title="پست سازمانی" Icon="UserHome">
                                                <LayoutConfig>
                                                    <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                                                </LayoutConfig>
                                                <FieldDefaults LabelAlign="Top" MsgTarget="Side" />
                                                <Items>
                                                    <ext:TextField runat="server" ID="TabBusinessAnalysisPost_OrgUnitName" ColSpan="2" FieldLabel="واحد سازمانی" Editable="false" Enabled="false"
                                                        FieldStyle="text-align:center;font-weight:bold !important" DisabledCls="field-disabled" Disabled="true" />
                                                    <%--<ext:UserControlLoader ColSpan="2" Path="~\Modules\Company\ComboPostTitles.ascx" runat="server" />--%>
                                                    <ext:ComboBox runat="server" AllowBlank="false" BlankText="یک عنوان پست را انتخاب کنید"
                                                        FieldLabel="عنوان پست" TypeAhead="true" ColSpan="2" EmptyText="جستجو پست"
                                                        ID="PostTitleID" IDMode="Parent">
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

                                                            <AfterRender Handler="comboBoxPostTitleBinder(this)"></AfterRender>
                                                            <Select Fn="setPostTitleInfo"></Select>
                                                        </Listeners>
                                                    </ext:ComboBox>
                                                    <ext:TextField runat="server" ID="txtOrgPostLevel" FieldLabel="سطح سازمانی پست" ReadOnly="true" DisabledCls="field-disabled" Disabled="true" />
                                                    <ext:TextField runat="server" ID="txtOrgPostActivityType" FieldLabel="نوع فعالیت" ReadOnly="true" DisabledCls="field-disabled" Disabled="true" />
                                                    <ext:TextField runat="server" ID="txtTitleInUnit" ColSpan="2" FieldLabel="عنوان در واحد" AllowBlank="false" BlankText="این فیلد باید پر باشد" />
                                                    <ext:TextField ID="txtPostNumber" runat="server" FieldLabel="شماره پست" MaskRe="/[0-9-]/" />
                                                    <ext:ComboBox runat="server" ID="cmbOrgPostStatus" FieldLabel="وضعیت" Editable="false" AllowBlank="false">
                                                        <Items>
                                                            <ext:ListItem Text="فعال" Value="1" />
                                                            <ext:ListItem Text="غیر فعال" Value="2" />
                                                        </Items>
                                                    </ext:ComboBox>
                                                    <ext:TextField runat="server" ID="txtOrgPostJobName" FieldLabel="شغل" ReadOnly="true" DisabledCls="field-disabled" Disabled="true" />
                                                    <ext:TextField runat="server" ID="txtOrgPostField" FieldLabel="رشته" ReadOnly="true" DisabledCls="field-disabled" Disabled="true" />
                                                    <ext:TextField runat="server" ID="txtOrgPostJobLevel" FieldLabel="رده شغل" ReadOnly="true" DisabledCls="field-disabled" Disabled="true" />
                                                    <ext:ComboBox runat="server" ID="ddlOrgPostChargeType" FieldLabel="نوع تصدي" Editable="false" AllowBlank="false" DisabledCls="field-disabled" Disabled="true">
                                                        <Items>
                                                            <ext:ListItem Text="با تصدي" Value="1" />
                                                            <ext:ListItem Text="بلاتصدي" Value="2" />
                                                        </Items>
                                                    </ext:ComboBox>

                                                    <ext:ComboBox runat="server" ID="ddlOrgPostStabilityType" FieldLabel="ثابت/موقت" Editable="false" AllowBlank="false">
                                                        <Items>
                                                            <ext:ListItem Text="دائم" Value="1" />
                                                            <ext:ListItem Text="موقت" Value="2" />
                                                        </Items>
                                                    </ext:ComboBox>
                                                    <ext:TextField runat="server" ID="txtOrgPostCreateDate" FieldLabel="تاریخ تصویب" Icon="Date" Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" InputMaskString="9999/99/99">
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
                                                        <Triggers>
                                                            <ext:FieldTrigger Icon="Date" />

                                                        </Triggers>
                                                    </ext:TextField>
                                                    <%--<ext:TextField runat="server" ID="txtOrgPostOfferDate" AllowBlank="true" FieldLabel="تاریخ پیشنهاد" Icon="Date" Note="مثال: 1394/05/08" Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center">
                                                        <Plugins>
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
                                                        </Plugins>
                                                        <Triggers>
                                                            <ext:FieldTrigger Icon="Date" />

                                                        </Triggers>
                                                    </ext:TextField>--%>




                                                    <ext:TextArea runat="server" ID="txtOrgPostDesc" ColSpan="2" FieldLabel="شرح" Height="40"></ext:TextArea>
                                                </Items>
                                                <Buttons>
                                                    <ext:Button ID="btnSavePost" runat="server" Text="ذخیره" Icon="Disk" TabIndex="12" Handler="savePost(this.up().up())">
                                                    </ext:Button>
                                                </Buttons>

                                                <%--<KeyMap runat="server">
                                                    <Binding>
                                                        <ext:KeyBinding Handler="savePost(this.up().up())">
                                                            <Keys>
                                                                <ext:Key Code="ENTER" />
                                                            </Keys>
                                                        </ext:KeyBinding>
                                                    </Binding>
                                                </KeyMap>--%>
                                                <KeyMap runat="server">
                                                    <ext:KeyBindItem Handler="savePost(this.up().up())" Key="ENTER" />

                                                </KeyMap>
                                            </ext:FormPanel>


                                        </Items>
                                    </ext:TabPanel>

                                    <ext:Panel ID="PanelOrgPostHistory" Frame="true" Title="سوابق تصدی پست" Width="600" runat="server" Layout="FitLayout"
                                        Region="East" Collapsed="true" Collapsible="true" Icon="Group" Split="true">

                                        <Items>
                                            <ext:GridPanel
                                                runat="server"
                                                Region="Center"
                                                MultiSelect="false"
                                                AutoLoad="false"
                                                ID="gridPersonnelPost">
                                                <Store>
                                                    <ext:Store runat="server">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="ID" Type="Int" />
                                                                    <ext:ModelField Name="FullName" />
                                                                    <ext:ModelField Name="PostType" />
                                                                    <ext:ModelField Name="StartDate" />
                                                                    <ext:ModelField Name="EndDate" />
                                                                    <ext:ModelField Name="IsActive" />
                                                                    <ext:ModelField Name="IsActiveTitle" />
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
                                                        <ext:RowNumbererColumn Width="35" runat="server" Text="ردیف" Align="Center" />
                                                        <ext:Column
                                                            runat="server"
                                                            Text="نام و نام خانوادگی"
                                                            DataIndex="FullName"
                                                            Width="170">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="نوع پست"
                                                            Sortable="true"
                                                            DataIndex="PostTypeTitle"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="شروع تصدی"
                                                            Sortable="true"
                                                            DataIndex="StartDate"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="پایان تصدی"
                                                            Sortable="true"
                                                            DataIndex="EndDate"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="وضعيت"
                                                            Sortable="true"
                                                            DataIndex="IsActiveTitle"
                                                            Flex="1">
                                                        </ext:Column>

                                                        <ext:CommandColumn runat="server" Width="60">
                                                            <Commands>
                                                                <ext:GridCommand Icon="UserDelete" CommandName="Delete">
                                                                    <ToolTip Text="حذف" />
                                                                </ext:GridCommand>
                                                                <ext:CommandSeparator />
                                                                <ext:GridCommand Icon="UserEdit" CommandName="Edit">
                                                                    <ToolTip Text="ویرایش" />
                                                                </ext:GridCommand>
                                                            </Commands>
                                                            <Listeners>
                                                                <Command Handler="editPersonnelPost(command,record,App.TabBusinessAnalysisJobs)" />
                                                            </Listeners>
                                                        </ext:CommandColumn>

                                                    </Columns>
                                                </ColumnModel>

                                                <TopBar>
                                                    <ext:Toolbar runat="server">
                                                        <Items>
                                                            <ext:Button runat="server" Text="تصدي جديد" Icon="UserAdd">
                                                                <Listeners>
                                                                    <Click Handler="showPersonnelPostWindow(this.up().up().up(),'Add')" />
                                                                </Listeners>

                                                            </ext:Button>

                                                        </Items>
                                                    </ext:Toolbar>
                                                </TopBar>


                                            </ext:GridPanel>
                                            <%--تاریخچه واحد/پست--%>
                                        </Items>
                                        <Listeners>
                                            <%-- <Expand Handler="isSelectedPost()" />--%>
                                            <BeforeExpand Handler="isSelectedPost()" />
                                        </Listeners>
                                    </ext:Panel>
                                </Items>

                            </ext:Panel>

                            <ext:Panel ID="TabBusinessAnalysisJobs" Icon="Vcard"
                                Layout="FitLayout" runat="server"
                                Title="مديريت مشاغل سازمانی">
                                <Items>
                                    <ext:GridPanel
                                        runat="server"
                                        Region="Center"
                                        Title="شغل ها"
                                        MultiSelect="false"
                                        AutoLoad="false"
                                        ID="TabPanelBusinessAnalysis_gridJobs">
                                        <Store>
                                            <ext:Store runat="server">
                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="ID" Type="Int" />
                                                            <ext:ModelField Name="Title" />
                                                            <ext:ModelField Name="Code" Type="Int" />
                                                            <ext:ModelField Name="CategoryTitle" />
                                                            <ext:ModelField Name="FieldTitle" />
                                                            <ext:ModelField Name="LevelTitle" />
                                                            <%--<ext:ModelField Name="ActiveStateTitle" />--%>
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
                                                <%-- <ext:Column
                                                    runat="server"
                                                    Text=""
                                                    Sortable="true"
                                                    DataIndex="ID"
                                                    Hidden="true"
                                                    Width="3">
                                                </ext:Column>--%>
                                                <ext:RowNumbererColumn Width="35" runat="server" Text="ردیف" Align="Center" />
                                                <ext:Column
                                                    runat="server"
                                                    Text="عنوان شغل"
                                                    DataIndex="Title"
                                                    Width="200">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="کد شغل"
                                                    Sortable="true"
                                                    DataIndex="Code"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="رده شغل"
                                                    Sortable="true"
                                                    DataIndex="LevelTitle"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="رسته"
                                                    Sortable="true"
                                                    DataIndex="CategoryTitle"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="رشته"
                                                    Sortable="true"
                                                    DataIndex="FieldTitle"
                                                    Flex="1">
                                                </ext:Column>
                                                <%-- <ext:Column
                                                    runat="server"
                                                    Text="وضعیت"
                                                    Sortable="true"
                                                    DataIndex="ActiveStateTitle"
                                                    Flex="1">
                                                </ext:Column>--%>
                                                <ext:CommandColumn runat="server" Width="60">
                                                    <Commands>
                                                        <ext:GridCommand Icon="VcardDelete" CommandName="Delete">
                                                            <ToolTip Text="حذف" />
                                                        </ext:GridCommand>
                                                        <ext:CommandSeparator />
                                                        <ext:GridCommand Icon="VcardEdit" CommandName="Edit">
                                                            <ToolTip Text="ویرایش" />
                                                        </ext:GridCommand>
                                                    </Commands>
                                                    <Listeners>
                                                        <Command Handler="editJob(command,record,App.TabBusinessAnalysisJobs)" />
                                                    </Listeners>
                                                </ext:CommandColumn>

                                            </Columns>
                                        </ColumnModel>

                                        <TopBar>
                                            <ext:Toolbar runat="server">
                                                <Items>
                                                    <ext:Button runat="server" Text="ایجاد شغل جدید" Icon="VcardAdd" ID="btnAddOrgLevel">
                                                        <Listeners>
                                                            <Click Handler="showJobWindow(this.up().up().up(),'Add')" />
                                                        </Listeners>

                                                    </ext:Button>

                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <Listeners>
                                            <AfterRender Handler="getJobs(this)">
                                            </AfterRender>

                                        </Listeners>
                                        <Plugins>
                                            <ext:FilterHeader runat="server" />
                                        </Plugins>
                                    </ext:GridPanel>
                                </Items>
                            </ext:Panel>

                            <ext:Panel ID="TabBusinessAnalysisPostTitle" Icon="ChartLine"
                                Layout="FitLayout" runat="server"
                                Title="مديريت عناوين پست ها">
                                <Items>
                                    <ext:GridPanel
                                        runat="server"
                                        Region="Center"
                                        Title="عناوين پست ها"
                                        MultiSelect="false"
                                        AutoLoad="false"
                                        ID="TabPanelBusinessAnalysis_gridPostTitle">
                                        <Store>
                                            <ext:Store runat="server">
                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="ID" Type="Int" />
                                                            <ext:ModelField Name="PostTitle" />
                                                            <ext:ModelField Name="PostTitleCode" Type="Int" />
                                                            <ext:ModelField Name="PostOrgLevelTitle" />
                                                            <ext:ModelField Name="JobTitle" />
                                                            <ext:ModelField Name="ActivityTypeTitle" />

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
                                                    Width="30">
                                                </ext:Column>--%>
                                                <ext:RowNumbererColumn Width="35" runat="server" Text="ردیف" Align="Center" />
                                                <ext:Column
                                                    runat="server"
                                                    Text="عنوان پست"
                                                    DataIndex="PostTitle"
                                                    Width="200">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="کد پست"
                                                    Sortable="true"
                                                    DataIndex="PostTitleCode"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="سطح پست"
                                                    Sortable="true"
                                                    DataIndex="PostOrgLevelTitle"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="شغل"
                                                    Sortable="true"
                                                    DataIndex="JobTitle"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="نوع فعالیت"
                                                    Sortable="true"
                                                    DataIndex="ActivityTypeTitle"
                                                    Flex="1">
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
                                                        <Command Handler="editPostTitle(command,record,App.TabBusinessAnalysisPostTitle)" />
                                                    </Listeners>
                                                </ext:CommandColumn>

                                            </Columns>
                                        </ColumnModel>

                                        <TopBar>
                                            <ext:Toolbar runat="server">
                                                <Items>
                                                    <ext:Button runat="server" Text="ایجاد عنوان پست جدید" Icon="Add">
                                                        <Listeners>
                                                            <Click Handler="showPostTitleWindow(this.up().up().up(),'Add')" />
                                                        </Listeners>
                                                    </ext:Button>
                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <Listeners>
                                            <AfterRender Handler="getPostTitles(this)">
                                            </AfterRender>

                                        </Listeners>
                                        <Plugins>
                                            <ext:FilterHeader runat="server" />
                                        </Plugins>
                                    </ext:GridPanel>
                                </Items>
                            </ext:Panel>

                            <ext:Panel ID="TabBusinessAnalysisPostOrgLevel" Icon="SitemapColor" Layout="FitLayout" runat="server" Title="تعریف سطح سازمانی پست ها" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'سطح سازمانی پست','ایجاد سطح پست جدید' ,'Company_PostTitle', 'PostOrgLevel',0))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>

                            <ext:Panel ID="TabBusinessAnalysisField" runat="server"
                                Icon="Book" Title="تعریف رسته و رشته شغلی" Layout="BorderLayout">
                                <Items>
                                    <ext:FormPanel ID="TabBusinessAnalysis_Fields" AutoScroll="true" runat="server" Region="Center" Frame="true" Layout="TableLayout">
                                        <LayoutConfig>
                                            <ext:TableLayoutConfig ItemCls="width-full" Columns="1" />
                                        </LayoutConfig>
                                        <FieldDefaults LabelAlign="Top" MsgTarget="Side" />
                                        <Items>
                                            <ext:TextField runat="server" ID="TabBusinessAnalysis_txtFieldType" FieldLabel="نوع" Editable="false" Enabled="false" FieldStyle="text-align:center;font-weight:bold !important"></ext:TextField>
                                            <ext:TextField runat="server" ID="TabBusinessAnalysis_txtFieldTitle" FieldLabel="عنوان" AllowBlank="false" BlankText="این فیلد باید پر باشد"></ext:TextField>
                                            <ext:TextField runat="server" ID="TabBusinessAnalysis_txtFieldCode" FieldLabel="کد" />

                                        </Items>
                                        <Buttons>
                                            <ext:Button ID="btnSaveBusinessAnalysisField" runat="server" Text="ذخیره" Icon="Disk" TabIndex="12" Handler="saveBusinessAnalysisField(this.up().up())">
                                            </ext:Button>
                                        </Buttons>

                                         <%--<KeyMap runat="server">
                                            <Binding>
                                                <ext:KeyBinding Handler="saveBusinessAnalysisField(this.up().up())">
                                                    <Keys>
                                                        <ext:Key Code="ENTER" />
                                                    </Keys>
                                                </ext:KeyBinding>
                                            </Binding>
                                        </KeyMap>--%>
                                        <KeyMap runat="server">
                                            <ext:KeyBindItem Handler="saveBusinessAnalysisField(this.up().up())" Key="ENTER" />

                                        </KeyMap>
                                    </ext:FormPanel>

                                    <ext:TreePanel
                                        runat="server"
                                        Region="West"
                                        Width="350"
                                        AutoScroll="true"
                                        Split="true"
                                        UseArrows="true"
                                        ID="TabBusinessAnalysis_treeFields" MultiSelect="false">
                                        <%--<Root>
                                            <ext:Node Text="رسته ها / رشته ها"  Icon="BookOpen" Expanded="true" />
                                        </Root>--%>
                                        <TopBar>
                                            <ext:Toolbar runat="server" Layout="TableLayout">
                                                <LayoutConfig>
                                                    <ext:TableLayoutConfig Columns="5" ItemCls="width-full" />
                                                </LayoutConfig>
                                                <Items>
                                                    <ext:Button runat="server" Text="ایجاد رسته جدید" Icon="Add" Handler="addNewCategory()">
                                                    </ext:Button>
                                                    <ext:Button runat="server" Text="ایجاد رشته جدید" Icon="Add" Handler="addNewField()">
                                                    </ext:Button>

                                                    <ext:Button runat="server" Text="حذف" Icon="Delete" Handler="deleteFieldCategory()">
                                                    </ext:Button>

                                                    <ext:ToolbarSpacer />

                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>


                                        <Listeners>
                                            <AfterRender Handler="getFieldsTreeBinder(this)" />
                                            <ItemClick Handler="getFieldInfo(this)" />
                                        </Listeners>

                                    </ext:TreePanel>
                                </Items>

                            </ext:Panel>



                            <ext:Panel ID="TabBusinessAnalysisJobLevels" Icon="Cart"
                                Layout="FitLayout" runat="server"
                                Title="تعریف رده های شغلی" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'رده های شغلی','تعریف رده شغلی جدید' ,'Company_Job', 'JobLevel',1))">
                                    </AfterRender>

                                </Listeners>
                            </ext:Panel>
                            <ext:Panel ID="TabBusinessAnalysisJobGroup" Icon="Group" Layout="FitLayout" runat="server" Title="تعریف گروه های شغلی" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'گروه شغلی','تعریف گروه شغلی جدید' ,'Company_Job', 'JobGroup',1))">
                                    </AfterRender>
                                </Listeners>
                            </ext:Panel>

                            <ext:Panel ID="TabBusinessAnalysisJobCategory" Icon="ChartBar" Layout="FitLayout" runat="server" Title="تعریف طبقه های شغلی" RTL="true">
                                <Listeners>
                                    <AfterRender Handler="this.items.add(getGridConstant(null, '', 'طبقه شغلی','تعریف طبقه شغلی جدید' ,'Company_Job', 'JobCategory',1))">
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
