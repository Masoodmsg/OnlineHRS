<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>


<ext:DesktopModuleProxy ID="DesktopModuleProxyCompanyManagement" runat="server">
    <Module ModuleID="CompanyManagementModule">
        <Shortcut Name="مدیرت شرکت" IconCls="x-company-icon" SortIndex="1" />
        <Launcher Text="مدیرت شرکت" Icon="House" />
        <Window>
            <ext:Window ID="CompanyManagemenWindow" runat="server" Resizable="false" Height="550"
                Maximizable="false" Icon="House" Title="مدیرت شرکت" Width="800" BodyPadding="5"
                Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static" ManageHeight="true">

                <Items>
                    <ext:TabPanel
                        ID="TabPanelCompanyManagement"
                        runat="server"
                        ActiveTabIndex="0"
                        Width="600"
                        Height="250"
                        Plain="false" Layout="FitLayout" BodyPadding="1">
                        <Items>
                            <ext:Panel ID="tabCompanyInfo" runat="server" Title="اطلاعات شرکت" Layout="TableLayout"
                                Icon="HouseGo" Frame="true"  >
                                <Items>
                                    <ext:FormPanel runat="server" ID="tabCompanyInfo1" Border="false" StyleSpec="width:100%;padding-top:15px" BodyStyle="background:#f1f1f1">
                                        <LayoutConfig>
                                            <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                                        </LayoutConfig>
                                        <FieldDefaults LabelAlign="Top" MsgTarget="Side" LabelStyle="color:#205a8c" />
                                        <Items>
                                            <ext:ComboBox Editable="false" TabIndex="1" ID="cmbPersonTypeCompanyManagement" runat="server" FieldLabel="نوع مودی" ClientIDMode="Static" AnchorHorizontal="-5">
                                                <Items>
                                                    <ext:ListItem Text="حقیقی" Value="1" />
                                                    <ext:ListItem Text="حقوقی" Value="2" />
                                                </Items>
                                                <Listeners>
                                                    <Select Handler="selectPersonTypeCompanyManagement()" />
                                                </Listeners>
                                            </ext:ComboBox>
                                            <ext:ComboBox ID="cmbPersonLegalTypeCompanyManagement" TabIndex="2" Editable="false" runat="server" FieldLabel="نوع شخص حقوقی" ClientIDMode="Static" AnchorHorizontal="100%">
                                                <Items>
                                                    <ext:ListItem Text="وزارت خانه" Value="1" />
                                                    <ext:ListItem Text="موسسه دولتي" Value="2" />
                                                    <ext:ListItem Text="شرکت دولتي" Value="3" />
                                                    <ext:ListItem Text="سایر دستگاههاي دولتي" Value="4" />
                                                    <ext:ListItem Text="نهادهاي عمومي غیردولتي" Value="5" />
                                                    <ext:ListItem Text="بخش خصوصي" Value="6" />
                                                    <ext:ListItem Text="سایر پرداخت کنندگان حقوق" Value="7" />
                                                </Items>
                                            </ext:ComboBox>
                                            <ext:TextField ID="txtNameCompanyManagement" AllowBlank="false" BlankText=".این فیلد باید پر باشد" TabIndex="3" ColSpan="2" runat="server" FieldLabel="نام شرکت" ClientIDMode="Static" AnchorHorizontal="-5" StyleSpec="width:99%;" FieldStyle="text-align:center;font-weight:bold !important" />
                                            <%--<ext:TextField ID="txtFamilyNameCompanyManagement" TabIndex="4" runat="server" FieldLabel="نام خانوادگی" ClientIDMode="Static" AnchorHorizontal="100%" />--%>
                                            <ext:TextField ID="txtPostCodeCompanyManagement" TabIndex="5" runat="server" FieldLabel="کد پستی" MaxLength="10" EnforceMaxLength="true" MaskRe="/[0-9-]/" MinLength="10" MinLengthText="این فیلد باید 10 رقم باشد" />
                                            <ext:TextField ID="txtPhoneCompanyManagement" TabIndex="6" runat="server" FieldLabel="تلفن" MaskRe="/[0-9-]/" EnforceMaxLength="true" MaxLength="11" MinLength="11" MinLengthText="تلفن باید 11 رقم باشد" />
                                            <ext:TextField ID="txtEconomicCodeCompanyManagement" TabIndex="7" runat="server" FieldLabel="کد اقتصادی (TIN)" MaskRe="/[0-9-]/" MaxLength="12" EnforceMaxLength="true" MinLength="12" MinLengthText="این فیلد باید 12 رقم باشد" />
                                            <ext:TextField ID="txtTFNCompanyManagement" TabIndex="8" runat="server" FieldLabel="شماره پرونده مالیاتی (TFN)" MaskRe="/[0-9-]/" MaxLength="12" EnforceMaxLength="true" MinLength="12" MinLengthText="این فیلد باید 12 رقم باشد" />
                                            <ext:TextField ID="txtWorkshopCodeCompanyManagement" TabIndex="9" runat="server" FieldLabel="کد کارگاه" MaskRe="/[0-9-]/" MaxLength="10" EnforceMaxLength="true" MinLength="10" MinLengthText="این فیلد باید 10 رقم باشد" />
                                            <ext:TextField ID="txtEmailAddressCompanyManagement" TabIndex="10" runat="server" FieldLabel="آدرس الكترونيكى" Vtype="email" VtypeText="فرمت ایمیل اشتباه است." AnchorHorizontal="-5" />
                                            <ext:TextArea ID="txtAddressCompanyManagement" TabIndex="11" runat="server" FieldLabel="آدرس" ColSpan="2" StyleSpec="width:99%"></ext:TextArea>
                                        </Items>

                                    </ext:FormPanel>
                                </Items>

                                <Buttons>
                                    <ext:Button ID="btnCompanyEdit1" runat="server" Text="ویرایش" Icon="ApplicationEdit" TabIndex="12"
                                        Handler="editCompanyInfo">
                                    </ext:Button>
                                </Buttons>
                            </ext:Panel>

                            <ext:Panel ID="tabCompanyManagerInfo" Icon="UserKey" Frame="true" runat="server" Title="اطلاعات کارفرما" BodyPadding="6" AutoScroll="true" Layout="TableLayout">

                                <Items>
                                    <ext:FormPanel runat="server" ID="tabCompanyManagerInfo1" Border="false" StyleSpec="width:100%;padding-top:15px" BodyStyle="background:#f1f1f1">
                                        <LayoutConfig>
                                            <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                                        </LayoutConfig>
                                        <FieldDefaults LabelAlign="Top" MsgTarget="Side" LabelStyle="color:#205a8c" MinLengthText="این فیلد باید 12 رقم باشد" />
                                        <Items>
                                            <ext:TextField ID="txtEmployerNameCompanyManagement" TabIndex="1" runat="server" FieldLabel="نام" ClientIDMode="Static" AnchorHorizontal="-5" />
                                            <ext:TextField ID="txtEmployerFamilyCompanyManagement" TabIndex="2" runat="server" FieldLabel="نام خانوادگی" ClientIDMode="Static" AnchorHorizontal="100%" />
                                            <ext:TextField ID="txtEmployerNationalCodeCompanyManagement" AllowBlank="false" BlankText=".این فیلد باید پر باشد" TabIndex="3" runat="server" FieldLabel="کد ملی" MaxLength="10" Vtype="isValidNationalCode" VtypeText=".کد ملی نامعتبر است" EnforceMaxLength="true" MaskRe="/[0-9-]/" MinLength="10" MinLengthText="این فیلد باید 10 رقم باشد" />
                                            <ext:TextField ID="txtEmployerPostCompanyManagement" TabIndex="4" runat="server" FieldLabel="سمت" />
                                            <ext:TextField ID="txtEmployerEmailCompanyManagement" TabIndex="5" runat="server" FieldLabel="آدرس الكترونيكى" Vtype="email" VtypeText="فرمت ایمیل اشتباه است" AnchorHorizontal="-5" />
                                            <ext:TextField ID="txtEmployerMobileCompanyManagement" TabIndex="6" runat="server" FieldLabel="شماره تلفن همراه" MaskRe="/[0-9-]/" EnforceMaxLength="true" MaxLength="11" MinLength="11" MinLengthText="این فیلد باید 11 رقم باشد" Vtype="isValidMobileNo" VtypeText="شماره تلفن همراه باید با ۰۹ شروع شود" />
                                        </Items>
                                    </ext:FormPanel>
                                </Items>


                                <Buttons>
                                    <ext:Button ID="btnCompanyEdit2" runat="server" Text="ویرایش" Icon="ApplicationEdit" TabIndex="12"
                                        Handler="editCompanyInfo">
                                    </ext:Button>
                                </Buttons>
                            </ext:Panel>

                            <ext:Panel ID="tabPasswordChange" Icon="LockKey" Width="350" Frame="true" runat="server" Title="تغییر کلمه عبور" BodyPadding="6" AutoScroll="true" Layout="TableLayout">
                                <Items>
                                    <ext:FormPanel runat="server" Border="false" ID="tabPasswordChange1" StyleSpec="width:100%;padding-top:15px" BodyStyle="background:#f1f1f1">
                                        <LayoutConfig>
                                            <ext:TableLayoutConfig Columns="1" ItemCls="width-half" />
                                        </LayoutConfig>
                                        <FieldDefaults LabelAlign="Top" MsgTarget="Side" LabelStyle="color:#205a8c" MinLength="4" MinLengthText="طول کلمه عبور باید حداقل 4 کاراکتر باشد" AllowBlank="false" BlankText=".این فیلد باید پر باشد" />
                                        <Items>
                                            <ext:TextField ID="txtOldPasswordCompanyManagement" TabIndex="1" runat="server" FieldLabel="کلمه عبور قدیم" ClientIDMode="Static" AnchorHorizontal="-5" InputType="Password" />
                                            <ext:TextField ID="txtPassword" TabIndex="2" runat="server" FieldLabel="کلمه عبور جدید" ClientIDMode="Static" AnchorHorizontal="100%" InputType="Password" Vtype="isValidNewPassword" VtypeText="کلمه عبور جدید نمیتواند با کلمه عبور قدیم یکی باشد">
                                            </ext:TextField>
                                            <ext:TextField ID="txtConfirmPasswordCompanyManagement" TabIndex="3" runat="server" FieldLabel="تکرار کلمه عبور جدید" InputType="Password" Vtype="isValidConfirmPassword" VtypeText="تکرار کلمه عبور جدید صحیح نیست">
                                            </ext:TextField>

                                        </Items>
                                    </ext:FormPanel>
                                </Items>


                                <Buttons>
                                    <ext:Button ID="btnCompanyEdit3" runat="server" Text="ویرایش" Icon="ApplicationEdit" TabIndex="12"
                                        Handler="editCompanyInfo">
                                    </ext:Button>
                                </Buttons>
                            </ext:Panel>

                        </Items>

                    </ext:TabPanel>

                </Items>


               <%-- <KeyMap runat="server">
                    <Binding>
                        <ext:KeyBinding Handler="editCompanyInfo">
                            <Keys>
                                <ext:Key Code="ENTER" />
                            </Keys>
                        </ext:KeyBinding>
                    </Binding>
                </KeyMap>--%>
                <KeyMap runat="server">
                    <ext:KeyBindItem Handler="editCompanyInfo" Key="ENTER" />

                </KeyMap>
                <Listeners>
                    <AfterRender Handler="showCompanyInfo();" />
                </Listeners>
            </ext:Window>

        </Window>
    </Module>
</ext:DesktopModuleProxy>

