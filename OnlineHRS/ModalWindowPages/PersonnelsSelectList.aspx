<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PersonnelsSelectList.aspx.cs" Inherits="OnlineHRS.ModalWindowPages.PersonnelsSelectList" %>

<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <%--<link type="text/css" rel="stylesheet" href="/ux/resources/calendar-embedded-css/ext.axd?v=4.6.0">--%>
    <link href="../Assets/calendar.css" rel="stylesheet" />
    <%--<script type="text/javascript" src="/ux/calendar/calendar-all-js/ext.axd?v=4.6.0"></script>--%>
    <script src="../Assets/utility.js"></script>
    <script src="../Assets/salary.js"></script>
    <%--<script src="../Assets/persian-date.js"></script>--%>
    <script src="../Assets/persian-date-debug.js"></script>
    <script src="../Assets/calendarPanel.js"></script>
    <script src="../Assets/attendance.js"></script>
    <%-- <script src="../Assets/utility.js"></script>
    <script src="../Assets/salary.js"></script>
    <script src="Assets/EntityClasses.js"></script>
    <script src="Assets/FarsiType.js"></script>
    <script src="Assets/ModalWindows.js"></script>--%>
    <script>
        //Ext.define('KitchenSink.view.calendar.Panel', {
        //    extend: 'Ext.panel.Panel',
        //    xtype: 'calendar-panel',

        //    requires: [
        //        'Ext.calendar.panel.Panel'
        //    ],

        //    width: 1200,
        //    height: 600,

        //    layout: 'fit',
        //    items: [{
        //        xtype: 'calendar',
        //        views: {
        //            day: {
        //                startTime: 6,
        //                endTime: 22
        //            }
        //        },
        //        timezoneOffset: 0,

        //    }]
        //});

        var tokenID = '', companyID ='GLtfD+HKrC4='
        function start() {
            //Ext.create({
            //    xtype: 'calendar-panel',
            //    renderTo: Ext.getBody()
            //})
        }

        //Ext.create("Ext.calendar.view.Month", {
        //    id: "ShiftCalendar",
        //    border: false,
        //    renderTo: Ext.getBody(),
        //    region: "center",
        //    activeItem: 2,
        //    title: "تقویم",
        //    iconCls: "#Calendar"
        //})
        //}
       

        Ext.onReady(function () {

            createShiftCalendar(Ext.getBody(),1, 'eeeee',0 ,getPresenceCodeTitle)
            //Ext.calendar.data.EventModel.reconfigure();
           
            // cal.setStartDate(new persianDate([1397, 1, 1]))
           
        });
    </script>
    <link href="../Resources/IconShortcuts/desktop.css" rel="stylesheet" />
</head>
<body onload="start()">
    <form id="form1" runat="server">
        <ext:ResourceManager ID="ResourceManager1" runat="server" RTL="true" Theme="Gray" AjaxTimeout="3600000"
            ShowWarningOnAjaxFailure="false" DisableViewState="true" ScriptMode="Debug">
        </ext:ResourceManager>


        <ext:Panel IDMode="Parent" ClientIDMode="AutoID" runat="server"  Icon="Group" Layout="BorderLayout" Cls="personnel-search">

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
                            ID="gridGroupCalc" AutoLoad="false"  >
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
                                      
                                    </Items>
                                </ext:Toolbar>
                            </TopBar>
                            <Plugins>
                                <ext:FilterHeader runat="server" />
                            </Plugins>
                            <Listeners>
                                <RowDblClick Handler="showPersonnelInputFormItemModalWindow(this.up('#TabInputFormItems'),this,'Edit')" />
                            </Listeners>
                        </ext:GridPanel>
                        <ext:Container runat="server" ColumnWidth="0.04" Layout="CenterLayout" Cls="height-full" Frame="true" BodyStyle="margin-top:120px">


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
                        </ext:Container>
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
                                <ext:Toolbar runat="server" RTL="">
                                    <Items>
                                        <ext:Button runat="server" Text="محاسبه گروهی" Icon="Calculator" Handler="groupSalaryCalculation(this.up('grid'))" />
                                        <ext:Button runat="server" Text="تایید گروهی" Icon="CalculatorAdd" Handler="groupSalaryCalcConfirm(this.up('grid'), 8)" />
                                        <ext:Button runat="server" Text="برگشت از تایید" Icon="CalculatorError" Handler="groupSalaryCalcConfirm(this.up('grid'), 0)" />
                                        <ext:Button runat="server" Text="حذف محاسبه" Icon="CalculatorDelete" Handler="groupSalaryCalcDelete(this.up('grid'))" />
                                    </Items>
                                </ext:Toolbar>
                            </TopBar>

                            <Listeners>
                                <RowDblClick Handler="showPersonnelInputFormItemModalWindow(this.up('#TabInputFormItems'),this,'Edit')" />
                            </Listeners>
                            <Plugins>
                                <ext:FilterHeader runat="server" />
                            </Plugins>

                        </ext:GridPanel>
                    </Items>
                </ext:Panel>
            </Items>

        </ext:Panel>
    </form>
</body>
</html>
