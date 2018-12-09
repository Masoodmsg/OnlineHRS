//Ext.Ajax.on('beforerequest', function (conn, options) {
//    //var x = document.getElementsByTagName("META");
//    //var token = "";
//    //var headerVal = "";
//    //var i;
//    //for (i = 0; i < x.length; i++) {
//    //    if (x[i].name == "_csrf") {
//    //        token = x[i].content;
//    //        var d = tokenID
//    //    }
//    //}

//    // Ext.Ajax.defaultHeaders = Ext.apply(Ext.Ajax.defaultHeaders || {}, { headerVal : token });
//    Ext.Ajax.setDefaultHeaders({
//        'X-CSRF-TOKEN': tokenID
//    });
//});
function setRequestHeader() {
    Ext.Ajax.setDefaultHeaders({
        'X-CSRF-TOKEN': tokenID
    });
}

function showMsgInfo(msg, title, ui, closable, autoHide) {

    return Ext.Msg.info({
        ui: ui,
        title: title,
        html: msg,
        iconCls: ui == 'success' ? '#Accept' : ui == 'danger' ? '#Exclamation' : '#Accept',
        closable: closable,
        autoHide: autoHide,
        alwaysOnTop: true,
        titleAlign: 'right',
        textAlign: 'right'
        // queue: 'righttop'
    });
}

Ext.apply(Ext.form.VTypes, {
    isValidNationalCode: function (val, field) {
        if (!val) {
            return;
        }

        if (!/^\d{8,10}$/.test(val) || /^(0{8,10}|1{8,10}|2{8,10}|3{8,10}|4{8,10}|5{8,10}|6{8,10}|7{8,10}|8{8,10}|9{8,10})$/.test(val))
            return false;
        var L = val.length, _ = 0;
        for (i = 0; i < L - 1; i++)
            _ += val.charAt(i) * (L - i);
        _ %= 11;
        return (val.charAt(L - 1) == ((_ < 2) ? _ : 11 - _))
    }
});
Ext.apply(Ext.form.VTypes, {
    isValidMobileNo: function (val, field) {
        if (!val) {
            return;
        }

        if (Ext.util.Format.substr(val, 0, 2) != '09')
            return false;

        return true
    }
});
Ext.apply(Ext.form.VTypes, {
    isValidNewPassword: function (newPass, field) {
        if (!newPass) {
            return;
        }

        if (App.txtOldPasswordCompanyManagement.value == newPass)
            return false;

        return true
    }
});
Ext.apply(Ext.form.VTypes, {
    isValidConfirmPassword: function (confirmPass, field) {
        if (!confirmPass) {
            return;
        }

        if (App.txtPassword.value != confirmPass)
            return false;

        return true
    }
});
Ext.apply(Ext.form.VTypes, {
    isValidDate: function (date, field) {
        if (date !== '' && date !== 'YYYY/MM/DD') {
            var splitDate = date.split('/');
            var year = splitDate[0]
            var month = parseInt(splitDate[1])
            var day = parseInt(splitDate[2])
            if (month < 7 && day > 31)
                return false;
            if (month > 6 && month < 12 && day > 30)
                return false;
            if (month == 12 && day == 30 && !isLeapYear(year))//کبیسه
                return false;
            if (month == 12 && day > 30)
                return false;
            if (month == 0 || day == 0)
                return false;
            if (month > 12 || day > 31)
                return false;
        }
        return true

    }
});
function isLeapYear(year) {

    var arr = new Array(1, 5, 9, 13, 17, 22, 26, 30);
    var mod = year % 33
    if (arr.indexOf(mod) > -1)
        return true
    return false
}

function confirmMsg(title, msg, fn) {

    var confirm = Ext.MessageBox.confirm({
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
        alwaysOnTop: true,
        zIndex: 9999999999,
        fn: fn
    });
    // confirm.alwaysOnTop = true;
    confirm.setAlwaysOnTop(true);
    return confirm;
}

function contains(array, propertyName, value) {
    for (var i = 0; array.length > i; i++) {
        if (array[i][propertyName] !== undefined && array[i][propertyName] == value)
            return array[i];
        else if (array[i] == value)
            return array[i];

    }
    return null;
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
function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

//------------------------------------------------------------------------Tree Search--------------------------------------------------------------------------------------
var filterTree = function (fieldFilter, e) {
    var tree = fieldFilter.up().up(),
        store = tree.store,
        //logic = tree /*App.FilterLogic.getValue() ? tree : store*/,
        text = fieldFilter.getRawValue();

    tree.clearFilter(true);

    if (Ext.isEmpty(text, false)) {
        return;
    }

    if (e.getKey() === Ext.event.Event.ESC /*Ext.EventObject.ESC*/) {
        clearFilter();
    }
    else {
        var re = new RegExp(".*" + text + ".*", "i");

        tree.filterBy(function (node) {
            return re.test(node.data.text);
        });
    }
};

var clearFilter = function (field) {
    var
        tree = field.up().up(),
        store = tree.store,
        logic = tree;

    field.setValue("");
    logic.clearFilter(true);
    tree.getView().focus();
};
function A2F(text) {

    if (text == null)
        return null;

    text = text.replace(/\u06A9/g, '\u0643'); // ک
    text = text.replace(/\u06CC/g, '\u0649'); // ی
    text = text.replace(/\u06CC/g, '\u064A'); // ی
    return text;

}
function numberToDate(value) {

    var arrayObj = Ext.isString(value) ? Ext.JSON.decode(value) : value;
    var dateInt
    if (Ext.isNumeric(value)) {
        dateInt = value.toString()
        if (dateInt.length > 6)
            return value > 0 ? dateInt.substr(0, 4) + '/' + dateInt.substr(4, 2) + '/' + dateInt.substr(6, 2) : '';
        else
            return value > 0 ? dateInt.substr(0, 4) + '/' + dateInt.substr(4, 2) : '';
    }
    else if (Ext.isArray(arrayObj)) {
        for (var i = 0; arrayObj.length > i; i++) {
            for (var propName in arrayObj[i]) {
                if (propName.toLowerCase().indexOf('date') > -1 && Ext.isNumeric(arrayObj[i][propName])) {
                    dateInt = arrayObj[i][propName].toString();
                    if (dateInt.length > 6)
                        arrayObj[i][propName] = arrayObj[i][propName] > 0 ? dateInt.substr(0, 4) + '/' + dateInt.substr(4, 2) + '/' + dateInt.substr(6, 2) : '';
                    else
                        arrayObj[i][propName] = arrayObj[i][propName] > 0 ? dateInt.substr(0, 4) + '/' + dateInt.substr(4, 2) : '';
                }
            }
        }
    }
    else if (Ext.isObject(arrayObj)) {
        for (var propName in arrayObj) {
            if (propName.toLowerCase().indexOf('date') > -1 && Ext.isNumeric(arrayObj[propName])) {
                dateInt = arrayObj[propName].toString();
                if (dateInt.length > 6)
                    arrayObj[propName] = arrayObj[propName] > 0 ? dateInt.substr(0, 4) + '/' + dateInt.substr(4, 2) + '/' + dateInt.substr(6, 2) : '';
                else
                    arrayObj[propName] = arrayObj[propName] > 0 ? dateInt.substr(0, 4) + '/' + dateInt.substr(4, 2) : '';
            }

        }
    }
    return arrayObj
}

function dateToNumber(value) {

    if (Ext.isObject(value)) {
        for (var propName in value) {
            if (propName.toLowerCase().indexOf('date') > -1 && Ext.isString(value[propName]) && value[propName].toString().split('/').length === 3)
                value[propName] = parseInt(value[propName].toString().split('/').join(''));
        }
        return value
    }
    else
        return parseInt(value.toString().split('/').join(''));

}
function compareDate(date1, date2) {

    date1 = dateToNumber(date1);
    date2 = dateToNumber(date2);

    if (date1 > date2) {
        Ext.Msg.info({ ui: 'danger', title: '', html: 'تاریخ پایان کوچکتر از تاریخ شروع میباشد.', iconCls: '#Exclamation' });
        return false;
    }
    return true;

}

Ext.override(Ext.tree.Panel, {
    getChecked: function (propertyName, isComma) {
        var propertyName = propertyName || null;
        var checked = [];

        this.getView().getStore().getRootNode().cascadeBy(function (node) {
            if (node.id != "root") {

                if (node.data.checked && node.data.id == 0) {

                    node.eachChild(function (child) {

                        if (propertyName && child.data[propertyName])
                            checked.push(child.data[propertyName]);
                        else
                            checked.push(child.data);
                    })
                    return false;
                }
                else if (node.data.checked && (node.parentNode.data.checked == false || node.parentNode.id == "root")) {

                    if (propertyName && node.data[propertyName])
                        checked.push(node.data[propertyName]);
                    else
                        checked.push(node.data);
                }
            }
        });

        if (propertyName && isComma)
            return checked.join(',')
        else
            return checked;
    }
});

Ext.override(Ext.form.CheckboxGroup, {
    getChecked: function (isStr) {

        var checked = [];
        this.getBoxes('[checked]').forEach(function (item) {
            checked.push(item.inputValue)
        })

        if (isStr)
            return checked.join(',')
        else
            return checked;
    }
});

function checkChangeTreePanel(node, checked) {

    //node.eachChild(function (n) {
    //    n.set('checked', checked);
    //});
    node.cascadeBy(function (e) {
        e.set('checked', checked);
    });

    //node.parentNode.eachChild(function (n) {
    //    if (n.data.checked) {
    //        n.parentNode.set('checked', true)
    //        return false;
    //    }
    //    else
    //        n.parentNode.set('checked', false)
    //});

    //panel.suspendLayouts();

    //panel.resumeLayouts();
}

function comboBoxBindStore(comboBox, displayField, valueField, valueDataType) {


    comboBox.displayField = displayField
    comboBox.valueField = valueField
    comboBox.queryMode = "local"
    //comboBox.displayTpl.html = comboBox.displayTpl.html.replace("text", "Title").replace("field2", "Title")
    comboBox.displayTpl = Ext.create('Ext.XTemplate', '<tpl for=".">', '{' + displayField + '}', '</tpl>');
    comboBox.store = Ext.create('Ext.data.Store',
        {
            model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                extend: "Ext.data.Model",
                fields: [{
                    name: displayField
                }
                    , {
                    name: valueField,
                    type: isNullOrEmpty(valueDataType) ? "int" : valueDataType
                }
                ]
            }
            ), autoLoad: false, proxy: {
                type: 'memory'
            }
        });
    comboBox.onBindStore(comboBox.store);

}

function getFieldsToJson(form, xtype, isValue, separator, extraData, isFilter, isTitle) {

    var filterValues = form ? form.query(xtype) : [];
    var filtersObj = {};//{ CompanyID: companyID }
    Ext.Object.merge(filtersObj, extraData);
    var columnName;
    var value
    var xtype;
    var columns = '';
    var field
    var isEmptyValue;
    var isEqualPreValue;
    isFilter = isFilter == undefined ? false : isFilter;

    filterValues.forEach(function (field) {

        //if (filterName.substr(0, 1) !== '_') {
        value = isValue == true ? field.getValue() : 0;//filterValues[filterName] : 0;
        columnName = field.id.replace('-legendChk','').split(separator)[1];
        isEmptyValue = isFilter && (value == "" || value == null || value == undefined) ? false : true;
        isEqualPreValue = field.preValue !== undefined && value !== null ? field.preValue.toString() !== value.toString() : true;
        if (/*value !== "" &&*/ isEmptyValue && isEqualPreValue && columnName !== undefined && value !== "-1") {

            // field = form.getForm().findField(filterName)
            xtype = field.xtype
            if (xtype == 'combobox') {

                filtersObj[columnName + "ID"] = parseInt(value)
                if (!isFilter && isTitle)
                    filtersObj[columnName + "Title"] = field.rawValue;

            }
            else if (xtype == 'tagfield' || xtype == 'nettagfield') {

                if (Ext.isArray(value) && value.length > 0)
                    filtersObj[columnName + "ID"] = value.join(',');
                else if (!isFilter)
                    filtersObj[columnName + "ID"] = value

            }
            else if (xtype == 'checkboxfield') {
                filtersObj[columnName] = value;
            }
            else if (columnName.indexOf('Organization') > -1) {

                var orgIdSelected = field.tag
                orgIdSelected = orgIdSelected == undefined ? '' : orgIdSelected

                if (orgIdSelected !== '') {
                    filtersObj[columnName + "ID"] = orgIdSelected;
                    if (!isFilter && isTitle)
                        filtersObj[columnName + "Title"] = field.rawValue;
                }
                else if (orgIdSelected == '' && orgAccess !== '') {
                    filtersObj[columnName + "ID"] = orgAccess;

                }
            }
            else if (field.tag !== undefined || columnName.indexOf('City') > -1) {

                filtersObj[columnName + "ID"] = field.tag
                // if (!isFilter && isTitle)
                filtersObj[columnName + "Title"] = value;
            }

            else {
                filtersObj[columnName] = value
            }

        }
        //}
    })
    return Ext.JSON.encode(timeToMinuteObject(dateToNumber(filtersObj)));
}
function setJsonToFields(panel, xtype, jsonData) {

    var dataArray = Ext.isString(jsonData) ? Ext.JSON.decode(jsonData)[0] : jsonData

    var infoObj = minuteToTimeObject(numberToDate(dataArray))
    var fields
    var fieldName
    var checkboxgroup
    //if (xtype === 'formPanel' || panel.xtype === 'formPanel')
    //    fields = panel.getValues();
    //else
    fields = panel.query(xtype);
    fields.forEach(function (field) {
        fieldName = field.id.split('_').length > 1 ? field.id.split('_')[1] : field.id;
        for (var colName in infoObj) {
            if (colName.indexOf(fieldName) > -1 && fieldName.indexOf('City') > -1) {

                field.setValue(infoObj[colName.replace('ID', 'Title')])

                field.tag = infoObj[colName.replace('Title', 'ID')];
            }
            else if ((fieldName + "ID").indexOf(colName) > -1 && colName != 'ID') {
                field.setValue(infoObj[colName])
                field.preValue = infoObj[colName] == null ? '' : infoObj[colName];
            }

        }
    })

    checkboxgroups = panel.query('checkboxgroup')
    if (!isNullOrEmpty(checkboxgroups) && checkboxgroups.length > 0) {

        checkboxgroups.forEach(function (cbg) {
            fieldName = cbg.id.split('_').length > 1 ? cbg.id.split('_')[1] : cbg.id;
            for (var colName in infoObj) {

                if ((fieldName + "ID").indexOf(colName) > -1) {
                    setValueCheckboxGroup(cbg, infoObj[colName])

                }

            }
        });
    }

    //if (dataArray.length > 1) {

    var grid = panel.query('grid')
    if (!isNullOrEmpty(grid) && grid.length > 0) {
        grid = grid[0]

        fieldName = grid.id.split('_').length > 1 ? grid.id.split('_')[1] : grid.id;
        for (var colName in infoObj) {

            if ((fieldName + "ID").indexOf(colName) > -1) {
                grid.store.loadData(dataArray)

            }
        }
    }
    //}
}

function setValueCheckboxGroup(checkboxgroup, value) {

    var boxes = checkboxgroup.getBoxes(),
        b,
        bLen = boxes.length,
        box, name, cbValue;

    if (Ext.isString(value))
        value = value.split(',')

    for (b = 0; b < bLen; b++) {
        box = boxes[b];
        name = box.getName();
        cbValue = false;
        if (value) {
            //if (Ext.isArray(value)) 
            cbValue = Ext.Array.contains(value, box.inputValue.toString());

            if (cbValue === false)
                cbValue = Ext.Array.contains(value, name);

        }
        box.setValue(cbValue);
    }
}


function getGridColumnsName(grid, isJsonObj) {

    var columnsStr = ''
    if (grid != undefined && grid != null) {


        var fields = Ext.Array.pluck(grid.store.model.fields, 'name')
        var columns = Ext.Array.pluck(grid.columns, 'dataIndex')
        var isCol
        var isColHidden

        fields.forEach(function (column) {

            isCol = Ext.Array.contains(columns, column)
            isColHidden = isCol ? contains(grid.columns, 'dataIndex', column).hidden : false

            if (isColHidden == false && column !== 'id') {
                if (isJsonObj)
                    columnsStr = columnsStr + '"' + column + '":0,'
                else
                    columnsStr = columnsStr + column + ','
            }
        })

        if (isJsonObj)
            columnsStr = '{' + columnsStr.substr(0, columnsStr.lastIndexOf(',')) + '}'

        /* grid.columns.forEach(function (column) {
           
             if (column.dataIndex !== '' && column.dataIndex !== undefined && column.dataIndex !== null && column.hidden == false) {
                 if (isJsonObj)
                     columns = columns + '"' + column.dataIndex + '":0,'
                 else
                     columns = columns + column.dataIndex + ','
             }
         })
         if (isJsonObj)
             columns = '{' + columns + '"ID":0}'
         else
             columns = columns + 'ID'//columns.substr(0, columns.lastIndexOf(','));*/
    }
    return columnsStr
}

//function insertDynamicQuery(tableName, isID, mask, fillControl, extraData, isTitle) {


//    var columns = ''

//    if (fillControl.xtype == undefined)
//        columns = Ext.JSON.encode(fillControl)
//    else
//        columns = getFieldsToJson(fillControl, 'field', true, '_', extraData, false, isTitle)


//    App.direct.ExecuteDynamicQuery(tableName, 'cDPRUjjt+4k='/*insert*/, columns, '', '', '', isID, tokenID, {
//        success: function (result) {
//            if (result.Success) {

//                if (result.Result !== '') {

//                    if (isID == true)
//                        isID = result.Result
//                }
//            }

//            if (mask !== undefined && mask !== null)
//                mask.unmask();

//        }
//    });
//    return isID
//}

//function updateDynamicQuery(tableName, mask, fillControl, filterControl, extraData, isTitle) {

//    var whereClause = ''
//    var columns = ''

//    columns = getFieldsToJson(fillControl, 'field', true, '_', extraData, false, isTitle)
//    if (filterControl.xtype == undefined)
//        whereClause = Ext.JSON.encode(filterControl);
//    else
//        whereClause = getFieldsToJson(filterControl, 'field', true, '_', { CompanyID: companyID }, true, false)

//    App.direct.ExecuteDynamicQuery(tableName, '5RVG6q04oOw='/*update*/, columns, whereClause, '', '', false, {
//        success: function (result) {


//            if (mask !== undefined && mask !== null)
//                mask.unmask();

//        }
//    });

//}

//function deleteDynamicQuery(tableName, mask, filterControl) {

//    var whereClause = ''



//    if (filterControl.xtype == undefined)
//        whereClause = Ext.JSON.encode(filterControl);
//    else
//        whereClause = getFieldsToJson(filterControl, 'field', true, '_', { CompanyID: companyID }, true, false)

//    App.direct.ExecuteDynamicQuery(tableName, 'sRt5u51VXok='/*delete*/, '', false, whereClause, '', '', false, {
//        success: function (result) {


//            if (mask !== undefined && mask !== null)
//                mask.unmask();

//        }
//    });

//}

function selectDynamicQuery(tableName, join, paging, mask, fillControl, filterControl, afterSelectFn) {

    var whereClause = ''
    var columns = ''

    if (fillControl.xtype == undefined)
        columns = Ext.JSON.encode(fillControl);
    else if ((fillControl.xtype == 'panel' || fillControl.xtype == 'formPanel' || fillControl.xtype == 'form')) {
        columns = getFieldsToJson(fillControl, 'field', false, '_', null, false, false)
    }
    else if (fillControl !== null && fillControl.xtype == 'grid') {
        columns = getGridColumnsName(fillControl)
    }


    if (filterControl.xtype == undefined)
        whereClause = Ext.JSON.encode(filterControl);
    else
        whereClause = getFieldsToJson(filterControl, 'field', true, '_', { CompanyID: companyID }, true, false)


    App.direct.ExecuteDynamicQuery(tableName, 'ps7xOf2AjX4='/*select*/, columns, whereClause, join, paging, false, {
        success: function (result) {
            if (result.Success) {

                if (result.Result !== '') {

                    //var lzwString1 = JSONC.unpack(result.Result);
                    // Returns the LZW representation as string of the JSON object.
                    //var lzwString2 = JSONC.unpack(result.Result, true);

                    if (afterSelectFn)
                        Ext.callback(afterSelectFn, this, [Ext.JSON.decode(result.Result)])
                    else if (fillControl.xtype == 'panel' || fillControl.xtype == 'formPanel' || fillControl.xtype == 'form')
                        setJsonToFields(fillControl, 'field', result.Result);
                    else if (fillControl.xtype == 'grid') {

                        if (paging !== '') {
                            var data = numberToDate(Ext.JSON.decode(result.Result))
                            fillControl.store.totalCount = data.total
                            fillControl.store.loadData(data.root)
                        }
                        else {
                            fillControl.store.loadData(numberToDate(Ext.JSON.decode(result.Result)))
                        }
                    }
                }
                else {
                    if (fillControl.xtype == 'grid')
                        fillControl.store.loadData([])
                }
            }

            if (mask !== undefined && mask !== null)
                mask.unmask();
        }
    });
}


function execSPSelect(spName, parametersJson, mask, fillControl, filterControl, afterSelectFn) {

    
    //var parametersJson = ''
    //if (fillControl.xtype == 'panel' || fillControl.xtype == 'formPanel' || fillControl.xtype == 'form') {
    //    parametersJson = getFieldsToJson(fillControl, 'field', false, '_', null, false)
    //}
    //else if (fillControl.xtype == 'grid') {
    //    parametersJson = getGridColumnsName(fillControl)
    //}

    if (!isNullOrEmpty(mask) && mask.masked === false)
        mask = showMask(mask, 'در حال بارگذاری...', false);

    parametersJson = Ext.isObject(parametersJson) ? Ext.JSON.encode(parametersJson) : parametersJson
    fillControl = isNullOrEmpty(fillControl) ? {} : fillControl

    App.direct.ExecuteStoreProcedureSelect(spName, parametersJson, tokenID, companyID, {

        success: function (result) {
            if (result !== 'Error') {

                if (result !== '') {

                    if (fillControl.xtype === 'panel' || fillControl.xtype === 'formPanel' || fillControl.xtype === 'form')
                        setJsonToFields(fillControl, 'field', result);
                    else if (fillControl.xtype === 'grid' || fillControl.xtype === 'combobox' || fillControl.xtype === 'nettagfield') {

                        if (parametersJson.indexOf('"Paging":') > -1) {
                            var data = Ext.JSON.decode(result)
                            fillControl.store.totalCount = data.total
                            fillControl.store.loadData(minuteToTimeObject(numberToDate(data.root)))
                        }
                        else {
                            fillControl.store.loadData([])
                            fillControl.store.loadData(minuteToTimeObject(numberToDate(Ext.JSON.decode(result))))
                        }
                    }
                    else if (fillControl.xtype === 'checkboxgroup') {

                        var items = Ext.JSON.decode(result)

                        items.forEach(function (item) {
                            fillControl.add({ boxLabel: item.Title, name: item.ID, inputValue: item.ID })
                        })
                    }

                    if (afterSelectFn)
                        Ext.callback(afterSelectFn, this, [Ext.JSON.decode(result)])
                }
                else {

                    clearPanel(fillControl)
                    //if (fillControl.xtype == 'grid' || fillControl.xtype == 'combobox')
                    //    fillControl.store.loadData([])
                    //else {

                    //    fillControl.query('field').forEach(function (field) { field.setValue('') })

                    //}

                    if (afterSelectFn)
                        Ext.callback(afterSelectFn, this, [[]])
                }
            }

            if (mask !== undefined && mask !== null)
                mask.unmask();
        },
        failure: function () {
            if (mask !== undefined && mask !== null)
                mask.unmask();
        }
    });
}
function execSPInsert(spName, isID, isResult, fillControl, extraData, mask, isTitle, afterInsertFn, msgConfig) {

    if (!isNullOrEmpty(mask) && mask.masked === false)
        mask = showMask(mask, 'در حال ذخیره...', false);

    var parametersJson = ''
    //var id = 0;
    extraData = Ext.isString(extraData) ? Ext.JSON.decode(extraData) : extraData

    if (fillControl == null)
        parametersJson = Ext.JSON.encode(extraData)
    else
        parametersJson = getFieldsToJson(fillControl, 'field', true, '_', extraData, false, isTitle)


    App.direct.ExecuteStoreProcedureUpdate(spName, 'cDPRUjjt+4k='/*insert*/, isID, isResult, parametersJson, tokenID, companyID, {
        success: function (result) {
            if (result !== 'Error') {

                if (isNullOrEmpty(msgConfig) || isNullOrEmpty(msgConfig.isShow) || msgConfig.isShow == true) {

                    showMsgInfo((isNullOrEmpty(msgConfig) ? 'ذخیره با موفقیت انجام شد' : msgConfig.msg),
                        (isNullOrEmpty(msgConfig) ? 'ذخیره' : msgConfig.title),
                        'success', false/*closable*/, true/*autoHide*/)
                }
            }

            if (mask !== undefined && mask !== null)
                mask.unmask();

            if (afterInsertFn) {
                if (isID)
                    Ext.callback(afterInsertFn, this, [parseInt(result)])
                else if (isResult)
                    Ext.callback(afterInsertFn, this, [Ext.JSON.decode(result)])
                else
                    Ext.callback(afterInsertFn, this, [result])

            }
        },
        failure: function () {
            if (mask !== undefined && mask !== null)
                mask.unmask();
        }
    });
    //return id
}
function execSPUpdate(spName, fillControl, extraData, mask, isTitle, forceUpdate, isResult, afterUpdateFn, msgConfig) {

    if (!isNullOrEmpty(mask) && mask.masked === false)
        mask = showMask(mask, 'در حال ویرایش...', false);

    var parametersJson = ''
    extraData = Ext.isString(extraData) ? Ext.JSON.decode(extraData) : extraData

    if (fillControl == null)
        parametersJson = Ext.JSON.encode(extraData)
    else
        parametersJson = getFieldsToJson(fillControl, 'field', true, '_', extraData, false, isTitle)

    if (Ext.JSON.encode(extraData) !== parametersJson || forceUpdate) {

        App.direct.ExecuteStoreProcedureUpdate(spName, '5RVG6q04oOw='/*update*/, false, isResult, parametersJson, tokenID, companyID, {
            success: function (result) {
                if (result !== 'Error') {
                    if (isNullOrEmpty(msgConfig) || isNullOrEmpty(msgConfig.isShow) || msgConfig.isShow == true) {

                        showMsgInfo((isNullOrEmpty(msgConfig) ? 'ویرایش با موفقیت انجام شد' : msgConfig.msg),
                            (isNullOrEmpty(msgConfig) ? 'ویرایش' : msgConfig.title),
                            'success', false/*closable*/, true/*autoHide*/)
                    }
                }
                if (mask !== undefined && mask !== null)
                    mask.unmask();


                if (afterUpdateFn) {
                    if (isResult)
                        Ext.callback(afterUpdateFn, this, [Ext.JSON.decode(result)])
                    else
                        Ext.callback(afterUpdateFn, this, [result !== 'Error' ? true : false])

                }
            },
            failure: function () {
                if (mask !== undefined && mask !== null)
                    mask.unmask();
            }
        });
    }
    else {

        if (mask !== undefined && mask !== null)
            mask.unmask();

        if (afterUpdateFn)
            Ext.callback(afterUpdateFn, this, [false])
    }

}
function execSPDelete(spName, extraData, mask, afterDeleteFn, msgConfig) {

    if (!isNullOrEmpty(mask) && mask.masked === false)
        mask = showMask(mask, 'در حال حذف...', false);

    var parametersJson = ''

    //parametersJson = getFieldsToJson(fillControl, 'field', true, '_', extraData, false, isTitle)

    parametersJson = Ext.isObject(extraData) ? Ext.JSON.encode(extraData) : extraData

    App.direct.ExecuteStoreProcedureUpdate(spName, 'sRt5u51VXok='/*delete*/, false, false, parametersJson, tokenID, companyID, {
        success: function (result) {
            if (result !== 'Error') {

                if (isNullOrEmpty(msgConfig) || isNullOrEmpty(msgConfig.isShow) || msgConfig.isShow == true) {

                    showMsgInfo((isNullOrEmpty(msgConfig) ? 'حذف با موفقیت انجام شد' : msgConfig.msg),
                        (isNullOrEmpty(msgConfig) ? 'حذف' : msgConfig.title),
                        'success', false/*closable*/, true/*autoHide*/)
                }
            }
            if (mask !== undefined && mask !== null)
                mask.unmask();

            if (afterDeleteFn)
                Ext.callback(afterDeleteFn, this, [result !== 'Error' ? true : false])
        },
        failure: function () {
            if (mask !== undefined && mask !== null)
                mask.unmask();
        }

    });

}

function getParametersJson(fillControl, filterControl, join, paging, extraFilter, extraColumns, extraParams, isValue) {

    var whereClause = ''
    var columns = ''
    var jsonInfo = ''
    isValue = isNullOrEmpty(isValue) ? false : isValue

    if (fillControl.xtype == undefined)
        columns = Ext.JSON.encode(fillControl);
    else if ((fillControl.xtype == 'panel' || fillControl.xtype == 'formPanel' || fillControl.xtype == 'form')) {
        columns = getFieldsToJson(fillControl, 'field', isValue, '_', extraColumns, false, false)
    }
    else if (fillControl !== null && fillControl.xtype == 'grid') {
        columns = getGridColumnsName(fillControl, true)
    }


    if (isNullOrEmpty(filterControl) || filterControl.xtype == undefined) {

        filterControl = isNullOrEmpty(filterControl) ? {} : filterControl
        whereClause = Ext.JSON.encode(Ext.Object.merge(filterControl, extraFilter));
    }
    else
        whereClause = getFieldsToJson(filterControl, 'field', true, '_', extraFilter, true, false)

    //if (!isNullOrEmpty(paging) && !isNullOrEmpty(join))
    //    return '{"Columns":' + columns + ',"Where":' + whereClause + ',"Paging":' + paging + ',"Join":' + join + '}'
    //if (!isNullOrEmpty(paging))
    //    return '{"Columns":' + columns + ',"Where":' + whereClause + ',"Paging":' + paging + '}'
    //if (!isNullOrEmpty(join))
    //    return '{"Columns":' + columns + ',"Where":' + whereClause + ',"Join":' + join + '}'
    //if (!isNullOrEmpty(extraParam))
    //    return '{"Columns":' + columns + ',"Where":' + whereClause + ',"Join":' + join + '}'
    //return '{"Columns":' + columns + ',"Where":' + whereClause + '}'

    if (!isNullOrEmpty(paging) && !isNullOrEmpty(join))
        jsonInfo = '{"Columns":' + columns + ',"Where":' + whereClause + ',"Paging":' + paging + ',"Join":' + join + '}'
    else if (!isNullOrEmpty(paging))
        jsonInfo = '{"Columns":' + columns + ',"Where":' + whereClause + ',"Paging":' + paging + '}'
    else if (!isNullOrEmpty(join))
        jsonInfo = '{"Columns":' + columns + ',"Where":' + whereClause + ',"Join":' + join + '}'
    else
        jsonInfo = '{"Columns":' + columns + ',"Where":' + whereClause + '}'

    if (!isNullOrEmpty(extraParams)) {

        jsonInfo = Ext.JSON.decode(jsonInfo)
        jsonInfo['Params'] = extraParams
        jsonInfo = Ext.JSON.encode(jsonInfo)
    }

    return jsonInfo
}

function getValueGrid(grid, fieldName, errorMsg) {

    if (!Ext.isObject(grid))
        return grid

    if (grid.getSelectionModel().hasSelection()) {

        var row = grid.getSelectionModel().getSelection()[0].data;

        for (var colName in row) {
            if (colName === fieldName)
                return row[colName]
        }
    }
    else {
        if (isNullOrEmpty(errorMsg))
            errorMsg = '.هیچ رکوردی انتخاب نشده است'
        Ext.Msg.info({ ui: 'danger', title: 'انتخاب رکورد', html: errorMsg, iconCls: '#Exclamation' });
        return false;
    }

}

function getSelectedRowGrid(grid) {
    if (grid.getSelectionModel().hasSelection()) {

        var row = grid.getSelectionModel().getSelection()[0];
        return row
    }
    else {

        Ext.Msg.info({ ui: 'danger', title: 'انتخاب رکورد', html: '.هیچ رکوردی انتخاب نشده است', iconCls: '#Exclamation' });
        return null;
    }

}

function addRecordGrid(grid, data, editable, addLast) {
    var record;
    if (editable)
        grid.editingPlugin.cancelEdit();

    if (data == undefined || data == null) {
        data = {}
        grid.store.model.fields.forEach(function (field) {
            if (field.name !== 'id')
                data[field.name] = field.type == 'int' ? 0 : '';
        });
    }


    data['active'] = true

    if (addLast)
        record = grid.store.insert(grid.store.data.items.length, data);
    else
        record = grid.store.insert(0, data);

    if (editable)
        editRecordGrid(grid, record[0])
}
function editRecordGrid(grid, record) {

    if (isNullOrEmpty(record))
        record = getSelectedRowGrid(grid);

    var editingPlugin = grid.editingPlugin

    if (grid.xtype === 'treepanel')
        editingPlugin.startEdit(record, grid.columns[0]);
    else if (editingPlugin.xtype === 'cellediting' || editingPlugin.ptype === 'cellediting')
        editingPlugin.startEdit(record, grid.columns[0]);
    else if (editingPlugin.xtype === 'rowediting' || editingPlugin.ptype === 'rowediting')
        editingPlugin.startEdit(record);
}
function removeRecordGrid(grid, record) {

    if (isNullOrEmpty(record))
        record = getSelectedRowGrid(grid);

    grid.store.remove(record, record);
}
function selectRowGrid(grid, index) {

    grid.getSelectionModel().select(index);
}
function getRowsGrid(grid, fieldName) {

    if (isNullOrEmpty(fieldName))
        return Ext.Array.pluck(grid.store.getRange(), 'data');
    else
        return Ext.Array.pluck(Ext.Array.pluck(grid.store.getRange(), 'data'), fieldName);
}


function addSelectRowGrid(source, destination) {

    if (source.selModel.hasSelection()) {
        var records = source.selModel.getSelection();
        source.store.remove(records);
        destination.store.add(records);
    }
    else {
        Ext.Msg.info({ ui: 'danger', title: 'انتخاب رکورد', html: '.هیچ رکوردی انتخاب نشده است', iconCls: '#Exclamation' });
    }
}
function addAllRowGrid(source, destination) {

    var records = source.store.getRange();
    source.store.removeAll();
    destination.store.add(records);
}

function isNullOrEmpty(value) {
    if (value == undefined || value == null || value === '')
        return true
    return false
}
var I = 0
function findValuePropertyObject(obj, propValue) {
    try {
        for (var propName in obj) {
            I++;
            if (Ext.isObject(obj[propName])) {
                findValuePropertyObject(obj[propName], propValue)
            }
            else {
                if (obj[propName] == propValue) {
                    alert(propName + I.toString())
                    return I.toString();
                }

            }
        }
    }
    catch (e) {
        alert(I)
        return
    }
}

//-----------------------------------------------------------------------
var selectedRowIndex
var isGridRowClick
function rowDeselectEvent(selectionModel, record, rowIndex, fn) {

    if (selectedRowIndex !== rowIndex && isGridRowClick)
        return false
    return true
}
function rowMouseUpEvent(grid, record, tr, rowIndex, e) {

    selectedRowIndex = rowIndex
    isGridRowClick = true
}
//--------------------------------------------------------------------------------
function comboBoxYearBinder(comboBox, setCurrent) {


    comboBoxBindStore(comboBox, 'Text', 'Value', 'string');
    comboBox.queryMode = "local",
        //comboBox.store.clearData();
        comboBox.store.loadData(getYears());

    if (!isNullOrEmpty(setCurrent) && setCurrent)
        comboBox.setValue(getYear(true));
    //comboBox.select(comboBox.findRecord('Value', getMonth(true)))

}
function comboBoxMonthBinder(comboBox, setCurrent) {


    /*var months = [{ Text: 'فروردین', Value: 1 },
                  { Text: 'اردیبهشت', Value: 2 },
                  { Text: 'خرداد', Value: 3 },
                  { Text: 'تیر', Value: 4 },
                  { Text: 'مرداد', Value: 5 },
                  { Text: 'شهریور', Value: 6 },
                  { Text: 'مهر', Value: 7 },
                  { Text: 'آبان', Value: 8 },
                  { Text: 'آذر', Value: 9 },
                  { Text: 'دی', Value: 10 },
                  { Text: 'بهمن', Value: 11 },
                  { Text: 'اسفند', Value: 12 }]*/

    var months = [{ Text: 'فروردین', Value: '01' },
    { Text: 'اردیبهشت', Value: '02' },
    { Text: 'خرداد', Value: '03' },
    { Text: 'تیر', Value: '04' },
    { Text: 'مرداد', Value: '05' },
    { Text: 'شهریور', Value: '06' },
    { Text: 'مهر', Value: '07' },
    { Text: 'آبان', Value: '08' },
    { Text: 'آذر', Value: '09' },
    { Text: 'دی', Value: '10' },
    { Text: 'بهمن', Value: '11' },
    { Text: 'اسفند', Value: '12' }]

    comboBoxBindStore(comboBox, 'Text', 'Value', 'string');

    //comboBox.store.clearData();
    comboBox.store.loadData(months);

    if (!isNullOrEmpty(setCurrent) && setCurrent)
        comboBox.setValue(getMonth(true));


}
function getMonths() {


    return [['01', 'فروردین'],
    ['02', 'اردیبهشت'],
    ['03', 'خرداد'],
    ['04', 'تیر'],
    ['05', 'مرداد'],
    ['06', 'شهریور'],
    ['07', 'مهر'],
    ['08', 'آبان'],
    ['09', 'آذر',],
    ['10', 'دی'],
    ['11', 'بهمن'],
    ['12', 'اسفند']]


}
function getYears() {

    return [
        ["1396", "1396"],
        ["1397", "1397"],
        ["1398", "1398"],
        ["1399", "1399"],
        ["1400", "1400"]
    ];
}
function getYear(isStr) {
    var pDate = new persianDate();
    return isStr !== undefined && isStr ? pDate.year().toString() : pDate.year();
}
function getMonth(isStr) {
    var pDate = new persianDate();
    pDate.toLocale('en');
    //return isStr !== undefined && isStr ? pDate.month() < 10 ? '0' + pDate.month().toString() : pDate.month().toString() : pDate.month()
    return isStr !== undefined && isStr ? pDate.format('MM') : pDate.month()
}
function getMonthName(monthNo) {
    var pDate = new persianDate();
    if (!isNullOrEmpty(monthNo))
        return pDate._monthName(monthNo)

    return pDate.format('MMMM');
}
function getDay(isStr) {
    var pDate = new persianDate();
    return isStr !== undefined && isStr ? pDate.format('DD') : pDate.date()
    //return isStr !== undefined && isStr ? pDate.date() < 10 ? '0' + pDate.date().toString() : pDate.date().toString() : pDate.date()
}
function monthToStr(month) {

    return month < 10 ? '0' + month.toString() : month.toString();
}
function getCurrentDate(format, isStr) {

    var pDate = new persianDate();

    if (format == 1)//1397/05/06
        return pDate.format('L')
    else if (format == 2)//13960506
        return isStr !== undefined && isStr ? pDate.format('L').replace('/', '') : parseInt(pDate.format('L').replace('/', ''))
    else if (format == 3)//1397/05
        return pDate.format('L').substr(0, 7)
    else if (format == 4)//139705
        return isStr !== undefined && isStr ? pDate.format('L').substr(0, 7).replace('/', '') : parseInt(pDate.format('L').substr(0, 7).replace('/', ''))

}
function monthNameToMonthNo(monthName) {

    switch (monthName) {
        case 'فروردین':
            return '01'
        case 'اردیبهشت':
            return '02'
        case 'خرداد':
            return '03'
        case 'تیر':
            return '04'
        case 'مرداد':
            return '05'
        case 'شهریور':
            return '06'
        case 'مهر':
            return '07'
        case 'آبان':
            return '08'
        case 'آذر':
            return '09'
        case 'دی':
            return '10'
        case 'بهمن':
            return '11'
        case 'اسفند':
            return '12'
    }
}

function isPersianDate(pDate) {

    return (new persianDate()).isPersianDate(pDate)
}

function dateToArray(date, isStr) {

    date = date.split('/')
    if (!isStr)
         date.forEach(function (dt, i) { date[i] = parseInt(dt) })

    return date
}
function arrayObjectToString(array, propertyName, separator, isReverse) {

    //var str = ''
    //Ext.Array.pluck(array, propertyName/* propertyName*/).reverse().forEach(function (item) {
    //    str = str + item
    //})
    //return str
    //return Ext.Array.pluck(array, 'text'/* propertyName*/).reverse().join(separator);
    if (isReverse)
        return Ext.Array.pluck(array, propertyName).reverse().join(separator);

    return Ext.Array.pluck(array, propertyName).join(separator);
}

function digitGrouping(num) {

    var sep = ",";
    var decpoint = ".";
    // need a string for operations
    num = num.toString();
    // separate the whole number and the fraction if possible
    a = num.split(decpoint);
    x = a[0]; // decimal
    y = a[1]; // fraction
    z = "";


    if (typeof (x) != "undefined") {
        // reverse the digits. regexp works from left to right.
        for (i = x.length - 1; i >= 0; i--)
            z += x.charAt(i);
        // add seperators. but undo the trailing one, if there
        z = z.replace(/(\d{3})/g, "$1" + sep);
        if (z.slice(-sep.length) == sep)
            z = z.slice(0, -sep.length);
        x = "";
        // reverse again to get back the number
        for (i = z.length - 1; i >= 0; i--)
            x += z.charAt(i);
        // add the fraction back in, if it was there
        if (typeof (y) != "undefined" && y.length > 0)
            x += decpoint + y;
    }
    return x;
}


function createTask(interval, funcTask, isStartTask) {

    var taskRunner = new Ext.util.TaskRunner()
    var task;

    task = taskRunner.newTask({
        run: funcTask,
        interval: interval
    });

    if (isStartTask)
        task.start();

    return task;
}

function treePanelBinder(tree, items, textField, valueField, parentField, isSelectable, iconName) {

    tree.store.clearData();
    var rootUnit = null
    Ext.Array.forEach(items, function (parent) {
        var children = Ext.Array.filter(items, function (item) {
            if (item.ParentID === parent.ID)
                return true;
        });

        if (children.length === 0)
            parent.Children = null;
        else
            parent.Children = children;

        if (parent.ParentID === null)
            rootUnit = parent;

    })
    var rootNode = tree.getRootNode();

    if (rootUnit !== null) {
        cascadeBy(rootNode, rootUnit, isSelectable)
    }
    else {

        var children = [];
        Ext.Array.forEach(items, function (child) {
            var parent = Ext.Array.filter(items, function (item) {
                if (child.ParentID === item.ID)
                    return true;
            });

            if (parent.length === 0) {
                child.ParentID = 0;
                children.push(child);
            }
        });

        rootUnit = { ID: 0, Name: '', ParentID: null, Children: children }
        items.push(rootUnit);
        cascadeBy(rootNode, rootUnit, isSelectable)
    }

    //---------------
    function cascadeBy(parent, Rels, isSelectable) {


        if (Rels.Children != null) {

            var childNodeModel = {
                id: Rels[valueField],
                text: Rels[textField],
                iconCls: '#' + iconName,
                expanded: Rels.ParentID == null ? true : false,
                parentId: Rels.ParentID,
                leaf: false,
                checked: isSelectable === false ? undefined : isSelectable
            };

            var childNode = parent.appendChild(childNodeModel);

            for (var i = 0; i < Rels.Children.length; i++) {
                cascadeBy(childNode, Rels.Children[i], isSelectable);
            }
        }
        else {
            var childNodeModel = {
                id: Rels[valueField],
                text: Rels[textField],
                iconCls: '#' + iconName,
                leaf: true,
                parentId: Rels.ParentID,
                checked: isSelectable === false ? undefined : isSelectable,
                preTitle: Rels[textField]
            };
            parent.appendChild(childNodeModel);

        }
    }
}

function addParamQueryString(url, newParams) {

    var baseUrl = url.split('?')[0];
    var queryString = url.split('?')[1];
    var queryStringObj = Ext.Object.fromQueryString(queryString)

    for (var newParam in newParams) {
        queryStringObj[newParam] = newParams[newParam]
    }

    return baseUrl + '?' + Ext.Object.toQueryString(queryStringObj);
}

Ext.define('FileDownloader', {

    /**
     * Singleton class
     * @type {Boolean}
     */
    singleton: true,

    downloadFrame: null,

    downloadForm: null,

    /**
     * Get/Download from url
     * @param config
     */
    download: function (config) {
        var me = this,
            body = Ext.getBody();
        config = config || {};

        /**
         * Support for String config as url
         */
        if (Ext.isString(config)) {
            config = {
                url: config
            };
        }


        me.downloadFrame = body.createChild({
            tag: 'iframe',
            cls: 'x-hidden',
            id: 'app-upload-frame',
            name: 'uploadframe'
        });

        me.downloadForm = body.createChild({
            tag: 'form',
            cls: 'x-hidden',
            id: 'app-upload-form',
            target: config.target || 'app-upload-frame'
        });




        Ext.Ajax.request({
            url: config.url || '.',
            params: config.params || {},
            form: me.downloadForm,
            isUpload: true,
            scope: me,
            success: me.handleException,
            failure: me.handleException
        });
    },

    handleException: function (response, options) {

        var body = Ext.getBody();
        body.down('#app-upload-frame').remove()
        body.down('#app-upload-form').remove()

        var me = this,
            result = Ext.decode(response.responseText, true);

        if (result) {
            Ext.Msg.alert('Message', result['message']);
        } else {
            Ext.Msg.alert('Message', ' An unknown Error occurred while downloading.');
        }
    }

});

function clearPanel(panel) {

    if (!isNullOrEmpty(panel) && !isNullOrEmpty(panel.query)) {

        panel.query('form').forEach(function (form) {
            form.reset()
        })

        //panel.query('field').forEach(function (field) {
        //    field.setValue('')
        //})

        panel.query('grid').forEach(function (grid) {
            grid.store.loadData([])
        })

        panel.query('checkboxgroup').forEach(function (cbg) {
            cbg.getBoxes().forEach(function (box) {
                box.setValue(false)
            })
        })

    }
}

function lastRemoveChar(str, char) {
    return str.substr(0, str.lastIndexOf(char))
}
function replace(str, char, replace, isInt) {

    if (isInt === true)
        return parseInt(str.split(char).join(replace))

    return str.split(char).join(replace)
}

function gridCellToolTip(grid) {

    var tool = Ext.create("Ext.tip.ToolTip", {
        delegate: ".x-grid-cell",
        target: grid.getView().el,
        trackMouse: true,
        rtl: true,
        textAlign: 'right',
        listeners: {
            show: {
                fn: function (item) {
                    var view   = grid.getView(),
                        store  = grid.getStore(),
                        record = view.getRecord(view.findItemByChild(this.triggerElement)),
                        column = view.getHeaderByCell(this.triggerElement),
                        data   = record.get(column.dataIndex);

                    this.update(data);
                }
            }
        }
    });

    return tool
}

function minuteToTime(minute) {

    if (isNullOrEmpty(minute))
        return ''

    minute = parseInt(minute)
    var hour = Math.floor(minute / 60)
    minute = minute % 60

    return (hour < 10 ? '0' + hour.toString() : hour.toString()) + ':' + (minute < 10 ? '0' + minute.toString() : minute.toString())
}

function timeToMinute(time) {

    if (isNullOrEmpty(time))
        return 0

    time = time.toString()
    time = time.split(':')

    if (time.length > 1) {
        var hour = time[0]
        var minute = time[1]

        return parseInt(hour) * 60 + parseInt(minute)
    }
    return 0
}


function minuteToTimeObject(value) {

    var arrayObj = Ext.isString(value) ? Ext.JSON.decode(value) : value;
    var minute
    if (Ext.isNumeric(value)) {
        return minuteToTime(value)
    }
    else if (Ext.isArray(arrayObj)) {
        for (var i = 0; arrayObj.length > i; i++) {
            for (var propName in arrayObj[i]) {
                if (propName.toLowerCase().indexOf('time') > -1 && Ext.isNumeric(arrayObj[i][propName])) {
                    minute = arrayObj[i][propName];
                    arrayObj[i][propName] = minuteToTime(minute)
                    
                }
            }
        }
    }
    else if (Ext.isObject(arrayObj)) {
        for (var propName in arrayObj) {
            if (propName.toLowerCase().indexOf('time') > -1 && Ext.isNumeric(arrayObj[propName])) {
                minute = arrayObj[propName]
                arrayObj[propName] = minuteToTime(minute)
            }

        }
    }
    return arrayObj
}

function timeToMinuteObject(value) {

    var arrayObj = Ext.isString(value) ? Ext.JSON.decode(value) : value;
    var time
    if (Ext.isString(value) && value.indexOf(':') > 0) {
        return timeToMinute(value)
    }
    else if (Ext.isArray(arrayObj)) {
        for (var i = 0; arrayObj.length > i; i++) {
            for (var propName in arrayObj[i]) {
                if (propName.toLowerCase().indexOf('time') > -1 && Ext.isString(arrayObj[i][propName]) && arrayObj[i][propName].indexOf(':') > 0) {
                    time = arrayObj[i][propName];
                    arrayObj[i][propName] = timeToMinute(time)

                }
            }
        }
    }
    else if (Ext.isObject(arrayObj)) {
        for (var propName in arrayObj) {
            if (propName.toLowerCase().indexOf('time') > -1 && Ext.isString(arrayObj[propName]) && arrayObj[propName].indexOf(':') > 0) {
                time = arrayObj[propName]
                arrayObj[propName] = timeToMinute(time)
            }

        }
    }
    return arrayObj
}

function farsiToEnglish(farsiNum) {
    var s2 = "";
    for (i = 0; i < farsiNum.length; i++) {
        c = farsiNum.charCodeAt(i);
        if ((c >= 1776) && (c <= 1785)) {
            c = c - 1728;
        }
        s2 += String.fromCharCode(c);
    }
    return s2;
}

function englishToFarsi(engNum) {
    var s2 = "";
    for (i = 0; i < engNum.length; i++) {
        c = engNum.charCodeAt(i);
        if ((c >= 48) && (c <= 57)) {
            c = c + 1728;
        }

        s2 += String.fromCharCode(c);
    }
    //alert(s2);
    return s2;
}


