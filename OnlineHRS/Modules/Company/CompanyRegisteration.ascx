<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>


<ext:DesktopModuleProxy ID="DesktopModuleProxyRegisteration" runat="server">
    <Module ModuleID="registerationModule" >
        <Shortcut Name="ثبت نام شرکت" IconCls="x-companies-icon" SortIndex="1" />
        <%--<Launcher Text="ثبت نام در سایت" Icon="Table" />--%>
        <Window>
            <ext:Window ID="RegisterationWindow" runat="server" Resizable="false" Height="400" Width="700"
                Maximizable="false" Icon="LockOpen" Title="ثبت نام شرکت" BodyPadding="5"
                Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static">
              
                <Items>
                    <ext:FormPanel ID="basicFormRegister" runat="server" Width="590" Frame="true" Header="false"
                        AutoHeight="true" Layout="TableLayout">
                        <LayoutConfig>
                            <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                        </LayoutConfig>
                        <FieldDefaults LabelAlign="Top" MsgTarget="Side" />
                        <Defaults>

                            <ext:Parameter Name="Border" Value="false" />
                            <ext:Parameter Name="Flex" Value="1" />
                       

                            <ext:Parameter Name="anchor" Value="95%" Mode="Value" />
                            <ext:Parameter Name="allowBlank" Value="false" Mode="Raw" />

                            <ext:Parameter Name="blankText" Value=".این فیلد باید پر باشد" Mode="Value" />
                        </Defaults>
                        <Items>

                            <ext:ComboBox Editable="false" TabIndex="0" ID="cmbPersonType" runat="server" FieldLabel="نوع مودی" ClientIDMode="Static" AnchorHorizontal="-5">
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
                            <ext:TextField ID="txtCompanyName" TabIndex="2" ColSpan="1" runat="server" FieldLabel="نام شرکت" ClientIDMode="Static" AnchorHorizontal="-5">
                            </ext:TextField>
                            <ext:TextField ID="txtEmailAddress" Cls="eng" TabIndex="3" runat="server" FieldLabel="آدرس الكترونيكى" Vtype="email" AnchorHorizontal="-5" VtypeText="فرمت ایمیل اشتباه است" />
                            <ext:TextField ID="txtEmployerName" TabIndex="4" runat="server" FieldCls="farsi" FieldLabel="نام کارفرما" ClientIDMode="Static" AnchorHorizontal="-5" />
                            <ext:TextField ID="txtEmployerFamily" TabIndex="5" runat="server" FieldCls="farsi" FieldLabel="نام خانوادگی کارفرما" ClientIDMode="Static" AnchorHorizontal="100%" />
                            <ext:TextField ID="txtEmployerNationalCode" EnableKeyEvents="true" TabIndex="6" runat="server" FieldLabel="کد ملی کارفرما" MaxLength="10" Vtype="isValidNationalCode" VtypeText=".کد ملی نامعتبر است" EnforceMaxLength="true" MaskRe="/[0-9-]/" MinLength="10" MinLengthText="این فیلد باید 10 رقم باشد">
                                <Listeners>
                                    <KeyUp Handler="this.next().setValue(this.value)"></KeyUp>
                                    <FocusLeave Handler="this.next().setValue(this.value)"></FocusLeave>
                                </Listeners>
                            </ext:TextField>

                            <ext:TextField ID="txtUsernameReg" ReadOnly="true" DisabledCls="field-disabled" Disabled="true" TabIndex="7" runat="server" FieldLabel="نام کاربری" ClientIDMode="Static" AnchorHorizontal="-5"  MaxLength="10" Vtype="isValidNationalCode" VtypeText=".کد ملی نامعتبر است" EnforceMaxLength="true" MaskRe="/[0-9-]/" MinLength="10" MinLengthText="این فیلد باید 10 رقم باشد">
                                <ToolTips>
                                    <ext:ToolTip
                                        runat="server"
                                        Target="txtUsernameReg"
                                        Html="نام کاربری شما کد ملی شماست"
                                        Title="توجه"
                                      
                                        UI="Info" RTL="true" />

                                </ToolTips>
                            </ext:TextField>
                            <ext:TextField ID="txtPassword" TabIndex="8" Cls="eng" runat="server" InputType="Password" FieldLabel="کلمه عبور" AnchorHorizontal="100%" MinLength="4" MinLengthText="طول کلمه عبور باید حداقل 4 کاراکتر باشد">
                            </ext:TextField>

                            <ext:TextField ID="txtConfirmPasswordReg" TabIndex="9" Cls="eng" runat="server" FieldLabel="تکرار کلمه عبور" InputType="Password" AnchorHorizontal="100%" Vtype="isValidConfirmPassword" VtypeText="تکرار کلمه عبور صحیح نیست" />

                        </Items>
                        <Listeners>
                            <ValidityChange Handler="#{btnRegister}.setDisabled(!valid); " />
                            <AfterRender Handler="FarsiType.init(this)"></AfterRender>
                        </Listeners>

                    </ext:FormPanel>

                </Items>
                <Buttons>
                    <ext:Button ID="btnRegister" runat="server" Text="ثبت نام" Icon="Accept" Disabled="true"
                        Handler="register">
                    </ext:Button>
                </Buttons>
                <KeyMap runat="server">
                      <ext:KeyBindItem Handler="if (App.basicFormRegister.getForm().isValid()) { register();}" Key="ENTER" />
                          
                </KeyMap>
               <%-- <KeyMap runat="server">
                    <Binding>
                      
                        <ext:KeyBinding Handler="if (App.basicFormRegister.getForm().isValid()) { register();}">
                            <Keys>
                                <ext:Key Code="ENTER" />
                            </Keys>
                        </ext:KeyBinding>
                    </Binding>
                </KeyMap>--%>
            </ext:Window>
        </Window>
    </Module>
</ext:DesktopModuleProxy>

