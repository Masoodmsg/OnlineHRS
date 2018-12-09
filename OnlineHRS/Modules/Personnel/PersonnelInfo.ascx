<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>


<ext:Panel runat="server" Layout="BorderLayout" RTL="true"
    Title="اطلاعات پرسنلی" Icon="ReportUser" ID="TabPersonnelInfo" Closable="true" CloseAction="Hide"
    CloseToolText="بستن" Hidden="true">


    <Items>
        <ext:Panel runat="server" Layout="TableLayout" RTL="true" BodyPadding="5" AnimCollapse="true" Title="اطلاعات پرسنلی"
            Region="North" ID="PersonnelShowInfo" Collapsible="true" Split="true" Icon="Vcard" BodyStyle="background:#f1f1f1">

            <LayoutConfig>
                <ext:TableLayoutConfig Columns="4" ItemCls="width-full" />
            </LayoutConfig>

            <Items>
                <ext:Panel runat="server" Layout="TableLayout" RTL="true" BodyStyle="background:#f1f1f1"
                    MaxHeight="220" MaxWidth="140" MinHeight="220" MinWidth="130" Border="false">

                    <LayoutConfig>
                        <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                    </LayoutConfig>

                    <Items>
                        <ext:Image runat="server" ColSpan="2" MaxHeight="180" MaxWidth="140" MinHeight="180" MinWidth="130" Width="140" PaddingSpec="0px 0px 5px 0px" />
                        <ext:FileUploadField runat="server" ButtonText="" Icon="UserAdd" />
                        <ext:Button runat="server" Icon="Disk" ToolTip="ذخیره عکس">
                            <Listeners>
                                <Click Handler="savePersonnelPhoto(this.prev())" />
                            </Listeners>
                        </ext:Button>
                    </Items>
                </ext:Panel>

                <ext:Panel runat="server" Layout="TableLayout" RTL="true" BodyPadding="5" BodyStyle="background:#f1f1f1">

                    <LayoutConfig>
                        <ext:TableLayoutConfig Columns="1" ItemCls="width-full" />
                    </LayoutConfig>

                    <Items>
                        <ext:DisplayField runat="server" ID="lblPersonnel_FirstName" FieldLabel="نام" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_LastName" FieldLabel="نام خانوادگی" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_Code" FieldLabel="کد پرسنلی" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_StatusTypeTitle" FieldLabel="وضعیت اشتغال" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_NationalCode" FieldLabel="کد ملی" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_FatherName" FieldLabel="نام پدر " LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_BirthDate" FieldLabel="تاریخ تولد" LabelWidth="100" FieldStyle="color:#205a8c" />

                    </Items>
                </ext:Panel>
                <ext:Panel runat="server" Layout="TableLayout" RTL="true" BodyPadding="5" BodyStyle="background:#f1f1f1">

                    <LayoutConfig>
                        <ext:TableLayoutConfig Columns="1" ItemCls="width-full" />
                    </LayoutConfig>

                    <Items>
                        <ext:DisplayField runat="server" ID="lblPersonnel_MarriedStatusTitle" FieldLabel="وضعیت تأهل" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_EducationGradeTitle" FieldLabel="مدرک تحصیلی" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_SumExprience" FieldLabel="سنوات خدمت" LabelWidth="100" FieldStyle="color:#205a8c" />

                        <ext:DisplayField runat="server" ID="lblPersonnel_EmploymentTypeTitle" FieldLabel="نوع استخدام" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_StartDate" FieldLabel="تاریخ استخدام" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_JobGroupTitle" FieldLabel="گروه/طبقه/رتبه" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_MainUnitTitle" FieldLabel="محل خدمت" LabelWidth="100" FieldStyle="color:#205a8c" />

                    </Items>
                </ext:Panel>
                <ext:Panel runat="server" Layout="TableLayout" RTL="true" BodyPadding="5" BodyStyle="background:#f1f1f1">

                    <LayoutConfig>
                        <ext:TableLayoutConfig Columns="1" ItemCls="width-full" />
                    </LayoutConfig>

                    <Items>
                        <ext:DisplayField runat="server" ID="lblPersonnel_PostName" FieldLabel="پست سازمانی" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_JobTitle" FieldLabel="شغل" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_UnitName" FieldLabel="واحد" LabelWidth="100" FieldStyle="color:#205a8c" />

                        <ext:DisplayField runat="server" ID="lblPersonnel_InsuranceTypeTitle" FieldLabel="نوع بیمه" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_JobStatusTitle" FieldLabel="وضعیت شغلی" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_TaxGroupTitle" FieldLabel="گروه مالیاتی" LabelWidth="100" FieldStyle="color:#205a8c" />
                        <ext:DisplayField runat="server" ID="lblPersonnel_InsuranceGroupTitle" FieldLabel="گروه بیمه ای" LabelWidth="100" FieldStyle="color:#205a8c" />
                    </Items>
                </ext:Panel>
            </Items>
        </ext:Panel>

        <ext:TabPanel runat="server" Layout="FitLayout" RTL="true" Border="false" Region="Center">
            <Items>
                <ext:FormPanel runat="server" Layout="TableLayout" RTL="true" BodyPadding="5" AnimCollapse="true"
                    BodyStyle="background:#f1f1f1" Title="اطلاعات فردی" Icon="UserTick" ID="TabPersonnelPersonalInfo">

                    <LayoutConfig>
                        <ext:TableLayoutConfig Columns="6" ItemCls="width-full" />

                    </LayoutConfig>

                    <FieldDefaults LabelAlign="Top" MsgTarget="Side" />
                    <%-- <Defaults>

                        <ext:Parameter Name="Border" Value="false" />
                        <ext:Parameter Name="Flex" Value="1" />
                      
                        <ext:Parameter Name="anchor" Value="95%" Mode="Value" />
                        <ext:Parameter Name="allowBlank" Value="false" Mode="Raw" />

                        <ext:Parameter Name="blankText" Value=".این فیلد باید پر باشد" Mode="Value" />
                    </Defaults>--%>
                    <Items>
                        <ext:TextField ID="txtPersonnel_FirstName" TabIndex="0" runat="server" FieldLabel="نام" AllowBlank="false" BlankText=".این فیلد باید پر باشد" ValidateOnChange="false" />
                        <ext:TextField ID="txtPersonnel_LastName" TabIndex="1" runat="server" FieldLabel="نام خانوادگی" AllowBlank="false" BlankText=".این فیلد باید پر باشد" />
                        <ext:TextField ID="txtPersonnel_Code" TabIndex="2" runat="server" FieldLabel="کد پرسنلی" MaskRe="/[0-9-]/" />
                        <ext:TextField ID="txtPersonnel_NationalCode" AllowBlank="false" BlankText=".این فیلد باید پر باشد" TabIndex="3" runat="server" FieldLabel="کد ملی" MaxLength="10" Vtype="isValidNationalCode" VtypeText=".کد ملی نامعتبر است" EnforceMaxLength="true" MaskRe="/[0-9-]/" MinLength="10" MinLengthText="این فیلد باید 10 رقم باشد" />
                        <ext:TextField ID="txtPersonnel_FatherName" TabIndex="4" runat="server" FieldLabel="نام پدر" />
                        <ext:TextField ID="txtPersonnel_BCID" TabIndex="5" runat="server" FieldLabel="شماره شناسنامه" MaskRe="/[0-9-]/" />
                        <ext:TextField runat="server" ID="txtPersonnel_IssueLocationCity" FieldLabel="محل صدور" Editable="false" TabIndex="6"
                            Enabled="false">
                            <Triggers>
                                <ext:FieldTrigger Icon="Search" Handler="openCitiesModalWindow(App.TabPersonnelInfo,App.txtPersonnel_IssueLocationCity)" />
                            </Triggers>
                        </ext:TextField>
                        <ext:TextField runat="server" ID="txtPersonnel_BirthLocationCity" FieldLabel="محل تولد" Editable="false"
                            Enabled="false" TabIndex="7">
                            <Triggers>
                                <ext:FieldTrigger Icon="Search" Handler="openCitiesModalWindow(App.TabPersonnelInfo,App.txtPersonnel_BirthLocationCity)" />
                            </Triggers>
                        </ext:TextField>
                        <ext:TextField runat="server" ID="txtPersonnel_BirthDate" FieldLabel="تاریخ تولد" Icon="Date" RTL="false" LabelStyle="direction:rtl"
                            Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="8" InputMaskString="9999/99/99">
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

                        </ext:TextField>
                        <ext:ComboBox Editable="false" TabIndex="9" ID="txtPersonnel_Sex" runat="server" FieldLabel="جنسیت">
                            <Items>
                                <ext:ListItem Text="مرد" Value="1" />
                                <ext:ListItem Text="زن" Value="2" />
                            </Items>

                        </ext:ComboBox>
                        <ext:ComboBox Editable="false" TabIndex="10" ID="txtPersonnel_MarriedStatus" runat="server" FieldLabel="وضعیت تاهل">
                            <Listeners>
                                <AfterRender Handler="comboBoxConstantBinder(this, 'BaseInfo', 'MarriedStatus', 1, 'ID')" />
                            </Listeners>
                        </ext:ComboBox>
                        <ext:TextField runat="server" ID="txtPersonnel_MarriageDate" FieldLabel="تاریخ ازدواج" Icon="Date" RTL="false" LabelStyle="direction:rtl"
                            Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="11" InputMaskString="9999/99/99">
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

                        </ext:TextField>
                        <ext:ComboBox Editable="false" TabIndex="12" ID="txtPersonnel_MilitaryServiceStatus" runat="server" FieldLabel="وضعیت نظام وظیفه">

                            <Listeners>
                                <AfterRender Handler=" comboBoxConstantBinder(this, 'BaseInfo', 'MilitaryServiceStatus', 1, 'ID')" />
                            </Listeners>
                        </ext:ComboBox>
                        <ext:TextField runat="server" ID="txtPersonnel_MilitaryServiceStartDate" FieldLabel="تاریخ شروع خدمت" Icon="Date" RTL="false" LabelStyle="direction:rtl"
                            Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="13" InputMaskString="9999/99/99">
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
                        <ext:TextField runat="server" ID="txtPersonnel_MilitaryServiceEndDate" FieldLabel="تاریخ پایان خدمت" Icon="Date" RTL="false" LabelStyle="direction:rtl"
                            Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="13" InputMaskString="9999/99/99">
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
                        <ext:NumberField ID="txtPersonnel_MilitaryServiceDuration" MaxValue="750" MinValue="0" TabIndex="14" runat="server" FieldLabel="مدت سربازی(روز)" />
                    </Items>
                    <Buttons>

                        <ext:Button Text="ذخیره" runat="server" Icon="Disk">
                            <Listeners>
                                <Click Handler="savePersonnelInfo(this.up('form'))" />
                            </Listeners>
                        </ext:Button>
                    </Buttons>
                    <%--<KeyMap runat="server">
                        <Binding>

                            <ext:KeyBinding Handler="savePersonnelInfo(this.up('form'))">
                                <Keys>
                                    <ext:Key Code="ENTER" />
                                </Keys>
                            </ext:KeyBinding>
                        </Binding>
                    </KeyMap>--%>
                    <KeyMap runat="server">
                        <ext:KeyBindItem Handler="savePersonnelInfo(this.up('form'))" Key="ENTER" />

                    </KeyMap>
                </ext:FormPanel>

                <ext:FormPanel runat="server" Layout="TableLayout" RTL="true" BodyPadding="5" AnimCollapse="true"
                    BodyStyle="background:#f1f1f1" Title="اطلاعات استخدامی" Icon="ScriptEdit" ID="TabPersonnelEmploymentInfo">

                    <LayoutConfig>
                        <ext:TableLayoutConfig Columns="6" ItemCls="width-full" />

                    </LayoutConfig>

                    <FieldDefaults LabelAlign="Top" MsgTarget="Side" />
                    <Items>
                        <ext:TextField runat="server" ID="txtPersonnel_StartDate" FieldLabel="تاریخ استخدام" Icon="Date" RTL="false" LabelStyle="direction:rtl"
                            Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="1" InputMaskString="9999/99/99">
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
                        <ext:TextField runat="server" ID="txtPersonnel_CollaborationStartDate" FieldLabel="تاریخ شروع همکاری" Icon="Date" RTL="false" LabelStyle="direction:rtl"
                            Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="2" InputMaskString="9999/99/99">
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
                        <ext:TextField runat="server" ID="txtPersonnel_CollaborationEndDate" FieldLabel="تاریخ پایان همکاری" Icon="Date" RTL="false" LabelStyle="direction:rtl"
                            Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="3" InputMaskString="9999/99/99">
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

                        </ext:TextField>
                        <ext:ComboBox Editable="false" TabIndex="4" ID="cmbPersonnel_JobStatus" runat="server" FieldLabel="وضعیت شغلی">
                            <Listeners>
                                <AfterRender Handler="comboBoxJobStatusBinder(this)" />
                            </Listeners>
                        </ext:ComboBox>

                        <%--<ext:UserControlLoader runat="server" Path="~\Modules\Company\ComboBoxConstant.ascx" UserControlID="cmbPersonnelEmploymentType;setComboBoxConstant(this, 'BaseInfo', 'EmploymentType', 1);نوع استخدام" />--%>
                        <ext:ComboBox Editable="false" TabIndex="5" ID="cmbPersonnel_EmploymentType" runat="server" FieldLabel="نوع استخدام">
                            <Listeners>
                                <AfterRender Handler="comboBoxConstantBinder(this, 'BaseInfo', 'EmploymentType', 1, 'ID')" />
                            </Listeners>
                        </ext:ComboBox>
                        <ext:ComboBox Editable="false" TabIndex="6" ID="cmbPersonnel_ContractBy" runat="server" FieldLabel="طرف قرارداد">
                            <Listeners>
                                <AfterRender Handler="comboBoxConstantBinder(this, 'BaseInfo', 'ContractBy', 1, 'ID')" />
                            </Listeners>
                        </ext:ComboBox>
                        <ext:ComboBox Editable="false" TabIndex="7" ID="cmbPersonnel_JobGroup" runat="server" FieldLabel="گروه/طبقه">
                            <Listeners>
                                <AfterRender Handler="comboBoxConstantBinder(this, 'Company_Job', 'JobGroup', 1, 'ID')" />
                            </Listeners>
                        </ext:ComboBox>
                    </Items>

                    <Buttons>

                        <ext:Button Text="ذخیره" runat="server" Icon="Disk">
                            <Listeners>
                                <Click Handler="savePersonnelInfo(this.up('form'))" />
                            </Listeners>
                        </ext:Button>
                    </Buttons>
                   <%-- <KeyMap runat="server">
                        <binding>

                            <ext:KeyBinding Handler="savePersonnelInfo(this.up('form'))">
                                <Keys>
                                    <ext:Key Code="ENTER" />
                                </Keys>
                            </ext:KeyBinding>
                        </binding>
                    </KeyMap>--%>
                    <KeyMap runat="server">
                        <ext:KeyBindItem Handler="savePersonnelInfo(this.up('form'))" Key="ENTER" />

                    </KeyMap>
                </ext:FormPanel>

            </Items>
            <Listeners>
                <TabChange Fn="getPersonnelInfo" />
            </Listeners>
        </ext:TabPanel>
    </Items>

</ext:Panel>

