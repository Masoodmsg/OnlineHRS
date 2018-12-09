<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SentencetItemWindow.aspx.cs" Inherits="OnlineHRS.ModalWindowPages.SentencetItemWindow" %>

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

        function comboBoxPostTitleBinderA(comboBox) {


            comboBox.setDisplayField("Title")
            comboBox.valueField = "ID"
            comboBox.queryMode = "local"
            comboBox.displayTpl.html = comboBox.displayTpl.html.replace("text", "Title").replace("field2", "Title")
            comboBox.store = Ext.create('Ext.data.Store',
                 {

                     model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                         extend: "Ext.data.Model",
                         fields: [{
                             name: "Title"
                         }
                             , {
                                 name: "ID", type: "int"
                             }
                         ]
                     }
                     ), autoLoad: false, proxy: {
                         type: 'memory'
                     }
                 });
            comboBox.onBindStore(comboBox.store);
            App.direct.GetPostTitles(companyID,
                   {
                       success: function (result) {
                           if (result.Success) {
                               comboBox.store.clearData();
                               comboBox.store.loadData(Ext.JSON.decode(result.Result));
                               //comboBox.store.insert(0, { id:0, text:'--انتخاب کنید--'})
                           }

                       },
                       //failure: function () { mask.unmask(); }
                   });
        }
    </script>
    <link href="Resources/IconShortcuts/desktop.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <ext:ResourceManager ID="ResourceManager1" runat="server" RTL="true" Theme="Gray" AjaxTimeout="3600000" ShowWarningOnAjaxFailure="false" DisableViewState="true">
        </ext:ResourceManager>
        <ext:Window ID="SentencetItemWindow" runat="server" Resizable="false" Height="400" Width="350"
            Maximizable="false" Icon="Coins" Title="ویرایش عامل" 
            Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static">
            <%--  <Listeners>
                    <Show Handler="languageChenger(); if(IsLogined.value == 'true'){ setUserInfo(); #{btnRegister}.setDisabled(false);if(App.LangButton.text=='FA'){ App.Desktop1.desktop.shortcuts.getById('registerationModule').set('name', 'ویرایش پروفایل'); #{btnRegister}.setText('ویرایش'); #{RegisterationWindow}.setTitle('ویرایش پروفایل');}else{App.Desktop1.desktop.shortcuts.getById('registerationModule').set('name', 'Edit Profile');#{btnRegister}.setText('Edit'); #{RegisterationWindow}.setTitle('Profile Edit');}}else{setUserInfo();}" />
                </Listeners>--%>
            <Items>
                <ext:FormPanel ID="formPanelSentencetItem" runat="server" Width="590" Frame="true" Header="false"
                    AutoHeight="true" Layout="TableLayout">
                    <LayoutConfig>
                        <ext:TableLayoutConfig Columns="1" ItemCls="width-full" />
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
                        <ext:TextField runat="server" ID="txtSentencetItem_Title" FieldLabel="عنوان عامل"  AllowBlank="false" BlankText=".این فیلد باید پر باشد"/>
                        <ext:TextField runat="server" ID="txtSentencetItem_EnglishTitle" FieldLabel="عنوان لاتین" AllowBlank="true" />
                        <ext:TextField runat="server" ID="txtSentencetItem_Code" FieldLabel="کد عامل" MaskRe="/[0-9-]/" AllowBlank="true"/>
                       
                        <ext:ComboBox Editable="false" TabIndex="4" ID="cmbSentencetItem_CalcType" runat="server" FieldLabel="نوع محاسبه" AllowBlank="false" BlankText=".این فیلد باید پر باشد">

                            <Items>
                               
                                <ext:ListItem Text="روزانه" Value="1" />
                                <ext:ListItem Text="ماهانه" Value="2" />
                            </Items>
                           
                        </ext:ComboBox>
                        <ext:Checkbox runat="server" FieldLabel="محاسبه در جمع حکم" ID="chkSentencetItem_IsAddSum" Checked="true"  LabelAlign="Right" LabelSeparator="" LabelWidth="108" />
                         <ext:TagField MultiSelect="true" Editable="false" Floating="false" TabIndex="10" ID="tagSentencetItem_EmploymentType" 
                             runat="server" FieldLabel="نوع استخدام"  AllowBlank="false" BlankText=".این فیلد باید پر باشد">
                           <%-- <Listeners>
                                <AfterRender Handler="comboBoxConstantBinder(this, 'BaseInfo', 'EmploymentType', 1, 'ID')" />
                            </Listeners>--%>
                        </ext:TagField>
                    </Items>
                  

                </ext:FormPanel>

            </Items>
            <Buttons>
                <ext:Button ID="btnSSI" runat="server" Text="ذخیره" Icon="Disk" 
                    Handler="SaveSentencetItem(this.priv())">
                </ext:Button>
            </Buttons>
            <KeyMap runat="server">
                <Binding>
                    <%-- " ">--%>
                    <ext:KeyBinding Handler="SaveSentencetItem(this)">
                        <Keys>
                            <ext:Key Code="ENTER" />
                        </Keys>
                    </ext:KeyBinding>
                </Binding>
            </KeyMap>

        </ext:Window>
    </form>
</body>
</html>
