<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AttendanceShifts.aspx.cs" Inherits="OnlineHRS.ModalWindowPages.AttendanceShifts" %>

<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <%-- <script src="../Assets/utility.js"></script>
    <script src="../Assets/salary.js"></script>
    <script src="Assets/EntityClasses.js"></script>
    <script src="Assets/FarsiType.js"></script>
    <script src="Assets/ModalWindows.js"></script>--%>

    <link href="../Resources/IconShortcuts/desktop.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <ext:ResourceManager ID="ResourceManager1" runat="server" RTL="true" Theme="Gray" AjaxTimeout="3600000" ShowWarningOnAjaxFailure="false" DisableViewState="true">
        </ext:ResourceManager>

        <ext:Window ID="ShiftWindow" runat="server" Height="600" Width="900" AutoScroll="true" Maximizable="false" Icon="CalendarViewDay" Title="کد حضور"
            Layout="FitLayout" CloseAction="Destroy" IDMode="Static" RTL="true">
            <LayoutConfig>
                <ext:FitLayoutConfig ItemCls="width-full" />
            </LayoutConfig>
            <Items>
                <ext:TabPanel
                    ID="TabShiftInfo"
                    runat="server"
                    ActiveTabIndex="0"
                    Width="600"
                    Height="250"
                    Plain="false" Layout="FitLayout" BodyPadding="1">
                    <Items>

                        <ext:FormPanel ID="formShiftInfo" runat="server" Frame="true" Header="false" AutoHeight="true"
                            Layout="TableLayout" AutoScroll="true" Title="اطلاعات شیفت" Icon="CalendarEdit">
                            <LayoutConfig>
                                <ext:TableLayoutConfig Columns="1" ItemCls="width-full" />
                            </LayoutConfig>
                            <FieldDefaults LabelAlign="Right" />

                            <Items>

                                <ext:FieldSet
                                    runat="server"
                                    Flex="1" Layout="TableLayout">
                                    <LayoutConfig>
                                        <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                                    </LayoutConfig>
                                    <Items>
                                        <ext:TextField runat="server" ID="Shift_Title" LabelWidth="70" Margin="10" FieldLabel="عنوان" AllowBlank="false" BlankText=".این فیلد باید پر باشد" ColSpan="2" />
                                        <ext:ComboBox runat="server" ID="Shift_ShiftType" FieldLabel="نوع نوبت کاری" LabelAlign="Right" LabelWidth="80" Margin="8" Editable="false">
                                            <Items>
                                                <ext:ListItem Text="عادی" Value="1" />
                                                <ext:ListItem Text="10 درصد" Value="10" />
                                                <ext:ListItem Text="15 درصد" Value="15" />
                                                <ext:ListItem Text="22.5 درصد" Value="22" />
                                                <ext:ListItem Text="35 درصد" Value="35" />
                                            </Items>
                                            <SelectedItems>
                                                <ext:ListItem Value="1" />
                                            </SelectedItems>

                                        </ext:ComboBox>
                                        <ext:Checkbox runat="server" ID="Shift_IsBaseShift" BoxLabel="شیفت پایه" LabelAlign="Right" Margin="10" />
                                    </Items>

                                </ext:FieldSet>
                                <ext:FieldSet
                                    runat="server"
                                    Flex="1"
                                    Title=" اضافه کار"
                                    Layout="TableLayout" Collapsible="true">

                                    <LayoutConfig>
                                        <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                                    </LayoutConfig>

                                    <Defaults>
                                        <ext:Parameter Name="Margin" Value="10" Mode="Raw" />
                                        <ext:Parameter Name="InputWrapCls" Value="time-width x-form-text-wrap-default" Mode="Value" />
                                    </Defaults>

                                    <Items>
                                        <ext:TextField runat="server" ID="Shift_MaxExtraTime" FieldLabel="حداکثر اضافه کار" InputMaskString="999:99" />
                                        <ext:TextField runat="server" ID="Shift_MinExtraTime" FieldLabel="حداقل اضافه کار" InputMaskString="999:99" />

                                    </Items>

                                </ext:FieldSet>

                                <ext:FieldSet
                                    runat="server"
                                    Flex="1"
                                    Title="کسرکار"
                                    Layout="TableLayout" Collapsible="true">
                                    <LayoutConfig>
                                        <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                                    </LayoutConfig>
                                    <Defaults>

                                        <ext:Parameter Name="Margin" Value="10" Mode="Raw" />
                                        <ext:Parameter Name="InputWrapCls" Value="time-width-icon x-form-text-wrap-default" Mode="Value" />

                                    </Defaults>

                                    <Items>
                                        <ext:TextField runat="server" ID="Shift_DelayTime" FieldLabel="تاخیر مجاز " InputMaskString="999:99">
                                            <LeftButtons>
                                                <ext:Button runat="server" Icon="Help" ToolTip="این میزان بطور اتوماتیک از تاخیر فرد در ماه بخشوده خواهد شد." />
                                            </LeftButtons>
                                        </ext:TextField>
                                        <ext:TextField runat="server" ID="Shift_EarlyTime" FieldLabel="تعجیل مجاز" InputMaskString="999:99">
                                            <LeftButtons>
                                                <ext:Button runat="server" Icon="Help" ToolTip="این میزان بطور اتوماتیک از تعجیل فرد در ماه بخشوده خواهد شد." />
                                            </LeftButtons>
                                        </ext:TextField>
                                        <ext:TextField runat="server" ID="Shift_DeductionTime" FieldLabel="کسرکار مجاز" InputMaskString="999:99">
                                            <LeftButtons>
                                                <ext:Button runat="server" Icon="Help" ToolTip="این میزان بطور اتوماتیک از کسرکار فرد در ماه بخشوده خواهد شد." />
                                            </LeftButtons>
                                        </ext:TextField>
                                    </Items>

                                </ext:FieldSet>

                                <ext:FieldSet
                                    runat="server"
                                    Flex="1"
                                    Title="محاسبه کارکرد خالص(مخصوص کارکنان ساعتی)"
                                    Layout="TableLayout" Collapsible="true" CheckboxToggle="true" CheckboxName="Shift_IsHourly" Collapsed="true">
                                    <LayoutConfig>
                                        <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                                    </LayoutConfig>
                                    <Defaults>
                                        <ext:Parameter Name="Margin" Value="10" Mode="Raw" />
                                        <ext:Parameter Name="InputWrapCls" Value="time-width-icon x-form-text-wrap-default" Mode="Value" />
                                    </Defaults>

                                    <Items>
                                        <ext:TextField runat="server" ID="Shift_MinHourlyTime" FieldLabel="حداقل ساعت کارکرد" InputMaskString="999:99" LabelWidth="150">
                                            <LeftButtons>
                                                <ext:Button runat="server" Icon="Help" ToolTip="" />
                                            </LeftButtons>
                                        </ext:TextField>
                                        <ext:Checkbox runat="server" ID="Shift_IsDynamicWork" BoxLabel="حضور پویا" LabelAlign="Right" />
                                    </Items>

                                </ext:FieldSet>

                                <ext:FieldSet
                                    runat="server"
                                    Flex="1"
                                    Title="توضیحات"
                                    Layout="FitLayout">
                                    <Items>
                                        <ext:TextArea runat="server" ID="Shift_Dsc" Padding="5" />
                                    </Items>

                                </ext:FieldSet>
                            </Items>

                            <Buttons>
                                <ext:Button ID="btnSPC" runat="server" Text="ذخیره" Icon="Disk" Handler="SaveShift(this.priv())" />
                            </Buttons>
                        </ext:FormPanel>

                        



                    </Items>

                </ext:TabPanel>

             
            </Items>
            <Buttons>
                <ext:Button runat="server" Text="انصراف" Icon="" Handler="this.up('window').close()" ic />
               
            </Buttons>
        </ext:Window>
    </form>
</body>
</html>
