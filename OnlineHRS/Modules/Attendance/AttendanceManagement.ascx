<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>


<ext:DesktopModuleProxy ID="DMPAttendanceManagement" runat="server">
    <Module ModuleID="AttendanceModule">
        <Shortcut Name="حضور و غیاب" IconCls="x-attendance-icon" SortIndex="10" />
        <Launcher Text="حضور و غیاب" Icon="Time" />
        <Window>
            <ext:Window ID="AttendanceManagemenWindow" runat="server" Height="600"
                Icon="Calendar" Title="حضور و غیاب" Width="1200" BodyPadding="5"
                Layout="FitLayout" CloseAction="Destroy" RTL="true" IDMode="Static" ManageHeight="true"  Maximized="true">

                <Items>
                    <ext:TabPanel
                        ID="TabPanelAttendanceManagement"
                        runat="server"
                        ActiveTabIndex="0"
                        Width="600"
                        Height="250"
                        Plain="false" Layout="FitLayout" BodyPadding="1">
                        <Items>
                            <ext:Panel ID="TabAttendanceTimeCard" Icon="PageEdit" Layout="BorderLayout" runat="server" Title="مدیریت و نمایش تردد" RTL="true">
                                <Items>
                                    <ext:Panel ID="rightPanel" Title="امکانات" runat="server" Region="West" Icon="Vcard" Collapsed="false" Collapsible="true" Split="true" CollapseDirection="Left" Layout="BorderLayout" Width="300">

                                        <Items>
                                            <ext:Panel ID="pnlPersonnelInfo" runat="server" Layout="TableLayout" Frame="true" Collapsed="false" Collapsible="true" Region="North" Split="true" Title="اطلاعات پرسنلی" Icon="UserComment">
                                                <LayoutConfig>
                                                    <ext:TableLayoutConfig Columns="1" />
                                                </LayoutConfig>

                                                <Items>
                                                    <ext:ComboBox runat="server" ID="ddlMonth" LabelAlign="Right" FieldLabel="ماه" Editable="false" LabelWidth="50" DisplayField="Title" ValueField="Title" QueryMode="Local" ColSpan="3">
                                                        <Listeners>
                                                            <Select Handler="setMonth(records);setTitleVac(this)" />
                                                            <%-- <AfterRender Handler="getMonths(this)" />--%>
                                                        </Listeners>
                                                        <Store>
                                                            <ext:Store
                                                                runat="server">
                                                                <Model>
                                                                    <ext:Model runat="server">
                                                                        <Fields>
                                                                            <ext:ModelField Name="Title" />
                                                                            <ext:ModelField Name="Year" Type="Int" />
                                                                            <ext:ModelField Name="Month" Type="Int" />
                                                                        </Fields>
                                                                    </ext:Model>
                                                                </Model>
                                                            </ext:Store>
                                                        </Store>
                                                    </ext:ComboBox>
                                                    <ext:ComboBox runat="server"
                                                        HideSelected="true"
                                                        TriggerAction="All"
                                                        EmptyText="جستجو" IDMode="Parent" ID="personnelFind" QueryDelay="1000" LabelAlign="Right" FieldLabel="نام فرد" TypeAhead="false" LabelWidth="50" ColSpan="3">
                                                        <Listeners>
                                                            <BeforeQuery Fn="userSearch" />
                                                            <Select Handler="setPersonnelRef(this,records)" />
                                                        </Listeners>
                                                        <Store>
                                                            <ext:Store
                                                                runat="server">
                                                                <Model>
                                                                    <ext:Model runat="server">
                                                                        <Fields>
                                                                            <ext:ModelField Name="text" />
                                                                            <ext:ModelField Name="value" Type="Int" />
                                                                            <ext:ModelField Name="Code" Type="Int" />
                                                                            <ext:ModelField Name="SerialEnc" />

                                                                        </Fields>
                                                                    </ext:Model>
                                                                </Model>

                                                            </ext:Store>
                                                        </Store>
                                                    </ext:ComboBox>
                                                </Items>
                                                <BottomBar>
                                                    <ext:Toolbar runat="server">
                                                        <Items>
                                                            <ext:Button ID="BtnSetting" runat="server" Text="تنظیمات" Icon="GroupGear" TabIndex="12" Handler="" />

                                                            <ext:Button ID="BtnPersonnelCalendar" runat="server" Text="تقویم اختصاصی" Icon="Calendar" TabIndex="12" Handler="" />

                                                            <ext:Button ID="BtnComputeAPersonnel" runat="server" Text="محاسبه فردی" Icon="Calculator" TabIndex="12" Handler="ComputePersonnel()" />
                                                        </Items>
                                                    </ext:Toolbar>

                                                </BottomBar>
                                            </ext:Panel>
                                            <ext:TabPanel runat="server" TabPosition="Right" Region="Center" Title="اطلاعات حضور و غیاب" Icon="Date">
                                                <Items>
                                                    <ext:Panel ID="pnlMonthInfo" runat="server" Title="اطلاعات ماهانه" Icon="CalendarViewMonth" Frame="true" AutoScroll="true">
                                                        <Defaults>
                                                            <ext:Parameter Name="FieldStyle" Value="'color:#000066;font-weight:bold !important'" Mode="Raw" />

                                                        </Defaults>
                                                        <Items>
                                                            <ext:DisplayField runat="server" FieldLabel="کارکرد" ID="lbl_WorkDay" />
                                                            <ext:DisplayField runat="server" FieldLabel="مجاز به اضافه کار" ID="lbl_ExtraLicTitle" />
                                                            <ext:DisplayField runat="server" FieldLabel="سقف اضافه کار" ID="lbl_MaxExtraTime" />
                                                            <ext:DisplayField runat="server" FieldLabel="اضافه کار صبح" ID="lbl_MorningExtraTime" />
                                                            <ext:DisplayField runat="server" FieldLabel="اضافه کار دوره" ID="lbl_PriodExtraTime" />
                                                            <ext:DisplayField runat="server" FieldLabel="اضافه کار عادی" ID="lbl_ExtraTime" />
                                                            <ext:DisplayField runat="server" FieldLabel="اضافه کار روز تعطیل" ID="lbl_VacationExtraTime" />
                                                            <ext:DisplayField runat="server" FieldLabel="اضافه کار(سایر)" ID="lbl_PersuasiveExtraTime" />
                                                            <ext:DisplayField runat="server" FieldLabel="مازاد اضافه کاری" ID="lbl_ExtraTimePlus" />
                                                            <ext:DisplayField runat="server" FieldLabel="شب کاری" ID="lbl_NightWorkTime" />
                                                            <ext:DisplayField runat="server" FieldLabel="تاخیر" ID="lbl_DeductionTime" />
                                                            <ext:DisplayField runat="server" FieldLabel="تعجیل" ID="lbl_EarlyTime" />
                                                            <ext:DisplayField runat="server" FieldLabel="غیبت شناور" ID="lbl_AbsenceTime" />
                                                            <ext:DisplayField runat="server" FieldLabel="جمع کسر کار" ID="lbl_DeductionWorking" />
                                                            <ext:DisplayField runat="server" FieldLabel="تعداد ماموریت روزانه" ID="lbl_MissionCount" />
                                                            <ext:DisplayField runat="server" FieldLabel="نوبت کاری" ID="lbl_NightWorkDay" />
                                                            <ext:DisplayField runat="server" FieldLabel="حضور موظف" ID="lbl_RealMonthTime" />
                                                            <ext:DisplayField runat="server" FieldLabel="کل حضور" ID="lbl_WorkTime" />
                                                            <ext:DisplayField runat="server" FieldLabel="مازاد حضور" ID="lbl_ExtraLicPlus" />
                                                            <ext:DisplayField runat="server" FieldLabel="تعداد نواقص" ID="lbl_DefectCount" />
                                                        </Items>
                                                    </ext:Panel>
                                                    <ext:Panel ID="pnlVacationInfo" runat="server" Title="اطلاعات مرخصی" Icon="Map" Frame="true">

                                                        <Items>
                                                            <ext:FieldSet
                                                                runat="server"
                                                                Flex="1"
                                                                Title=""
                                                                Layout="AnchorLayout"
                                                                DefaultAnchor="100%" ID="set_UseVacYear">
                                                                <Defaults>
                                                                    <ext:Parameter Name="FieldStyle" Value="'color:#000066;font-weight:bold !important'" Mode="Raw" />
                                                                </Defaults>
                                                                <Items>

                                                                    <ext:DisplayField runat="server" FieldLabel="استحقاقي" ID="lbl_UseVacEstehghaghi" />
                                                                    <ext:DisplayField runat="server" FieldLabel="استعلاجي" ID="lbl_UseVacEstelaji" />
                                                                    <ext:DisplayField runat="server" FieldLabel="بدون حقوق" ID="lbl_UseVacBH" />
                                                                </Items>
                                                            </ext:FieldSet>
                                                            <ext:FieldSet
                                                                runat="server"
                                                                Flex="1"
                                                                Title=""
                                                                Layout="AnchorLayout"
                                                                DefaultAnchor="100%" ID="set_RemainVacYear">
                                                                <Defaults>
                                                                    <ext:Parameter Name="FieldStyle" Value="'color:#000066;font-weight:bold !important'" Mode="Raw" />
                                                                </Defaults>
                                                                <Items>
                                                                    <ext:DisplayField runat="server" FieldLabel="استحقاقي" ID="lbl_RemainVacEstehghaghi" />

                                                                </Items>
                                                            </ext:FieldSet>
                                                            <ext:FieldSet
                                                                runat="server"
                                                                Flex="1"
                                                                Title="ذخیره مرخصی"
                                                                Layout="AnchorLayout"
                                                                DefaultAnchor="100%" ID="set_SaveVacYear">
                                                                <Defaults>
                                                                    <ext:Parameter Name="FieldStyle" Value="'color:#000066;font-weight:bold !important'" Mode="Raw" />
                                                                </Defaults>
                                                                <Items>
                                                                    <ext:DisplayField runat="server" FieldLabel="مانده" ID="lbl_SaveVacYear" />

                                                                </Items>
                                                            </ext:FieldSet>
                                                        </Items>
                                                    </ext:Panel>
                                                    <ext:Panel ID="pnlRequest" runat="server" Title="درخواست ها" Icon="ApplicationDouble" Frame="true">
                                                        <Items>
                                                            <ext:FieldSet
                                                                runat="server"
                                                                Flex="1"
                                                                Title="درخواست های مدیریتی"
                                                                Layout="FitLayout"
                                                                DefaultAnchor="100%" ID="set_adminRequests">

                                                                <Defaults>
                                                                    <ext:Parameter Name="IconAlign" Value="right" />
                                                                </Defaults>
                                                                <Items>
                                                                    <ext:Button ID="BtnHourLicense" runat="server" Text="مجوز اضافه کار" Icon="TimeAdd" Handler="" MarginSpec="5 0 3 0" />
                                                                    <ext:Button ID="BtnDailyVacation" runat="server" Text="مرخصي روزانه" Icon="House" Handler="" MarginSpec="0 0 3 0" />
                                                                    <ext:Button ID="BtnHourVacation" runat="server" Text="مرخصي ساعتی" Icon="Time" Handler="" MarginSpec="0 0 3 0" />
                                                                    <ext:Button ID="BtnDailyMission" runat="server" Text="ماموريت روزانه" Icon="World" Handler="" MarginSpec="0 0 3 0" />
                                                                    <ext:Button ID="BtnHourMission" runat="server" Text="ماموريت ساعتی" Icon="Time" Handler="" MarginSpec="0 0 6 0" />
                                                                </Items>
                                                            </ext:FieldSet>

                                                            <ext:FieldSet
                                                                runat="server"
                                                                Flex="1"
                                                                Title="درخواست های فرایندی"
                                                                Layout="FitLayout"
                                                                DefaultAnchor="100%"
                                                                ID="set_FlowRequests">

                                                                <Items>
                                                                    <ext:SegmentedButton runat="server" Vertical="true" MarginSpec="10 0 5 0">
                                                                        <Defaults>
                                                                            <ext:Parameter Name="Height" Value="30" />
                                                                        </Defaults>
                                                                        <Items>
                                                                            <ext:Button ID="BtnTTSDailyVacation" runat="server" Text="درخواست مرخصي روزانه" Handler="" />
                                                                            <ext:Button ID="BtnTTSHourVacation" runat="server" Text="درخواست مرخصي ساعتي" Handler="" />
                                                                            <ext:Button ID="BtnRestVac" runat="server" Text="درخواست مرخصي استراحت - Rest" Handler="" />
                                                                            <ext:Button ID="BtnTTSHourMission" runat="server" Text="درخواست ماموریت ساعتی(درون شهری)" Handler="" />
                                                                            <ext:Button ID="BtnTTSDailyMission" runat="server" Text="درخواست ماموریت روزانه برون شهری" Handler="" />
                                                                            <ext:Button ID="BtnHourOverTimeLicense" runat="server" Text="مجوز اضافه کار ساعتي" Handler="" />
                                                                            <ext:Button ID="BtnTTSDefectForm" runat="server" Text="درخواست ثبت نواقص (فراموشی)" Handler="" />
                                                                            <ext:Button ID="BtnHourOverTimeLicenseHoliday" runat="server" Text="مجوز حضور روز پنجشنبه" Handler="" />
                                                                            <ext:Button ID="BtnDailyMissionBron" runat="server" Text="ماموریت روزانه برون شهری" Handler="" />
                                                                            <ext:Button ID="btnPresenceHourOverTimeLicense" runat="server" Text="درخواست اضافه کار ساعتی سایر" Handler="" />
                                                                        </Items>
                                                                    </ext:SegmentedButton>
                                                                </Items>
                                                            </ext:FieldSet>
                                                        </Items>
                                                    </ext:Panel>

                                                </Items>

                                            </ext:TabPanel>
                                        </Items>

                                    </ext:Panel>


                                    <ext:TabPanel ID="mainGridPanelAttendance" runat="server" Region="Center" RTL="true">
                                        <Items>
                                            <%--**********************************************کارکرد روزانه************************************************************--%>
                                            <ext:GridPanel
                                                runat="server"
                                                MultiSelect="false"
                                                ID="tabDailyWork" AutoLoad="false" Title="کارکرد روزانه" Icon="Date" EmptyText="اطلاعاتی برای این بخش یافت نگردید.">

                                                <Store>
                                                    <ext:Store
                                                        runat="server" AutoLoad="false">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="ID" Type="Int" />
                                                                    <%-- <ext:ModelField Name="Code" />--%>
                                                                    <ext:ModelField Name="DateDay" />
                                                                    <ext:ModelField Name="TypeCode" />
                                                                    <ext:ModelField Name="DayName" />
                                                                    <ext:ModelField Name="TypeName" />
                                                                    <ext:ModelField Name="T1" />
                                                                    <ext:ModelField Name="T2" />
                                                                    <ext:ModelField Name="T3" />
                                                                    <ext:ModelField Name="T4" />
                                                                    <ext:ModelField Name="T5" />
                                                                    <ext:ModelField Name="T6" Type="Int" />
                                                                    <ext:ModelField Name="DeductionTime" />
                                                                    <ext:ModelField Name="EarlyTime" />
                                                                    <ext:ModelField Name="AbsenceTime" />
                                                                    <ext:ModelField Name="DeductionWorking" />
                                                                    <ext:ModelField Name="VacTime" />
                                                                    <ext:ModelField Name="MissTime" />
                                                                    <ext:ModelField Name="ExtraLicPlus" />
                                                                    <ext:ModelField Name="ExtraTime" />
                                                                    <ext:ModelField Name="NightWorkTime" />
                                                                    <ext:ModelField Name="T1S" />
                                                                    <ext:ModelField Name="T2S" />
                                                                    <ext:ModelField Name="T3S" />
                                                                    <ext:ModelField Name="T4S" />
                                                                    <ext:ModelField Name="T5S" />
                                                                    <ext:ModelField Name="T6S" />
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
                                                        <%--<ext:RowNumbererColumn Width="35" runat="server" Text="ردیف" Align="Center" />--%>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="روز ماه"
                                                            Sortable="true"
                                                            DataIndex="DateDay"
                                                            Width="85" TdCls="first-column">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="روز هفته"
                                                            DataIndex="DayName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="وضعيت"
                                                            Sortable="true"
                                                            DataIndex="TypeName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ورود1"
                                                            Sortable="true"
                                                            DataIndex="T1"
                                                            Flex="1">
                                                            <Renderer Fn="setCellColor" />
                                                        </ext:Column>

                                                        <ext:Column
                                                            runat="server"
                                                            Text="خروج1"
                                                            Sortable="true"
                                                            DataIndex="T2"
                                                            Flex="1">
                                                            <Renderer Fn="setCellColor" />
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ورود2"
                                                            Sortable="true"
                                                            DataIndex="T3"
                                                            Flex="1">
                                                            <Renderer Fn="setCellColor" />
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="خروج2"
                                                            Sortable="true"
                                                            DataIndex="T4"
                                                            Flex="1">
                                                            <Renderer Fn="setCellColor" />
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ورود3"
                                                            Sortable="true"
                                                            DataIndex="T5"
                                                            Flex="1">
                                                            <Renderer Fn="setCellColor" />
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="خروج3"
                                                            Sortable="true"
                                                            DataIndex="T6"
                                                            Flex="1">
                                                            <Renderer Fn="setCellColor" />
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاخير"
                                                            Sortable="true"
                                                            DataIndex="DeductionTime"
                                                            Flex="1">
                                                            <Renderer Fn="setCellColor" />
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تعجيل"
                                                            Sortable="true"
                                                            DataIndex="EarlyTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="غیبت شناور"
                                                            Sortable="true"
                                                            DataIndex="AbsenceTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="جمع کسر کار"
                                                            Sortable="true"
                                                            DataIndex="DeductionWorking"
                                                            Flex="1">
                                                            <Renderer Fn="setCellColor" />
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مرخصي"
                                                            Sortable="true"
                                                            DataIndex="VacTime"
                                                            Flex="1">
                                                            <Renderer Fn="setCellColor" />
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ماموريت"
                                                            Sortable="true"
                                                            DataIndex="MissTime"
                                                            Flex="1">
                                                            <Renderer Fn="setCellColor" />
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مازاد حضور"
                                                            Sortable="true"
                                                            DataIndex="ExtraLicPlus"
                                                            Flex="1">
                                                            <Renderer Fn="setCellColor" />
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="اضافه كار"
                                                            Sortable="true"
                                                            DataIndex="ExtraTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="شب کاری"
                                                            Sortable="true"
                                                            DataIndex="NightWorkTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:CommandColumn runat="server" Width="30">
                                                            <Commands>
                                                                <ext:GridCommand Icon="ApplicationViewDetail" CommandName="Detail">
                                                                    <ToolTip Text="جزئيات" />
                                                                </ext:GridCommand>
                                                            </Commands>
                                                            <Listeners>
                                                                <Command Handler="showDetail(command,record)" />
                                                            </Listeners>
                                                        </ext:CommandColumn>
                                                    </Columns>
                                                </ColumnModel>
                                                <ViewConfig StripeRows="false">
                                                    <GetRowClass Fn="setColorRow" />
                                                </ViewConfig>
                                                <Listeners>
                                                    <Activate Handler="getPresenceInfo(null,null,null,false,true)" />
                                                </Listeners>
                                            </ext:GridPanel>

                                            <%--**********************************************کارکرد ماهانه************************************************************--%>
                                            <ext:GridPanel
                                                runat="server"
                                                MultiSelect="false"
                                                ID="tabMonthWork" AutoLoad="false" Title="کارکرد ماهانه" Icon="CalendarViewMonth" EmptyText="اطلاعاتی برای این بخش یافت نگردید.">

                                                <Store>
                                                    <ext:Store
                                                        runat="server" AutoLoad="false">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="Serial" Type="Int" />
                                                                    <ext:ModelField Name="Month" Type="Int" />
                                                                    <ext:ModelField Name="MonthName" />
                                                                    <ext:ModelField Name="FullName" />
                                                                    <%--non--%>
                                                                    <ext:ModelField Name="WorkDay" Type="Int" />
                                                                    <ext:ModelField Name="MaxExtraTime" Type="Int" />
                                                                    <ext:ModelField Name="MorningExtraTime" />
                                                                    <ext:ModelField Name="ExtraTime" />
                                                                    <ext:ModelField Name="VacationExtraTime" />
                                                                    <ext:ModelField Name="DeductionTime" />
                                                                    <ext:ModelField Name="EarlyTime" />
                                                                    <ext:ModelField Name="AbsenceTime" />
                                                                    <ext:ModelField Name="DailyVac" Type="Int" />
                                                                    <ext:ModelField Name="HourVacHM" />
                                                                    <ext:ModelField Name="DailyMission" Type="Int" />
                                                                    <ext:ModelField Name="HourlyMission" />
                                                                    <ext:ModelField Name="VacationDailyMission" Type="Int" />
                                                                    <ext:ModelField Name="DailyVac" Type="Int" />
                                                                    <ext:ModelField Name="DailyVacSick" Type="Int" />
                                                                    <ext:ModelField Name="DailyVacBH" Type="Int" />
                                                                    <ext:ModelField Name="RemainVac" Type="Int" />
                                                                    <ext:ModelField Name="AbsenceDay" Type="Int" />
                                                                    <ext:ModelField Name="DefectCount" Type="Int" />
                                                                    <ext:ModelField Name="PersonnelRef" Type="Int" />
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
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ماه"
                                                            Sortable="true"
                                                            DataIndex="MonthName"
                                                            Flex="1" TdCls="first-column">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="کارکرد"
                                                            DataIndex="WorkDay"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="سقف اضافه كار"
                                                            Sortable="true"
                                                            DataIndex="MaxExtraTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="اضافه کار صبح"
                                                            Sortable="true"
                                                            CellWrap="true"
                                                            DataIndex="MorningExtraTime"
                                                            Flex="1">
                                                        </ext:Column>

                                                        <ext:Column
                                                            runat="server"
                                                            Text="اضافه کار"
                                                            Sortable="true"
                                                            DataIndex="ExtraTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="اضافه کار تعطیل"
                                                            Sortable="true"
                                                            DataIndex="VacationExtraTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاخیر"
                                                            Sortable="true"
                                                            DataIndex="DeductionTime"
                                                            Flex="1">
                                                            <Renderer Fn="setCellColor" />
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تعجیل"
                                                            Sortable="true"
                                                            DataIndex="EarlyTime"
                                                            Flex="1">
                                                            <Renderer Fn="setCellColor" />
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="غیبت شناور"
                                                            Sortable="true"
                                                            DataIndex="AbsenceTime"
                                                            Flex="1">
                                                            <Renderer Fn="setCellColor" />
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مرخصی روزانه"
                                                            Sortable="true"
                                                            DataIndex="DailyVac"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مرخصی ساعتی"
                                                            Sortable="true"
                                                            DataIndex="HourVacHM"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ماموریت روزانه"
                                                            Sortable="true"
                                                            DataIndex="DailyMission"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ماموریت ساعتی"
                                                            Sortable="true"
                                                            DataIndex="HourlyMission"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ماموریت تعطیلی"
                                                            Sortable="true"
                                                            DataIndex="VacationDailyMission"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مرخصی استحقاقی"
                                                            Sortable="true"
                                                            DataIndex="DailyVac"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مرخصی استعلاجی"
                                                            Sortable="true"
                                                            DataIndex="DailyVacSick"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مرخصی بدون حقوق"
                                                            Sortable="true"
                                                            DataIndex="DailyVacBH"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مانده مرخصی"
                                                            Sortable="true"
                                                            DataIndex="RemainVac"
                                                            Flex="1">
                                                        </ext:Column>


                                                        <ext:Column
                                                            runat="server"
                                                            Text="غیبت روزانه"
                                                            Sortable="true"
                                                            DataIndex="AbsenceDay"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تعداد نواقص"
                                                            Sortable="true"
                                                            DataIndex="DefectCount"
                                                            Flex="1">
                                                        </ext:Column>

                                                        <ext:CommandColumn runat="server" Width="40">
                                                            <Commands>
                                                                <ext:GridCommand Icon="ApplicationEdit" CommandName="MonthWorkEdit" Disabled="true">
                                                                    <ToolTip Text="ویرایش" />
                                                                </ext:GridCommand>
                                                            </Commands>
                                                            <Commands>
                                                                <ext:GridCommand Icon="ApplicationDelete" CommandName="MonthWorkDelete" Disabled="true">
                                                                    <ToolTip Text="حذف" />
                                                                </ext:GridCommand>
                                                            </Commands>
                                                            <Listeners>
                                                                <Command Handler="ReActionCommand(command,record)" />
                                                            </Listeners>

                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>

                                                    </Columns>
                                                </ColumnModel>
                                                <ViewConfig StripeRows="false">
                                                    <GetRowClass Fn="setColorRow" />
                                                </ViewConfig>

                                                <TopBar>
                                                    <ext:Toolbar runat="server">
                                                        <Items>

                                                            <ext:Button ID="btnMonthWorkRefresh" runat="server" Text="بروزرسانی" Icon="ArrowRefresh" TabIndex="12" Handler="getPresenceInfo(null,null,null,false)" />

                                                            <ext:Button ID="BtnInsertMonth" runat="server" Text="کارکرد ماهانه جدید" Icon="ApplicationAdd" TabIndex="12" Handler="ReActionCommand('MonthWorkAdd',null)" />

                                                            <ext:ComboBox runat="server" ID="ddlYearPageView_Month" LabelAlign="Right" FieldLabel="سال" Editable="false" DisplayField="Year" ValueField="Year" QueryMode="Local">
                                                                <Listeners>
                                                                    <AfterRender Handler="getYearMonth(this)" />
                                                                    <Select Handler="getPresenceInfo(null,this.getValue(),null,false)"></Select>
                                                                </Listeners>
                                                                <Store>
                                                                    <ext:Store runat="server">
                                                                        <Model>
                                                                            <ext:Model runat="server">
                                                                                <Fields>
                                                                                    <ext:ModelField Name="Year" Type="Int" />
                                                                                </Fields>
                                                                            </ext:Model>
                                                                        </Model>
                                                                    </ext:Store>
                                                                </Store>
                                                            </ext:ComboBox>
                                                        </Items>
                                                    </ext:Toolbar>
                                                </TopBar>
                                                <Listeners>
                                                    <Activate Handler="getPresenceInfo(null,null,null,false,true)" />
                                                </Listeners>
                                            </ext:GridPanel>




                                            <%--**********************************************مرخصی روزانه************************************************************--%>
                                            <ext:GridPanel
                                                runat="server"
                                                MultiSelect="false"
                                                ID="tabDailyVacation" AutoLoad="false" Title="مرخصی روزانه" Icon="DateEdit" EmptyText="اطلاعاتی برای این بخش یافت نگردید.">

                                                <Store>
                                                    <ext:Store
                                                        runat="server" AutoLoad="false">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="Serial" Type="Int" />
                                                                    <ext:ModelField Name="Related" Type="Int" />
                                                                    <ext:ModelField Name="State" />
                                                                    <ext:ModelField Name="FullName" />
                                                                    <%--non--%>
                                                                    <ext:ModelField Name="ReqDate" />
                                                                    <ext:ModelField Name="Duration" Type="Int" />
                                                                    <ext:ModelField Name="StartDate" />
                                                                    <ext:ModelField Name="EndDate" />
                                                                    <ext:ModelField Name="TypeName" />
                                                                    <ext:ModelField Name="StateName" />
                                                                    <ext:ModelField Name="PDFFile" />
                                                                    <ext:ModelField Name="PDFFile" />
                                                                    <ext:ModelField Name="DataRefEnc" />
                                                                    <ext:ModelField Name="PersonnelRefSetForm" />
                                                                    <ext:ModelField Name="SerialEnc" />
                                                                    <ext:ModelField Name="PersonnelRef" />


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
                                                            Text="کارمند"
                                                            Sortable="true"
                                                            DataIndex="FullName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاریخ درخواست"
                                                            DataIndex="ReqDate"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مدت"
                                                            Sortable="true"
                                                            DataIndex="Duration"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاریخ شروع"
                                                            Sortable="true"
                                                            CellWrap="true"
                                                            DataIndex="StartDate"
                                                            Flex="1">
                                                        </ext:Column>

                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاریخ پایان"
                                                            Sortable="true"
                                                            DataIndex="EndDate"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="نوع"
                                                            Sortable="true"
                                                            DataIndex="TypeName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="وضعیت"
                                                            Sortable="true"
                                                            DataIndex="StateName"
                                                            Flex="1">
                                                        </ext:Column>

                                                        <ext:CommandColumn runat="server" Width="70">
                                                            <Commands>

                                                                <ext:GridCommand Icon="ApplicationEdit" CommandName="DailyVacationEdit" Disabled="true">
                                                                    <ToolTip Text="ویرایش" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationDelete" CommandName="DailyVacationDelete" Disabled="true">
                                                                    <ToolTip Text="حذف" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationViewDetail" CommandName="DailyVacationDetail">
                                                                    <ToolTip Text="نمایش پیگیری" />
                                                                </ext:GridCommand>
                                                            </Commands>

                                                            <Listeners>
                                                                <Command Handler="ReActionCommand(command,record)" />
                                                            </Listeners>

                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>
                                                    </Columns>
                                                </ColumnModel>

                                                <TopBar>
                                                    <ext:Toolbar runat="server">
                                                        <Items>

                                                            <ext:Button ID="btnDailyVacRefresh" runat="server" Text="بروزرسانی" Icon="ArrowRefresh" TabIndex="12" Handler="getPresenceInfo(null,null,null,false)" />

                                                            <ext:ComboBox runat="server" ID="ComboBox1" LabelAlign="Right" FieldLabel="سال" Editable="false" DisplayField="Year" ValueField="Year" QueryMode="Local" Width="150" LabelWidth="70">
                                                                <Listeners>
                                                                    <AfterRender Handler="getYearMonth(this)" />
                                                                    <Select Handler="getPresenceInfo(null,this.getValue(),null,false)"></Select>
                                                                </Listeners>
                                                                <Store>
                                                                    <ext:Store runat="server">
                                                                        <Model>
                                                                            <ext:Model runat="server">
                                                                                <Fields>
                                                                                    <ext:ModelField Name="Year" Type="Int" />
                                                                                </Fields>
                                                                            </ext:Model>
                                                                        </Model>
                                                                    </ext:Store>
                                                                </Store>
                                                            </ext:ComboBox>
                                                        </Items>
                                                    </ext:Toolbar>
                                                </TopBar>
                                                <Listeners>
                                                    <Activate Handler="getPresenceInfo(null,null,null,false,true)" />
                                                </Listeners>
                                            </ext:GridPanel>


                                            <%--**********************************************مرخصی ساعتی************************************************************--%>
                                            <ext:GridPanel
                                                runat="server"
                                                MultiSelect="false"
                                                ID="tabHourVacation" AutoLoad="false" Title="مرخصی ساعتی" Icon="ClockEdit" EmptyText="اطلاعاتی برای این بخش یافت نگردید.">

                                                <Store>
                                                    <ext:Store
                                                        runat="server" AutoLoad="false">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="Serial" Type="Int" />
                                                                    <ext:ModelField Name="Related" Type="Int" />
                                                                    <ext:ModelField Name="State" Type="Int" />
                                                                    <ext:ModelField Name="FullName" />
                                                                    <%--non--%>
                                                                    <ext:ModelField Name="ReqDate" />
                                                                    <ext:ModelField Name="UseDate" />
                                                                    <ext:ModelField Name="StartTime" />
                                                                    <ext:ModelField Name="EndTime" />
                                                                    <ext:ModelField Name="UseTime" />
                                                                    <ext:ModelField Name="TypeName" />
                                                                    <ext:ModelField Name="StateName" />
                                                                    <ext:ModelField Name="Dsc" />
                                                                    <ext:ModelField Name="Type" />
                                                                    <ext:ModelField Name="PersonnelRefSetForm" />
                                                                    <ext:ModelField Name="SerialEnc" />
                                                                    <ext:ModelField Name="DataRefEnc" />
                                                                    <ext:ModelField Name="PersonnelRef" />
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
                                                            Text="کارمند"
                                                            Sortable="true"
                                                            DataIndex="FullName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاریخ درخواست"
                                                            DataIndex="ReqDate"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاریخ استفاده"
                                                            Sortable="true"
                                                            DataIndex="UseDate"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ساعت شروع"
                                                            Sortable="true"
                                                            CellWrap="true"
                                                            DataIndex="StartTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ساعت پایان"
                                                            Sortable="true"
                                                            DataIndex="EndTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مدت"
                                                            Sortable="true"
                                                            DataIndex="UseTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="نوع"
                                                            Sortable="true"
                                                            DataIndex="TypeName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="وضعیت"
                                                            Sortable="true"
                                                            DataIndex="StateName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="توضیحات"
                                                            Sortable="true"
                                                            DataIndex="Dsc"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:CommandColumn runat="server" Width="70">
                                                            <Commands>

                                                                <ext:GridCommand Icon="ApplicationEdit" CommandName="HourVacationEdit" Disabled="true">
                                                                    <ToolTip Text="ویرایش" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationDelete" CommandName="HourVacationDelete" Disabled="true">
                                                                    <ToolTip Text="حذف" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationViewDetail" CommandName="HourVacationDetail">
                                                                    <ToolTip Text="نمایش پیگیری" />
                                                                </ext:GridCommand>
                                                            </Commands>
                                                            <Listeners>
                                                                <Command Handler="ReActionCommand(command,record)" />
                                                            </Listeners>
                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>
                                                    </Columns>
                                                </ColumnModel>

                                                <TopBar>
                                                    <ext:Toolbar runat="server" Flex="1">
                                                        <Items>
                                                            <ext:Button ID="Button1" runat="server" Text="بروزرسانی" Icon="ArrowRefresh" TabIndex="12" Handler="getPresenceInfo(null,null,null,false)" />
                                                            <ext:ComboBox runat="server" ID="ComboBox2" LabelAlign="Right" FieldLabel="سال" Editable="false" DisplayField="Year" ValueField="Year" QueryMode="Local" Width="150" LabelWidth="70">
                                                                <Listeners>
                                                                    <AfterRender Handler="getYearMonth(this)" />
                                                                    <Select Handler="getPresenceInfo(null,this.getValue(),null,false)"></Select>
                                                                </Listeners>
                                                                <Store>
                                                                    <ext:Store runat="server">
                                                                        <Model>
                                                                            <ext:Model runat="server">
                                                                                <Fields>
                                                                                    <ext:ModelField Name="Year" Type="Int" />
                                                                                </Fields>
                                                                            </ext:Model>
                                                                        </Model>
                                                                    </ext:Store>
                                                                </Store>
                                                            </ext:ComboBox>
                                                        </Items>
                                                    </ext:Toolbar>
                                                </TopBar>
                                                <BottomBar>
                                                    <ext:Toolbar runat="server">
                                                        <Defaults>
                                                            <ext:Parameter Name="FieldStyle" Value="'color:#000066;font-weight:bold !important'" Mode="Raw" />
                                                        </Defaults>
                                                        <Items>
                                                            <ext:DisplayField runat="server" FieldLabel="مرخصی استفاده شده به ساعت" ID="DisplayField1" Width="250" LabelWidth="200" />
                                                            <ext:DisplayField runat="server" FieldLabel="مرخصی استفاده شده به روز" ID="DisplayField2" Width="250" LabelWidth="200" />

                                                        </Items>
                                                    </ext:Toolbar>
                                                </BottomBar>
                                                <Listeners>
                                                    <Activate Handler="getPresenceInfo(null,null,null,false)" />
                                                </Listeners>
                                            </ext:GridPanel>

                                            <%--**********************************************ماموریت روزانه************************************************************--%>
                                            <ext:GridPanel
                                                runat="server"
                                                MultiSelect="false"
                                                ID="tabDailyMission" AutoLoad="false" Title="ماموریت روزانه" Icon="DateGo" EmptyText="اطلاعاتی برای این بخش یافت نگردید.">
                                                <Store>
                                                    <ext:Store
                                                        runat="server" AutoLoad="false">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="Serial" Type="Int" />
                                                                    <ext:ModelField Name="Related" Type="Int" />
                                                                    <ext:ModelField Name="State" Type="Int" />
                                                                    <ext:ModelField Name="FullName" />
                                                                    <ext:ModelField Name="ReqDate" />
                                                                    <ext:ModelField Name="Duration" Type="Int" />
                                                                    <ext:ModelField Name="StartDate" />
                                                                    <ext:ModelField Name="EndDate" />
                                                                    <ext:ModelField Name="StateName" />
                                                                    <ext:ModelField Name="PDFFile" />
                                                                    <ext:ModelField Name="SerialPayment" Type="Int" />
                                                                    <ext:ModelField Name="ReportSerial" Type="Int" />
                                                                    <ext:ModelField Name="PDFCost" />
                                                                    <ext:ModelField Name="PDFMiss" />
                                                                    <ext:ModelField Name="PDFReport" />
                                                                    <ext:ModelField Name="personnelTiketRef" />
                                                                    <ext:ModelField Name="DataRef" />
                                                                    <ext:ModelField Name="PersonnelRefSetForm" />
                                                                    <ext:ModelField Name="SerialEnc" />
                                                                    <ext:ModelField Name="ReportSerialEnc" />
                                                                    <ext:ModelField Name="DataRefEnc" />
                                                                    <ext:ModelField Name="PDFCostEnc" />
                                                                    <ext:ModelField Name="PDFMissEnc" />
                                                                    <ext:ModelField Name="PDFReportEnc" />
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
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاریخ درخواست"
                                                            DataIndex="ReqDate"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مدت"
                                                            Sortable="true"
                                                            DataIndex="Duration"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاریخ شروع"
                                                            Sortable="true"
                                                            CellWrap="true"
                                                            DataIndex="StartDate"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاریخ پایان"
                                                            Sortable="true"
                                                            DataIndex="EndDate"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="وضعیت"
                                                            Sortable="true"
                                                            DataIndex="StateName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:CommandColumn runat="server" Width="30" Visible="false">
                                                            <Commands>
                                                                <ext:GridCommand Icon="ApplicationEdit" CommandName="Edit">
                                                                    <ToolTip Text="اصلاحیه" />
                                                                </ext:GridCommand>
                                                            </Commands>
                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>

                                                        <ext:CommandColumn runat="server" Text="عملیات" Flex="1">
                                                            <Commands>
                                                                <ext:GridCommand Icon="ApplicationEdit" CommandName="DailyMissionEdit" Disabled="true">
                                                                    <ToolTip Text="ویرایش" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationDelete" CommandName="DailyMissionDelete" Disabled="true">
                                                                    <ToolTip Text="حذف" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationViewDetail" CommandName="DailyMissionDetail">
                                                                    <ToolTip Text="نمایش پیگیری" />
                                                                </ext:GridCommand>
                                                            </Commands>

                                                            <Listeners>
                                                                <Command Handler="ReActionCommand(command,record)" />
                                                            </Listeners>
                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>

                                                        <ext:CommandColumn runat="server" Text="ماموریت" Flex="1">
                                                            <Commands>
                                                                <ext:GridCommand Icon="ApplicationEdit" CommandName="DailyMissionView" Disabled="true">
                                                                    <ToolTip Text="مشاهده ماموریت" />
                                                                </ext:GridCommand>
                                                            </Commands>
                                                            <Listeners>
                                                                <Command Handler="ReActionCommand(command,record)" />
                                                            </Listeners>
                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>

                                                        <ext:CommandColumn runat="server" Text="گزارش" Flex="1">
                                                            <Commands>
                                                                <ext:GridCommand Icon="ApplicationEdit" CommandName="DailyMissionReportAdd">
                                                                    <ToolTip Text="ثبت گزارش" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationDelete" CommandName="DailyMissionReportDelete">
                                                                    <ToolTip Text="حذف گزارش" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationViewDetail" CommandName="DailyMissionReportView">
                                                                    <ToolTip Text="مشاهده گزارش" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationViewDetail" CommandName="DailyMissionReportDetail">
                                                                    <ToolTip Text="سابقه گزارش" />
                                                                </ext:GridCommand>
                                                            </Commands>

                                                            <Listeners>
                                                                <Command Handler="ReActionCommand(command,record)" />
                                                            </Listeners>
                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>


                                                        <ext:CommandColumn runat="server" Text="احکام" Flex="1">
                                                            <Commands>
                                                                <ext:GridCommand Icon="ApplicationEdit" CommandName="DailyMissionFilePDF">
                                                                    <ToolTip Text="حکم" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationDelete" CommandName="DailyMissionCostPDF">
                                                                    <ToolTip Text="هزینه" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationViewDetail" CommandName="DailyMissionLoadPDF">
                                                                    <ToolTip Text="گزارش" />
                                                                </ext:GridCommand>
                                                            </Commands>

                                                            <Listeners>
                                                                <Command Handler="ReActionCommand(command,record)" />
                                                            </Listeners>
                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>


                                                        <ext:CommandColumn runat="server" Text="پرداخت ماموریت" Flex="1">
                                                            <Commands>
                                                                <ext:GridCommand Icon="ApplicationEdit" CommandName="DailyMissionPayment">
                                                                    <ToolTip Text="پرداخت" />
                                                                </ext:GridCommand>
                                                            </Commands>
                                                            <Listeners>
                                                                <Command Handler="ReActionCommand(command,record)" />
                                                            </Listeners>
                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>
                                                    </Columns>
                                                </ColumnModel>
                                                <Listeners>
                                                    <Activate Handler="getPresenceInfo(null,null,null,false)" />
                                                </Listeners>
                                                <TopBar>
                                                    <ext:Toolbar runat="server" Flex="1">
                                                        <Items>
                                                            <ext:ComboBox runat="server" ID="ComboBox3" LabelAlign="Right" FieldLabel="سال" Editable="false" DisplayField="Year" ValueField="Year" QueryMode="Local">
                                                                <Listeners>
                                                                    <AfterRender Handler="getYearMonth(this)" />
                                                                    <Select Handler="getPresenceInfo(null,this.getValue(),null,false)"></Select>
                                                                </Listeners>
                                                                <Store>
                                                                    <ext:Store runat="server">
                                                                        <Model>
                                                                            <ext:Model runat="server">
                                                                                <Fields>
                                                                                    <ext:ModelField Name="Year" Type="Int" />
                                                                                </Fields>
                                                                            </ext:Model>
                                                                        </Model>
                                                                    </ext:Store>
                                                                </Store>
                                                            </ext:ComboBox>

                                                            <ext:Button ID="Button2" runat="server" Text="بروزرسانی" Icon="ArrowRefresh" TabIndex="12" Handler="getPresenceInfo(null,null,null,false)" />

                                                        </Items>
                                                    </ext:Toolbar>
                                                </TopBar>
                                            </ext:GridPanel>
                                            <%--********************************************** ماموریت ساعتی************************************************************--%>
                                            <ext:GridPanel
                                                runat="server"
                                                MultiSelect="false"
                                                ID="tabHourMission" AutoLoad="false" Title=" ماموریت ساعتی" Icon="ClockGo" EmptyText="اطلاعاتی برای این بخش یافت نگردید.">
                                                <Store>
                                                    <ext:Store
                                                        runat="server" AutoLoad="false">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="Serial" Type="Int" />
                                                                    <ext:ModelField Name="Related" Type="Int" />
                                                                    <ext:ModelField Name="State" />
                                                                    <ext:ModelField Name="FullName" />
                                                                    <%--non--%>
                                                                    <ext:ModelField Name="ReqDatE" />
                                                                    <ext:ModelField Name="UseDate" />
                                                                    <ext:ModelField Name="StartTime" />
                                                                    <ext:ModelField Name="EndTime" />
                                                                    <ext:ModelField Name="UseTime" />
                                                                    <ext:ModelField Name="TypeName" />
                                                                    <ext:ModelField Name="StateName" />
                                                                    <ext:ModelField Name="Editing" />
                                                                    <ext:ModelField Name="DataRef" />
                                                                    <ext:ModelField Name="PersonnelRefSetForm" />
                                                                    <ext:ModelField Name="DataRefEnc" />
                                                                    <ext:ModelField Name="PersonnelRefSetForm" />
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
                                                            Text="کارمند"
                                                            Sortable="true"
                                                            DataIndex="FullName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاریخ درخواست"
                                                            DataIndex="ReqDate"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاریخ استفاده"
                                                            Sortable="true"
                                                            DataIndex="UseDate"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ساعت شروع"
                                                            Sortable="true"
                                                            CellWrap="true"
                                                            DataIndex="StartTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ساعت پایان"
                                                            Sortable="true"
                                                            DataIndex="EndTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مدت"
                                                            Sortable="true"
                                                            DataIndex="UseTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="نوع"
                                                            Sortable="true"
                                                            DataIndex="TypeName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="وضعیت"
                                                            Sortable="true"
                                                            DataIndex="StateName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:CommandColumn runat="server" Width="30" Visible="false">
                                                            <Commands>
                                                                <ext:GridCommand Icon="ApplicationEdit" CommandName="Edit">
                                                                    <ToolTip Text="اصلاحیه" />
                                                                </ext:GridCommand>
                                                            </Commands>
                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>
                                                        <ext:CommandColumn runat="server" Width="70">
                                                            <Commands>

                                                                <ext:GridCommand Icon="ApplicationEdit" CommandName="HourMissionEdit" Disabled="true">
                                                                    <ToolTip Text="ویرایش" />

                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationDelete" CommandName="HourMissionDelete" Disabled="true">
                                                                    <ToolTip Text="حذف" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationViewDetail" CommandName="HourMissionDetail">
                                                                    <ToolTip Text="نمایش پیگیری" />
                                                                </ext:GridCommand>
                                                            </Commands>

                                                            <Listeners>
                                                                <Command Handler="ReActionCommand(command,record)" />
                                                            </Listeners>
                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>
                                                    </Columns>
                                                </ColumnModel>

                                                <TopBar>
                                                    <ext:Toolbar runat="server">
                                                        <Items>

                                                            <ext:Button ID="btnHourMissionRefresh" runat="server" Text="بروزرسانی" Icon="ArrowRefresh" TabIndex="12" Handler="getPresenceInfo(null,null,null,false)" />

                                                            <ext:ComboBox runat="server" ID="cmbHourMissionYear" LabelAlign="Right" FieldLabel="سال" Editable="false" DisplayField="Year" ValueField="Year" QueryMode="Local" Width="150" LabelWidth="70">
                                                                <Listeners>
                                                                    <AfterRender Handler="getYearMonth(this)" />
                                                                    <Select Handler="getPresenceInfo(null,this.getValue(),null,false)"></Select>
                                                                </Listeners>
                                                                <Store>
                                                                    <ext:Store runat="server">
                                                                        <Model>
                                                                            <ext:Model runat="server">
                                                                                <Fields>
                                                                                    <ext:ModelField Name="Year" Type="Int" />
                                                                                </Fields>
                                                                            </ext:Model>
                                                                        </Model>
                                                                    </ext:Store>
                                                                </Store>
                                                            </ext:ComboBox>
                                                        </Items>
                                                    </ext:Toolbar>
                                                </TopBar>
                                                <Listeners>
                                                    <Activate Handler="getPresenceInfo(null,null,null,false,true)" />
                                                </Listeners>
                                            </ext:GridPanel>


                                            <%--********************************************** مجوز اضافه کار ساعتی************************************************************--%>
                                            <ext:GridPanel
                                                runat="server"
                                                MultiSelect="false"
                                                ID="tabHourLicense" AutoLoad="false" Title="مجوزاضافه کارساعتی" Icon="ClockAdd" EmptyText="اطلاعاتی برای این بخش یافت نگردید.">
                                                <Store>
                                                    <ext:Store
                                                        runat="server" AutoLoad="false">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="Serial" Type="Int" />
                                                                    <ext:ModelField Name="Related" Type="Int" />
                                                                    <ext:ModelField Name="State" />
                                                                    <ext:ModelField Name="FullName" />
                                                                    <ext:ModelField Name="ReqDate" />
                                                                    <ext:ModelField Name="UseDate" Type="Int" />
                                                                    <ext:ModelField Name="StartTime" />
                                                                    <ext:ModelField Name="EndTime" />
                                                                    <ext:ModelField Name="UseTime" />
                                                                    <ext:ModelField Name="TypeName" />
                                                                    <ext:ModelField Name="StateName" />
                                                                    <ext:ModelField Name="DataRefEnc" />
                                                                    <ext:ModelField Name="PersonnelRefSetForm" Type="Int" />
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
                                                            Text="کارمند"
                                                            Sortable="true"
                                                            DataIndex="FullName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاریخ درخواست"
                                                            DataIndex="ReqDate"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاریخ استفاده"
                                                            Sortable="true"
                                                            DataIndex="UseDate"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ساعت شروع"
                                                            Sortable="true"
                                                            CellWrap="true"
                                                            DataIndex="StartTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ساعت پایان"
                                                            Sortable="true"
                                                            DataIndex="EndTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مدت"
                                                            Sortable="true"
                                                            DataIndex="UseTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="نوع"
                                                            Sortable="true"
                                                            DataIndex="TypeName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="وضعیت"
                                                            Sortable="true"
                                                            DataIndex="StateName"
                                                            Flex="1">
                                                        </ext:Column>

                                                        <ext:CommandColumn runat="server" Width="70">
                                                            <Commands>
                                                                <ext:GridCommand Icon="ApplicationDelete" CommandName="HourLicenseDelete" Disabled="true">
                                                                    <ToolTip Text="حذف" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationViewDetail" CommandName="HourLicenseDetail">
                                                                    <ToolTip Text="نمایش پیگیری" />
                                                                </ext:GridCommand>
                                                            </Commands>
                                                            <Listeners>
                                                                <Command Handler="ReActionCommand(command,record)" />
                                                            </Listeners>
                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>
                                                    </Columns>
                                                </ColumnModel>

                                                <TopBar>
                                                    <ext:Toolbar runat="server">
                                                        <Items>
                                                            <ext:Button ID="btnHourLicenseRefresh" runat="server" Text="بروزرسانی" Icon="ArrowRefresh" TabIndex="12" Handler="getPresenceInfo(null,null,null,false)" />
                                                            <ext:ComboBox runat="server" ID="cmbHourLicense" LabelAlign="Right" FieldLabel="سال" Editable="false" DisplayField="Year" ValueField="Year" QueryMode="Local" Width="150" LabelWidth="70">
                                                                <Listeners>
                                                                    <AfterRender Handler="getYearMonth(this)" />
                                                                    <Select Handler="getPresenceInfo(null,this.getValue(),null,false)"></Select>
                                                                </Listeners>
                                                                <Store>
                                                                    <ext:Store runat="server">
                                                                        <Model>
                                                                            <ext:Model runat="server">
                                                                                <Fields>
                                                                                    <ext:ModelField Name="Year" Type="Int" />
                                                                                </Fields>
                                                                            </ext:Model>
                                                                        </Model>
                                                                    </ext:Store>
                                                                </Store>
                                                            </ext:ComboBox>
                                                        </Items>
                                                    </ext:Toolbar>
                                                </TopBar>
                                                <Listeners>
                                                    <Activate Handler="getPresenceInfo(null,null,null,false,true)" />
                                                </Listeners>
                                            </ext:GridPanel>


                                            <%--********************************************** ذخیره مرخصی************************************************************--%>
                                            <ext:GridPanel
                                                runat="server"
                                                MultiSelect="false"
                                                ID="tabSavedVacation" AutoLoad="false" Title="ذخیره مرخصی" Icon="TableSave" EmptyText="اطلاعاتی برای این بخش یافت نگردید.">
                                                <Store>
                                                    <ext:Store
                                                        runat="server" AutoLoad="false">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="Serial" Type="Int" />
                                                                    <ext:ModelField Name="Year" />
                                                                    <ext:ModelField Name="DesertUse" />
                                                                    <ext:ModelField Name="Remain" />
                                                                    <ext:ModelField Name="Saved" />
                                                                    <ext:ModelField Name="TotalSaved" />
                                                                    <ext:ModelField Name="PersonnelRef" />
                                                                    <ext:ModelField Name="PdfFileName" />
                                                                    <ext:ModelField Name="IsConfirmation" />
                                                                    <ext:ModelField Name="SerialEnc" />


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
                                                            Text="سال"
                                                            Sortable="true"
                                                            DataIndex="Year"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="استحقاقی"
                                                            DataIndex="DesertUse"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مانده مرخصی"
                                                            Sortable="true"
                                                            DataIndex="Remain"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ذخیره مرخصی"
                                                            Sortable="true"
                                                            CellWrap="true"
                                                            DataIndex="Saved"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ذخیره کل"
                                                            Sortable="true"
                                                            DataIndex="TotalSaved"
                                                            Flex="1">
                                                        </ext:Column>

                                                        <ext:CommandColumn runat="server" Width="70">
                                                            <Commands>
                                                                <ext:GridCommand Icon="ApplicationEdit" CommandName="SavedVacationEdit" Disabled="true">
                                                                    <ToolTip Text="ويرايش" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationDelete" CommandName="SavedVacationDelete" Disabled="true">
                                                                    <ToolTip Text="حذف" />
                                                                </ext:GridCommand>
                                                            </Commands>
                                                            <Listeners>
                                                                <Command Handler="ReActionCommand(command,record)" />

                                                            </Listeners>
                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>
                                                        <%--                                    <ext:CommandColumn runat="server" Width="70" Visible="false">
                                        <Commands>
                                            <ext:GridCommand Icon="ApplicationViewDetail" CommandName="SavedVacationRemind">
                                                <ToolTip Text="مانده مرخصی" />
                                            </ext:GridCommand>
                                        </Commands>
                                        <Listeners>
                                            <Command Handler="ReActionCommand(command,record)" />

                                        </Listeners>
                                        <PrepareToolbar Fn="setGridAccesses" />
                                    </ext:CommandColumn>--%>
                                                    </Columns>
                                                </ColumnModel>

                                                <TopBar>
                                                    <ext:Toolbar runat="server">
                                                        <Items>
                                                            <ext:Button ID="btnSavedVacationRefresh" runat="server" Text="بروزرسانی" Icon="ArrowRefresh" TabIndex="12" Handler="getPresenceInfo(null,null,null,false)" />
                                                            <ext:Button ID="BtnInsertSavedVacation" runat="server" Text="ثبت ذخیره مرخصی سال جدید" Icon="Add" TabIndex="12" Handler="ReActionCommand('SavedVacationAdd',null)" />
                                                        </Items>
                                                    </ext:Toolbar>
                                                </TopBar>
                                                <Listeners>
                                                    <Activate Handler="getPresenceInfo(null,null,null,false,true)" />
                                                </Listeners>
                                            </ext:GridPanel>

                                            <%--**********************************************  ورود و خروج ناقص************************************************************--%>
                                            <ext:GridPanel
                                                runat="server"
                                                MultiSelect="false"
                                                ID="tabDefectForms" AutoLoad="false" Title="ورود و خروج ناقص" Icon="ClockDelete" EmptyText="اطلاعاتی برای این بخش یافت نگردید.">
                                                <Store>
                                                    <ext:Store
                                                        runat="server" AutoLoad="false">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="Serial" Type="Int" />
                                                                    <ext:ModelField Name="Related" Type="Int" />
                                                                    <ext:ModelField Name="State" />
                                                                    <ext:ModelField Name="FullName" />
                                                                    <ext:ModelField Name="UseDate" />
                                                                    <ext:ModelField Name="HourMin" />
                                                                    <ext:ModelField Name="TYPENAME" />
                                                                    <ext:ModelField Name="STATENAME" />
                                                                    <ext:ModelField Name="ResConfirmText" />
                                                                    <ext:ModelField Name="DataRef" />
                                                                    <ext:ModelField Name="PersonnelRefSetForm" />
                                                                    <ext:ModelField Name="DataRefEnc" />

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
                                                            Text="کارمند"
                                                            Sortable="true"
                                                            DataIndex="FullName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاریخ استفاده"
                                                            DataIndex="UseDate"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="زمان ثبت شده"
                                                            Sortable="true"
                                                            DataIndex="HourMin"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="نوع"
                                                            Sortable="true"
                                                            CellWrap="true"
                                                            DataIndex="TYPENAME"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="وضعیت"
                                                            Sortable="true"
                                                            DataIndex="STATENAME"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="نظرمسئول"
                                                            Sortable="true"
                                                            DataIndex="ResConfirmText"
                                                            Flex="1">
                                                        </ext:Column>


                                                        <ext:CommandColumn runat="server" Width="70">
                                                            <Commands>
                                                                <ext:GridCommand Icon="ApplicationDelete" CommandName="DefectFormsDelete" Disabled="true">
                                                                    <ToolTip Text="حذف" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationViewDetail" CommandName="DefectFormsDetail">
                                                                    <ToolTip Text="نمایش پیگیری" />
                                                                </ext:GridCommand>
                                                            </Commands>
                                                            <Listeners>
                                                                <Command Handler="ReActionCommand(command,record)" />
                                                            </Listeners>
                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>
                                                    </Columns>
                                                </ColumnModel>

                                                <TopBar>
                                                    <ext:Toolbar runat="server">
                                                        <Items>
                                                            <ext:Button ID="btnDefectFormsRefresh" runat="server" Text="بروزرسانی" Icon="ArrowRefresh" TabIndex="12" Handler="getPresenceInfo(null,null,null,false)" />
                                                        </Items>
                                                    </ext:Toolbar>
                                                </TopBar>
                                                <Listeners>
                                                    <Activate Handler="getPresenceInfo(null,null,null,false,true)" />
                                                </Listeners>
                                            </ext:GridPanel>

                                            <%--**********************************************مشاهده و ثبت نواقص************************************************************--%>
                                            <ext:GridPanel
                                                runat="server"
                                                MultiSelect="false"
                                                ID="tabDefects" AutoLoad="false" Title="مشاهده و ثبت نواقص" Icon="TableError" EmptyText="اطلاعاتی برای این بخش یافت نگردید.">
                                                <Store>
                                                    <ext:Store
                                                        runat="server" AutoLoad="false">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="Serial" Type="Int" />
                                                                    <ext:ModelField Name="TypeCode" Type="Int" />
                                                                    <ext:ModelField Name="StartTime" />
                                                                    <ext:ModelField Name="EndTime" />
                                                                    <ext:ModelField Name="Date" />
                                                                    <ext:ModelField Name="TypeName" />
                                                                    <ext:ModelField Name="REnterTime" />
                                                                    <ext:ModelField Name="RExitTime" />
                                                                    <ext:ModelField Name="Dur" />
                                                                    <ext:ModelField Name="txtDesc" />
                                                                    <ext:ModelField Name="PersonnelRefSetForm" />
                                                                    <ext:ModelField Name="PersonnelRef" />

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
                                                            Text="تاریخ"
                                                            Sortable="true"
                                                            DataIndex="Date"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="نوع نقص"
                                                            DataIndex="TypeName"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="از ساعت"
                                                            Sortable="true"
                                                            DataIndex="REnterTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تا ساعت"
                                                            Sortable="true"
                                                            CellWrap="true"
                                                            DataIndex="RExitTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="مدت"
                                                            Sortable="true"
                                                            DataIndex="Dur"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="نظرمسئول"
                                                            Sortable="true"
                                                            DataIndex="ResConfirmText"
                                                            Flex="1">
                                                        </ext:Column>

                                                        <ext:Column
                                                            runat="server"
                                                            Editor="true"
                                                            DataIndex="ComboField"
                                                            Flex="1"
                                                            Text="نوع فرم">
                                                            <Renderer Fn="getDefectsType" />

                                                        </ext:Column>
                                                    </Columns>
                                                </ColumnModel>

                                                <TopBar>
                                                    <ext:Toolbar runat="server">
                                                        <Items>
                                                            <ext:Button ID="Button12" runat="server" Text="بروزرسانی" Icon="ArrowRefresh" TabIndex="12" Handler="getPresenceInfo(null,null,null,false)" />
                                                        </Items>
                                                    </ext:Toolbar>
                                                </TopBar>
                                                <Listeners>
                                                    <Activate Handler="getPresenceInfo(null,null,null,false,true)" />
                                                </Listeners>
                                            </ext:GridPanel>

                                            <%--********************************************** پرسنل زیرمجموعه************************************************************--%>
                                            <ext:GridPanel
                                                runat="server"
                                                MultiSelect="false"
                                                ID="tblPersonnelSub" AutoLoad="false" Title="پرسنل زیر مجموعه" AutoDataBind="false" Icon="User" EmptyText="اطلاعاتی برای این بخش یافت نگردید.">
                                                <Tools>
                                                    <ext:Tool Type="Save" />
                                                </Tools>
                                                <Store>
                                                    <ext:Store runat="server" AutoLoad="false" PageSize="5" AutoDataBind="false">
                                                        <Model>
                                                            <ext:Model runat="server">
                                                                <Fields>
                                                                    <ext:ModelField Name="Serial" Type="Int" />
                                                                    <ext:ModelField Name="PersonnelRef" Type="Int" />
                                                                    <ext:ModelField Name="RFullName" />
                                                                    <ext:ModelField Name="WorkDay" />
                                                                    <ext:ModelField Name="TypeName" />
                                                                    <ext:ModelField Name="Code" />
                                                                    <ext:ModelField Name="ExtraTime" />
                                                                    <ext:ModelField Name="VacationExtraTime" />
                                                                    <ext:ModelField Name="InvalidExtraTime" />
                                                                    <ext:ModelField Name="DeductionTime" />
                                                                    <ext:ModelField Name="AbsenceTime" />
                                                                    <ext:ModelField Name="EarlyTime" />
                                                                    <ext:ModelField Name="DeductionWorking" />
                                                                    <ext:ModelField Name="AbsenceDay" />
                                                                    <ext:ModelField Name="T1" />
                                                                    <ext:ModelField Name="T2" />
                                                                    <ext:ModelField Name="T3" />
                                                                    <ext:ModelField Name="T4" />
                                                                    <ext:ModelField Name="T5" />
                                                                    <ext:ModelField Name="T6" />
                                                                    <ext:ModelField Name="Photo" />
                                                                </Fields>
                                                            </ext:Model>
                                                        </Model>
                                                        <Proxy>
                                                            <ext:LocalStorageProxy AutoDataBind="false">
                                                                <%-- <Reader>
                                                <ext:JsonReader >
                                                </ext:JsonReader>

                                            </Reader>--%>
                                                            </ext:LocalStorageProxy>

                                                        </Proxy>
                                                    </ext:Store>
                                                </Store>

                                                <ColumnModel runat="server">
                                                    <Columns>
                                                        <ext:RowNumbererColumn Width="35" runat="server" Text="ردیف" Align="Center" />
                                                        <ext:Column
                                                            runat="server"
                                                            Text="عکس پرسنلی">
                                                            <%-- <Renderer Fn="setPersonnelPhoto" />--%>
                                                        </ext:Column>

                                                        <ext:Column
                                                            runat="server"
                                                            Text="مشخصات کارمند"
                                                            Sortable="true"
                                                            Flex="2">
                                                            <Renderer Fn="setSubPersonnelInfo" />
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="اضافه کار"
                                                            Sortable="true"
                                                            DataIndex="ExtraTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تعطیل کاری"
                                                            DataIndex="VacationExtraTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="شب کاری"
                                                            Sortable="true"
                                                            DataIndex="InvalidExtraTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تاخیر"
                                                            Sortable="true"
                                                            CellWrap="true"
                                                            DataIndex="DeductionTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="غیبت شناور"
                                                            Sortable="true"
                                                            DataIndex="AbsenceTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="تعجیل"
                                                            Sortable="true"
                                                            DataIndex="EarlyTime"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="جمع کسرکار"
                                                            Sortable="true"
                                                            DataIndex="DeductionWorking"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="غیبت"
                                                            Sortable="true"
                                                            DataIndex="AbsenceDay"
                                                            Flex="1">
                                                        </ext:Column>

                                                        <ext:Column
                                                            runat="server"
                                                            Text="ورود1"
                                                            Sortable="true"
                                                            DataIndex="T1"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="خروج1"
                                                            Sortable="true"
                                                            DataIndex="T2"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ورود2"
                                                            Sortable="true"
                                                            DataIndex="T3"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="خروج2"
                                                            Sortable="true"
                                                            DataIndex="T4"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="ورود3"
                                                            Sortable="true"
                                                            DataIndex="T5"
                                                            Flex="1">
                                                        </ext:Column>
                                                        <ext:Column
                                                            runat="server"
                                                            Text="خروج3"
                                                            Sortable="true"
                                                            DataIndex="T6"
                                                            Flex="1">
                                                        </ext:Column>

                                                        <ext:CommandColumn runat="server" Width="70">
                                                            <Commands>
                                                                <ext:GridCommand Icon="ApplicationAdd" CommandName="Delete">
                                                                    <ToolTip Text="ثبت نواقص" />
                                                                </ext:GridCommand>
                                                                <ext:GridCommand Icon="ApplicationViewDetail" CommandName="Edit">
                                                                    <ToolTip Text="جزئیات" />
                                                                </ext:GridCommand>
                                                            </Commands>
                                                            <Listeners>
                                                                <%--       <Command Handler="editWork(command,record)" />--%>
                                                            </Listeners>
                                                            <PrepareToolbar Fn="setGridAccesses" />
                                                        </ext:CommandColumn>
                                                    </Columns>
                                                </ColumnModel>

                                                <TopBar>
                                                    <ext:Toolbar runat="server">
                                                        <Items>

                                                            <ext:TextField runat="server" LabelAlign="Right" FieldLabel="کارمند" Name="txtPersonnelName" ID="txtPersonnelName" />
                                                            <ext:TextField runat="server" LabelAlign="Right" FieldLabel="کد پرسنلی" Name="txtPersonnelCode" ID="txtPersonnelCode" />
                                                            <ext:ComboBox ID="ddlPersonnelGroup" LabelAlign="Right" runat="server" FieldLabel="واحدسازمانی" Width="700" LabelWidth="130" Editable="false">
                                                                <Listeners>
                                                                    <AfterRender Handler="getPersonnelGroup(this)" />
                                                                </Listeners>
                                                            </ext:ComboBox>
                                                            <ext:Button ID="btnSearch" runat="server" Text="جستجو" TabIndex="12" Handler="getPersonnelSubInfo(this.up(),1)" IconAlign="Right" Icon="Find" AutoShow="True" />

                                                        </Items>
                                                    </ext:Toolbar>
                                                </TopBar>
                                                <BottomBar>
                                                    <ext:PagingToolbar runat="server" AutoDataBind="false" AfterPageText="صفحه بعد" BeforePageText="صفحه قبل" NextText="صفحه بعد" PrevText="صفحه قبل" FirstText="صفحه اول" LastText="صفحه آخر" RefreshText="بارگذاری مجدد">
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
                                                                    <ext:ListItem Value="5" />
                                                                </SelectedItems>
                                                                <Listeners>
                                                                    <Select Handler="#{tblPersonnelSub}.store.pageSize = parseInt(this.getValue(), 10); /*#{tblPersonnelSub}.store.reload();*/ getPersonnelSubInfo(this.up(), 1)" />
                                                                </Listeners>
                                                            </ext:ComboBox>
                                                        </Items>
                                                        <Listeners>
                                                            <BeforeChange Fn="getPersonnelSubInfo" />

                                                        </Listeners>
                                                    </ext:PagingToolbar>
                                                </BottomBar>
                                                <Listeners>
                                                    <AfterRender Handler="getPersonnelSubInfo(this,1)" />
                                                </Listeners>
                                                <%--<Plugins>
                                <ext:FilterHeader runat="server" />
                            </Plugins>--%>
                                            </ext:GridPanel>
                                        </Items>

                                        <Listeners>

                                            <%--     <AfterLayout Handler=""></AfterLayout>--%>
                                            <AfterRender Handler="tabPanelMain = this;" />

                                        </Listeners>
                                    </ext:TabPanel>
                                </Items>

                            </ext:Panel>

                            <ext:GridPanel
                                runat="server"
                                Title="مدیریت کدهای حضور"
                                ID="TabPresenceCode" Icon="CalendarSelectDay">
                                <TopBar>

                                    <ext:Toolbar runat="server">
                                        <Items>
                                            <ext:Button runat="server" Text="کد حضور جدید" Icon="Add" Handler="showPresenceCodeWindow(this.up('grid'),'Add',0)" />

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
                                                    <ext:ModelField Name="Title" />
                                                    <ext:ModelField Name="Code" Type="Int" />
                                                    <ext:ModelField Name="RealTime" />
                                                    <ext:ModelField Name="ExtraTime" />
                                                    <ext:ModelField Name="NightTime" />
                                                    <ext:ModelField Name="LunchTime" />
                                                    <ext:ModelField Name="EnterFlexible" />
                                                    <ext:ModelField Name="ExitFlexible" />
                                                    <ext:ModelField Name="WorkTypeTitle" />
                                                    <ext:ModelField Name="IsLunchOvertime" Type="Boolean" />
                                                    <ext:ModelField Name="MaxExtra" />
                                                    <ext:ModelField Name="MinExtra" />
                                                    <ext:ModelField Name="MaxLicExtra" />
                                                    <ext:ModelField Name="MinLicExtra" />
                                                    <ext:ModelField Name="FloatTime" />
                                                    <ext:ModelField Name="EnterFlexibleDeduction" Type="Boolean" />
                                                    <ext:ModelField Name="IsNotDailyVacation" Type="Boolean" />
                                                    <ext:ModelField Name="IsLicExtraHourMission" Type="Boolean" />
                                                    <ext:ModelField Name="IsLicNightWork" Type="Boolean" />

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
                                            Text="کد"
                                            Sortable="true"
                                            DataIndex="Code"
                                            Width="40" />

                                        <ext:Column
                                            runat="server"
                                            Text="عنوان"
                                            Sortable="true"
                                            DataIndex="Title"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="حضور اداری"
                                            Sortable="true"
                                            DataIndex="RealTime"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="اضافه کار عادی"
                                            Sortable="true"
                                            DataIndex="ExtraTime"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="زمان ناهار"
                                            Sortable="true"
                                            DataIndex="LunchTime"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="شب کاری"
                                            Sortable="true"
                                            DataIndex="NightTime"
                                            Width="50">
                                        </ext:Column>

                                        <ext:Column
                                            runat="server"
                                            Text="ارفاق در ورود"
                                            Sortable="true"
                                            DataIndex="EnterFlexible"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="ارفاق در خروج"
                                            Sortable="true"
                                            DataIndex="ExitFlexible"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="سقف اضافه کار"
                                            Sortable="true"
                                            DataIndex="MaxExtra"
                                            Flex="1" ToolTip="سقف اضافه کار">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="حداقل اضافه کار"
                                            Sortable="true"
                                            DataIndex="MinExtra"
                                            Flex="1" ToolTip="حداقل اضافه کار">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="سقف اضافه کار با مجوز"
                                            Sortable="true"
                                            DataIndex="MaxLicExtra"
                                            Flex="1" ToolTip="سقف اضافه کار با مجوز">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="حداقل اضافه کار مجوز"
                                            Sortable="true"
                                            DataIndex="MinLicExtra"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="شناوری"
                                            Sortable="true"
                                            DataIndex="FloatTime"
                                            Width="45">
                                        </ext:Column>
                                        <ext:CheckColumn
                                            runat="server"
                                            Text="اضافه کار ناهار"
                                            Sortable="true"
                                            DataIndex="IsLunchOvertime"
                                            Flex="1" ToolTip="اضافه کار ناهار">
                                        </ext:CheckColumn>
                                        <ext:CheckColumn
                                            runat="server"
                                            Text="ارفاق در ورود مشمول کسرکار نباشد"
                                            Sortable="true"
                                            DataIndex="EnterFlexibleDeduction"
                                            Flex="1"
                                            CellWrap="true" ToolTip="ارفاق در ورود مشمول کسرکار نباشد">
                                        </ext:CheckColumn>
                                        <ext:CheckColumn
                                            runat="server"
                                            Text="ماموریت ساعتی نیاز به مجوز دارد"
                                            Sortable="true"
                                            DataIndex="IsLicExtraHourMission"
                                            Flex="1" CellWrap="true" ToolTip="ماموریت ساعتی نیاز به مجوز دارد" ToolTipType="Qtip">
                                        </ext:CheckColumn>
                                        <ext:CheckColumn
                                            runat="server"
                                            Text="امکان ثبت مرخصی روزانه نداشته باشد"
                                            Sortable="true"
                                            DataIndex="IsNotDailyVacation"
                                            Flex="1" CellWrap="true" ToolTip="امکان ثبت مرخصی روزانه نداشته باشد">
                                        </ext:CheckColumn>
                                        <ext:CheckColumn
                                            runat="server"
                                            Text="شب کاری نیاز به مجوز دارد"
                                            Sortable="true"
                                            DataIndex="IsLicNightWork"
                                            Flex="1" CellWrap="true" ToolTip="شب کاری نیاز به مجوز دارد">
                                        </ext:CheckColumn>
                                        <ext:Column
                                            runat="server"
                                            Text="نوع حضور"
                                            Sortable="true"
                                            DataIndex="WorkTypeTitle"
                                            Flex="1" CellWrap="true">
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
                                                <Command Handler="if(command ==='Edit'){showPresenceCodeWindow(this.up('grid'),'Edit',record.data.ID)}else{deletePresenceCode(this.up('grid'), record)}" />
                                            </Listeners>
                                        </ext:CommandColumn>
                                    </Columns>
                                </ColumnModel>
                                <Listeners>
                                    <AfterRender Handler="getPresenceCodes(this)" />
                                    <RowDblClick Handler="showPresenceCodeWindow(this, 'Edit', null)" />
                                </Listeners>
                                <Plugins>
                                    <ext:FilterHeader runat="server" />
                                </Plugins>
                            </ext:GridPanel>

                            <ext:GridPanel
                                runat="server"
                                Title="مدیریت شیفت ها"
                                ID="TabShifts" Icon="CalendarViewMonth" >
                                <TopBar>

                                    <ext:Toolbar runat="server">
                                        <Items>
                                            <ext:Button runat="server" Text="شیفت جدید" Icon="Add" Handler="showShiftWindow(this.up('grid'),'Add',0)" />

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
                                                    <ext:ModelField Name="Title" />
                                                    <ext:ModelField Name="MaxExtraTime" />
                                                    <ext:ModelField Name="MinExtraTime" />
                                                    <ext:ModelField Name="DelayTime" />
                                                    <ext:ModelField Name="EarlyTime" />
                                                    <ext:ModelField Name="DeductionTime" />
                                                    <ext:ModelField Name="IsHourly" Type="Boolean" />
                                                    <ext:ModelField Name="MinHourlyTime" />
                                                    <ext:ModelField Name="IsDynamicWork" Type="Boolean" />
                                                    <ext:ModelField Name="ShiftTypeTitle" />
                                                    <ext:ModelField Name="IsBaseShift" Type="Boolean" />
                                                    <ext:ModelField Name="PersonnelCount" Type="Int" />
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
                                            Text="عنوان"
                                            Sortable="true"
                                            DataIndex="Title"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="حداکثر اضافه کار"
                                            Sortable="true"
                                            DataIndex="MaxExtraTime"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="حداقل اضافه کار"
                                            Sortable="true"
                                            DataIndex="MinExtraTime"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="تاخیر مجاز"
                                            Sortable="true"
                                            DataIndex="DelayTime"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="تعجیل مجاز"
                                            Sortable="true"
                                            DataIndex="EarlyTime"
                                            Flex="1">
                                        </ext:Column>

                                        <ext:Column
                                            runat="server"
                                            Text="کسرکار مجاز"
                                            Sortable="true"
                                            DataIndex="DeductionTime"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="نوع نوبت کاری"
                                            Sortable="true"
                                            DataIndex="ShiftTypeTitle"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:CheckColumn
                                            runat="server"
                                            Text="شیفت ساعتی"
                                            Sortable="true"
                                            DataIndex="IsHourly"
                                            Flex="1">
                                        </ext:CheckColumn>
                                        <ext:Column
                                            runat="server"
                                            Text="حداقل ساعت کارکرد"
                                            Sortable="true"
                                            DataIndex="MinHourlyTime"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:CheckColumn
                                            runat="server"
                                            Text="حضور پویا"
                                            Sortable="true"
                                            DataIndex="IsDynamicWork"
                                            Flex="1">
                                        </ext:CheckColumn>

                                        <ext:CheckColumn
                                            runat="server"
                                            Text="شیفت پایه"
                                            Sortable="true"
                                            DataIndex="IsBaseShift"
                                            Flex="1">
                                        </ext:CheckColumn>
                                        <ext:Column
                                            runat="server"
                                            Text="تعداد نفرات تخصيص شده"
                                            Sortable="true"
                                            DataIndex="PersonnelCount"
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
                                                <Command Handler="if(command ==='Edit'){showShiftWindow(this.up('grid'),'Edit',record.data.ID)}else{deleteShift(this.up('grid'), record)}" />
                                            </Listeners>
                                        </ext:CommandColumn>
                                    </Columns>
                                </ColumnModel>
                                <Listeners>
                                    <AfterRender Handler="getShifts(this)" />
                                    <RowDblClick Handler="showShiftWindow(this, 'Edit', null)" />
                                </Listeners>
                                <Plugins>
                                    <ext:FilterHeader runat="server" />
                                </Plugins>
                            </ext:GridPanel>

                            <ext:GridPanel
                                runat="server"
                                Title="مدیریت ماه ها"
                                ID="TabMonths" Icon="CalendarViewMonth" >
                                <TopBar>

                                    <ext:Toolbar runat="server">
                                        <Items>
                                            <ext:Button runat="server" Text="شیفت جدید" Icon="Add" Handler="showShiftWindow(this.up('grid'),'Add',0)" />

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
                                                    <ext:ModelField Name="Title" />
                                                    <ext:ModelField Name="MaxExtraTime" />
                                                    <ext:ModelField Name="MinExtraTime" />
                                                    <ext:ModelField Name="DelayTime" />
                                                    <ext:ModelField Name="EarlyTime" />
                                                    <ext:ModelField Name="DeductionTime" />
                                                    <ext:ModelField Name="IsHourly" Type="Boolean" />
                                                    <ext:ModelField Name="MinHourlyTime" />
                                                    <ext:ModelField Name="IsDynamicWork" Type="Boolean" />
                                                    <ext:ModelField Name="ShiftTypeTitle" />
                                                    <ext:ModelField Name="IsBaseShift" Type="Boolean" />
                                                    <ext:ModelField Name="PersonnelCount" Type="Int" />
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
                                            Text="عنوان"
                                            Sortable="true"
                                            DataIndex="Title"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="حداکثر اضافه کار"
                                            Sortable="true"
                                            DataIndex="MaxExtraTime"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="حداقل اضافه کار"
                                            Sortable="true"
                                            DataIndex="MinExtraTime"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="تاخیر مجاز"
                                            Sortable="true"
                                            DataIndex="DelayTime"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="تعجیل مجاز"
                                            Sortable="true"
                                            DataIndex="EarlyTime"
                                            Flex="1">
                                        </ext:Column>

                                        <ext:Column
                                            runat="server"
                                            Text="کسرکار مجاز"
                                            Sortable="true"
                                            DataIndex="DeductionTime"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:Column
                                            runat="server"
                                            Text="نوع نوبت کاری"
                                            Sortable="true"
                                            DataIndex="ShiftTypeTitle"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:CheckColumn
                                            runat="server"
                                            Text="شیفت ساعتی"
                                            Sortable="true"
                                            DataIndex="IsHourly"
                                            Flex="1">
                                        </ext:CheckColumn>
                                        <ext:Column
                                            runat="server"
                                            Text="حداقل ساعت کارکرد"
                                            Sortable="true"
                                            DataIndex="MinHourlyTime"
                                            Flex="1">
                                        </ext:Column>
                                        <ext:CheckColumn
                                            runat="server"
                                            Text="حضور پویا"
                                            Sortable="true"
                                            DataIndex="IsDynamicWork"
                                            Flex="1">
                                        </ext:CheckColumn>

                                        <ext:CheckColumn
                                            runat="server"
                                            Text="شیفت پایه"
                                            Sortable="true"
                                            DataIndex="IsBaseShift"
                                            Flex="1">
                                        </ext:CheckColumn>
                                        <ext:Column
                                            runat="server"
                                            Text="تعداد نفرات تخصيص شده"
                                            Sortable="true"
                                            DataIndex="PersonnelCount"
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
                                                <Command Handler="if(command ==='Edit'){showShiftWindow(this.up('grid'),'Edit',record.data.ID)}else{deleteShift(this.up('grid'), record)}" />
                                            </Listeners>
                                        </ext:CommandColumn>
                                    </Columns>
                                </ColumnModel>
                                <Listeners>
                                    <AfterRender Handler="getShifts(this)" />
                                    <RowDblClick Handler="showShiftWindow(this, 'Edit', null)" />
                                </Listeners>
                                <Plugins>
                                    <ext:FilterHeader runat="server" />
                                </Plugins>
                            </ext:GridPanel>
                        </Items>

                    </ext:TabPanel>

                </Items>


                <%--  <KeyMap runat="server">
                    <Binding>
                        <ext:KeyBinding Handler="editAttendanceInfo">
                            <Keys>
                                <ext:Key Code="ENTER" />
                            </Keys>
                        </ext:KeyBinding>
                    </Binding>
                </KeyMap>--%>
                <%--<KeyMap runat="server">
                    <ext:KeyBindItem Handler="editAttendanceInfo" Key="ENTER" />

                </KeyMap>--%>
                <%--<Listeners>
                    <AfterRender Handler="showAttendanceInfo();" />
                </Listeners>--%>
            </ext:Window>

        </Window>
    </Module>
</ext:DesktopModuleProxy>

