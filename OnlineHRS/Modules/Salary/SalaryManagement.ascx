<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>


<ext:DesktopModuleProxy ID="DesktopModuleProxySalary" runat="server">
    <Module ModuleID="SalaryManagementModule">
        <Shortcut Name="حقوق و دستمزد" IconCls="x-Salary-icon" SortIndex="9" />
        <Launcher Text="حقوق و دستمزد" Icon="ScriptEdit" />
        <Window>
            <ext:Window ID="SalaryWindow" runat="server" Height="700"
                Icon="MoneyDollar" Title="حقوق و دستمزد" Width="1100" BodyPadding="5"
                Layout="FitLayout" CloseAction="Hide" RTL="true" IDMode="Static" ManageHeight="true">

                <Items>
                    <ext:TabPanel
                        ID="TabPanelSalary"
                        runat="server"
                        ActiveTabIndex="0"
                        Plain="false" Layout="FitLayout" BodyPadding="1">
                        <%--   <LayoutConfig>
                            <ext:FitLayoutConfig ItemCls="width-full" />
                        </LayoutConfig>--%>
                        <Plugins>
                            <ext:TabScrollerMenu PageSize="20" runat="server" MaxText="1000" />
                        </Plugins>
                        <Items>
                            <ext:Panel ID="TabSalaryItems" runat="server" Title="تعریف عوامل حقوقی" Icon="Coins" Layout="BorderLayout">
                                <Items>

                                    <ext:Panel runat="server" ID="pnlSalaryItemsSearch" Layout="TableLayout" RTL="true" BodyPadding="5" Title="جستجو" Icon="Find" Frame="true" Region="North">

                                        <LayoutConfig>
                                            <ext:TableLayoutConfig Columns="4" ItemCls="width-full" />
                                        </LayoutConfig>

                                        <Items>

                                            <ext:TextField runat="server" ID="txtSalaryItemF_Title" FieldLabel="عنوان عامل" />
                                            <ext:TextField runat="server" ID="txtSalaryItemF_EnglishTitle" FieldLabel="عنوان لاتین" />
                                            <%--  <ext:TextField runat="server" ID="txtSalaryItemF_Code" FieldLabel="کد عامل" MaskRe="/[0-9-]/" />--%>
                                            <%-- <ext:TagField MultiSelect="true" Editable="false" Floating="false" TabIndex="10" ID="tagSalaryItemF_EmploymentType" runat="server" FieldLabel="نوع استخدام">
                                                <Listeners>
                                                    <AfterRender Handler="comboBoxConstantBinder(this, 'BaseInfo', 'EmploymentType', 1, 'ID')" />
                                                </Listeners>
                                            </ext:TagField>--%>
                                            <ext:ComboBox Editable="false" TabIndex="4" ID="cmbSalIF_CategoryType" runat="server" FieldLabel="دسته عامل">

                                                <Items>
                                                    <ext:ListItem Text="همه" Value="-1" />
                                                    <ext:ListItem Text="مزایا" Value="2" />
                                                    <ext:ListItem Text="کسور" Value="3" />
                                                    <ext:ListItem Text="کارکرد" Value="1" />
                                                    <ext:ListItem Text="سایر عوامل" Value="4" />
                                                    <ext:ListItem Text="تعهدات کارفرما" Value="5" />

                                                </Items>

                                            </ext:ComboBox>
                                            <ext:ComboBox Editable="false" TabIndex="4" ID="cmbSalIF_ItemType" runat="server" FieldLabel="نوع عامل">

                                                <Items>
                                                    <ext:ListItem Text="همه" Value="-1" />
                                                    <ext:ListItem Text="مستمر(فیش حقوقیی)" Value="1" />
                                                    <ext:ListItem Text="محاسباتی" Value="2" />
                                                    <ext:ListItem Text="فرم ورودی" Value="3" />
                                                    <ext:ListItem Text="سیستمی" Value="4" />
                                                </Items>

                                            </ext:ComboBox>
                                            <ext:ComboBox Editable="false" TabIndex="4" ID="cmbSalDF_DetailsType" runat="server" FieldLabel="نوع تفصیل">

                                                <Items>
                                                    <ext:ListItem Text="همه" Value="-1" />
                                                    <ext:ListItem Text="شخص" Value="1" />
                                                    <ext:ListItem Text="شرکت" Value="2" />
                                                    <ext:ListItem Text="مرکز هزینه" Value="3" />
                                                    <ext:ListItem Text="شعبه" Value="4" />

                                                </Items>

                                            </ext:ComboBox>
                                            <ext:ComboBox Editable="false" TabIndex="4" ID="cmbSalNF_NatureType" runat="server" FieldLabel="ماهیت عامل">

                                                <Items>
                                                    <ext:ListItem Text="همه" Value="-1" />
                                                    <ext:ListItem Text="بدهکار" Value="1" />
                                                    <ext:ListItem Text="بستانکار" Value="2" />
                                                    <ext:ListItem Text="بدهکار/بستانکار" Value="3" />

                                                </Items>

                                            </ext:ComboBox>
                                            <ext:Checkbox runat="server" FieldLabel="معوقه پذیر" Checked="true" ID="cmbSalAF_IsArrear" />
                                        </Items>
                                        <Buttons>
                                            <ext:Button Text="جستجو" runat="server" Icon="Zoom">
                                                <Listeners>
                                                    <Click Handler="getSalaryItems(this.up('panel'))" />
                                                </Listeners>
                                            </ext:Button>
                                        </Buttons>

                                        <%-- <KeyMap runat="server">
                                            <Binding>
                                                <ext:KeyBinding Handler="getSalaryItems(App.pnlSalaryItemsSearch)">
                                                    <Keys>
                                                        <ext:Key Code="ENTER" />
                                                    </Keys>
                                                </ext:KeyBinding>
                                            </Binding>
                                        </KeyMap>--%>
                                        <KeyMap runat="server">
                                            <ext:KeyBindItem Handler="getSalaryItems(App.pnlSalaryItemsSearch)" Key="ENTER" />

                                        </KeyMap>
                                    </ext:Panel>

                                    <ext:GridPanel
                                        runat="server"
                                        Region="Center"
                                        MultiSelect="false"
                                        ID="gridSalaryItem" AutoLoad="false" StyleSpec="margin-top:5px">
                                        <TopBar>
                                            <ext:Toolbar runat="server">
                                                <Items>
                                                    <ext:Button runat="server" Text="عامل جدید" Icon="CoinsAdd" Handler="showSalaryItemWindow(this.up().up().up('panel'),'Add',0)" />
                                                    <ext:Button runat="server" Text="ویرایش عامل" Icon="Coins" Handler="showSalaryItemWindow(this.up().up().up('panel'),'Edit',getValueGrid(this.up().up(),'ID'))" />
                                                    <ext:Button runat="server" Text="حذف عامل" Icon="CoinsDelete" Handler="SaveSalaryItem('Delete', getValueGrid(this.up().up(),'ID'), this.up().up())" />
                                                    <ext:Button runat="server" Text="خروجی اکسل" Icon="PageExcel" Handler="this.up().up().doExcelExport({apiKey: 'demogroupedextjsgrid',startCell: 'A1',destinationfile: 'SalaryItems.xlsx'})" />

                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <Store>
                                            <ext:Store
                                                runat="server" AutoLoad="false">
                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="ID" Type="Int" />
                                                            <%-- <ext:ModelField Name="Code" />--%>
                                                            <ext:ModelField Name="Title" />
                                                            <ext:ModelField Name="EnglishTitle" />
                                                            <ext:ModelField Name="EmploymentTypeTitle" />
                                                            <ext:ModelField Name="IsArrear" Type="Boolean" />
                                                            <ext:ModelField Name="CategoryTypeTitle" />
                                                            <ext:ModelField Name="ItemTypeTitle" />
                                                            <ext:ModelField Name="ItemTypeID" Type="Int" />
                                                            <ext:ModelField Name="NatureTypeTitle" />
                                                            <ext:ModelField Name="IsVisible" Type="Boolean" />
                                                            <ext:ModelField Name="CreditorSpecificCode" Type="Int" />
                                                            <ext:ModelField Name="DebtorSpecificCode" Type="Int" />
                                                            <ext:ModelField Name="DetailsTypeTitle" />
                                                        </Fields>

                                                    </ext:Model>
                                                </Model>
                                                <Proxy>
                                                    <ext:PageProxy>
                                                        <Reader>
                                                            <ext:JsonReader>
                                                            </ext:JsonReader>
                                                        </Reader>
                                                    </ext:PageProxy>
                                                </Proxy>
                                            </ext:Store>
                                        </Store>

                                        <ColumnModel runat="server">

                                            <Columns>
                                                <ext:RowNumbererColumn Width="35" runat="server" Text="ردیف" Align="Center" />
                                                <ext:Column
                                                    runat="server"
                                                    Text="عنوان عامل"
                                                    Sortable="true"
                                                    DataIndex="Title"
                                                    Flex="1">
                                                </ext:Column>
                                                <%-- <ext:Column
                                                    runat="server"
                                                    Text="کد عامل"
                                                    DataIndex="Code"
                                                    Flex="1">
                                                </ext:Column>--%>
                                                <ext:Column
                                                    runat="server"
                                                    Text="عنوان لاتین"
                                                    Sortable="true"
                                                    DataIndex="EnglishTitle"
                                                    Flex="1" Hidden="true" Hideable="true">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="دسته عامل"
                                                    Sortable="true"
                                                    DataIndex="CategoryTypeTitle"
                                                    Flex="1">
                                                </ext:Column>

                                                <ext:Column
                                                    runat="server"
                                                    Text="نوع عامل"
                                                    Sortable="true"
                                                    DataIndex="ItemTypeTitle"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="نوع استخدام"
                                                    Sortable="true"
                                                    DataIndex="EmploymentTypeTitle"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:CheckColumn
                                                    runat="server"
                                                    Text="معوقه پذیر"
                                                    Sortable="true"
                                                    DataIndex="IsArrear"
                                                    Flex="1">
                                                </ext:CheckColumn>
                                                <ext:CheckColumn
                                                    runat="server"
                                                    Text="نمایش در فیش"
                                                    Sortable="true"
                                                    DataIndex="IsVisible"
                                                    Flex="1">
                                                </ext:CheckColumn>
                                                <ext:Column
                                                    runat="server"
                                                    Text="سطح تفصیل"
                                                    Sortable="true"
                                                    DataIndex="DetailsTypeTitle"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="ماهیت عامل"
                                                    Sortable="true"
                                                    DataIndex="NatureTypeTitle"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="کد معین بستانکار"
                                                    Sortable="true"
                                                    DataIndex="CreditorSpecificCode"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="کد معین بدهکار"
                                                    Sortable="true"
                                                    DataIndex="DebtorSpecificCode"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:CommandColumn runat="server" Width="60">
                                                    <Commands>
                                                        <ext:GridCommand Icon="Delete" CommandName="Delete">
                                                            <ToolTip Text="حذف" />
                                                        </ext:GridCommand>
                                                        <ext:CommandSeparator />
                                                        <ext:GridCommand Icon="NoteEdit" CommandName="Edit">
                                                            <ToolTip Text="ویرایش" />
                                                        </ext:GridCommand>
                                                    </Commands>

                                                    <Listeners>
                                                        <Command Handler="if(command ==='Edit'){showSalaryItemWindow(this.up().up().up('panel'),'Edit',record.data.ID)}else{SaveSalaryItem('Delete', record.data.ID, this.up().up())}" />
                                                    </Listeners>
                                                </ext:CommandColumn>
                                            </Columns>
                                        </ColumnModel>
                                        <%-- <Listeners>
                                            <AfterRender Handler="getSalaryItems(this.prev('panel'))" />
                                        </Listeners>--%>
                                    </ext:GridPanel>
                                </Items>

                            </ext:Panel>

                            <ext:Panel ID="TabSalaryTypes" runat="server"
                                Icon="PageCopy" Title="تعریف انواع فیش حقوقی" Layout="BorderLayout">
                                <Items>

                                    <ext:GridPanel
                                        runat="server"
                                        Region="West" Collapsed="false" Collapsible="true" Icon="Script" Split="true"
                                        MultiSelect="false"
                                        AutoLoad="false"
                                        ID="gridSalaryTypes" Title="انواع فیش حقوقی" Width="350">
                                        <Store>
                                            <ext:Store runat="server">
                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="ID" Type="Int" />
                                                            <ext:ModelField Name="Title" />
                                                            <ext:ModelField Name="CreateDate" />
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

                                                <ext:RowNumbererColumn Width="35" runat="server" Text="ردیف" Align="Center" />
                                                <ext:Column
                                                    runat="server"
                                                    Text="عنوان فیش حقوقی"
                                                    DataIndex="Title"
                                                    Width="170">
                                                    <Editor>
                                                        <ext:TextField runat="server" AllowBlank="false" BlankText="فیلد باید پر باشد" />
                                                    </Editor>
                                                </ext:Column>

                                                <ext:Column
                                                    runat="server"
                                                    Text="تاریخ ایجاد"
                                                    Sortable="true"
                                                    DataIndex="CreateDate"
                                                    Flex="1">
                                                </ext:Column>

                                                <ext:CommandColumn runat="server" Width="60">
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
                                                        <Command Handler="if(command ==='Edit'){editRecordGrid(this.up().up(),record)}else{deleteSalaryType(record, this.up().up())}" />
                                                    </Listeners>
                                                </ext:CommandColumn>

                                            </Columns>
                                        </ColumnModel>
                                        <Plugins>
                                            <ext:RowEditing runat="server" AutoCancel="false" SaveBtnText="ذخیره" CancelBtnText="انصراف" ClicksToEdit="2">
                                                <Listeners>
                                                    <Edit Handler="SaveSalaryType(this)" />
                                                    <CancelEdit Handler="if (this.context.record.data.ID == 0) {removeRecordGrid(this.grid, this.context.record)}" />
                                                </Listeners>
                                            </ext:RowEditing>
                                        </Plugins>
                                        <TopBar>
                                            <ext:Toolbar runat="server">
                                                <Items>
                                                    <ext:Button runat="server" Text="نوع فیش حقوقی جدید" Icon="Add" Handler="addRecordGrid(this.up().up(),null,true,false)" />
                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <Listeners>
                                            <AfterRender Handler="getSalaryTypes(this)" />
                                            <RowClick Handler="getSalaryTypeItems(this)" />
                                        </Listeners>
                                    </ext:GridPanel>

                                    <ext:GridPanel
                                        runat="server"
                                        Region="Center"
                                        MultiSelect="true"
                                        ID="gridSalaryTypeItems" AutoLoad="false" Title="عوامل در نوع فیش حقوقی" Icon="MoneyDollar">
                                        <Store>
                                            <ext:Store
                                                runat="server" AutoLoad="false">
                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="TypeItemID" Type="Int" />
                                                            <ext:ModelField Name="ID" Type="Int" />
                                                            <ext:ModelField Name="Title" />
                                                            <ext:ModelField Name="IsDeactive" Type="Boolean" />
                                                            <ext:ModelField Name="CategoryTypeTitle" />
                                                            <ext:ModelField Name="ItemTypeTitle" />
                                                            <ext:ModelField Name="IsVisible" Type="Boolean" />
                                                            <ext:ModelField Name="IsArrear" Type="Boolean" />
                                                        </Fields>
                                                    </ext:Model>
                                                </Model>
                                                <Proxy>
                                                    <ext:PageProxy>
                                                        <Reader>
                                                            <ext:JsonReader>
                                                            </ext:JsonReader>
                                                        </Reader>
                                                    </ext:PageProxy>
                                                </Proxy>
                                            </ext:Store>
                                        </Store>
                                        <SelectionModel>

                                            <ext:CheckboxSelectionModel runat="server" AllowDeselect="false">
                                                <Listeners>

                                                    <BeforeDeselect Fn="rowDeselectEvent" />

                                                </Listeners>
                                            </ext:CheckboxSelectionModel>

                                        </SelectionModel>
                                        <ColumnModel runat="server">

                                            <Columns>
                                                <ext:RowNumbererColumn Width="35" runat="server" Text="ردیف" Align="Center" />
                                                <ext:Column
                                                    runat="server"
                                                    Text="عنوان عامل"
                                                    Sortable="true"
                                                    DataIndex="Title"
                                                    Width="200">
                                                </ext:Column>

                                                <ext:ComponentColumn runat="server" Flex="1" Text="فرمول محاسباتی" RTL="true">
                                                    <Component>
                                                        <ext:TextField runat="server" Editable="false" RTL="true">
                                                            <%-- <Triggers>
                                                                <ext:FieldTrigger Icon="Search" QTip="نوشتن فرمول" Handler="showSalaryItemFormulaModalWindow(this)" />
                                                                    
                                                            </Triggers>--%>
                                                            <LeftButtons>
                                                                <ext:Button runat="server" ToolTip="نوشتن فرمول" Icon="Magnifier" Width="25" Handler="showSalaryItemFormulaModalWindow(this.up())" />

                                                            </LeftButtons>
                                                        </ext:TextField>
                                                    </Component>
                                                </ext:ComponentColumn>
                                                <%--<ext:ComponentColumn runat="server" Align="Center"  Text="محاسبه نشود"  >
                                                    <Component>
                                                        <ext:Checkbox runat="server"  />
                                                    </Component>
                                                </ext:ComponentColumn>--%>
                                                <ext:CheckColumn
                                                    runat="server"
                                                    Text="محاسبه نشود"
                                                    Sortable="true"
                                                    DataIndex="IsDeactive"
                                                    Width="100" Align="Center" Editable="true">
                                                    <Listeners>
                                                        <%-- <CheckChange Fn="typeItemDeactive" />--%>
                                                        <BeforeCheckChange Fn="typeItemDeactive" />
                                                    </Listeners>
                                                </ext:CheckColumn>
                                                <ext:Column
                                                    runat="server"
                                                    Text="دسته عامل"
                                                    Sortable="true"
                                                    DataIndex="CategoryTypeTitle"
                                                    Width="100" Align="Center">
                                                </ext:Column>

                                                <ext:Column
                                                    runat="server"
                                                    Text="نوع عامل"
                                                    Sortable="true"
                                                    DataIndex="ItemTypeTitle"
                                                    Width="100" Align="Center">
                                                </ext:Column>
                                                <ext:CheckColumn
                                                    runat="server"
                                                    Text="معوقه پذیر"
                                                    Sortable="true"
                                                    DataIndex="IsArrear"
                                                    Width="100" Align="Center">
                                                </ext:CheckColumn>
                                                <ext:CheckColumn
                                                    runat="server"
                                                    Text="نمایش در فیش"
                                                    Sortable="true"
                                                    DataIndex="IsVisible"
                                                    Width="100" Align="Center">
                                                </ext:CheckColumn>
                                            </Columns>
                                        </ColumnModel>
                                        <Listeners>
                                            <%-- <AfterRender Handler="getSalaryItems(this)" />--%>
                                            <RowMouseUp Fn="rowMouseUpEvent" />

                                        </Listeners>
                                        <TopBar>
                                            <ext:Toolbar runat="server">
                                                <Items>
                                                    <ext:Button runat="server" Text="بروزرسانی عوامل" Icon="ArrowRefresh" Handler="getSalaryTypeItems(this.up('#TablSalaryTypes').down('#gridSalaryTypes'))" />
                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <%--<View>
                                            <ext:GridView runat="server">
                                                <Plugins>
                                                    <ext:GridDragDrop runat="server" DragText="ترتیب اولویت محاسبات"  />
                                                </Plugins>
                                            </ext:GridView>
                                        </View>--%>
                                        <Buttons>
                                            <ext:Button runat="server" Icon="Disk" Text="ذخیره">
                                                <Listeners>
                                                    <Click Handler="SaveSalaryTypeItems(this.up('#gridSalaryTypeItems'))" />
                                                </Listeners>
                                            </ext:Button>
                                        </Buttons>

                                    </ext:GridPanel>

                                </Items>
                            </ext:Panel>

                            <ext:UserControlLoader runat="server" Path="~\Modules\Personnel\PersonnelSearch.ascx" UserControlID="~\Modules\Salary\PersonnelSalaryActionPanel.ascx;showPersonnelSalaryWindow(this.up('window'),this);محاسبه فیش حقوقی فردی;TabPersonnelSalary" />

                            <ext:Panel ID="TabInputFormItems" runat="server" Title="سایر کسورات و پرداخت ها" Icon="MoneyAdd" Layout="BorderLayout" Cls="personnel-search">
                                <Items>

                                    <ext:UserControlLoader runat="server" Path="~\Modules\Personnel\PersonnelSearchFilters.ascx" UserControlID="~\Modules\Salary\InputFormSearchFilterPanel.ascx;personnelInputFormItemsSearch;PPSFilter_InputFormItems" />
                                    <ext:GridPanel
                                        runat="server"
                                        Region="Center"
                                        MultiSelect="false"
                                        IDMode="Parent"
                                        ID="gridPersonnelInputFormItems" AutoLoad="false">
                                        <Store>
                                            <ext:Store
                                                runat="server" PageSize="10" AutoLoad="false">
                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="ID" Type="Int" />
                                                            <ext:ModelField Name="PersonnelID" Type="Int" />
                                                            <ext:ModelField Name="ItemID" Type="Int" />
                                                            <ext:ModelField Name="Code" />
                                                            <ext:ModelField Name="FullName" />
                                                            <ext:ModelField Name="Title" />
                                                            <ext:ModelField Name="Value" />
                                                            <ext:ModelField Name="IssueDate" />
                                                            <ext:ModelField Name="ExecuteDate" />
                                                            <ext:ModelField Name="EndDate" />
                                                            <ext:ModelField Name="CloseDate" />
                                                            <ext:ModelField Name="Dsc" />
                                                            <ext:ModelField Name="CategoryTypeTitle" />
                                                        </Fields>
                                                    </ext:Model>
                                                </Model>
                                                <Proxy>
                                                    <ext:PageProxy>
                                                        <Reader>
                                                            <ext:JsonReader>
                                                            </ext:JsonReader>

                                                        </Reader>
                                                    </ext:PageProxy>

                                                </Proxy>

                                            </ext:Store>

                                        </Store>

                                        <ColumnModel runat="server">

                                            <Columns>
                                                <ext:RowNumbererColumn Width="35" runat="server" Text="ردیف" Align="Center" />
                                                <ext:Column
                                                    runat="server"
                                                    Text="کد پرسنلی"
                                                    DataIndex="Code"
                                                    Width="100">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="نام و نام خانوادگی"
                                                    Sortable="true"
                                                    DataIndex="FullName"
                                                    Width="150">
                                                </ext:Column>

                                                <ext:Column
                                                    runat="server"
                                                    Text="عنوان عامل"
                                                    Sortable="true"
                                                    DataIndex="Title"
                                                    Width="100">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="مبلغ"
                                                    Sortable="true"
                                                    DataIndex="Value"
                                                    Width="100">
                                                    <Renderer Fn="digitGrouping" />
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="تاریخ صدور"
                                                    Sortable="true"
                                                    DataIndex="IssueDate"
                                                    Width="100">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="تاریخ اجرا"
                                                    Sortable="true"
                                                    DataIndex="ExecuteDate"
                                                    Width="100" />
                                                <ext:Column
                                                    runat="server"
                                                    Text="تاریخ پایان"
                                                    Sortable="true"
                                                    DataIndex="EndDate"
                                                    Width="100">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="تاریخ پایان پرداخت"
                                                    Sortable="true"
                                                    DataIndex="CloseDate"
                                                    Width="100">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="نوع عامل"
                                                    Sortable="true"
                                                    DataIndex="CategoryTypeTitle"
                                                    Width="100">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="توضیحات"
                                                    Sortable="true"
                                                    DataIndex="Dsc"
                                                    Flex="1">
                                                </ext:Column>

                                            </Columns>
                                        </ColumnModel>
                                        <TopBar>
                                            <ext:Toolbar runat="server">
                                                <Items>
                                                    <ext:Button runat="server" Text="جدید" Icon="Add" Handler="showPersonnelInputFormItemModalWindow(this.up('#TabInputFormItems'),this.up('grid'),'Add')" />
                                                    <ext:Button runat="server" Text="ویرایش" Icon="NoteEdit" Handler="showPersonnelInputFormItemModalWindow(this.up('#TabInputFormItems'),this.up('grid'),'Edit')" />
                                                    <ext:Button runat="server" Text="حذف" Icon="Delete" Handler="deletePersonnelInputFormItem(this.up('grid'))" />
                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <BottomBar>
                                            <ext:PagingToolbar runat="server" AfterPageText="صفحه بعد" BeforePageText="صفحه قبل" NextText="صفحه بعد" PrevText="صفحه قبل" FirstText="صفحه اول" LastText="صفحه آخر" RefreshText="بارگذاری مجدد">
                                                <Items>
                                                    <ext:Label runat="server" Text="تعداد نمایش در صفحه:" />
                                                    <ext:ToolbarSpacer runat="server" Width="10" />
                                                    <ext:ComboBox runat="server" Width="80" Editable="false">
                                                        <Items>
                                                            <ext:ListItem Text="1" Value="1" />
                                                            <ext:ListItem Text="2" Value="2" />
                                                            <ext:ListItem Text="5" Value="5" />
                                                            <ext:ListItem Text="10" Value="10" />
                                                            <ext:ListItem Text="20" Value="20" />
                                                            <ext:ListItem Text="50" Value="50" />
                                                            <ext:ListItem Text="100" Value="100" />
                                                            <ext:ListItem Text="همه" Value="10000" />
                                                        </Items>
                                                        <SelectedItems>
                                                            <ext:ListItem Value="10" />
                                                        </SelectedItems>
                                                        <Listeners>
                                                            <Select Handler="#{gridPersonnelInputFormItems}.store.pageSize = parseInt(this.getValue(), 10); #{gridPersonnelInputFormItems}.store.reload(); changePagePIFI(this.up(), 1)" />
                                                        </Listeners>
                                                    </ext:ComboBox>
                                                </Items>
                                                <Listeners>
                                                    <BeforeChange Fn="changePagePIFI" />
                                                </Listeners>
                                            </ext:PagingToolbar>
                                        </BottomBar>
                                        <Listeners>
                                            <RowDblClick Handler="showPersonnelInputFormItemModalWindow(this.up('#TabInputFormItems'),this,'Edit')" />
                                        </Listeners>
                                    </ext:GridPanel>
                                </Items>

                            </ext:Panel>

                            <ext:Panel ID="TabPersonnelGroupCalc" runat="server" Title="محاسبه گروهی فیش" Icon="GroupGear" Layout="BorderLayout" Cls="personnel-search">

                                <Items>

                                    <ext:UserControlLoader runat="server" Path="~\Modules\Personnel\PersonnelSearchFilters.ascx" UserControlID=";;PPSFilter_PersonnelGroupCalc" />
                                    <ext:Panel runat="server" ID="panelGPSCalc" Layout="ColumnLayout" RTL="true" Frame="true" Region="North" HeightSpec="100%">

                                        <Items>
                                            <ext:GridPanel
                                                runat="server"
                                                Region="Center"
                                                MultiSelect="false"
                                                IDMode="Parent"
                                                ColumnWidth="0.48"
                                                StyleSpec="height:100%"
                                                ID="gridGroupCalc" AutoLoad="false">
                                                <Store>
                                                    <ext:Store
                                                        runat="server" AutoLoad="false">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="ID" Type="Int" />
                                                                    <ext:ModelField Name="Code" />
                                                                    <ext:ModelField Name="FullName" />
                                                                    <ext:ModelField Name="StatusTypeTitle" />
                                                                    <ext:ModelField Name="JobStatusTitle" />
                                                                </Fields>
                                                            </ext:Model>
                                                        </Model>
                                                        <Proxy>
                                                            <ext:PageProxy>
                                                                <Reader>
                                                                    <ext:JsonReader>
                                                                    </ext:JsonReader>

                                                                </Reader>
                                                            </ext:PageProxy>

                                                        </Proxy>

                                                    </ext:Store>

                                                </Store>
                                                <SelectionModel>
                                                    <ext:CheckboxSelectionModel runat="server" />
                                                </SelectionModel>
                                                <ColumnModel runat="server">

                                                    <Columns>

                                                        <ext:RowNumbererColumn Width="35" runat="server" Text="ردیف" Align="Center" />
                                                        <ext:Column
                                                            runat="server"
                                                            Text="کد پرسنلی"
                                                            DataIndex="Code"
                                                            Width="100">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="نام و نام خانوادگی"
                                                            Sortable="true"
                                                            DataIndex="FullName"
                                                            MinWidth="150" Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="وضعیت شغلی"
                                                            Sortable="true"
                                                            DataIndex="JobStatusTitle"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="وضعیت اشتغال"
                                                            Sortable="true"
                                                            DataIndex="StatusTypeTitle"
                                                            Flex="1">
                                                        </ext:Column>
                                                    </Columns>
                                                </ColumnModel>
                                                <TopBar>
                                                    <ext:Toolbar runat="server">
                                                        <Items>
                                                            <ext:ComboBox runat="server" ID="ddlGroupCalc_Year" Editable="false" FieldLabel="سال" LabelWidth="30" Width="130" LabelAlign="Right">
                                                                <Listeners>
                                                                    <AfterRender Handler="comboBoxYearBinder(this,true)" />
                                                                </Listeners>
                                                            </ext:ComboBox>
                                                            <ext:ComboBox runat="server" ID="ddlGroupCalc_Month" Editable="false" FieldLabel="ماه" LabelWidth="30" Width="130" LabelAlign="Right">
                                                                <Listeners>
                                                                    <AfterRender Handler="comboBoxMonthBinder(this,true)" />
                                                                </Listeners>
                                                            </ext:ComboBox>
                                                            <ext:ComboBox runat="server" ID="ddlGroupCalc_SalaryTypes" Editable="false" FieldLabel="نوع فیش" LabelWidth="60" Width="230" LabelAlign="Right" AllowBlank="false">
                                                                <Listeners>
                                                                    <AfterRender Handler="getPersonnelSalaryTypes(this, 0)" />
                                                                </Listeners>
                                                            </ext:ComboBox>
                                                            <%--<ext:Button runat="server" Text="ویرایش" Icon="ForwardGreen" Handler="showPersonnelInputFormItemModalWindow(this.up('#TabInputFormItems'),this.up('grid'),'Edit')" />
                                                            <ext:Button runat="server" Text="انتخاب" Icon="PlayGreen" Handler="deletePersonnelInputFormItem(this.up('grid'))" />

                                                            <ext:Button runat="server" Text="انتخاب" Icon="ReverseGreen" IconAlign="Right" Handler="deletePersonnelInputFormItem(this.up('grid'))" />
                                                            <ext:Button runat="server" Text="انتخاب همه" Icon="RewindGreen" IconAlign="Right" Handler="showPersonnelInputFormItemModalWindow(this.up('#TabInputFormItems'),this.up('grid'),'Add')" />--%>
                                                        </Items>
                                                    </ext:Toolbar>
                                                </TopBar>
                                                <Plugins>
                                                    <ext:FilterHeader runat="server" />
                                                </Plugins>
                                               
                                            </ext:GridPanel>
                                            <ext:Panel runat="server" ColumnWidth="0.04" Layout="CenterLayout" Cls="height-full" Frame="true" BodyStyle="margin-top:120px">


                                                <Items>
                                                    <ext:SegmentedButton runat="server" Vertical="true">
                                                        <Items>
                                                            <ext:Button runat="server" Icon="RewindGreen" Width="35" Height="35" Handler="addAllRowGrid(this.up('panel').prev(), this.up('panel').next())" />
                                                            <ext:Button runat="server" Icon="ReverseGreen" Width="35" Height="35" Handler="addSelectRowGrid(this.up('panel').prev(), this.up('panel').next())" />
                                                            <ext:Button runat="server" Icon="PlayGreen" Width="35" Height="35" Handler="addSelectRowGrid(this.up('panel').next(), this.up('panel').prev())" />
                                                            <ext:Button runat="server" Icon="ForwardGreen" Width="35" Height="35" Handler="addAllRowGrid(this.up('panel').next(), this.up('panel').prev())" />
                                                        </Items>

                                                    </ext:SegmentedButton>

                                                </Items>
                                            </ext:Panel>
                                            <ext:GridPanel
                                                runat="server"
                                                Region="Center"
                                                MultiSelect="false"
                                                IDMode="Parent"
                                                ColumnWidth="0.48"
                                                ID="gridGroupPersonnelCalc" AutoLoad="false" HeightSpec="100%">
                                                <Store>
                                                    <ext:Store
                                                        runat="server" AutoLoad="false">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="ID" Type="Int" />
                                                                    <ext:ModelField Name="Code" />
                                                                    <ext:ModelField Name="FullName" />
                                                                    <ext:ModelField Name="StatusTypeTitle" />
                                                                    <ext:ModelField Name="JobStatusTitle" />
                                                                </Fields>
                                                            </ext:Model>
                                                        </Model>
                                                        <Proxy>
                                                            <ext:PageProxy>
                                                                <Reader>
                                                                    <ext:JsonReader>
                                                                    </ext:JsonReader>

                                                                </Reader>
                                                            </ext:PageProxy>

                                                        </Proxy>

                                                    </ext:Store>

                                                </Store>
                                                <SelectionModel>
                                                    <ext:CheckboxSelectionModel runat="server" />
                                                </SelectionModel>
                                                <ColumnModel runat="server">

                                                    <Columns>
                                                        <ext:RowNumbererColumn Width="35" runat="server" Text="ردیف" Align="Center" />
                                                        <ext:Column
                                                            runat="server"
                                                            Text="کد پرسنلی"
                                                            DataIndex="Code"
                                                            Width="100">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="نام و نام خانوادگی"
                                                            Sortable="true"
                                                            DataIndex="FullName"
                                                            MinWidth="150" Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="وضعیت شغلی"
                                                            Sortable="true"
                                                            DataIndex="JobStatusTitle"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="وضعیت اشتغال"
                                                            Sortable="true"
                                                            DataIndex="StatusTypeTitle"
                                                            Flex="1">
                                                        </ext:Column>
                                                    </Columns>
                                                </ColumnModel>
                                                <TopBar>
                                                    <ext:Toolbar runat="server">
                                                        <Items>
                                                            <ext:Button runat="server" Text="محاسبه گروهی" Icon="Calculator" Handler="groupSalaryCalculation(this.up('grid'))" />
                                                            <ext:Button runat="server" Text="تایید گروهی" Icon="CalculatorAdd" Handler="groupSalaryCalcConfirm(this.up('grid'), 8)" />
                                                            <ext:Button runat="server" Text="برگشت از تایید" Icon="CalculatorError" Handler="groupSalaryCalcConfirm(this.up('grid'), 0)" />
                                                            <ext:Button runat="server" Text="حذف محاسبه" Icon="CalculatorDelete" Handler="groupSalaryCalcDelete(this.up('grid'))" />
                                                        </Items>
                                                    </ext:Toolbar>
                                                </TopBar>

                                             
                                                <Plugins>
                                                    <ext:FilterHeader runat="server" />
                                                </Plugins>

                                            </ext:GridPanel>
                                        </Items>
                                    </ext:Panel>
                                </Items>

                            </ext:Panel>

                            <ext:UserControlLoader runat="server" Path="~\Modules\System\ReportDesigner.ascx" UserControlID="Salary;1" />

                            <ext:Panel ID="TabTaxInsuranceGroup" Icon="ApplicationLink" Layout="FitLayout" Title="تعریف گروه های مالیاتی و بیمه ای" RTL="true" runat="server">
                                <Items>
                                    <ext:GridPanel
                                        ID="gridTaxInsuranceGroup"
                                        runat="server"
                                        Frame="true">
                                        <Store>
                                            <ext:Store runat="server">

                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="ID" Type="Int" />
                                                            <ext:ModelField Name="Title" Type="String" />
                                                            <ext:ModelField Name="Type" />
                                                            <ext:ModelField Name="TypeTitle" Type="String" />
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
                                        <Plugins>
                                            <ext:RowEditing AutoCancel="false" CancelBtnText="انصراف" SaveBtnText="ذخیره" ClicksToEdit="1">
                                                <Listeners>
                                                    <Edit Handler="editTaxInsuranceGroup(this)"></Edit>
                                                </Listeners>

                                            </ext:RowEditing>
                                        </Plugins>
                                        <TopBar>
                                            <ext:Toolbar runat="server">
                                                <Items>
                                                    <ext:Button runat="server" Text="گروه جدید" Icon="Add">
                                                        <Listeners>
                                                            <Click Handler="addRecordGrid(this.up('grid'),null,true,true)" />
                                                        </Listeners>
                                                    </ext:Button>
                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <ColumnModel>
                                            <Columns>
                                                <ext:RowNumbererColumn Width="25" runat="server" />

                                                <ext:Column
                                                    Text="عنوان"
                                                    DataIndex="Title"
                                                    Width="400" runat="server">
                                                    <Editor>
                                                        <ext:TextField runat="server" AllowBlank="false" />
                                                    </Editor>
                                                </ext:Column>
                                                <ext:Column Text="نوع گروه" DataIndex="TypeTitle" Flex="1" runat="server">
                                                    <Editor>
                                                        <ext:ComboBox SelectOnTab="true" Editable="false" runat="server">
                                                            <Items>
                                                                <ext:ListItem Text="مالیاتی" Value="1" />
                                                                <ext:ListItem Text="بیمه ای" Value="2" />
                                                            </Items>
                                                        </ext:ComboBox>
                                                    </Editor>
                                                </ext:Column>

                                                <ext:CommandColumn runat="server" Width="60">
                                                    <Commands>
                                                        <ext:GridCommand Icon="Delete" CommandName="Delete">
                                                            <ToolTip Text="حذف" />
                                                        </ext:GridCommand>
                                                        <ext:CommandSeparator />
                                                        <ext:GridCommand Icon="NoteEdit" CommandName="Edit">
                                                            <ToolTip Text="ویرایش" />
                                                        </ext:GridCommand>
                                                    </Commands>
                                                    <Listeners>
                                                        <Command Handler="if(command ==='Edit'){editRecordGrid(this.up('grid'),record)}else{deleteTaxInsuranceGroup(record,this.up('grid'))}" />

                                                    </Listeners>
                                                </ext:CommandColumn>
                                            </Columns>
                                        </ColumnModel>
                                        <Listeners>
                                            <AfterRender Handler="getTaxInsuranceGroup(this, 0)" />

                                            <RowClick Handler="this.editingPlugin.cancelEdit()"></RowClick>
                                        </Listeners>
                                    </ext:GridPanel>
                                </Items>

                            </ext:Panel>

                            <ext:Panel ID="TabInsuranceFactor" Icon="ApplicationLink" Layout="BorderLayout"
                                Title=" تعریف ضرایب بیمه" RTL="true" runat="server" Frame="true">
                                <TopBar>
                                    <ext:Toolbar runat="server"  Height="40">

                                        <Items>
                                            <ext:ComboBox runat="server" Editable="false" AllowBlank="false" FieldLabel="سال" ID="ddlYearIG" LabelWidth="25" Width="100">
                                                <Listeners>
                                                    <AfterRender Handler="comboBoxYearBinder(this,true)" />
                                                    <Select Handler="changeInsuranceFactor(this, this.up('panel').down('#ddlMonthIG'), this.up('panel').down('#ddlTypeIG'))" />
                                                </Listeners>
                                            </ext:ComboBox>
                                            <ext:ComboBox runat="server" Editable="false" AllowBlank="false" FieldLabel="ماه" ID="ddlMonthIG" LabelAlign="Left" LabelWidth="50" LabelStyle="text-align:left" Width="150">
                                                <Listeners>
                                                    <AfterRender Handler="comboBoxMonthBinder(this,true)" />
                                                    <Select Handler="changeInsuranceFactor(this.up('panel').down('#ddlYearIG'), this,this.up('panel').down('#ddlTypeIG'))" />
                                                </Listeners>
                                            </ext:ComboBox>
                                            <ext:ComboBox runat="server" Editable="false" FieldLabel="گروه بیمه ای" ID="ddlTypeIG" LabelWidth="100" Width="300" LabelStyle="text-align:left">
                                                <Listeners>
                                                    <AfterRender Handler="getTaxInsuranceGroup(this,2)" />
                                                    <Select Handler="changeInsuranceFactor(this.up('panel').down('#ddlYearIG'), this.up('panel').down('#ddlMonthIG'), this)" />
                                                </Listeners>
                                            </ext:ComboBox>
                                        </Items>
                                    </ext:Toolbar>
                                </TopBar>

                                <Items>

                                    <ext:FormPanel Layout="TableLayout" runat="server" ID="fpInsuranceFactors" Title="ضرایب بیمه" Split="true" Region="West" Frame="true">
                                        <LayoutConfig>
                                            <ext:TableLayoutConfig Columns="1" />
                                        </LayoutConfig>
                                        <FieldDefaults LabelAlign="Top" MsgTarget="Side" AllowBlank="false" BlankText="این فیلد باید پر باشد" />

                                        <Items>
                                            <ext:NumberField runat="server" ID="txt_EmployerPercent" FieldLabel="درصد کارفرما" />
                                            <ext:NumberField runat="server" ID="txt_PersonnelPercent" FieldLabel="درصد کارمند" />
                                            <ext:NumberField runat="server" ID="txt_UnemploymentPercent" FieldLabel="درصد بیمه بیکاری" />
                                            <ext:TextField runat="server" ID="txt_InsuranceLimit" FieldLabel="سقف مبلغ بیمه(روزانه)" MaskRe="/[0-9-]/" EnableKeyEvents="true">
                                                <Listeners>
                                                    <KeyUp Handler="this.setValue(digitGrouping(this.value.split(',').join('')))" />
                                                </Listeners>
                                            </ext:TextField>

                                        </Items>
                                    </ext:FormPanel>
                                    <ext:Panel runat="server" Title="عوامل مشمول بیمه" Region="Center" Layout="FitLayout" Frame="true">
                                        <Items>
                                            <ext:CheckboxGroup runat="server" ID="chkgInsurance_ItemsID" Vertical="true" ColumnsNumber="5" />
                                        </Items>
                                    </ext:Panel>
                                </Items>
                                <BottomBar>
                                    <ext:Toolbar runat="server" RTL="false">
                                        <Items>
                                            <ext:Button runat="server" Text="ذخیره" Icon="Disk" Handler="editInsuranceFactor(this.up('panel'))" />
                                        </Items>
                                    </ext:Toolbar>
                                </BottomBar>
                                <Listeners>
                                    <AfterRender Handler="getBenefitItems(this.down('#chkgInsurance_ItemsID'))" />
                                </Listeners>
                            </ext:Panel>

                            <ext:Panel ID="TabTaxTables" Icon="TableGear" Layout="BorderLayout"
                                Title=" تعریف جداول مالیاتی" RTL="true" runat="server" Frame="true">
                                <TopBar >
                                    <ext:Toolbar runat="server" Height="40">

                                        <Items>
                                            <ext:ComboBox runat="server" Editable="false" AllowBlank="false" FieldLabel="سال" ID="ddlYearTG" LabelWidth="25" Width="100">
                                                <Listeners>
                                                    <AfterRender Handler="comboBoxYearBinder(this,true)" />
                                                    <Select Handler="changeTaxTable(this, this.up('panel').down('#ddlMonthTG'), this.up('panel').down('#ddlTypeTG'))" />
                                                </Listeners>
                                            </ext:ComboBox>
                                            <ext:ComboBox runat="server" Editable="false" AllowBlank="false" FieldLabel="ماه" ID="ddlMonthTG" LabelAlign="Left" LabelWidth="50" LabelStyle="text-align:left" Width="150">
                                                <Listeners>
                                                    <AfterRender Handler="comboBoxMonthBinder(this,true)" />
                                                    <Select Handler="changeTaxTable(this.up('panel').down('#ddlYearTG'), this,this.up('panel').down('#ddlTypeTG'))" />
                                                </Listeners>
                                            </ext:ComboBox>
                                            <ext:ComboBox runat="server" Editable="false" FieldLabel="گروه مالیاتی" ID="ddlTypeTG" LabelWidth="100" Width="300" LabelStyle="text-align:left">
                                                <Listeners>
                                                    <AfterRender Handler="getTaxInsuranceGroup(this,1)" />
                                                    <Select Handler="changeTaxTable(this.up('panel').down('#ddlYearTG'), this.up('panel').down('#ddlMonthTG'), this)" />
                                                </Listeners>
                                            </ext:ComboBox>
                                        </Items>
                                    </ext:Toolbar>
                                </TopBar>

                                <Items>


                                    <ext:GridPanel
                                        ID="gridTaxTable"
                                        runat="server"
                                        Frame="true" Split="true" Region="West" Title="جدول مالیاتی" Width="500">
                                        <Store>
                                            <ext:Store runat="server">

                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="ID" Type="Int" />
                                                            <ext:ModelField Name="FromValue" Type="String" />
                                                            <ext:ModelField Name="ToValue" Type="String" />
                                                            <ext:ModelField Name="TaxPercent" Type="Int" />
                                                            <ext:ModelField Name="TaxGroupTitle" Type="String" />
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
                                        <Plugins>
                                            <ext:RowEditing AutoCancel="false" CancelBtnText="انصراف" SaveBtnText="ذخیره" ClicksToEdit="1">
                                                <Listeners>
                                                    <Edit Handler="editTaxTable(this)"></Edit>
                                                </Listeners>

                                            </ext:RowEditing>
                                        </Plugins>
                                        <TopBar>
                                            <ext:Toolbar runat="server">
                                                <Items>
                                                    <ext:Button runat="server" Text="بازه جدید" Icon="Add">
                                                        <Listeners>
                                                            <Click Handler="addRecordGrid(this.up('grid'),null,true,true)" />
                                                        </Listeners>
                                                    </ext:Button>
                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <ColumnModel>
                                            <Columns>
                                                <ext:RowNumbererColumn Width="25" runat="server" />

                                                <ext:Column
                                                    Text="از حقوق"
                                                    DataIndex="FromValue"
                                                    Flex="1" runat="server" Align="Center">
                                                    <Editor>
                                                        <ext:TextField runat="server" AllowBlank="false" EnableKeyEvents="true">
                                                            <Listeners>
                                                                <KeyUp Handler="this.setValue(digitGrouping(this.value.split(',').join('')))" />
                                                            </Listeners>
                                                        </ext:TextField>
                                                    </Editor>
                                                </ext:Column>
                                                <ext:Column Text="تا حقوق" DataIndex="ToValue" Flex="1" runat="server"  Align="Center">
                                                    <Editor>
                                                        <ext:TextField runat="server" AllowBlank="false" EnableKeyEvents="true">
                                                            <Listeners>
                                                                <KeyUp Handler="this.setValue(digitGrouping(this.value.split(',').join('')))" />
                                                            </Listeners>
                                                        </ext:TextField>
                                                    </Editor>
                                                </ext:Column>
                                                <ext:Column Text="درصد مالیات" DataIndex="TaxPercent" Width="120" runat="server" Align="Center">
                                                    <Editor>
                                                        <ext:TextField runat="server" AllowBlank="false" />
                                                    </Editor>
                                                </ext:Column>
                                                <ext:Column Text="گروه مالیاتی" DataIndex="TaxGroupTitle" Flex="1" runat="server"  Align="Center"/>


                                                <ext:CommandColumn runat="server" Width="60">
                                                    <Commands>
                                                        <ext:GridCommand Icon="Delete" CommandName="Delete">
                                                            <ToolTip Text="حذف" />
                                                        </ext:GridCommand>
                                                        <ext:CommandSeparator />
                                                        <ext:GridCommand Icon="NoteEdit" CommandName="Edit">
                                                            <ToolTip Text="ویرایش" />
                                                        </ext:GridCommand>
                                                    </Commands>
                                                    <Listeners>
                                                        <Command Handler="if(command ==='Edit'){editRecordGrid(this.up('grid'),record)}else{deleteTaxTaxTable(record,this.up('grid'))}" />

                                                    </Listeners>
                                                </ext:CommandColumn>
                                            </Columns>
                                        </ColumnModel>
                                        <Listeners>
                                            <AfterRender Handler="" />

                                            <RowClick Handler="this.editingPlugin.cancelEdit()"></RowClick>
                                        </Listeners>
                                    </ext:GridPanel>


                                    <ext:Panel runat="server" Title="عوامل مشمول مالیات" Region="Center" Layout="FitLayout" Frame="true" ID="pnlTaxTableItems">
                                        <Items>
                                            <ext:CheckboxGroup runat="server" ID="chkgTaxTable_ItemsID" Vertical="true" ColumnsNumber="5" />
                                        </Items>
                                    </ext:Panel>
                                </Items>
                                <BottomBar>
                                    <ext:Toolbar runat="server" RTL="false">
                                        <Items>
                                            <ext:Button runat="server" Text="ذخیره" Icon="Disk" Handler="editTaxTable(null,this.up('panel'))" />
                                        </Items>
                                    </ext:Toolbar>
                                </BottomBar>
                                <Listeners>
                                    <AfterRender Handler="getBenefitItems(this.down('#chkgTaxTable_ItemsID'))" />
                                </Listeners>
                            </ext:Panel>
                        </Items>
                        <%--  --%>
                    </ext:TabPanel>

                </Items>



                <%--<Listeners>
                    <AfterRender Handler="showCompanyInfo();" />
                </Listeners>--%>
            </ext:Window>

        </Window>
    </Module>
</ext:DesktopModuleProxy>

