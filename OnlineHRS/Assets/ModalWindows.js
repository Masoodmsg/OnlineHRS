function PersonnelSearchFiltersPanel(parent,fillCtrl) {

    this.form = new Ext.form.FormPanel({
        cls: "filter",
        rtl: true,
        xtype: "form",
        renderTo: isNullOrEmpty(parent) ? null : parent.getEl(),
        keyMap: {
            "ENTER": function () {
                personnelSearch(this.up('form'), 1)
            }
        },
        region: "north",
        split: true,
        items: [{
            collapsed: true,
            rtl: true,
            xtype: "form",
            autoScroll: true,
            items: [{
                id: "ctl03_FullName",
                xtype: "textfield",
                fieldLabel: "نام و نام خانوادگی",
                validateOnFocusLeave: true
            }, {
                id: "ctl03_Code",
                tabIndex: 1,
                xtype: "textfield",
                fieldLabel: "کد پرسنلی",
                validateOnFocusLeave: true,
                maskRe: /[0-9-]/
            }, {
                id: "ctl03_NationalCode",
                tabIndex: 2,
                xtype: "textfield",
                fieldLabel: "کد ملی",
                validateOnFocusLeave: true,
                vtype: "isValidNationalCode",
                vtypeText: ".کد ملی نامعتبر است",
                enforceMaxLength: true,
                maskRe: /[0-9-]/,
                maxLength: 10,
                minLength: 10,
                minLengthText: "این فیلد باید 10 رقم باشد"
            }, {
                id: "ctl03_Sex",
                tabIndex: 3,
                xtype: "combobox",
                fieldLabel: "جنسیت",
                validateOnFocusLeave: true,
                editable: false,
                selectedItems: [{
                    value: "-1"
                }],
                queryMode: "local",
                store: [
                    ["-1", "همه"],
                    ["1", "مرد"],
                    ["2", "زن"]
                ]
            }, {
                id: "ctl03_StatusType",
                tabIndex: 4,
                xtype: "combobox",
                fieldLabel: "وضعیت اشتغال",
                validateOnFocusLeave: true,
                editable: false,
                selectedItems: [{
                    value: "-1"
                }],
                queryMode: "local",
                store: [
                    ["-1", "همه"],
                    ["1", "شاغل"],
                    ["2", "غیر شافل"]
                ]
            }, {
                id: "ctl03_EducationGrade",
                tabIndex: 5,
                xtype: "nettagfield",
                fieldLabel: "مدرک تحصیلی",
                validateOnFocusLeave: true,
                editable: false,
                multiSelect: true,
                queryMode: "local",
                store: [],
                listeners: {
                    afterrender: {
                        fn: function (item) {
                            comboBoxConstantBinder(this, 'EducationGrade', 'GradeType', 1, 'Value')
                        }
                    }
                }
            }, {
                id: "ctl03_MarriedStatus",
                tabIndex: 6,
                xtype: "nettagfield",
                fieldLabel: "وضعیت تاهل",
                validateOnFocusLeave: true,
                editable: false,
                multiSelect: true,
                queryMode: "local",
                store: [],
                listeners: {
                    afterrender: {
                        fn: function (item) {
                            comboBoxConstantBinder(this, 'BaseInfo', 'MarriedStatus', 1, 'ID')
                        }
                    }
                }
            }, {
                id: "ctl03_InsuranceType",
                tabIndex: 7,
                xtype: "nettagfield",
                fieldLabel: "نوع بيمه",
                validateOnFocusLeave: true,
                editable: false,
                multiSelect: true,
                queryMode: "local",
                store: [],
                listeners: {
                    afterrender: {
                        fn: function (item) {
                            comboBoxConstantBinder(this, 'BaseInfo', 'InsuranceType', 1, 'ID')
                        }
                    }
                }
            }, {
                id: "ctl03_ContractBy",
                tabIndex: 8,
                xtype: "nettagfield",
                fieldLabel: "طرف قرارداد",
                validateOnFocusLeave: true,
                editable: false,
                multiSelect: true,
                queryMode: "local",
                store: [],
                listeners: {
                    afterrender: {
                        fn: function (item) {
                            comboBoxConstantBinder(this, 'BaseInfo', 'ContractBy', 1, 'ID')
                        }
                    }
                }
            }, {
                id: "ctl03_JobStatus",
                fixed: true,
                tabIndex: 9,
                xtype: "nettagfield",
                fieldLabel: "وضعیت شغلی",
                validateOnFocusLeave: true,
                editable: false,
                multiSelect: true,
                queryMode: "local",
                store: [],
                listeners: {
                    afterrender: {
                        fn: function (item) {
                            comboBoxJobStatusBinder(this)
                        }
                    }
                }
            }, {
                id: "ctl03_EmploymentType",
                tabIndex: 10,
                xtype: "nettagfield",
                fieldLabel: "نوع استخدام",
                validateOnFocusLeave: true,
                editable: false,
                multiSelect: true,
                queryMode: "local",
                store: [],
                listeners: {
                    afterrender: {
                        fn: function (item) {
                            comboBoxConstantBinder(this, 'BaseInfo', 'EmploymentType', 1, 'ID')
                        }
                    }
                }
            }],
            layout: {
                type: "table",
                itemCls: "width-full",
                columns: 4
            },
            bodyPadding: 5,
            title: "فیلتر اطلاعات فردی",
            iconCls: "#UserMagnify",
            fieldDefaults: {
                labelAlign: "top"
            }
        }, {
           
            border: false,
            rtl: true,
            xtype: "form",
            items: [{
                id: "ctl03_PostActivityType",
                tabIndex: 4,
                xtype: "combobox",
                fieldLabel: "صفی/ستادی",
                validateOnFocusLeave: true,
                editable: false,
                selectedItems: [{
                    value: "-1"
                }],
                queryMode: "local",
                store: [
                    ["-1", "همه"],
                    ["1", "صفی"],
                    ["2", "ستادی"]
                ]
            }, {
                id: "ctl03_Organization",
                xtype: "textfield",
                fieldLabel: "محل خدمت",
                validateOnFocusLeave: true,
                editable: false,
                triggers: {
                    "_trigger1": {
                        handler: function () {
                            (new OrganizitionTreeSelect(this.up().up().up('panel')/*this.up('[cls=personnel-search]'*/, this)).show()
                        },
                        tag: "_trigger1",
                        cls: Ext.form.trigger.Trigger.getIcon("Search")
                    }
                }
            }, {
                id: "ctl03_PostTitle",
                fixed: true,
                rtl: true,
                tabIndex: 9,
                xtype: "nettagfield",
                colspan: 2,
                fieldLabel: "عنوان پست",
                validateOnFocusLeave: true,
                editable: false,
                emptyText: "جستجو پست",
                multiSelect: true,
                queryMode: "local",
                typeAhead: true,
                store: [],
                listeners: {
                    afterrender: {
                        fn: function (item) {
                            comboBoxPostTitleBinder(this)
                        }
                    }
                }
            }],
            layout: {
                type: "table",
                itemCls: "width-full",
                columns: 4
            },
            bodyPadding: 10,
            collapsed: true,
            title: "فیلتر ساختار",
            iconCls: "#ChartOrganisation",
          
            fieldDefaults: {
                labelAlign: "top"
            }
        }],
        layout: {
            type: "accordion",
            reserveScrollbar: true,
            multi: true
        },
        buttons: [{
          
            iconCls: "#Zoom",
            text: "جستجو",
            listeners: {
                click: {
                    fn: function (item, e) {
                        personnelSearch(this.up('form'), 1)
                    }
                }
            }
        }],
        title: "جستجو",
        iconCls: "#Find",
       
    })

    return this.form
}

function PersonnelSelectPanel(parent, title, bottombarActions, topbarActions) {


    me = this
    var rightGrid = new Ext.grid.Panel({

        style: "height:100%",
        autoScroll: true,
        region: "center",
        xtype: "grid",
        columnWidth: 0.48,
        store: {
            model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                extend: "Ext.data.Model",
                fields: [{
                    name: "ID",
                    type: "int"
                }, {
                    name: "Code"
                }, {
                    name: "FullName"
                }, {
                    name: "StatusTypeTitle"
                }, {
                        name: "JobStatusTitle"
                }, {
                        name: "NationalCode"
                }]
            }),

            proxy: {
                type: "page",
                reader: {
                    type: "json"
                }
            }
        },

        plugins: [{

            ptype: "filterheader"
        }],
        

        columns: {

            items: [{

                width: 35,
                xtype: "rownumberer",
                items: [{

                    hidden: true,
                    html: "&nbsp;",
                    xtype: "displayfield",

                }],
                align: "center",
                text: "ردیف"
            }, {

                width: 80,
                items: [{
                    plugins: [{
                        ptype: "clearbutton"
                    }],
                    xtype: "textfield",

                }],
                dataIndex: "Code",
                text: "کد پرسنلی"
                }, {

                    width: 100,
                    items: [{
                        plugins: [{
                            ptype: "clearbutton"
                        }],
                        xtype: "textfield",

                    }],
                    dataIndex: "NationalCode",
                    text: "کد ملی"
                }, {

                minWidth: 150,
                flex: 1,
                items: [{
                    plugins: [{
                        ptype: "clearbutton"
                    }],
                    xtype: "textfield",

                }],
                dataIndex: "FullName",
                sortable: true,
                text: "نام و نام خانوادگی"
            }, {

                flex: 1,
                items: [{
                    plugins: [{
                        ptype: "clearbutton"
                    }],
                    xtype: "textfield",

                }],
                dataIndex: "JobStatusTitle",
                sortable: true,
                text: "وضعیت شغلی",
                hidden: true
            }, {

                flex: 1,
                items: [{
                    plugins: [{
                        ptype: "clearbutton"
                    }],
                    xtype: "textfield",

                }],
                dataIndex: "StatusTypeTitle",
                sortable: true,
                text: "وضعیت اشتغال"
            }]
        },
        selModel: Ext.create("Ext.selection.CheckboxModel", {

            selType: "checkboxmodel"
        }),

    })
    var selectBtn = new Ext.panel.Panel({

        "bodyStyle": "margin-top:120px",
        cls: "height-full",
        frame: true,
        xtype: "panel",
        columnWidth: 0.04,
        items: [{

            xtype: "segmentedbutton",
            items: [{

                height: 35,
                width: 35,
                handler: function () {
                    addAllRowGrid(this.up('panel').prev(), this.up('panel').next())
                },
                iconCls: "#RewindGreen"
            }, {

                height: 35,
                width: 35,
                handler: function () {
                    addSelectRowGrid(this.up('panel').prev(), this.up('panel').next())
                },
                iconCls: "#ReverseGreen"
            }, {

                height: 35,
                width: 35,
                handler: function () {
                    addSelectRowGrid(this.up('panel').next(), this.up('panel').prev())
                },
                iconCls: "#PlayGreen"
            }, {

                height: 35,
                width: 35,
                handler: function () {
                    addAllRowGrid(this.up('panel').next(), this.up('panel').prev())
                },
                iconCls: "#ForwardGreen"
            }],
            vertical: true
        }],
        layout: "center"
    })
    var leftGrid = new Ext.grid.Panel({
        xtype: "grid",
        region: "center",
        columnWidth: 0.48,
        height: "100%",
        autoScroll: true,
        store: {
            model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                extend: "Ext.data.Model",
                fields: [{
                    name: "ID",
                    type: "int"
                }, {
                    name: "Code"
                }, {
                    name: "FullName"
                }, {
                    name: "StatusTypeTitle"
                }, {
                    name: "JobStatusTitle"
                }, {
                    name: "NationalCode"
                }]
            }),
            storeId: "ctl54",
            proxy: {
                type: "page",
                reader: {
                    type: "json"
                }
            }
        },

       
        plugins: [{

            ptype: "filterheader"
        }],
        
        //tbar: {

        //    xtype: "toolbar",
        //    items: topbarActions
        //},
        
        columns: {

            items: [{

                width: 35,
                xtype: "rownumberer",
                items: [{

                    hidden: true,
                    html: "&nbsp;",
                    xtype: "displayfield",

                }],
                align: "center",
                text: "ردیف"
            }, {

                width: 100,
                items: [{
                    plugins: [{
                        ptype: "clearbutton"
                    }],
                    xtype: "textfield",

                }],
                dataIndex: "Code",
                text: "کد پرسنلی"
                }, {

                    width: 100,
                    items: [{
                        plugins: [{
                            ptype: "clearbutton"
                        }],
                        xtype: "textfield",

                    }],
                    dataIndex: "NationalCode",
                    text: "کد ملی"
                }, {

                minWidth: 150,
                flex: 1,
                items: [{
                    plugins: [{
                        ptype: "clearbutton"
                    }],
                    xtype: "textfield",

                }],
                dataIndex: "FullName",
                sortable: true,
                text: "نام و نام خانوادگی"
            }, {

                flex: 1,
                items: [{
                    plugins: [{
                        ptype: "clearbutton"
                    }],
                    xtype: "textfield",

                }],
                dataIndex: "JobStatusTitle",
                sortable: true,
                hidden:true,
                text: "وضعیت شغلی"
            }, {

                flex: 1,
                items: [{
                    plugins: [{
                        ptype: "clearbutton"
                    }],
                    xtype: "textfield",

                }],
                dataIndex: "StatusTypeTitle",
                sortable: true,
                text: "وضعیت اشتغال"
            }]
        },
        selModel: Ext.create("Ext.selection.CheckboxModel", {

            selType: "checkboxmodel"
        })
    })
    var filterPanel = new PersonnelSearchFiltersPanel(null, rightGrid)

    var personnelPanel = new Ext.panel.Panel({
        rtl: true,
        frame: true,
        region: "north",
        heightSpec:"100%",
        layout: 'column',
        autoScroll: true,
        xtype: "panel",
        items: [rightGrid, selectBtn, leftGrid],
        tbar: isNullOrEmpty(topbarActions) ? null : {
           
            xtype: "toolbar",
            items: topbarActions
        }
    });

    var mainPanel = new Ext.panel.Panel({

        title: title,
        iconCls: "#GroupAdd",
        layout: 'border',
        autoScroll: true,
        xtype: "panel",
        renderTo: isNullOrEmpty(parent) ? null : parent.getEl(),
        items: [filterPanel, personnelPanel],
        bbar: isNullOrEmpty(bottombarActions) ? null : {
            rtl: false,
            xtype: "toolbar",
            items: bottombarActions
        },
        selectedPersonnels: function() {

            return getRowsGrid(leftGrid, 'ID')

        },
        selectedPersonnelGrid: leftGrid
    });


   


    return mainPanel
}

function OrganizationLevelModalWindow(parent, editMode, record) {

    var id = record !== null ? record.data.ID : 0
    me = this;
    this.form = new Ext.form.FormPanel({
        id: "FormPanelOrganizationLevel", rtl: true, xtype: "form", defaultAnchor: "100%",
        items: [{
            id: "txtUnitTitleOrgLevel", name: "Title", style: "padding-top:15px", tabIndex: 1, xtype: "textfield", fieldLabel: "عنوان", allowBlank: false, blankText: ".این فیلد باید پر باشد"
        }
            , {
            id: "txtUnitCodeOrgLevel", name: "Code", tabIndex: 2, xtype: "textfield", fieldLabel: "کد"
        },
        {
            id: "txtOrgLevelNo", tabIndex: 3, xtype: "numberfield", fieldLabel: "شماره سطح", allowBlank: false, blankText: ".شماره سطح وارد کنید", decimalSeparator: ".", minValue: "1"
        },
        {
            id: "fileUploadUnitIconOrgLevel", name: "Icon", xtype: "filefield", fieldLabel: "آیکون", emptyText: "انتخاب آیکون", iconCls: "#ImageAdd", buttonConfig: {
                iconCls: "#ImageAdd"
            }
            , buttonText: ""/*, listeners: {
                change: { fn: function () { getFileContent(this) } }
            }*/
        },

        {
            store: {
                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                    extend: "Ext.data.Model", fields: [{
                        name: "Title"
                    }
                        , {
                        name: "ID", type: "int"
                    }
                        , {
                        name: "Icon"
                    }
                    ]
                }
                ), autoLoad: false, proxy: {
                    type: "ajax", reader: {
                        type: "json"
                    }
                },
                listeners: {

                    load: {
                        fn: function (store, records, successful, operation, eOpts) {

                            if (record !== null && record.data.ParentID !== '' && record.data.ParentID !== null) {
                                var gridOrgLevelTopOf = me.form.getComponent('OrgLevelModalWindow_gridOrgLevelTopOf')
                                for (var i = 0; gridOrgLevelTopOf.store.data.items.length > i; i++) {
                                    var item = contains(record.data.ParentID.split(','), 'ID', gridOrgLevelTopOf.store.data.items[i].data.ID)
                                    if (item !== null) {
                                        gridOrgLevelTopOf.selModel.doMultiSelect(gridOrgLevelTopOf.store.data.items[i], true);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            , id: "OrgLevelModalWindow_gridOrgLevelTopOf", xtype: "grid", region: "center", title: "واحدهای بالادست", autoScroll: true,
            columns: {
                items: [{
                    hidden: true, width: 3, flex: 1, dataIndex: "ID", sortable: true
                }

                    , {
                    width: 3, flex: 1, dataIndex: "Title", text: "عنوان سطح"
                }, {
                    width: 60, renderer: organizationLevelIcon, text: "آیکون", align: 'center'
                }
                ]
            }
            , multiSelect: true, multiColumnSort: false, selModel: window.App.ctl09 = Ext.create("Ext.selection.CheckboxModel", {
                selType: "checkboxmodel", rowspan: 2
            }
            ), listeners: {
                afterrender: {
                    fn: function (item) {
                        getOrganizationLevel(this)
                    }
                }
            }
        }
        ], bodyPadding: 5, header: false, fieldDefaults: {
            labelWidth: 80, msgTarget: "side"
        }
    });
    this.window = new Ext.Window({
        id: "winOrgLevelDetails",
        height: 400,
        rtl: true,
        width: 400,
        resizable: true,
        items: this.form,
        layout: "fit",
        //maximizable: true,
        closeAction: "destroy",
        title: "تعریف سطح سازمانی واحدها",
        iconCls: "#BuildingEdit", autoScroll: true,
        // modal: true,
        renderTo: parent.getEl(),
        buttons: [{
            iconCls: "#Cancel", text: "انصراف", listeners: {
                click: {
                    fn: function (item, e) {
                        parent.getEl().unmask();
                        this.up('window').close();
                    }
                }
            }
        }
            , {
            iconCls: "#Disk", text: "ذخیره",
            handler: function (btn) {

                var win = btn.up('window')

                var form = win.down('form');
                var icon
                if (form.isValid()) {

                    //var file = getFileContent(form.getForm().getFields().items[2])
                    var parentID = '', parentTitle = ''
                    Ext.Array.forEach(form.getComponent('OrgLevelModalWindow_gridOrgLevelTopOf').getSelectionModel().getSelection(), function (item) { parentID += item.data.ID + ","; parentTitle += item.data.Title + "-" });
                    var file = form.getForm().getFields().items[3].getEl().down('input[type=file]').dom.files[0];
                    if (file !== undefined && file.type.indexOf('image') == -1) {
                        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'فرمت آیکون باید تصویر باشد', iconCls: '#Exclamation' });
                        return
                    }
                    if (file !== undefined && file.size > 1024) {
                        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'حجم آیکون نمیتواند از 1 کیلوبایت بیشتر باشد', iconCls: '#Exclamation' });
                        return
                    }
                    var mask = showMask(win, 'در حال ذخیره...', true)
                    // create reader
                    var reader = new FileReader();
                    // create handler
                    reader.onload = (function (theFile) {
                        return function (e) {
                            // process file
                            icon = btoa(e.target.result);
                            //icon = e.target.result;
                            var param = {
                                ID: id, CompanyID: companyID,
                                Title: form.getForm().getFields().items[0].getValue(),
                                Code: form.getForm().getFields().items[1].getValue(),
                                LevelNo: form.getForm().getFields().items[2].getValue(),
                                ParentID: parseInt(parentID.substr(0, parentID.lastIndexOf(','))),
                                ParentTitle: parentTitle.substr(0, parentTitle.lastIndexOf('-')),
                                Icon: icon
                            }

                            if (editMode == 'Edit')
                                execSPUpdate('e1Tc7qcDX1fNaHueQ9qqg/SgOcmG8R9v1V69YlMo8dE='/*SPC_OrganizationLevelUpdate*/, null, param, mask, false, true, false, function () { mask.unmask(); win.close(); getOrganizationLevel(null); })
                            else
                                execSPInsert('e1Tc7qcDX1fNaHueQ9qqg/SgOcmG8R9v1V69YlMo8dE='/*SPC_OrganizationLevelUpdate*/, false, false, null, param, mask, false, function () { mask.unmask(); win.close(); getOrganizationLevel(null); })

                            //App.direct.SaveOrganizationLevel(companyID, Ext.JSON.encode(), editMode, { success: function () { mask.unmask(); win.close(); getOrganizationLevel(null); } })
                        };
                    })(file);
                    // start upload
                    if (file !== undefined)
                        reader.readAsBinaryString(file);
                    else {

                        var param = {
                            ID: id, CompanyID: companyID,
                            Title: form.getForm().getFields().items[0].getValue(),
                            Code: form.getForm().getFields().items[1].getValue(),
                            LevelNo: form.getForm().getFields().items[2].getValue(),
                            ParentID: parseInt(parentID.substr(0, parentID.lastIndexOf(','))),
                            ParentTitle: parentTitle.substr(0, parentTitle.lastIndexOf('-'))
                            //Icon: icon
                        }
                        if (editMode == 'Edit')
                            execSPUpdate('e1Tc7qcDX1fNaHueQ9qqg/SgOcmG8R9v1V69YlMo8dE='/*SPC_OrganizationLevelUpdate*/, null, param, mask, false, true, false, function () { mask.unmask(); win.close(); getOrganizationLevel(null); })
                        else
                            execSPInsert('e1Tc7qcDX1fNaHueQ9qqg/SgOcmG8R9v1V69YlMo8dE='/*SPC_OrganizationLevelUpdate*/, false, false, null, param, mask, false, function () { mask.unmask(); win.close(); getOrganizationLevel(null); })

                    }
                }

            }

        }
        ],
        listeners: {
            close: {
                fn: function () {
                    parent.getEl().unmask();
                }
            }
        }
    });

    this.show = function () {
        parent.getEl().mask();
        if (editMode == "Edit") {
            //this.form.updateRecord(record);
            this.window.setTitle(" ویرایش سطح سازمانی " + record.data.Title);
            //this.window.setIconCls("#BuildingEdit")
            this.form.getForm().getFields().items[0].setValue(record.data.Title)
            this.form.getForm().getFields().items[1].setValue(record.data.Code)
            this.form.getForm().getFields().items[2].setValue(record.data.LevelNo)
            this.window.setIcon("data:image/jpeg;base64," + record.data.Icon)


        }
        else {
            this.window.setTitle("تعریف سطح سازمانی جدید");
            this.window.setIconCls("#BuildingAdd")
        }
        this.window.show();
    }


}

//--------------------------------------------------------------------------------------------------------------------------
function CitiesModalWindow(parent, textField) {
    me = this;
    selectRecord = null;
    /*var storeCities = Ext.create('Ext.data.Store', {
        model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
            extend: "Ext.data.Model", fields: [{
                name: "CityName"
            }
            , {
                name: "CityCode"
            }
            , {
                name: "CityID", type: "int"
            }
            , {
                name: "ProvinceID"
            }
            , {
                name: "ProvinceName"
            }
            , {
                name: "CityCenter"
            }
            ]
        }
        ), autoLoad: false, pageSize: 10, id: 'gridCities_store', proxy: {
            type: "ajax", reader: {
                type: "json"
            }
        }
    });*/
    this.window = new Ext.window.Window({
        id: "winProvinceCity",
        height: 450,
        rtl: true,
        renderTo: parent.getEl(),
        width: 600,
        resizable: false,
        closeAction: "destroy",
        title: "انتخاب شهر",
        iconCls: "#FlagIr",
        layout: "fit",

        items: [{
            id: "TabPanelProvinceCity", height: 300, width: 600, xtype: "tabpanel",
            items: [{
                id: "TabPanelProvinceCity_TabCities", rtl: true, xtype: "form", defaultAnchor: "100%", layout: "fit", items: [{
                    store: {
                        model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                            extend: "Ext.data.Model", fields: [{
                                name: "CityName"
                            }
                                , {
                                name: "CityCode", type: "int"
                            }
                                , {
                                name: "CityID", type: "int"
                            }
                                , {
                                name: "ProvinceID"
                            }
                                , {
                                name: "ProvinceName"
                            }
                                , {
                                name: "CityCenter"
                            }
                            ]
                        }
                        ), autoLoad: false, pageSize: 10, id: 'gridCities_store', isPagingStore: true, proxy: {
                            type: "ajax", enablePaging: true, reader: {
                                type: "json"
                            }
                        }
                    }
                    , id: "TabCities_gridCities", autoScroll: true, plugins: [{
                        ptype: "filterheader"
                    }
                    ], xtype: "grid", region: "center", bbar: {
                        xtype: "pagingtoolbar", displayInfo: true, emptyMsg: "شهری با این مشخصات یافت نشد",
                        storeId: "gridCities_store"//this.up('grid').store
                        , afterPageText: "صفحه بعد", beforePageText: "صفحه قبل", firstText: "صفحه اول", lastText: "صفحه آخر", nextText: "بعدی", prevText: "قبلی", hideRefresh: true
                    }
                    , columns: {
                        items: [{
                            hidden: true, width: 3, items: [{
                                plugins: [{
                                    ptype: "clearbutton"
                                }
                                ], xtype: "textfield"
                            }
                            ], dataIndex: "CityID", sortable: true
                        }
                            , {
                            hidden: true, width: 3, items: [{
                                plugins: [{
                                    ptype: "clearbutton"
                                }
                                ], xtype: "textfield"
                            }
                            ], dataIndex: "ProvinceID", sortable: true
                        }
                            , {
                            width: 35, xtype: "rownumberer", items: [{
                                hidden: true, html: "&nbsp;", xtype: "displayfield"
                            }
                            ], align: "center", text: "ردیف"
                        }
                            , {
                            flex: 1, items: [{
                                plugins: [{
                                    ptype: "clearbutton"
                                }
                                ], xtype: "textfield"
                            }
                            ], dataIndex: "CityName", text: "نام شهر"
                        }
                            , {
                            flex: 1, items: [{
                                width: 260, xtype: "netmulticombo",
                                emptyText: "فیلتر استان", displayField: "ProvinceName",
                                queryMode: "local", valueField: "ID", store: {
                                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                        extend: "Ext.data.Model", fields: [{
                                            name: "ProvinceName"
                                        }
                                            , {
                                            name: "ID", type: "int"
                                        }
                                        ]
                                    }
                                    ), autoLoad: false, proxy: {
                                        type: 'memory'
                                    }
                                }
                                , listeners: {
                                    afterrender: {
                                        fn: function (item) {
                                            getProvinces(this)
                                        }
                                    }
                                }
                            }
                            ], dataIndex: "ProvinceName", text: "نام استان"
                        }
                            , {
                            flex: 1, items: [{
                                plugins: [{
                                    ptype: "clearbutton"
                                }
                                ], xtype: "textfield"
                            }
                            ], dataIndex: "CityCenter", sortable: true, text: "مرکز شهر"
                        }
                            , {
                            width: 50, items: [{
                                plugins: [{
                                    ptype: "clearbutton"
                                }
                                ], xtype: "textfield"
                            }
                            ], dataIndex: "CityCode", sortable: true, text: "کد شهر"
                        }
                        ]
                    }
                    , multiColumnSort: false,
                    listeners: {
                        afterrender: {
                            fn: function (item) {
                                getCities(this)
                            }
                        },

                        rowdblclick: {
                            fn: function (table, record, tr, rowIndex, e, eOpts) {
                                textField.setValue(record.data.CityName);
                                textField.tag = record.data.CityID
                                me.window.close();
                            }

                        },
                        rowclick: {
                            fn: function (table, record, tr, rowIndex, e, eOpts) {
                                selectRecord = record;
                            }

                        }
                    }
                }], header: false, title: "شهرها",
            }
            ], layout: "fit", bodyPadding: 1, activeTab: 0
        }
        ], layout: "fit", buttons: [{
            iconCls: "#Cancel", text: "انصراف", listeners: {
                click: {
                    fn: function (item, e) {
                        parent.getEl().unmask();
                        this.up('window').close();
                    }
                }
            }
        }
            , {
            iconCls: "#Accept", text: "انتخاب", listeners: {
                click: {
                    fn: function (item, e) {
                        if (selectRecord != null) {
                            //selectCity(selectRecord);
                            textField.setValue(selectRecord.data.CityName);
                            textField.tag = selectRecord.data.CityID
                            this.up('window').close()
                        }
                        else {
                            Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ شهری انتخاب نشده است', iconCls: '#Exclamation' });
                        }

                    }
                }
            }
        }
        ],
        listeners: {
            close: {
                fn: function () {
                    parent.getEl().unmask();
                }
            }
        }
    }

    );

    this.show = function () {

        parent.getEl().mask();
        this.window.show();
    }

}


function ConstantModalWindow(parent, windowTitle, gridTitle, btnAddTitle, tableName, columnName, isDefault) {

    me = this;
    this.grid = new Ext.grid.Panel({
        store: {
            model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                extend: "Ext.data.Model", fields: [{
                    name: "DisplayLabel"
                }
                    , {
                    name: "Value", type: "int"
                }
                    , {
                    name: "ID", type: "int"
                }
                    , {
                    name: "CompanyID", type: "int"
                }, {
                    name: "Order", type: "int"
                }
                ]
            }
            ), autoLoad: false, proxy: {
                type: "ajax", reader: {
                    type: "json"
                }
            }
        }
        , //id: "system_gridConstants_" +  Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : ,
        title: gridTitle,
        plugins: [{
            ptype: "rowediting", autoCancel: false, saveBtnText: "ذخیره", cancelBtnText: "انصراف", clicksToEdit: 1, listeners: {
                edit: {
                    fn: function (item, e) {
                        editConstant('Save', this, me.grid, tableName, columnName, isDefault)
                    }
                }
            }
        }
            /*, {
                ptype: "filterheader"
            }*/
        ], xtype: "grid", region: "center", rtl: true, tbar: {
            xtype: "toolbar", items: [{
                iconCls: "#Add", text: btnAddTitle, listeners: {
                    click: {
                        fn: function (item, e) {
                            addConstant(this.up().up())
                        }
                    }
                }
            }
            ]
        }
        , columns: {
            items: [/* {
                    hidden: true, width: 3, items: [{
                        plugins: [{
                            ptype: "clearbutton"
                        }
                        ], xtype: "textfield"
                    }
                    ], dataIndex: "ID"
                }
               , {
                    hidden: true, width: 3, items: [{
                        plugins: [{
                            ptype: "clearbutton"
                        }
                        ], xtype: "textfield"
                    }
                    ], dataIndex: "CompanyID"
                }
                , */{
                    width: 35, xtype: "rownumberer"/*, items: [{
                        hidden: true, html: "&nbsp;", xtype: "displayfield"
                    }
                    ]*/, align: "center", text: "ردیف"
                }
                , {
                    flex: 1/*, items: [{
                         xtype: "textfield"
                    }
                    ]*/, dataIndex: "DisplayLabel", editor: {
                        xtype: "textfield", allowBlank: false, blankText: "فیلد باید پر باشد", validateOnChange: false
                    }
                    , sortable: true, text: "عنوان"
                }
                , {
                    flex: 1/*, items: [{
                       xtype: "textfield"
                    }
                    ]*/, dataIndex: "Value", editor: {
                        xtype: "numberfield", allowBlank: false, blankText: "فیلد باید پر باشد"
                    }
                    , sortable: true, text: "کد"
                }, {
                    flex: 1/*, items: [{
                        xtype: "textfield"
                    }
                    ]*/, dataIndex: "Order", editor: {
                        xtype: "numberfield", allowBlank: false, blankText: "فیلد باید پر باشد", maxValue: 254
                    }
                    , sortable: true, text: "اولویت"
                }
                , {
                    width: 60, xtype: "commandcolumn", items: [{
                        hidden: true, html: "&nbsp;", xtype: "displayfield"
                    }
                    ], commands: [{
                        xtype: "button", command: "Delete", tooltip: {
                            text: "حذف"
                        }
                        , iconCls: "#Delete"
                    }
                        , {
                        xtype: "tbseparator"
                    }
                        , {
                        xtype: "button", command: "Edit", tooltip: {
                            text: "ویرایش"
                        }
                        , iconCls: "#NoteEdit"
                    }
                    ],
                    //prepareToolbar: rowDataBound_GridConstant,
                    listeners: {
                        command: {
                            fn: function (item, command, record, recordIndex, cellIndex) {
                                editConstant(command, record, this.up().up(), tableName, columnName, isDefault)
                            }
                        }
                    }
                }
            ]
        }
        , multiColumnSort: false,
        listeners: {
            afterrender: {
                fn: function (item) {
                    gridConstantDataBind(this, tableName, columnName, isDefault)
                }
            },
            rowclick: {
                fn: function (item) {
                    this.editingPlugin.cancelEdit();
                }
            }
        }
    });
    //this.window = new Ext.window.Window( {
    //    id: "winConstants",
    //    height: 300,
    //    rtl: true,
    //    renderTo: parent !== null ? parent.getEl() : null,
    //    width: 500,
    //    resizable: false, 
    //    title: windowTitle,
    //    items: [me.grid],
    //    layout: "fit",
    //    closeAction: "destroy",
    //    iconCls: "#TableRow",
    //    modal: true,
    //    listeners: {
    //        close: {
    //            fn: function () {
    //                parent.getEl().unmask();
    //            }
    //        }
    //    }
    //})

    //this.show = function () {

    //    parent.getEl().mask();
    //    this.window.show();
    //}
    this.getGrid = function () {

        return this.grid;
    }
}


function JobsModalWindow(parent, editMode, jobID) {

    me = this;
    selectRecord = null;
    this.jobID = jobID;
    this.form = new Ext.form.FormPanel({
        frame: true,
        width: 250,
        xtype: "form",
        keyMap: {
            binding: {
                handler: function () {
                    saveJob(this.up().up())
                }
                , key: [13]
            }
        }
        , region: "west", split: true, autoScroll: true, items: [{
            id: "Jobs_txtJobTitle", xtype: "textfield", colspan: 2, fieldLabel: "عنوان شغل", allowBlank: false,
            blankText: "این فیلد باید پر باشد"
        },
            ,
        {
            id: "Jobs_txtJobCode",
            xtype: "textfield",
            fieldLabel: "کد شغل",
            allowBlank: false,
            blankText: "این فیلد باید پر باشد",
            maskRe: /[0-9-]/
        },

        {
            id: "Jobs_cmbJobLevel",
            xtype: "combobox",
            fieldLabel: "رده شغل",
            editable: false,
            listeners: {
                afterrender: {
                    fn: function (item) {
                        comboBoxConstantBinder(this, 'Company_Job', 'JobLevel', 1, 'ID')
                    }
                }
            }
        },

        {
            id: "Jobs_cmbJobCategory",
            xtype: "combobox",
            fieldLabel: "رسته",
            allowBlank: false,
            blankText: "این فیلد باید پر باشد",
            editable: false,
            listeners: {
                afterrender: {
                    fn: function (item) {
                        comboBoxCategoryBinder(this)
                    }
                }
                , select: {
                    fn: function (item, records) {
                        comboBoxFieldBinder(this.next(), this)
                    }
                }
            }
        }
            ,
        {
            id: "Jobs_cmbJobField",
            xtype: "combobox",
            fieldLabel: "رشته",
            allowBlank: false,
            blankText: "این فیلد باید پر باشد",
            editable: false,

        }
            , {
            id: "Jobs_txtJobDesc", height: 150, xtype: "textareafield", colspan: 2, fieldLabel: "تعریف شغل(خلاصه شغل) "
        }
        ], layout: {
            type: "table", itemCls: "width-full", columns: 2
        }
        , buttons: [{
            tabIndex: 13
            , iconCls: "#Cancel", text: "بستن", handler: function () {
                this.up().up().up().close()
            }
        }, {
            tabIndex: 12,
            handler: function () {
                if (editMode == 'Add') {
                    saveEditJob(editMode, me, me.jobID)
                }
                else {
                    saveEditJob(editMode, me, me.jobID)
                }

            }
            , iconCls: "#Disk",
            text: "ذخیره"
        }
        ], title: "مشخصات شغل", iconCls: "#Note", fieldDefaults: {
            labelAlign: "top", msgTarget: "side"
        }
    }),

        this.window = new Ext.window.Window({
            height: 480,
            rtl: true,
            width: 900,
            renderTo: parent.getEl(),
            items: [me.form
                , {
                store: {
                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                        extend: "Ext.data.Model", fields: [{
                            name: "ID", type: "int"
                        }
                            , {
                            name: "Title"
                        }
                            , {
                            name: "Code", type: "int"
                        }
                            , {
                            name: "JobCategoryTitle"
                        }
                            , {
                            name: "JobGroupTitle"
                        }
                            , {
                            name: "JobLevelTitle"
                        }
                            , {
                            name: "MinExperience"
                        }
                            , {
                            name: "EducationGradeTitle"
                        }
                            , {
                            name: "MinTrainingHours"
                        }
                        ]
                    }
                    ), autoLoad: false, proxy: {
                        type: "ajax", reader: {
                            type: "json"
                        }
                    }
                }
                , xtype: "grid", region: "center",
                tbar: {
                    xtype: "toolbar", items: [{
                        id: "btnAddJobItem", iconCls: "#Add", text: "افزودن طبقات شغل", listeners: {
                            click: {
                                fn: function (item, e) {
                                    //editJobItem('Add', null)
                                    if (editMode == 'Add' && (me.jobID == 0 || me.jobID == undefined || me.jobID == null))
                                        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'لطفا اول شغل مورد نظر را ذخیره کنید', iconCls: '#Exclamation' });
                                    else
                                        showJobItemsWindow(this.up().up().up(), 'Add', me.jobID, this.up().up().up().items.items[0].getComponent('Jobs_txtJobTitle').value, this.up().up())
                                }
                            }
                        }
                    }, {
                        text: 'خروجی اکسل',
                        iconCls: "#PageExcel",
                        handler: function () {
                            this.up().up().doExcelExport({
                                apiKey: 'demogroupedextjsgrid',
                                startCell: 'A1',
                                destinationfile: 'extjsgrid.xlsx'
                            });
                        }
                    }]
                }
                , title: "شرايط و طبقات شغل", columns: {
                    items: [{
                        hidden: true, width: 3, dataIndex: "ID", sortable: true
                    }
                        , {
                        width: 35, xtype: "rownumberer", align: "center", text: "ردیف"
                    }
                        , {
                        width: 100, dataIndex: "Title", text: "عنوان", cellWrap: true
                    }
                        , {
                        flex: 1, dataIndex: "Code", sortable: true, text: "کد"
                    }
                        , {
                        flex: 1, dataIndex: "JobLevelTitle", sortable: true, text: "رده شغل"
                    }
                        , {
                        flex: 1, dataIndex: "JobCategoryTitle", sortable: true, text: "طبقه شغل"
                    }
                        , {
                        flex: 1, dataIndex: "JobGroupTitle", sortable: true, text: "گروه شغل"
                    }
                        , {
                        flex: 1, dataIndex: "MinExperience", sortable: true, text: "حداقل سابقه"
                    }
                        , {
                        flex: 1, dataIndex: "EducationGradeTitle", sortable: true, text: "حداقل مدرک"
                    }
                        , {
                        flex: 1, dataIndex: "MinTrainingHours", sortable: true, text: "حداقل ساعات آموزشی", tooltip: "حداقل ساعات آموزشی"
                    }
                        , {
                        width: 60, xtype: "commandcolumn", commands: [{
                            xtype: "button", command: "Delete", tooltip: {
                                text: "حذف"
                            }
                            , iconCls: "#Delete"
                        }
                            , {
                            xtype: "tbseparator"
                        }
                            , {
                            xtype: "button", command: "Edit", tooltip: {
                                text: "ویرایش"
                            }
                            , iconCls: "#NoteEdit"
                        }
                        ], listeners: {
                            command: {
                                fn: function (item, command, record, recordIndex, cellIndex) {
                                    editJobItem(command, record, me.window, this.up().up(), me.jobID)
                                }
                            }
                        }
                    }
                    ]
                }
                , multiColumnSort: false, listeners: {
                    afterrender: {
                        fn: function (item) {
                            getJobItems(this, me.jobID)
                        }
                    }
                }
            }
            ],
            layout: "border",
            bodyPadding: 5,
            closeAction: "destroy",
            title: "مشاغل سازمانی",
            iconCls: "#Briefcase",
            maximizable: true,
            listeners: {
                close: {
                    fn: function () {
                        parent.getEl().unmask();
                        getJobs(null);
                    }
                }
            }
        });

    this.show = function () {
        //var mask = showMask(me.form, 'درحال بارگذاری...', false);
        if (editMode == 'Edit') {
            execSPSelect('ZaaIFkWsTHnvHyiZavFzBw=='/*SPC_GetJobInfo*/, { CompanyID: companyID, ID: jobID }, null, {}, null, function (job) {
                job = job[0]
                me.form.getComponent('Jobs_txtJobTitle').setValue(job.Title)
                me.form.getComponent('Jobs_txtJobCode').setValue(job.Code)
                me.form.getComponent('Jobs_cmbJobCategory').setValue(me.form.getComponent('Jobs_cmbJobCategory').findRecord('ID', job.CategoryID))
                me.form.getComponent('Jobs_cmbJobLevel').setValue(me.form.getComponent('Jobs_cmbJobLevel').findRecord('ID', job.LevelID))
                comboBoxFieldBinder(me.form.getComponent('Jobs_cmbJobField'), me.form.getComponent('Jobs_cmbJobCategory'))
                me.form.getComponent('Jobs_cmbJobField').setValue(me.form.getComponent('Jobs_cmbJobField').findRecord('ID', job.FieldID))
                me.form.getComponent('Jobs_txtJobDesc').setValue(job.Desc)
            })

        }
        parent.getEl().mask();
        this.window.show();
    }
}


function JobItemsModalWindow(parent, editMode) {

    me = this;
    this.jobTitle = '';
    this.jobItemID = 0;
    this.jobID = 0;
    this.jobItemsGrid = null;
    this.form = new Ext.form.FormPanel({
        frame: true,
        xtype: "form",
        keyMap: {
            binding: {
                handler: function () {
                    saveEditJobItem(editMode, this.up().up(), me.jobItemID, me.jobID)
                }
                , key: [13]
            }
        }
        , autoScroll: true,
        items: [/*{
            id: "JobsItem_txtJobTitle", xtype: "textfield", colspan: 2, fieldLabel: "عنوان شغل", fieldStyle: "text-align:center;font-weight:bold !important", readOnly: true
        },*/
            {
                id: "JobsItem_txtJobItemTitle", xtype: "textfield", fieldLabel: "عنوان طبقه شغل", allowBlank: false, blankText: "این فیلد باید پر باشد"
            }
            , {
                id: "JobsItem_txtJobItemCode", xtype: "textfield", fieldLabel: "کد شغل", allowBlank: false, blankText: "این فیلد باید پر باشد", maskRe: /[0-9-]/
            }
            , {
                id: "JobsItem_cmbJobItemLevel", xtype: "combobox", fieldLabel: "رده شغل", editable: false,
                listeners: {
                    afterrender: {
                        fn: function (item) {
                            comboBoxConstantBinder(this, 'Company_Job', 'JobLevel', 1, 'ID')
                        }
                    }
                }
            }
            , {
                id: "JobsItem_cmbJobItemCategory", xtype: "combobox", fieldLabel: "طبقه شغل", allowBlank: false, blankText: "این فیلد باید پر باشد", editable: false,
                listeners: {
                    afterrender: {
                        fn: function (item) {
                            comboBoxConstantBinder(this, 'Company_Job', 'JobCategory', 1, 'ID')
                        }
                    }
                }
            }
            , {
                id: "JobsItem_cmbJobItemGroup", xtype: "combobox", fieldLabel: "گروه شغل", allowBlank: false, blankText: "این فیلد باید پر باشد", editable: false,
                listeners: {
                    afterrender: {
                        fn: function (item) {

                            comboBoxConstantBinder(this, 'Company_Job', 'JobGroup', 1, 'ID')
                        }
                    }
                }
            }
            , {
                id: "JobsItem_cmbMinEducation", xtype: "combobox", fieldLabel: "حداقل مدرك", allowBlank: false, blankText: "این فیلد باید پر باشد", editable: false,
                //store: [["1", "صفی"], ["2", "ستادی"], ["2", "ستادی"], ["2", "ستادی"], ["2", "ستادی"], ["2", "ستادی"], ["2", "ستادی"]]
                listeners: {
                    afterrender: {
                        fn: function (item) {
                            comboBoxConstantBinder(this, 'EducationGrade', 'GradeType', 1, 'Value')
                        }
                    }
                }
            }
            , {
                id: "JobsItem_txtMinTrainingHours", xtype: "textfield", fieldLabel: "حداقل ساعات آموزشي", maskRe: /[0-9-]/
            }
            , {
                id: "JobsItem_txtMinExperience", xtype: "textfield", fieldLabel: "حداقل سابقه", maskRe: /[0-9-]/
            }
            , {
                id: "JobsItem_txtQualifyingConditions", height: 100, xtype: "textareafield", colspan: 2, fieldLabel: "شرايط احراز"
            }
        ], layout: {
            type: "table", itemCls: "width-full", columns: 2
        }
        , buttons: [{
            tabIndex: 13
            , iconCls: "#Cancel", text: "بستن",
            handler: function () {
                getJobItems(me.jobItemsGrid, me.jobID)
                this.up().up().up().close()
            }
        }, {
            tabIndex: 12, handler: function () {
                saveEditJobItem(editMode, this.up().up(), me.jobItemID, me.jobID)
            }
            , iconCls: "#Disk", text: "ذخیره"
        }
        ],
        fieldDefaults: {
            labelAlign: "top", msgTarget: "side"
        }
    }),

        this.window = new Ext.window.Window({
            height: 450,
            rtl: true,
            renderTo: parent.getEl(),
            width: 400,
            resizable: false,
            items: [me.form],
            layout: "fit",
            bodyPadding: 5,
            closeAction: "destroy",
            title: "شرايط و طبقات شغل",
            iconCls: "#Briefcase",
            maximizable: false,
            tbar: {
                xtype: "toolbar",
                items: [{
                    disabled: editMode == 'Add' ? false : true,
                    iconCls: "#Add",
                    text: "جدید",
                    listeners: {
                        click: {
                            fn: function (item, e) {
                                //this.up().up().items.items[0].getForm().reset();
                                me.form.reset();
                            }
                        }
                    }
                }
                ]
            },
            listeners: {
                close: {
                    fn: function () {
                        if (parent.getEl())
                            parent.getEl().unmask();

                    }
                }
            }
        });

    this.show = function () {

        me.window.setTitle(me.window.title + ' (' + me.jobTitle + ')');
        if (editMode == 'Edit') {
            setTimeout(function () {
                execSPSelect('ZaaIFkWsTHmhxYNnF3k+Iw=='/*SPC_GetJobItem*/, { CompanyID: companyID, ID: me.jobItemID }, null, {}, null, function (result) {
                    var jobItem = result[0]
                    var frm = me.window.items.items[0];

                    frm.getComponent('JobsItem_txtJobItemTitle').setValue(jobItem.Title)
                    frm.getComponent('JobsItem_txtJobItemCode').setValue(jobItem.Code)
                    //frm.getComponent('JobsItem_cmbJobItemLevel').setValue(frm.getComponent('JobsItem_cmbJobItemLevel').findRecord('ID', jobItem.JobLevelID))
                    //frm.getComponent('JobsItem_cmbJobItemCategory').setValue(frm.getComponent('JobsItem_cmbJobItemCategory').findRecord('ID', jobItem.JobCategoryID))
                    //frm.getComponent('JobsItem_cmbJobItemGroup').setValue(frm.getComponent('JobsItem_cmbJobItemGroup').findRecord('ID', jobItem.JobGroupID))
                    frm.getComponent('JobsItem_cmbJobItemLevel').setValue(jobItem.JobLevelID)
                    frm.getComponent('JobsItem_cmbJobItemCategory').setValue(jobItem.JobCategoryID)
                    frm.getComponent('JobsItem_cmbJobItemGroup').setValue(jobItem.JobGroupID)
                    //frm.getComponent('JobsItem_cmbMinEducation').setValue(frm.getComponent('JobsItem_cmbMinEducation').findRecord('Value', jobItem.EducationGradeID))
                    frm.getComponent('JobsItem_cmbMinEducation').setValue(jobItem.EducationGradeID)
                    frm.getComponent('JobsItem_txtMinExperience').setValue(jobItem.MinExperience)
                    frm.getComponent('JobsItem_txtMinTrainingHours').setValue(jobItem.MinTrainingHours)
                    frm.getComponent('JobsItem_txtQualifyingConditions').setValue(jobItem.QualifyingConditions)


                })

            }, 300)
        }
        if (parent.getEl())
            parent.getEl().mask();

        this.window.show();
    }

}


function PostTitleModalWindow(parent, editMode) {

    me = this;
    this.jobItemID = 0;
    this.postTitleID = 0;

    this.form = new Ext.form.FormPanel({
        frame: true,
        autoScroll: true,
        items: [{
            id: "PostTitle_txtPostTitle", xtype: "textfield", colspan: 2, fieldLabel: "عنوان پست", allowBlank: false, blankText: "این فیلد باید پر باشد"
        }
            , {
            id: "PostTitle_txtJobItemCode", xtype: "textfield", fieldLabel: "کد پست", allowBlank: false, blankText: "این فیلد باید پر باشد", maskRe: /[0-9-]/
        }
            , {
            id: "PostTitle_cmbActivityType", xtype: "combobox", fieldLabel: "نوع فعالیت", editable: false, queryMode: "local", store: [["1", "صفی"], ["2", "ستادی"]]
        }
            , {
            id: "PostTitle_cmbJobs", xtype: "combobox", fieldLabel: "شغل", emptyText: "جستجو شغل", allowBlank: false, blankText: "این فیلد باید پر باشد",
            listeners: {
                afterrender: {
                    fn: function (item) {
                        comboBoxJobsBinder(this)
                    }
                }
            }
        }
            , {
            id: "PostTitle_cmbPostOrgLevel", xtype: "combobox", fieldLabel: "سطح سازمانی پست", allowBlank: false, blankText: "این فیلد باید پر باشد", editable: false,
            listeners: {
                afterrender: {
                    fn: function (item) {
                        comboBoxConstantBinder(this, 'Company_PostTitle', 'PostOrgLevel', 0, 'ID')
                    }
                }
            }
        }
            , {
            id: "PostTitle_txtDesc", height: 100, xtype: "textareafield", colspan: 2, fieldLabel: "تعریف پست(خلاصه پست)"
        }
            , {
            id: "PostTitle_txtQualifyingConditions", height: 100, xtype: "textareafield", colspan: 2, fieldLabel: "شرايط احراز"
        }
        ], layout: {
            type: "table", itemCls: "width-full", columns: 2
        }
        , buttons: [{
            iconCls: "#Cancel", text: "انصراف", listeners: {
                click: {
                    fn: function (item, e) {
                        this.up('window').close();
                    }
                }
            }
        }
            , {
            iconCls: "#Disk", text: "ذخیره", listeners: {
                click: {
                    fn: function (item, e) {
                        saveEditPostTitle(editMode, this.up().up(), me.postTitleID)
                    }
                }
            }
        }
        ], fieldDefaults: {
            labelAlign: "top", msgTarget: "side"
        },
        keyMap: {
            binding: {
                handler: function () {
                    saveEditPostTitle(editMode, this.up().up(), me.postTitleID)
                }
                , key: [13]
            }
        }

    });

    this.window = new Ext.window.Window({
        height: 500,
        rtl: true,
        renderTo: parent.getEl(),
        width: 450,
        resizable: false,
        items: [me.form],
        layout: "fit",
        bodyPadding: 5,
        closeAction: "destroy",
        title: "عناوین پستی",
        iconCls: "#UserKey",
        maximizable: false,
        tbar: {
            xtype: "toolbar",
            disabled: editMode == 'Add' ? false : true,
            items: [{

                iconCls: "#Add",
                text: "جدید",
                listeners: {
                    click: {
                        fn: function (item, e) {
                            //this.up().up().items.items[0].getForm().reset();
                            me.form.reset();
                        }
                    }
                }
            }
            ]
        },
        listeners: {
            close: {
                fn: function () {
                    //if (parent.getEl())
                    getPostTitles(null);
                    parent.getEl().unmask();

                }
            }
        }
    });

    this.show = function () {


        if (editMode == 'Edit') {
            setTimeout(function () {

                execSPSelect('AGEy4yfoMC5/mPV1SLNLAgPg65iPHUk9'/*SPC_GetPostTitle*/, { CompanyID: companyID, ID: me.postTitleID }, null, {}, null, function (info) {

                    me.form.getComponent('PostTitle_txtPostTitle').setValue(info[0].Title),
                        me.form.getComponent('PostTitle_txtJobItemCode').setValue(info[0].Code),
                        me.form.getComponent('PostTitle_cmbActivityType').setValue(info[0].ActivityType),
                        me.form.getComponent('PostTitle_cmbJobs').setValue(info[0].JobID),
                        me.form.getComponent('PostTitle_cmbPostOrgLevel').setValue(info[0].PostOrgLevelID),
                        me.form.getComponent('PostTitle_txtDesc').setValue(info[0].Desc),
                        me.form.getComponent('PostTitle_txtQualifyingConditions').setValue(info[0].QualifyingConditions)
                })
            }
                , 300)
        }
        //if (parent.getEl())
        parent.getEl().mask();

        this.window.show();
    }
}

function PersonnelPostModalWindow(parent, editMode, id) {

    me = this;


    this.form = new Ext.form.FormPanel({
        frame: true,
        xtype: "form",
        keyMap: {
            binding: {
                handler: function () {
                    savePersonnelPost(this.up().up().down('form'), editMode, id)
                },
                key: [13]
            }
        },

        autoScroll: true,
        items: [{
            id: "cmbPersonnelPostSearch",
            "hideSelected": true,
            style: "margin-top:5px",
            xtype: "combobox",
            colspan: 2,
            fieldLabel: "نام و نام خانوادگی",
            emptyText: "جستجو پرسنل",
            enableKeyEvents: true,
            queryMode: "local",
            valueField: "value",
            queryDelay: 1500,

            store: {
                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                    extend: "Ext.data.Model",
                    fields: [{
                        name: "text"
                    }, {
                        name: "value",
                        type: "int"
                    }]
                }),

                autoLoad: true,
                proxy: {
                    type: 'memory'
                },
                listeners: {
                    add: {
                        fn: isExistsUser
                    }
                }
            },
            listeners: {
                focus: {
                    fn: function (item) {
                        setCurrentSelectUser(this)
                    }
                },
                //keypress: {
                //    fn: setKeyUp
                //},
                beforeQuery: {
                    fn: userSearch
                }
            }
        }, {
            id: "txtTenureStartDate",
            inputMask: "9999/99/99",
            xtype: "textfield",
            fieldLabel: "تاریخ شروع تصدی",
            fieldStyle: "text-align:center",
            vtype: "isValidDate",
            vtypeText: "تاریخ نامعتبر است",
            iconCls: "#Date",
            triggers: {
                "_trigger1": {
                    tag: "_trigger1",
                    cls: Ext.form.trigger.Trigger.getIcon("Date")
                }
            }
        }, {
            id: "txtTenureEndDate",
            inputMask: "9999/99/99",
            xtype: "textfield",
            fieldLabel: "تاریخ پایان تصدی",
            fieldStyle: "text-align:center",
            vtype: "isValidDate",
            vtypeText: "تاریخ نامعتبر است",
            iconCls: "#Date",
            triggers: {
                "_trigger1": {
                    tag: "_trigger1",
                    cls: Ext.form.trigger.Trigger.getIcon("Date")
                }
            }
        }, {
            id: "cmbTenureActiveState",
            xtype: "combobox",
            fieldLabel: "وضعیت",
            allowBlank: false,
            blankText: "این فیلد باید پر باشد",
            editable: false,
            queryMode: "local",
            selectedItems: [{ value: "1" }],
            store: [
                ["1", "فعال"],
                ["0", "غیر فعال"]
            ]
        }, {
            id: "cmbPostType",
            xtype: "combobox",
            fieldLabel: "نوع پست",
            allowBlank: false,
            blankText: "این فیلد باید پر باشد",
            editable: false,
            listeners: {
                afterrender: {
                    fn: function (item) {
                        comboBoxConstantBinder(this, 'Company_PersonnelPost', 'PostType', 1, 'Value')
                    }
                }
            }
        }],
        layout: {
            type: "table",
            itemCls: "width-full",
            columns: 2
        },

        /*title: "انتخاب کاربر پست",*/

        fieldDefaults: {
            labelAlign: "top",
            msgTarget: "side"
        }
    });

    this.window = new Ext.window.Window({
        height: 300,
        rtl: true,
        renderTo: parent.body,
        width: 350,
        resizable: false,
        items: [me.form],
        layout: "fit",
        closeAction: "destroy",
        title: "تصدی پرسنل",
        iconCls: "#UserStar",
        maximizable: false,
        listeners: {
            close: {
                fn: function () {

                    parent.getEl().unmask();

                }
            }
        },
        buttons: [{

            iconCls: "#Cancel",
            text: "انصراف",
            listeners: {
                click: {
                    fn: function (item, e) {
                        this.up('window').close();
                    }
                }
            }
        }, {

            tabIndex: 12,
            handler: function () {
                savePersonnelPost(this.up().up().down('form'), editMode, id)
            },
            iconCls: "#Disk",
            text: "ذخیره"
        }],
        tools: [{
            id: "tipPersonnelPost",
            alwaysOnTop: true,
            tooltips: [{
                html: " در هر زمان تنها یک کاربر پست می تواند\r\n                        فعال باشد, بنابراین با انتخاب این کاربر به عنوان کاربر فعال, کاربر فعال قبلی به\r\n                        وضعیت غیر فعال در خواهد آمد.",
                rtl: true,
                ui: "warning",
                width: 200,
                xtype: "tooltip",
                draggable: true,
                closable: true,
                title: "توجه",
                autoHide: false,
                target: "tipPersonnelPost",
                //iconCls: '#Exclamation',
            }],
            type: "help"
        }]
    })

    this.show = function () {


        if (editMode == 'Edit') {
            setTimeout(function () {
                execSPSelect('AGEy4yfoMC53jHDhUjOFYMNj2JkqbfjvcviKRnN2ugM='/*SPC_GetPersonnelPostInfo*/, { CompanyID: companyID, ID: id }, null, {}, null, function (result) {
                    var info = result[0]
                    me.form.getComponent('cmbPersonnelPostSearch').setValue(info.FullName),
                        me.form.getComponent('cmbPersonnelPostSearch').value = info.PersonnelID,
                        me.form.getComponent('txtTenureStartDate').setValue(numberToDate(info.StartDate)),
                        me.form.getComponent('txtTenureEndDate').setValue(numberToDate(info.EndDate)),
                        me.form.getComponent('cmbTenureActiveState').setValue(info.IsActive == true ? 1 : 0),
                        me.form.getComponent('cmbPostType').setValue(info.PostTypeID)

                })

            }, 300)
        }
        //if (parent.getEl())
        parent.getEl().mask();

        this.window.show();
    }
}

function OrganizitionTreeSelect(parent, textField) {

    me = this;

    //var _selectedUnit = []
    //this.selectUnit = function (node, checked) {

    //    //node.eachChild(function (n) {
    //    //    n.set('checked', checked);
    //    //});

    //    //node.parentNode.eachChild(function (n) {
    //    //    if (n.data.checked) {
    //    //        n.parentNode.set('checked', true)
    //    //        return false;
    //    //    }
    //    //    else
    //    //        n.parentNode.set('checked', false)
    //    //});
    //    var sel = me.organizitionTree.getChecked();
    //    if (checked == false) {

    //        Ext.Array.forEach(_selectedUnit, function (item, index) {
    //            if (item.id == node.data.id) {
    //                _selectedUnit.splice(index, 1);
    //                return true;
    //            }

    //        });
    //    }
    //    else {
    //        if (node.parentNode.data.checked == false || node.parentNode.id == "root")
    //            _selectedUnit.push({ id: node.data.id, title: node.data.text })
    //    }
    //}
    this.organizitionTree = new Ext.tree.Panel({
        width: 350,
        xtype: "treepanel",
        region: "west",
        split: true,
        autoScroll: true,
        rtl: true,
        tbar: {
            xtype: "toolbar",
            items: [{
                id: "fieldFilter",
                margin: "5 0 5 0",
                xtype: "textfield",
                colspan: 5,
                fieldLabel: "عنوان واحد",
                labelWidth: 55,
                emptyText: "جستجو",
                enableKeyEvents: true,
                triggers: {
                    "_trigger1": {
                        tag: "_trigger1",
                        cls: Ext.form.trigger.Trigger.getIcon("Clear")
                    }
                },
                listeners: {
                    triggerclick: {
                        fn: function (item, trigger, index, tag, e) {
                            clearFilter(this);
                        }
                    },
                    keyup: {
                        buffer: 250,
                        fn: filterTree
                    }
                }
            }, {
                xtype: "tbspacer"
            }],
            layout: {
                type: "table",
                itemCls: "width-full",
                columns: 5
            }
        },
        multiSelect: true,
        rootVisible: false,
        useArrows: true,
        listeners: {
            afterrender: {
                fn: function (item) {
                    getOrganisationTree(this, 0, false)
                }
            },
            checkchange: {
                fn: checkChangeTreePanel
            }
        }
    }),

        this.window = parent == undefined || parent == null ? null : new Ext.window.Window({
            height: 400,
            rtl: true,
            renderTo: parent.body,
            width: 350,
            resizable: true,
            items: [me.organizitionTree],
            layout: "fit",
            bodyPadding: 5,
            bbar: {
                rtl: false,
                xtype: "toolbar",
                items: [{
                    tabIndex: 12,
                    iconCls: "#Tick",
                    text: "انتخاب",
                    listeners: {
                        click: {
                            fn: function (item, e) {
                                var orgIDs = me.organizitionTree.getChecked('id', true)
                                if (orgIDs != '') {
                                    //selectCity(selectRecord);
                                    textField.setValue(me.organizitionTree.getChecked('text', true));
                                    textField.tag = orgIDs
                                    this.up('window').close()
                                }
                                else {
                                    Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ واحدی انتخاب نشده است', iconCls: '#Exclamation' });
                                }

                            }
                        }
                    }
                }]
            },
            closeAction: "destroy",
            title: "انتخاب واحد سازمانی",
            iconCls: "#ChartOrganisation",
            maximizable: false,
            listeners: {
                close: {
                    fn: function () {

                        parent.getEl().unmask();

                    }
                }
            }
        });

    this.show = function () {


        parent.getEl().mask();

        this.window.show();
    }

    this.getOrganizitionTree = function () {

        return this.organizitionTree
    }

    this.selectedUnits = function () {

        return this.organizitionTree.getChecked()
    }

}


function SentenceItemModalWindow(parent, editMode, id) {

    me = this;


    this.form = new Ext.form.FormPanel({
        id: "formPanelSentenceItem",
        "autoHeight": true,
        frame: true,
        width: 590,
        xtype: "form",
        items: [{
            id: "txtSentencetItem_Title",
            xtype: "textfield",
            fieldLabel: "عنوان عامل",
            allowBlank: false,
            blankText: ".این فیلد باید پر باشد"
        }, {
            id: "txtSentencetItem_EnglishTitle",
            xtype: "textfield",
            fieldLabel: "عنوان لاتین"
        }, {
            id: "txtSentencetItem_Code",
            xtype: "textfield",
            fieldLabel: "کد عامل",
            maskRe: /[0-9-]/
        }, {
            id: "cmbSentencetItem_CalcType",
            tabIndex: 4,
            xtype: "combobox",
            fieldLabel: "نوع محاسبه",
            allowBlank: false,
            blankText: ".این فیلد باید پر باشد",
            editable: false,
            queryMode: "local",
            store: [
                ["1", "روزانه"],
                ["2", "ماهانه"]
            ]
        }, {
            id: "chkSentencetItem_IsAddSum",
            xtype: "checkboxfield",
            fieldLabel: "محاسبه در جمع حکم",
            labelAlign: "right",
            labelSeparator: "",
            labelWidth: 108,
            value: true,
            inputValue: "App.chkSentencetItem_IsAddSum"
        }, {
            id: "tagSentencetItem_EmploymentType",
            tabIndex: 10,
            xtype: "nettagfield",
            fieldLabel: "نوع استخدام",
            allowBlank: false,
            blankText: ".این فیلد باید پر باشد",
            editable: false,
            multiSelect: true,
            listeners: {
                afterrender: {
                    fn: function (item) {
                        comboBoxConstantBinder(this, 'BaseInfo', 'EmploymentType', 1, 'ID')
                    }
                }
            }
        }],
        layout: {
            type: "table",
            itemCls: "width-full",
            columns: 1
        },
        header: false,
        fieldDefaults: {
            labelAlign: "top",
            msgTarget: "side"
        }
    });

    this.window = new Ext.window.Window({
        id: "SentencetItemWindow",
        height: 400,
        rtl: true,
        renderTo: parent.body,
        width: 350,
        keyMap: {
            binding: {
                handler: function () {
                    SaveSentenceItem(editMode, id, me)
                },
                key: [13]
            }
        },
        resizable: false,
        items: [me.form],
        layout: "fit",
        buttons: [{

            iconCls: "#Cancel",
            text: "انصراف",
            listeners: {
                click: {
                    fn: function (item, e) {
                        this.up('window').close();
                    }
                }
            }
        }, {
            id: "btnSSI",
            handler: function () {
                SaveSentenceItem(editMode, id, me)
            },
            iconCls: "#Disk",
            text: "ذخیره"
        }],
        closeAction: "destroy",
        title: "ویرایش عامل",
        iconCls: "#Coins",
        maximizable: false,
        listeners: {
            close: {
                fn: function () {

                    parent.getEl().unmask();

                }
            }
        }
    });

    this.show = function () {


        if (editMode == 'Edit') {
            setTimeout(function () {
                var columns = getFieldsToJson(me.form, 'field', false, '_', { ID: id }, false)
                var items = selectDynamicQuery('wnYUZzMrLGxsiirhvDKWEg=='/*Sentence_Items*/, '', '', null, me.form, { CompanyID: companyID, ID: id })
            }, 300)
        }
        //if (parent.getEl()).


        if (editMode == 'Add' || id > 0) {
            parent.getEl().mask();
            this.window.show();
        }
    }

    this.close = function (isEdit) {

        if ((editMode == 'Edit' && isEdit) || editMode == 'Add')
            getSentenceItems(parent.down())
        this.window.close();
    }
}


function SentenceTypeModalWindow(parent, editMode, id) {

    me = this;


    this.form = new Ext.form.FormPanel({
        id: "formPanelSentencetType",
        "autoHeight": true,
        frame: true,
        width: 590,
        xtype: "form",
        items: [{
            id: "txtSentenceType_Title",
            xtype: "textfield",
            fieldLabel: "عنوان حکم",
            allowBlank: false,
            blankText: ".این فیلد باید پر باشد"
        }, {
            id: "cmbSentenceType_IssueType",
            tabIndex: 4,
            xtype: "combobox",
            fieldLabel: "زمان صدور حکم",
            allowBlank: false,
            blankText: ".این فیلد باید پر باشد",
            editable: false,
            queryMode: "local",
            store: [
                ["1", "در ابتدای استخدام"],
                ["2", "در حین استخدام"],
                ["3", "در پایان استخدام"]
            ]
        }, {
            id: "txtSentenceType_JobStatus",
            tabIndex: 4,
            xtype: "combobox",
            fieldLabel: "وضعیت شغلی پس از صدور این حکم",
            editable: false,
            queryMode: "local",
            allowBlank: false,
            blankText: ".این فیلد باید پر باشد",
            store: Ext.data.StoreManager.getArrayStore(2),
            listeners: {
                afterrender: {
                    fn: function (item) {
                        comboBoxJobStatusBinder(this)
                    }
                }
            }
        }, {
            id: "tagSentencetType_EmploymentType",
            tabIndex: 10,
            xtype: "nettagfield",
            fieldLabel: "نوع استخدام",
            allowBlank: false,
            blankText: ".این فیلد باید پر باشد",
            editable: false,
            multiSelect: true,
            queryMode: "local",
            store: [],
            listeners: {
                afterrender: {
                    fn: function (item) {
                        comboBoxConstantBinder(this, 'BaseInfo', 'EmploymentType', 1, 'ID')
                    }
                }
            }
        }, {
            id: "txtSentenceType_Dsc",
            height: 80,
            minHeight: 70,
            xtype: "textareafield",
            fieldLabel: "شرح"
        }],
        layout: {
            type: "table",
            itemCls: "width-full",
            columns: 1
        },
        header: false,
        fieldDefaults: {
            labelAlign: "top",
            msgTarget: "side"
        }
    });

    this.window = new Ext.window.Window({
        id: "SentencetTypeWindow",
        height: 400,
        rtl: true,
        renderTo: parent.body,
        width: 350,
        keyMap: {
            binding: {
                handler: function () {
                    SaveSentenceType(me)
                },
                key: [13]
            }
        },
        resizable: false,
        items: [me.form],
        layout: "fit",
        buttons: [{

            iconCls: "#Cancel",
            text: "انصراف",
            listeners: {
                click: {
                    fn: function (item, e) {
                        this.up('window').close();
                    }
                }
            }
        }, {
            id: "btnSST",
            handler: function () {
                SaveSentenceType(editMode, id, me)
            },
            iconCls: "#Disk",
            text: "ذخیره"
        }],
        closeAction: "destroy",
        title: "ویرایش حکم",
        iconCls: "#Script",
        maximizable: false,
        listeners: {
            close: {
                fn: function () {

                    parent.getEl().unmask();

                }
            }
        }
    });

    this.show = function () {


        if (editMode == 'Edit') {
            setTimeout(function () {
                var columns = getFieldsToJson(me.form, 'field', false, '_', { ID: id }, false)
                var items = selectDynamicQuery('wnYUZzMrLGwNMQcMaJDxGA=='/*Sentence_Types*/, '', '', null, me.form, { CompanyID: companyID, ID: id })
            }, 300)
        }
        //if (parent.getEl()).


        if (editMode == 'Add' || id > 0) {
            parent.getEl().mask();
            this.window.show();
        }
    }

    this.close = function () {

        getSentenceTypes(parent)
        this.window.close();
    }
}


function PersonnelSentencesModalWindow(parent, personnelID) {

    me = this;
    this.mode = 'Add';

    //this.form = new Ext.form.FormPanel({
    this.window = new Ext.window.Window({

        id: "PersonnelSentenceIssuetWindow",
        autoRender: false,
        height: 550,
        rtl: true,
        width: 1000,
        renderTo: parent.body,
        xtype: "window",
        items: [{
            store: {
                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                    extend: "Ext.data.Model",
                    fields: [{
                        name: "ID",
                        type: "int"
                    }, {
                        name: "Title"
                    }, {
                        name: "SentenceNo"
                    }, {
                        name: "IssueDate"
                    }, {
                        name: "ExecuteDate"
                    }, {
                        name: "Status",
                        type: "int"
                    }]
                }),
                autoLoad: true,
                proxy: {
                    type: "ajax",
                    reader: {
                        type: "json"
                    }
                }
            },
            id: "gridPersonnelSentences",
            width: 430,
            xtype: "grid",
            region: "west",
            split: true,
            collapsible: true,
            tbar: {
                xtype: "toolbar",
                items: [{
                    handler: function () {
                        newPersonnelSentence(this.up('grid'))
                    },
                    iconCls: "#Add",
                    text: "حکم جدید"
                }, {
                    handler: function () {
                        personnelSentenceEdit('Delete', this.up('grid'))
                    },
                    iconCls: "#Delete",
                    text: "حذف حکم"
                }]
            },
            title: "احکام",
            iconCls: "#Script",
            columns: {
                items: [{
                    width: 35,
                    xtype: "rownumberer",
                    align: "center",
                    text: "ردیف"
                }, {
                    width: 120,
                    dataIndex: "Title",
                    text: "نوع حکم"
                }, {
                    flex: 1,
                    dataIndex: "SentenceNo",
                    sortable: true,
                    text: "شماره حکم"
                }, {
                    flex: 1,
                    dataIndex: "IssueDate",
                    sortable: true,
                    text: "تاریخ صدور"
                }, {
                    flex: 1,
                    dataIndex: "ExecuteDate",
                    sortable: true,
                    text: "تاریخ اجرا"
                }, {
                    width: 30,
                    xtype: "commandcolumn",
                    commands: [{
                        xtype: "button",
                        command: "Delete",
                        tooltip: {
                            text: "حذف"
                        },
                        iconCls: "#Delete"
                    }],
                    listeners: {
                        command: {
                            fn: function (item, command, record, recordIndex, cellIndex) {
                                personnelSentenceEdit('Delete', this.up().up())
                            }
                        }
                    }
                }]
            },
            listeners: {
                afterrender: {
                    fn: function (item) {
                        getPersonnelSentences(this, personnelID)
                    }
                },
                rowclick: {
                    fn: function (item, record, node, index, e) {
                        getPersonnelSentenceInfo(this)
                    }
                }
            }
        }, {
            id: "TabPersonnelSentenceInfo",
            region: "center",
            items: [{
                id: "PS_frmPSP",
                rtl: true,
                xtype: "form",
                autoScroll: true,
                items: [{
                    id: "txtSentence_ExecuteDate",
                    inputMask: "9999/99/99",
                    rtl: false,
                    xtype: "textfield",
                    fieldLabel: "تاریخ اجرا",
                    fieldStyle: "text-align:center",
                    labelStyle: "direction:rtl",
                    vtype: "isValidDate",
                    vtypeText: "تاریخ نامعتبر است",
                    allowBlank: false,
                    blankText: ".این فیلد باید پر باشد",
                    iconCls: "#Date"
                }, {
                    id: "txtSentence_IssueDate",
                    inputMask: "9999/99/99",
                    rtl: false,
                    tabIndex: 1,
                    xtype: "textfield",
                    fieldLabel: "تاریخ صدور",
                    fieldStyle: "text-align:center",
                    labelStyle: "direction:rtl",
                    vtype: "isValidDate",
                    vtypeText: "تاریخ نامعتبر است",
                    allowBlank: false,
                    blankText: ".این فیلد باید پر باشد",
                    iconCls: "#Date"
                }, {
                    id: "txtSentence_EndDate",
                    inputMask: "9999/99/99",
                    rtl: false,
                    tabIndex: 8,
                    xtype: "textfield",
                    fieldLabel: "تاریخ پایان",
                    fieldStyle: "text-align:center",
                    labelStyle: "direction:rtl",
                    vtype: "isValidDate",
                    vtypeText: "تاریخ نامعتبر است",
                    allowBlank: false,
                    blankText: ".این فیلد باید پر باشد",
                    iconCls: "#Date"
                }, {
                    id: "txtSentence_ConfirmDate",
                    inputMask: "9999/99/99",
                    rtl: false,
                    tabIndex: 8,
                    xtype: "textfield",
                    fieldLabel: "تاریخ تایید حکم",
                    fieldStyle: "text-align:center",
                    labelStyle: "direction:rtl",
                    vtype: "isValidDate",
                    vtypeText: "تاریخ نامعتبر است",
                    allowBlank: false,
                    blankText: ".این فیلد باید پر باشد",
                    iconCls: "#Date"
                }, {
                    id: "cmbSentence_Type",
                    tabIndex: 5,
                    xtype: "combobox",
                    colspan: 2,
                    fieldLabel: "نوع حکم",
                    allowBlank: false,
                    blankText: ".این فیلد باید پر باشد",
                    editable: false,
                    queryMode: "local",
                    store: Ext.data.StoreManager.getArrayStore(2),
                    listeners: {
                        afterrender: {
                            fn: function (item) {
                                getPersonnelSentenceTypes(this, personnelID)
                            }
                        },
                        select: {
                            fn: function (item, newValue, oldValue) {
                                this.next().setValue(this.rawValue);
                                getSentenceTypeInstanceItems(this)
                            }
                        }
                    }
                }, {
                    id: "txtPS_Title",
                    xtype: "textfield",
                    fieldLabel: "عنوان حکم",
                    allowBlank: false,
                    blankText: ".این فیلد باید پر باشد"
                }, {
                    id: "txtPS_SentenceNo",
                    xtype: "textfield",
                    fieldLabel: "شماره حکم"
                }, {
                    id: "txtPS_Description",
                    xtype: "textareafield",
                    colspan: 2,
                    fieldLabel: "شرح حکم"
                }],
                layout: {
                    type: "table",
                    itemCls: "width-full",
                    columns: 2
                },
                bodyPadding: 5,
                title: "مشخصات حکم",
                iconCls: "#ScriptEdit",
                url: unescape("%2fDefault.aspx"),
                fieldDefaults: {
                    labelAlign: "top"
                }
            }],
            layout: {
                type: "accordion",
                reserveScrollbar: true,
                multi: true
            },
            title: "اطلاعات حکم",
            iconCls: "#Information"
        }, {
            id: "tabPanelPSI",
            width: 300,
            xtype: "tabpanel",
            region: "east",
            split: true,
            items: [{
                store: {
                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                        extend: "Ext.data.Model",
                        fields: [{
                            name: "ID",
                            type: "int"
                        }, {
                            name: "ItemID",
                            type: "int"
                        }, {
                            name: "Title"
                        }, {
                            name: "Value",
                            type: "float"
                        }]
                    }),
                    proxy: {
                        type: "page",
                        reader: {
                            type: "json"
                        }
                    }
                },
                id: "gridSPItems",
                plugins: [{
                    ptype: "cellediting",
                    clicksToEdit: 1
                }],
                xtype: "grid",
                region: "center",
                title: "عوامل در حکم",
                iconCls: "#Coins",
                columns: {
                    items: [{
                        width: 35,
                        xtype: "rownumberer",
                        align: "center",
                        text: "ردیف"
                    }, {
                        flex: 1,
                        dataIndex: "Title",
                        sortable: true,
                        text: "عنوان عامل"
                    }, {
                        flex: 1,
                        align: "center",
                        dataIndex: "Value",
                        editor: new Ext.grid.CellEditor(Ext.apply({
                            field: {
                                xtype: "numberfield",
                                allowBlank: false,
                                decimalSeparator: "/",
                                maxValue: 1000000000.0,
                                minValue: 0.0
                            }
                        }, {})),
                        renderer: Ext.util.Format.usMoney,
                        text: "مقدار عامل"
                    }]
                },
                multiSelect: true
            }],
            layout: {
                type: "fit",
                itemCls: "width-full"
            },
            collapsible: true,
            title: "عوامل و امتیازات حکم",
            iconCls: "#Coins",
            activeTab: 0
        }],
        layout: "border",
        bodyPadding: 5,
        buttons: [{
            id: "PS_btnPSS",
            iconCls: "#Disk",
            text: "ذخیره تغییرات",
            listeners: {
                click: {
                    fn: function (item, e) {
                        personnelSentenceEdit('Add', this.up('window').down('#PS_frmPSP'))
                    }
                }
            }
        }, {
            id: "PS_btnPSC",
            iconCls: "#Tick",
            text: "تایید حکم",
            listeners: {
                click: {
                    fn: function (item, e) {
                        personnelSentenceConfirm(this.up('window'), personnelID)
                    }
                }
            }
        }],
        listeners: {
            close: {
                fn: function () {

                    parent.body.unmask();

                }
            }
        },
        closeAction: "destroy",
        title: "احکام پرسنل",
        iconCls: "#UserEdit"
    })

    this.show = function () {
        parent.body.mask();
        this.window.show();

    }

    this.close = function () {

        parent.body.unmask();
        this.window.close();
    }

    function getPersonnelSentenceInfo(grid) {

        me.mode = 'Edit'
        var win = grid.up('window')
        var mask = showMask(win, 'در حال بارگذاری...', true)
        var id = getValueGrid(grid, 'ID');

        var status = getValueGrid(grid, 'Status');
        if (status == 8) {
            Ext.Array.forEach(grid.next('panel').down('form').query('field'), function (field) {
                field.setReadOnly(true)
            })

            win.down('#PS_btnPSS').hide()
            win.down('#PS_btnPSC').setText('برگشت از تایید')
        }
        else {
            me.mode = 'Edit'
            win.down('#PS_btnPSS').show()
            win.down('#PS_btnPSC').setText('تایید حکم')
            Ext.Array.forEach(grid.next('panel').down('form').query('field'), function (field) {
                field.setReadOnly(false)
            })
        }
        execSPSelect('qMGkc4KKdXD+x1kb3n+oBqs9rAYoDeSWDdRi63CyrR8='/*SPH_GetPersonnelSentenceInfo*/, { CompanyID: companyID, ID: id }, null, grid.next('panel'), null, function (PSInfo) {

            var grid = win.down('#gridSPItems')
            //grid.store.loadData([])
            grid.store.loadData(Ext.JSON.decode(PSInfo[0]['Items']))
            mask.unmask();
        })

    }

    function personnelSentenceConfirm(win, personnelID) {

        var mask = showMask(win, 'در حال تایید نهایی...', true);
        var grid = win.down('grid')
        var id = getValueGrid(grid, 'ID');
        if (!id)
            return
        var status = getValueGrid(grid, 'Status');
        status = status == 8 ? 0 : 8;
        var row = getSelectedRowGrid(grid)
        row.data.Status = status

        execSPUpdate('rTsnHvFJNWGL1kI/5pTS4iloOCnLjtnKSAY7QBrFIaw='/*SPH_ConfirmPersonnelSentence*/, null, { CompanyID: companyID, PersonnelID: personnelID, ID: id, Status: status }, mask, false, true, false,
            function () {
                // getPersonnelSentences(grid, 12/*personnelID*/)
                getPersonnelSentenceInfo(grid)
            })


    }
    function newPersonnelSentence(grid) {

        me.mode = 'Add'
        var pDate = new persianDate();
        var win = grid.up('window')
        var form = win.down('#PS_frmPSP')
        var gridItems = win.down('#gridSPItems')
        form.reset();
        form.getComponent('txtSentence_IssueDate').setValue(pDate.format('L'))
        form.getComponent('txtSentence_ConfirmDate').setValue(pDate.format('L'))
        form.getComponent('txtSentence_EndDate').setValue(persianDate([pDate.year(), 12, pDate.isLeapYear() ? 30 : 29]).format('L'));
        gridItems.store.loadData([])
        Ext.Array.forEach(form.query('field'), function (field) {
            field.setReadOnly(false)
        })
        win.down('#PS_btnPSS').show()
        win.down('#PS_btnPSC').hide()
    }
    function personnelSentenceEdit(mode, ctrl) {

        me.mode = mode == 'Delete' ? 'Delete' : me.mode
        if (me.mode == 'Add') {
            if (ctrl.isValid()) {
                var win = ctrl.up('window')
                var mask = showMask(win, 'در حال ذخیره...', true);
                var gridItems = win.down('#gridSPItems')
                var items = []

                gridItems.store.data.items.forEach(function (item) { items.push({ TypeInstanceItemID: item.data.ID, ItemID: item.data.ItemID, ConfirmValue: item.data.Value }) })
                execSPInsert('H2THoNP90OJKB0rcRAu8bhJKK0QDwdgN/bvyQh+TJBs='/*SPH_SentencePersonnelUpdate*/, false, false, ctrl, { Items: Ext.JSON.encode(items), CompanyID: companyID, PersonnelID: personnelID, Status: 0, Year: persianDate().year(), CloseDate: dateToNumber(ctrl.getComponent('txtSentence_EndDate').value) }, mask, false,
                    function () {
                        getPersonnelSentences(ctrl.up('window').down('grid'), personnelID)
                        var btnPSC = win.down('#PS_btnPSC')
                        btnPSC.show()
                        btnPSC.setText('تایید حکم')
                    })
            }
        }
        else if (me.mode == 'Edit') {
            var win = ctrl.up('window')
            var mask = showMask(win, 'در حال ذخیره...', true);
            var id = getValueGrid(win.down('grid'), 'ID');
            var gridItems = win.down('#gridSPItems')
            var items = []
            gridItems.store.data.items.forEach(function (item) {
                //if (item.previousValues && item.previousValues.Value && item.previousValues.Value !== item.data.Value)
                items.push({ PersonnelSentenceID: id, TypeInstanceItemID: item.data.ID, ItemID: item.data.ItemID, ConfirmValue: item.data.Value })
            })

            execSPUpdate('H2THoNP90OJKB0rcRAu8bhJKK0QDwdgN/bvyQh+TJBs='/*SPH_SentencePersonnelUpdate*/, ctrl, { Items: Ext.JSON.encode(items), CompanyID: companyID, PersonnelID: personnelID, ID: id }, mask, false, false, false,
                function () {
                    //getPersonnelSentences(ctrl.up('window').down('grid'), 12/*personnelID*/)
                })

        }
        else if (me.mode == 'Delete') {
            var spID = getValueGrid(ctrl, 'ID');
            if (spID) {

                confirmMsg(' حذف عامل ', 'ایا مطمئن هستید ؟', function (btn) {
                    if (btn == 'yes') {
                        var status = getValueGrid(ctrl, 'Status');
                        if (status !== 8) {
                            var mask = showMask(ctrl, 'در حال حذف...', false);
                            execSPDelete('H2THoNP90OJKB0rcRAu8bhJKK0QDwdgN/bvyQh+TJBs='/*SPH_SentencePersonnelUpdate*/, { CompanyID: companyID, ID: spID }, mask,
                                function () { getPersonnelSentences(ctrl, personnelID) })
                        }
                        else {
                            Ext.Msg.info({ ui: 'danger', title: 'حذف حکم', html: 'حکم تایید شده قابل حذف نمیباشد', iconCls: '#Exclamation' });
                        }
                    }

                });
            }

        }

    }
};


function SalaryItemModalWindow(parent, editMode, id) {

    me = this;


    this.form = new Ext.form.FormPanel({
        id: "formPanelSalaryItem",
        "autoHeight": true,
        frame: true,
        xtype: "form",
        items: [{
            id: "txtSalaryItem_Title",
            xtype: "textfield",
            fieldLabel: "عنوان عامل",
            allowBlank: false,
            blankText: ".این فیلد باید پر باشد"
        }, {
            id: "txtSalaryItem_EnglishTitle",
            xtype: "textfield",
            fieldLabel: "عنوان لاتین"
        }, {
            id: "cmbSalI_CategoryType",
            tabIndex: 4,
            xtype: "combobox",
            fieldLabel: "نوع عامل",
            allowBlank: false,
            blankText: ".این فیلد باید پر باشد",
            editable: false,
            queryMode: "local",
            store: [
                ["2", "مزایا"],
                ["3", "کسور"],
                ["1", "کارکرد"],
                ["4", "سایر عوامل"],
                ["5", "تعهدات کارفرما"]
            ],
            listeners: {
                change: {
                    fn: function (item, newValue, oldValue) {
                        getItemTypes(this, this.next())
                    }
                }
            },

        }, {
            id: "cmbSalI_ItemType",
            tabIndex: 4,
            xtype: "combobox",/*
            fieldLabel: "نوع مزایا",*/
            allowBlank: false,
            blankText: ".این فیلد باید پر باشد",
            editable: false

        }, {
            id: "chkSalaryItem_IsArrear",
            xtype: "checkboxfield",
            labelSeparator: "",
            labelWidth: 60,
            value: true,
            boxLabel: "معوقه پذیر"
        }, {
            id: "cmbSalI_IsVisible",
            xtype: "checkboxfield",
            labelSeparator: "",
            labelWidth: 80,
            boxLabel: "نمایش در فیش"
        }, {
            id: "tagSalaryItem_EmploymentType",
            tabIndex: 10,
            xtype: "nettagfield",
            colspan: 2,
            fieldLabel: "نوع استخدام",
            allowBlank: false,
            blankText: ".این فیلد باید پر باشد",
            editable: false,
            multiSelect: true,
            listeners: {
                afterrender: {
                    fn: function (item) {
                        comboBoxConstantBinder(this, 'BaseInfo', 'EmploymentType', 1, 'ID')
                    }
                }
            }
        }, {
            xtype: "fieldset",
            defaultAnchor: "100%",
            flex: 1,
            colspan: 2,
            items: [{
                id: "sal_DetailsType",
                cls: "width-100",
                tabIndex: 4,
                xtype: "combobox",
                colspan: 2,
                fieldLabel: "سطح تفصیل",
                editable: false,
                queryMode: "local",
                store: [
                    ["1", "شخص"],
                    ["2", "شرکت"],
                    ["3", "مرکز هزینه"],
                    ["4", "شعبه"]
                ]
            }, {
                id: "chkBedehkar",
                width: 100,
                xtype: "checkboxfield",
                boxLabel: "بدهکار"
            }, {
                id: "sal_DebtorSpecificCode",
                width: 200,
                xtype: "textfield",
                fieldLabel: "کد معین بدهکار",
                labelAlign: "right"
            }, {
                id: "chkBestankar",
                xtype: "checkboxfield",
                boxLabel: "بستانکار",
            }, {
                id: "sal_CreditorSpecificCode",
                width: 200,
                xtype: "textfield",
                fieldLabel: "کد معین بستانکار",
                labelAlign: "right"
            }],
            layout: {
                type: "table",
                itemCls: "width-full",
                columns: 2
            },
            collapsible: true,
            title: "اطلاعات مالی"
        }],
        layout: {
            type: "table",
            itemCls: "width-full",
            columns: 2
        },
        header: false,
        fieldDefaults: {
            labelAlign: "top",
            msgTarget: "side"
        }
    });

    this.window = new Ext.window.Window({
        id: "SalaryItemsWindow",
        height: 450,
        rtl: true,
        renderTo: parent.body,
        width: 400,

        keyMap: {
            binding: {
                handler: function () {
                    SaveSalaryItem(this)
                },
                key: [13]
            }
        },
        resizable: false,
        items: [me.form],
        layout: {
            type: "fit",
            itemCls: "width-full"
        },
        buttons: [{

            handler: function () {
                this.up('window').close()
            },
            iconCls: "#Cancel",
            text: "انصراف"
        }, {
            id: "btnSalSI",
            handler: function () {
                SaveSalaryItem(editMode, id, me)
            },
            iconCls: "#Disk",
            text: "ذخیره"
        }],
        closeAction: "destroy",
        title: "ویرایش عامل",
        iconCls: "#Coins",
        maximizable: false,
        listeners: {
            close: {
                fn: function () {

                    parent.getEl().unmask();

                }
            }
        }
    });

    this.show = function () {

        //HkER3MkBNsuz0DNyOKeFhbPk9dStlxhp
        if (editMode == 'Edit') {
            var mask = showMask(me.form, 'در حال بارگذاری...', false)
            setTimeout(function () {

                execSPSelect('W3wqtUb/9WADUizR7hTXfDm6K0zzXR2t'/*SPF_GetSalaryItemInfo*/, getParametersJson(me.form, { CompanyID: companyID, ID: id }, '', '', null, { NatureTypeID: 0 }), mask, me.form, null,
                    function (item) {
                        item = item[0]
                        var chkBestankar = me.form.down('#chkBestankar')
                        var chkBedehkar = me.form.down('#chkBedehkar')
                        if (item.NatureTypeID == 1)
                            chkBedehkar.setValue(true)
                        else if (item.NatureTypeID == 2)
                            chkBestankar.setValue(true)
                        else if (item.NatureTypeID == 3) {
                            chkBestankar.setValue(true)
                            chkBedehkar.setValue(true)
                        }

                        chkBestankar.preValue = chkBestankar.value
                        chkBedehkar.preValue = chkBedehkar.value
                    }
                )

            }, 300)
        }
        //if (parent.getEl()).


        if (editMode == 'Add' || id > 0) {
            parent.getEl().mask();
            this.window.show();
        }
    }
    this.close = function (isEdit) {

        if ((editMode == 'Edit' && isEdit) || editMode == 'Add')
            getSalaryItems(parent.down())

        this.window.close();
    }
}


function SalaryItemFormulaModalWindow(parent, editMode, typeItemID, title) {

    var me = this;

    this.window = new Ext.window.Window({
        height: 550,
        rtl: true,
        renderTo: parent.body,
        width: 1000,
        title: title,
        items: [{
            store: {
                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                    extend: "Ext.data.Model",
                    fields: [{
                        name: "ID",
                        type: "int"
                    }, {
                        name: "IssueYear",
                        type: "int"
                    }, {
                        name: "IssueMonth"
                    }, {
                        name: "ExecuteYear",
                        type: "int"
                    }, {
                        name: "ExecuteMonth"
                    }, {
                        name: "EmploymentTypeTitle"
                    }, {
                        name: "Dsc"
                    }]
                }),

                autoLoad: true,
                proxy: {
                    type: "ajax",
                    reader: {
                        type: "json"
                    }
                }
            },
            id: "gridSalItemInstance",
            resizable: true,
            splitterResize: true,
            height: 300,
            plugins: [{
                ptype: "rowediting",
                autoCancel: false,
                saveBtnText: "ذخیره",
                cancelBtnText: "انصراف",
                listeners: {
                    canceledit: {
                        fn: function (item, e) {
                            if (this.context.record.data.ID == 0) {
                                removeRecordGrid(this.grid, this.context.record)
                            }
                        }
                    },
                    edit: {
                        fn: function (item, e) {
                            saveItemFormulaInstance(this, typeItemID /*typeItemID*/)
                        }
                    }
                }
            }],
            xtype: "grid",
            region: "west",
            split: true,
            flex: 1,
            collapsed: true,
            collapsible: true,
            tbar: {
                xtype: "toolbar",
                items: [{

                    handler: function () {
                        addRecordGrid(this.up().up(), {
                            ID: 0,
                            IssueYear: getYear(),
                            IssueMonth: getMonthName(),
                            ExecuteYear: getYear(),
                            ExecuteMonth: getMonthName(),
                            EmploymentTypeTitle: '',
                            Dsc: ''
                        }, true, false)
                    },
                    iconCls: "#Add",
                    text: "نسخه جدید"
                }, {

                    handler: function () {
                        saveItemFormulaInstanceConfirm(this.up().up(), null, true)
                    },
                    iconCls: "#Delete",
                    text: "حذف نسخه"
                }]
            },
            title: "تاریخچه عامل",
            iconCls: "#Date",
            columnLines: true,
            columns: {
                items: [{
                    width: 35,
                    xtype: "rownumberer",
                    align: "center",
                    text: "ردیف"
                }, {
                    width: 100,
                    columns: [{
                        width: 45,
                        dataIndex: "IssueYear",
                        editor: {
                            xtype: "combobox",
                            allowBlank: false,
                            blankText: "فیلد باید پر باشد",
                            queryMode: "local",
                            store: getYears()
                        },
                        sortable: false,
                        text: "سال"
                    }, {
                        width: 60,
                        dataIndex: "IssueMonth",
                        editor: {
                            xtype: "combobox",
                            allowBlank: false,
                            blankText: "فیلد باید پر باشد",
                            editable: false,
                            displayField: "Text",
                            queryMode: "local",
                            valueField: "Text",
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "Value"
                                    }, {
                                        name: "Text"
                                    }]
                                }),

                                autoLoad: true,
                                proxy: {
                                    type: 'memory'
                                }
                            },
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        comboBoxMonthBinder(this)
                                    }
                                }
                            }
                        },
                        sortable: false,
                        text: "ماه"
                    }],
                    text: "تاریخ صدور"
                }, {
                    width: 100,
                    columns: [{
                        width: 45,
                        dataIndex: "ExecuteYear",
                        editor: {

                            xtype: "combobox",
                            allowBlank: false,
                            blankText: "فیلد باید پر باشد",
                            queryMode: "local",
                            store: getYears()
                        },
                        sortable: false,
                        text: "سال"
                    }, {
                        width: 60,
                        dataIndex: "ExecuteMonth",
                        editor: {

                            xtype: "combobox",
                            allowBlank: false,
                            blankText: "فیلد باید پر باشد",
                            editable: false,
                            displayField: "Text",
                            queryMode: "local",
                            valueField: "Text",
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "Value"
                                    }, {
                                        name: "Text"
                                    }]
                                }),

                                autoLoad: true,
                                proxy: {
                                    type: 'memory'
                                }
                            },
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        comboBoxMonthBinder(this)
                                    }
                                }
                            }
                        },
                        sortable: false,
                        text: "ماه"
                    }],
                    text: "تاریخ اجرا"
                }, {
                    flex: 1,
                    dataIndex: "EmploymentTypeTitle",
                    editor: {

                        xtype: "nettagfield",
                        allowBlank: false,
                        blankText: "فیلد باید پر باشد",
                        editable: false,
                        queryMode: "local",
                        store: [],
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    comboBoxConstantBinder(this, 'BaseInfo', 'EmploymentType', 1, 'ID')
                                }
                            }
                        }
                    },
                    text: "نوع استخدام"
                }, {
                    flex: 1,
                    dataIndex: "Dsc",
                    editor: {

                        xtype: "textfield"
                    },
                    text: "توضیحات"
                }, {
                    width: 50,
                    xtype: "commandcolumn",
                    commands: [{
                        xtype: "button",
                        command: "Delete",
                        tooltip: {
                            text: "حذف"
                        },
                        iconCls: "#Delete"
                    }, {
                        xtype: "tbseparator"
                    }, {
                        xtype: "button",
                        command: "Edit",
                        tooltip: {
                            text: "ویرایش"
                        },
                        iconCls: "#Pencil"
                    }],
                    listeners: {
                        command: {
                            fn: function (item, command, record, recordIndex, cellIndex) {
                                if (command == 'Edit') {
                                    editRecordGrid(this.up().up(), record)
                                } else {
                                    saveItemFormulaInstanceConfirm(this.up().up(), record, true)
                                }
                            }
                        }
                    }
                }]
            },
            listeners: {
                afterrender: {
                    fn: function (item) {
                        getItemFormulaInstance(this, typeItemID)
                    }
                },
                rowclick: {
                    fn: function (table, record, element, rowIndex, e, eOpts) {
                        getItemFormulaSalary(me.window, record.data.ID)
                    }
                },
                select: {
                    fn: function (rowModel, record, index, eOpts) {
                        getItemFormulaSalary(me.window, record.data.ID)
                    }
                }
            }
        }, {
            region: "center",
            items: [{
                items: [{
                    id: 'txtItemTitle',
                    height: 20,
                    margin: "5 0 0 0",
                    xtype: "textfield",
                    fieldLabel: "عنوان",
                    labelStyle: "vertical-align:middle",
                    labelWidth: 60,
                    emptyText: 'عنوان شرط یا فرمول'
                }, {
                    id: 'txtConditionTitle',
                    cls: "field-disabled",
                    height: 50,
                    margin: "5 0 0 0",
                    xtype: "textareafield",
                    fieldLabel: "شرط",
                    labelStyle: "vertical-align:middle",
                    labelWidth: 60,
                    readOnly: true,
                    leftButtons: [{

                        width: 25,
                        iconCls: "#Magnifier"
                    }],
                    editable: false
                }, {
                    id: 'txtFormulaTitle',
                    cls: "field-disabled",
                    height: 50,
                    margin: "5 0 5 0",
                    xtype: "textareafield",
                    fieldLabel: "فرمول",
                    labelStyle: "vertical-align:middle",
                    labelWidth: 60,
                    readOnly: true,
                    leftButtons: [{

                        width: 25,
                        handler: function () {
                            var gridSalFormulaList = me.window.down('#gridSalFormulaList')
                            //var edit = gridSalFormulaList.store.data.items.length > 0 ? 'Edit' : 'Add'
                            var edit = gridSalFormulaList.getSelectionModel().hasSelection() ? 'Edit' : 'Add'
                            var itemFormulaID = edit == 'Edit' ? getValueGrid(gridSalFormulaList, 'ID', '') : 0
                            var itemFormulaInstanceID = getValueGrid(me.window.down('#gridSalItemInstance'), 'ID', '')

                            showFormulaWindow(me.window.renderTo, edit, itemFormulaInstanceID, itemFormulaID, 2/*فیش*/, 1/*فرمول*/, me.window)
                        },
                        iconCls: "#Magnifier"
                    }],
                    editable: false
                }],
                layout: {
                    type: "table",
                    itemCls: "width-full",
                    columns: 1
                },
                bbar: {
                    rtl: false,
                    xtype: "toolbar",
                    items: [{

                        iconCls: "#Disk",
                        text: "ذخیره",
                        handler: function () {

                            var mask = showMask(me.window, 'در حال ذخیره...', true);
                            var gridSalFormulaList = me.window.down('#gridSalFormulaList')
                            var txtConditionTitle = me.window.down('#txtConditionTitle')
                            var edit = gridSalFormulaList.getSelectionModel().hasSelection() ? 'Edit' : 'Add'
                            var itemFormulaID = edit == 'Edit' ? getValueGrid(gridSalFormulaList, 'ID', '') : 0
                            var itemFormulaInstanceID = getValueGrid(me.window.down('#gridSalItemInstance'), 'ID', '')


                            if (edit == 'Add') {

                                if (gridSalFormulaList.store.data.items.length > 0 && txtConditionTitle.getValue() == '') {
                                    Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'لطفا ابتدا شرط را وارد کنید', iconCls: '#Exclamation' });
                                    mask.unmask()
                                    return
                                }

                                var itemFormula = {
                                    ItemFormulaInstanceID: itemFormulaInstanceID,
                                    Title: me.window.down('#txtItemTitle').getValue(),
                                    CompanyID: companyID
                                }
                                var formula = { ItemFormula: itemFormula }

                                execSPInsert('FJXLVXvbQ/pvtYDUIkg5p3ei5lTvi7Gx'/*SPF_ItemFormulaUpdate*/, false, false, null, formula, mask, false, function (result) {
                                    if (result !== 'Error') {
                                        getItemFormulaSalary(me.window, itemFormulaInstanceID)

                                    }
                                })
                            }
                            else if (edit == 'Edit') {
                                var itemFormula = {
                                    ItemFormulaID: itemFormulaID,
                                    Title: me.window.down('#txtItemTitle').getValue(),
                                    CompanyID: companyID
                                }
                                var formula = { ItemFormula: itemFormula }

                                execSPUpdate('FJXLVXvbQ/pvtYDUIkg5p3ei5lTvi7Gx'/*SPF_ItemFormulaUpdate*/, null, formula, mask, false, true, false, function (success) {

                                    if (success) {
                                        getItemFormulaSalary(me.window, itemFormulaInstanceID)

                                    }
                                })
                            }

                        }

                    }]
                },
                tbar: {
                    xtype: "toolbar",
                    items: [{

                        handler: function () {
                            // addRecordGrid(this.up().up(), null, true, false)
                            addNewFormula(me.window)
                        },
                        iconCls: "#Add",
                        text: "شرط یا فرمول جدید"
                    }]
                },
                //title: "فرمول"
            }, {
                store: {
                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                        extend: "Ext.data.Model",
                        fields: [{
                            name: "ID",
                            type: "int"
                        }, {
                            name: "Title"
                        }, {
                            name: "ConditionTitle"
                        }, {
                            name: "FormulaTitle"
                        }, {
                            name: "OrderNo",
                            type: "int"
                        }]
                    }),

                    autoLoad: true,
                    proxy: {
                        type: "ajax",
                        reader: {
                            type: "json"
                        }
                    }
                },
                id: "gridSalFormulaList",
                xtype: "grid",
                title: "لیست شرط ها و فرمول ها",
                columns: {
                    items: [{
                        width: 30,
                        xtype: "rownumberer",
                        align: "center",
                        text: "ردیف"
                    }, {
                        flex: 1,
                        dataIndex: "Title",
                        text: "عنوان شرط"
                    }, {
                        flex: 1,
                        dataIndex: "ConditionTitle",
                        sortable: false,
                        text: "شرط"
                    }, {
                        flex: 1,
                        dataIndex: "FormulaTitle",
                        sortable: false,
                        text: "فرمول محاسباتی"
                    }, {
                        width: 40,
                        dataIndex: "OrderNo",
                        text: "ترتیب",
                        tooltip: "ترتیب محاسبه"
                    }, {
                        width: 50,
                        xtype: "commandcolumn",
                        commands: [{
                            xtype: "button",
                            command: "Delete",
                            tooltip: {
                                text: "حذف"
                            },
                            iconCls: "#Delete"
                        }, {
                            xtype: "tbseparator"
                        }, {
                            xtype: "button",
                            command: "Edit",
                            tooltip: {
                                text: "ویرایش"
                            },
                            iconCls: "#Pencil"
                        }],
                        listeners: {
                            command: {
                                fn: function (item, command, record, recordIndex, cellIndex) {
                                    if (command == 'Edit') {

                                        var itemFormulaInstanceID = getValueGrid(me.window.down('#gridSalItemInstance'), 'ID', '')
                                        showFormulaWindow(me.window.renderTo, 'Edit', itemFormulaInstanceID, record.data.ID, 2/*فیش*/, 1/*فرمول*/, me.window)

                                    }
                                    else if (command == 'Delete') {
                                        deleteItemFormula(me.window.down('#gridSalFormulaList'), record)
                                    }
                                }
                            }
                        }
                    }]
                },
                listeners: {

                    rowclick: {
                        fn: function (table, record, element, rowIndex, e, eOpts) {
                            selectItemFormula(me.window, this, record)
                        }
                    },
                    select: {
                        fn: function (rowModel, record, index, eOpts) {
                            selectItemFormula(me.window, this, record)
                        }
                    }
                }
            }],
            layout: {
                type: "table",
                columns: 1
            },
            collapseDirection: "right",
            collapsible: true
        }],
        layout: "border",
        buttons: [{

            handler: function () {
                parent.getEl().unmask();
                this.up('window').close()

            },
            iconCls: "#Cancel",
            text: "انصراف"
        }],
        closeAction: "destroy",

        iconCls: "#Calculator",
        maximizable: false,
        listeners: {
            close: {
                fn: function () {

                    parent.getEl().unmask();

                }
            }
        }
    })

    this.show = function () {

        parent.getEl().mask();
        this.window.show();
    }



}

function FormulaModalWindow(parent, editMode, itemFormulaInstanceID, itemFormulaID, type/*فیش-حکم*/, mode/*فرمول-شرط*/, parentWin) {

    var me = this;
    this.parentWindow = parentWin;

    this.window = new Ext.window.Window({
        id: "WinFormula",
        height: 500,
        hidden: true,
        rtl: true,
        renderTo: parent.el,
        width: 700,
        items: [{
            id: "panelFormula",
            frame: true,
            keyMap: {
                binding: {
                    handler: function () {
                        saveFormulaSalary(this.up('window'), itemFormulaInstanceID)
                    },
                    key: [13]
                }
            },
            region: "center",
            autoScroll: true,
            items: [{
                id: "tagItemFormula",
                height: 100,
                rtl: true,
                xtype: "nettagfield",
                selectable: false,
                editable: false,
                hideTrigger: true,
                queryMode: "local",
                store: [],
                tagLabelCfg: {
                    rtl: true,
                    menu: {
                        xtype: "menu",
                        items: [{
                            handler: function () {
                                removeItemFormula(this)
                            },
                            iconCls: "#Decline",
                            text: "حذف"
                        }]
                    }
                },
                hideSelected: true
            }, {
                id: "lblItemFormula",
                border: true,
                height: 40,
                rtl: false,
                xtype: "netlabel"
            }, {
                frame: true,
                margin: "50 0 0 0",
                rtl: false,
                items: [{
                    frame: true,
                    height: 180,
                    width: 200,
                    xtype: "fieldcontainer",
                    items: [{
                        xtype: "segmentedbutton",
                        items: [{

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: ".",
                            tooltip: "ممیز"
                        }, {

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "(",
                            tooltip: "پرانتز باز"
                        }, {

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: ")",
                            tooltip: "پرانتز بسته"
                        }],
                        allowToggle: false
                    }, {
                        xtype: "segmentedbutton",
                        items: [{

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "/"
                        }, {

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "*"
                        }, {

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "-"
                        }],
                        allowToggle: false
                    }, {
                        xtype: "segmentedbutton",
                        items: [{

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "7"
                        }, {

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "8"
                        }, {

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "9"
                        }],
                        allowToggle: false
                    }, {
                        xtype: "segmentedbutton",
                        items: [{

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "4"
                        }, {

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "5"
                        }, {

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "6"
                        }],
                        allowToggle: false
                    }, {
                        xtype: "segmentedbutton",
                        items: [{

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "1"
                        }, {

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "2"
                        }, {

                            height: 30,
                            width: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "3"
                        }],
                        allowToggle: false
                    }, {
                        xtype: "segmentedbutton",
                        items: [{

                            height: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "0"
                        }, {

                            height: 30,
                            handler: function () {
                                addItemFormula(this)
                            },
                            text: "+"
                        }, {

                            height: 30,
                            handler: function () {
                                deleteFormula(this)
                            },
                            text: "حذف فرمول"
                        }],
                        allowToggle: false
                    }],
                    layout: {
                        type: "table",
                        itemCls: "width-full",
                        columns: 1
                    }
                }],
                layout: "column"
            }],
            layout: {
                type: "table",
                itemCls: "width-full",
                columns: 1
            },
            buttons: [{

                handler: function () {
                    parent.el.unmask();
                    me.window.close()

                },
                iconCls: "#Cancel",
                text: "انصراف"
            },
            {
                id: "btnSaveFormula",
                tabIndex: 12,
                handler: function () {
                    saveFormulaSalary(this.up('window'), itemFormulaInstanceID, me.parentWindow, editMode, itemFormulaID)
                },
                iconCls: "#Disk",
                text: "ذخیره"
            }]
        }, {
            id: "propertyTree",
            width: 200,
            xtype: "treepanel",
            region: "west",
            split: true,
            autoScroll: true,
            collapsible: true,
            rootVisible: false,
            useArrows: true,
            listeners: {
                afterrender: {
                    fn: function (item) {
                        getPropertyTree(this, type, mode /*فرمول*/)
                    }
                },
                itemdblclick: {
                    fn: addFormula
                }
            }
        }],
        layout: "border",
        title: "فرمول محاسباتی",
        iconCls: "#Lightbulb",
        hidden: true,
        closeAction: "destroy",
        listeners: {
            close: {
                fn: function () {

                    parent.el.unmask();

                }
            }
        }
    });

    this.show = function () {

        parent.el.mask();
        this.window.show();

        if (editMode == 'Edit') {

            var tagItemFormula = me.window.down('#tagItemFormula')
            var lblItemFormula = me.window.down('#lblItemFormula')
            var dataJson = getParametersJson({}/*همه ستون ها*/, { ItemFormulaID: itemFormulaID, CompanyID: companyID }, null, null, null, null, { Type: 2/*فیش*/ })
            execSPSelect('CzArv02SKc0kRdKnvA2d5Z5MgeeZFRSt'/*SPF_GetFormulaItems*/, dataJson, null, null, null, function (formulaItems) {

                formulaItems.forEach(function (item) {

                    tagItemFormula.addTag({
                        value: Ext.id(),
                        text: item.Title == '(' ? ')' : item.Title == ')' ? '(' : item.Title,
                        closable: false,
                        Value: item.Value,
                        Title: item.Title,
                        ItemID: item.ItemID,
                        IsFn: item.IsFn
                    })
                })

                lblItemFormula.setText(arrayObjectToString(tagItemFormula.value, 'Title', ''))


            })
        }
    }
}

function PersonnelSalaryModalWindow(parent, personnelID, personnelName) {

    me = this;
    this.mode = 'Add';

    //this.form = new Ext.form.FormPanel({
    this.window = new Ext.window.Window({

        id: "PersonnelSalaryIssuetWindow",
        autoRender: false,
        height: 550,
        rtl: true,
        width: 1100,
        renderTo: parent.body,
        xtype: "window",
        items: [{
            store: {
                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                    extend: "Ext.data.Model",
                    fields: [{
                        name: "ID",
                        type: "int"
                    }, {
                        name: "Title"
                    }, {
                        name: "Year"
                    }, {
                        name: "Month"
                    }, {
                        name: "SalaryTypeID",
                        type: "int"
                    }, {
                        name: "MonthName"
                    }, {
                        name: "Status",
                        type: "int"
                    }]
                }),
                autoLoad: true,
                proxy: {
                    type: "ajax",
                    reader: {
                        type: "json"
                    }
                }
            },
            id: "gridPersonnelSalary",
            width: 430,
            xtype: "grid",
            region: "west",
            split: true,
            collapsible: true,
            tbar: {
                xtype: "toolbar",
                items: [{
                    handler: function () {
                        newPersonnelSalary(this.up('grid'))
                    },
                    iconCls: "#Add",
                    text: "فیش جدید"
                }, {
                    handler: function () {
                        personnelSalaryEdit('Delete', this.up('grid'))
                    },
                    iconCls: "#Delete",
                    text: "حذف فیش"
                }]
            },
            title: "فیش ها",
            iconCls: "#Script",
            columns: {
                items: [{
                    width: 35,
                    xtype: "rownumberer",
                    align: "center",
                    text: "ردیف"
                }, {
                    flex: 1,
                    dataIndex: "ID",
                    sortable: true,
                    text: "شماره فیش"
                }, {
                    width: 120,
                    dataIndex: "Title",
                    text: "نوع فیش"
                }, {
                    flex: 1,
                    dataIndex: "Year",
                    sortable: true,
                    text: "سال"
                }, {
                    flex: 1,
                    dataIndex: "MonthName",
                    sortable: true,
                    text: "ماه"
                }, {
                    width: 30,
                    xtype: "commandcolumn",
                    commands: [{
                        xtype: "button",
                        command: "Delete",
                        tooltip: {
                            text: "حذف"
                        },
                        iconCls: "#Delete"
                    }],
                    listeners: {
                        command: {
                            fn: function (item, command, record, recordIndex, cellIndex) {
                                personnelSalaryEdit('Delete', this.up().up())
                            }
                        }
                    }
                }]
            },
            listeners: {
                afterrender: {
                    fn: function (item) {
                        getPersonnelSalary(this, personnelID)
                    }
                },
                rowclick: {
                    fn: function (item, record, node, index, e) {
                        getPersonnelSalaryInfo(this)
                    }
                },
                select: {
                    fn: function (rowModel, record, index, eOpts) {
                        getPersonnelSalaryInfo(this)
                    }
                }
            }
        }, {
            id: "TabPersonnelSalaryInfo",
            region: "center",
            items: [{
                id: "PSal_frmPSI",
                rtl: true,
                xtype: "form",
                autoScroll: true,
                items: [{
                    xtype: "combobox",
                    id: "ddlSalaryYear",
                    allowBlank: false,
                    fieldLabel: "سال",
                    blankText: "فیلد باید پر باشد",
                    editable: false,
                    queryMode: "local",
                    store: getYears()
                }, {
                    xtype: "combobox",
                    id: "ddlSalaryMonth",
                    allowBlank: false,
                    fieldLabel: "ماه",
                    blankText: "فیلد باید پر باشد",
                    editable: false,
                    valueField: "Text",
                    displayField: "Text",
                    queryMode: "local",
                    store: getMonths()
                }, {
                    id: "cmbSalary_Type",
                    tabIndex: 5,
                    xtype: "combobox",
                    colspan: 2,
                    fieldLabel: "نوع فیش",
                    allowBlank: false,
                    blankText: ".این فیلد باید پر باشد",
                    editable: false,
                    queryMode: "local",
                    store: Ext.data.StoreManager.getArrayStore(2),
                    listeners: {
                        afterrender: {
                            fn: function (item) {
                                getPersonnelSalaryTypes(this, personnelID)
                            }
                        },
                        select: {
                            fn: function (item, newValue, oldValue) {

                                personnelSalaryCalculation(this)
                            }
                        }
                    }
                }],
                layout: {
                    type: "table",
                    itemCls: "width-full",
                    columns: 2
                },
                bodyPadding: 5,
                title: "مشخصات فیش",
                iconCls: "#ScriptEdit",
                fieldDefaults: {
                    labelAlign: "top"
                }
            }],
            layout: {
                type: "accordion",
                reserveScrollbar: true,
                multi: true
            },
            title: "اطلاعات فیش",
            iconCls: "#Information"
        }, {
            id: "tabPanelPerSalItems",
            width: 400,
            xtype: "tabpanel",
            region: "east",
            split: true,
            items: [{
                store: {
                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                        extend: "Ext.data.Model",
                        fields: [{
                            name: "ID",
                            type: "int"
                        }, {
                            name: "OValue",
                            type: "float"
                        }, {
                            name: "Title"
                        }, {
                            name: "CValue",
                            type: "float"
                        }, {
                            name: "CTT"
                        }, {
                            name: "ITT"
                        }, {
                            name: "Formula"
                        }, {
                            name: "PNo",
                            type: "int"
                        }]
                    }),
                    proxy: {
                        type: "page",
                        reader: {
                            type: "json"
                        }
                    }
                },
                id: "gridSalPerItems",
                plugins: [{
                    ptype: "cellediting",
                    clicksToEdit: 1
                }],
                xtype: "grid",
                region: "center",
                title: "عوامل در فیش",
                iconCls: "#Coins",
                columns: {
                    items: [{
                        width: 35,
                        xtype: "rownumberer",
                        align: "center",
                        text: "ردیف"
                    }, {
                        width: 35,
                        dataIndex: "PNo",
                        sortable: true,
                        text: "اولویت"
                    }, {
                        flex: 1,
                        dataIndex: "Title",
                        sortable: true,
                        text: "عنوان عامل"
                    }, {
                        flex: 1,
                        dataIndex: "CTT",
                        sortable: true,
                        text: "دسته عامل"
                    }, {
                        flex: 1,
                        dataIndex: "ITT",
                        sortable: true,
                        text: "نوع عامل"
                    }, {
                        flex: 1,
                        dataIndex: "OValue",
                        sortable: true,
                        text: "مقدار اصلی"
                    }, {
                        flex: 1,
                        align: "center",
                        dataIndex: "CValue",
                        editor: new Ext.grid.CellEditor(Ext.apply({
                            field: {
                                xtype: "numberfield",
                                allowBlank: false,
                                decimalSeparator: "/",
                                maxValue: 1000000000.0,
                                minValue: 0.0
                            }
                        }, {})),
                        renderer: digitGrouping/*Ext.util.Format.usMoney*/,
                        text: "مقدار عامل"
                    }, {
                        width: 30,
                        xtype: "commandcolumn",
                        commands: [{
                            xtype: "button",
                            command: "Formula",
                            tooltip: {
                                text: "فرمول"
                            },

                            iconCls: "#Lightning"

                        }],
                        listeners: {
                            command: {
                                fn: function (item, command, record, recordIndex, cellIndex) {
                                    if (this.callout) {

                                        this.callout.toggle()
                                        this.callout = undefined;
                                        return;
                                    }
                                    this.callout = Ext.Msg.callout(this, {
                                        alignment: 'right',
                                        html: record.data.Formula,
                                        ui: 'info',
                                        rtl: true,
                                        title: ' فرمول ' + record.data.Title,
                                        closable: true
                                    })
                                    this.callout.setZIndex(9000000);
                                }
                            }
                        }
                    }]
                },
                multiSelect: true
            }],
            layout: {
                type: "fit",
                itemCls: "width-full"
            },
            collapsible: true,
            title: "عوامل و امتیازات فیش",
            iconCls: "#Coins",
            activeTab: 0
        }],
        layout: "border",
        bodyPadding: 5,
        buttons: [{
            id: "PS_btnPSalPrint",
            iconCls: "#Printer",
            text: "چاپ فیش",
            listeners: {
                click: {
                    fn: function (item, e) {
                        var grid = this.up('window').down('grid')
                        var id = getValueGrid(grid, 'ID');
                        if (!id)
                            return
                        downloadFile('SalaryFish', { CompanyID: companyID, ID: id })
                    }
                }
            }
        }, {
            id: "PS_btnPSalS",
            iconCls: "#Disk",
            text: "ذخیره تغییرات",
            listeners: {
                click: {
                    fn: function (item, e) {
                        personnelSalaryEdit('Add', this.up('window').down('#PS_frmPSP'))
                    }
                }
            }
        }, {
            id: "PS_btnPSalC",
            iconCls: "#Tick",
            text: "تایید فیش",
            listeners: {
                click: {
                    fn: function (item, e) {
                        personnelSalaryConfirm(this.up('window'), personnelID)
                    }
                }
            }
        }, {
            id: "PS_btnPSalRecalc",
            iconCls: "#Calculator",
            text: "محاسبه مجدد",
            listeners: {
                click: {
                    fn: function (item, e) {
                        personnelSalaryCalculation(this.up('window').down('#cmbSalary_Type'))
                    }
                }
            }
        }],
        listeners: {
            close: {
                fn: function () {

                    parent.body.unmask();

                }
            }
        },
        closeAction: "destroy",
        title: " فیش پرسنل( " + personnelName + ')',
        iconCls: "#UserEdit"
    })

    this.show = function () {
        parent.body.mask();
        this.window.show();

    }

    this.close = function () {

        parent.body.unmask();
        this.window.close();
    }

    function getPersonnelSalaryInfo(grid) {

        me.mode = 'Edit'
        var win = grid.up('window')
        var mask = showMask(win, 'در حال بارگذاری...', true)
        var id = getValueGrid(grid, 'ID');

        var status = getValueGrid(grid, 'Status');
        if (status == 8) {
            Ext.Array.forEach(grid.next('panel').down('form').query('field'), function (field) {
                field.setReadOnly(true)
            })

            win.down('#PS_btnPSalS').hide()
            win.down('#PS_btnPSalC').setText('برگشت از تایید')
        }
        else {
            me.mode = 'Edit'
            win.down('#PS_btnPSalS').show()
            win.down('#PS_btnPSalC').setText('تایید فیش')
            Ext.Array.forEach(grid.next('panel').down('form').query('field'), function (field) {
                field.setReadOnly(false)
            })
        }

        var gridSalPerItems = win.down('#gridSalPerItems')
        win.down('#ddlSalaryYear').setValue(getValueGrid(grid, 'Year'))
        win.down('#ddlSalaryMonth').setValue(getValueGrid(grid, 'Month'))
        win.down('#cmbSalary_Type').setValue(getValueGrid(grid, 'SalaryTypeID'))
        execSPSelect('B1YrUuA19r/YyQB2GWQPhp80rJzwZh1J0K3jaRfC9Y8='/*-*/, { CompanyID: companyID, ID: id, SalaryTypeID: grid.up('window').down('#cmbSalary_Type').value }, null, null /*grid.next('panel')*/, null, function (PSInfo) {


            //grid.store.loadData([])
            gridSalPerItems.store.loadData(PSInfo)
            mask.unmask();
        })

    }

    function personnelSalaryConfirm(win, personnelID) {

        var mask = showMask(win, 'در حال تایید نهایی...', true);
        var grid = win.down('grid')
        var id = getValueGrid(grid, 'ID');
        if (!id)
            return
        var status = getValueGrid(grid, 'Status');
        status = status == 8 ? 0 : 8;
        var row = getSelectedRowGrid(grid)
        row.data.Status = status

        execSPUpdate('HX/gwH5uTX0qdd/VR2UDXMkyswG04EslRGkoZbiECYY='/*SPF_ConfirmPersonnelSalary*/, null, { CompanyID: companyID, PersonnelID: personnelID, ID: id, Status: status }, mask, false, true, false,
            function () {
                // getPersonnelSalarys(grid, 12/*personnelID*/)
                getPersonnelSalaryInfo(grid)
            })


    }
    function newPersonnelSalary(grid) {

        me.mode = 'Add'
        var pDate = new persianDate();
        var win = grid.up('window')
        var form = win.down('#PSal_frmPSI')
        var gridItems = win.down('#gridSalPerItems')
        form.reset();
        form.getComponent('ddlSalaryYear').setValue(getYear(true))
        form.getComponent('ddlSalaryMonth').setValue(getMonth(true))
        gridItems.store.loadData([])
        Ext.Array.forEach(form.query('field'), function (field) {
            field.setReadOnly(false)
        })
        win.down('#PS_btnPSalS').show()
        win.down('#PS_btnPSalC').hide()
    }
    function personnelSalaryEdit(mode, ctrl) {

        me.mode = mode == 'Delete' ? 'Delete' : me.mode
        if (me.mode == 'Add') {
            if (ctrl.isValid()) {
                var win = ctrl.up('window')
                var mask = showMask(win, 'در حال ذخیره...', true);
                var gridItems = win.down('#gridSPItems')
                var items = []

                gridItems.store.data.items.forEach(function (item) { items.push({ TypeInstanceItemID: item.data.ID, ItemID: item.data.ItemID, ConfirmValue: item.data.Value }) })
                execSPInsert('H2THoNP90OJKB0rcRAu8bhJKK0QDwdgN/bvyQh+TJBs='/*SPH_SalaryPersonnelUpdate*/, false, false, ctrl, { Items: Ext.JSON.encode(items), CompanyID: companyID, PersonnelID: personnelID, Status: 0, Year: persianDate().year(), CloseDate: dateToNumber(ctrl.getComponent('txtSalary_EndDate').value) }, mask, false,
                    function () {
                        getPersonnelSalarys(ctrl.up('window').down('grid'), personnelID)
                        var btnPSC = win.down('#PS_btnPSalC')
                        btnPSC.show()
                        btnPSC.setText('تایید فیش')
                    })
            }
        }
        else if (me.mode == 'Edit') {
            var win = ctrl.up('window')
            var mask = showMask(win, 'در حال ذخیره...', true);
            var id = getValueGrid(win.down('grid'), 'ID');
            var gridItems = win.down('#gridSPItems')
            var items = []
            gridItems.store.data.items.forEach(function (item) {
                //if (item.previousValues && item.previousValues.Value && item.previousValues.Value !== item.data.Value)
                items.push({ PersonnelSalaryID: id, TypeInstanceItemID: item.data.ID, ItemID: item.data.ItemID, ConfirmValue: item.data.Value })
            })

            execSPUpdate('H2THoNP90OJKB0rcRAu8bhJKK0QDwdgN/bvyQh+TJBs='/*SPH_SalaryPersonnelUpdate*/, ctrl, { Items: Ext.JSON.encode(items), CompanyID: companyID, PersonnelID: personnelID, ID: id }, mask, false, false, false,
                function () {
                    //getPersonnelSalarys(ctrl.up('window').down('grid'), 12/*personnelID*/)
                })

        }
        else if (me.mode == 'Delete') {
            var spID = getValueGrid(ctrl, 'ID');
            if (spID) {

                confirmMsg(' حذف عامل ', 'ایا مطمئن هستید ؟', function (btn) {
                    if (btn == 'yes') {
                        var status = getValueGrid(ctrl, 'Status');
                        if (status !== 8) {
                            var mask = showMask(ctrl, 'در حال حذف...', false);
                            execSPDelete('5rwbVFvy+Aax9qTtUlhZb4evm1iKYEvDRGjoOaLZibE='/*SPF_SalaryPersonnelUpdate*/, { CompanyID: companyID, ID: spID }, mask,
                                function () {
                                    getPersonnelSalary(ctrl, personnelID)
                                    var win = ctrl.up('window')
                                    var gridItems = win.down('#gridSalPerItems')
                                    gridItems.store.loadData([])
                                })
                        }
                        else {
                            Ext.Msg.info({ ui: 'danger', title: 'حذف فیش', html: 'فیش تایید شده قابل حذف نمیباشد', iconCls: '#Exclamation' });
                        }
                    }

                });
            }

        }

    }

    function personnelSalaryCalculation(ddlSalaryType) {

        var win = ddlSalaryType.up('window')
        var mask = showMask(win, 'در حال محاسبه...', true)

        var date = ddlSalaryType.prev('#ddlSalaryYear').value + ddlSalaryType.prev('#ddlSalaryMonth').value

        execSPInsert('ha+/yKdfgIFvAaBpvMNyJ2WN19tt/Wgwi+Y+ydYDEkM='/*SPF_PersonnelSalaryCalculation*/, false, false, null,
            { SalaryType: ddlSalaryType.value, CompanyID: companyID, PersonnelID: personnelID, Date: parseInt(date) }, mask, false,
            function () {

                var gridPersonnelSalary = win.down('#gridPersonnelSalary')
                getPersonnelSalary(gridPersonnelSalary, personnelID)

                var btnPSC = win.down('#PS_btnPSalC')
                btnPSC.show()
                btnPSC.setText('تایید فیش')
                Ext.Msg.info({ ui: 'success', title: 'محاسبه', html: 'محاسبه حقوق با موفقیت انجام شد', iconCls: '#Accept' });
                //getPersonnelSalaryInfo(gridPersonnelSalary)
            })
    }
};

function PersonnelInputFormItemModalWindow(parent, inputFormObj, editMode) {

    me = this;


    //this.form = new Ext.form.FormPanel({
    this.form = new Ext.form.FormPanel({
        id: "formInputFormItem",
        "autoHeight": true,
        frame: true,
        xtype: "form",
        items: [{
            id: "tagPIFI_Personnel",
            xtype: "nettagfield",
            colspan: 2,
            fieldLabel: "انتخاب پرسنل",
            emptyText: "جستجو",
            queryDelay: 1000,
            queryMode: "local",
            multiSelect: true,
            listeners: {
                focus: {
                    fn: function (item) {
                        setCurrentSelectUser(this)
                    }
                },
                beforequery: {
                    fn: userSearch
                }
            },
            hideSelected: true
        }, {
            id: "tagIFI_Item",
            tabIndex: 1,
            xtype: "combobox",
            colspan: 2,
            fieldLabel: "انتخاب عامل",
            queryMode: "local",
            store: [],
            listeners: {
                afterrender: {
                    fn: function (item) {
                        getInputFormItems(this)
                    }
                }
            }
        }, {
            id: "txtPIFI_Value",
            xtype: "textfield",
            colspan: 2,
            fieldLabel: "مبلغ",
            enableKeyEvents: true,
            maskRe: /[0-9-]/,
            listeners: {
                keyup: {
                    fn: function (item, e) {
                        this.setValue(digitGrouping(this.value.split(',').join('')))
                    }
                }
            }
        }, {
            id: "ddlPIFI_IssueYear",
            xtype: "combobox",
            fieldLabel: "سال صدور",
            editable: false,
            queryMode: "local",
            store: getYears()
        }, {
            id: "ddlPIFI_IssueMonth",
            xtype: "combobox",
            fieldLabel: "ماه صدور",
            editable: false,
            queryMode: "local",
            store: getMonths()
        }, {
            id: "ddlPIFI_ExecuteYear",
            xtype: "combobox",
            fieldLabel: "سال اجرا",
            queryMode: "local",
            editable: false,
            store: getYears()
        }, {
            id: "ddlPIFI_ExecuteMonth",
            xtype: "combobox",
            fieldLabel: "ماه اجرا",
            editable: false,
            queryMode: "local",
            store: getMonths()
        }, {
            id: "ddlPIFI_EndYear",
            xtype: "combobox",
            fieldLabel: "سال پایان",
            editable: false,
            queryMode: "local",
            store: getYears()
        }, {
            id: "ddlPIFI_EndMonth",
            xtype: "combobox",
            fieldLabel: "ماه پایان",
            editable: false,
            queryMode: "local",
            store: getMonths()
        }, {
            id: "txtPIFI_Desc",
            height: 50,
            xtype: "textareafield",
            colspan: 2,
            allowBlank: true,
            fieldLabel: "توضیحات"
        }],
        layout: {
            type: "table",
            itemCls: "width-full",
            columns: 2
        },
        header: false,

        fieldDefaults: {
            labelAlign: "top",
            msgTarget: "side",
            allowBlank: false,
            blankText: "این فیلد باید پر باشد"
        }
    }),

        this.window = new Ext.window.Window({

            id: "WinInputFormItem",
            height: 460,
            rtl: true,
            renderTo: parent.getEl(),
            width: 350,
            keyMap: {
                binding: {
                    handler: function () {
                        SaveSalaryItem(this)
                    },
                    key: [13]
                }
            },
            resizable: false,
            items: [me.form],
            layout: {
                type: "fit",
                itemCls: "width-full"
            },
            buttons: [{

                handler: function () {
                    me.close()
                },
                iconCls: "#Cancel",
                text: "انصراف"
            }, {

                handler: function () {
                    me.save()
                },
                iconCls: "#Disk",
                text: "ذخیره"
            }],
            listeners: {
                close: {
                    fn: function () {

                        parent.body.unmask();

                    }
                }
            },
            closeAction: "destroy",
            title: "پرداخت و کسور",
            iconCls: "#MoneyDollar",
            maximizable: false
        })

    this.show = function () {

        if (editMode == 'Edit') {
            var mask = showMask(me.form, 'درحال بارگذاری...', false);
            setTimeout(function () {
                var inputForm = inputFormObj
                me.form.getComponent('ddlPIFI_IssueYear').setValue(inputForm.IssueDate.toString().substr(0, 4))
                me.form.getComponent('ddlPIFI_IssueMonth').setValue(inputForm.IssueDate.toString().substr(5, 2))
                me.form.getComponent('ddlPIFI_ExecuteYear').setValue(inputForm.ExecuteDate.toString().substr(0, 4))
                me.form.getComponent('ddlPIFI_ExecuteMonth').setValue(inputForm.ExecuteDate.toString().substr(5, 2))
                me.form.getComponent('ddlPIFI_EndYear').setValue(inputForm.CloseDate.toString().substr(0, 4))
                me.form.getComponent('ddlPIFI_EndMonth').setValue(inputForm.CloseDate.toString().substr(5, 2))
                me.form.getComponent('tagPIFI_Personnel').addTag({ value: inputForm.PersonnelID, text: inputForm.FullName, closable: false })
                me.form.getComponent('tagIFI_Item').setValue(inputForm.ItemID)
                me.form.getComponent('txtPIFI_Desc').setValue(inputForm.Dsc)
                me.form.getComponent('txtPIFI_Value').setValue(digitGrouping(inputForm.Value))

                mask.unmask()

            }, 300);


        }
        else {
            me.form.getComponent('ddlPIFI_IssueYear').setValue(getYear(true))
            me.form.getComponent('ddlPIFI_IssueMonth').setValue(getMonth(true))
            me.form.getComponent('ddlPIFI_ExecuteYear').setValue(getYear(true))
            me.form.getComponent('ddlPIFI_ExecuteMonth').setValue(getMonth(true))
            me.form.getComponent('ddlPIFI_EndYear').setValue(getYear(true))
            me.form.getComponent('ddlPIFI_EndMonth').setValue(getMonth(true))
        }
        parent.body.mask();
        this.window.show();
    }

    this.close = function () {

        parent.body.unmask();
        this.window.close();
    }

    this.save = function () {

        if (me.form.isValid()) {

            var issueDate = parseInt(me.form.getComponent('ddlPIFI_IssueYear').getValue() + me.form.getComponent('ddlPIFI_IssueMonth').getValue())
            var executeDate = parseInt(me.form.getComponent('ddlPIFI_ExecuteYear').getValue() + me.form.getComponent('ddlPIFI_ExecuteMonth').getValue())
            if (executeDate < issueDate) {

                confirmMsg(' معوقه ', 'اگر تاریخ اجرا قبل از تاریخ صدور باشد برای این پرسنل معوقه محاسبه میشود. ایا مطمئن هستید ؟', function (btn) {
                    if (btn == 'yes') {
                        save()
                    }

                });
            }
            else
                save()

            function save() {
                if (editMode == 'Edit') {
                    var mask = showMask(me.window, 'در حال ویرایش...', true)
                    var item = {
                        ID: inputFormObj.ID,
                        PersonnelID: item,
                        CompanyID: companyID,
                        ItemID: me.form.getComponent('tagIFI_Item').getValue(),
                        IssueDate: issueDate,
                        ExecuteDate: executeDate,
                        EndDate: parseInt(me.form.getComponent('ddlPIFI_EndYear').getValue() + me.form.getComponent('ddlPIFI_EndMonth').getValue()),
                        CloseDate: parseInt(me.form.getComponent('ddlPIFI_EndYear').getValue() + me.form.getComponent('ddlPIFI_EndMonth').getValue()),
                        Dsc: me.form.getComponent('txtPIFI_Desc').getValue(),
                        Value: me.form.getComponent('txtPIFI_Value').getValue().split(',').join('')
                    }

                    execSPUpdate('WZ++bjklNUJaKcAeq9jZGPaUnNUNwkaUA5txTbqdCck='/*SPF_InputFormItemValueUpdate*/, null, item,
                        mask, false, true, false,
                        function () {
                            personnelInputFormItemsSearch(parent.down('form'), 1)
                            me.close()
                        })
                }
                else {
                    var mask = showMask(me.window, 'در حال ذخیره...', true)
                    var items = []
                    var personnels = me.form.getComponent('tagPIFI_Personnel').tagLabel.tags
                    if (Ext.isArray(personnels) && personnels.length > 0) {

                        personnels.forEach(function (item) {

                            items.push({
                                PersonnelID: item.value,
                                CompanyID: companyID,
                                ItemID: me.form.getComponent('tagIFI_Item').getValue(),
                                IssueDate: parseInt(me.form.getComponent('ddlPIFI_IssueYear').getValue() + me.form.getComponent('ddlPIFI_IssueMonth').getValue()),
                                ExecuteDate: parseInt(me.form.getComponent('ddlPIFI_ExecuteYear').getValue() + me.form.getComponent('ddlPIFI_ExecuteMonth').getValue()),
                                EndDate: parseInt(me.form.getComponent('ddlPIFI_EndYear').getValue() + me.form.getComponent('ddlPIFI_EndMonth').getValue()),
                                CloseDate: parseInt(me.form.getComponent('ddlPIFI_EndYear').getValue() + me.form.getComponent('ddlPIFI_EndMonth').getValue()),
                                Dsc: me.form.getComponent('txtPIFI_Desc').getValue(),
                                Value: parseInt(me.form.getComponent('txtPIFI_Value').getValue().split(',').join(''))
                            })
                        })

                    }


                    execSPInsert('WZ++bjklNUJaKcAeq9jZGPaUnNUNwkaUA5txTbqdCck='/*SPF_InputFormItemValueUpdate*/, false, false, null, items, mask, false,
                        function () {
                            personnelInputFormItemsSearch(parent.down('form'), 1)
                            me.close()

                        })
                }
            }
        }
    }
}


function PresenceCodeModalWindow(parent, codeID, editMode) {

    me = this;


    //this.form = new Ext.form.FormPanel({
    this.form = new Ext.form.FormPanel({
        id: "formPresenceCode",
        "autoHeight": true,
        frame: true,
        xtype: "form",
        autoScroll: true,
        items: [{
            xtype: "fieldset",
            flex: 1,
            collapsible: true,
            defaults: {
                "labelWidth": 30
            },
            items: [{
                id: "Codes_Code",
                margin: 5,
                width: 100,
                xtype: "textfield",
                fieldLabel: "کد",
                labelAlign: "right",
                readOnly: true,
                validateOnFocusLeave: true
            }, {
                id: "Codes_WorkType",
                margin: 8,
                xtype: "combobox",
                fieldLabel: "نوع حضور",
                labelAlign: "right",
                labelWidth: 70,
                validateOnFocusLeave: true,
                editable: false,
                allowBlank: false,
                blankText: ".این فیلد باید پر باشد",
                selectedItems: [{
                    value: "1"
                }],
                queryMode: "local",
                store: [
                    ["1", "حضور عادي"],
                    ["5", "روز تعطيل و حضور دلخواه"],
                    ["10", "شبكار"],
                    ["11", "ورود از شيفت 24"],
                    ["12", "خروج از شيفت 24"],
                    ["13", "شيفت"],
                    ["20", "حذف كارت"]
                ]
            }, {
                id: "Codes_Title",
                xtype: "textfield",
                colspan: 2,
                fieldLabel: "عنوان",
                labelAlign: "right",
                validateOnFocusLeave: true,
                allowBlank: false,
                blankText: ".این فیلد باید پر باشد"
            }],
            layout: {
                type: "table",
                itemCls: "width-full",
                columns: 2
            }
        }, {
            xtype: "fieldset",
            flex: 1,
            defaults: {
                "allowBlank": false,
                "blankText": '.این فیلد باید پر باشد',
                "labelWidth": 30,
                "margin": 10,
                "width": 100,
                "inputWrapCls": "time-width x-form-text-wrap-default"
            },
            items: [{
                id: "Codes_StartRealTime",
                xtype: "textfield",
                fieldLabel: "ساعت شروع",
                validateOnFocusLeave: true,
                inputMask: "99:99"
            }, {
                id: "Codes_EndRealTime",
                xtype: "textfield",
                fieldLabel: "ساعت پایان",
                validateOnFocusLeave: true,
                inputMask: "99:99"
            }, {
                id: "Codes_FloatTime",
                xtype: "textfield",
                fieldLabel: "شناوری",
                inputMask: "99:99",
                allowBlank: true,

            }],
            layout: {
                type: "table",
                itemCls: "width-full",
                columns: 4
            },
            collapsible: true,
            title: "حضور عادی"
        }, {
            xtype: "fieldset",
            flex: 1,
            defaults: {
                "labelWidth": 30,
                "margin": 10,
                "width": 100,
                "fieldStyle": "text-align:center",
                "inputWrapCls": "time-width x-form-text-wrap-default"
            },
            items: [{
                id: "Codes_StartExtraTime",
                xtype: "textfield",
                fieldLabel: "ساعت شروع",
                validateOnFocusLeave: true,
                inputMask: "99:99"
            }, {
                id: "Codes_EndExtraTime",
                xtype: "textfield",
                fieldLabel: "ساعت پایان",
                validateOnFocusLeave: true,
                inputMask: "99:99"
            }, {
                id: "Codes_MaxExtraTime",
                xtype: "textfield",
                fieldLabel: "سقف اضافه کار",
                validateOnFocusLeave: true,
                inputMask: "99:99"
            }, {
                id: "Codes_MinExtraTime",
                xtype: "textfield",
                fieldLabel: "حداقل اضافه کار",
                validateOnFocusLeave: true,
                inputMask: "99:99"
            }],
            layout: {
                type: "table",
                itemCls: "width-full",
                columns: 4
            },
            collapsible: true,
            title: "اضافه کار عادی"
        }, {
            xtype: "fieldset",
            flex: 1,
            defaults: {
                "labelWidth": 30,
                "margin": 10,
                "width": 100,
                "fieldStyle": "text-align:center",
                "inputWrapCls": "time-width x-form-text-wrap-default"
            },
            items: [{
                id: "Codes_StartLicExtraTime",
                xtype: "textfield",
                fieldLabel: "ساعت شروع",
                validateOnFocusLeave: true,
                inputMask: "99:99"
            }, {
                id: "Codes_EndLicExtraTime",
                xtype: "textfield",
                fieldLabel: "ساعت پایان",
                validateOnFocusLeave: true,
                inputMask: "99:99"
            }, {
                id: "Codes_MaxLicExtraTime",
                xtype: "textfield",
                fieldLabel: "سقف اضافه کار",
                validateOnFocusLeave: true,
                inputMask: "99:99"
            }, {
                id: "Codes_MinLicExtraTime",
                xtype: "textfield",
                fieldLabel: "حداقل اضافه کار",
                validateOnFocusLeave: true,
                inputMask: "99:99"
            }],
            layout: {
                type: "table",
                itemCls: "width-full",
                columns: 4
            },
            collapsible: true,
            title: "اضافه کار با مجوز"
        }, {
            xtype: "fieldset",
            flex: 1,
            defaults: {
                "margin": 10,
                "width": 100,
                "fieldStyle": "text-align:center",
                "inputWrapCls": "time-width x-form-text-wrap-default"
            },
            items: [{
                id: "Codes_StartLunchTime",
                xtype: "textfield",
                fieldLabel: "ساعت شروع",
                validateOnFocusLeave: true,
                inputMask: "99:99"
            }, {
                id: "Codes_EndLunchTime",
                xtype: "textfield",
                fieldLabel: "ساعت پایان",
                validateOnFocusLeave: true,
                inputMask: "99:99"
            }, {
                id: "Codes_IsLunchOvertime",
                width: 250,
                xtype: "checkboxfield",
                colspan: 2,
                labelAlign: "right",
                labelWidth: 200,
                validateOnFocusLeave: true,
                boxLabel: "حضور در زمان نهار مشمول اضافه کار ی باشد؟",
                inputValue: "App.Codes_IsLunchOvertime"
            }],
            layout: {
                type: "table",
                itemCls: "width-full",
                columns: 4
            },
            collapsible: true,
            collapsed: true,
            title: "نهار،نماز و استراحت"
        }, {
            xtype: "fieldset",
            flex: 1,
            defaults: {
                "margin": 10,
                "width": 100,
                "fieldStyle": "text-align:center",
                "inputWrapCls": "time-width x-form-text-wrap-default"
            },
            items: [{
                id: "Codes_StartNightTime",
                xtype: "textfield",
                fieldLabel: "ساعت شروع",
                validateOnFocusLeave: true,
                value: "22:00",
                inputMask: "99:99"
            }, {
                id: "Codes_EndNightTime",
                xtype: "textfield",
                fieldLabel: "ساعت پایان",
                validateOnFocusLeave: true,
                value: "06:00",
                inputMask: "99:99"
            }, {
                id: "Codes_IsLicNightWork",
                width: 200,
                xtype: "checkboxfield",
                colspan: 2,
                labelAlign: "right",
                labelWidth: 150,
                validateOnFocusLeave: true,
                boxLabel: "شبکاری نیاز به مجوز دارد؟",
                inputValue: "App.Codes_IsLicNightWork"
            }],
            layout: {
                type: "table",
                itemCls: "width-full",
                columns: 4
            },
            collapsible: true,
            collapsed: true,
            title: "شب کاری"
        }, {
            xtype: "fieldset",
            flex: 1,
            defaults: {
                "margin": 10,
                "width": 100,
                "fieldStyle": "text-align:center",
                "inputWrapCls": "time-width x-form-text-wrap-default"
            },
            items: [{
                id: "Codes_EnterFlexibleTime",
                xtype: "textfield",
                fieldLabel: "ارفاق در ورود",
                validateOnFocusLeave: true,
                inputMask: "99:99"
            }, {
                id: "Codes_ExitFlexibleTime",
                xtype: "textfield",
                fieldLabel: "ارفاق در خروج",
                validateOnFocusLeave: true,
                inputMask: "99:99"
            }, {
                id: "Codes_EnterFlexibleDeduction",
                width: 250,
                xtype: "checkboxfield",
                colspan: 2,
                labelAlign: "right",
                labelWidth: 200,
                validateOnFocusLeave: true,
                boxLabel: "ارفاق در ورود مشمول کسرکار نباشد",
                inputValue: "App.Codes_EnterFlexibleDeduction"
            }],
            layout: {
                type: "table",
                itemCls: "width-full",
                columns: 4
            },
            collapsible: true,
            collapsed: true,
            title: "ارفاق"
        }, {
            xtype: "fieldset",
            flex: 1,
            defaults: {
                "margin": 10,
                "labelWidth": 200,
                "boxLabelAlign": "After",
                "width": "250",
                "labelAlign": "Right"
            },
            items: [{
                id: "Codes_IsNotDailyVacation",
                xtype: "checkboxfield",
                validateOnFocusLeave: true,
                boxLabel: "امکان ثبت مرخصی روزانه نداشته باشد",
                inputValue: "App.Codes_IsNotDailyVacation"
            }, {
                id: "Codes_IsLicExtraHourMission",
                xtype: "checkboxfield",
                validateOnFocusLeave: true,
                boxLabel: "ماموریت ساعتی نیاز به مجوز دارد؟",
                inputValue: "App.Codes_IsLicExtraHourMission"
            }],
            layout: {
                type: "table",
                itemCls: "width-full",
                columns: 2
            },
            collapsible: true,
            collapsed: true,
            title: "مرخصی/ماموریت"
        }, {
            xtype: "fieldset",
            flex: 1,
            items: [{
                id: "Codes_Dsc",
                xtype: "textareafield",
                margin: 5
            }],
            layout: {
                type: "fit"
            },
            collapsible: true,
            collapsed: true,
            title: "توضیحات"
        }],
        layout: {
            type: "table",
            itemCls: "width-full",
            columns: 1
        },
        header: false,
        fieldDefaults: {
            labelAlign: "top"
        }
    }),

        this.window = new Ext.window.Window({
            id: "PresenceCodeWindow",
            height: 650,
            rtl: true,
            renderTo: parent.getEl(),
            width: 600,
            keyMap: {
                "ENTER": function () {
                    me.save()
                }
            },
            autoScroll: true,
            items: [me.form],
            layout: {
                type: "fit",
                itemCls: "width-full"
            },
            buttons: [{
                id: "ctl45",
                handler: function () {
                    this.up('window').close()
                },
                iconCls: "#Cancel",
                text: "انصراف"
            }, {
                id: "btnSPC",
                handler: function () {
                    // SavePresenceCode(this.priv())
                    me.save()
                },
                iconCls: "#Disk",
                text: "ذخیره"
            }],
            listeners: {
                close: {
                    fn: function () {

                        parent.body.unmask();

                    }
                }
            },
            closeAction: "destroy",
            title: "کد حضور",
            iconCls: "#CalendarViewDay",
            maximizable: false
        })

    this.show = function () {

        if (editMode == 'Edit') {


            var params = getParametersJson(me.form, null, null, null, { CompanyID: companyID, ID: codeID }, null, null)
            execSPSelect('coCZGixrP8ffg39Npux9ma9cUqOcRWYd'/*SPA_GetPresenceCode*/, params, parent, me.form, null, function () {


            })

        }
        parent.body.mask();
        this.window.show();
    }

    this.close = function () {

        parent.body.unmask();
        this.window.close();
    }

    this.save = function () {


        if (me.form.isValid()) {

            if (editMode == 'Edit') {

                //execSPUpdate(spName, fillControl, extraData, mask, isTitle, forceUpdate, isResult, afterUpdateFn, msgConfig)
                var params = getParametersJson(me.form, null, null, null, { CompanyID: companyID, ID: codeID }, null, null, true)
                execSPUpdate('OD0gLczKqRC+ZJJKwHKEM9v1MbdCQDoa'/*SPA_PresenceCodeUpdate*/, null, params, parent, false, true, false,
                    function () {

                        me.close()
                        getPresenceCodes(parent)
                    })
            }
            else {
                var params = getParametersJson(me.form, null, null, null, null, { CompanyID: companyID }, null, true)
                execSPInsert('OD0gLczKqRC+ZJJKwHKEM9v1MbdCQDoa'/*SPA_PresenceCodeUpdate*/, false, false, null, params, parent, false,
                    function () {

                        me.close()
                        getPresenceCodes(parent)
                    })
            }

        }
    }
}


function ShiftModalWindow(parent, shiftID, editMode) {

    me = this;

    var shiftInfoTab = new Ext.form.FormPanel({
        id: "formShiftInfo",
        "autoHeight": true,
        frame: true,
        xtype: "form",
        autoScroll: true,
        items: [, {
            xtype: "fieldset",
            flex: 1,
            items: [{
                id: "Shift_Title",
                margin: 10,
                xtype: "textfield",
                colspan: 2,
                fieldLabel: "عنوان",
                labelWidth: 70,
                validateOnFocusLeave: true,
                allowBlank: false,
                blankText: ".این فیلد باید پر باشد"
            }, {
                id: "Shift_ShiftType",
                margin: 8,
                xtype: "combobox",
                fieldLabel: "نوع نوبت کاری",
                labelAlign: "right",
                labelWidth: 80,
                validateOnFocusLeave: true,
                editable: false,
                selectedItems: [{
                    value: "1"
                }],
                queryMode: "local",
                store: [
                    ["1", "عادی"],
                    ["10", "10 درصد"],
                    ["15", "15 درصد"],
                    ["22", "22.5 درصد"],
                    ["35", "35 درصد"]
                ]
            }, {
                id: "Shift_IsBaseShift",
                margin: 10,
                xtype: "checkboxfield",
                labelAlign: "right",
                validateOnFocusLeave: true,
                boxLabel: "شیفت پایه",
                inputValue: "App.Shift_IsBaseShift"
            }],
            layout: {
                type: "table",
                itemCls: "width-full",
                columns: 2
            }
        }, {
                xtype: "fieldset",
                flex: 1,
                defaults: {
                    "margin": 10,
                    "inputWrapCls": "time-width x-form-text-wrap-default"
                },
                items: [{
                    id: "Shift_MaxExtraTime",
                    xtype: "textfield",
                    fieldLabel: "حداکثر اضافه کار",
                    validateOnFocusLeave: true,
                    inputMask: "999:99"
                }, {
                    id: "Shift_MinExtraTime",
                    xtype: "textfield",
                    fieldLabel: "حداقل اضافه کار",
                    validateOnFocusLeave: true,
                    inputMask: "999:99"
                }],
                layout: {
                    type: "table",
                    itemCls: "width-full",
                    columns: 2
                },
                collapsible: true,
                title: " اضافه کار"
            }, {
                xtype: "fieldset",
                flex: 1,
                defaults: {
                    "margin": 10,
                    "inputWrapCls": "time-width-icon x-form-text-wrap-default"
                },
                items: [{
                    id: "Shift_DelayTime",
                    xtype: "textfield",
                    fieldLabel: "تاخیر مجاز ",
                    validateOnFocusLeave: true,
                    leftButtons: [{
                        id: "ctl13",
                        iconCls: "#Help",
                        tooltip: "این میزان بطور اتوماتیک از تاخیر فرد در ماه بخشوده خواهد شد."
                    }],
                    inputMask: "999:99"
                }, {
                    id: "Shift_EarlyTime",
                    xtype: "textfield",
                    fieldLabel: "تعجیل مجاز",
                    validateOnFocusLeave: true,
                    leftButtons: [{
                       
                        iconCls: "#Help",
                        tooltip: "این میزان بطور اتوماتیک از تعجیل فرد در ماه بخشوده خواهد شد."
                    }],
                    inputMask: "999:99"
                }, {
                    id: "Shift_DeductionTime",
                    xtype: "textfield",
                    fieldLabel: "کسرکار مجاز",
                    validateOnFocusLeave: true,
                    leftButtons: [{
                       
                        iconCls: "#Help",
                        tooltip: "این میزان بطور اتوماتیک از کسرکار فرد در ماه بخشوده خواهد شد."
                    }],
                    inputMask: "999:99"
                }],
                layout: {
                    type: "table",
                    itemCls: "width-full",
                    columns: 2
                },
                collapsible: true,
                title: "کسرکار"
            }, {
                xtype: "fieldset",
                flex: 1,
                id: "Shift_IsHourly",
                defaults: {
                    "margin": 10,
                    "inputWrapCls": "time-width-icon x-form-text-wrap-default"
                },
                items: [{
                    id: "Shift_MinHourlyTime",
                    xtype: "textfield",
                    fieldLabel: "حداقل ساعت کارکرد",
                    labelWidth: 150,
                    validateOnFocusLeave: true,
                    leftButtons: [{
                      
                        iconCls: "#Help"
                    }],
                    inputMask: "999:99"
                }, {
                    id: "Shift_IsDynamicWork",
                    xtype: "checkboxfield",
                    labelAlign: "right",
                    validateOnFocusLeave: true,
                    boxLabel: "حضور پویا",
                    inputValue: "App.Shift_IsDynamicWork"
                }],
                layout: {
                    type: "table",
                    itemCls: "width-full",
                    columns: 2
                },
                checkboxName: "Shift_IsHourly5",
                checkboxToggle: true,
                collapsed: true,
                collapsible: true,
                title: "محاسبه کارکرد خالص(مخصوص کارکنان ساعتی)"
            }, {
                xtype: "fieldset",
                flex: 1,
                items: [{
                    id: "Shift_Dsc",
                    padding: 5,
                    xtype: "textareafield",
                    validateOnFocusLeave: true
                }],
                layout: "fit",
                title: "توضیحات"
            }],
        layout: {
            type: "table",
            itemCls: "width-full",
            columns: 1
        },
        buttons: [{
           
            handler: function () {

                saveShiftInfo();
            },
            iconCls: "#Disk",
            text: "ذخیره"
        }],
        header: false,
        title: "اطلاعات شیفت",
        iconCls: "#CalendarEdit",
       
        fieldDefaults: {
            labelAlign: "right"
        }
    })

   

    var shiftCalendarTab = new createShiftCalendar(null, shiftID, 'shiftCalendar', false, getPresenceCodeTitle)
    var personnelSelectTab = new PersonnelSelectPanel(null, 'اختصاص پرسنل به شیفت', [{

        handler: function () {
            personnelAllocation()
        },
        iconCls: "#Disk",
        text: "ذخیره"
    }])
    
    

    this.tab = new Ext.tab.Panel({
        id: "TabShiftInfo",
        height: 250,
        width: 600,
        xtype: "tabpanel",
        items: [shiftInfoTab,
            shiftCalendarTab,
            personnelSelectTab],
        layout: "fit",
        bodyPadding: 1,
        activeTab: 0
    }),

    this.window = new Ext.window.Window({
            id: "ShiftWindow",
            height: 650,
            rtl: true,
            renderTo: parent.getEl(),
            width: 1000,
            autoScroll: true,
            items: [this.tab],
            layout: {
                type: "fit",
                itemCls: "width-full"
            },
            buttons: [{

                handler: function () {
                    this.up('window').close()
                },
                iconCls: "#Cancel",
                text: "انصراف"
            }],
            listeners: {
                close: {
                    fn: function () {

                        parent.unmask();
                        
                    }
                }
            },
            closeAction: "destroy",
            title: "شیفت",
            iconCls: "#CalendarViewDay",
            maximizable: false
        })

    this.show = function () {

        if (editMode == 'Edit') {


            var params = getParametersJson(shiftInfoTab, null, null, null, { CompanyID: companyID, ID: shiftID }, null, null)
            execSPSelect('AB+RdWrWf4rTJYVPBSAI0qxh8tdr9NFN'/*SPA_GetShiftInfo*/, params, shiftInfoTab, null, null, function (items) {

                setJsonToFields(shiftInfoTab, 'field', items.Table1[0]);
                personnelSelectTab.selectedPersonnelGrid.store.loadData(items.Table2)
            })

        }
        else {

            shiftCalendarTab.setDisabled(true)
            personnelSelectTab.setDisabled(true)
        }
        parent.mask();
        this.window.show();
    }

    this.close = function () {

        parent.unmask();
        this.window.close();
    }

    function saveShiftInfo(){


        if (shiftInfoTab.isValid()) {

            if (editMode == 'Edit') {

                //execSPUpdate(spName, fillControl, extraData, mask, isTitle, forceUpdate, isResult, afterUpdateFn, msgConfig)
                var params = getParametersJson(shiftInfoTab, null, null, null, { CompanyID: companyID, ID: shiftID }, null, null, true)
                execSPUpdate('X7fR0G60+O4lWm/3QbxwFw=='/*SPA_ShiftUpdate*/, null, params, shiftInfoTab, false, true, false,
                    function () {

                        //me.close()
                        getShifts(parent)
                    })
            }
            else {
                
                var params = getParametersJson(shiftInfoTab, null, null, null, null, { CompanyID: companyID }, null, true)
                execSPInsert('X7fR0G60+O4lWm/3QbxwFw=='/*SPA_ShiftUpdate*/, true, false, null, params, shiftInfoTab, false,
                    function (sid) {
                        shiftID = sid
                        shiftCalendarTab.setDisabled(false)
                        personnelSelectTab.setDisabled(false)
                        getShifts(parent)
                       // me.close()
                        //getPresenceCodes(parent)
                    })
            }

        }
    }

    function personnelAllocation() {

        var ids = personnelSelectTab.selectedPersonnels().join(',')

        execSPUpdate('JluUtDJmj2TP5I8S7JJ9xUjy8OiRQjPADRgrLbn5RqU='/*SPA_PersonnelAllocationToShift*/, null,
            { CompanyID: companyID, ShiftID: shiftID, IDs: ids }, personnelSelectTab, false, true, false,
            function () {

                //me.close()
                getShifts(parent)
            })
    }
   
}
