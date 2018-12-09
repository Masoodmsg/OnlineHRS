<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ItemFormulaInstanceWindow.aspx.cs" Inherits="OnlineHRS.ModalWindowPages.ItemFormulaInstanceWindow" %>

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
    <script src="../Assets/persian-date.js"></script>
    <script>
        companyID = 8
        window.formatPersian = false;
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
        <ext:ResourceManager ID="ResourceManager1" runat="server" RTL="true" Theme="Gray" AjaxTimeout="3600000" ShowWarningOnAjaxFailure="false" DisableViewState="true" ScriptMode="Debug">
        </ext:ResourceManager>
        <ext:Window ID="SalaryItemsWindow" runat="server" Height="550" Width="800"
            Maximizable="false" Icon="Calculator" Title="فرمول عامل"
            Layout="BorderLayout" CloseAction="Destroy" RTL="true" IDMode="Static" >
            <%-- <LayoutConfig>
                <ext:BorderLayoutConfig ItemCls="width-full" />
            </LayoutConfig>--%>
            <Items>
                <ext:GridPanel
                    ID="gridSalItemInstance"
                    runat="server"
                    Title="تاریخچه عامل"
                    ColumnLines="true"
                    Height="300" Icon="Date" Region="West" Collapsed="true" Collapsible="true" Split="true" Resizable="true" SplitterResize="true">
                    <Store>
                        <ext:Store runat="server">
                            <Model>
                                <ext:Model runat="server">
                                    <Fields>
                                        <ext:ModelField Name="ID" Type="Int" />
                                        <ext:ModelField Name="IssueYear" Type="Int" />
                                        <ext:ModelField Name="IssueMonth" />
                                        <ext:ModelField Name="ExecuteYear" Type="Int" />
                                        <ext:ModelField Name="ExecuteMonth" />
                                        <ext:ModelField Name="EmploymentTypeTitle" />
                                        <ext:ModelField Name="Dsc" />
                                    </Fields>
                                </ext:Model>
                            </Model>
                            <Proxy>
                                <ext:AjaxProxy>
                                    <Reader>
                                        <ext:JsonReader>
                                        </ext:JsonReader>
                                    </Reader>
                                </ext:AjaxProxy>
                            </Proxy>
                        </ext:Store>
                    </Store>
                    <ColumnModel runat="server">
                        <Columns>

                            <ext:RowNumbererColumn Width="30" runat="server" Text="ردیف" Align="Center" />
                            <ext:Column runat="server" Text="تاریخ صدور" Width="100">
                                <Columns>
                                    <ext:Column runat="server" Text="سال" DataIndex="IssueYear" Width="37" Sortable="false">
                                        <Editor>
                                            <ext:ComboBox runat="server" AllowBlank="false" BlankText="فیلد باید پر باشد">
                                                <Items>

                                                    <ext:ListItem Text="1396" Value="1396" />
                                                    <ext:ListItem Text="1397" Value="1397" />
                                                    <ext:ListItem Text="1398" Value="1398" />
                                                    <ext:ListItem Text="1399" Value="1399" />
                                                    <ext:ListItem Text="1400" Value="1400" />
                                                </Items>
                                            </ext:ComboBox>
                                        </Editor>
                                    </ext:Column>
                                    <ext:Column runat="server" Text="ماه" DataIndex="IssueMonth" Width="60" Sortable="false">
                                        <Editor>
                                            <ext:ComboBox runat="server" Editable="false" AllowBlank="false" BlankText="فیلد باید پر باشد" DisplayField="Text" ValueField="Text" QueryMode="Local">
                                                <Store>
                                                    <ext:Store runat="server">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="Value" />
                                                                    <ext:ModelField Name="Text" />
                                                                </Fields>
                                                            </ext:Model>
                                                        </Model>
                                                    </ext:Store>
                                                </Store>

                                                <Listeners>
                                                    <AfterRender Handler="comboBoxMonthBinder(this)" />


                                                </Listeners>
                                            </ext:ComboBox>

                                        </Editor>
                                    </ext:Column>

                                </Columns>
                            </ext:Column>
                            <ext:Column runat="server" Text="تاریخ اجرا" Width="100">
                                <Columns>
                                    <ext:Column runat="server" Text="سال" DataIndex="ExecuteYear" Width="37" Sortable="false">
                                        <Editor>
                                            <ext:ComboBox runat="server" AllowBlank="false" BlankText="فیلد باید پر باشد">
                                                <Items>

                                                    <ext:ListItem Text="1396" Value="1396" />
                                                    <ext:ListItem Text="1397" Value="1397" />
                                                    <ext:ListItem Text="1398" Value="1398" />
                                                    <ext:ListItem Text="1399" Value="1399" />
                                                    <ext:ListItem Text="1400" Value="1400" />
                                                </Items>
                                            </ext:ComboBox>
                                        </Editor>
                                    </ext:Column>
                                    <ext:Column runat="server" Text="ماه" DataIndex="ExecuteMonth" Width="60" Sortable="false">
                                        <Editor>
                                            <ext:ComboBox runat="server" Editable="false" AllowBlank="false" BlankText="فیلد باید پر باشد" DisplayField="Text" ValueField="Text" QueryMode="Local">
                                                <Store>
                                                    <ext:Store runat="server">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="Value" />
                                                                    <ext:ModelField Name="Text" />
                                                                </Fields>
                                                            </ext:Model>
                                                        </Model>
                                                    </ext:Store>
                                                </Store>

                                                <Listeners>
                                                    <AfterRender Handler="comboBoxMonthBinder(this)" />


                                                </Listeners>
                                            </ext:ComboBox>

                                        </Editor>
                                    </ext:Column>

                                </Columns>
                            </ext:Column>
                            <ext:Column
                                runat="server"
                                Text="نوع استخدام"
                                DataIndex="EmploymentTypeTitle"
                                Flex="1">
                                <Editor>
                                    <ext:TagField runat="server" AllowBlank="false" BlankText="فیلد باید پر باشد" Editable="false">
                                        <Listeners>
                                            <AfterRender Handler="comboBoxConstantBinder(this, 'BaseInfo', 'EmploymentType', 1, 'ID')" />
                                        </Listeners>

                                    </ext:TagField>
                                </Editor>
                            </ext:Column>
                            <ext:Column
                                runat="server"
                                Text="توضیحات"
                                DataIndex="Dsc"
                                Flex="1">
                                <Editor>
                                    <ext:TextField runat="server" />
                                </Editor>
                            </ext:Column>

                            <ext:CommandColumn runat="server" Width="50">
                                <Commands>
                                    <ext:GridCommand Icon="Delete" CommandName="Delete">
                                        <ToolTip Text="حذف" />
                                    </ext:GridCommand>
                                    <ext:CommandSeparator />
                                    <ext:GridCommand Icon="Pencil" CommandName="Edit">
                                        <ToolTip Text="ویرایش" />
                                    </ext:GridCommand>
                                </Commands>

                                <Listeners>
                                    <Command Handler="if(command == 'Edit'){editRecordGrid(this.up().up(), record)}else{saveItemFormulaInstanceConfirm(this.up().up(),record,true)}" />
                                </Listeners>
                            </ext:CommandColumn>
                        </Columns>
                    </ColumnModel>
                    <Plugins>
                        <ext:RowEditing runat="server" AutoCancel="false" SaveBtnText="ذخیره" CancelBtnText="انصراف" ClicksToEdit="2">
                            <Listeners>
                                <Edit Handler="saveItemFormulaInstance(this,2053/*typeItemID*/)" />
                                <CancelEdit Handler="if(this.context.record.data.ID == 0){ removeRecordGrid(this.grid,this.context.record)}" />
                            </Listeners>
                        </ext:RowEditing>
                    </Plugins>
                    <TopBar>
                        <ext:Toolbar runat="server">
                            <Items>
                                <ext:Button runat="server" Text="نسخه جدید" Icon="Add" Handler="addRecordGrid(this.up().up(),{ID:0,IssueYear:getYear(),IssueMonth:getMonthName(),ExecuteYear:getYear(),ExecuteMonth:getMonthName(),EmploymentTypeTitle:'',Dsc:''},true,false)" />
                                <ext:Button runat="server" Text="حذف نسخه" Icon="Delete" Handler="saveItemFormulaInstanceConfirm(this.up().up(),null,true)" />
                            </Items>
                        </ext:Toolbar>
                    </TopBar>
                    <Listeners>
                        <AfterRender Handler="getItemFormulaInstance(this,2053)" />
                        <RowClick Handler="alert('RowClick')" />
                        <Select Handler="alert('Select')" />

                        
                    </Listeners>
                </ext:GridPanel>

                <ext:Panel runat="server" Layout="TableLayout" Region="Center" Collapsed="false" Collapsible="true" CollapseDirection="Right">
                    <LayoutConfig>
                        <%--<ext:AccordionLayoutConfig Multi="true" EnableSplitters="true" ReserveScrollbar="true"  />--%>
                        <ext:TableLayoutConfig Columns="1" />
                    </LayoutConfig>
                    <Items>
                        <ext:Panel runat="server" Title="فرمول" Layout="TableLayout">

                            <LayoutConfig>
                                <ext:TableLayoutConfig Columns="1" ItemCls="width-full" />
                            </LayoutConfig>
                            <Items>
                                <ext:TextField runat="server" Height="20" FieldLabel="عنوان" LabelStyle="vertical-align:middle"
                                    LabelWidth="60" MarginSpec="5 0 0 0" EmptyText="عنوان شرط یا فرمول">
                                </ext:TextField>
                                <ext:TextArea runat="server" Height="50" FieldLabel="شرط" LabelStyle="vertical-align:middle" ID="txtConditionTitle"
                                    ReadOnly="true" LabelWidth="60" Cls="field-disabled" Editable="false" Enabled="false" MarginSpec="5 0 0 0">
                                    <%--  <Triggers>
                                        <ext:FieldTrigger  HideOnReadOnly="false"/>
                                    </Triggers>--%>
                                    <LeftButtons>
                                        <ext:Button runat="server" Icon="Magnifier" Width="25" />

                                    </LeftButtons>
                                </ext:TextArea>
                                <ext:TextArea runat="server" Height="50" FieldLabel="فرمول" Cls="field-disabled" ReadOnly="true" ID="txtFormulaTitle"
                                    LabelStyle="vertical-align:middle" LabelWidth="60" Editable="false" MarginSpec="5 0 5 0">
                                    <LeftButtons>
                                        <ext:Button runat="server" Icon="Magnifier" Width="25" Handler="showFormulaWindow(Ext.getCmp('WinFormula'))" />

                                    </LeftButtons>
                                </ext:TextArea>
                            </Items>
                            <TopBar>
                                <ext:Toolbar runat="server">
                                    <Items>
                                        <ext:Button runat="server" Text="شرط یا فرمول جدید" Icon="Add" Handler="addRecordGrid(this.up().up(),null,true,false)" />
                                    </Items>
                                </ext:Toolbar>
                            </TopBar>
                            <BottomBar>
                                <ext:Toolbar runat="server" RTL="false">
                                    <Items>
                                        <ext:Button runat="server" Text="ذخیره" Icon="Disk" Handler="" />
                                    </Items>
                                </ext:Toolbar>
                            </BottomBar>
                        </ext:Panel>
                        <ext:GridPanel
                            runat="server"
                            MultiSelect="false"
                            AutoLoad="false"
                            ID="gridSalFormulaList" Title="لیست شرط ها و فرمول ها">
                            <Store>
                                <ext:Store runat="server">
                                    <Model>
                                        <ext:Model runat="server">
                                            <Fields>
                                                <ext:ModelField Name="ID" Type="Int" />
                                                <ext:ModelField Name="Title" />
                                                <ext:ModelField Name="ConditionTitle" />
                                                <ext:ModelField Name="FormulaTitle" />
                                                <ext:ModelField Name="OrderNo" Type="Int" />
                                            </Fields>
                                        </ext:Model>
                                    </Model>
                                    <Proxy>
                                        <ext:AjaxProxy>
                                            <Reader>
                                                <ext:JsonReader>
                                                </ext:JsonReader>
                                            </Reader>
                                        </ext:AjaxProxy>
                                    </Proxy>
                                </ext:Store>
                            </Store>
                            <ColumnModel runat="server">
                                <Columns>

                                    <ext:RowNumbererColumn Width="30" runat="server" Text="ردیف" Align="Center" />
                                    <ext:Column
                                        runat="server"
                                        Text="عنوان شرط"
                                        DataIndex="Title"
                                        Flex="1">
                                    </ext:Column>

                                    <ext:Column
                                        runat="server"
                                        Text="شرط"
                                        Sortable="false"
                                        DataIndex="ConditionTitle"
                                        Flex="1">
                                    </ext:Column>
                                    <ext:Column
                                        runat="server"
                                        Text="فرمول محاسباتی"
                                        Sortable="false"
                                        DataIndex="FormulaTitle"
                                        Flex="1">
                                    </ext:Column>
                                    <ext:Column
                                        runat="server"
                                        Text="ترتیب"
                                        DataIndex="OrderNo"
                                        Width="40" ToolTip="ترتیب محاسبه">
                                    </ext:Column>
                                    <ext:CommandColumn runat="server" Width="50">
                                        <Commands>
                                            <ext:GridCommand Icon="Delete" CommandName="Delete">
                                                <ToolTip Text="حذف" />
                                            </ext:GridCommand>
                                            <ext:CommandSeparator />
                                            <ext:GridCommand Icon="Pencil" CommandName="Edit">
                                                <ToolTip Text="ویرایش" />
                                            </ext:GridCommand>
                                        </Commands>

                                        <Listeners>
                                            <Command Handler="" />
                                        </Listeners>
                                    </ext:CommandColumn>

                                </Columns>
                            </ColumnModel>



                        </ext:GridPanel>
                    </Items>
                </ext:Panel>

            </Items>
            <Buttons>
                <ext:Button runat="server" Text="انصراف" Icon="Cancel" Handler="this.up('window').close()" />
            </Buttons>
            <Listeners>
                <Close Handler="parent.getEl().unmask();" />
            </Listeners>
        </ext:Window>

        <ext:Window ID="WinFormula" runat="server"
            Icon="Lightbulb" Title="فرمول محاسباتی" Layout="BorderLayout" Height="500" Width="700" Hidden="true" RTL="true">


            <Items>
                <ext:Panel ID="panelFormula" AutoScroll="true" runat="server" Region="Center" Frame="true" Layout="TableLayout">
                    <LayoutConfig>
                        <ext:TableLayoutConfig Columns="1" ItemCls="width-full" />
                    </LayoutConfig>
                    <%--  <FieldDefaults LabelAlign="Top" MsgTarget="Side" />--%>
                    <Items>

                        <ext:TagField runat="server" Height="100" HideTrigger="true" Editable="false" 
                            RTL="true" ID="tagItemFormula" HideSelected="true" Selectable="false">
                            <TagLabelConfig AllowDuplicates="true" runat="server" rt>

                                <Menu>
                                    <ext:Menu runat="server">
                                        <Items>
                                            <ext:MenuItem runat="server" Text="حذف" Icon="Decline" Handler="removeItemFormula(this)" />
                                        </Items>
                                    </ext:Menu>
                                </Menu>
                            </TagLabelConfig>
                           
                        </ext:TagField>

                        <ext:Label runat="server" ID="lblItemFormula" RTL="true" Height="40" Border="true" />

                        <ext:Panel runat="server" Layout="ColumnLayout" Frame="true" MarginSpec="50 0 0 0" RTL="false">
                            <Items>
                                <ext:FieldContainer runat="server" Layout="TableLayout" Frame="true" Height="180" Width="200">
                                    <LayoutConfig>
                                        <ext:TableLayoutConfig Columns="1" ItemCls="width-full" />
                                    </LayoutConfig>
                                    <Items>
                                        <ext:SegmentedButton runat="server" AllowToggle="false">
                                            <Items>
                                                <ext:Button runat="server" Text="." Height="30" Width="30" ToolTip="ممیز" Handler="addItemFormula(this)" />
                                                <ext:Button runat="server" Text="(" Height="30" Width="30" Handler="addItemFormula(this)" ToolTip="پرانتز باز" />
                                                <ext:Button runat="server" Text=")" Height="30" Width="30" Handler="addItemFormula(this)" ToolTip="پرانتز بسته" />
                                            </Items>
                                        </ext:SegmentedButton>
                                        <ext:SegmentedButton runat="server" AllowToggle="false">

                                            <Items>
                                                <ext:Button runat="server" Text="/" Height="30" Width="30" Handler="addItemFormula(this)" />
                                                <ext:Button runat="server" Text="*" Height="30" Width="30" Handler="addItemFormula(this)" />
                                                <ext:Button runat="server" Text="-" Height="30" Width="30" Handler="addItemFormula(this)" />
                                            </Items>
                                        </ext:SegmentedButton>
                                        <ext:SegmentedButton runat="server" AllowToggle="false">

                                            <Items>
                                                <ext:Button runat="server" Text="7" Height="30" Width="30" Handler="addItemFormula(this)" />
                                                <ext:Button runat="server" Text="8" Height="30" Width="30" Handler="addItemFormula(this)" />
                                                <ext:Button runat="server" Text="9" Height="30" Width="30" Handler="addItemFormula(this)" />
                                            </Items>
                                        </ext:SegmentedButton>
                                        <ext:SegmentedButton runat="server" AllowToggle="false">
                                            <Items>
                                                <ext:Button runat="server" Text="4" Height="30" Width="30" Handler="addItemFormula(this)" />
                                                <ext:Button runat="server" Text="5" Height="30" Width="30" Handler="addItemFormula(this)" />
                                                <ext:Button runat="server" Text="6" Height="30" Width="30" Handler="addItemFormula(this)" />
                                            </Items>
                                        </ext:SegmentedButton>
                                        <ext:SegmentedButton runat="server" AllowToggle="false">
                                            <Items>
                                                <ext:Button runat="server" Text="1" Height="30" Width="30" Handler="addItemFormula(this)" />
                                                <ext:Button runat="server" Text="2" Height="30" Width="30" Handler="addItemFormula(this)" />
                                                <ext:Button runat="server" Text="3" Height="30" Width="30" Handler="addItemFormula(this)" />
                                            </Items>
                                        </ext:SegmentedButton>
                                        <ext:SegmentedButton runat="server" AllowToggle="false">
                                            <Items>
                                                <ext:Button runat="server" Text="0" Height="30" Handler="addItemFormula(this)" />
                                                <ext:Button runat="server" Text="+" Height="30" Handler="addItemFormula(this)" />
                                                <ext:Button runat="server" Text="حذف فرمول" Height="30" Handler="deleteFormula(this)" />
                                            </Items>

                                        </ext:SegmentedButton>

                                    </Items>
                                </ext:FieldContainer>

                            </Items>
                        </ext:Panel>

                    </Items>
                    <Buttons>
                        <ext:Button ID="btnSaveFormula" runat="server" Text="ذخیره" Icon="Disk" TabIndex="12" Handler="saveFormulaSalary(this.up('window'))">
                        </ext:Button>
                    </Buttons>

                   <%-- <KeyMap runat="server">
                        <Binding>
                            <ext:KeyBinding Handler="saveFormulaSalary(this.up('window'))">
                                <Keys>
                                    <ext:Key Code="ENTER" />
                                </Keys>
                            </ext:KeyBinding>
                        </Binding>
                    </KeyMap>--%>
                    <KeyMap runat="server">
                      <ext:KeyBindItem Handler="saveFormulaSalary(this.up('window'))" Key="ENTER" />
                          
                    </KeyMap>
                </ext:Panel>

                <ext:TreePanel
                    runat="server"
                    Region="West"
                    Width="200"
                    AutoScroll="true"
                    Split="true"
                    UseArrows="true"
                    ID="propertyTree" MultiSelect="false" RootVisible="false" Collapsible="true">

                    <Listeners>
                        <ItemDblClick Fn="addFormula" />
                        <AfterRender Handler="getPropertyTree(this,2,1/*فرمول*/)" />
                    </Listeners>

                </ext:TreePanel>
            </Items>

        </ext:Window>
    </form>
</body>
</html>
