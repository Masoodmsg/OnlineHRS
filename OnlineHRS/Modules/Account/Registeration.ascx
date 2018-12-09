<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>


<ext:DesktopModuleProxy ID="DesktopModuleProxyRegisteration" runat="server">
    <Module ModuleID="registerationModule">
        <Shortcut Name="ثبت نام شرکت" IconCls="x-companies-icon" SortIndex="1"
            X="20" Y="150" />
        <%--<Launcher Text="ثبت نام در سایت" Icon="Table" />--%>
        <Window>
            <ext:Window ID="RegisterationWindow" runat="server" Resizable="false" Height="320"
                Maximizable="false" Icon="LockOpen" Title="ثبت نام شرکت" Width="600" BodyPadding="5"
                Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static">
                <%--  <Listeners>
                    <Show Handler="languageChenger(); if(IsLogined.value == 'true'){ setUserInfo(); #{btnRegister}.setDisabled(false);if(App.LangButton.text=='FA'){ App.Desktop1.desktop.shortcuts.getById('registerationModule').set('name', 'ویرایش پروفایل'); #{btnRegister}.setText('ویرایش'); #{RegisterationWindow}.setTitle('ویرایش پروفایل');}else{App.Desktop1.desktop.shortcuts.getById('registerationModule').set('name', 'Edit Profile');#{btnRegister}.setText('Edit'); #{RegisterationWindow}.setTitle('Profile Edit');}}else{setUserInfo();}" />
                </Listeners>--%>
                <Items>
                    <ext:FormPanel ID="basicFormRegister" runat="server" Width="590" Frame="true" Header="false"
                        AutoHeight="true" Layout="TableLayout">
                        <LayoutConfig>
                            <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                        </LayoutConfig>
                        <FieldDefaults LabelAlign="Top"  MsgTarget="Side"/>
                        <Defaults>

                            <ext:Parameter Name="Border" Value="false" />
                            <ext:Parameter Name="Flex" Value="1" />
                          <%--  <ext:Parameter Name="Layout" Value="anchor" />--%>

                            <ext:Parameter Name="anchor" Value="95%" Mode="Value" />
                              <ext:Parameter Name="allowBlank" Value="false" Mode="Raw" />
                          
                            <ext:Parameter Name="blankText" Value=".این فیلد باید پر باشد" Mode="Value" />
                        </Defaults>
                        <Items>

                            <ext:ComboBox Editable="false" TabIndex="0" ID="cmbPersonType" runat="server" FieldLabel="نوع مودی" ClientIDMode="Static" AnchorHorizontal="-5" >
                                <Items>
                                    <ext:ListItem Text="حقیقی" Value="1" />
                                    <ext:ListItem Text="حقوقی" Value="2" />
                                </Items>
                                <Listeners>
                                    <Select Handler="selectPersonType()" />
                                </Listeners>
                            </ext:ComboBox>
                            <ext:ComboBox ID="cmbPersonLegalType" TabIndex="1" Editable="false" runat="server" FieldLabel="نوع شخص حقوقی" ClientIDMode="Static" AnchorHorizontal="100%">
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
                            <ext:TextField ID="txtName" TabIndex="2" runat="server" FieldLabel="نام" ClientIDMode="Static" AnchorHorizontal="-5" />
                             <ext:TextField ID="txtFamilyName" TabIndex="3" runat="server" FieldLabel="نام خانوادگی" ClientIDMode="Static" AnchorHorizontal="100%" />
                             
                            <ext:TextField ID="txtUsernameReg" TabIndex="4" runat="server" FieldLabel="نام کاربری" ClientIDMode="Static" AnchorHorizontal="-5" />
                            <ext:TextField ID="txtPasswordReg" TabIndex="5" runat="server" InputType="Password" FieldLabel="کلمه عبور" AnchorHorizontal="100%" />
                            <ext:TextField ID="txtEmailAddress" TabIndex="7" runat="server" FieldLabel="ادرس ایمیل" Vtype="email" AnchorHorizontal="-5" />
                            <ext:TextField ID="txtConfirmPasswordReg" TabIndex="6" runat="server" FieldLabel="تکرار کلمه عبور" InputType="Password" AnchorHorizontal="100%" />


                            <%--<ext:TextArea runat="server" FieldLabel="آدرس"></ext:TextArea>--%>
                        </Items>
                        <Listeners>
                            <ValidityChange Handler="#{btnRegister}.setDisabled(!valid); /*if(#{txtConfirmPassword}.value != '' && #{txtPasswordReg}.value != #{txtConfirmPassword}.value){#{btnRegister}.setDisabled(true)}*/ " />
                        </Listeners>
                    </ext:FormPanel>

                </Items>
                <Buttons>
                    <ext:Button ID="btnRegister" runat="server" Text="ثبت نام" Icon="Accept" Disabled="true"
                        Handler="register">
                        <%-- <DirectEvents>
                            <Click OnEvent="UpdateTimeStamp">
                                <Confirmation ConfirmRequest="true" Title="Title" Message="Sample Confirmation Message..." />
                            </Click>
                        </DirectEvents>--%>
                    </ext:Button>
                </Buttons>
                <KeyMap runat="server">
                    <Binding>
                        <ext:KeyBinding Handler="if(!#{btnRegister}.disabled){ register();} ">
                            <Keys>
                                <ext:Key Code="ENTER" />
                            </Keys>
                        </ext:KeyBinding>
                    </Binding>
                </KeyMap>
            </ext:Window>
        </Window>
    </Module>
</ext:DesktopModuleProxy>

