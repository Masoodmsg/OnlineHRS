<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>


<ext:DesktopModuleProxy ID="loginCompanyModuleProxy" runat="server">
    <Module ModuleID="loginCompanyModule">
        <Shortcut Name="ورود به شرکت" IconCls="x-company-icon" SortIndex="1" X="20" Y="20" TextCls="shortcut-text"  />
        <Launcher Text="ورود به شرکت" Icon="Table" />
        <Window>
            <ext:Window ID="LoginCompanyWindow" runat="server" Resizable="false" Height="150" Maximizable="false"
                Minimizable="false" Icon="LockDelete" Title="ورود به شرکت" Draggable="false" Width="350"
                Modal="true" BodyPadding="5" Layout="Form" CloseAction="Destroy" RTL="true">
                
                <Items>
                    <ext:TextField ID="txtUsernameCompany" runat="server" FieldLabel="نام کاربری" 
                        AllowBlank="false" BlankText="نام کاربری اجباری است" />
                    <ext:TextField ID="txtPasswordCompany" runat="server" InputType="Password" FieldLabel="کلمه عبور"
                        AllowBlank="false" BlankText="کلمه عبور اجباری است"  />
                    
                </Items>
                <Buttons>
                    <ext:Button ID="btnLoginCompany" runat="server" Text="ورود" Icon="Accept" Handler="loginCompany();">
                    </ext:Button>
                </Buttons>
                <KeyMap runat="server">
                    <Binding>
                        <ext:KeyBinding Handler="loginCompany();">
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
