<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<ext:DesktopModuleProxy ID="loginPersonnelModuleProxy" runat="server">
    <Module ModuleID="loginPersonnelModule">
        <Shortcut Name="ورود پرسنل" IconCls="x-registeration-shortcut" SortIndex="1" X="20" Y="250"  />
        <Launcher Text="ورود پرسنل" Icon="LockDelete" />
        <Window>
            <ext:Window ID="LoginPersonnelWindow" runat="server" Resizable="false" Height="150" Maximizable="false"
                Minimizable="false" Icon="Lock" Title="ورود پرسنل" Draggable="false" Width="350"
                Modal="true" BodyPadding="5" Layout="Form" CloseAction="Destroy" RTL="true">

                <Items>
                    <ext:TextField ID="txtUsernamePersonnel" runat="server" FieldLabel="نام کاربری" AllowBlank="false" BlankText="نام کاربری اجباری است" MaxLength="10"
                        EnforceMaxLength="true" MaskRe="/[0-9-]/" Vtype="isValidNationalCode" VtypeText=".کد ملی نامعتبر است"  MsgTarget="Side">

                        <Callouts>
                            <ext:Callout runat="server" Title="راهنما" Width="200" Trigger="Focus" UI="Info" StyleSpec="z-index:910000000;text-align: right" Alignment="Left" RTL="true" Html="نام کاربری شما کد ملی شما است.">
                                <%--<Listeners>
                                    <BeforeShow Handler="var errors = this.calloutOwner.getErrors(); if (errors.length == 0) {return false;} this.setHtml(errors.join('<br/>'));" /> 
                                 </Listeners>--%>
                            </ext:Callout>
                        </Callouts>
                        <Listeners>
                            <ValidityChange Handler="isValidLogin(this,this.next(),#{btnLoginPersonnel})">
                            </ValidityChange>
                        </Listeners>
                    </ext:TextField>
                    <ext:TextField ID="txtPasswordPersonnel" runat="server" InputType="Password" FieldLabel="کلمه عبور"
                        AllowBlank="false" BlankText="کلمه عبور اجباری است">
                        <Callouts>
                            <ext:Callout runat="server" Title="راهنما" Width="250" Trigger="Focus" UI="Info" StyleSpec="z-index:910000000;text-align: right" Alignment="Left" RTL="true" Html="کلمه عبور پیش فرض شما 1 تا 6 میباشد.<br/><br/>لطفا پس از ورود آن را تغییر دهید.">
                            </ext:Callout>
                        </Callouts>
                         <Listeners>
                            <ValidityChange Handler="isValidLogin(this.prev(),this,#{btnLoginPersonnel})">
                            </ValidityChange>
                        </Listeners>
                    </ext:TextField>
                </Items>
                <Buttons>
                    <ext:Button ID="btnLoginPersonnel" runat="server" Text="ورود" Icon="Accept" Handler="loginPersonnel();" Disabled="true">
                    </ext:Button>
                </Buttons>
                <KeyMap runat="server">
                    <Binding>
                        <ext:KeyBinding Handler="if(!#{btnLoginPersonnel}.disabled)loginPersonnel();">
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
