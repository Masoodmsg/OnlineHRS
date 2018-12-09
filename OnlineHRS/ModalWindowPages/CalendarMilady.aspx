<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CalendarMilady.aspx.cs" Inherits="OnlineHRS.ModalWindowPages.CalendarMilady" %>

<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link type="text/css" rel="stylesheet" href="/ux/resources/calendar-embedded-css/ext.axd?v=4.6.0">
    <%--<script type="text/javascript" src="/ux/calendar/calendar-all-js/ext.axd?v=4.6.0"></script>--%>
    <script src="../Assets/utility.js"></script>
    <script src="../Assets/salary.js"></script>
    <script src="../Assets/persian-date.js"></script>
     <%--<script src="../Assets/calendarPanel.js"></script>--%>
    <script src="../Assets/calendar.js"></script>
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
        var CompanyX = {
            getCalendar: function () {
                return Ext.getCmp('CalendarPanel1');
            },

            getStore: function () {
                return Ext.getCmp('CalendarPanel1').eventStore;
            },

            getWindow: function () {
                var win = Ext.getCmp('EventWindow1')
                return win;
            },

            viewChange: function (p, vw, dateInfo) {
                var win = this.getWindow();

                if (win) {
                    win.hide();
                }

                if (dateInfo) {
                    // will be null when switching to the event edit form, so ignore
                    //this.DatePicker1.setValue(dateInfo.activeDate);
                    this.updateTitle(dateInfo.viewStart, dateInfo.viewEnd);
                }
            },

            updateTitle: function (startDt, endDt) {
                var msg = '',
                    fmt = new persianDate().format;

                if (startDt.valueOf() == endDt.valueOf()) {
                    msg = startDt.format('LL');
                } else if (startDt.year() == endDt.year()) {
                    if (startDt.month() == endDt.month()) {
                        msg = startDt.format('LL') + ' - ' + endDt.format('LL');
                    } else {
                        msg = startDt.format('LL') + ' - ' + endDt.format('LL');
                    }
                } else {
                    msg = msg = startDt.format('LL') + ' - ' + endDt.format('LL');
                }

                // this.Panel1.setTitle(msg);
            },

            setStartDate: function (picker, date) {
                this.getCalendar().setStartDate(date);
            },

            rangeSelect: function (cal, dates, callback) {
                this.record.show(cal, dates);
                this.getWindow().on('hide', callback, cal, { single: true });
            },

            dayClick: function (cal, dt, allDay, el) {
                this.record.show.call(this, cal, {
                    StartDate: dt,
                    IsAllDay: allDay
                }, el);
            },

            record: {
                addFromEventDetailsForm: function (win, rec) {
                    CompanyX.ShowMsg('Event ' + rec.data.Title + ' was added');
                },

                add: function (win, rec) {
                    win.hide();
                    CompanyX.getStore().add(rec);
                    CompanyX.getStore().sync();
                    CompanyX.ShowMsg('Event ' + rec.data.Title + ' was added');
                },

                updateFromEventDetailsForm: function (win, rec) {
                    CompanyX.ShowMsg('Event ' + rec.data.Title + ' was updated');
                },

                update: function (win, rec) {
                    win.hide();
                    rec.commit();
                    CompanyX.getStore().sync();
                    CompanyX.ShowMsg('Event ' + rec.data.Title + ' was updated');
                },

                removeFromEventDetailsForm: function (win, rec) {
                    CompanyX.ShowMsg('Event ' + rec.data.Title + ' was deleted');
                },

                remove: function (win, rec) {
                    CompanyX.getStore().remove(rec);
                    CompanyX.getStore().sync();
                    win.hide();
                    CompanyX.ShowMsg('Event ' + rec.data.Title + ' was deleted');
                },

                edit: function (win, rec) {
                    win.hide();
                    rec.commit();
                    CompanyX.getCalendar().showEditForm(rec);
                },

                resize: function (cal, rec) {
                    rec.commit();
                    CompanyX.ShowMsg('Event ' + rec.data.Title + ' was updated');
                },

                move: function (cal, rec) {
                    rec.commit();
                    CompanyX.ShowMsg('Event ' + rec.data.Title + ' was moved to ' + Ext.Date.format(rec.data.StartDate, 'F jS' + (rec.data.IsAllDay ? '' : ' \\a\\t g:i a')));
                },

                show: function (cal, rec, el) {
                    CompanyX.getWindow().show(rec, el);
                },

                saveAll: function () {
                    CompanyX.getStore().submitData({
                        mappings: false
                    });
                }
            }
        };

        Ext.onReady(function () {
            Ext.iterate(Ext.calendar.data.EventMappings, function (key, value) {
                if (value) {
                    value.mapping = null;
                }
            });
            Ext.apply(Ext.calendar.data.EventMappings.StartDate, {
                name: "StartDate",
                type: "date",
                dateFormat: "MS"
            });
            Ext.apply(Ext.calendar.data.EventMappings.EndDate, {
                name: "EndDate",
                type: "date",
                dateFormat: "MS"
            });
            //Ext.calendar.data.EventModel.reconfigure();
            Ext.create("Ext.calendar.CalendarPanel", {
                id: "ShiftCalendar",
                border: false,
                renderTo: Ext.getBody(),
                height: 700,
                width:1000,
                region: "center",
                activeItem: 2,
                title: "تقویم",
                iconCls: "#Calendar",
                calendarStore: Ext.create("Ext.calendar.data.MemoryCalendarStore", {
                    storeId: "CalendarStore1",
                    "autoMsg": false,
                    autoLoad: true,
                    proxy: {
                        data: [{
                            "id": 1,
                            "title": "Home",
                            "desc": null
                        }, {
                            "id": 2,
                            "title": "Work",
                            "desc": null
                        }, {
                            "id": 3,
                            "title": "School",
                            "desc": null
                        }, {
                            "id": 4,
                            "title": "Day",
                            "desc": null
                        }],
                        type: 'memory'
                    }
                }),
                eventStore: Ext.create("Ext.calendar.data.MemoryEventStore", {
                    storeId: "EventStore1",
                    autoLoad: true,
                    proxy: {
                        data: [{
                            "id": 1001,
                            "cid": 1,
                            "title": "Vacation",
                            "start": "1397/05/01",
                            "end": "1397/05/04",
                            "notes": "Have fun",
                            "ad": false
                        }, {
                            "id": 1002,
                            "cid": 2,
                            "title": "Lunch with Matt",
                            "start": "1397/05/03",
                            "end": "1397/05/03",
                            "loc": "Chuy's!",
                            "notes": "Order the queso",
                            "url": "http://chuys.com",
                            "ad": false,
                            "rem": "15"
                        }],
                        type: 'memory'
                    },
                    listeners: {
                        beforesync: {
                            fn: function (options) {
                                Ext.Msg.alert('Sync', 'The EventStore initiates a sync request after that action. The EventStore synchronization is not implemented in that example.');
                                this.commitChanges();
                                return false;
                            }
                        }
                    }
                }),
                dayViewCfg: {
                    "enableFx": false,
                    xtype: "dayview"
                },
                weekViewCfg: {
                    "enableFx": false,
                    xtype: "weekview"
                },
                monthViewCfg: {
                    xtype: "monthview",
                    enableFx: false,
                    showHeader: true,
                    showWeekLinks: true,
                    showWeekNumbers: true
                },
                listeners: {
                    dayclick: {
                        scope: CompanyX,
                        fn: CompanyX.dayClick
                    },
                    eventadd: {
                        scope: CompanyX,
                        fn: CompanyX.record.addFromEventDetailsForm
                    },
                    eventclick: {
                        scope: CompanyX,
                        fn: CompanyX.record.show
                    },
                    eventdelete: {
                        scope: CompanyX,
                        fn: CompanyX.record.removeFromEventDetailsForm
                    },
                    eventmove: {
                        scope: CompanyX,
                        fn: CompanyX.record.move
                    },
                    eventresize: {
                        scope: CompanyX,
                        fn: CompanyX.record.resize
                    },
                    eventupdate: {
                        scope: CompanyX,
                        fn: CompanyX.record.updateFromEventDetailsForm
                    },
                    rangeselect: {
                        scope: CompanyX,
                        fn: CompanyX.rangeSelect
                    },
                    viewchange: {
                        scope: CompanyX,
                        fn: CompanyX.viewChange
                    }
                }
            });
            Ext.create("Ext.calendar.form.EventWindow", {
                id: "EventWindow1",
                hidden: true,
                renderTo: Ext.get("form1"),
                hidden: true,
                calendarStore: "CalendarStore1",
                listeners: {
                    eventadd: {
                        scope: CompanyX,
                        fn: CompanyX.record.add
                    },
                    eventdelete: {
                        scope: CompanyX,
                        fn: CompanyX.record.remove
                    },
                    eventupdate: {
                        scope: CompanyX,
                        fn: CompanyX.record.update
                    },
                    editdetails: {
                        scope: CompanyX,
                        fn: CompanyX.record.edit
                    }
                }
            });
        });
    </script>
    <link href="../Resources/IconShortcuts/desktop.css" rel="stylesheet" />
</head>
<body >
    <form id="form1" runat="server">
        <ext:ResourceManager ID="ResourceManager1" runat="server" RTL="true" Theme="Gray" AjaxTimeout="3600000"
            ShowWarningOnAjaxFailure="false" DisableViewState="true" ScriptMode="Debug" >
        </ext:ResourceManager>

       <%-- <ext:CalendarPanel
            ID="ShiftCalendar"
            runat="server"
            Region="Center"
            ActiveIndex="2"
            Border="false" Title="تقویم" Icon="Calendar">
            <CalendarStore ID="CalendarStore1" runat="server">
                <Calendars>
                    <ext:CalendarModel CalendarId="1" Title="Home" />
                    <ext:CalendarModel CalendarId="2" Title="Work" />
                    <ext:CalendarModel CalendarId="3" Title="School" />
                    <ext:CalendarModel CalendarId="4" Title="Day" />
                </Calendars>
            </CalendarStore>
            <EventStore ID="EventStore1" runat="server" NoMappings="true">
                <Proxy>
                    <ext:AjaxProxy Url="../Shared/Code/RemoteService.asmx/GetEvents" Json="true">
                        <ActionMethods Read="POST" />
                        <Reader>
                            <ext:JsonReader RootProperty="d" />
                        </Reader>
                    </ext:AjaxProxy>
                </Proxy>
                <Mappings>
                    <ext:ModelField Name="StartDate" Type="Date" DateFormat="M$" />
                    <ext:ModelField Name="EndDate" Type="Date" DateFormat="M$" />
                </Mappings>
                <Listeners>
                    <BeforeSync Handler="Ext.Msg.alert('Sync', 'The EventStore initiates a sync request after that action. The EventStore synchronization is not implemented in that example.');
                                                         this.commitChanges();
                                                         return false;" />
                </Listeners>
            </EventStore>

            <MonthView
                runat="server"
                ShowHeader="true"
                ShowWeekLinks="true"
                ShowWeekNumbers="true"
                EnableFx="false" />
            <WeekView runat="server">
                <CustomConfig>
                    <ext:ConfigItem Name="enableFx" Value="false" Mode="Raw" />
                </CustomConfig>
            </WeekView>
            <DayView runat="server">
                <CustomConfig>
                    <ext:ConfigItem Name="enableFx" Value="false" Mode="Raw" />
                </CustomConfig>
            </DayView>
            <Listeners>
                <ViewChange Fn="CompanyX.viewChange" Scope="CompanyX" />
                <EventClick Fn="CompanyX.record.show" Scope="CompanyX" />
                <DayClick Fn="CompanyX.dayClick" Scope="CompanyX" />
                <RangeSelect Fn="CompanyX.rangeSelect" Scope="CompanyX" />

                <EventMove Fn="CompanyX.record.move" Scope="CompanyX" />
                <EventResize Fn="CompanyX.record.resize" Scope="CompanyX" />

                <EventAdd Fn="CompanyX.record.addFromEventDetailsForm" Scope="CompanyX" />
                <EventUpdate Fn="CompanyX.record.updateFromEventDetailsForm" Scope="CompanyX" />
                <EventDelete Fn="CompanyX.record.removeFromEventDetailsForm" Scope="CompanyX" />
            </Listeners>
        </ext:CalendarPanel>
        <ext:EventWindow
            ID="EventWindow1"
            runat="server"
            Hidden="true"
            CalendarStoreID="CalendarStore1">
            <Listeners>
                <EventAdd Fn="CompanyX.record.add" Scope="CompanyX" />
                <EventUpdate Fn="CompanyX.record.update" Scope="CompanyX" />
                <EditDetails Fn="CompanyX.record.edit" Scope="CompanyX" />
                <EventDelete Fn="CompanyX.record.remove" Scope="CompanyX" />
            </Listeners>
        </ext:EventWindow>--%>
        <%--<ext:Panel IDMode="Parent" ClientIDMode="AutoID" runat="server"  Icon="Group" Layout="BorderLayout" Cls="personnel-search">

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
                                <ext:Toolbar runat="server">
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

        </ext:Panel>--%>
    </form>
</body>
</html>
