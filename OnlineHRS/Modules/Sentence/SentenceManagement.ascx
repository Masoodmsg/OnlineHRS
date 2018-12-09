<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>


<ext:DesktopModuleProxy ID="DesktopModuleProxySentencet" runat="server">
    <Module ModuleID="SentenceManagementModule">
        <Shortcut Name="احکام" IconCls="x-sentence-icon" SortIndex="8" />
        <Launcher Text="احکام" Icon="ScriptEdit" />
        <Window>
            <ext:Window ID="SentencetWindow" runat="server" Height="600"
                Icon="ScriptEdit" Title="احکام" Width="1100" BodyPadding="5"
                Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static" ManageHeight="true">

                <Items>
                    <ext:TabPanel
                        ID="TabPanelSentencet"
                        runat="server"
                        ActiveTabIndex="0"
                        Plain="false" Layout="FitLayout" BodyPadding="1">
                       <%-- <LayoutConfig>
                            <ext:FitLayoutConfig ItemCls="width-full" />
                        </LayoutConfig>--%>
                        <Items>
                            <ext:Panel ID="TabSentenceItems" runat="server" Title="تعریف عوامل حکم" Icon="Coins" Layout="BorderLayout">
                                <Items>
                                    <ext:Panel runat="server" ID="pnlSentencetItemsSearch" Layout="TableLayout" RTL="true" BodyPadding="5" Title="جستجو" Icon="Find" Frame="true" Region="North">

                                        <LayoutConfig>
                                            <ext:TableLayoutConfig Columns="3" ItemCls="width-full" />
                                        </LayoutConfig>

                                        <Items>
                                            <ext:TextField runat="server" ID="txtSIF_Title" FieldLabel="عنوان عامل"     />
                                            <ext:TextField runat="server" ID="txtSIF_EnglishTitle" FieldLabel="عنوان لاتین" />
                                            <ext:TextField runat="server" ID="txtSIF_Code" FieldLabel="کد عامل" MaskRe="/[0-9-]/" />
                                            <ext:TagField MultiSelect="true" Editable="false" Floating="false" TabIndex="10" ID="tagSIF_EmploymentType" runat="server" FieldLabel="نوع استخدام">
                                                <Listeners>
                                                    <AfterRender Handler="comboBoxConstantBinder(this, 'BaseInfo', 'EmploymentType', 1, 'ID')" />
                                                </Listeners>
                                            </ext:TagField>
                                            <ext:ComboBox Editable="false" TabIndex="4" ID="cmbSIF_CalcType" runat="server" FieldLabel="نوع محاسبه">

                                                <Items>
                                                    <ext:ListItem Text="همه" Value="-1" />
                                                    <ext:ListItem Text="روزانه" Value="1" />
                                                    <ext:ListItem Text="ماهانه" Value="2" />
                                                </Items>
                                                <SelectedItems>
                                                    <ext:ListItem Value="-1" />
                                                </SelectedItems>
                                            </ext:ComboBox>
                                            <%-- <ext:Checkbox runat="server" FieldLabel="محاسبه در جمع" ID="chkSentencetItemF_IsAddSum" Checked="true" />--%>
                                        </Items>
                                        <Buttons>
                                            <ext:Button Text="جستجو" runat="server" Icon="Zoom">
                                                <Listeners>
                                                    <Click Handler="getSentenceItems(this.up('panel'))" />
                                                </Listeners>
                                            </ext:Button>
                                        </Buttons>

                                       <%-- <KeyMap runat="server">
                                            <Binding>
                                                <ext:KeyBinding Handler="getSentenceItems(App.pnlSentencetItemsSearch)">
                                                    <Keys>
                                                        <ext:Key Code="ENTER" />
                                                    </Keys>
                                                </ext:KeyBinding>
                                            </Binding>
                                        </KeyMap>--%>
                                        <KeyMap runat="server">
                                            <ext:KeyBindItem Handler="getSentenceItems(App.pnlSentencetItemsSearch)" Key="ENTER" />

                                        </KeyMap>
                                    </ext:Panel>

                                    <ext:GridPanel
                                        runat="server"
                                        Region="Center"
                                        MultiSelect="false"
                                        ID="gridSentencetItem" AutoLoad="false" StyleSpec="margin-top:5px">
                                        <TopBar>
                                            <ext:Toolbar runat="server">
                                                <Items>
                                                    <ext:Button runat="server" Text="عامل جدید" Icon="CoinsAdd" Handler="showSentenceItemWindow(this.up().up().up('panel'),'Add',0)" />
                                                    <ext:Button runat="server" Text="ویرایش عامل" Icon="Coins" Handler="showSentenceItemWindow(this.up().up().up('panel'),'Edit',getValueGrid(this.up().up(),'ID'))" />
                                                    <ext:Button runat="server" Text="حذف عامل" Icon="CoinsDelete" Handler="SaveSentenceItem('Delete', getValueGrid(this.up().up(),'ID'), this.up().up())" />
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
                                                            <ext:ModelField Name="Code" />
                                                            <ext:ModelField Name="Title" />
                                                            <ext:ModelField Name="EnglishTitle" />
                                                            <ext:ModelField Name="EmploymentTypeTitle" />
                                                            <ext:ModelField Name="IsAddSum" Type="Boolean" />
                                                            <ext:ModelField Name="CalcTypeTitle" />

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
                                                <ext:Column
                                                    runat="server"
                                                    Text="کد عامل"
                                                    DataIndex="Code"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="عنوان لاتین"
                                                    Sortable="true"
                                                    DataIndex="EnglishTitle"
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
                                                    Text="محاسبه در جمع"
                                                    Sortable="true"
                                                    DataIndex="IsAddSum"
                                                    Flex="1">
                                                </ext:CheckColumn>
                                                <ext:Column
                                                    runat="server"
                                                    Text="نوع محاسبه"
                                                    Sortable="true"
                                                    DataIndex="CalcTypeTitle"
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
                                                        <Command Handler="if(command ==='Edit'){showSentenceItemWindow(this.up().up().up('panel'),'Edit',record.data.ID)}else{SaveSentenceItem('Delete', record.data.ID, this.up().up())}" />
                                                    </Listeners>
                                                </ext:CommandColumn>
                                            </Columns>
                                        </ColumnModel>
                                        <Listeners>
                                            <AfterRender Handler="getSentenceItems(this.prev('panel'))" />
                                        </Listeners>

                                    </ext:GridPanel>
                                </Items>

                            </ext:Panel>

                            <ext:Panel ID="TablSentenceTypes" runat="server"
                                Icon="PageCopy" Title="تعریف انواع حکم" Layout="BorderLayout">
                                <Items>

                                    <ext:GridPanel
                                        runat="server"
                                        Region="West" Collapsed="false" Collapsible="true" Icon="Script" Split="true"
                                        MultiSelect="false"
                                        AutoLoad="false"
                                        ID="gridSentencetTypes" Title="انواع حکم" Width="700">
                                        <Store>
                                            <ext:Store runat="server">
                                                <Model>
                                                    <ext:Model runat="server">
                                                        <Fields>
                                                            <ext:ModelField Name="ID" Type="Int" />
                                                            <ext:ModelField Name="Title" />
                                                            <ext:ModelField Name="EmploymentTypeTitle" />
                                                            <ext:ModelField Name="CreateDate" />
                                                            <ext:ModelField Name="JobStatusTitle" />
                                                            <ext:ModelField Name="IssueTypeTitle" />
                                                            <ext:ModelField Name="TypeInstanceID" />
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
                                                    Text="عنوان حکم"
                                                    DataIndex="Title"
                                                    Width="170">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="نوع استخدام"
                                                    Sortable="true"
                                                    DataIndex="EmploymentTypeTitle"
                                                    Flex="1">
                                                </ext:Column>
                                                <ext:Column
                                                    runat="server"
                                                    Text="نوع صدور"
                                                    Sortable="true"
                                                    DataIndex="IssueTypeTitle"
                                                    Flex="1">
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
                                                        <ext:GridCommand Icon="NoteEdit" CommandName="Edit">
                                                            <ToolTip Text="ویرایش" />
                                                        </ext:GridCommand>
                                                    </Commands>

                                                    <Listeners>
                                                        <Command Handler="if(command ==='Edit'){showSentenceTypeWindow(this.up().up(),'Edit',record.data.ID)}else{SaveSentenceType('Delete', record.data.ID, this.up().up())}" />
                                                    </Listeners>
                                                </ext:CommandColumn>

                                            </Columns>
                                        </ColumnModel>

                                        <TopBar>
                                            <ext:Toolbar runat="server">
                                                <Items>
                                                    <ext:Button runat="server" Text="نوع حکم جدید" Icon="ScriptAdd" Handler="showSentenceTypeWindow(this.up().up('grid'),'Add',0)" />
                                                    <ext:Button runat="server" Text="ویرایش نوع حکم" Icon="ScriptEdit" Handler="showSentenceTypeWindow(this.up().up('grid'),'Edit',getValueGrid(this.up().up(),'ID'))" />
                                                    <ext:Button runat="server" Text="حذف نوع حکم" Icon="ScriptDelete" Handler="SaveSentenceType('Delete', getValueGrid(this.up().up(),'ID'), this.up().up())" />
                                                </Items>
                                            </ext:Toolbar>
                                        </TopBar>
                                        <Listeners>
                                            <AfterRender Handler="getSentenceTypes(this)" />
                                            <RowClick Handler="getSentenceTypeItems(this)" />
                                        </Listeners>

                                    </ext:GridPanel>


                                    <ext:TabPanel ID="TabPanelSentencetType" runat="server" Layout="BorderLayout" Region="Center"
                                        Title="عوامل و امتیازات نوع حکم" Icon="PageEdit">

                                        <Items>
                                            <ext:GridPanel
                                                runat="server"
                                                Region="Center"
                                                MultiSelect="true"
                                                ID="gridSentenceTypeItems" AutoLoad="false" Title="عوامل در نوع حکم" Icon="Coins">

                                                <Store>
                                                    <ext:Store
                                                        runat="server" AutoLoad="false">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="ID" Type="Int" />
                                                                    <%--<ext:ModelField Name="ItemID" Type="Int" />--%>
                                                                    <ext:ModelField Name="Title" />
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
                                                            Flex="1">
                                                        </ext:Column>
                                                    </Columns>
                                                </ColumnModel>
                                                <Listeners>
                                                    <AfterRender Handler="getSentenceItems(this)" />
                                                    <RowMouseUp Fn="rowMouseUpEvent" />
                                                </Listeners>
                                                <Buttons>
                                                    <ext:Button runat="server" Icon="Disk" Text="ذخیره">
                                                        <Listeners>
                                                            <Click Handler="SaveSentenceTypeInstanceItems(this.up('grid'))" />
                                                        </Listeners>
                                                    </ext:Button>
                                                </Buttons>

                                            </ext:GridPanel>
                                        </Items>
                                    </ext:TabPanel>
                                </Items>
                            </ext:Panel>

                            <ext:UserControlLoader runat="server" Path="~\Modules\Personnel\PersonnelSearch.ascx" UserControlID="~\Modules\Sentence\PersonnelSentenceActionPanel.ascx;showPersonnelSentencesWindow(this.up('window'),this);صدور احکام پرسنلی;TabPersonnelSentence" />
                        </Items>

                    </ext:TabPanel>

                </Items>



                <%--<Listeners>
                    <AfterRender Handler="showCompanyInfo();" />
                </Listeners>--%>
            </ext:Window>

        </Window>
    </Module>
</ext:DesktopModuleProxy>

