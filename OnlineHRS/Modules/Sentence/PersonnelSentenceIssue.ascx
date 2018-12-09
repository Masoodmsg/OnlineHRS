<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<ext:DesktopModuleProxy ID="DesktopModuleProxySentencet" runat="server">
    <Module ModuleID="SentenceManagementModule1">
        <Shortcut Name="احکام" IconCls="x-sentence-icon" SortIndex="8" />
        <Launcher Text="احکام" Icon="ScriptEdit" />
        <Window>

            <ext:Window ID="PersonnelSentenceIssuetWindow" runat="server" Height="550"
                Icon="UserEdit" Title="احکام پرسنل" Width="1000" BodyPadding="5"
                CloseAction="Destroy" RTL="true" IDMode="Static" ManageHeight="true" Layout="BorderLayout">

                <Items>
                    <%--<ext:TabPanel
            ID="TabPanelPersonnelSentencet"
            runat="server"
            ActiveTabIndex="0"
            Plain="false" Layout="FitLayout" BodyPadding="1">
            <LayoutConfig>
                <ext:FitLayoutConfig ItemCls="width-full" />
            </LayoutConfig>
            <Items>
                <ext:Panel ID="TabPersonnelSentence" runat="server"
                    Icon="PageCopy" Title="تعریف انواع حکم" Layout="BorderLayout">
                    <Items>--%>

                    <ext:GridPanel
                        runat="server"
                        Region="West" Collapsed="false" Collapsible="true" Icon="Script" Split="true"
                        MultiSelect="false"
                        AutoLoad="false"
                        ID="gridPersonnelSentences" Title="احکام" Width="430">
                        <Store>
                            <ext:Store runat="server">
                                <Model>
                                    <ext:Model runat="server">
                                        <Fields>
                                            <ext:ModelField Name="ID" Type="Int" />
                                            <ext:ModelField Name="Title" />
                                            <ext:ModelField Name="SentenceNo" />
                                            <ext:ModelField Name="IssueDate" />
                                            <ext:ModelField Name="ExecuteDate" />
                                            <ext:ModelField Name="Status" Type="Int" />
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
                                    Text="نوع حکم"
                                    DataIndex="Title"
                                    Width="120">
                                </ext:Column>
                                <ext:Column
                                    runat="server"
                                    Text="شماره حکم"
                                    Sortable="true"
                                    DataIndex="SentenceNo"
                                    Flex="1">
                                </ext:Column>
                                <ext:Column
                                    runat="server"
                                    Text="تاریخ صدور"
                                    Sortable="true"
                                    DataIndex="IssueDate"
                                    Flex="1">
                                </ext:Column>
                                <ext:Column
                                    runat="server"
                                    Text="تاریخ اجرا"
                                    Sortable="true"
                                    DataIndex="ExecuteDate"
                                    Flex="1">
                                </ext:Column>


                                <ext:CommandColumn runat="server" Width="30">
                                    <Commands>
                                        <ext:GridCommand Icon="Delete" CommandName="Delete">
                                            <ToolTip Text="حذف" />
                                        </ext:GridCommand>
                                    </Commands>

                                    <Listeners>
                                        <Command Handler="personnelSentenceEdit('Delete', this.up().up())" />
                                    </Listeners>
                                </ext:CommandColumn>

                            </Columns>
                        </ColumnModel>

                        <TopBar>
                            <ext:Toolbar runat="server">
                                <Items>
                                    <ext:Button runat="server" Text="حکم جدید" Icon="Add" Handler="newPersonnelSentence(this.up('grid'))" />
                                    <%--<ext:Button runat="server" Text="ویرایش حکم" Icon="NoteEdit" Handler="showSentenceTypeWindow(this.up().up('grid'),'Edit',getValueGrid(this.up().up(),'ID'))" />--%>
                                    <ext:Button runat="server" Text="حذف حکم" Icon="Delete" Handler="personnelSentenceEdit('Delete',  this.up('grid'))" />
                                </Items>
                            </ext:Toolbar>
                        </TopBar>
                        <Listeners>
                            <AfterRender Handler="getPersonnelSentences(this,12/*personnelID*/)" />
                            <RowClick Handler="getPersonnelSentenceInfo(this)" />
                        </Listeners>

                    </ext:GridPanel>


                    <ext:Panel ID="TabPersonnelSentenceInfo" runat="server" Layout="AccordionLayout" Region="Center" AnimCollapse="true"
                        Title="اطلاعات حکم" Icon="Information">
                        <LayoutConfig>
                            <ext:AccordionLayoutConfig Animate="true" Multi="true" ReserveScrollbar="true" />
                        </LayoutConfig>
                        <Items>
                            <ext:FormPanel runat="server" Layout="TableLayout" RTL="true" BodyPadding="5" AnimCollapse="true" AutoScroll="true"
                                Title="مشخصات حکم" Icon="ScriptEdit" ID="PS_frmPSP">

                                <LayoutConfig>
                                    <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                                </LayoutConfig>
                                <FieldDefaults LabelAlign="Top" />
                                <Items>
                                    <ext:TextField runat="server" ID="txtSentence_ExecuteDate" FieldLabel="تاریخ اجرا" Icon="Date" RTL="false" LabelStyle="direction:rtl"
                                        Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="0" AllowBlank="false" BlankText=".این فیلد باید پر باشد" InputMaskString="9999/99/99">
                                        <%--<Plugins>
                                            <ext:InputMask runat="server" Mask="yzzz/mn/dt" AllowInvalid="true">
                                                <MaskSymbols>
                                                    <ext:MaskSymbol Name="d" Regex="[0123]" Placeholder="D" />
                                                    <ext:MaskSymbol Name="t" Regex="[0-9]" Placeholder="D" />
                                                    <ext:MaskSymbol Name="m" Regex="[01]" Placeholder="M" />
                                                    <ext:MaskSymbol Name="n" Regex="[0-9]" Placeholder="M" />
                                                    <ext:MaskSymbol Name="y" Regex="[1]" Placeholder="Y" />
                                                    <ext:MaskSymbol Name="z" Regex="[0-9]" Placeholder="Y" />
                                                </MaskSymbols>
                                            </ext:InputMask>
                                        </Plugins>--%>

                                    </ext:TextField>
                                    <ext:TextField runat="server" ID="txtSentence_IssueDate" FieldLabel="تاریخ صدور" Icon="Date" RTL="false" LabelStyle="direction:rtl"
                                        Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="1" AllowBlank="false" BlankText=".این فیلد باید پر باشد" InputMaskString="9999/99/99">
                                        <%--<Plugins>
                                            <ext:InputMask runat="server" Mask="yzzz/mn/dt" AllowInvalid="true">
                                                <MaskSymbols>
                                                    <ext:MaskSymbol Name="d" Regex="[0123]" Placeholder="D" />
                                                    <ext:MaskSymbol Name="t" Regex="[0-9]" Placeholder="D" />
                                                    <ext:MaskSymbol Name="m" Regex="[01]" Placeholder="M" />
                                                    <ext:MaskSymbol Name="n" Regex="[0-9]" Placeholder="M" />
                                                    <ext:MaskSymbol Name="y" Regex="[1]" Placeholder="Y" />
                                                    <ext:MaskSymbol Name="z" Regex="[0-9]" Placeholder="Y" />
                                                </MaskSymbols>
                                            </ext:InputMask>
                                        </Plugins>--%>

                                    </ext:TextField>
                                    <ext:TextField runat="server" ID="txtSentence_EndDate" FieldLabel="تاریخ پایان" Icon="Date" RTL="false" LabelStyle="direction:rtl"
                                        Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="8" AllowBlank="false" BlankText=".این فیلد باید پر باشد" InputMaskString="9999/99/99">
                                        <%--<Plugins>
                                            <ext:InputMask runat="server" Mask="yzzz/mn/dt" AllowInvalid="true">
                                                <MaskSymbols>
                                                    <ext:MaskSymbol Name="d" Regex="[0123]" Placeholder="D" />
                                                    <ext:MaskSymbol Name="t" Regex="[0-9]" Placeholder="D" />
                                                    <ext:MaskSymbol Name="m" Regex="[01]" Placeholder="M" />
                                                    <ext:MaskSymbol Name="n" Regex="[0-9]" Placeholder="M" />
                                                    <ext:MaskSymbol Name="y" Regex="[1]" Placeholder="Y" />
                                                    <ext:MaskSymbol Name="z" Regex="[0-9]" Placeholder="Y" />
                                                </MaskSymbols>
                                            </ext:InputMask>
                                        </Plugins>--%>

                                    </ext:TextField>
                                    <ext:TextField runat="server" ID="txtSentence_ConfirmDate" FieldLabel="تاریخ تایید حکم" Icon="Date" RTL="false" LabelStyle="direction:rtl"
                                        Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="8" AllowBlank="false" BlankText=".این فیلد باید پر باشد" InputMaskString="9999/99/99">
                                        <%--<Plugins>
                                            <ext:InputMask runat="server" Mask="yzzz/mn/dt" AllowInvalid="true">
                                                <MaskSymbols>
                                                    <ext:MaskSymbol Name="d" Regex="[0123]" Placeholder="D" />
                                                    <ext:MaskSymbol Name="t" Regex="[0-9]" Placeholder="D" />
                                                    <ext:MaskSymbol Name="m" Regex="[01]" Placeholder="M" />
                                                    <ext:MaskSymbol Name="n" Regex="[0-9]" Placeholder="M" />
                                                    <ext:MaskSymbol Name="y" Regex="[1]" Placeholder="Y" />
                                                    <ext:MaskSymbol Name="z" Regex="[0-9]" Placeholder="Y" />
                                                </MaskSymbols>
                                            </ext:InputMask>
                                        </Plugins>--%>

                                    </ext:TextField>

                                    <ext:ComboBox Editable="false" TabIndex="5" ID="cmbSentence_Type" runat="server" FieldLabel="نوع حکم" ColSpan="2" AllowBlank="false" BlankText=".این فیلد باید پر باشد">

                                        <Listeners>
                                            <AfterRender Handler="getPersonnelSentenceTypes(this, 12/*personnelID*/)" />
                                            <%--<Change Handler="this.next().setValue(this.rawValue);getSentenceTypeInstanceItems(this)" />--%>
                                            <Select Handler="this.next().setValue(this.rawValue);getSentenceTypeInstanceItems(this)" />
                                        </Listeners>
                                    </ext:ComboBox>
                                    <ext:TextField runat="server" ID="txtPS_Title" FieldLabel="عنوان حکم" AllowBlank="false" BlankText=".این فیلد باید پر باشد" />
                                    <ext:TextField runat="server" ID="txtPS_SentenceNo" FieldLabel="شماره حکم" />
                                    <ext:TextArea runat="server" ID="txtPS_Description" FieldLabel="شرح حکم" ColSpan="2" />
                                </Items>
                            </ext:FormPanel>
                        </Items>
                    </ext:Panel>
                    <ext:TabPanel ID="tabPanelPSI" runat="server" Layout="FitLayout" Region="East"
                        Title="عوامل و امتیازات حکم" Split="true" Icon="Coins" Collapsible="true" Width="300">
                        <LayoutConfig>
                            <ext:FitLayoutConfig ItemCls="width-full" />
                        </LayoutConfig>
                        <Items>
                            <ext:GridPanel
                                runat="server"
                                Region="Center"
                                MultiSelect="true"
                                ID="gridSPItems" AutoLoad="false" Title="عوامل در حکم" Icon="Coins">

                                <Store>
                                    <ext:Store
                                        runat="server" AutoLoad="false">
                                        <Model>
                                            <ext:Model runat="server">
                                                <Fields>
                                                    <%--Sentence_TypeInstanceItems--%>
                                                    <ext:ModelField Name="ID" Type="Int" />
                                                    <ext:ModelField Name="ItemID" Type="Int" />
                                                    <ext:ModelField Name="Title" />
                                                    <ext:ModelField Name="Value" Type="Float" />
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


                                        <%-- <ext:NumberColumn runat="server" Text="مقدار عامل" Flex="1" DataIndex="Value" />--%>
                                        <ext:Column
                                            runat="server"
                                            Text="مقدار عامل"
                                            DataIndex="Value"
                                          
                                            Align="Center" Flex="1">
                                            <Renderer Format="UsMoney" />
                                            <Editor>
                                                <ext:NumberField runat="server" AllowBlank="false" MinValue="0" MaxValue="1000000000" >
                                                </ext:NumberField>
                                            </Editor>
                                        </ext:Column>
                                    </Columns>
                                </ColumnModel>
                                <%-- <Listeners>
                                    <AfterRender Handler="getSentenceItems(this)" />
                                </Listeners>--%>
                                <Plugins>
                                    <ext:CellEditing runat="server" ClicksToEdit="1" />
                                </Plugins>
                            </ext:GridPanel>
                        </Items>
                    </ext:TabPanel>
                </Items>
                <Buttons>
                    <ext:Button Text="ذخیره تغییرات" runat="server" Icon="Disk" ID="PS_btnPSS">
                        <Listeners>
                            <Click Handler="personnelSentenceEdit('Add',this.up('window').down('#PS_frmPSP'))" />
                        </Listeners>
                    </ext:Button>
                    <ext:Button Text="تایید حکم" runat="server" Icon="Tick" ID="PS_btnPSC">
                        <Listeners>
                            <Click Handler="personnelSentenceConfirm(this.up('window'))" />
                        </Listeners>
                    </ext:Button>
                </Buttons>
            </ext:Window>


        </Window>
    </Module>
</ext:DesktopModuleProxy>

