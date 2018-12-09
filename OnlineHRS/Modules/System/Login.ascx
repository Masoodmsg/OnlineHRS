<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>


<ext:DesktopModuleProxy ID="loginCompanyModuleProxy" runat="server">
    <Module ModuleID="loginCompanyModule">
        <Shortcut Name="ورود به سیستم" IconCls="x-login-shortcut" SortIndex="0"  TextCls="shortcut-text"  />
        <Launcher Text="ورود به سیستم" Icon="Table" />
        <Window>
            <ext:Window ID="LoginCompanyWindow" runat="server" Resizable="false" Height="150" Maximizable="false"
                Minimizable="false" Icon="Lock" Title="ورود به سیستم" Draggable="false" Width="350"
                Modal="true" BodyPadding="5" Layout="Form" CloseAction="Destroy" RTL="true" >
                
                <Items>
                    <ext:TextField ID="txtUsernameSystem" runat="server" FieldLabel="نام کاربری" 
                        AllowBlank="false" BlankText="نام کاربری اجباری است"  LabelAlign="Top" MsgTarget="Side" EmptyText="کد ملی"   MaxLength="10" Vtype="isValidNationalCode" VtypeText=".کد ملی نامعتبر است" EnforceMaxLength="true" MaskRe="/[0-9-]/" MinLength="10" MinLengthText="این فیلد باید 10 رقم باشد">
                     <Listeners>
                            <ValidityChange Handler="isValidLogin(this,this.next(),#{btnLogin})">
                            </ValidityChange>
                        </Listeners>
                    </ext:TextField>
                    <ext:TextField ID="txtPasswordSystem" runat="server" InputType="Password" FieldLabel="کلمه عبور"  LabelAlign="Top" MsgTarget="Side"
                        AllowBlank="false" BlankText="کلمه عبور اجباری است" MinLength="4"  MinLengthText="طول کلمه عبور باید حداقل 4 کاراکتر باشد" >
                     <Listeners>
                            <ValidityChange Handler="isValidLogin(this.prev(),this,#{btnLogin})">
                            </ValidityChange>
                        </Listeners>
                    </ext:TextField>
                    
                </Items>
               
                <Buttons>
                    <ext:Button ID="btnLogin" runat="server" Text="ورود" Icon="LockOpen" Handler="login(this.up('window').down('#txtUsernameSystem').value,this.up('window').down('#txtPasswordSystem').value);" Disabled="true">
                       
                    </ext:Button>
                </Buttons>
                <KeyMap runat="server">
                    <ext:KeyBindItem Handler="login(this.down('#txtUsernameSystem').value,this.down('#txtPasswordSystem').value);" Key="ENTER" />
                   
                </KeyMap>
                <%--<KeyMap runat="server">
                    <Binding>
                        <ext:KeyBinding Handler="login();">
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
