<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AttendancePresenceCode2.aspx.cs" Inherits="OnlineHRS.ModalWindowPages.AttendancePresenceCode2" %>

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
    <%--<script>
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
    </script>--%>
    <link href="../Resources/IconShortcuts/desktop.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <ext:ResourceManager ID="ResourceManager1" runat="server" RTL="true" Theme="Gray" AjaxTimeout="3600000" ShowWarningOnAjaxFailure="false" DisableViewState="true">
        </ext:ResourceManager>

        <ext:Window ID="PresenceCodeWindow" runat="server" Height="650" Width="750" AutoScroll="true" Maximizable="false" Icon="CalendarViewDay" Title="کد حضور"
            Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static">
            <LayoutConfig>
                <ext:FitLayoutConfig ItemCls="width-full" />
            </LayoutConfig>
            <Items>
                <ext:FormPanel ID="formPresenceCode" runat="server" Frame="true" Header="false" AutoHeight="true" Layout="TableLayout">
                    <LayoutConfig>
                        <ext:TableLayoutConfig Columns="1" ItemCls="width-full" />
                    </LayoutConfig>
                    <FieldDefaults LabelAlign="Right" />

                    <Items>

                        <ext:FieldSet
                            runat="server"
                            Flex="1"
                            Title=""
                            Layout="TableLayout" Collapsed="">

                            <LayoutConfig>
                                <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                            </LayoutConfig>
                            <Defaults>
                                <ext:Parameter Name="LabelWidth" Value="30" Mode="Raw" />
                                <%--<ext:Parameter Name="Margin" Value="5" Mode="Raw" />--%>
                            </Defaults>
                            <Items>
                                <ext:TextField runat="server" ID="Codes_Code" FieldLabel="کد" ReadOnly="true" Width="100" LabelAlign="Right" Margin="5" />
                                <ext:ComboBox runat="server" ID="Codes_WorkType" FieldLabel="نوع حضور" LabelAlign="Right" LabelWidth="70" Margin="8">
                                    <Items>
                                        <ext:ListItem Text="حضور عادي" Value="1" />
                                        <ext:ListItem Text="روز تعطيل و حضور دلخواه" Value="5" />
                                        <ext:ListItem Text="شبكار" Value="10" />
                                        <ext:ListItem Text="ورود از شيفت 24" Value="11" />
                                        <ext:ListItem Text="خروج از شيفت 24" Value="12" />
                                        <ext:ListItem Text="شيفت" Value="13" />
                                        <ext:ListItem Text="حذف كارت" Value="20" />
                                    </Items>
                                    <SelectedItems>
                                        <ext:ListItem Value="1" />
                                    </SelectedItems>

                                </ext:ComboBox>
                                <ext:TextField runat="server" ID="Codes_Title" FieldLabel="عنوان" AllowBlank="false" BlankText=".این فیلد باید پر باشد" LabelAlign="Right" ColSpan="2" />
                            </Items>
                        </ext:FieldSet>

                        <ext:FieldSet
                            runat="server"
                            Flex="1"
                            Title="حضور عادی"
                            Layout="TableLayout" Collapsible="true">
                            <LayoutConfig>
                                <ext:TableLayoutConfig Columns="4" ItemCls="width-full" />
                            </LayoutConfig>
                            <Defaults>
                                <ext:Parameter Name="AllowBlank" Value="false" Mode="Raw" />
                                <ext:Parameter Name="BlankText" Value="'.این فیلد باید پر باشد'" Mode="Raw" />
                                <%--<ext:Parameter Name="LabelWidth" Value="30" Mode="Raw" />--%>
                                <ext:Parameter Name="Margin" Value="10" Mode="Raw" />
                                <%--<ext:Parameter Name="Width" Value="100" Mode="Raw" />--%>
                                <ext:Parameter Name="InputWrapCls" Value="time-width x-form-text-wrap-default" Mode="Value" />

                            </Defaults>

                            <Items>
                                <ext:TextField runat="server" ID="Codes_StartRealTime" FieldLabel="ساعت شروع" />
                                <ext:TextField runat="server" ID="Codes_EndRealTime" FieldLabel="ساعت پایان" />
                                <ext:TextField runat="server" ID="Codes_FloatTime" FieldLabel="شناوری" ColSpan="2" />
                            </Items>

                        </ext:FieldSet>

                        <ext:FieldSet
                            runat="server"
                            Flex="1"
                            Title="اضافه کار عادی"
                            Layout="TableLayout" Collapsible="true">
                            <Defaults>
                                <%--<ext:Parameter Name="LabelWidth" Value="30" Mode="Raw" />--%>
                                <ext:Parameter Name="Margin" Value="10" Mode="Raw" />
                                <%--<ext:Parameter Name="Width" Value="100" Mode="Raw" />--%>
                                <ext:Parameter Name="FieldStyle" Value="text-align:center" Mode="Value" />
                                <ext:Parameter Name="InputWrapCls" Value="time-width x-form-text-wrap-default" Mode="Value" />
                            </Defaults>
                            <LayoutConfig>
                                <ext:TableLayoutConfig Columns="4" ItemCls="width-full" />
                            </LayoutConfig>
                            <Items>
                                <ext:TextField runat="server" ID="Codes_StartExtraTime" FieldLabel="ساعت شروع" InputMaskString="99:99" />
                                <ext:TextField runat="server" ID="Codes_EndExtraTime" FieldLabel="ساعت پایان" InputMaskString="99:99" />
                                <ext:TextField runat="server" ID="Codes_MaxExtraTime" FieldLabel="سقف اضافه کار" InputMaskString="99:99" />
                                <ext:TextField runat="server" ID="Codes_MinExtraTime" FieldLabel="حداقل اضافه کار" InputMaskString="99:99" />
                            </Items>
                        </ext:FieldSet>

                        <ext:FieldSet
                            runat="server"
                            Flex="1"
                            Title="اضافه کار با مجوز"
                            Layout="TableLayout" Collapsible="true">
                            <Defaults>
                                <%--<ext:Parameter Name="LabelWidth" Value="30" Mode="Raw" />--%>
                                <ext:Parameter Name="Margin" Value="10" Mode="Raw" />
                                <%--<ext:Parameter Name="Width" Value="100" Mode="Raw" />--%>
                                <ext:Parameter Name="FieldStyle" Value="text-align:center" Mode="Value" />
                                <ext:Parameter Name="InputWrapCls" Value="time-width x-form-text-wrap-default" Mode="Value" />
                            </Defaults>
                            <LayoutConfig>
                                <ext:TableLayoutConfig Columns="4" ItemCls="width-full" />
                            </LayoutConfig>
                            <Items>
                                <ext:TextField runat="server" ID="Codes_StartLicExtraTime" FieldLabel="ساعت شروع" InputMaskString="99:99" />
                                <ext:TextField runat="server" ID="Codes_EndLicExtraTime" FieldLabel="ساعت پایان" InputMaskString="99:99" />
                                <ext:TextField runat="server" ID="Codes_MaxLicExtraTime" FieldLabel="سقف اضافه کار" InputMaskString="99:99" />
                                <ext:TextField runat="server" ID="Codes_MinLicExtraTime" FieldLabel="حداقل اضافه کار" InputMaskString="99:99" />
                            </Items>
                        </ext:FieldSet>

                        <ext:FieldSet
                            runat="server"
                            Flex="1"
                            Title="نهار،نماز و استراحت"
                            Layout="TableLayout" Collapsible="true">
                            <Defaults>

                                <ext:Parameter Name="Margin" Value="10" Mode="Raw" />
                                <%--<ext:Parameter Name="Width" Value="100" Mode="Raw" />--%>
                                <ext:Parameter Name="FieldStyle" Value="text-align:center" Mode="Value" />
                                <ext:Parameter Name="InputWrapCls" Value="time-width x-form-text-wrap-default" Mode="Value" />
                            </Defaults>
                            <LayoutConfig>
                                <ext:TableLayoutConfig Columns="4" ItemCls="width-full" />
                            </LayoutConfig>
                            <Items>
                                <ext:TextField runat="server" ID="Codes_StartLunchTime" FieldLabel="ساعت شروع" InputMaskString="99:99" />
                                <ext:TextField runat="server" ID="Codes_EndLunchTime" FieldLabel="ساعت پایان" InputMaskString="99:99" />
                                <ext:Checkbox runat="server" ID="Codes_IsLunchOvertime" BoxLabel="حضور در زمان نهار مشمول اضافه کار ی باشد؟" LabelAlign="Right" LabelWidth="200" ColSpan="2" Width="250" BoxLabelAlign="After" />
                            </Items>
                        </ext:FieldSet>
                        <ext:FieldSet
                            runat="server"
                            Flex="1"
                            Title="شب کاری"
                            Layout="TableLayout" Collapsible="true">
                            <Defaults>
                                <ext:Parameter Name="Margin" Value="10" Mode="Raw" />
                                <%--<ext:Parameter Name="Width" Value="100" Mode="Raw" />--%>
                                <ext:Parameter Name="FieldStyle" Value="text-align:center" Mode="Value" />
                                <ext:Parameter Name="InputWrapCls" Value="time-width x-form-text-wrap-default" Mode="Value" />
                            </Defaults>
                            <LayoutConfig>
                                <ext:TableLayoutConfig Columns="4" ItemCls="width-full" />
                            </LayoutConfig>
                            <Items>
                                <ext:TextField runat="server" ID="Codes_StartNightTime" FieldLabel="ساعت شروع" InputMaskString="99:99" Text="22:00" />
                                <ext:TextField runat="server" ID="Codes_EndNightTime" FieldLabel="ساعت پایان" InputMaskString="99:99" Text="06:00" />
                                <ext:Checkbox runat="server" ID="Codes_IsLicNightWork" BoxLabel="شبکاری نیاز به مجوز دارد؟" LabelAlign="Right"  ColSpan="2"  BoxLabelAlign="After" />
                            </Items>
                        </ext:FieldSet>
                        <ext:FieldSet
                            runat="server"
                            Flex="1"
                            Title="ارفاق"
                            Layout="TableLayout" Collapsible="true">
                            <Defaults>
                                <ext:Parameter Name="Margin" Value="10" Mode="Raw" />
                                <%--<ext:Parameter Name="Width" Value="100" Mode="Raw" />--%>
                                <ext:Parameter Name="FieldStyle" Value="text-align:center" Mode="Value" />
                                <ext:Parameter Name="InputWrapCls" Value="time-width x-form-text-wrap-default" Mode="Value" />
                            </Defaults>
                            <LayoutConfig>
                                <ext:TableLayoutConfig Columns="4" ItemCls="width-full" />
                            </LayoutConfig>
                            <Items>
                                <ext:TextField runat="server" ID="Codes_EnterFlexibleTime" FieldLabel="ارفاق در ورود" InputMaskString="99:99" />
                                <ext:TextField runat="server" ID="Codes_ExitFlexibleTime" FieldLabel="ارفاق در خروج" InputMaskString="99:99" />
                                <ext:Checkbox runat="server" ID="Codes_EnterFlexibleDeduction" BoxLabel="ارفاق در ورود مشمول کسرکار نباشد" LabelAlign="Right" ColSpan="2"  BoxLabelAlign="After" />
                            </Items>
                        </ext:FieldSet>

                        <ext:FieldSet
                            runat="server"
                            Flex="1"
                            Title="مرخصی/ماموریت"
                            Layout="TableLayout" Collapsible="true">
                            <Defaults>
                                <ext:Parameter Name="Margin" Value="10" Mode="Raw" />
                                <ext:Parameter Name="LabelWidth" Value="200" Mode="Raw" />
                                <ext:Parameter Name="BoxLabelAlign" Value="After" Mode="Value" />
                                <ext:Parameter Name="Width" Value="250" Mode="Value" />
                                <ext:Parameter Name="LabelAlign" Value="Right" Mode="Value" />
                            </Defaults>
                            <LayoutConfig>
                                <ext:TableLayoutConfig Columns="2" ItemCls="width-full" />
                            </LayoutConfig>
                            <Items>

                                <ext:Checkbox runat="server" ID="Codes_IsNotDailyVacation" BoxLabel="امکان ثبت مرخصی روزانه نداشته باشد" />
                                <ext:Checkbox runat="server" ID="Codes_IsLicExtraHourMission" BoxLabel="ماموریت ساعتی نیاز به مجوز دارد؟" />
                            </Items>
                        </ext:FieldSet>
                    </Items>
                </ext:FormPanel>

            </Items>

            <Buttons>
                <ext:Button runat="server" Text="انصراف" Icon="Cancel" Handler="this.up('window').close()" />
                <ext:Button ID="btnSPC" runat="server" Text="ذخیره" Icon="Disk" Handler="SavePresenceCode(this.priv())" />
            </Buttons>
            
            <KeyMap runat="server">
                <ext:KeyBindItem Handler="SavePresenceCode(this)" Key="ENTER" />
            </KeyMap>

        </ext:Window>
    </form>
</body>
</html>
