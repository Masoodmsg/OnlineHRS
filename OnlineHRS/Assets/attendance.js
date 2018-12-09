var selectYear
var selectMonth
var selectPersonnelRef
var personnelRef
var mainPanel
var tabPanelMain
var accesses
var pakagename
var rightPanel
var isAdmin
var personnelRefDec

function isTrue(value) {

    if (value == undefined || value == null || value == false || value == '' || value == "")
        return false
    return true
}

function confirmMsg(title, msg, fn) {

    Ext.MessageBox.confirm({
        title: title,
        msg: msg,
        buttonText: {
            ok: "بله",
            cancel: "انصراف",
            yes: "بله",
            no: "خیر"
        },
        buttons: Ext.MessageBox.YESNO,
        icon: Ext.MessageBox.WARNING,
        cls: 'rtl',
        fn: fn
    });
}


function showPage(title, src, height, width) {
    var win = new Ext.window.Window({
        height: height == null ? 600 : height,
        width: width == null ? 700 : width,
        rtl: true,
        renderTo: tabPanelMain.getEl(),
        layout: "fit",
        bodyPadding: 5,
        closeAction: "destroy",
        title: title,
        iconCls: "#ApplicationEdit",
        frame: false,
        items: [{
            xtype: "component",
            autoEl: {
                tag: "iframe",
                src: src //Ext.String.format("PresencePersonnelMonthForm.aspx?Serial={0}&Month={1}", record.data.Serial, record.data.Month)
            },
            frame: false,
            border: false,
            frameborder: 0,

        }]
    });

    win.show();

}
function setObjectToFields(panel, infoObj) {

    //var infoObj = data[0]
    var fields
    var fieldName
    //if (xtype === 'formPanel' || panel.xtype === 'formPanel')
    //    fields = panel.getValues();
    //else
    fields = panel.query('field');
    fields.forEach(function (field) {
        fieldName = field.id.split('_').length > 1 ? field.id.split('_')[1] : field.id;
        fieldName = fieldName.toLowerCase();
        for (var colName in infoObj) {

            if (fieldName == colName.toLowerCase()) {
                field.setValue(infoObj[colName])
                field.preValue = infoObj[colName]
            }

        }
    })

}


function init() {

    var mask = showMask(mainPanel, 'در حال باگذاری...', false)
    App.direct.Init({
        success: function (result) {
            var result = Ext.JSON.decode(result)

            accesses = result.Accesses == '[]' ? null : Ext.JSON.decode(result.Accesses)[0]
            for (var propName in accesses)
                accesses[propName] = accesses[propName] > 0 ? true : false

            selectPersonnelRef = result.PersonnelRef
            personnelRef = result.PersonnelRef
            pakagename = result.Pakagename
            personnelRefDec = result.PersonnelRefDec
            isAdmin = accesses.personnelfind

            getAttendanceMonth(mainPanel.down('#ddlMonth'))
            setAccesses()
            mask.unmask()
        },
        failure: function () { mask.unmask() }

    })
}


function showMask(id, msg, body) {

    var obj = typeof id === 'string' ? Ext.getCmp(id) : id;
    if (body || body == undefined)
        obj = obj.body;
    //else
    //    obj = Ext.getCmp(id);

    obj.mask(msg);
    return obj;
}
var template = '<span style="color:{0};">{1}</span>';
function setColumnColor(value, cell, record, rowIndex, e) {
    cell.tdAttr = 'style="background-color:#c5c5c5"'

    return value

}

var template = '<span style="color:{0};">{1}</span>';
function setCellColor(value, cell, record, rowIndex, e) {

    var dataIndex = cell.column.dataIndex
    var color
    var data = record.data

    if (dataIndex == 'T1' || dataIndex == 'T2' || dataIndex == 'T3' || dataIndex == 'T4' || dataIndex == 'T5' || dataIndex == 'T6') {

        if (dataIndex == 'T1') {
            var stateColorT1 = data.T1S
            if (stateColorT1 == 1) //توسط ادمین
                color = 'blue'
            if (stateColorT1 == 2)//مرخصی
                color = 'green'
            if (stateColorT1 == 3)//ماموریت
                color = 'red'
            if (stateColorT1 == 42)//درخواست ثبت نواقص
                color = 'mediumvioletred'

        }// 

        if (dataIndex == 'T2') {
            var stateColorT2 = data.T2S
            if (stateColorT2 == 1) //توسط ادمین
                color = 'blue'
            if (stateColorT2 == 2)//مرخصی
                color = 'green'
            if (stateColorT2 == 3)//ماموریت
                color = 'red'
            if (stateColorT2 == 42)//درخواست ثبت نواقص
                color = 'mediumvioletred'
        }

        if (dataIndex == 'T3') {
            var stateColorT3 = data.T3S
            if (stateColorT3 == 1) //توسط ادمین
                color = 'blue'
            if (stateColorT3 == 2)//مرخصی
                color = 'green'
            if (stateColorT3 == 3)//ماموریت
                color = 'red'
            if (stateColorT3 == 42)//درخواست ثبت نواقص
                color = 'mediumvioletred'
        }
        if (dataIndex == 'T4') {
            var stateColorT4 = data.T4S
            if (stateColorT4 == 1) //توسط ادمین
                color = 'blue'
            if (stateColorT4 == 2)//مرخصی
                color = 'green'
            if (stateColorT4 == 3)//ماموریت
                color = 'red'
            if (stateColorT4 == 42)//درخواست ثبت نواقص
                color = 'mediumvioletred'
        }

        if (dataIndex == 'T5') {
            var stateColorT5 = data.T5S
            if (stateColorT5 == 1) //توسط ادمین
                color = 'blue'
            if (stateColorT5 == 2)//مرخصی
                color = 'green'
            if (stateColorT5 == 3)//ماموریت
                color = 'red'
            if (stateColorT5 == 42)//درخواست ثبت نواقص
                color = 'mediumvioletred'
        }

        if (dataIndex == 'T6') {
            var stateColorT6 = data.T6S
            if (stateColorT5 == 1) //توسط ادمین
                color = 'blue'
            if (stateColorT6 == 2)//مرخصی
                color = 'green'
            if (stateColorT6 == 3)//ماموریت
                color = 'red'
            if (stateColorT6 == 42)//درخواست ثبت نواقص
                color = 'mediumvioletred'
        }
    }
    else if (dataIndex == 'DeductionTime' && value !== '') {
        color = 'red'
    }
    else if (dataIndex == 'DeductionWorking' && value !== '') {
        color = 'DarkRed'
    }
    else if (dataIndex == 'MissTime' && value !== '') {
        color = '#0066FF'
    }
    else if (dataIndex == 'VacTime' && value !== '') {
        color = 'green'
    }

    return Ext.String.format(template, color, value);

}

function setColorRow(record, rowIndex, b, c, d, e) {

    var className = 'x-grid-item'
    var isVacation = record.data.isVacation
    var typeCode = record.data.TypeCode
    if (isVacation == 1 || isVacation == 2)
        className = 'holiday-color'
    else if (typeCode == 1)
        className = 'mission-color'
    else if (typeCode == 2)
        className = 'vacation-color'
    else if (typeCode == 5)
        className = 'absence-color'
    else if (typeCode == 3 || typeCode == 4 || typeCode == 7)
        className = 'defect-color'
    return className
}

function setColor1(value, b, c, d, e) {
    return Ext.String.format(template, (value !== '') ? "green" : "red", value);
}

function test(value, b, c, d, e) {
    return Ext.String.format(template, (value !== '') ? "green" : "red", value);
}
function showDetail(command, record) {

    var win = new Ext.window.Window({

        height: 500,
        width: 600,
        rtl: true,
        renderTo: tabPanelMain.getEl(),
        layout: "fit",
        bodyPadding: 5,
        closeAction: "destroy",
        title: "جزئيات",
        iconCls: "#ApplicationViewDetail",
        frame: false,
        items: [{
            xtype: "component",
            autoEl: {
                tag: "iframe",
                src: Ext.String.format("PresenceDetailForm.aspx?PersonnelRef={0}&Year={1}&Month={2}&DayNo={3}", selectPersonnelRef, record.data.Year, record.data.Month, record.data.DayNo)
            },
            frame: false,
            border: false,
            frameborder: 0,

        }]
    });

    win.show();
}


function getAttendanceMonth(ddlMonth) {

    var isView = accesses.attendanceviewall ? 0 : 1

    App.direct.GetMonths(personnelRef, isView, {
        success: function (result) {
            var result = Ext.JSON.decode(result)
            //init(result.PersonnelRef)
            ddlMonth.store.loadData(result);
            ddlMonth.setValue(ddlMonth.store.data.items[0]);
            // ddlMonth.doFireEvent('select')

            ddlMonth.fireEvent('select', ddlMonth, ddlMonth.store.data.items[0]);
        }
    })


}

function setMonth(records) {
    //if (records == undefined)

    records = records[0]
    selectMonth = records.data.Month
    selectYear = records.data.Year
    getPresenceInfo(selectPersonnelRef, selectYear, selectMonth, true, false)
}

function setPersonnelRef(userSearch, record) {
    record = record[0]
    selectPersonnelRef = record.data.value
    var pnl = userSearch.up();
    pnl.setTitle("اطلاعات پرسنلی (" + record.data.text + "-" + record.data.Code + ")");
    getPresenceInfo(selectPersonnelRef, selectYear, selectMonth, true, false)


    if (personnelRef !== selectPersonnelRef && accesses.subpersonnelrequest == false) {

        var set_FlowRequests = rightPanel.down('#set_FlowRequests')
        if (isTrue(set_FlowRequests))
            set_FlowRequests.setHidden(true);

    }
    else
        rightPanel.down('#set_FlowRequests').setHidden(false)
}

function getPresenceInfo(perRef, year, month, isMonthInfo, isSelectedTab) {

    perRef = perRef == null ? selectPersonnelRef : perRef;
    month = month == null ? selectMonth : month;
    year = year == null ? selectYear : year;

    var tabGrid = tabPanelMain.activeTab

    if (isSelectedTab !== undefined && isSelectedTab == true && tabGrid.personnelRef == selectPersonnelRef)
        return

    tabGrid.personnelRef = perRef

    //setAccesses(tabGrid)
    var mainPanel = tabPanelMain.up('#mainPanel')
    var mask = showMask(isMonthInfo ? mainPanel : tabGrid, 'در حال بارگذاری', false)

    App.direct.GetPresencePersonnelInfo(perRef, year, month, tabGrid.id.substr(3), isMonthInfo,
        {
            success: function (result) {
                var info = Ext.JSON.decode(result)
                if (isMonthInfo) {
                    setObjectToFields(mainPanel.down('#pnlMonthInfo'), info.Table[0])
                    setObjectToFields(mainPanel.down('#pnlVacationInfo'), info.Table1[0])
                }

                if (tabGrid.id !== 'tabPersonnelSub') {

                    tabGrid.store.clearData();
                    tabGrid.store.loadData([]);
                    tabGrid.store.loadData(info.Table2);
                }
                mask.unmask();
            },
            failure: function () { mask.unmask(); }
        });
}

function fillDailyGrid(serial) {
    var mask = showMask(me.grid, 'در حال بارگذاری', false)
    App.direct.GetPersonnelDailyTimeCart(serial, {
        success: function (result) {
            me.grid.store.loadData(Ext.JSON.decode(result.Result));
            //Ext.Msg.info({ ui: 'success', title: 'بارگذاری', html: 'اطلاعات با موفقیت بارگذاری شد', iconCls: '#Accept' });
            mask.unmask();
        },
        failure: function () { mask.unmask(); }
    })

}

function setTitleVac(ddlMonth) {

    var set1 = ddlMonth.up('#mainPanel').down('#set_UseVacYear')
    set1.setTitle("مرخصی استفاده شده سال  " + selectYear.toString());


    var set2 = ddlMonth.up('#mainPanel').down('#set_RemainVacYear')
    set2.setTitle("مانده مرخصی سال  " + selectYear.toString());

    var set3 = ddlMonth.up('#mainPanel').down('#set_SaveVacYear')
    set3.setTitle("ذخیره مرخصی تا سال  " + (selectYear - 1).toString());

}
function ComputePersonnel() {

    var mask = showMask(tabPanelMain.up('#mainPanel'), 'در حال محاسبه', false)
    App.direct.ComputePersonnel(selectPersonnelRef, selectYear, selectMonth, {
        success: function (result) {
            var result = Ext.JSON.decode(result)
            if (result.success) {
                mask.unmask()
                getPresenceInfo(null, null, null, false, false)
                Ext.Msg.info({ ui: 'success', title: 'محاسبه', html: 'محاسبه با موفقیت انجام شد', iconCls: '#Accept' })
            }
            else {
                mask.unmask()
                Ext.Msg.info({ ui: 'danger', title: 'خطا', html: result.ErrorMsg, iconCls: '#Exclamation' });
            }
        }
    })

}

function setAccesses(grid) {

    if (grid == undefined || grid == null) {

        rightPanel = mainPanel.down('#rightPanel')
        var fields = rightPanel.query('field')
        var buttons = rightPanel.query('button')
        var setF1 = rightPanel.down('#set_adminRequests')
        var setF2 = rightPanel.down('#set_FlowRequests')
        var arr
        var fieldID

        if (accesses !== null) {

            for (var itemName in accesses) {

                fields.forEach(function (field) {
                    arr = field.id.split('_')
                    fieldID = arr.length == 2 ? arr[1].toLowerCase() : arr[0].toLowerCase()
                    if (fieldID == itemName && !accesses[itemName]) {
                        field.destroy()
                    }
                })

                buttons.forEach(function (button) {
                    arr = button.id.split('_')
                    buttonID = arr.length == 2 ? arr[1].toLowerCase() : arr[0].toLowerCase()
                    if (buttonID == itemName && !accesses[itemName]) {
                        button.destroy()
                    }
                })


                if (setF1.items.length == 0)
                    setF1.destroy();
                if (setF2 && setF2.items.length == 0)
                    setF2.destroy();
            }
        }
        else {

            setF1.destroy();
            setF2.destroy();
            //fields.forEach(function (field) {
            //    //field.setHidden(true)
            //    field.destroy()
            //})
            //buttons.forEach(function (button) {
            //    button.destroy()
            //})
        }
    }
    else {

        if (accesses !== null) {

            var buttons = grid.query('button')
            var buttonsDelete = Ext.Array.filter(buttons, function (button) { button.commandName.indexOf('delete') > -1 ? true : false })
            var buttonsDelete = Ext.Array.filter(buttons, function (button) { button.commandName.indexOf('edit') > -1 ? true : false })
            if (grid.id == 'tabMonthWork' && accesses.isinsertmonthtime) {

            }
        }
        else {

        }
    }
}

function setGridAccesses(grid, toolbar, rowIndex, record) {

    var data = record.data
    var buttons = toolbar.items.items;
    var gridID = grid.id

    var buttonDelete = Ext.Array.filter(buttons, function (button) {
        if (button.command.toLowerCase().indexOf('delete') > -1)
            return true
        else
            return false
    })[0]

    var buttonEdit = Ext.Array.filter(buttons, function (button) {
        if (button.command.toLowerCase().indexOf('edit') > -1)
            return true
        else
            return false
    })[0]

    if (gridID == 'tabMonthWork' && accesses.insertmonthtime) {

        buttons.forEach(function (btn) { btn.setDisabled(false) })
    }
    else if (gridID == 'tabDailyVacation') {

        if (accesses.deletedailyvacation || data.State == 0)
            buttonDelete.setDisabled(false)
        if (accesses.editdailyvacation || data.State == 0)
            buttonEdit.setDisabled(false)

    }
    else if (gridID == 'tabHourVacation') {

        if (accesses.deletehourvacation && data.State == 0)
            buttonDelete.setDisabled(false)
        if (accesses.editdailyvacation || data.State == 0)
            buttonEdit.setDisabled(false)

    }
}

//------------------------------------------------------------


function getYearMonth(ddlYear) {

    App.direct.GetYear({

        success: function (result) {
            ddlYear.store.loadData(Ext.JSON.decode(result));
            ddlYear.setValue(ddlYear.store.data.items[0]);
            //  ddlMonth.doFireEvent('select')

            //ddlYear.fireEvent('select', ddlYear, ddlYear.store.data.items[0]);
        }

    })

}


function showDefectsForm(element, data, rowindex) {
    var serial = data.serial;
    var REnterTime = data.REnterTime;
    var RExitTime = data.RExitTime;
    var date = data.Date;
    var TypeCode = data.TypeCode;
    var PersonnelRef = data.PersonnelRef;
    var txtFormType = element.getValue();
    if (rowindex.length == 1)
        rowindex = "0" + String(rowindex);
    var start = data.REnterTime, end = data.RExitTime;

    if (TypeCode != null) {
        /*ورود ناقص*/if (TypeCode == "3") {
            start = data.StartTime;
        }
        /*خروج ناقص*/if (TypeCode == "4") {
            end = data.EndTime;
        }
        /*ورود یا خروج ناقص*/if (TypeCode == "7") {
            start = "";
            end = "";
        }

        /*غیبت*/if (TypeCode == "5") {
            start = "";
            end = "";
        }
        if (TypeCode == "11")/*تاخیر*/ {
            start = data.StartTime
            end = data.REnterTime;
        }
        else if (TypeCode == "12")/*تعجیل*/ {
            start = data.RExitTime
            end = data.EndTime;
        }
        else if (TypeCode == "13")/*غیبت شناور*/ {
            start = data.StartTime
            end = data.EndTime;

        }
    }
    if (txtFormType == 2) {
        url = 'Task/PresenceHourVaction.aspx?Mode=Pn3rL7fr6Bg=&DataSerial=0&FormVersion=41&PersonnelRef=' + personnelRefDec + '&TypeCode=' + TypeCode + '&Start=' + start + '&End=' + end + '&Date=' + date;
    }
    if (txtFormType == 3 || txtFormType == 5) {
        url = 'Task/PresenceDailyVaction.aspx?Mode=Pn3rL7fr6Bg=&DataSerial=0&FormVersion=40&PersonnelRef=' + personnelRefDec + '&TypeCode=' + TypeCode + '&Start=' + start + '&End=' + end + '&Date=' + date;
    }
    if (txtFormType == 4) {
        url = 'Task/PresenceDailyMission.aspx?Mode=Pn3rL7fr6Bg=&DataSerial=0&FormVersion=43&PersonnelRef=' + personnelRefDec + '&TypeCode=' + TypeCode + '&Start=' + start + '&End=' + end + '&Date=' + date;
    }
    if (txtFormType == 1) {
        url = 'Task/PresenceHourMission.aspx?Mode=Pn3rL7fr6Bg=&DataSerial=0&FormVersion=44&PersonnelRef=' + personnelRefDec + '&TypeCode=' + TypeCode + '&Start=' + start + '&End=' + end + '&Date=' + date;
    }
    if (txtFormType == 6) {
        var HYear = String(date).substring(0, 4);
        var Month = String(date).substring(5, 7);
        var DayNo = String(date).substring(8, 10);
        url = 'Task/PresenceDefect.aspx?Mode=Pn3rL7fr6Bg=&DataSerial=0&FormVersion=42&PersonnelRef=' + personnelRefDec + '&Type=Enter&Year=' + HYear + '&Month=' + Month + '&DayNo=' + DayNo + '&TypeCode=' + TypeCode + '&Start=' + start + '&End=' + end + '&Date=' + date;
    }
    if (txtFormType == 7) {
        var HYear = String(date).substring(0, 4);
        var Month = String(date).substring(5, 7);
        var DayNo = String(date).substring(8, 10);
        url = 'Task/PresenceDefect.aspx?Mode=Pn3rL7fr6Bg=&DataSerial=0&FormVersion=42&PersonnelRef=' + personnelRefDec + '&Type=Exit&Year=' + HYear + '&Month=' + Month + '&DayNo=' + DayNo + '&TypeCode=' + TypeCode + '&Start=' + start + '&End=' + end + '&Date=' + date;

    }
    if (txtFormType == 8) {
        var HYear = String(date).substring(0, 4);
        var Month = String(date).substring(5, 7);
        var DayNo = String(date).substring(8, 10);
        url = 'Task/PresenceDefect.aspx?Mode=Pn3rL7fr6Bg=&DataSerial=0&FormVersion=42&PersonnelRef=' + personnelRefDec + '&Year=' + HYear + '&Month=' + Month + '&DayNo=' + DayNo + '&TypeCode=' + TypeCode + '&Start=' + start + '&End=' + end + '&Date=' + date;
    }
    if (txtFormType == 14) {
        url = 'Task/PresenceHourOverTimeLicense.aspx?Mode=Pn3rL7fr6Bg=&DataSerial=0&FormVersion=47&PersonnelRef=' + personnelRefDec + '&TypeCode=' + TypeCode + '&Start=' + start + '&End=' + end + '&Date=' + date;
    }

    var win = new Ext.window.Window({
        height: 600, rtl: true, renderTo: tabPanelMain.getEl(), width: 1200, layout: "fit", bodyPadding: 5, closeAction: "destroy", title: "جزئيات", iconCls: "#ApplicationViewDetail"
        , items: [{
            xtype: "component",
            autoEl: {
                tag: "iframe",
                src: url
            }
        }]
    })
    win.show();

}

function getDefectsType(v, meta, record, rowNo, cellNo, store, view) {

    var data = record.data
    setTimeout(function () {
        var row = view.getNode(record);
        var cells = Ext.fly(row).query('.x-grid-cell-inner')
        var elComboTypeDefect = Ext.fly(cells[cellNo]);
        elComboTypeDefect.dom.innerHTML = "";
        var combo = Ext.create('Ext.form.ComboBox', {
            emptyText: 'نوع فرم راانتخاب نمایید', submitEmptyText: false, width: 150, height: 20, editable: false, renderTo: elComboTypeDefect,
            triggers: { "_trigger1": { handler: function () { this.onTriggerClick() }, tag: "_trigger1", cls: "" }, "_trigger2": { handler: function () { showDefectsForm(this, data, String(rowNo + 1)); }, tag: "_trigger2", cls: Ext.form.trigger.Trigger.getIcon("Search") } },
            hideBaseTrigger: true
        })

        combo.on('select', function () {
            showDefectsForm(this, data, String(rowNo + 1));
        });
        comboBoxBindStore(combo, 'Title', 'Value')

        if (data.TypeCode == 5) {
            combo.store.loadData([{ Title: 'مرخصي استحقاقي', Value: 3 }, { Title: 'مرخصي بدون حقوق', Value: 5 }, { Title: 'ماموریت روزانه', Value: 4 }, { Title: 'ورود ناقص', Value: 6 }, { Title: 'خروج ناقص', Value: 7 }])
            combo.setValue(3)
        }
        else if (data.TypeCode == 3) {
            combo.store.loadData([{ Title: 'ورود ناقص', Value: 6 }, { Title: 'مرخصي استحقاقي', Value: 3 }, { Title: 'مرخصي بدون حقوق', Value: 5 }, { Title: 'ماموریت روزانه', Value: 4 }])
            combo.setValue(6)
        }
        else if (data.TypeCode == 4) {
            combo.store.loadData([{ Title: 'خروج ناقص', Value: 7 }, { Title: 'مرخصي استحقاقي', Value: 3 }, { Title: 'مرخصي بدون حقوق', Value: 5 }, { Title: 'ماموریت روزانه', Value: 4 }])
            combo.setValue(7)
        }
        else if (data.TypeCode == 7) {
            combo.store.loadData([{ Title: 'ورود یا خروج ناقص', Value: 8 }, { Title: 'مرخصي استحقاقي', Value: 3 }, { Title: 'مرخصي بدون حقوق', Value: 5 }, { Title: 'ماموریت روزانه', Value: 4 }])
            combo.setValue(8)
        }
        else if (data.TypeCode == 14) {
            combo.store.loadData([{ Title: 'مجوز اضافه کار ساعتي', Value: 14 }])
            combo.setValue(14)
        }
        else {
            combo.store.loadData([{ Title: 'مرخصي ساعتی', Value: 2 }, { Title: 'ماموريت ساعتي', Value: 1 }])
            combo.setValue(2)
            var elRenterTime6 = cells[3];
            var elRexitTime7 = cells[4];
            var elStartTime2 = data.StartTime;
            var elEndTime3 = data.EndTime;
            //اعمال تغییرات برای نمایش ساعت ورود و خروج در نواقص
            if (data.TypeCode == 11)/*تاخیر*/ {
                elRexitTime7.textContent = elRenterTime6.textContent;
                elRenterTime6.textContent = elStartTime2;
            }
            else if (data.TypeCode == 12)/*تعجیل*/ {
                elRenterTime6.textContent = elRexitTime7.textContent;
                elRexitTime7.textContent = elEndTime3;
            }
            else if (data.TypeCode == 10)/*غیبت ساعتی*/ {
                elRenterTime6.textContent = elRenterTime6.textContent;
                elRexitTime7.textContent = elRexitTime7.textContent;
            }
            else if (data.TypeCode == 13)/*غیبت شناور*/ {
                elRenterTime6.textContent = elStartTime2;
                elRexitTime7.textContent = elEndTime3;
            }

        }

    }, 10);
};

function getPersonnelGroup(ddlPersonnelGroup) {
    var perRef = perRef == null ? selectPersonnelRef : perRef;
    App.direct.GetPersonnelGroup(perRef,
        {
            // Ext.net.DirectMethod.request("GetPersonnelGroup", Ext.applyIf({
            success: function (result) {
                comboBoxBindStore(ddlPersonnelGroup, 'Name', 'Serial')
                var arr = Ext.JSON.decode(result)
                arr.push({ Serial: 0, Name: 'همه' })
                ddlPersonnelGroup.store.loadData(arr);
                ddlPersonnelGroup.setValue(ddlPersonnelGroup.store.data.items[arr.length - 1]);
                // ddlPersonnelGroup.fireEvent('select', ddlPersonnelGroup, ddlPersonnelGroup.store.data.items[0]);
            }

        })
    //|| {}, { specifier: "static", url: "/Human/Presence/PresenceTest.aspx" };
}


function getPersonnelSubInfo(grid, pageNo) {

    grid = grid.xtype == 'grid' ? grid : grid.up()
    var perRef = personnelRef;
    var month = month == null ? selectMonth : month;
    var year = year == null ? selectYear : year;
    var pageNumber = pageNo == 0 ? 1 : pageNo
    var pageSize = grid.store.pageSize

    var code = grid.down('toolbar').down('#txtPersonnelCode').getValue();
    var name = grid.down('toolbar').down("#txtPersonnelName").getValue();
    var organizationRef = grid.down('toolbar').down("#ddlPersonnelGroup").getValue();
    organizationRef = organizationRef == null ? 0 : organizationRef;
    var tabGrid = tabPanelMain.activeTab

    //if (isSelectedTab !== undefined && isSelectedTab == true && tabGrid.personnelRef == selectPersonnelRef)
    //    return

    // tabGrid.personnelRef = perRef

    var mask = showMask(tabGrid, 'در حال بارگذاری', false)

    App.direct.GetPersonnelSubInfo(personnelRef, year, month, code, name, organizationRef, pageSize, pageNumber,
        {
            success: function (result) {
                var info = Ext.JSON.decode(result)
                //tabGrid.store.clearData();
                //tabGrid.store.loadData([]);
                if (info.length > 0)
                    tabGrid.store.totalCount = info[0].RowCount

                tabGrid.store.loadData(info);
                mask.unmask();
            },
            failure: function () { mask.unmask(); }
        });
}

//function changePagePersonnel(pagingToolbar, pageNo, eOpts) {
//    personnelSearch(pagingToolbar.up().prev('form'), pageNo)
//}

function setSubPersonnelInfo(v, meta, record, rowNo, cellNo, store, view) {

    setTimeout(function () {

        var data = record.data
        var row = view.getNode(record);
        var cells = Ext.fly(row).query('.x-grid-cell-inner')
        var elComboTypeDefect = Ext.fly(cells[cellNo]);
        elComboTypeDefect.dom.innerHTML = "";

        Ext.create('Ext.form.field.Display', {
            width: 150, height: 20, renderTo: elComboTypeDefect, name: 'txtNameq', fieldLabel: 'نام', value: data.RFullName, labelWidth: 20,
            fieldStyle: 'color:#000066;font-weight:bold !important'
        })

        Ext.create('Ext.form.field.Display', {
            width: 150, height: 20, renderTo: elComboTypeDefect, name: 'txtWorkDay', fieldLabel: 'کارکرد', value: data.WorkDay, labelWidth: 50,
            fieldStyle: 'color:#000066;font-weight:bold !important'
        })

        Ext.create('Ext.form.field.Display', {
            width: 150, height: 20, renderTo: elComboTypeDefect, name: 'txtTypeName', fieldLabel: 'وضعیت', value: data.TypeName, labelWidth: 50,
            fieldStyle: 'color:#000066;font-weight:bold !important'

        })

        Ext.create('Ext.form.field.Display', {
            width: 150, height: 20, renderTo: elComboTypeDefect, name: 'txtCode', fieldLabel: 'کدپرسنلی', value: data.Code, labelWidth: 50,
            fieldStyle: 'color:#000066;font-weight:bold !important'
        })
        //combo.on('select', function () {
        //    showDefectsForm(this, data, String(rowNo + 1));
        //});
        //comboBoxBindStore(combo, 'Title', 'Value')

        //if (data.TypeCode == 5) {
        //    combo.store.loadData([{ Title: 'مرخصي استحقاقي', Value: 3 }, { Title: 'مرخصي بدون حقوق', Value: 5 }, { Title: 'ماموریت روزانه', Value: 4 }, { Title: 'ورود ناقص', Value: 6 }, { Title: 'خروج ناقص', Value: 7 }])
        //    combo.setValue(3)
        //}
        var img = '../ImageHandler.ashx?FolderType=f2v45UASvT7eybkS3R7kTA==&TableXRef=' + record.data.PRefDec + '&IsLast=tDeCxxXYDQk='
        img = '<img style="width:70px;height:80px;" src="' + img + '"/>';
        Ext.fly(cells[cellNo - 1]).dom.innerHTML = img
    }, 10);
}

//var setPersonnelPhoto = function (v, meta, record, rowNo, cellNo, store, view) {
//    //var src = 'data:image/jpeg;base64,' + metaData.record.data['Icon'] == null ? '' : btoa(metaData.record.data['Icon'])
//    //var src = 'data:image/jpeg;base64,' + record.data.Photo
//    var src = '../ImageHandler.ashx?FolderType=f2v45UASvT7eybkS3R7kTA==&TableXRef=' + record.data.PRefDec + '&IsLast=tDeCxxXYDQk='
//    return '<img style="width:70px;height:80px;" src="' + src + '"/>';
//};



function ReActionCommand(command, record) {
    var type = command.substr(command.length - 6);
    var perRef = selectPersonnelRef

    if (type === 'Delete')//همه حذف ها در این بخش نوشته شده است
    {
        confirmMsg(' حذف ', 'آیا از حذف اطلاعات اطمینان دارید؟', function (btn) {
            if (btn == 'yes') {

                if (record.data.Serial == null) {
                    Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'موردی برای حذف یافت نگردید', iconCls: '#Exclamation' });
                }

                var mask = showMask(mainPanel, 'در حال بارگذاری', false)
                var Serial = record.data.Serial;
                var mode = command;
                App.direct.RequestDelete(Serial, mode, perRef,
                    {
                        success: function (result) {
                            var result = Ext.JSON.decode(result)
                            if (result.success) {
                                getPresenceInfo(null, null, null, false, false);
                                mask.unmask();

                                // getPresenceInfo(null, null, null, false, false)
                                Ext.Msg.info({ ui: 'success', title: 'پیغام', html: 'اطلاعات با موفقیت حذف شد.', iconCls: '#Accept' })
                            }
                            else {
                                mask.unmask()
                                Ext.Msg.info({ ui: 'danger', title: 'خطا', html: result.ErrorMsg, iconCls: '#Exclamation' });
                            }
                        }

                    })
            }
        });

    }
    else if (type === 'Detail')//همه پیگیری ها
    {
        if (!(record.data.DataRef == "" || record.data.DataRef == "0" || record.data.DataRef == "&nbsp;" || record.data.DataRef == null))
            showPage('پیگیری', Ext.String.format("../Task/TTSHistory.aspx?Serial={1}", record.data.DataRef), 610, 700)
        else {
            var PersonnelrefSetForm = record.data.PersonnelRefSetForm;
            Ext.Msg.info({ ui: 'danger', title: 'پیغام', html: 'این فرم توسط "' + PersonnelrefSetForm + '" بصورت دستی ثبت شده است', iconCls: '#Exclamation' });
        }

    }

    else if (command === 'MonthWorkAdd')//افزودن کارکردماهانه
    {
        showPage('افزودن کارکردماهانه', Ext.String.format("PresencePersonnelMonthForm.aspx?PersonnelRef={0}", perRef), 650, 800);
    }
    else if (command === 'MonthWorkEdit')//ویرایش کارکردماهانه
    {
        showPage('ویرایش کارکردماهانه', Ext.String.format("PresencePersonnelMonthForm.aspx?Serial={0}&Month={1}", record.data.Serial, record.data.Month), 610, 700);
    }
    else if (command === 'DailyVacationEdit')//ویرایش مرخصی روزانه
    {
        showPage('ویرایش مرخصی روزانه', Ext.String.format("PresenceDailyVacationForm.aspx?Mode=u9zHq8v7e0w=&Serial={0}&PersonnelRef={1}", record.data.Serial, record.data.PersonnelRef), 610, 700);
    }
    else if (command === 'HourVacationEdit')//ویرایش مرخصی ساعتی
    {
        showPage('ویرایش مرخصی ساعتی', Ext.String.format("PresenceHourVacationForm.aspx?Mode=u9zHq8v7e0w=&Serial={0}&PersonnelRef={1}", record.data.Serial, record.data.PersonnelRef), 610, 700);
    }
    else if (command === 'DailyMissionEdit')//ویرایش ماموریت روزانه
    {
        showPage('ویرایش مرخصی ساعتی', Ext.String.format("PresenceDailyMissionForm.aspx?Mode=u9zHq8v7e0w=&Serial={0}&PersonnelRef={1}", record.data.Serial, perRef), 610, 700);
    }
}

//---------------------------------------مدیریت کدهای حضور---------------------------------------------------------------------------------------------

function getPresenceCodes(grid) {

    //var mask = showMask(grid, 'در حال بارگذاری...', false);

    execSPSelect('coCZGixrP8ffg39Npux9mS6XPJ77dlik'/*SPA_GetPresenceCodeList*/, { CompanyID: companyID }, grid, grid, null, function () {

        gridCellToolTip(grid)
    })
}

function showPresenceCodeWindow(grid, mode,codeID) {

    if (mode == 'Edit' && isNullOrEmpty(codeID)) {
        var record = getSelectedRowGrid(grid)
        codeID = record.data.ID
    }

    var win = new PresenceCodeModalWindow(grid, codeID, mode)
    win.show();
}

function deletePresenceCode(grid, record) {

    confirmMsg('حذف', 'ایا مطمئن هستید ؟', function (btn) {
        if (btn == 'yes') {
            execSPDelete('OD0gLczKqRC+ZJJKwHKEM9v1MbdCQDoa'/*SPA_PresenceCodeUpdate*/, { CompanyID: companyID, ID: record.data.ID }, grid, function () {

                removeRecordGrid(grid, record)
            })
        }

    });
    

}

function getPresenceCodeTitle(fillCtrl) {
    //var calendarPanel = this

    

    execSPSelect('coCZGixrP8ffg39Npux9mYXMeKum8Hw/uL6upbpJi2E='/*SPA_GetPresenceCodeTitle*/, { CompanyID: companyID }, null, null, null, function (codes) {
        
        if (!isNullOrEmpty(fillCtrl)) {

            if (fillCtrl.xtype === 'combo')
                fillCtrl.store.loadData(codes)
            else if (fillCtrl.xtype === 'calendarpanel')
                fillCtrl.calendarStore.loadData(codes)
        }
    })
}


//---------------------------------------مدیریت شیفت---------------------------------------------------------------------------------------------
function getShifts(grid) {
    //var mask = showMask(grid, 'در حال بارگذاری...', false);

    execSPSelect('AB+RdWrWf4qAxG45cLNtJzU0vtoNLfEy'/*SPA_GetShiftList*/, { CompanyID: companyID }, grid, grid, null, null)
}

function showShiftWindow(grid, mode, id) {

    if (mode == 'Edit' && isNullOrEmpty(id)) {
        var record = getSelectedRowGrid(grid)
        id = record.data.ID
    }

    var win = new ShiftModalWindow(grid, id, mode)
    win.show();
}

function saveShiftCalendar(data) {

   // (spName, isID, isResult, fillControl, extraData, mask, isTitle, afterInsertFn, msgConfig)
    execSPInsert('X7fR0G60+O6UePbV+RsHtdwYZl8VdBDj'/*SPA_ShiftCalendarUpdate*/, false, false, null,
        data, grid, false, function () {
            getTaxInsuranceGroup(grid)
        })

}

function getEventShiftCalendar(fillCtrl, shiftID, startDate) {

    execSPSelect('xAhHZolS659iiBnQbPnzX5dleFilnhYi6T97qFuHoGk='/*SPA_GetEventShiftCalendar*/, { CompanyID: companyID, ShiftID: shiftID, StartDate: startDate }, fillCtrl, null, null, function (codes) {

        if (!isNullOrEmpty(fillCtrl)) {

            if (fillCtrl.xtype === 'combo')
                fillCtrl.store.loadData(codes)
            else if (fillCtrl.xtype === 'calendarpanel')
                fillCtrl.eventStore.loadData(numberToDate(codes))
        }
    })
}












