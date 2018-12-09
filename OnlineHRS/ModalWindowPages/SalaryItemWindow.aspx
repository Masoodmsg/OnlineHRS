<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SalaryItemWindow.aspx.cs" Inherits="OnlineHRS.ModalWindowPages.SalaryItemWindow" %>

<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../Assets/utility.js"></script>
    <script src="../Assets/salary.js"></script>
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
    <link href="../Resources/IconShortcuts/desktop.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <ext:ResourceManager ID="ResourceManager1" runat="server" RTL="true" Theme="Gray" AjaxTimeout="3600000" ShowWarningOnAjaxFailure="false" DisableViewState="true">
        </ext:ResourceManager>
        <ext:Window ID="SalaryItemsWindow" runat="server" Resizable="false" Height="400" Width="400"
            Maximizable="false" Icon="Coins" Title="ویرایش عامل"
            Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static">
            <LayoutConfig>
                <ext:FitLayoutConfig ItemCls="width-full" />
            </LayoutConfig>
            <Items>
                <ext:FormPanel ID="formPanelSalaryItem" runat="server" Frame="true" Header="false"
                    AutoHeight="true" Layout="TableLayout">
                    <LayoutConfig>
                        <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                    </LayoutConfig>
                    <FieldDefaults LabelAlign="Top" MsgTarget="Side" />

                    <Items>
                        <ext:TextField runat="server" ID="txtSalaryItem_Title" FieldLabel="عنوان عامل" AllowBlank="false" BlankText=".این فیلد باید پر باشد" />
                        <ext:TextField runat="server" ID="txtSalaryItem_EnglishTitle" FieldLabel="عنوان لاتین" AllowBlank="true" />
                        <%--<ext:TextField runat="server" ID="txtSalaryItem_Code" FieldLabel="کد عامل" MaskRe="/[0-9-]/" AllowBlank="true"/>--%>

                        <ext:ComboBox Editable="false" TabIndex="4" ID="cmbSalaryItem_CategoryType" runat="server" FieldLabel="نوع عامل" AllowBlank="false" BlankText=".این فیلد باید پر باشد">

                            <Items>
                                <ext:ListItem Text="مزایا" Value="2" />
                                <ext:ListItem Text="کسور" Value="3" />
                                <ext:ListItem Text="کارکرد" Value="1" />
                                <ext:ListItem Text="سایر عوامل" Value="4" />
                                <ext:ListItem Text="تعهدات کارفرما" Value="5" />

                            </Items>
                            <Listeners>
                                <Change Handler="getItemTypes(this,this.next())" />
                            </Listeners>
                        </ext:ComboBox>
                        <ext:ComboBox Editable="false" TabIndex="4" ID="cmbSalaryItem_Type" runat="server" FieldLabel="نوع مزایا" AllowBlank="false" BlankText=".این فیلد باید پر باشد" />


                        <ext:Checkbox runat="server" ID="chkSalaryItem_IsAddSum" Checked="true" BoxLabel="معوقه پذیر" BoxLabelAlign="After" LabelSeparator="" LabelWidth="60" />
                        <ext:Checkbox runat="server" ID="Checkbox1" LabelSeparator="" LabelWidth="80" BoxLabel="نمایش در فیش" BoxLabelAlign="After" />
                        <ext:TagField MultiSelect="true" Editable="false" Floating="false" TabIndex="10" ID="tagSalaryItem_EmploymentType" ColSpan="2"
                            runat="server" FieldLabel="نوع استخدام" AllowBlank="false" BlankText=".این فیلد باید پر باشد">
                            <%-- <Listeners>
                                <AfterRender Handler="comboBoxConstantBinder(this, 'BaseInfo', 'EmploymentType', 1, 'ID')" />
                            </Listeners>--%>
                        </ext:TagField>
                        <ext:FieldSet
                            runat="server"
                            Flex="1"
                            Title="اطلاعات مالی"
                            Layout="TableLayout"
                            DefaultAnchor="100%" ColSpan="2" Collapsible="true">
                            <LayoutConfig>
                                <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                            </LayoutConfig>
                            <Items>
                                <ext:ComboBox Editable="false" TabIndex="4" ColSpan="2" ID="ComboBox1" runat="server" FieldLabel="نوع تفضیل" Cls="width-100">

                                    <Items>
                                        <ext:ListItem Text="شخص" Value="1" />
                                        <ext:ListItem Text="مرکز هزینه" Value="2" />
                                    </Items>
                                </ext:ComboBox>
                                <ext:Checkbox ID="CheckboxDog" runat="server" BoxLabel="بدهکار" BoxLabelAlign="After" Width="100" />
                                <ext:TextField runat="server" ID="TextField1" FieldLabel="کد معین بدهکار" AllowBlank="true" LabelAlign="Right" Width="200" InputType="Number" />
                                <ext:Checkbox ID="Checkbox2" runat="server" BoxLabel="بستانکار" BoxLabelAlign="After" />
                                <ext:TextField runat="server" ID="TextField2" FieldLabel="کد معین بستانکار" AllowBlank="true" LabelAlign="Right" Width="200" />
                            </Items>
                        </ext:FieldSet>
                    </Items>


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
            <%--<KeyMap runat="server">
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
