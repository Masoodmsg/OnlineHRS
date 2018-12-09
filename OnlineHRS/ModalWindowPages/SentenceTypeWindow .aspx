<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SentenceTypeWindow.aspx.cs" Inherits="OnlineHRS.SentenceTypeWindow" %>

<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Assets/utility.js"></script>
    <script src="Assets/salary.js"></script>
    <script src="Assets/EntityClasses.js"></script>
    <script src="Assets/FarsiType.js"></script>
    <script src="Assets/ModalWindows.js"></script>
    <script>
        companyID = 8

        function comboBoxConstantBinder(comboBox) {


           
        }
        function comboBoxJobStatusBinder(comboBox) {



        }
    </script>
    <link href="../Resources/IconShortcuts/desktop.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <ext:ResourceManager ID="ResourceManager1" runat="server" RTL="true" Theme="Gray" AjaxTimeout="3600000" ShowWarningOnAjaxFailure="false" DisableViewState="true">
        </ext:ResourceManager>
        <ext:Window ID="SentencetTypeWindow" runat="server" Resizable="false" Height="400" Width="350"
            Maximizable="false" Icon="Script" Title="ویرایش حکم" 
            Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static">
            <%--  <Listeners>
                    <Show Handler="languageChenger(); if(IsLogined.value == 'true'){ setUserInfo(); #{btnRegister}.setDisabled(false);if(App.LangButton.text=='FA'){ App.Desktop1.desktop.shortcuts.getById('registerationModule').set('name', 'ویرایش پروفایل'); #{btnRegister}.setText('ویرایش'); #{RegisterationWindow}.setTitle('ویرایش پروفایل');}else{App.Desktop1.desktop.shortcuts.getById('registerationModule').set('name', 'Edit Profile');#{btnRegister}.setText('Edit'); #{RegisterationWindow}.setTitle('Profile Edit');}}else{setUserInfo();}" />
                </Listeners>--%>
            <Items>
                <ext:FormPanel ID="formPanelSentencetType" runat="server" Width="590" Frame="true" Header="false"
                    AutoHeight="true" Layout="TableLayout">
                    <LayoutConfig>
                        <ext:TableLayoutConfig Columns="1" ItemCls="width-full" />
                    </LayoutConfig>
                    <FieldDefaults LabelAlign="Top" MsgTarget="Side" />
                
                    <Items>
                        <ext:TextField runat="server" ID="txtSentenceType_Title" FieldLabel="عنوان حکم"  AllowBlank="false" BlankText=".این فیلد باید پر باشد"/>
                        <ext:ComboBox Editable="false" TabIndex="4" ID="cmbSentenceType_IssueType" runat="server" FieldLabel="نوع صدور" AllowBlank="false" BlankText=".این فیلد باید پر باشد">

                            <Items>
                                <ext:ListItem Text="در ابتدای استخدام" Value="1" />
                                <ext:ListItem Text="در حین استخدام" Value="2" />
                                <ext:ListItem Text="در پایان استخدام" Value="3" />
                            </Items>
                           
                        </ext:ComboBox>
                      
                         
                         <ext:ComboBox Editable="false" TabIndex="4" ID="txtSentenceType_JobStatus" runat="server" FieldLabel="وضعیت شغلی پس از صدور این حکم">
                            <Listeners>
                                <AfterRender Handler="comboBoxJobStatusBinder(this)" />
                            </Listeners>
                        </ext:ComboBox>
                        <ext:TagField MultiSelect="true" Editable="false" Floating="false" TabIndex="10" ID="tagSentencetType_EmploymentType" 
                             runat="server" FieldLabel="نوع استخدام"  AllowBlank="false" BlankText=".این فیلد باید پر باشد">
                            <Listeners>
                                <AfterRender Handler="comboBoxConstantBinder(this, 'BaseInfo', 'EmploymentType', 1, 'ID')" />
                            </Listeners>
                        </ext:TagField>
                        <ext:TextArea runat="server" ID="txtSentenceType_Dsc" FieldLabel="شرح" AllowBlank="true" Height="80" MinHeight="70"   />
                    </Items>
                  

                </ext:FormPanel>

            </Items>
            <Buttons>
                <ext:Button ID="btnSSI" runat="server" Text="ذخیره" Icon="Disk" 
                    Handler="SaveSentencetItem(this.priv())">
                </ext:Button>
            </Buttons>
            <%--<KeyMap runat="server">
                <Binding>
                  
                    <ext:KeyBinding Handler="SaveSentencetItem(this)">
                        <Keys>
                            <ext:Key Code="ENTER" />
                        </Keys>
                    </ext:KeyBinding>
                </Binding>
            </KeyMap>--%>
            <KeyMap runat="server">
                <ext:KeyBindItem Handler="SaveSentencetItem(this)" Key="ENTER" />

            </KeyMap>
        </ext:Window>
    </form>
</body>
</html>
