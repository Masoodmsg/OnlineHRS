<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<ext:DesktopModuleProxy ID="DesktopModuleProxyRegisteration2" runat="server">
    <Module ModuleID="registerationModule2">
        <Shortcut Name="ثبت نام شرکت" IconCls="x-companies-icon" SortIndex="2" />
        <%--<Launcher Text="ثبت نام در سایت" Icon="Table" />--%>
        <Window>
            <ext:Window ID="RegisterationWindow2" runat="server" Resizable="false" Height="600" Width="500"
                Maximizable="false" Icon="LockOpen" Title="ثبت نام شرکت" BodyPadding="3"
                Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static">
                <%--  <Listeners>
                    <Show Handler="languageChenger(); if(IsLogined.value == 'true'){ setUserInfo(); #{btnRegister}.setDisabled(false);if(App.LangButton.text=='FA'){ App.Desktop1.desktop.shortcuts.getById('registerationModule').set('name', 'ویرایش پروفایل'); #{btnRegister}.setText('ویرایش'); #{RegisterationWindow}.setTitle('ویرایش پروفایل');}else{App.Desktop1.desktop.shortcuts.getById('registerationModule').set('name', 'Edit Profile');#{btnRegister}.setText('Edit'); #{RegisterationWindow}.setTitle('Profile Edit');}}else{setUserInfo();}" />
                </Listeners>--%>
                <Items>
                    <ext:FormPanel ID="basicFormRegister2" runat="server" Width="590" Frame="true" Header="false"
                        Layout="TableLayout" AutoScroll="true" IDMode="Static">
                        <LayoutConfig>
                            <ext:TableLayoutConfig Columns="1" ItemCls="width-full" />
                        </LayoutConfig>
                        <FieldDefaults LabelAlign="Top" MsgTarget="Side" />
                        <Defaults>

                            <ext:Parameter Name="Border" Value="false" />
                            <ext:Parameter Name="Flex" Value="1" />
                            <%--  <ext:Parameter Name="Layout" Value="anchor" />--%>

                            <ext:Parameter Name="anchor" Value="95%" Mode="Value" />
                            <ext:Parameter Name="allowBlank" Value="false" Mode="Raw" />

                            <ext:Parameter Name="blankText" Value=".این فیلد باید پر باشد" Mode="Value" />
                        </Defaults>
                        <Items>

                            <ext:ComboBox Editable="false" TabIndex="0" ID="cmbPersonType2" runat="server" FieldLabel="نوع مودی" ClientIDMode="Static" AnchorHorizontal="-5">
                                <Items>
                                    <ext:ListItem Text="حقیقی" Value="1" />
                                    <ext:ListItem Text="حقوقی" Value="2" />
                                </Items>
                                <Listeners>
                                    <Select Handler="selectPersonType()" />
                                </Listeners>
                            </ext:ComboBox>
                            <ext:ComboBox ID="cmbPersonLegalType2" TabIndex="1" Editable="false" runat="server" FieldLabel="نوع شخص حقوقی" ClientIDMode="Static" AnchorHorizontal="100%">
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
                            <ext:TextField ID="txtName2" TabIndex="2" ColSpan="2" runat="server" FieldLabel="نام شرکت" ClientIDMode="Static" AnchorHorizontal="-5" />
                            <%--<ext:TextField ID="txtFamilyName" TabIndex="3" runat="server" FieldLabel="نام خانوادگی" ClientIDMode="Static" AnchorHorizontal="100%" />--%>
                            <ext:TextField ID="txtEmployerName2" TabIndex="2" runat="server" FieldLabel="نام کارفرما" ClientIDMode="Static" AnchorHorizontal="-5" />
                            <ext:TextField ID="txtEmployerFamily2" TabIndex="3" runat="server" FieldLabel="نام خانوادگی کارفرما" ClientIDMode="Static" AnchorHorizontal="100%" />
                            <ext:TextField ID="txtEmployerNationalCode2" TabIndex="3" runat="server" FieldLabel="کد ملی کارفرما" MaxLength="10" Vtype="isValidNationalCode" VtypeText=".کد ملی نامعتبر است" EnforceMaxLength="true" MaskRe="/[0-9-]/" MinLength="10" MinLengthText="این فیلد باید 10 رقم باشد" />
                            <ext:TextField ID="txtEmailAddress2" TabIndex="7" runat="server" FieldLabel="ادرس ایمیل" Vtype="email" AnchorHorizontal="-5" VtypeText="فرمت ایمیل اشتباه است" />
                            <ext:TextField ID="txtUsernameReg2" TabIndex="4" runat="server" FieldLabel="نام کاربری" ClientIDMode="Static" AnchorHorizontal="-5" />
                            <ext:TextField ID="txtPassword2" TabIndex="5" runat="server" InputType="Password" FieldLabel="کلمه عبور" AnchorHorizontal="100%" MinLength="4" MinLengthText="طول کلمه عبور باید حداقل 4 کاراکتر باشد">
                            </ext:TextField>

                            <ext:TextField ID="txtConfirmPasswordReg2" TabIndex="6" runat="server" FieldLabel="تکرار کلمه عبور" InputType="Password" AnchorHorizontal="100%" Vtype="isValidConfirmPassword" VtypeText="تکرار کلمه عبور صحیح نیست" />

                        </Items>
                        <Listeners>
                            <ValidityChange Handler="#{btnRegister}.setDisabled(!valid); " />
                        </Listeners>
                    </ext:FormPanel>

                </Items>
                <Buttons>
                    <ext:Button ID="btnRegister2" runat="server" Text="ثبت نام" Icon="Accept">
                    </ext:Button>
                </Buttons>
                <%--<KeyMap runat="server">
                    <Binding>

                        <ext:KeyBinding Handler="if (App.basicFormRegister.getForm().isValid()) { register();}">
                            <Keys>
                                <ext:Key Code="ENTER" />
                            </Keys>
                        </ext:KeyBinding>
                    </Binding>
                </KeyMap>--%>
                <KeyMap runat="server">
                    <ext:KeyBindItem Handler="if (App.basicFormRegister.getForm().isValid()) { register();}" Key="ENTER" />

                </KeyMap>
            </ext:Window>
        </Window>
    </Module>
</ext:DesktopModuleProxy>
