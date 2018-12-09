<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SalaryInputFormItem.aspx.cs" Inherits="OnlineHRS.ModalWindowPages.SalaryInputFormItem" %>

<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../Assets/utility.js"></script>
    <script src="../Assets/salary.js"></script>
    <script src="../Assets/EntityClasses.js"></script>
    <script src="../Assets/FarsiType.js"></script>
    <script src="../Assets/ModalWindows.js"></script>
    <script>
        companyID = 8

        function userSearch(comboBox) {


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
        function digitGrouping(n) {
            alert(n)
        }
    </script>
    <link href="../Resources/IconShortcuts/desktop.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <ext:ResourceManager ID="ResourceManager1" runat="server" RTL="true" Theme="Gray" AjaxTimeout="3600000" ShowWarningOnAjaxFailure="false" DisableViewState="true">
        </ext:ResourceManager>
        <ext:Window ID="WinInputFormItem" runat="server" Resizable="false" Height="460" Width="350"
            Maximizable="false" Icon="MoneyDollar" Title="پرداخت کسور"
            Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static">
            <LayoutConfig>
                <ext:FitLayoutConfig ItemCls="width-full" />
            </LayoutConfig>
            <Items>
                <ext:FormPanel ID="formInputFormItem" runat="server" Frame="true" Header="false"
                    AutoHeight="true" Layout="TableLayout">
                    <LayoutConfig>
                        <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                    </LayoutConfig>
                    <FieldDefaults LabelAlign="Top" MsgTarget="Side" BlankText="این فیلد باید پر باشد" AllowBlank="false" />

                    <Items>
                        <ext:TagField runat="server" HideSelected="true" ColSpan="2" TriggerAction="All" TypeAhead="false" EmptyText="جستجو"
                            QueryDelay="1000" ID="tagPIFI_Personnel" FieldLabel="انتخاب پرسنل">
                            <Listeners>
                                <BeforeQuery Fn="userSearch"></BeforeQuery>
                                <Focus Handler="setCurrentSelectUser(this)"></Focus>
                            </Listeners>
                        </ext:TagField>
                        <ext:TagField MultiSelect="false" TabIndex="1" ID="tagIFI_Item" runat="server" FieldLabel="انتخاب عامل" ColSpan="2">

                            <%--<Listeners>
                                <AfterRender Handler="getInputFormItems(this)" />
                            </Listeners>--%>
                        </ext:TagField>
                        <ext:TextField runat="server" ID="txtSalaryItem_EnglishTitle" FieldLabel="مبلغ" EnableKeyEvents="true" ColSpan="2">
                            <Listeners>
                                <KeyUp Handler="digitGrouping(this.value)" />
                            </Listeners>
                        </ext:TextField>

                        <ext:ComboBox runat="server"  FieldLabel="سال صدور" Editable="false" >
                           
                        </ext:ComboBox>


                        <ext:ComboBox runat="server" Editable="false" FieldLabel="ماه صدور" >
                        </ext:ComboBox>

                        <ext:ComboBox runat="server"  FieldLabel="سال اجرا">
                           
                        </ext:ComboBox>


                        <ext:ComboBox runat="server" Editable="false" FieldLabel="ماه اجرا" >
                        </ext:ComboBox>
                        <ext:ComboBox runat="server"  FieldLabel="سال پایان" Editable="false" >
                           
                        </ext:ComboBox>


                        <ext:ComboBox runat="server" Editable="false" FieldLabel="ماه پایان" >
                        </ext:ComboBox>
                          <ext:TextArea Height="50" runat="server" FieldLabel="توضیحات"  ColSpan="2"/>
                    </Items>

                    <Listeners>
                        <AfterRender Handler="" />
                    </Listeners>
                </ext:FormPanel>
              
            </Items>
            <Buttons>
                <ext:Button runat="server" Text="انصراف" Icon="Cancel"
                    Handler="this.up('window').close()">
                </ext:Button>
                <ext:Button ID="btnSSI" runat="server" Text="ذخیره" Icon="Disk"
                    Handler="SaveSalaryItem(this.priv())">
                </ext:Button>

            </Buttons>
           <%-- <KeyMap runat="server">
                <Binding>

                    <ext:KeyBinding Handler="SaveSalaryItem(this)">
                        <Keys>
                            <ext:Key Code="ENTER" />
                        </Keys>
                    </ext:KeyBinding>
                </Binding>
            </KeyMap>--%>
            <KeyMap runat="server">
                <ext:KeyBindItem Handler="SaveSalaryItem(this)" Key="ENTER" />

            </KeyMap>
        </ext:Window>
    </form>
</body>
</html>
