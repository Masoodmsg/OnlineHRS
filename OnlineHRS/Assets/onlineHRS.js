Ext.net.ResourceMgr.load([{
    url: "/ux/taglabel/taglabel-js/ext.axd?v=4.6.0"
}, {
    url: "/ux/tabscrollermenu/TabScrollerMenu-merged-js/ext.axd?v=4.6.0"
}, {
    url: "/ux/clearbutton/clearbutton-js/ext.axd?v=4.6.0"
}, {
    url: "/ux/filterheader/filterheader-js/ext.axd?v=4.6.0"
}, {
    mode: "css",
    url: "/ux/resources/taglabel-embedded-css/ext.axd?v=4.6.0"
}, {
    mode: "css",
    url: "/ux/resources/tabscrollermenu-embedded-css/ext.axd?v=4.6.0"
}], function () {
    App.Desktop1.removeModule("registerationModule");
    App.Desktop1.removeModule("loginCompanyModule");
    Ext.net.InfoPanel.info({
        html: "2113",
        ui: "info",
        xtype: "infopanel",
        title: "زمان لاگین"
    });
    Ext.net.Desktop.addModule(Ext.create("Ext.ux.desktop.Module", {
        id: "CompanyManagementModule",
        shortcut: {
            "iconCls": "x-company-icon",
            "sortIndex": 1,
            "name": "مدیرت شرکت",
            "module": "CompanyManagementModule"
        }
    }));
    Ext.net.Desktop.getModule("CompanyManagementModule").addLauncher({
        xtype: "menuitem",
        iconCls: "#House",
        text: "مدیرت شرکت"
    });
    Ext.net.Desktop.getModule("CompanyManagementModule").addWindow(function () {
        Ext.net.ResourceMgr.destroyCmp("App.CompanyManagemenWindow");
        Ext.net.Desktop.getModule("CompanyManagementModule").setWindow({
            id: "CompanyManagemenWindow",
            autoRender: false,
            height: 550,
            rtl: true,
            width: 800,
            xtype: "window",
            keyMap: {
                "ENTER": editCompanyInfo
            },
            resizable: false,
            items: [{
                id: "TabPanelCompanyManagement",
                height: 250,
                width: 600,
                xtype: "tabpanel",
                items: [{
                    id: "tabCompanyInfo",
                    frame: true,
                    items: [{
                        id: "tabCompanyInfo1",
                        border: false,
                        style: "width:100%;padding-top:15px",
                        xtype: "form",
                        items: [{
                            id: "cmbPersonTypeCompanyManagement",
                            tabIndex: 1,
                            xtype: "combobox",
                            anchor: "-5",
                            fieldLabel: "نوع مودی",
                            validateOnFocusLeave: true,
                            editable: false,
                            queryMode: "local",
                            store: [
                                ["1", "حقیقی"],
                                ["2", "حقوقی"]
                            ],
                            listeners: {
                                select: {
                                    fn: function (item, records) {
                                        selectPersonTypeCompanyManagement()
                                    }
                                }
                            }
                        }, {
                            id: "cmbPersonLegalTypeCompanyManagement",
                            tabIndex: 2,
                            xtype: "combobox",
                            anchor: "100%",
                            fieldLabel: "نوع شخص حقوقی",
                            validateOnFocusLeave: true,
                            editable: false,
                            queryMode: "local",
                            store: [
                                ["1", "وزارت خانه"],
                                ["2", "موسسه دولتي"],
                                ["3", "شرکت دولتي"],
                                ["4", "سایر دستگاههاي دولتي"],
                                ["5", "نهادهاي عمومي غیردولتي"],
                                ["6", "بخش خصوصي"],
                                ["7", "سایر پرداخت کنندگان حقوق"]
                            ]
                        }, {
                            id: "txtNameCompanyManagement",
                            style: "width:99%;",
                            tabIndex: 3,
                            xtype: "textfield",
                            anchor: "-5",
                            colspan: 2,
                            fieldLabel: "نام شرکت",
                            fieldStyle: "text-align:center;font-weight:bold !important",
                            validateOnFocusLeave: true,
                            allowBlank: false,
                            blankText: ".این فیلد باید پر باشد"
                        }, {
                            id: "txtPostCodeCompanyManagement",
                            tabIndex: 5,
                            xtype: "textfield",
                            fieldLabel: "کد پستی",
                            validateOnFocusLeave: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9-]/,
                            maxLength: 10,
                            minLength: 10,
                            minLengthText: "این فیلد باید 10 رقم باشد"
                        }, {
                            id: "txtPhoneCompanyManagement",
                            tabIndex: 6,
                            xtype: "textfield",
                            fieldLabel: "تلفن",
                            validateOnFocusLeave: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9-]/,
                            maxLength: 11,
                            minLength: 11,
                            minLengthText: "تلفن باید 11 رقم باشد"
                        }, {
                            id: "txtEconomicCodeCompanyManagement",
                            tabIndex: 7,
                            xtype: "textfield",
                            fieldLabel: "کد اقتصادی (TIN)",
                            validateOnFocusLeave: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9-]/,
                            maxLength: 12,
                            minLength: 12,
                            minLengthText: "این فیلد باید 12 رقم باشد"
                        }, {
                            id: "txtTFNCompanyManagement",
                            tabIndex: 8,
                            xtype: "textfield",
                            fieldLabel: "شماره پرونده مالیاتی (TFN)",
                            validateOnFocusLeave: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9-]/,
                            maxLength: 12,
                            minLength: 12,
                            minLengthText: "این فیلد باید 12 رقم باشد"
                        }, {
                            id: "txtWorkshopCodeCompanyManagement",
                            tabIndex: 9,
                            xtype: "textfield",
                            fieldLabel: "کد کارگاه",
                            validateOnFocusLeave: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9-]/,
                            maxLength: 10,
                            minLength: 10,
                            minLengthText: "این فیلد باید 10 رقم باشد"
                        }, {
                            id: "txtEmailAddressCompanyManagement",
                            tabIndex: 10,
                            xtype: "textfield",
                            anchor: "-5",
                            fieldLabel: "آدرس الكترونيكى",
                            validateOnFocusLeave: true,
                            vtype: "email",
                            vtypeText: "فرمت ایمیل اشتباه است."
                        }, {
                            id: "txtAddressCompanyManagement",
                            style: "width:99%",
                            tabIndex: 11,
                            xtype: "textareafield",
                            colspan: 2,
                            fieldLabel: "آدرس",
                            validateOnFocusLeave: true
                        }],
                        layout: {
                            type: "table",
                            itemCls: "width-full",
                            columns: 2
                        },
                        bodyStyle: "background:#f1f1f1;",
                        url: unescape("%2fdefault.aspx"),
                        fieldDefaults: {
                            labelAlign: "top",
                            labelStyle: "color:#205a8c",
                            msgTarget: "side"
                        }
                    }],
                    layout: "table",
                    buttons: [{
                        id: "btnCompanyEdit1",
                        tabIndex: 12,
                        handler: editCompanyInfo,
                        iconCls: "#ApplicationEdit",
                        text: "ویرایش"
                    }],
                    title: "اطلاعات شرکت",
                    iconCls: "#HouseGo"
                }, {
                    id: "tabCompanyManagerInfo",
                    frame: true,
                    autoScroll: true,
                    items: [{
                        id: "tabCompanyManagerInfo1",
                        border: false,
                        style: "width:100%;padding-top:15px",
                        xtype: "form",
                        items: [{
                            id: "txtEmployerNameCompanyManagement",
                            tabIndex: 1,
                            xtype: "textfield",
                            anchor: "-5",
                            fieldLabel: "نام",
                            validateOnFocusLeave: true
                        }, {
                            id: "txtEmployerFamilyCompanyManagement",
                            tabIndex: 2,
                            xtype: "textfield",
                            anchor: "100%",
                            fieldLabel: "نام خانوادگی",
                            validateOnFocusLeave: true
                        }, {
                            id: "txtEmployerNationalCodeCompanyManagement",
                            tabIndex: 3,
                            xtype: "textfield",
                            fieldLabel: "کد ملی",
                            validateOnFocusLeave: true,
                            vtype: "isValidNationalCode",
                            vtypeText: ".کد ملی نامعتبر است",
                            allowBlank: false,
                            blankText: ".این فیلد باید پر باشد",
                            enforceMaxLength: true,
                            maskRe: /[0-9-]/,
                            maxLength: 10,
                            minLength: 10,
                            minLengthText: "این فیلد باید 10 رقم باشد"
                        }, {
                            id: "txtEmployerPostCompanyManagement",
                            tabIndex: 4,
                            xtype: "textfield",
                            fieldLabel: "سمت",
                            validateOnFocusLeave: true
                        }, {
                            id: "txtEmployerEmailCompanyManagement",
                            tabIndex: 5,
                            xtype: "textfield",
                            anchor: "-5",
                            fieldLabel: "آدرس الكترونيكى",
                            validateOnFocusLeave: true,
                            vtype: "email",
                            vtypeText: "فرمت ایمیل اشتباه است"
                        }, {
                            id: "txtEmployerMobileCompanyManagement",
                            tabIndex: 6,
                            xtype: "textfield",
                            fieldLabel: "شماره تلفن همراه",
                            validateOnFocusLeave: true,
                            vtype: "isValidMobileNo",
                            vtypeText: "شماره تلفن همراه باید با ۰۹ شروع شود",
                            enforceMaxLength: true,
                            maskRe: /[0-9-]/,
                            maxLength: 11,
                            minLength: 11,
                            minLengthText: "این فیلد باید 11 رقم باشد"
                        }],
                        layout: {
                            type: "table",
                            itemCls: "width-full",
                            columns: 2
                        },
                        bodyStyle: "background:#f1f1f1;",
                        url: unescape("%2fdefault.aspx"),
                        fieldDefaults: {
                            labelAlign: "top",
                            labelStyle: "color:#205a8c",
                            msgTarget: "side",
                            minLengthText: "این فیلد باید 12 رقم باشد"
                        }
                    }],
                    layout: "table",
                    bodyPadding: 6,
                    buttons: [{
                        id: "btnCompanyEdit2",
                        tabIndex: 12,
                        handler: editCompanyInfo,
                        iconCls: "#ApplicationEdit",
                        text: "ویرایش"
                    }],
                    title: "اطلاعات کارفرما",
                    iconCls: "#UserKey"
                }, {
                    id: "tabPasswordChange",
                    frame: true,
                    width: 350,
                    autoScroll: true,
                    items: [{
                        id: "tabPasswordChange1",
                        border: false,
                        style: "width:100%;padding-top:15px",
                        xtype: "form",
                        items: [{
                            id: "txtOldPasswordCompanyManagement",
                            tabIndex: 1,
                            xtype: "textfield",
                            anchor: "-5",
                            fieldLabel: "کلمه عبور قدیم",
                            inputType: "password",
                            validateOnFocusLeave: true
                        }, {
                            id: "txtPassword",
                            tabIndex: 2,
                            xtype: "textfield",
                            anchor: "100%",
                            fieldLabel: "کلمه عبور جدید",
                            inputType: "password",
                            validateOnFocusLeave: true,
                            vtype: "isValidNewPassword",
                            vtypeText: "کلمه عبور جدید نمیتواند با کلمه عبور قدیم یکی باشد"
                        }, {
                            id: "txtConfirmPasswordCompanyManagement",
                            tabIndex: 3,
                            xtype: "textfield",
                            fieldLabel: "تکرار کلمه عبور جدید",
                            inputType: "password",
                            validateOnFocusLeave: true,
                            vtype: "isValidConfirmPassword",
                            vtypeText: "تکرار کلمه عبور جدید صحیح نیست"
                        }],
                        layout: {
                            type: "table",
                            itemCls: "width-half",
                            columns: 1
                        },
                        bodyStyle: "background:#f1f1f1;",
                        url: unescape("%2fdefault.aspx"),
                        fieldDefaults: {
                            labelAlign: "top",
                            labelStyle: "color:#205a8c",
                            msgTarget: "side",
                            allowBlank: false,
                            blankText: ".این فیلد باید پر باشد",
                            minLength: 4,
                            minLengthText: "طول کلمه عبور باید حداقل 4 کاراکتر باشد"
                        }
                    }],
                    layout: "table",
                    bodyPadding: 6,
                    buttons: [{
                        id: "btnCompanyEdit3",
                        tabIndex: 12,
                        handler: editCompanyInfo,
                        iconCls: "#ApplicationEdit",
                        text: "ویرایش"
                    }],
                    title: "تغییر کلمه عبور",
                    iconCls: "#LockKey"
                }],
                layout: "fit",
                bodyPadding: 1,
                activeTab: 0
            }],
            layout: "fit",
            bodyPadding: 5,
            closeAction: "destroy",
            title: "مدیرت شرکت",
            iconCls: "#House",
            maximizable: false,
            listeners: {
                afterrender: {
                    fn: function (item) {
                        showCompanyInfo();
                    }
                }
            }
        });
    });
    Ext.net.Desktop.addModule(Ext.create("Ext.ux.desktop.Module", {
        id: "AccessManagementModule",
        shortcut: {
            iconCls: "x-useraccess-icon",
            sortIndex: 2,
            name: "مدیریت دسترسی ها",
            module: "AccessManagementModule"
        }
    }));
    Ext.net.Desktop.getModule("AccessManagementModule").addLauncher({
        xtype: "menuitem",
        iconCls: "#UserMagnify",
        text: "مدیریت دسترسی ها"
    });
    Ext.net.Desktop.getModule("AccessManagementModule").addWindow(function () {
        Ext.net.ResourceMgr.load([{
            url: "/ux/taglabel/taglabel-js/ext.axd?v=4.6.0"
        }, {
            mode: "css",
            url: "/ux/resources/taglabel-embedded-css/ext.axd?v=4.6.0"
        }], function () {
            Ext.net.ResourceMgr.destroyCmp("App.AccessManagemenWindow");
            Ext.net.Desktop.getModule("AccessManagementModule").setWindow({
                id: "AccessManagemenWindow",
                autoRender: false,
                height: 550,
                rtl: true,
                width: 800,
                xtype: "window",
                items: [{
                    id: "TabPanelAccessManagement",
                    height: 250,
                    width: 600,
                    xtype: "tabpanel",
                    items: [{
                        id: "tabRoleManagement",
                        frame: true,
                        style: "width:100%",
                        keyMap: {
                            "ENTER": saveRoleAccess
                        },
                        items: [{
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "Title",
                                        type: "string"
                                    }, {
                                        name: "ID",
                                        type: "int"
                                    }, {
                                        name: "UserID",
                                        type: "int"
                                    }, {
                                        name: "OrganizationIDs",
                                        type: "string"
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
                            id: "tabRoleManagement_gridRoles",
                            plugins: [{
                                ptype: "rowediting",
                                clicksToEdit: 1,
                                autoCancel: false,
                                saveBtnText: "ذخیره",
                                cancelBtnText: "انصراف",
                                listeners: {
                                    edit: {
                                        fn: function (item, e) {
                                            editRole('Save', this)
                                        }
                                    }
                                }
                            }],
                            xtype: "grid",
                            region: "center",
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    id: "btnAddRole",
                                    iconCls: "#UserAdd",
                                    text: "ایجاد نقش جدید",
                                    listeners: {
                                        click: {
                                            fn: function (item, e) {
                                                addRole()
                                            }
                                        }
                                    }
                                }]
                            },
                            title: "نقش ها",
                            columns: {
                                items: [{
                                    width: 35,
                                    xtype: "rownumberer",
                                    align: "center",
                                    text: "ردیف"
                                }, {
                                    flex: 1,
                                    dataIndex: "Title",
                                    editor: {
                                        xtype: "textfield",
                                        validateOnFocusLeave: true,
                                        allowBlank: false,
                                        blankText: "فیلد باید پر باشد"
                                    },
                                    sortable: true,
                                    text: "نام نقش"
                                }, {
                                    width: 60,
                                    xtype: "commandcolumn",
                                    commands: [{
                                        xtype: "button",
                                        command: "Delete",
                                        tooltip: {
                                            text: "حذف نقش"
                                        },
                                        iconCls: "#Delete"
                                    }, {
                                        xtype: "tbseparator"
                                    }, {
                                        xtype: "button",
                                        command: "Edit",
                                        tooltip: {
                                            text: "ویرایش نقش"
                                        },
                                        iconCls: "#NoteEdit"
                                    }],
                                    listeners: {
                                        command: {
                                            fn: function (item, command, record, recordIndex, cellIndex) {
                                                editRole(command, record)
                                            }
                                        }
                                    }
                                }]
                            },
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        gridRolesDataBind(this)
                                    }
                                },
                                rowclick: {
                                    fn: function (item, record, node, index, e) {
                                        selectRole(e)
                                    }
                                }
                            }
                        }, {
                            id: "TabAccesses",
                            width: 500,
                            xtype: "tabpanel",
                            region: "east",
                            split: true,
                            items: [{
                                id: "treeModuleRoleAccess",
                                width: 350,
                                xtype: "treepanel",
                                overflowY: "scroll",
                                layout: "anchor",
                                bodyStyle: "overflow-y:scroll;",
                                title: "دسترسی نقش",
                                iconCls: "#Accept",
                                columns: {
                                    items: [{
                                        xtype: "treecolumn",
                                        flex: 1,
                                        selectable: false,
                                        dataIndex: "text",
                                        sortable: false
                                    }, {
                                        width: 150,
                                        xtype: "componentcolumn",
                                        selectable: false,
                                        resizable: false,
                                        sortable: false,
                                        component: function () {
                                            return [{
                                                xtype: "combobox",
                                                validateOnFocusLeave: true,
                                                editable: false,
                                                triggerCls: "rtl",
                                                queryMode: "local",
                                                store: [
                                                    ["1", "دسترسی کامل"],
                                                    ["2", "فقط خواندنی"],
                                                    ["3", "عدم دسترسی"]
                                                ],
                                                listeners: {
                                                    select: {
                                                        fn: function (item, records) {
                                                            selectAccessType()
                                                        }
                                                    }
                                                }
                                            }];
                                        },
                                        listeners: {
                                            beforebind: {
                                                fn: function (item, e) {
                                                    return e.record.data.leaf;
                                                }
                                            }
                                        }
                                    }]
                                },
                                root: {
                                    allowDrag: false,
                                    checked: false,
                                    expanded: true,
                                    iconCls: X.net.RM.getIcon("ApplicationDouble"),
                                    text: "دسترسی ها"
                                },
                                listeners: {
                                    afterrender: {
                                        fn: function (item) {
                                            treeModuleDataBind()
                                        }
                                    },
                                    checkchange: {
                                        fn: checkChangeTreePanel
                                    }
                                }
                            }, {
                                id: "TabOrganizationRoleAccess",
                                rtl: true,
                                layout: "fit",
                                title: "ساختارهای نقش",
                                iconCls: "#ChartOrganisation",
                                listeners: {
                                    afterrender: {
                                        fn: function (item) {
                                            App.TabOrganizationRoleAccess.items.add(new OrganizitionTreeSelect().getOrganizitionTree())
                                        }
                                    }
                                }
                            }],
                            layout: "fit",
                            bodyPadding: 1,
                            activeTab: 0
                        }],
                        layout: "border",
                        buttons: [{
                            id: "btnRoleAccess",
                            tabIndex: 12,
                            handler: saveRoleAccess,
                            iconCls: "#PageSave",
                            text: "ذخیره"
                        }],
                        title: "مدیریت نقش ها",
                        iconCls: "#UserMature"
                    }, {
                        id: "TabPanelUserRoleAssigment",
                        frame: true,
                        items: [{
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "Title"
                                    }, {
                                        name: "ID",
                                        type: "int"
                                    }, {
                                        name: "UserID",
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
                            id: "TabPanelUserRoleAssigment_gridRoles",
                            xtype: "grid",
                            region: "center",
                            title: "نقش ها",
                            columns: {
                                items: [{
                                    hidden: true,
                                    width: 3,
                                    flex: 1,
                                    dataIndex: "UserID"
                                }, {
                                    flex: 1,
                                    dataIndex: "Title",
                                    sortable: true,
                                    text: "نام نقش"
                                }]
                            },
                            selModel: Ext.create("Ext.selection.CheckboxModel", {
                                selType: "checkboxmodel",
                                listeners: {
                                    beforedeselect: {
                                        fn: rowDeselectEvent
                                    }
                                },
                                rowspan: 2
                            }),
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        gridRolesDataBind(this)
                                    }
                                },
                                rowmouseup: {
                                    fn: rowMouseUpEvent
                                }
                            }
                        }],
                        layout: "border",
                        buttons: [{
                            id: "btnSetUserRoleAssigment",
                            tabIndex: 12,
                            handler: function () {
                                setUserRoleAssigment(this.up('panel').down('grid'))
                            },
                            iconCls: "#Disk",
                            text: "ذخیره"
                        }],
                        tbar: {
                            xtype: "toolbar",
                            items: [{
                                xtype: "nettagfield",
                                validateOnFocusLeave: true,
                                emptyText: "جستجو",
                                queryDelay: 1000,
                                queryMode: "local",
                                store: [],
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
                            }],
                            layout: "fit"
                        },
                        title: "تخصیص نقش به پرسنل"
                    }, {
                        id: "TabPanelUserRoles",
                        frame: true,
                        items: [{
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "Title"
                                    }, {
                                        name: "ID",
                                        type: "int"
                                    }, {
                                        name: "UserID",
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
                            id: "TabPanelUserRoles_gridRoles",
                            xtype: "grid",
                            region: "center",
                            title: "نقش ها",
                            columns: {
                                items: [{
                                    hidden: true,
                                    width: 3,
                                    flex: 1,
                                    dataIndex: "UserID"
                                }, {
                                    flex: 1,
                                    dataIndex: "Title",
                                    sortable: true,
                                    text: "نام نقش"
                                }]
                            },
                            selModel: Ext.create("Ext.selection.CheckboxModel", {
                                selType: "checkboxmodel",
                                listeners: {
                                    beforedeselect: {
                                        fn: rowDeselectEvent
                                    }
                                },
                                rowspan: 2
                            }),
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        gridRolesDataBind(this)
                                    }
                                },
                                rowmouseup: {
                                    fn: rowMouseUpEvent
                                }
                            }
                        }],
                        layout: "border",
                        buttons: [{
                            id: "btnUserRoles",
                            tabIndex: 12,
                            handler: function () {
                                setUserRoleAssigment(this.up('panel').down('grid'))
                            },
                            iconCls: "#Disk",
                            text: "ذخیره"
                        }],
                        tbar: {
                            xtype: "toolbar",
                            items: [{
                                id: "id81c6a68324f76a2c_userSearch",
                                "hideSelected": true,
                                xtype: "combobox",
                                validateOnFocusLeave: true,
                                emptyText: "جستجو",
                                queryDelay: 1000,
                                queryMode: "local",
                                store: Ext.data.StoreManager.getArrayStore(2),
                                listeners: {
                                    focus: {
                                        fn: function (item) {
                                            setCurrentSelectUser(this)
                                        }
                                    },
                                    select: {
                                        fn: function (item, records) {
                                            getUserRolesAssigment(item, records, this.up().up().down('grid'))
                                        }
                                    },
                                    beforequery: {
                                        fn: userSearch
                                    }
                                }
                            }],
                            layout: "fit"
                        },
                        title: "نقش های پرسنل"
                    }],
                    layout: "fit",
                    bodyPadding: 1,
                    activeTab: 0
                }],
                layout: "fit",
                bodyPadding: 5,
                closeAction: "destroy",
                title: "مدیریت نقش ها و دسترسی کاربران",
                iconCls: "#User"
            });
        });
    });
    Ext.net.Desktop.addModule(Ext.create("Ext.ux.desktop.Module", {
        id: "OrganizationStructureModule",
        shortcut: {
            iconCls: "x-organization-icon",
            sortIndex: 4,
            name: "تشکیلات",
            module: "OrganizationStructureModule"
        }
    }));
    Ext.net.Desktop.getModule("OrganizationStructureModule").addLauncher({
        xtype: "menuitem",
        iconCls: "#Building",
        text: "تشکیلات"
    });
    Ext.net.Desktop.getModule("OrganizationStructureModule").addWindow(function () {
        Ext.net.ResourceMgr.destroyCmp("App.OrganizationStructureWindow");
        Ext.net.Desktop.getModule("OrganizationStructureModule").setWindow({
            id: "OrganizationStructureWindow",
            autoRender: false,
            height: 600,
            rtl: true,
            width: 900,
            xtype: "window",
            resizable: true,
            items: [{
                id: "TabPanelOrganizationStructure",
                height: 250,
                width: 600,
                xtype: "tabpanel",
                items: [{
                    id: "TabPanelOrganizationLevel",
                    frame: true,
                    items: [{
                        store: {
                            model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                extend: "Ext.data.Model",
                                fields: [{
                                    name: "Title"
                                }, {
                                    name: "Code"
                                }, {
                                    name: "ID",
                                    type: "int"
                                }, {
                                    name: "ParentTitle"
                                }, {
                                    name: "ParentID"
                                }, {
                                    name: "Icon"
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
                        id: "TabPanelOrgLevel_gridOrgLevel",
                        xtype: "grid",
                        region: "center",
                        tbar: {
                            xtype: "toolbar",
                            items: [{
                                id: "btnAddOrgLevel",
                                iconCls: "#Add",
                                text: "ایجاد سطح جدید",
                                listeners: {
                                    click: {
                                        fn: function (item, e) {
                                            editOrganisationLevel('Add', null, this.up('panel'))
                                        }
                                    }
                                }
                            }]
                        },
                        title: "سطح های سازمانی",
                        columns: {
                            items: [{
                                hidden: true,
                                width: 3,
                                dataIndex: "ParentID",
                                sortable: true
                            }, {
                                width: 35,
                                xtype: "rownumberer",
                                align: "center",
                                text: "ردیف"
                            }, {
                                width: 50,
                                renderer: organizationLevelIcon,
                                text: "آیکون"
                            }, {
                                width: 150,
                                dataIndex: "Title",
                                text: "عنوان سطح"
                            }, {
                                width: 50,
                                align: "center",
                                dataIndex: "Code",
                                sortable: true,
                                text: "کد"
                            }, {
                                width: 80,
                                align: "center",
                                dataIndex: "LevelNo",
                                sortable: true,
                                text: "شماره سطح"
                            }, {
                                flex: 1,
                                dataIndex: "ParentTitle",
                                sortable: true,
                                text: "واحدهای بالادست"
                            }, {
                                width: 60,
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
                                            editOrganisationLevel(command, record, this.up('panel'))
                                        }
                                    }
                                }
                            }]
                        },
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    getOrganizationLevel(this)
                                }
                            }
                        }
                    }],
                    layout: "fit",
                    title: "تعریف سطح سازمانی واحدها",
                    iconCls: "#BuildingAdd"
                }, {
                    id: "TabOrgStrucManagment",
                    items: [{
                        id: "TabOrgStrucManagment_OrgUnitInfo",
                        frame: true,
                        xtype: "form",
                        keyMap: {
                            "ENTER": function () {
                                saveOrganizationUnit(this.up().up())
                            }
                        },
                        region: "center",
                        autoScroll: true,
                        items: [{
                            id: "TabOrgStrucManagment_txtTopOfUnit",
                            disabled: true,
                            disabledCls: "field-disabled",
                            xtype: "textfield",
                            colspan: 2,
                            fieldLabel: "واحد مافوق",
                            fieldStyle: "text-align:center;font-weight:bold !important",
                            validateOnFocusLeave: true,
                            editable: false
                        }, {
                            id: "TabOrgStrucManagment_txtUnitName",
                            xtype: "textfield",
                            colspan: 2,
                            fieldLabel: "نام واحد",
                            validateOnFocusLeave: true,
                            allowBlank: false,
                            blankText: "این فیلد باید پر باشد"
                        }, {
                            id: "TabOrgStrucManagment_txtCode",
                            xtype: "textfield",
                            fieldLabel: "کد واحد",
                            validateOnFocusLeave: true
                        }, {
                            id: "TabOrgStrucManagment_cmbDegree",
                            xtype: "combobox",
                            fieldLabel: "درجه",
                            validateOnFocusLeave: true,
                            editable: false,
                            queryMode: "local",
                            store: [
                                ["0", "بدون درجه"],
                                ["1", "درجه 1"],
                                ["2", "درجه 2"],
                                ["3", "درجه 3"],
                                ["4", "درجه 4"],
                                ["10", "ممتاز"]
                            ]
                        }, {
                            id: "TabOrgStrucManagment_cmbOrgUnit",
                            xtype: "combobox",
                            colspan: 2,
                            fieldLabel: "واحد سازمانی",
                            validateOnFocusLeave: true,
                            allowBlank: false,
                            blankText: "یک واحد سازمانی را انتخاب کنید",
                            editable: false,
                            displayField: "Title",
                            listConfig: {
                                getInnerTpl: function () {
                                    return "<div style=\"border-bottom: solid 1px #EBE7E7\"><table style=\"width:100%\"><tr><td style=\"width:30%\"> {Title}</td><td style=\"width:60%\">{ParentTitle}</td><td style=\"width:10% ;background-image: url(data:image/jpeg;base64,{Icon}); background-repeat   : no-repeat !important;background-position : 3px 50% !important; padding-left:24px !important;\"></td></tr></table></div>";
                                }
                            },
                            queryMode: "local",
                            valueField: "ID",
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "Title"
                                    }, {
                                        name: "ID",
                                        type: "int"
                                    }, {
                                        name: "Icon"
                                    }, {
                                        name: "ParentTitle"
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
                                        getOrganizationLevel(this)
                                    }
                                }
                            }
                        }, {
                            id: "TabOrgStrucManagment_txtUnitPropDate",
                            rtl: false,
                            xtype: "textfield",
                            fieldLabel: "ابلاغ و تشکیلات",
                            fieldStyle: "text-align:center",
                            labelStyle: "direction:rtl",
                            validateOnFocusLeave: true,
                            vtype: "isValidDate",
                            vtypeText: "تاریخ نامعتبر است",
                            allowBlank: false,
                            blankText: ".این فیلد باید پر باشد",
                            iconCls: "#Date",
                            inputMask: "9999/99/99"
                        }, {
                            id: "TabOrgStrucManagment_txtCreateDate",
                            rtl: false,
                            xtype: "textfield",
                            fieldLabel: "تاریخ تصویب",
                            fieldStyle: "text-align:center",
                            labelStyle: "direction:rtl",
                            validateOnFocusLeave: true,
                            vtype: "isValidDate",
                            vtypeText: "تاریخ نامعتبر است",
                            allowBlank: false,
                            blankText: ".این فیلد باید پر باشد",
                            iconCls: "#Date",
                            inputMask: "9999/99/99"
                        }, {
                            id: "TabOrgStrucManagment_txtLocationCity",
                            xtype: "textfield",
                            fieldLabel: "شهر استقرار",
                            validateOnFocusLeave: true,
                            allowBlank: false,
                            blankText: "شهر محل استقرار انتخاب نشده است",
                            editable: false,
                            triggers: {
                                "_trigger1": {
                                    handler: function () {
                                        openCitiesModalWindow(App.TabOrgStrucManagment, App.TabOrgStrucManagment_txtLocationCity)
                                    },
                                    tag: "_trigger1",
                                    cls: Ext.form.trigger.Trigger.getIcon("Search")
                                }
                            }
                        }, {
                            id: "TabOrgStrucManagment_cmbStatus",
                            xtype: "combobox",
                            fieldLabel: "وضعیت",
                            validateOnFocusLeave: true,
                            allowBlank: false,
                            editable: false,
                            queryMode: "local",
                            store: [
                                ["1", "فعال"],
                                ["2", "غیر فعال"]
                            ]
                        }, {
                            id: "TabOrgStrucManagment_txtHistoryDesc",
                            xtype: "textfield",
                            colspan: 2,
                            fieldLabel: "سوابق",
                            validateOnFocusLeave: true
                        }, {
                            id: "TabOrgStrucManagment_txtDesc",
                            xtype: "textfield",
                            colspan: 2,
                            fieldLabel: "ملاحظات",
                            validateOnFocusLeave: true
                        }],
                        layout: {
                            type: "table",
                            itemCls: "width-full",
                            columns: 2
                        },
                        buttons: [{
                            id: "btnSaveOrgStrucManagment",
                            tabIndex: 12,
                            handler: function () {
                                saveOrganizationUnit(this.up().up())
                            },
                            iconCls: "#Disk",
                            text: "ذخیره"
                        }],
                        url: unescape("%2fdefault.aspx"),
                        fieldDefaults: {
                            labelAlign: "top",
                            msgTarget: "side"
                        }
                    }, {
                        id: "TabOrgStrucManagment_treeOrganisation",
                        width: 350,
                        xtype: "treepanel",
                        region: "west",
                        split: true,
                        autoScroll: true,
                        tbar: {
                            xtype: "toolbar",
                            items: [{
                                style: "width: 99%; background-color: #d7d2d2;margin-bottom: 10px;",
                                xtype: "fieldset",
                                colspan: 5,
                                items: [{
                                    id: "TabOrgStrucManagment_ddlOrgVersioning",
                                    style: "width: 100%;",
                                    xtype: "combobox",
                                    colspan: 5,
                                    fieldLabel: "ساختار سازماني",
                                    labelAlign: "top",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    queryMode: "local",
                                    store: Ext.data.StoreManager.getArrayStore(2),
                                    listeners: {
                                        afterrender: {
                                            fn: function (item) {
                                                selectOrgVersion(this, 'Org')
                                            }
                                        },
                                        select: {
                                            fn: function (item, records) {
                                                selectOrgVersion(this, 'Org')
                                            }
                                        }
                                    }
                                }]
                            }, {
                                handler: function () {
                                    addNewOrgUnit(this.up().up())
                                },
                                iconCls: "#ChartOrganisationAdd",
                                text: "واحد جدید"
                            }, {
                                handler: function () {
                                    deleteOrganisationUnit(this.up().up())
                                },
                                iconCls: "#ChartOrganisationDelete",
                                text: "حذف واحد"
                            }, {
                                handler: function () {
                                    cutOrganizationUnit(this.up().up())
                                },
                                iconCls: "#CutRed",
                                text: "برش"
                            }, {
                                handler: function () {
                                    copyOrganizationUnit(this.up().up())
                                },
                                iconCls: "#PageCopy",
                                text: "کپی"
                            }, {
                                handler: function () {
                                    pasteOrganizationUnit(this.up().up())
                                },
                                iconCls: "#PastePlain",
                                text: "چسباندن"
                            }, {
                                id: "fieldFilter",
                                margin: "5 0 5 0",
                                xtype: "textfield",
                                colspan: 5,
                                fieldLabel: "عنوان واحد",
                                labelWidth: 55,
                                validateOnFocusLeave: true,
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
                        viewConfig: {
                            plugins: [{
                                ptype: "treeviewdragdrop"
                            }],
                            xtype: "treeview",
                            listeners: {
                                beforedrop: {
                                    fn: confirmCutOrgUnitDragDrop
                                }
                            }
                        },
                        rootVisible: false,
                        useArrows: true,
                        listeners: {
                            itemclick: {
                                fn: getOrganizationUnit
                            },
                            itemcontextmenu: {
                                fn: showTreeOrgUnitContextMenu
                            }
                        }
                    }],
                    layout: "border",
                    title: "مدیریت واحدهای سازمانی",
                    iconCls: "#ChartOrganisation"
                }, {
                    id: "TabOrgUnitDegree",
                    rtl: true,
                    layout: "fit",
                    title: "مدیریت درجه واحد ها",
                    iconCls: "#AwardStarGold2",
                    listeners: {
                        afterrender: {
                            fn: function (item) {
                                this.items.add(getGridConstant(null, '', 'درجه واحد ها', 'ایجاد درجه جدید', 'Company_Organization', 'UnitDegree', 1))
                            }
                        }
                    }
                }],
                layout: "fit",
                bodyPadding: 1,
                activeTab: 0
            }],
            layout: "fit",
            bodyPadding: 5,
            closeAction: "destroy",
            title: "تشکیلات",
            iconCls: "#ChartOrganisation",
            maximizable: true
        });
    });
    Ext.net.Desktop.addModule(Ext.create("Ext.ux.desktop.Module", {
        id: "BusinessAnalysisModule",
        shortcut: {
            iconCls: "x-businessanalysis-icon",
            sortIndex: 5,
            name: "تجزیه و تحلیل مشاغل",
            module: "BusinessAnalysisModule"
        }
    }));
    Ext.net.Desktop.getModule("BusinessAnalysisModule").addLauncher({
        xtype: "menuitem",
        iconCls: "#ChartCurve",
        text: "تجزیه و تحلیل مشاغل"
    });
    Ext.net.Desktop.getModule("BusinessAnalysisModule").addWindow(function () {
        Ext.net.ResourceMgr.load([{
            url: "/ux/tabscrollermenu/TabScrollerMenu-merged-js/ext.axd?v=4.6.0"
        }, {
            url: "/ux/clearbutton/clearbutton-js/ext.axd?v=4.6.0"
        }, {
            url: "/ux/filterheader/filterheader-js/ext.axd?v=4.6.0"
        }, {
            mode: "css",
            url: "/ux/resources/tabscrollermenu-embedded-css/ext.axd?v=4.6.0"
        }], function () {
            Ext.net.ResourceMgr.destroyCmp("App.BusinessAnalysisWindow");
            Ext.net.Desktop.getModule("BusinessAnalysisModule").setWindow({
                id: "BusinessAnalysisWindow",
                autoRender: false,
                height: 650,
                rtl: true,
                width: 1000,
                xtype: "window",
                resizable: true,
                items: [{
                    id: "TabPanelBusinessAnalysis",
                    height: 250,
                    plugins: [Ext.create("Ext.ux.TabScrollerMenu", {
                        pageSize: 20,
                        maxText: 1000
                    })],
                    width: 600,
                    xtype: "tabpanel",
                    items: [{
                        id: "TabBusinessAnalysisPost",
                        items: [{
                            id: "TabBusinessAnalysisPost_treePost",
                            width: 350,
                            xtype: "treepanel",
                            region: "west",
                            split: true,
                            autoScroll: true,
                            collapsible: true,
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    style: "width: 99%; background-color: #d7d2d2;margin-bottom: 10px;",
                                    xtype: "fieldset",
                                    colspan: 5,
                                    items: [{
                                        id: "TabBusinessAnalysisPost_ddlOrgVersioning",
                                        style: "width: 100%;",
                                        xtype: "combobox",
                                        colspan: 5,
                                        fieldLabel: "ساختار سازماني",
                                        labelAlign: "top",
                                        validateOnFocusLeave: true,
                                        editable: false,
                                        displayField: "Title",
                                        queryMode: "local",
                                        valueField: "ID",
                                        store: Ext.data.StoreManager.getArrayStore(2),
                                        listeners: {
                                            afterrender: {
                                                fn: function (item) {
                                                    selectOrgVersion(this, 'Post')
                                                }
                                            },
                                            select: {
                                                fn: function (item, records) {
                                                    selectOrgVersion(this, 'Post')
                                                }
                                            }
                                        }
                                    }]
                                }, {
                                    handler: function () {
                                        addNewPost(this.up().up())
                                    },
                                    iconCls: "#UserAdd",
                                    text: "پست جدید"
                                }, {
                                    handler: function () {
                                        deleteOrgPost(this.up().up())
                                    },
                                    iconCls: "#UserDelete",
                                    text: "حذف پست"
                                }, {
                                    handler: function () {
                                        cutPost(this.up().up())
                                    },
                                    iconCls: "#CutRed",
                                    text: "برش"
                                }, {
                                    handler: function () {
                                        copyOrganizationUnit(this.up().up())
                                    },
                                    iconCls: "#PageCopy",
                                    text: "کپی"
                                }, {
                                    handler: function () {
                                        pasteOrganizationUnit(this.up().up())
                                    },
                                    iconCls: "#PastePlain",
                                    text: "چسباندن"
                                }, {
                                    margin: "5 0 5 0",
                                    xtype: "textfield",
                                    colspan: 5,
                                    fieldLabel: "عنوان پست",
                                    labelWidth: 55,
                                    validateOnFocusLeave: true,
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
                            title: "ساختار سازمانی",
                            iconCls: "#Building",
                            viewConfig: {
                                plugins: [{
                                    ptype: "treeviewdragdrop"
                                }],
                                xtype: "treeview",
                                listeners: {
                                    beforedrop: {
                                        fn: confirmCutOrgUnitDragDrop
                                    }
                                }
                            },
                            rootVisible: false,
                            useArrows: true,
                            listeners: {
                                itemclick: {
                                    fn: getOrganizationPostInfo
                                },
                                itemcontextmenu: {
                                    fn: showTreePostContextMenu
                                }
                            }
                        }, {
                            id: "TabOrgPost",
                            xtype: "tabpanel",
                            region: "center",
                            split: true,
                            items: [{
                                id: "TabBusinessAnalysisPost_OrgPostInfo",
                                frame: true,
                                xtype: "form",
                                keyMap: {
                                    "ENTER": function () {
                                        saveOrganizationPostUnit(this.up().up())
                                    }
                                },
                                autoScroll: true,
                                items: [{
                                    id: "TabBusinessAnalysisPost_txtTopOfUnit",
                                    xtype: "textfield",
                                    colspan: 2,
                                    fieldLabel: "واحد مافوق",
                                    fieldStyle: "text-align:center;font-weight:bold !important",
                                    validateOnFocusLeave: true,
                                    editable: false
                                }, {
                                    id: "TabBusinessAnalysisPost_txtUnitName",
                                    xtype: "textfield",
                                    colspan: 2,
                                    fieldLabel: "نام واحد",
                                    validateOnFocusLeave: true,
                                    allowBlank: false,
                                    blankText: "این فیلد باید پر باشد"
                                }, {
                                    id: "TabBusinessAnalysisPost_txtCode",
                                    xtype: "textfield",
                                    fieldLabel: "کد واحد",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "TabBusinessAnalysisPost_cmbDegree",
                                    xtype: "combobox",
                                    fieldLabel: "درجه",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    queryMode: "local",
                                    store: [
                                        ["0", "بدون درجه"],
                                        ["1", "درجه 1"],
                                        ["2", "درجه 2"],
                                        ["3", "درجه 3"],
                                        ["4", "درجه 4"],
                                        ["10", "ممتاز"]
                                    ]
                                }, {
                                    id: "TabBusinessAnalysisPost_cmbOrgUnit",
                                    xtype: "combobox",
                                    colspan: 2,
                                    fieldLabel: "واحد سازمانی",
                                    validateOnFocusLeave: true,
                                    allowBlank: false,
                                    blankText: "یک واحد سازمانی را انتخاب کنید",
                                    editable: false,
                                    displayField: "Title",
                                    listConfig: {
                                        getInnerTpl: function () {
                                            return "<div style=\"border-bottom: solid 1px #EBE7E7\"><table style=\"width:100%\"><tr><td style=\"width:30%\"> {Title}</td><td style=\"width:60%\">{ParentTitle}</td><td style=\"width:10% ;background-image: url(data:image/jpeg;base64,{Icon}); background-repeat   : no-repeat !important;background-position : 3px 50% !important; padding-left:24px !important;\"></td></tr></table></div>";
                                        }
                                    },
                                    queryMode: "local",
                                    valueField: "ID",
                                    store: {
                                        model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                            extend: "Ext.data.Model",
                                            fields: [{
                                                name: "Title"
                                            }, {
                                                name: "ID",
                                                type: "int"
                                            }, {
                                                name: "Icon"
                                            }, {
                                                name: "ParentTitle"
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
                                                getOrganizationLevel(this)
                                            }
                                        }
                                    }
                                }, {
                                    id: "TabBusinessAnalysisPost_txtUnitPropDate",
                                    xtype: "textfield",
                                    fieldLabel: "ابلاغ و تشکیلات",
                                    fieldStyle: "text-align:center",
                                    validateOnFocusLeave: true,
                                    note: "مثال: 1394/05/08",
                                    vtype: "isValidDate",
                                    vtypeText: "تاریخ نامعتبر است",
                                    iconCls: "#Date",
                                    inputMask: "9999/99/99",
                                    triggers: {
                                        "_trigger1": {
                                            tag: "_trigger1",
                                            cls: Ext.form.trigger.Trigger.getIcon("Date")
                                        }
                                    }
                                }, {
                                    id: "TabBusinessAnalysisPost_txtCreateDate",
                                    xtype: "textfield",
                                    fieldLabel: "تاریخ تصویب",
                                    fieldStyle: "text-align:center",
                                    validateOnFocusLeave: true,
                                    note: "مثال: 1394/05/08",
                                    vtype: "isValidDate",
                                    vtypeText: "تاریخ نامعتبر است",
                                    iconCls: "#Date",
                                    inputMask: "9999/99/99",
                                    triggers: {
                                        "_trigger1": {
                                            tag: "_trigger1",
                                            cls: Ext.form.trigger.Trigger.getIcon("Date")
                                        }
                                    }
                                }, {
                                    id: "TabBusinessAnalysisPost_txtLocationCity",
                                    xtype: "textfield",
                                    fieldLabel: "شهر استقرار",
                                    validateOnFocusLeave: true,
                                    allowBlank: false,
                                    blankText: "شهر محل استقرار انتخاب نشده است",
                                    editable: false,
                                    triggers: {
                                        "_trigger1": {
                                            handler: function () {
                                                openCitiesModalWindow(App.TabOrgPost, App.TabBusinessAnalysisPost_txtLocationCity)
                                            },
                                            tag: "_trigger1",
                                            cls: Ext.form.trigger.Trigger.getIcon("Search")
                                        }
                                    }
                                }, {
                                    id: "TabBusinessAnalysisPost_cmbStatus",
                                    xtype: "combobox",
                                    fieldLabel: "وضعیت",
                                    validateOnFocusLeave: true,
                                    allowBlank: false,
                                    editable: false,
                                    queryMode: "local",
                                    store: [
                                        ["1", "فعال"],
                                        ["2", "غیر فعال"]
                                    ]
                                }, {
                                    id: "TabBusinessAnalysisPost_txtHistoryDesc",
                                    xtype: "textfield",
                                    colspan: 2,
                                    fieldLabel: "سوابق",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "TabBusinessAnalysisPost_txtDesc",
                                    xtype: "textfield",
                                    colspan: 2,
                                    fieldLabel: "ملاحظات",
                                    validateOnFocusLeave: true
                                }],
                                layout: {
                                    type: "table",
                                    itemCls: "width-full",
                                    columns: 2
                                },
                                buttons: [{
                                    id: "btnSaveBusinessAnalysisPost",
                                    tabIndex: 12,
                                    handler: function () {
                                        saveOrganizationPostUnit(this.up().up())
                                    },
                                    iconCls: "#Disk",
                                    text: "ذخیره"
                                }],
                                title: "واحد سازمانی",
                                iconCls: "#House",
                                url: unescape("%2fdefault.aspx"),
                                fieldDefaults: {
                                    labelAlign: "top",
                                    msgTarget: "side"
                                }
                            }, {
                                id: "TabBusinessAnalysisPost_PostInfo",
                                frame: true,
                                xtype: "form",
                                keyMap: {
                                    "ENTER": function () {
                                        savePost(this.up().up())
                                    }
                                },
                                autoScroll: true,
                                items: [{
                                    id: "TabBusinessAnalysisPost_OrgUnitName",
                                    disabled: true,
                                    disabledCls: "field-disabled",
                                    xtype: "textfield",
                                    colspan: 2,
                                    fieldLabel: "واحد سازمانی",
                                    fieldStyle: "text-align:center;font-weight:bold !important",
                                    validateOnFocusLeave: true,
                                    editable: false
                                }, {
                                    id: "PostTitleID",
                                    xtype: "combobox",
                                    colspan: 2,
                                    fieldLabel: "عنوان پست",
                                    validateOnFocusLeave: true,
                                    allowBlank: false,
                                    blankText: "یک عنوان پست را انتخاب کنید",
                                    emptyText: "جستجو پست",
                                    queryMode: "local",
                                    typeAhead: true,
                                    store: Ext.data.StoreManager.getArrayStore(2),
                                    listeners: {
                                        afterrender: {
                                            fn: function (item) {
                                                comboBoxPostTitleBinder(this)
                                            }
                                        },
                                        select: {
                                            fn: setPostTitleInfo
                                        }
                                    }
                                }, {
                                    id: "txtOrgPostLevel",
                                    disabled: true,
                                    disabledCls: "field-disabled",
                                    xtype: "textfield",
                                    fieldLabel: "سطح سازمانی پست",
                                    readOnly: true,
                                    validateOnFocusLeave: true
                                }, {
                                    id: "txtOrgPostActivityType",
                                    disabled: true,
                                    disabledCls: "field-disabled",
                                    xtype: "textfield",
                                    fieldLabel: "نوع فعالیت",
                                    readOnly: true,
                                    validateOnFocusLeave: true
                                }, {
                                    id: "txtTitleInUnit",
                                    xtype: "textfield",
                                    colspan: 2,
                                    fieldLabel: "عنوان در واحد",
                                    validateOnFocusLeave: true,
                                    allowBlank: false,
                                    blankText: "این فیلد باید پر باشد"
                                }, {
                                    id: "txtPostNumber",
                                    xtype: "textfield",
                                    fieldLabel: "شماره پست",
                                    validateOnFocusLeave: true,
                                    maskRe: /[0-9-]/
                                }, {
                                    id: "cmbOrgPostStatus",
                                    xtype: "combobox",
                                    fieldLabel: "وضعیت",
                                    validateOnFocusLeave: true,
                                    allowBlank: false,
                                    editable: false,
                                    queryMode: "local",
                                    store: [
                                        ["1", "فعال"],
                                        ["2", "غیر فعال"]
                                    ]
                                }, {
                                    id: "txtOrgPostJobName",
                                    disabled: true,
                                    disabledCls: "field-disabled",
                                    xtype: "textfield",
                                    fieldLabel: "شغل",
                                    readOnly: true,
                                    validateOnFocusLeave: true
                                }, {
                                    id: "txtOrgPostField",
                                    disabled: true,
                                    disabledCls: "field-disabled",
                                    xtype: "textfield",
                                    fieldLabel: "رشته",
                                    readOnly: true,
                                    validateOnFocusLeave: true
                                }, {
                                    id: "txtOrgPostJobLevel",
                                    disabled: true,
                                    disabledCls: "field-disabled",
                                    xtype: "textfield",
                                    fieldLabel: "رده شغل",
                                    readOnly: true,
                                    validateOnFocusLeave: true
                                }, {
                                    id: "ddlOrgPostChargeType",
                                    disabled: true,
                                    disabledCls: "field-disabled",
                                    xtype: "combobox",
                                    fieldLabel: "نوع تصدي",
                                    validateOnFocusLeave: true,
                                    allowBlank: false,
                                    editable: false,
                                    queryMode: "local",
                                    store: [
                                        ["1", "با تصدي"],
                                        ["2", "بلاتصدي"]
                                    ]
                                }, {
                                    id: "ddlOrgPostStabilityType",
                                    xtype: "combobox",
                                    fieldLabel: "ثابت/موقت",
                                    validateOnFocusLeave: true,
                                    allowBlank: false,
                                    editable: false,
                                    queryMode: "local",
                                    store: [
                                        ["1", "دائم"],
                                        ["2", "موقت"]
                                    ]
                                }, {
                                    id: "txtOrgPostCreateDate",
                                    xtype: "textfield",
                                    fieldLabel: "تاریخ تصویب",
                                    fieldStyle: "text-align:center",
                                    validateOnFocusLeave: true,
                                    vtype: "isValidDate",
                                    vtypeText: "تاریخ نامعتبر است",
                                    iconCls: "#Date",
                                    inputMask: "9999/99/99",
                                    triggers: {
                                        "_trigger1": {
                                            tag: "_trigger1",
                                            cls: Ext.form.trigger.Trigger.getIcon("Date")
                                        }
                                    }
                                }, {
                                    id: "txtOrgPostDesc",
                                    height: 40,
                                    xtype: "textareafield",
                                    colspan: 2,
                                    fieldLabel: "شرح",
                                    validateOnFocusLeave: true
                                }],
                                layout: {
                                    type: "table",
                                    itemCls: "width-full",
                                    columns: 2
                                },
                                buttons: [{
                                    id: "btnSavePost",
                                    tabIndex: 12,
                                    handler: function () {
                                        savePost(this.up().up())
                                    },
                                    iconCls: "#Disk",
                                    text: "ذخیره"
                                }],
                                title: "پست سازمانی",
                                iconCls: "#UserHome",
                                url: unescape("%2fdefault.aspx"),
                                fieldDefaults: {
                                    labelAlign: "top",
                                    msgTarget: "side"
                                }
                            }],
                            layout: "fit",
                            activeTab: 0
                        }, {
                            id: "PanelOrgPostHistory",
                            frame: true,
                            width: 600,
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
                                            name: "FullName"
                                        }, {
                                            name: "PostType"
                                        }, {
                                            name: "StartDate"
                                        }, {
                                            name: "EndDate"
                                        }, {
                                            name: "IsActive"
                                        }, {
                                            name: "IsActiveTitle"
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
                                id: "gridPersonnelPost",
                                xtype: "grid",
                                region: "center",
                                tbar: {
                                    xtype: "toolbar",
                                    items: [{
                                        iconCls: "#UserAdd",
                                        text: "تصدي جديد",
                                        listeners: {
                                            click: {
                                                fn: function (item, e) {
                                                    showPersonnelPostWindow(this.up().up().up(), 'Add')
                                                }
                                            }
                                        }
                                    }]
                                },
                                columns: {
                                    items: [{
                                        width: 35,
                                        xtype: "rownumberer",
                                        align: "center",
                                        text: "ردیف"
                                    }, {
                                        width: 170,
                                        dataIndex: "FullName",
                                        text: "نام و نام خانوادگی"
                                    }, {
                                        flex: 1,
                                        dataIndex: "PostTypeTitle",
                                        sortable: true,
                                        text: "نوع پست"
                                    }, {
                                        flex: 1,
                                        dataIndex: "StartDate",
                                        sortable: true,
                                        text: "شروع تصدی"
                                    }, {
                                        flex: 1,
                                        dataIndex: "EndDate",
                                        sortable: true,
                                        text: "پایان تصدی"
                                    }, {
                                        flex: 1,
                                        dataIndex: "IsActiveTitle",
                                        sortable: true,
                                        text: "وضعيت"
                                    }, {
                                        width: 60,
                                        xtype: "commandcolumn",
                                        commands: [{
                                            xtype: "button",
                                            command: "Delete",
                                            tooltip: {
                                                text: "حذف"
                                            },
                                            iconCls: "#UserDelete"
                                        }, {
                                            xtype: "tbseparator"
                                        }, {
                                            xtype: "button",
                                            command: "Edit",
                                            tooltip: {
                                                text: "ویرایش"
                                            },
                                            iconCls: "#UserEdit"
                                        }],
                                        listeners: {
                                            command: {
                                                fn: function (item, command, record, recordIndex, cellIndex) {
                                                    editPersonnelPost(command, record, App.TabBusinessAnalysisJobs)
                                                }
                                            }
                                        }
                                    }]
                                }
                            }],
                            layout: "fit",
                            collapsed: true,
                            collapsible: true,
                            title: "سوابق تصدی پست",
                            iconCls: "#Group",
                            listeners: {
                                beforeexpand: {
                                    fn: function (item, animate) {
                                        isSelectedPost()
                                    }
                                }
                            }
                        }],
                        layout: "border",
                        title: "مديريت پست هاي سازماني",
                        iconCls: "#ChartOrganisation"
                    }, {
                        id: "TabBusinessAnalysisJobs",
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
                                        name: "Code",
                                        type: "int"
                                    }, {
                                        name: "CategoryTitle"
                                    }, {
                                        name: "FieldTitle"
                                    }, {
                                        name: "LevelTitle"
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
                            id: "TabPanelBusinessAnalysis_gridJobs",
                            plugins: [{
                                ptype: "filterheader"
                            }],
                            xtype: "grid",
                            region: "center",
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    id: "btnAddOrgLevel",
                                    iconCls: "#VcardAdd",
                                    text: "ایجاد شغل جدید",
                                    listeners: {
                                        click: {
                                            fn: function (item, e) {
                                                showJobWindow(this.up().up().up(), 'Add')
                                            }
                                        }
                                    }
                                }]
                            },
                            title: "شغل ها",
                            columns: {
                                items: [{
                                    width: 35,
                                    xtype: "rownumberer",
                                    items: [{
                                        hidden: true,
                                        html: "&nbsp;",
                                        xtype: "displayfield",
                                        validateOnFocusLeave: true
                                    }],
                                    align: "center",
                                    text: "ردیف"
                                }, {
                                    width: 200,
                                    items: [{
                                        plugins: [{
                                            ptype: "clearbutton"
                                        }],
                                        xtype: "textfield",
                                        validateOnFocusLeave: true
                                    }],
                                    dataIndex: "Title",
                                    text: "عنوان شغل"
                                }, {
                                    flex: 1,
                                    items: [{
                                        plugins: [{
                                            ptype: "clearbutton"
                                        }],
                                        xtype: "textfield",
                                        validateOnFocusLeave: true
                                    }],
                                    dataIndex: "Code",
                                    sortable: true,
                                    text: "کد شغل"
                                }, {
                                    flex: 1,
                                    items: [{
                                        plugins: [{
                                            ptype: "clearbutton"
                                        }],
                                        xtype: "textfield",
                                        validateOnFocusLeave: true
                                    }],
                                    dataIndex: "LevelTitle",
                                    sortable: true,
                                    text: "رده شغل"
                                }, {
                                    flex: 1,
                                    items: [{
                                        plugins: [{
                                            ptype: "clearbutton"
                                        }],
                                        xtype: "textfield",
                                        validateOnFocusLeave: true
                                    }],
                                    dataIndex: "CategoryTitle",
                                    sortable: true,
                                    text: "رسته"
                                }, {
                                    flex: 1,
                                    items: [{
                                        plugins: [{
                                            ptype: "clearbutton"
                                        }],
                                        xtype: "textfield",
                                        validateOnFocusLeave: true
                                    }],
                                    dataIndex: "FieldTitle",
                                    sortable: true,
                                    text: "رشته"
                                }, {
                                    width: 60,
                                    xtype: "commandcolumn",
                                    items: [{
                                        hidden: true,
                                        html: "&nbsp;",
                                        xtype: "displayfield",
                                        validateOnFocusLeave: true
                                    }],
                                    commands: [{
                                        xtype: "button",
                                        command: "Delete",
                                        tooltip: {
                                            text: "حذف"
                                        },
                                        iconCls: "#VcardDelete"
                                    }, {
                                        xtype: "tbseparator"
                                    }, {
                                        xtype: "button",
                                        command: "Edit",
                                        tooltip: {
                                            text: "ویرایش"
                                        },
                                        iconCls: "#VcardEdit"
                                    }],
                                    listeners: {
                                        command: {
                                            fn: function (item, command, record, recordIndex, cellIndex) {
                                                editJob(command, record, App.TabBusinessAnalysisJobs)
                                            }
                                        }
                                    }
                                }]
                            },
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        getJobs(this)
                                    }
                                }
                            }
                        }],
                        layout: "fit",
                        title: "مديريت مشاغل سازمانی",
                        iconCls: "#Vcard"
                    }, {
                        id: "TabBusinessAnalysisPostTitle",
                        items: [{
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "ID",
                                        type: "int"
                                    }, {
                                        name: "PostTitle"
                                    }, {
                                        name: "PostTitleCode",
                                        type: "int"
                                    }, {
                                        name: "PostOrgLevelTitle"
                                    }, {
                                        name: "JobTitle"
                                    }, {
                                        name: "ActivityTypeTitle"
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
                            id: "TabPanelBusinessAnalysis_gridPostTitle",
                            plugins: [{
                                ptype: "filterheader"
                            }],
                            xtype: "grid",
                            region: "center",
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    iconCls: "#Add",
                                    text: "ایجاد عنوان پست جدید",
                                    listeners: {
                                        click: {
                                            fn: function (item, e) {
                                                showPostTitleWindow(this.up().up().up(), 'Add')
                                            }
                                        }
                                    }
                                }]
                            },
                            title: "عناوين پست ها",
                            columns: {
                                items: [{
                                    width: 35,
                                    xtype: "rownumberer",
                                    items: [{
                                        hidden: true,
                                        html: "&nbsp;",
                                        xtype: "displayfield",
                                        validateOnFocusLeave: true
                                    }],
                                    align: "center",
                                    text: "ردیف"
                                }, {
                                    width: 200,
                                    items: [{
                                        plugins: [{
                                            ptype: "clearbutton"
                                        }],
                                        xtype: "textfield",
                                        validateOnFocusLeave: true
                                    }],
                                    dataIndex: "PostTitle",
                                    text: "عنوان پست"
                                }, {
                                    flex: 1,
                                    items: [{
                                        plugins: [{
                                            ptype: "clearbutton"
                                        }],
                                        xtype: "textfield",
                                        validateOnFocusLeave: true
                                    }],
                                    dataIndex: "PostTitleCode",
                                    sortable: true,
                                    text: "کد پست"
                                }, {
                                    flex: 1,
                                    items: [{
                                        plugins: [{
                                            ptype: "clearbutton"
                                        }],
                                        xtype: "textfield",
                                        validateOnFocusLeave: true
                                    }],
                                    dataIndex: "PostOrgLevelTitle",
                                    sortable: true,
                                    text: "سطح پست"
                                }, {
                                    flex: 1,
                                    items: [{
                                        plugins: [{
                                            ptype: "clearbutton"
                                        }],
                                        xtype: "textfield",
                                        validateOnFocusLeave: true
                                    }],
                                    dataIndex: "JobTitle",
                                    sortable: true,
                                    text: "شغل"
                                }, {
                                    flex: 1,
                                    items: [{
                                        plugins: [{
                                            ptype: "clearbutton"
                                        }],
                                        xtype: "textfield",
                                        validateOnFocusLeave: true
                                    }],
                                    dataIndex: "ActivityTypeTitle",
                                    sortable: true,
                                    text: "نوع فعالیت"
                                }, {
                                    width: 60,
                                    xtype: "commandcolumn",
                                    items: [{
                                        hidden: true,
                                        html: "&nbsp;",
                                        xtype: "displayfield",
                                        validateOnFocusLeave: true
                                    }],
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
                                        iconCls: "#NoteEdit"
                                    }],
                                    listeners: {
                                        command: {
                                            fn: function (item, command, record, recordIndex, cellIndex) {
                                                editPostTitle(command, record, App.TabBusinessAnalysisPostTitle)
                                            }
                                        }
                                    }
                                }]
                            },
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        getPostTitles(this)
                                    }
                                }
                            }
                        }],
                        layout: "fit",
                        title: "مديريت عناوين پست ها",
                        iconCls: "#ChartLine"
                    }, {
                        id: "TabBusinessAnalysisPostOrgLevel",
                        rtl: true,
                        layout: "fit",
                        title: "تعریف سطح سازمانی پست ها",
                        iconCls: "#SitemapColor",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'سطح سازمانی پست', 'ایجاد سطح پست جدید', 'Company_PostTitle', 'PostOrgLevel', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabBusinessAnalysisField",
                        items: [{
                            id: "TabBusinessAnalysis_Fields",
                            frame: true,
                            xtype: "form",
                            keyMap: {
                                "ENTER": function () {
                                    saveBusinessAnalysisField(this.up().up())
                                }
                            },
                            region: "center",
                            autoScroll: true,
                            items: [{
                                id: "TabBusinessAnalysis_txtFieldType",
                                xtype: "textfield",
                                fieldLabel: "نوع",
                                fieldStyle: "text-align:center;font-weight:bold !important",
                                validateOnFocusLeave: true,
                                editable: false
                            }, {
                                id: "TabBusinessAnalysis_txtFieldTitle",
                                xtype: "textfield",
                                fieldLabel: "عنوان",
                                validateOnFocusLeave: true,
                                allowBlank: false,
                                blankText: "این فیلد باید پر باشد"
                            }, {
                                id: "TabBusinessAnalysis_txtFieldCode",
                                xtype: "textfield",
                                fieldLabel: "کد",
                                validateOnFocusLeave: true
                            }],
                            layout: {
                                type: "table",
                                itemCls: "width-full",
                                columns: 1
                            },
                            buttons: [{
                                id: "btnSaveBusinessAnalysisField",
                                tabIndex: 12,
                                handler: function () {
                                    saveBusinessAnalysisField(this.up().up())
                                },
                                iconCls: "#Disk",
                                text: "ذخیره"
                            }],
                            url: unescape("%2fdefault.aspx"),
                            fieldDefaults: {
                                labelAlign: "top",
                                msgTarget: "side"
                            }
                        }, {
                            id: "TabBusinessAnalysis_treeFields",
                            width: 350,
                            xtype: "treepanel",
                            region: "west",
                            split: true,
                            autoScroll: true,
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    handler: function () {
                                        addNewCategory()
                                    },
                                    iconCls: "#Add",
                                    text: "ایجاد رسته جدید"
                                }, {
                                    handler: function () {
                                        addNewField()
                                    },
                                    iconCls: "#Add",
                                    text: "ایجاد رشته جدید"
                                }, {
                                    handler: function () {
                                        deleteFieldCategory()
                                    },
                                    iconCls: "#Delete",
                                    text: "حذف"
                                }, {
                                    xtype: "tbspacer"
                                }],
                                layout: {
                                    type: "table",
                                    itemCls: "width-full",
                                    columns: 5
                                }
                            },
                            useArrows: true,
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        getFieldsTreeBinder(this)
                                    }
                                },
                                itemclick: {
                                    fn: function (item, record, node, index, e) {
                                        getFieldInfo(this)
                                    }
                                }
                            }
                        }],
                        layout: "border",
                        title: "تعریف رسته و رشته شغلی",
                        iconCls: "#Book"
                    }, {
                        id: "TabBusinessAnalysisJobLevels",
                        rtl: true,
                        layout: "fit",
                        title: "تعریف رده های شغلی",
                        iconCls: "#Cart",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'رده های شغلی', 'تعریف رده شغلی جدید', 'Company_Job', 'JobLevel', 1))
                                }
                            }
                        }
                    }, {
                        id: "TabBusinessAnalysisJobGroup",
                        rtl: true,
                        layout: "fit",
                        title: "تعریف گروه های شغلی",
                        iconCls: "#Group",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'گروه شغلی', 'تعریف گروه شغلی جدید', 'Company_Job', 'JobGroup', 1))
                                }
                            }
                        }
                    }, {
                        id: "TabBusinessAnalysisJobCategory",
                        rtl: true,
                        layout: "fit",
                        title: "تعریف طبقه های شغلی",
                        iconCls: "#ChartBar",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'طبقه شغلی', 'تعریف طبقه شغلی جدید', 'Company_Job', 'JobCategory', 1))
                                }
                            }
                        }
                    }],
                    layout: "fit",
                    bodyPadding: 1,
                    activeTab: 2
                }],
                layout: "fit",
                bodyPadding: 5,
                closeAction: "destroy",
                title: "تجزیه و تحلیل مشاغل",
                iconCls: "#ChartCurve",
                maximizable: true
            });
        });
    });
    Ext.net.Desktop.addModule(Ext.create("Ext.ux.desktop.Module", {
        id: "BaseInfoModule",
        shortcut: {
            iconCls: "x-baseinfo1-icon",
            sortIndex: 6,
            name: "مدیریت اطلاعات پایه",
            textCls: "shortcut-text",
            module: "BaseInfoModule"
        }
    }));
    Ext.net.Desktop.getModule("BaseInfoModule").addLauncher({
        xtype: "menuitem",
        iconCls: "#Information",
        text: "مدیریت اطلاعات پایه"
    });
    Ext.net.Desktop.getModule("BaseInfoModule").addWindow(function () {
        Ext.net.ResourceMgr.load([{
            url: "/ux/tabscrollermenu/TabScrollerMenu-merged-js/ext.axd?v=4.6.0"
        }, {
            mode: "css",
            url: "/ux/resources/tabscrollermenu-embedded-css/ext.axd?v=4.6.0"
        }], function () {
            Ext.net.ResourceMgr.destroyCmp("App.BaseInfoWindow");
            Ext.net.Desktop.getModule("BaseInfoModule").setWindow({
                id: "BaseInfoWindow",
                autoRender: false,
                height: 700,
                rtl: true,
                width: 1000,
                xtype: "window",
                resizable: false,
                items: [{
                    id: "TabPanelBaseInfo",
                    plugins: [Ext.create("Ext.ux.TabScrollerMenu", {
                        pageSize: 20,
                        maxText: 1000
                    })],
                    xtype: "tabpanel",
                    items: [{
                        id: "TabEmploymentType",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف نوع استخدام",
                        iconCls: "#PageEdit",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', ' نوع استخدام', 'نوع استخدام جدید', 'BaseInfo', 'EmploymentType', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabBusinessAnalysisJobStatus",
                        rtl: true,
                        items: [{
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "ID",
                                        type: "int"
                                    }, {
                                        name: "Title",
                                        type: "string"
                                    }, {
                                        name: "Status"
                                    }, {
                                        name: "StatusTitle",
                                        type: "string"
                                    }, {
                                        name: "IsExperience",
                                        type: "boolean"
                                    }, {
                                        name: "ExperienceTitle"
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
                            id: "gridJobStatus",
                            frame: true,
                            plugins: [{
                                ptype: "rowediting",
                                clicksToEdit: 1,
                                autoCancel: false,
                                saveBtnText: "ذخیره",
                                cancelBtnText: "انصراف",
                                listeners: {
                                    edit: {
                                        fn: function (item, e) {
                                            editJobStatus('Save', this, App.gridJobStatus)
                                        }
                                    }
                                }
                            }],
                            xtype: "grid",
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    iconCls: "#Add",
                                    text: "وضعیت شغلی جدید",
                                    listeners: {
                                        click: {
                                            fn: addJobStatus
                                        }
                                    }
                                }]
                            },
                            columns: {
                                items: [{
                                    width: 25,
                                    xtype: "rownumberer"
                                }, {
                                    width: 400,
                                    dataIndex: "Title",
                                    editor: {
                                        xtype: "textfield",
                                        validateOnFocusLeave: true,
                                        allowBlank: false
                                    },
                                    text: "عنوان"
                                }, {
                                    flex: 1,
                                    dataIndex: "StatusTitle",
                                    editor: {
                                        xtype: "combobox",
                                        validateOnFocusLeave: true,
                                        editable: false,
                                        queryMode: "local",
                                        store: [
                                            ["1", "شاغل"],
                                            ["0", "غیر شاغل"]
                                        ]
                                    },
                                    text: "وضعیت"
                                }, {
                                    flex: 1,
                                    dataIndex: "ExperienceTitle",
                                    editor: {
                                        xtype: "combobox",
                                        validateOnFocusLeave: true,
                                        editable: false,
                                        queryMode: "local",
                                        store: [
                                            ["1", "محاسبه شود"],
                                            ["0", "محاسبه نشود"]
                                        ]
                                    },
                                    text: "سنوات(سابقه)"
                                }, {
                                    width: 60,
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
                                        iconCls: "#NoteEdit"
                                    }],
                                    listeners: {
                                        command: {
                                            fn: function (item, command, record, recordIndex, cellIndex) {
                                                editJobStatus(command, record, this.up().up())
                                            }
                                        }
                                    }
                                }]
                            },
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        gridJobStatusBinder(this)
                                    }
                                },
                                rowclick: {
                                    fn: function (item, record, node, index, e) {
                                        this.editingPlugin.cancelEdit()
                                    }
                                }
                            }
                        }],
                        layout: "fit",
                        title: "تعریف وضعیت های شغلی",
                        iconCls: "#StatusBusy"
                    }, {
                        id: "TabMarriedStatus",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف وضعيت تاهل",
                        iconCls: "#Group",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'وضعيت تاهل', 'وضعيت تاهل جدید', 'BaseInfo', 'MarriedStatus', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabMilitaryServiceStatus",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف وضعيت نظام وظيفه",
                        iconCls: "#UserStar",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'وضعيت نظام وظيفه', 'وضعيت نظام وظيفه جدید', 'BaseInfo', 'MilitaryServiceStatus', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabPhysicalStatus",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف وضعيت جسمانی",
                        iconCls: "#HeartBroken",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'وضعيت جسمانی', 'وضعيت جسمانی جدید', 'BaseInfo', 'PhysicalStatus', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabSponsorshipStatus",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف وضعيت تكفل",
                        iconCls: "#UserHome",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'وضعيت تكفل', 'وضعيت تكفل جدید', 'BaseInfo', 'SponsorshipStatus', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabFields",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف رشته تحصيلی",
                        iconCls: "#BookEdit",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'رشته تحصيلی', 'رشته تحصيلی جدید', 'BaseInfo', 'Field', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabUnivercityType",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف نوع دانشگاه",
                        iconCls: "#Building",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'نوع دانشگاه', 'نوع دانشگاه جدید', 'BaseInfo', 'UnivercityType', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabUnivercites",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف دانشگاه",
                        iconCls: "#Rosette",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', ' دانشگاه ها', 'دانشگاه جدید', 'BaseInfo', 'Univercity', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabContractType",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف نوع قرارداد",
                        iconCls: "#TextSignature",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', ' نوع قرارداد', 'نوع قرارداد جدید', 'BaseInfo', 'ContractType', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabContractBy",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف طرف قرارداد",
                        iconCls: "#PageEdit",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'طرف قرارداد', 'طرف قرارداد جدید', 'BaseInfo', 'ContractBy', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabActivityScope",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف حوزه فعاليت",
                        iconCls: "#ApplicationViewTile",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'حوزه های فعاليت', 'حوزه فعاليت جدید', 'BaseInfo', 'ActivityScope', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabInsuranceType",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف نوع بيمه",
                        iconCls: "#Tick",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'نوع بيمه', 'نوع بيمه جدید', 'BaseInfo', 'InsuranceType', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabComputerSkill",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف سطح مهارت رايانه",
                        iconCls: "#Monitor",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'سطح مهارت رايانه', 'سطح جدید', 'BaseInfo', 'ComputerSkill', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabForeignSkill",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف سطح مهارت زبان خارجه",
                        iconCls: "#SortAscending",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'سطح مهارت زبان خارجه', 'سطح جدید', 'BaseInfo', 'ForeignSkill', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabForeignLanguage",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف زبان خارجه",
                        iconCls: "#Font",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'زبان خارجه', 'زبان خارجه جدید', 'BaseInfo', 'ForeignLanguage', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabFamilyKinship",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف نسبت خانوادگی ",
                        iconCls: "#GroupLink",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'نسبت خانوادگی', 'نسبت خانوادگی جدید', 'BaseInfo', 'FamilyKinship', 0))
                                }
                            }
                        }
                    }, {
                        id: "TabYear",
                        rtl: true,
                        layout: "fit",
                        title: "تعريف سال",
                        iconCls: "#Date",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    this.items.add(getGridConstant(null, '', 'سال', 'سال جدید', 'BaseInfo', 'Year', 0))
                                }
                            }
                        }
                    }],
                    layout: "fit",
                    bodyPadding: 1,
                    activeTab: 0
                }],
                layout: "fit",
                bodyPadding: 5,
                closeAction: "destroy",
                title: "مدیریت اطلاعات پایه",
                iconCls: "#Cog"
            });
        });
    });
    Ext.net.Desktop.addModule(Ext.create("Ext.ux.desktop.Module", {
        id: "PersonnelsManagementModule",
        shortcut: {
            iconCls: "x-personnel-icon",
            sortIndex: 7,
            name: "مدیریت پرسنل",
            module: "PersonnelsManagementModule"
        }
    }));
    Ext.net.Desktop.getModule("PersonnelsManagementModule").addLauncher({
        xtype: "menuitem",
        iconCls: "#Building",
        text: "مدیریت پرسنل"
    });
    Ext.net.Desktop.getModule("PersonnelsManagementModule").addWindow(function () {
        Ext.net.ResourceMgr.load([{
            url: "/ux/taglabel/taglabel-js/ext.axd?v=4.6.0"
        }, {
            mode: "css",
            url: "/ux/resources/taglabel-embedded-css/ext.axd?v=4.6.0"
        }], function () {
            Ext.net.ResourceMgr.destroyCmp("App.PersonnelsManagementWindow");
            Ext.net.Desktop.getModule("PersonnelsManagementModule").setWindow({
                id: "PersonnelsManagementWindow",
                autoRender: false,
                height: 600,
                rtl: true,
                width: 900,
                xtype: "window",
                resizable: true,
                items: [{
                    bin: [Ext.create("Ext.panel.Panel", {
                        id: "TabPersonnelInfo",
                        hidden: true,
                        rtl: true,
                        items: [{
                            id: "PersonnelShowInfo",
                            rtl: true,
                            region: "north",
                            split: true,
                            items: [{
                                border: false,
                                maxHeight: 220,
                                maxWidth: 140,
                                minHeight: 220,
                                minWidth: 130,
                                rtl: true,
                                items: [{
                                    maxHeight: 180,
                                    maxWidth: 140,
                                    minHeight: 180,
                                    minWidth: 130,
                                    padding: "0px 0px 5px 0px",
                                    width: 140,
                                    xtype: "netimage",
                                    colspan: 2,
                                    src: ""
                                }, {
                                    xtype: "filefield",
                                    validateOnFocusLeave: true,
                                    iconCls: "#UserAdd",
                                    buttonConfig: {
                                        iconCls: "#UserAdd"
                                    },
                                    buttonText: ""
                                }, {
                                    xtype: "button",
                                    iconCls: "#Disk",
                                    tooltip: "ذخیره عکس",
                                    listeners: {
                                        click: {
                                            fn: function (item, e) {
                                                savePersonnelPhoto(this.prev())
                                            }
                                        }
                                    }
                                }],
                                layout: {
                                    type: "table",
                                    itemCls: "width-full",
                                    columns: 2
                                },
                                bodyStyle: "background:#f1f1f1;"
                            }, {
                                rtl: true,
                                items: [{
                                    id: "lblPersonnel_FirstName",
                                    xtype: "displayfield",
                                    fieldLabel: "نام",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_LastName",
                                    xtype: "displayfield",
                                    fieldLabel: "نام خانوادگی",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_Code",
                                    xtype: "displayfield",
                                    fieldLabel: "کد پرسنلی",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_StatusTypeTitle",
                                    xtype: "displayfield",
                                    fieldLabel: "وضعیت اشتغال",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_NationalCode",
                                    xtype: "displayfield",
                                    fieldLabel: "کد ملی",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_FatherName",
                                    xtype: "displayfield",
                                    fieldLabel: "نام پدر ",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_BirthDate",
                                    xtype: "displayfield",
                                    fieldLabel: "تاریخ تولد",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }],
                                layout: {
                                    type: "table",
                                    itemCls: "width-full",
                                    columns: 1
                                },
                                bodyStyle: "background:#f1f1f1;",
                                bodyPadding: 5
                            }, {
                                rtl: true,
                                items: [{
                                    id: "lblPersonnel_MarriedStatusTitle",
                                    xtype: "displayfield",
                                    fieldLabel: "وضعیت تأهل",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_EducationGradeTitle",
                                    xtype: "displayfield",
                                    fieldLabel: "مدرک تحصیلی",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_SumExprience",
                                    xtype: "displayfield",
                                    fieldLabel: "سنوات خدمت",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_EmploymentTypeTitle",
                                    xtype: "displayfield",
                                    fieldLabel: "نوع استخدام",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_StartDate",
                                    xtype: "displayfield",
                                    fieldLabel: "تاریخ استخدام",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_JobGroupTitle",
                                    xtype: "displayfield",
                                    fieldLabel: "گروه/طبقه/رتبه",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_MainUnitTitle",
                                    xtype: "displayfield",
                                    fieldLabel: "محل خدمت",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }],
                                layout: {
                                    type: "table",
                                    itemCls: "width-full",
                                    columns: 1
                                },
                                bodyStyle: "background:#f1f1f1;",
                                bodyPadding: 5
                            }, {
                                rtl: true,
                                items: [{
                                    id: "lblPersonnel_PostName",
                                    xtype: "displayfield",
                                    fieldLabel: "پست سازمانی",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_JobTitle",
                                    xtype: "displayfield",
                                    fieldLabel: "شغل",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_UnitName",
                                    xtype: "displayfield",
                                    fieldLabel: "واحد",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_InsuranceTypeTitle",
                                    xtype: "displayfield",
                                    fieldLabel: "نوع بیمه",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_JobStatusTitle",
                                    xtype: "displayfield",
                                    fieldLabel: "وضعیت شغلی",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_TaxGroupTitle",
                                    xtype: "displayfield",
                                    fieldLabel: "گروه مالیاتی",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "lblPersonnel_InsuranceGroupTitle",
                                    xtype: "displayfield",
                                    fieldLabel: "گروه بیمه ای",
                                    fieldStyle: "color:#205a8c",
                                    validateOnFocusLeave: true
                                }],
                                layout: {
                                    type: "table",
                                    itemCls: "width-full",
                                    columns: 1
                                },
                                bodyStyle: "background:#f1f1f1;",
                                bodyPadding: 5
                            }],
                            layout: {
                                type: "table",
                                itemCls: "width-full",
                                columns: 4
                            },
                            bodyStyle: "background:#f1f1f1;",
                            bodyPadding: 5,
                            collapsible: true,
                            title: "اطلاعات پرسنلی",
                            iconCls: "#Vcard"
                        }, {
                            border: false,
                            rtl: true,
                            xtype: "tabpanel",
                            region: "center",
                            items: [{
                                id: "TabPersonnelPersonalInfo",
                                rtl: true,
                                xtype: "form",
                                keyMap: {
                                    "ENTER": function () {
                                        savePersonnelInfo(this.up('form'))
                                    }
                                },
                                items: [{
                                    id: "txtPersonnel_FirstName",
                                    xtype: "textfield",
                                    fieldLabel: "نام",
                                    validateOnChange: false,
                                    validateOnFocusLeave: true,
                                    allowBlank: false,
                                    blankText: ".این فیلد باید پر باشد"
                                }, {
                                    id: "txtPersonnel_LastName",
                                    tabIndex: 1,
                                    xtype: "textfield",
                                    fieldLabel: "نام خانوادگی",
                                    validateOnFocusLeave: true,
                                    allowBlank: false,
                                    blankText: ".این فیلد باید پر باشد"
                                }, {
                                    id: "txtPersonnel_Code",
                                    tabIndex: 2,
                                    xtype: "textfield",
                                    fieldLabel: "کد پرسنلی",
                                    validateOnFocusLeave: true,
                                    maskRe: /[0-9-]/
                                }, {
                                    id: "txtPersonnel_NationalCode",
                                    tabIndex: 3,
                                    xtype: "textfield",
                                    fieldLabel: "کد ملی",
                                    validateOnFocusLeave: true,
                                    vtype: "isValidNationalCode",
                                    vtypeText: ".کد ملی نامعتبر است",
                                    allowBlank: false,
                                    blankText: ".این فیلد باید پر باشد",
                                    enforceMaxLength: true,
                                    maskRe: /[0-9-]/,
                                    maxLength: 10,
                                    minLength: 10,
                                    minLengthText: "این فیلد باید 10 رقم باشد"
                                }, {
                                    id: "txtPersonnel_FatherName",
                                    tabIndex: 4,
                                    xtype: "textfield",
                                    fieldLabel: "نام پدر",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "txtPersonnel_BCID",
                                    tabIndex: 5,
                                    xtype: "textfield",
                                    fieldLabel: "شماره شناسنامه",
                                    validateOnFocusLeave: true,
                                    maskRe: /[0-9-]/
                                }, {
                                    id: "txtPersonnel_IssueLocationCity",
                                    tabIndex: 6,
                                    xtype: "textfield",
                                    fieldLabel: "محل صدور",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    triggers: {
                                        "_trigger1": {
                                            handler: function () {
                                                openCitiesModalWindow(App.TabPersonnelInfo, App.txtPersonnel_IssueLocationCity)
                                            },
                                            tag: "_trigger1",
                                            cls: Ext.form.trigger.Trigger.getIcon("Search")
                                        }
                                    }
                                }, {
                                    id: "txtPersonnel_BirthLocationCity",
                                    tabIndex: 7,
                                    xtype: "textfield",
                                    fieldLabel: "محل تولد",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    triggers: {
                                        "_trigger1": {
                                            handler: function () {
                                                openCitiesModalWindow(App.TabPersonnelInfo, App.txtPersonnel_BirthLocationCity)
                                            },
                                            tag: "_trigger1",
                                            cls: Ext.form.trigger.Trigger.getIcon("Search")
                                        }
                                    }
                                }, {
                                    id: "txtPersonnel_BirthDate",
                                    rtl: false,
                                    tabIndex: 8,
                                    xtype: "textfield",
                                    fieldLabel: "تاریخ تولد",
                                    fieldStyle: "text-align:center",
                                    labelStyle: "direction:rtl",
                                    validateOnFocusLeave: true,
                                    vtype: "isValidDate",
                                    vtypeText: "تاریخ نامعتبر است",
                                    iconCls: "#Date",
                                    inputMask: "9999/99/99"
                                }, {
                                    id: "txtPersonnel_Sex",
                                    tabIndex: 9,
                                    xtype: "combobox",
                                    fieldLabel: "جنسیت",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    queryMode: "local",
                                    store: [
                                        ["1", "مرد"],
                                        ["2", "زن"]
                                    ]
                                }, {
                                    id: "txtPersonnel_MarriedStatus",
                                    tabIndex: 10,
                                    xtype: "combobox",
                                    fieldLabel: "وضعیت تاهل",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    queryMode: "local",
                                    store: Ext.data.StoreManager.getArrayStore(2),
                                    listeners: {
                                        afterrender: {
                                            fn: function (item) {
                                                comboBoxConstantBinder(this, 'BaseInfo', 'MarriedStatus', 1, 'ID')
                                            }
                                        }
                                    }
                                }, {
                                    id: "txtPersonnel_MarriageDate",
                                    rtl: false,
                                    tabIndex: 11,
                                    xtype: "textfield",
                                    fieldLabel: "تاریخ ازدواج",
                                    fieldStyle: "text-align:center",
                                    labelStyle: "direction:rtl",
                                    validateOnFocusLeave: true,
                                    vtype: "isValidDate",
                                    vtypeText: "تاریخ نامعتبر است",
                                    iconCls: "#Date",
                                    inputMask: "9999/99/99"
                                }, {
                                    id: "txtPersonnel_MilitaryServiceStatus",
                                    tabIndex: 12,
                                    xtype: "combobox",
                                    fieldLabel: "وضعیت نظام وظیفه",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    queryMode: "local",
                                    store: Ext.data.StoreManager.getArrayStore(2),
                                    listeners: {
                                        afterrender: {
                                            fn: function (item) {
                                                comboBoxConstantBinder(this, 'BaseInfo', 'MilitaryServiceStatus', 1, 'ID')
                                            }
                                        }
                                    }
                                }, {
                                    id: "txtPersonnel_MilitaryServiceStartDate",
                                    rtl: false,
                                    tabIndex: 13,
                                    xtype: "textfield",
                                    fieldLabel: "تاریخ شروع خدمت",
                                    fieldStyle: "text-align:center",
                                    labelStyle: "direction:rtl",
                                    validateOnFocusLeave: true,
                                    vtype: "isValidDate",
                                    vtypeText: "تاریخ نامعتبر است",
                                    iconCls: "#Date",
                                    inputMask: "9999/99/99"
                                }, {
                                    id: "txtPersonnel_MilitaryServiceEndDate",
                                    rtl: false,
                                    tabIndex: 13,
                                    xtype: "textfield",
                                    fieldLabel: "تاریخ پایان خدمت",
                                    fieldStyle: "text-align:center",
                                    labelStyle: "direction:rtl",
                                    validateOnFocusLeave: true,
                                    vtype: "isValidDate",
                                    vtypeText: "تاریخ نامعتبر است",
                                    iconCls: "#Date",
                                    inputMask: "9999/99/99"
                                }, {
                                    id: "txtPersonnel_MilitaryServiceDuration",
                                    tabIndex: 14,
                                    xtype: "numberfield",
                                    fieldLabel: "مدت سربازی(روز)",
                                    validateOnFocusLeave: true,
                                    decimalSeparator: ".",
                                    maxValue: 750.0,
                                    minValue: 0.0
                                }],
                                layout: {
                                    type: "table",
                                    itemCls: "width-full",
                                    columns: 6
                                },
                                bodyStyle: "background:#f1f1f1;",
                                bodyPadding: 5,
                                buttons: [{
                                    iconCls: "#Disk",
                                    text: "ذخیره",
                                    listeners: {
                                        click: {
                                            fn: function (item, e) {
                                                savePersonnelInfo(this.up('form'))
                                            }
                                        }
                                    }
                                }],
                                title: "اطلاعات فردی",
                                iconCls: "#UserTick",
                                url: unescape("%2fdefault.aspx"),
                                fieldDefaults: {
                                    labelAlign: "top",
                                    msgTarget: "side"
                                }
                            }, {
                                id: "TabPersonnelEmploymentInfo",
                                rtl: true,
                                xtype: "form",
                                keyMap: {
                                    "ENTER": function () {
                                        savePersonnelInfo(this.up('form'))
                                    }
                                },
                                items: [{
                                    id: "txtPersonnel_StartDate",
                                    rtl: false,
                                    tabIndex: 1,
                                    xtype: "textfield",
                                    fieldLabel: "تاریخ استخدام",
                                    fieldStyle: "text-align:center",
                                    labelStyle: "direction:rtl",
                                    validateOnFocusLeave: true,
                                    vtype: "isValidDate",
                                    vtypeText: "تاریخ نامعتبر است",
                                    iconCls: "#Date",
                                    inputMask: "9999/99/99"
                                }, {
                                    id: "txtPersonnel_CollaborationStartDate",
                                    rtl: false,
                                    tabIndex: 2,
                                    xtype: "textfield",
                                    fieldLabel: "تاریخ شروع همکاری",
                                    fieldStyle: "text-align:center",
                                    labelStyle: "direction:rtl",
                                    validateOnFocusLeave: true,
                                    vtype: "isValidDate",
                                    vtypeText: "تاریخ نامعتبر است",
                                    iconCls: "#Date",
                                    inputMask: "9999/99/99"
                                }, {
                                    id: "txtPersonnel_CollaborationEndDate",
                                    rtl: false,
                                    tabIndex: 3,
                                    xtype: "textfield",
                                    fieldLabel: "تاریخ پایان همکاری",
                                    fieldStyle: "text-align:center",
                                    labelStyle: "direction:rtl",
                                    validateOnFocusLeave: true,
                                    vtype: "isValidDate",
                                    vtypeText: "تاریخ نامعتبر است",
                                    iconCls: "#Date",
                                    inputMask: "9999/99/99"
                                }, {
                                    id: "cmbPersonnel_JobStatus",
                                    tabIndex: 4,
                                    xtype: "combobox",
                                    fieldLabel: "وضعیت شغلی",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    queryMode: "local",
                                    store: Ext.data.StoreManager.getArrayStore(2),
                                    listeners: {
                                        afterrender: {
                                            fn: function (item) {
                                                comboBoxJobStatusBinder(this)
                                            }
                                        }
                                    }
                                }, {
                                    id: "cmbPersonnel_EmploymentType",
                                    tabIndex: 5,
                                    xtype: "combobox",
                                    fieldLabel: "نوع استخدام",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    queryMode: "local",
                                    store: Ext.data.StoreManager.getArrayStore(2),
                                    listeners: {
                                        afterrender: {
                                            fn: function (item) {
                                                comboBoxConstantBinder(this, 'BaseInfo', 'EmploymentType', 1, 'ID')
                                            }
                                        }
                                    }
                                }, {
                                    id: "cmbPersonnel_ContractBy",
                                    tabIndex: 6,
                                    xtype: "combobox",
                                    fieldLabel: "طرف قرارداد",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    queryMode: "local",
                                    store: Ext.data.StoreManager.getArrayStore(2),
                                    listeners: {
                                        afterrender: {
                                            fn: function (item) {
                                                comboBoxConstantBinder(this, 'BaseInfo', 'ContractBy', 1, 'ID')
                                            }
                                        }
                                    }
                                }, {
                                    id: "cmbPersonnel_JobGroup",
                                    tabIndex: 7,
                                    xtype: "combobox",
                                    fieldLabel: "گروه/طبقه",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    queryMode: "local",
                                    store: Ext.data.StoreManager.getArrayStore(2),
                                    listeners: {
                                        afterrender: {
                                            fn: function (item) {
                                                comboBoxConstantBinder(this, 'Company_Job', 'JobGroup', 1, 'ID')
                                            }
                                        }
                                    }
                                }],
                                layout: {
                                    type: "table",
                                    itemCls: "width-full",
                                    columns: 6
                                },
                                bodyStyle: "background:#f1f1f1;",
                                bodyPadding: 5,
                                buttons: [{
                                    iconCls: "#Disk",
                                    text: "ذخیره",
                                    listeners: {
                                        click: {
                                            fn: function (item, e) {
                                                savePersonnelInfo(this.up('form'))
                                            }
                                        }
                                    }
                                }],
                                title: "اطلاعات استخدامی",
                                iconCls: "#ScriptEdit",
                                url: unescape("%2fdefault.aspx"),
                                fieldDefaults: {
                                    labelAlign: "top",
                                    msgTarget: "side"
                                }
                            }],
                            layout: "fit",
                            activeTab: 0,
                            listeners: {
                                tabchange: {
                                    fn: getPersonnelInfo
                                }
                            }
                        }],
                        layout: "border",
                        closable: true,
                        closeAction: "hide",
                        closeToolText: "بستن",
                        title: "اطلاعات پرسنلی",
                        iconCls: "#ReportUser"
                    })],
                    id: "TabPanelPersonnelsManagement",
                    xtype: "tabpanel",
                    items: [{
                        id: "TabPersonnelsSearch",
                        cls: "personnel-search",
                        rtl: true,
                        items: [{
                            id: "PPSFilter",
                            cls: "filter",
                            rtl: true,
                            xtype: "form",
                            keyMap: {
                                "ENTER": function () {
                                    personnelSearch(this.up('form'), 1)
                                }
                            },
                            region: "north",
                            split: true,
                            items: [{
                                rtl: true,
                                xtype: "form",
                                autoScroll: true,
                                items: [{
                                    id: "TabPersonnelsSearch_FullName",
                                    xtype: "textfield",
                                    fieldLabel: "نام و نام خانوادگی",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "TabPersonnelsSearch_Code",
                                    tabIndex: 1,
                                    xtype: "textfield",
                                    fieldLabel: "کد پرسنلی",
                                    validateOnFocusLeave: true,
                                    maskRe: /[0-9-]/
                                }, {
                                    id: "TabPersonnelsSearch_NationalCode",
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
                                    id: "TabPersonnelsSearch_Sex",
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
                                    id: "TabPersonnelsSearch_StatusType",
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
                                    id: "TabPersonnelsSearch_EducationGrade",
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
                                    id: "TabPersonnelsSearch_MarriedStatus",
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
                                    id: "TabPersonnelsSearch_InsuranceType",
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
                                    id: "TabPersonnelsSearch_ContractBy",
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
                                    id: "TabPersonnelsSearch_JobStatus",
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
                                    id: "TabPersonnelsSearch_EmploymentType",
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
                                url: unescape("%2fdefault.aspx"),
                                fieldDefaults: {
                                    labelAlign: "top"
                                }
                            }, {
                                border: false,
                                rtl: true,
                                xtype: "form",
                                items: [{
                                    id: "TabPersonnelsSearch_PostActivityType",
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
                                    id: "TabPersonnelsSearch_Organization",
                                    xtype: "textfield",
                                    fieldLabel: "محل خدمت",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    triggers: {
                                        "_trigger1": {
                                            handler: function () {
                                                (new OrganizitionTreeSelect(this.up('[cls=personnel-search]'), this)).show()
                                            },
                                            tag: "_trigger1",
                                            cls: Ext.form.trigger.Trigger.getIcon("Search")
                                        }
                                    }
                                }, {
                                    id: "TabPersonnelsSearch_PostTitle",
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
                                url: unescape("%2fdefault.aspx"),
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
                                id: "2d9f4902-de5d-4bbb-883b-a9851c56180a",
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
                            url: unescape("%2fdefault.aspx")
                        }, {
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "ID",
                                        type: "int"
                                    }, {
                                        name: "Code"
                                    }, {
                                        name: "FirstName"
                                    }, {
                                        name: "LastName"
                                    }, {
                                        name: "NationalCode"
                                    }, {
                                        name: "UnitName"
                                    }, {
                                        name: "ServiceLocationTitle"
                                    }, {
                                        name: "PostName"
                                    }, {
                                        name: "EmploymentTypeTitle"
                                    }, {
                                        name: "EducationGradeTitle"
                                    }, {
                                        name: "StatusTypeTitle"
                                    }, {
                                        name: "FullName"
                                    }]
                                }),
                                pageSize: 5,
                                proxy: {
                                    type: "page",
                                    reader: {
                                        type: "json"
                                    }
                                }
                            },
                            id: "TabPanelPersonnelsManagement_gridPersonnelSearch",
                            xtype: "grid",
                            region: "center",
                            bbar: {
                                xtype: "pagingtoolbar",
                                items: [{
                                    xtype: "netlabel",
                                    text: "تعداد نمایش در صفحه:"
                                }, {
                                    width: 10,
                                    xtype: "tbspacer"
                                }, {
                                    width: 80,
                                    xtype: "combobox",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    selectedItems: [{
                                        value: "5"
                                    }],
                                    queryMode: "local",
                                    store: [
                                        ["1", "1"],
                                        ["2", "2"],
                                        ["5", "5"],
                                        ["10", "10"],
                                        ["20", "20"],
                                        ["50", "50"],
                                        ["100", "100"],
                                        ["10000", "همه"]
                                    ],
                                    listeners: {
                                        select: {
                                            fn: function (item, records) {
                                                App.TabPanelPersonnelsManagement_gridPersonnelSearch.store.pageSize = parseInt(this.getValue(), 10);
                                                App.TabPanelPersonnelsManagement_gridPersonnelSearch.store.reload();
                                                changePagePersonnel(this.up(), 1)
                                            }
                                        }
                                    }
                                }],
                                displayInfo: true,
                                store: "~\\Modules\\Personnel\\PersonnelEditActionPanel.ascx;personnelEdit('Edit',this)_id3c5a5d60dc72f1ca",
                                afterPageText: "صفحه بعد",
                                beforePageText: "صفحه قبل",
                                firstText: "صفحه اول",
                                lastText: "صفحه آخر",
                                nextText: "صفحه بعد",
                                prevText: "صفحه قبل",
                                refreshText: "بارگذاری مجدد",
                                listeners: {
                                    beforechange: {
                                        fn: changePagePersonnel
                                    }
                                }
                            },
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    handler: function () {
                                        personnelEdit('Add', this.up('gridpanel'))
                                    },
                                    iconCls: "#UserAdd",
                                    text: "پرسنل جدید"
                                }, {
                                    handler: function () {
                                        personnelEdit('Edit', this.up('gridpanel'))
                                    },
                                    iconCls: "#UserEdit",
                                    text: "ویرایش پرسنل"
                                }, {
                                    id: "TabPanelPersonnelsManagement_btnPersonnelDelete",
                                    handler: function () {
                                        personnelEdit('Delete', this.up('gridpanel'))
                                    },
                                    iconCls: "#UserDelete",
                                    text: "حذف پرسنل"
                                }]
                            },
                            columns: {
                                items: [{
                                    width: 35,
                                    xtype: "rownumberer",
                                    align: "center",
                                    text: "ردیف"
                                }, {
                                    width: 100,
                                    dataIndex: "Code",
                                    text: "کد پرسنلی"
                                }, {
                                    hidden: true,
                                    width: 150,
                                    dataIndex: "FullName",
                                    sortable: true,
                                    text: "نام و نام خانوادگی"
                                }, {
                                    width: 100,
                                    dataIndex: "FirstName",
                                    sortable: true,
                                    text: "نام"
                                }, {
                                    width: 100,
                                    dataIndex: "LastName",
                                    sortable: true,
                                    text: "نام خانوادگی"
                                }, {
                                    width: 100,
                                    dataIndex: "NationalCode",
                                    sortable: true,
                                    text: "کد ملی"
                                }, {
                                    width: 200,
                                    dataIndex: "UnitName",
                                    sortable: true,
                                    text: "محل خدمت"
                                }, {
                                    flex: 1,
                                    dataIndex: "ServiceLocationTitle",
                                    sortable: true,
                                    text: "واحد سازمانی"
                                }, {
                                    flex: 1,
                                    dataIndex: "PostName",
                                    sortable: true,
                                    text: "پست"
                                }, {
                                    width: 70,
                                    dataIndex: "EmploymentTypeTitle",
                                    sortable: true,
                                    text: "نوع استخدام "
                                }, {
                                    width: 100,
                                    dataIndex: "EducationGradeTitle",
                                    sortable: true,
                                    text: "مدرک تحصیلی"
                                }, {
                                    width: 60,
                                    dataIndex: "StatusTypeTitle",
                                    sortable: true,
                                    text: "وضعيت"
                                }]
                            },
                            listeners: {
                                rowdblclick: {
                                    fn: function (item, record, node, index, e) {
                                        personnelEdit('Edit', this)
                                    }
                                }
                            }
                        }],
                        layout: "border",
                        title: "مدیریت پرسنل",
                        iconCls: "#GroupGear"
                    }],
                    layout: "fit",
                    bodyPadding: 1,
                    activeTab: 0
                }],
                layout: "fit",
                bodyPadding: 5,
                closeAction: "destroy",
                title: "مدیریت پرسنل",
                iconCls: "#Group",
                maximizable: true
            });
        });
    });
    Ext.net.Desktop.addModule(Ext.create("Ext.ux.desktop.Module", {
        id: "SentenceManagementModule",
        shortcut: {
            iconCls: "x-sentence-icon",
            sortIndex: 8,
            name: "احکام",
            module: "SentenceManagementModule"
        }
    }));
    Ext.net.Desktop.getModule("SentenceManagementModule").addLauncher({
        xtype: "menuitem",
        iconCls: "#ScriptEdit",
        text: "احکام"
    });
    Ext.net.Desktop.getModule("SentenceManagementModule").addWindow(function () {
        Ext.net.ResourceMgr.load([{
            url: "/ux/taglabel/taglabel-js/ext.axd?v=4.6.0"
        }, {
            mode: "css",
            url: "/ux/resources/taglabel-embedded-css/ext.axd?v=4.6.0"
        }], function () {
            Ext.net.ResourceMgr.destroyCmp("App.SentencetWindow");
            Ext.net.Desktop.getModule("SentenceManagementModule").setWindow({
                id: "SentencetWindow",
                autoRender: false,
                height: 600,
                rtl: true,
                width: 1100,
                xtype: "window",
                items: [{
                    id: "TabPanelSentencet",
                    xtype: "tabpanel",
                    items: [{
                        id: "TabSentenceItems",
                        items: [{
                            id: "pnlSentencetItemsSearch",
                            frame: true,
                            rtl: true,
                            keyMap: {
                                "ENTER": function () {
                                    getSentenceItems(App.pnlSentencetItemsSearch)
                                }
                            },
                            region: "north",
                            items: [{
                                id: "txtSIF_Title",
                                xtype: "textfield",
                                fieldLabel: "عنوان عامل",
                                validateOnFocusLeave: true
                            }, {
                                id: "txtSIF_EnglishTitle",
                                xtype: "textfield",
                                fieldLabel: "عنوان لاتین",
                                validateOnFocusLeave: true
                            }, {
                                id: "txtSIF_Code",
                                xtype: "textfield",
                                fieldLabel: "کد عامل",
                                validateOnFocusLeave: true,
                                maskRe: /[0-9-]/
                            }, {
                                id: "tagSIF_EmploymentType",
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
                            }, {
                                id: "cmbSIF_CalcType",
                                tabIndex: 4,
                                xtype: "combobox",
                                fieldLabel: "نوع محاسبه",
                                validateOnFocusLeave: true,
                                editable: false,
                                selectedItems: [{
                                    value: "-1"
                                }],
                                queryMode: "local",
                                store: [
                                    ["-1", "همه"],
                                    ["1", "روزانه"],
                                    ["2", "ماهانه"]
                                ]
                            }],
                            layout: {
                                type: "table",
                                itemCls: "width-full",
                                columns: 3
                            },
                            bodyPadding: 5,
                            buttons: [{
                                iconCls: "#Zoom",
                                text: "جستجو",
                                listeners: {
                                    click: {
                                        fn: function (item, e) {
                                            getSentenceItems(this.up('panel'))
                                        }
                                    }
                                }
                            }],
                            title: "جستجو",
                            iconCls: "#Find"
                        }, {
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "ID",
                                        type: "int"
                                    }, {
                                        name: "Code"
                                    }, {
                                        name: "Title"
                                    }, {
                                        name: "EnglishTitle"
                                    }, {
                                        name: "EmploymentTypeTitle"
                                    }, {
                                        name: "IsAddSum",
                                        type: "boolean"
                                    }, {
                                        name: "CalcTypeTitle"
                                    }]
                                }),
                                proxy: {
                                    type: "page",
                                    reader: {
                                        type: "json"
                                    }
                                }
                            },
                            id: "gridSentencetItem",
                            style: "margin-top:5px",
                            xtype: "grid",
                            region: "center",
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    handler: function () {
                                        showSentenceItemWindow(this.up().up().up('panel'), 'Add', 0)
                                    },
                                    iconCls: "#CoinsAdd",
                                    text: "عامل جدید"
                                }, {
                                    handler: function () {
                                        showSentenceItemWindow(this.up().up().up('panel'), 'Edit', getValueGrid(this.up().up(), 'ID'))
                                    },
                                    iconCls: "#Coins",
                                    text: "ویرایش عامل"
                                }, {
                                    handler: function () {
                                        SaveSentenceItem('Delete', getValueGrid(this.up().up(), 'ID'), this.up().up())
                                    },
                                    iconCls: "#CoinsDelete",
                                    text: "حذف عامل"
                                }]
                            },
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
                                    dataIndex: "Code",
                                    text: "کد عامل"
                                }, {
                                    flex: 1,
                                    dataIndex: "EnglishTitle",
                                    sortable: true,
                                    text: "عنوان لاتین"
                                }, {
                                    flex: 1,
                                    dataIndex: "EmploymentTypeTitle",
                                    sortable: true,
                                    text: "نوع استخدام"
                                }, {
                                    xtype: "checkcolumn",
                                    flex: 1,
                                    dataIndex: "IsAddSum",
                                    sortable: true,
                                    text: "محاسبه در جمع"
                                }, {
                                    flex: 1,
                                    dataIndex: "CalcTypeTitle",
                                    sortable: true,
                                    text: "نوع محاسبه"
                                }, {
                                    width: 60,
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
                                        iconCls: "#NoteEdit"
                                    }],
                                    listeners: {
                                        command: {
                                            fn: function (item, command, record, recordIndex, cellIndex) {
                                                if (command === 'Edit') {
                                                    showSentenceItemWindow(this.up().up().up('panel'), 'Edit', record.data.ID)
                                                } else {
                                                    SaveSentenceItem('Delete', record.data.ID, this.up().up())
                                                }
                                            }
                                        }
                                    }
                                }]
                            },
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        getSentenceItems(this.prev('panel'))
                                    }
                                }
                            }
                        }],
                        layout: "border",
                        title: "تعریف عوامل حکم",
                        iconCls: "#Coins"
                    }, {
                        id: "TablSentenceTypes",
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
                                        name: "EmploymentTypeTitle"
                                    }, {
                                        name: "CreateDate"
                                    }, {
                                        name: "JobStatusTitle"
                                    }, {
                                        name: "IssueTypeTitle"
                                    }, {
                                        name: "TypeInstanceID"
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
                            id: "gridSentencetTypes",
                            width: 700,
                            xtype: "grid",
                            region: "west",
                            split: true,
                            collapsible: true,
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    handler: function () {
                                        showSentenceTypeWindow(this.up().up('grid'), 'Add', 0)
                                    },
                                    iconCls: "#ScriptAdd",
                                    text: "نوع حکم جدید"
                                }, {
                                    handler: function () {
                                        showSentenceTypeWindow(this.up().up('grid'), 'Edit', getValueGrid(this.up().up(), 'ID'))
                                    },
                                    iconCls: "#ScriptEdit",
                                    text: "ویرایش نوع حکم"
                                }, {
                                    handler: function () {
                                        SaveSentenceType('Delete', getValueGrid(this.up().up(), 'ID'), this.up().up())
                                    },
                                    iconCls: "#ScriptDelete",
                                    text: "حذف نوع حکم"
                                }]
                            },
                            title: "انواع حکم",
                            iconCls: "#Script",
                            columns: {
                                items: [{
                                    width: 35,
                                    xtype: "rownumberer",
                                    align: "center",
                                    text: "ردیف"
                                }, {
                                    width: 170,
                                    dataIndex: "Title",
                                    text: "عنوان حکم"
                                }, {
                                    flex: 1,
                                    dataIndex: "EmploymentTypeTitle",
                                    sortable: true,
                                    text: "نوع استخدام"
                                }, {
                                    flex: 1,
                                    dataIndex: "IssueTypeTitle",
                                    sortable: true,
                                    text: "نوع صدور"
                                }, {
                                    flex: 1,
                                    dataIndex: "JobStatusTitle",
                                    sortable: true,
                                    text: "وضعیت شغلی"
                                }, {
                                    flex: 1,
                                    dataIndex: "CreateDate",
                                    sortable: true,
                                    text: "تاریخ ایجاد"
                                }, {
                                    width: 60,
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
                                        iconCls: "#NoteEdit"
                                    }],
                                    listeners: {
                                        command: {
                                            fn: function (item, command, record, recordIndex, cellIndex) {
                                                if (command === 'Edit') {
                                                    showSentenceTypeWindow(this.up().up(), 'Edit', record.data.ID)
                                                } else {
                                                    SaveSentenceType('Delete', record.data.ID, this.up().up())
                                                }
                                            }
                                        }
                                    }
                                }]
                            },
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        getSentenceTypes(this)
                                    }
                                },
                                rowclick: {
                                    fn: function (item, record, node, index, e) {
                                        getSentenceTypeItems(this)
                                    }
                                }
                            }
                        }, {
                            id: "TabPanelSentencetType",
                            xtype: "tabpanel",
                            region: "center",
                            items: [{
                                store: {
                                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                        extend: "Ext.data.Model",
                                        fields: [{
                                            name: "ID",
                                            type: "int"
                                        }, {
                                            name: "Title"
                                        }]
                                    }),
                                    proxy: {
                                        type: "page",
                                        reader: {
                                            type: "json"
                                        }
                                    }
                                },
                                id: "gridSentenceTypeItems",
                                xtype: "grid",
                                region: "center",
                                buttons: [{
                                    iconCls: "#Disk",
                                    text: "ذخیره",
                                    listeners: {
                                        click: {
                                            fn: function (item, e) {
                                                SaveSentenceTypeInstanceItems(this.up('grid'))
                                            }
                                        }
                                    }
                                }],
                                title: "عوامل در نوع حکم",
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
                                    }]
                                },
                                multiSelect: true,
                                selModel: Ext.create("Ext.selection.CheckboxModel", {
                                    selType: "checkboxmodel",
                                    listeners: {
                                        beforedeselect: {
                                            fn: rowDeselectEvent
                                        }
                                    }
                                }),
                                listeners: {
                                    afterrender: {
                                        fn: function (item) {
                                            getSentenceItems(this)
                                        }
                                    },
                                    rowmouseup: {
                                        fn: rowMouseUpEvent
                                    }
                                }
                            }],
                            layout: "border",
                            title: "عوامل و امتیازات نوع حکم",
                            iconCls: "#PageEdit",
                            activeTab: 0
                        }],
                        layout: "border",
                        title: "تعریف انواع حکم",
                        iconCls: "#PageCopy"
                    }, {
                        id: "TabPersonnelSentence",
                        cls: "personnel-search",
                        rtl: true,
                        items: [{
                            id: "PPSFilter",
                            cls: "filter",
                            rtl: true,
                            xtype: "form",
                            keyMap: {
                                "ENTER": function () {
                                    personnelSearch(this.up('form'), 1)
                                }
                            },
                            region: "north",
                            split: true,
                            items: [{
                                rtl: true,
                                xtype: "form",
                                autoScroll: true,
                                items: [{
                                    id: "TabPersonnelSentence_FullName",
                                    xtype: "textfield",
                                    fieldLabel: "نام و نام خانوادگی",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "TabPersonnelSentence_Code",
                                    tabIndex: 1,
                                    xtype: "textfield",
                                    fieldLabel: "کد پرسنلی",
                                    validateOnFocusLeave: true,
                                    maskRe: /[0-9-]/
                                }, {
                                    id: "TabPersonnelSentence_NationalCode",
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
                                    id: "TabPersonnelSentence_Sex",
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
                                    id: "TabPersonnelSentence_StatusType",
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
                                    id: "TabPersonnelSentence_EducationGrade",
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
                                    id: "TabPersonnelSentence_MarriedStatus",
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
                                    id: "TabPersonnelSentence_InsuranceType",
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
                                    id: "TabPersonnelSentence_ContractBy",
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
                                    id: "TabPersonnelSentence_JobStatus",
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
                                    id: "TabPersonnelSentence_EmploymentType",
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
                                url: unescape("%2fdefault.aspx"),
                                fieldDefaults: {
                                    labelAlign: "top"
                                }
                            }, {
                                border: false,
                                rtl: true,
                                xtype: "form",
                                items: [{
                                    id: "TabPersonnelSentence_PostActivityType",
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
                                    id: "TabPersonnelSentence_Organization",
                                    xtype: "textfield",
                                    fieldLabel: "محل خدمت",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    triggers: {
                                        "_trigger1": {
                                            handler: function () {
                                                (new OrganizitionTreeSelect(this.up('[cls=personnel-search]'), this)).show()
                                            },
                                            tag: "_trigger1",
                                            cls: Ext.form.trigger.Trigger.getIcon("Search")
                                        }
                                    }
                                }, {
                                    id: "TabPersonnelSentence_PostTitle",
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
                                url: unescape("%2fdefault.aspx"),
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
                                id: "2a7714c3-76a9-4e5b-b854-99881b121320",
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
                            url: unescape("%2fdefault.aspx")
                        }, {
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "ID",
                                        type: "int"
                                    }, {
                                        name: "Code"
                                    }, {
                                        name: "FirstName"
                                    }, {
                                        name: "LastName"
                                    }, {
                                        name: "NationalCode"
                                    }, {
                                        name: "UnitName"
                                    }, {
                                        name: "ServiceLocationTitle"
                                    }, {
                                        name: "PostName"
                                    }, {
                                        name: "EmploymentTypeTitle"
                                    }, {
                                        name: "EducationGradeTitle"
                                    }, {
                                        name: "StatusTypeTitle"
                                    }, {
                                        name: "FullName"
                                    }]
                                }),
                                pageSize: 5,
                                proxy: {
                                    type: "page",
                                    reader: {
                                        type: "json"
                                    }
                                }
                            },
                            id: "TabPanelSentencet_gridPersonnelSearch",
                            xtype: "grid",
                            region: "center",
                            bbar: {
                                xtype: "pagingtoolbar",
                                items: [{
                                    xtype: "netlabel",
                                    text: "تعداد نمایش در صفحه:"
                                }, {
                                    width: 10,
                                    xtype: "tbspacer"
                                }, {
                                    width: 80,
                                    xtype: "combobox",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    selectedItems: [{
                                        value: "5"
                                    }],
                                    queryMode: "local",
                                    store: [
                                        ["1", "1"],
                                        ["2", "2"],
                                        ["5", "5"],
                                        ["10", "10"],
                                        ["20", "20"],
                                        ["50", "50"],
                                        ["100", "100"],
                                        ["10000", "همه"]
                                    ],
                                    listeners: {
                                        select: {
                                            fn: function (item, records) {
                                                App.TabPanelSentencet_gridPersonnelSearch.store.pageSize = parseInt(this.getValue(), 10);
                                                App.TabPanelSentencet_gridPersonnelSearch.store.reload();
                                                changePagePersonnel(this.up(), 1)
                                            }
                                        }
                                    }
                                }],
                                displayInfo: true,
                                store: "~\\Modules\\Sentence\\PersonnelSentenceActionPanel.ascx;showPersonnelSentencesWindow(this.up('window'),getValueGrid(this, 'ID'));صدور احکام پرسنلی;TabPersonnelSentence_id2e72c74ed1d53ff3",
                                afterPageText: "صفحه بعد",
                                beforePageText: "صفحه قبل",
                                firstText: "صفحه اول",
                                lastText: "صفحه آخر",
                                nextText: "صفحه بعد",
                                prevText: "صفحه قبل",
                                refreshText: "بارگذاری مجدد",
                                listeners: {
                                    beforechange: {
                                        fn: changePagePersonnel
                                    }
                                }
                            },
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    handler: function () {
                                        showPersonnelSentencesWindow(this.up('window'), getValueGrid(this.up('grid'), 'ID'))
                                    },
                                    iconCls: "#PencilAdd",
                                    text: "صدور و ویرایش حکم"
                                }]
                            },
                            columns: {
                                items: [{
                                    width: 35,
                                    xtype: "rownumberer",
                                    align: "center",
                                    text: "ردیف"
                                }, {
                                    width: 100,
                                    dataIndex: "Code",
                                    text: "کد پرسنلی"
                                }, {
                                    hidden: true,
                                    width: 150,
                                    dataIndex: "FullName",
                                    sortable: true,
                                    text: "نام و نام خانوادگی"
                                }, {
                                    width: 100,
                                    dataIndex: "FirstName",
                                    sortable: true,
                                    text: "نام"
                                }, {
                                    width: 100,
                                    dataIndex: "LastName",
                                    sortable: true,
                                    text: "نام خانوادگی"
                                }, {
                                    width: 100,
                                    dataIndex: "NationalCode",
                                    sortable: true,
                                    text: "کد ملی"
                                }, {
                                    width: 200,
                                    dataIndex: "UnitName",
                                    sortable: true,
                                    text: "محل خدمت"
                                }, {
                                    flex: 1,
                                    dataIndex: "ServiceLocationTitle",
                                    sortable: true,
                                    text: "واحد سازمانی"
                                }, {
                                    flex: 1,
                                    dataIndex: "PostName",
                                    sortable: true,
                                    text: "پست"
                                }, {
                                    width: 70,
                                    dataIndex: "EmploymentTypeTitle",
                                    sortable: true,
                                    text: "نوع استخدام "
                                }, {
                                    width: 100,
                                    dataIndex: "EducationGradeTitle",
                                    sortable: true,
                                    text: "مدرک تحصیلی"
                                }, {
                                    width: 60,
                                    dataIndex: "StatusTypeTitle",
                                    sortable: true,
                                    text: "وضعيت"
                                }]
                            },
                            listeners: {
                                rowdblclick: {
                                    fn: function (item, record, node, index, e) {
                                        showPersonnelSentencesWindow(this.up('window'), getValueGrid(this, 'ID'))
                                    }
                                }
                            }
                        }],
                        layout: "border",
                        title: "صدور احکام پرسنلی",
                        iconCls: "#GroupGear"
                    }],
                    layout: "fit",
                    bodyPadding: 1,
                    activeTab: 0
                }],
                layout: "fit",
                bodyPadding: 5,
                closeAction: "destroy",
                title: "احکام",
                iconCls: "#ScriptEdit"
            });
        });
    });
    Ext.net.Desktop.addModule(Ext.create("Ext.ux.desktop.Module", {
        id: "SalaryManagementModule",
        shortcut: {
            iconCls: "x-Salary-icon",
            sortIndex: 9,
            name: "حقوق و دستمزد",
            module: "SalaryManagementModule"
        }
    }));
    Ext.net.Desktop.getModule("SalaryManagementModule").addLauncher({
        xtype: "menuitem",
        iconCls: "#ScriptEdit",
        text: "حقوق و دستمزد"
    });
    Ext.net.Desktop.getModule("SalaryManagementModule").addWindow(function () {
        Ext.net.ResourceMgr.load([{
            url: "/ux/tabscrollermenu/TabScrollerMenu-merged-js/ext.axd?v=4.6.0"
        }, {
            url: "/ux/taglabel/taglabel-js/ext.axd?v=4.6.0"
        }, {
            url: "/ux/clearbutton/clearbutton-js/ext.axd?v=4.6.0"
        }, {
            url: "/ux/filterheader/filterheader-js/ext.axd?v=4.6.0"
        }, {
            mode: "css",
            url: "/ux/resources/tabscrollermenu-embedded-css/ext.axd?v=4.6.0"
        }, {
            mode: "css",
            url: "/ux/resources/taglabel-embedded-css/ext.axd?v=4.6.0"
        }], function () {
            Ext.net.ResourceMgr.destroyCmp("App.SalaryWindow");
            Ext.net.Desktop.getModule("SalaryManagementModule").setWindow({
                id: "SalaryWindow",
                autoRender: false,
                height: 700,
                rtl: true,
                width: 1100,
                xtype: "window",
                items: [{
                    id: "TabPanelSalary",
                    plugins: [Ext.create("Ext.ux.TabScrollerMenu", {
                        pageSize: 20,
                        maxText: 1000
                    })],
                    xtype: "tabpanel",
                    items: [{
                        id: "TabSalaryItems",
                        items: [{
                            id: "pnlSalaryItemsSearch",
                            frame: true,
                            rtl: true,
                            keyMap: {
                                "ENTER": function () {
                                    getSalaryItems(App.pnlSalaryItemsSearch)
                                }
                            },
                            region: "north",
                            items: [{
                                id: "txtSalaryItemF_Title",
                                xtype: "textfield",
                                fieldLabel: "عنوان عامل",
                                validateOnFocusLeave: true
                            }, {
                                id: "txtSalaryItemF_EnglishTitle",
                                xtype: "textfield",
                                fieldLabel: "عنوان لاتین",
                                validateOnFocusLeave: true
                            }, {
                                id: "cmbSalIF_CategoryType",
                                tabIndex: 4,
                                xtype: "combobox",
                                fieldLabel: "دسته عامل",
                                validateOnFocusLeave: true,
                                editable: false,
                                queryMode: "local",
                                store: [
                                    ["-1", "همه"],
                                    ["2", "مزایا"],
                                    ["3", "کسور"],
                                    ["1", "کارکرد"],
                                    ["4", "سایر عوامل"],
                                    ["5", "تعهدات کارفرما"]
                                ]
                            }, {
                                id: "cmbSalIF_ItemType",
                                tabIndex: 4,
                                xtype: "combobox",
                                fieldLabel: "نوع عامل",
                                validateOnFocusLeave: true,
                                editable: false,
                                queryMode: "local",
                                store: [
                                    ["-1", "همه"],
                                    ["1", "مستمر(فیش حقوقیی)"],
                                    ["2", "محاسباتی"],
                                    ["3", "فرم ورودی"],
                                    ["4", "سیستمی"]
                                ]
                            }, {
                                id: "cmbSalDF_DetailsType",
                                tabIndex: 4,
                                xtype: "combobox",
                                fieldLabel: "نوع تفصیل",
                                validateOnFocusLeave: true,
                                editable: false,
                                queryMode: "local",
                                store: [
                                    ["-1", "همه"],
                                    ["1", "شخص"],
                                    ["2", "شرکت"],
                                    ["3", "مرکز هزینه"],
                                    ["4", "شعبه"]
                                ]
                            }, {
                                id: "cmbSalNF_NatureType",
                                tabIndex: 4,
                                xtype: "combobox",
                                fieldLabel: "ماهیت عامل",
                                validateOnFocusLeave: true,
                                editable: false,
                                queryMode: "local",
                                store: [
                                    ["-1", "همه"],
                                    ["1", "بدهکار"],
                                    ["2", "بستانکار"],
                                    ["3", "بدهکار/بستانکار"]
                                ]
                            }, {
                                id: "cmbSalAF_IsArrear",
                                xtype: "checkboxfield",
                                fieldLabel: "معوقه پذیر",
                                validateOnFocusLeave: true,
                                value: false,
                                inputValue: "App.cmbSalAF_IsArrear"
                            }],
                            layout: {
                                type: "table",
                                itemCls: "width-full",
                                columns: 4
                            },
                            bodyPadding: 5,
                            buttons: [{
                                iconCls: "#Zoom",
                                text: "جستجو",
                                listeners: {
                                    click: {
                                        fn: function (item, e) {
                                            getSalaryItems(this.up('panel'))
                                        }
                                    }
                                }
                            }],
                            title: "جستجو",
                            iconCls: "#Find"
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
                                        name: "EnglishTitle"
                                    }, {
                                        name: "EmploymentTypeTitle"
                                    }, {
                                        name: "IsArrear",
                                        type: "boolean"
                                    }, {
                                        name: "CategoryTypeTitle"
                                    }, {
                                        name: "ItemTypeTitle"
                                    }, {
                                        name: "ItemTypeID",
                                        type: "int"
                                    }, {
                                        name: "NatureTypeTitle"
                                    }, {
                                        name: "IsVisible",
                                        type: "boolean"
                                    }, {
                                        name: "CreditorSpecificCode",
                                        type: "int"
                                    }, {
                                        name: "DebtorSpecificCode",
                                        type: "int"
                                    }, {
                                        name: "DetailsTypeTitle"
                                    }]
                                }),
                                proxy: {
                                    type: "page",
                                    reader: {
                                        type: "json"
                                    }
                                }
                            },
                            id: "gridSalaryItem",
                            style: "margin-top:5px",
                            xtype: "grid",
                            region: "center",
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    handler: function () {
                                        showSalaryItemWindow(this.up().up().up('panel'), 'Add', 0)
                                    },
                                    iconCls: "#CoinsAdd",
                                    text: "عامل جدید"
                                }, {
                                    handler: function () {
                                        showSalaryItemWindow(this.up().up().up('panel'), 'Edit', getValueGrid(this.up().up(), 'ID'))
                                    },
                                    iconCls: "#Coins",
                                    text: "ویرایش عامل"
                                }, {
                                    handler: function () {
                                        SaveSalaryItem('Delete', getValueGrid(this.up().up(), 'ID'), this.up().up())
                                    },
                                    iconCls: "#CoinsDelete",
                                    text: "حذف عامل"
                                }, {
                                    handler: function () {
                                        this.up().up().doExcelExport({
                                            apiKey: 'demogroupedextjsgrid',
                                            startCell: 'A1',
                                            destinationfile: 'SalaryItems.xlsx'
                                        })
                                    },
                                    iconCls: "#PageExcel",
                                    text: "خروجی اکسل"
                                }]
                            },
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
                                    hidden: true,
                                    flex: 1,
                                    dataIndex: "EnglishTitle",
                                    sortable: true,
                                    text: "عنوان لاتین"
                                }, {
                                    flex: 1,
                                    dataIndex: "CategoryTypeTitle",
                                    sortable: true,
                                    text: "دسته عامل"
                                }, {
                                    flex: 1,
                                    dataIndex: "ItemTypeTitle",
                                    sortable: true,
                                    text: "نوع عامل"
                                }, {
                                    flex: 1,
                                    dataIndex: "EmploymentTypeTitle",
                                    sortable: true,
                                    text: "نوع استخدام"
                                }, {
                                    xtype: "checkcolumn",
                                    flex: 1,
                                    dataIndex: "IsArrear",
                                    sortable: true,
                                    text: "معوقه پذیر"
                                }, {
                                    xtype: "checkcolumn",
                                    flex: 1,
                                    dataIndex: "IsVisible",
                                    sortable: true,
                                    text: "نمایش در فیش"
                                }, {
                                    flex: 1,
                                    dataIndex: "DetailsTypeTitle",
                                    sortable: true,
                                    text: "سطح تفصیل"
                                }, {
                                    flex: 1,
                                    dataIndex: "NatureTypeTitle",
                                    sortable: true,
                                    text: "ماهیت عامل"
                                }, {
                                    flex: 1,
                                    dataIndex: "CreditorSpecificCode",
                                    sortable: true,
                                    text: "کد معین بستانکار"
                                }, {
                                    flex: 1,
                                    dataIndex: "DebtorSpecificCode",
                                    sortable: true,
                                    text: "کد معین بدهکار"
                                }, {
                                    width: 60,
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
                                        iconCls: "#NoteEdit"
                                    }],
                                    listeners: {
                                        command: {
                                            fn: function (item, command, record, recordIndex, cellIndex) {
                                                if (command === 'Edit') {
                                                    showSalaryItemWindow(this.up().up().up('panel'), 'Edit', record.data.ID)
                                                } else {
                                                    SaveSalaryItem('Delete', record.data.ID, this.up().up())
                                                }
                                            }
                                        }
                                    }
                                }]
                            }
                        }],
                        layout: "border",
                        title: "تعریف عوامل حقوقی",
                        iconCls: "#Coins"
                    }, {
                        id: "TabSalaryTypes",
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
                                        name: "CreateDate"
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
                            id: "gridSalaryTypes",
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
                                            SaveSalaryType(this)
                                        }
                                    }
                                }
                            }],
                            width: 350,
                            xtype: "grid",
                            region: "west",
                            split: true,
                            collapsible: true,
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    handler: function () {
                                        addRecordGrid(this.up().up(), null, true, false)
                                    },
                                    iconCls: "#Add",
                                    text: "نوع فیش حقوقی جدید"
                                }]
                            },
                            title: "انواع فیش حقوقی",
                            iconCls: "#Script",
                            columns: {
                                items: [{
                                    width: 35,
                                    xtype: "rownumberer",
                                    align: "center",
                                    text: "ردیف"
                                }, {
                                    width: 170,
                                    dataIndex: "Title",
                                    editor: {
                                        xtype: "textfield",
                                        validateOnFocusLeave: true,
                                        allowBlank: false,
                                        blankText: "فیلد باید پر باشد"
                                    },
                                    text: "عنوان فیش حقوقی"
                                }, {
                                    flex: 1,
                                    dataIndex: "CreateDate",
                                    sortable: true,
                                    text: "تاریخ ایجاد"
                                }, {
                                    width: 60,
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
                                                if (command === 'Edit') {
                                                    editRecordGrid(this.up().up(), record)
                                                } else {
                                                    deleteSalaryType(record, this.up().up())
                                                }
                                            }
                                        }
                                    }
                                }]
                            },
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        getSalaryTypes(this)
                                    }
                                },
                                rowclick: {
                                    fn: function (item, record, node, index, e) {
                                        getSalaryTypeItems(this)
                                    }
                                }
                            }
                        }, {
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "TypeItemID",
                                        type: "int"
                                    }, {
                                        name: "ID",
                                        type: "int"
                                    }, {
                                        name: "Title"
                                    }, {
                                        name: "IsDeactive",
                                        type: "boolean"
                                    }, {
                                        name: "CategoryTypeTitle"
                                    }, {
                                        name: "ItemTypeTitle"
                                    }, {
                                        name: "IsVisible",
                                        type: "boolean"
                                    }, {
                                        name: "IsArrear",
                                        type: "boolean"
                                    }]
                                }),
                                proxy: {
                                    type: "page",
                                    reader: {
                                        type: "json"
                                    }
                                }
                            },
                            id: "gridSalaryTypeItems",
                            xtype: "grid",
                            region: "center",
                            buttons: [{
                                iconCls: "#Disk",
                                text: "ذخیره",
                                listeners: {
                                    click: {
                                        fn: function (item, e) {
                                            SaveSalaryTypeItems(this.up('#gridSalaryTypeItems'))
                                        }
                                    }
                                }
                            }],
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    handler: function () {
                                        getSalaryTypeItems(this.up('#TablSalaryTypes').down('#gridSalaryTypes'))
                                    },
                                    iconCls: "#ArrowRefresh",
                                    text: "بروزرسانی عوامل"
                                }]
                            },
                            title: "عوامل در نوع فیش حقوقی",
                            iconCls: "#MoneyDollar",
                            columns: {
                                items: [{
                                    width: 35,
                                    xtype: "rownumberer",
                                    align: "center",
                                    text: "ردیف"
                                }, {
                                    width: 200,
                                    dataIndex: "Title",
                                    sortable: true,
                                    text: "عنوان عامل"
                                }, {
                                    rtl: true,
                                    xtype: "componentcolumn",
                                    flex: 1,
                                    text: "فرمول محاسباتی",
                                    component: function () {
                                        return [{
                                            rtl: true,
                                            xtype: "textfield",
                                            validateOnFocusLeave: true,
                                            leftButtons: [{
                                                width: 25,
                                                handler: function () {
                                                    showSalaryItemFormulaModalWindow(this.up())
                                                },
                                                iconCls: "#Magnifier",
                                                tooltip: "نوشتن فرمول"
                                            }],
                                            editable: false
                                        }];
                                    }
                                }, {
                                    width: 100,
                                    xtype: "checkcolumn",
                                    align: "center",
                                    dataIndex: "IsDeactive",
                                    sortable: true,
                                    text: "محاسبه نشود",
                                    editable: true,
                                    listeners: {
                                        beforecheckchange: {
                                            fn: typeItemDeactive
                                        }
                                    }
                                }, {
                                    width: 100,
                                    align: "center",
                                    dataIndex: "CategoryTypeTitle",
                                    sortable: true,
                                    text: "دسته عامل"
                                }, {
                                    width: 100,
                                    align: "center",
                                    dataIndex: "ItemTypeTitle",
                                    sortable: true,
                                    text: "نوع عامل"
                                }, {
                                    width: 100,
                                    xtype: "checkcolumn",
                                    align: "center",
                                    dataIndex: "IsArrear",
                                    sortable: true,
                                    text: "معوقه پذیر"
                                }, {
                                    width: 100,
                                    xtype: "checkcolumn",
                                    align: "center",
                                    dataIndex: "IsVisible",
                                    sortable: true,
                                    text: "نمایش در فیش"
                                }]
                            },
                            multiSelect: true,
                            selModel: Ext.create("Ext.selection.CheckboxModel", {
                                selType: "checkboxmodel",
                                listeners: {
                                    beforedeselect: {
                                        fn: rowDeselectEvent
                                    }
                                }
                            }),
                            listeners: {
                                rowmouseup: {
                                    fn: rowMouseUpEvent
                                }
                            }
                        }],
                        layout: "border",
                        title: "تعریف انواع فیش حقوقی",
                        iconCls: "#PageCopy"
                    }, {
                        id: "TabPersonnelSalary",
                        cls: "personnel-search",
                        rtl: true,
                        items: [{
                            id: "PPSFilter",
                            cls: "filter",
                            rtl: true,
                            xtype: "form",
                            keyMap: {
                                "ENTER": function () {
                                    personnelSearch(this.up('form'), 1)
                                }
                            },
                            region: "north",
                            split: true,
                            items: [{
                                rtl: true,
                                xtype: "form",
                                autoScroll: true,
                                items: [{
                                    id: "TabPersonnelSalary_FullName",
                                    xtype: "textfield",
                                    fieldLabel: "نام و نام خانوادگی",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "TabPersonnelSalary_Code",
                                    tabIndex: 1,
                                    xtype: "textfield",
                                    fieldLabel: "کد پرسنلی",
                                    validateOnFocusLeave: true,
                                    maskRe: /[0-9-]/
                                }, {
                                    id: "TabPersonnelSalary_NationalCode",
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
                                    id: "TabPersonnelSalary_Sex",
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
                                    id: "TabPersonnelSalary_StatusType",
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
                                    id: "TabPersonnelSalary_EducationGrade",
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
                                    id: "TabPersonnelSalary_MarriedStatus",
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
                                    id: "TabPersonnelSalary_InsuranceType",
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
                                    id: "TabPersonnelSalary_ContractBy",
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
                                    id: "TabPersonnelSalary_JobStatus",
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
                                    id: "TabPersonnelSalary_EmploymentType",
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
                                url: unescape("%2fdefault.aspx"),
                                fieldDefaults: {
                                    labelAlign: "top"
                                }
                            }, {
                                border: false,
                                rtl: true,
                                xtype: "form",
                                items: [{
                                    id: "TabPersonnelSalary_PostActivityType",
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
                                    id: "TabPersonnelSalary_Organization",
                                    xtype: "textfield",
                                    fieldLabel: "محل خدمت",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    triggers: {
                                        "_trigger1": {
                                            handler: function () {
                                                (new OrganizitionTreeSelect(this.up('[cls=personnel-search]'), this)).show()
                                            },
                                            tag: "_trigger1",
                                            cls: Ext.form.trigger.Trigger.getIcon("Search")
                                        }
                                    }
                                }, {
                                    id: "TabPersonnelSalary_PostTitle",
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
                                url: unescape("%2fdefault.aspx"),
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
                                id: "1dcf74cd-966d-4e36-9481-cf18f396640c",
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
                            url: unescape("%2fdefault.aspx")
                        }, {
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "ID",
                                        type: "int"
                                    }, {
                                        name: "Code"
                                    }, {
                                        name: "FirstName"
                                    }, {
                                        name: "LastName"
                                    }, {
                                        name: "NationalCode"
                                    }, {
                                        name: "UnitName"
                                    }, {
                                        name: "ServiceLocationTitle"
                                    }, {
                                        name: "PostName"
                                    }, {
                                        name: "EmploymentTypeTitle"
                                    }, {
                                        name: "EducationGradeTitle"
                                    }, {
                                        name: "StatusTypeTitle"
                                    }, {
                                        name: "FullName"
                                    }]
                                }),
                                pageSize: 5,
                                proxy: {
                                    type: "page",
                                    reader: {
                                        type: "json"
                                    }
                                }
                            },
                            id: "TabPanelSalary_gridPersonnelSearch",
                            xtype: "grid",
                            region: "center",
                            bbar: {
                                xtype: "pagingtoolbar",
                                items: [{
                                    xtype: "netlabel",
                                    text: "تعداد نمایش در صفحه:"
                                }, {
                                    width: 10,
                                    xtype: "tbspacer"
                                }, {
                                    width: 80,
                                    xtype: "combobox",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    selectedItems: [{
                                        value: "5"
                                    }],
                                    queryMode: "local",
                                    store: [
                                        ["1", "1"],
                                        ["2", "2"],
                                        ["5", "5"],
                                        ["10", "10"],
                                        ["20", "20"],
                                        ["50", "50"],
                                        ["100", "100"],
                                        ["10000", "همه"]
                                    ],
                                    listeners: {
                                        select: {
                                            fn: function (item, records) {
                                                App.TabPanelSalary_gridPersonnelSearch.store.pageSize = parseInt(this.getValue(), 10);
                                                App.TabPanelSalary_gridPersonnelSearch.store.reload();
                                                changePagePersonnel(this.up(), 1)
                                            }
                                        }
                                    }
                                }],
                                displayInfo: true,
                                store: "~\\Modules\\Salary\\PersonnelSalaryActionPanel.ascx;showPersonnelSalaryWindow(this.up('window'),this);محاسبه فیش حقوقی فردی;TabPersonnelSalary_idfdc9bd48f3f5a725",
                                afterPageText: "صفحه بعد",
                                beforePageText: "صفحه قبل",
                                firstText: "صفحه اول",
                                lastText: "صفحه آخر",
                                nextText: "صفحه بعد",
                                prevText: "صفحه قبل",
                                refreshText: "بارگذاری مجدد",
                                listeners: {
                                    beforechange: {
                                        fn: changePagePersonnel
                                    }
                                }
                            },
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    handler: function () {
                                        showPersonnelSalarysWindow(this.up('window'), getValueGrid(this.up('grid'), 'ID'))
                                    },
                                    iconCls: "#VcardAdd",
                                    text: "صدور و ویرایش فیش"
                                }]
                            },
                            columns: {
                                items: [{
                                    width: 35,
                                    xtype: "rownumberer",
                                    align: "center",
                                    text: "ردیف"
                                }, {
                                    width: 100,
                                    dataIndex: "Code",
                                    text: "کد پرسنلی"
                                }, {
                                    hidden: true,
                                    width: 150,
                                    dataIndex: "FullName",
                                    sortable: true,
                                    text: "نام و نام خانوادگی"
                                }, {
                                    width: 100,
                                    dataIndex: "FirstName",
                                    sortable: true,
                                    text: "نام"
                                }, {
                                    width: 100,
                                    dataIndex: "LastName",
                                    sortable: true,
                                    text: "نام خانوادگی"
                                }, {
                                    width: 100,
                                    dataIndex: "NationalCode",
                                    sortable: true,
                                    text: "کد ملی"
                                }, {
                                    width: 200,
                                    dataIndex: "UnitName",
                                    sortable: true,
                                    text: "محل خدمت"
                                }, {
                                    flex: 1,
                                    dataIndex: "ServiceLocationTitle",
                                    sortable: true,
                                    text: "واحد سازمانی"
                                }, {
                                    flex: 1,
                                    dataIndex: "PostName",
                                    sortable: true,
                                    text: "پست"
                                }, {
                                    width: 70,
                                    dataIndex: "EmploymentTypeTitle",
                                    sortable: true,
                                    text: "نوع استخدام "
                                }, {
                                    width: 100,
                                    dataIndex: "EducationGradeTitle",
                                    sortable: true,
                                    text: "مدرک تحصیلی"
                                }, {
                                    width: 60,
                                    dataIndex: "StatusTypeTitle",
                                    sortable: true,
                                    text: "وضعيت"
                                }]
                            },
                            listeners: {
                                rowdblclick: {
                                    fn: function (item, record, node, index, e) {
                                        showPersonnelSalaryWindow(this.up('window'), this)
                                    }
                                }
                            }
                        }],
                        layout: "border",
                        title: "محاسبه فیش حقوقی فردی",
                        iconCls: "#GroupGear"
                    }, {
                        id: "TabInputFormItems",
                        cls: "personnel-search",
                        items: [{
                            id: "PPSFilter_InputFormItems",
                            cls: "filter",
                            rtl: true,
                            xtype: "form",
                            keyMap: {
                                "ENTER": function () {
                                    personnelSearch(this.up('form'), 1)
                                }
                            },
                            region: "north",
                            split: true,
                            items: [{
                                rtl: true,
                                xtype: "form",
                                autoScroll: true,
                                items: [{
                                    id: "TabInputFormItems_FullName",
                                    xtype: "textfield",
                                    fieldLabel: "نام و نام خانوادگی",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "TabInputFormItems_Code",
                                    tabIndex: 1,
                                    xtype: "textfield",
                                    fieldLabel: "کد پرسنلی",
                                    validateOnFocusLeave: true,
                                    maskRe: /[0-9-]/
                                }, {
                                    id: "TabInputFormItems_NationalCode",
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
                                    id: "TabInputFormItems_Sex",
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
                                    id: "TabInputFormItems_StatusType",
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
                                    id: "TabInputFormItems_EducationGrade",
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
                                    id: "TabInputFormItems_MarriedStatus",
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
                                    id: "TabInputFormItems_InsuranceType",
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
                                    id: "TabInputFormItems_ContractBy",
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
                                    id: "TabInputFormItems_JobStatus",
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
                                    id: "TabInputFormItems_EmploymentType",
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
                                url: unescape("%2fdefault.aspx"),
                                fieldDefaults: {
                                    labelAlign: "top"
                                }
                            }, {
                                border: false,
                                rtl: true,
                                xtype: "form",
                                items: [{
                                    id: "TabInputFormItems_PostActivityType",
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
                                    id: "TabInputFormItems_Organization",
                                    xtype: "textfield",
                                    fieldLabel: "محل خدمت",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    triggers: {
                                        "_trigger1": {
                                            handler: function () {
                                                (new OrganizitionTreeSelect(this.up('[cls=personnel-search]'), this)).show()
                                            },
                                            tag: "_trigger1",
                                            cls: Ext.form.trigger.Trigger.getIcon("Search")
                                        }
                                    }
                                }, {
                                    id: "TabInputFormItems_PostTitle",
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
                                url: unescape("%2fdefault.aspx"),
                                fieldDefaults: {
                                    labelAlign: "top"
                                }
                            }, {
                                rtl: true,
                                xtype: "form",
                                autoScroll: true,
                                items: [{
                                    id: "tagIFIF_Item",
                                    xtype: "nettagfield",
                                    fieldLabel: "عوامل",
                                    validateOnFocusLeave: true,
                                    multiSelect: true,
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
                                    id: "tagIFIF_ExecuteDate",
                                    rtl: false,
                                    tabIndex: 1,
                                    xtype: "textfield",
                                    fieldLabel: "تاریخ اجرا",
                                    fieldStyle: "text-align:center",
                                    labelStyle: "direction:rtl",
                                    validateOnFocusLeave: true,
                                    vtype: "isValidDate",
                                    vtypeText: "تاریخ نامعتبر است",
                                    iconCls: "#Date",
                                    inputMask: "9999/99/99"
                                }, {
                                    id: "tagIFIF_CloseDate",
                                    rtl: false,
                                    tabIndex: 2,
                                    xtype: "textfield",
                                    fieldLabel: "تاریخ پایان",
                                    fieldStyle: "text-align:center",
                                    labelStyle: "direction:rtl",
                                    validateOnFocusLeave: true,
                                    vtype: "isValidDate",
                                    vtypeText: "تاریخ نامعتبر است",
                                    iconCls: "#Date",
                                    inputMask: "9999/99/99"
                                }],
                                layout: {
                                    type: "table",
                                    itemCls: "width-full",
                                    columns: 3
                                },
                                bodyPadding: 5,
                                title: "فیلتر عوامل",
                                iconCls: "#UserMagnify",
                                url: unescape("%2fdefault.aspx"),
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
                                id: "e4afa625-0390-4ea9-b041-f568f938d0b5",
                                iconCls: "#Zoom",
                                text: "جستجو",
                                listeners: {
                                    click: {
                                        fn: function (item, e) {
                                            personnelInputFormItemsSearch(this.up('form'))
                                        }
                                    }
                                }
                            }],
                            title: "جستجو",
                            iconCls: "#Find",
                            url: unescape("%2fdefault.aspx")
                        }, {
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "ID",
                                        type: "int"
                                    }, {
                                        name: "PersonnelID",
                                        type: "int"
                                    }, {
                                        name: "ItemID",
                                        type: "int"
                                    }, {
                                        name: "Code"
                                    }, {
                                        name: "FullName"
                                    }, {
                                        name: "Title"
                                    }, {
                                        name: "Value"
                                    }, {
                                        name: "IssueDate"
                                    }, {
                                        name: "ExecuteDate"
                                    }, {
                                        name: "EndDate"
                                    }, {
                                        name: "CloseDate"
                                    }, {
                                        name: "Dsc"
                                    }, {
                                        name: "CategoryTypeTitle"
                                    }]
                                }),
                                pageSize: 10,
                                proxy: {
                                    type: "page",
                                    reader: {
                                        type: "json"
                                    }
                                }
                            },
                            id: "gridPersonnelInputFormItems",
                            xtype: "grid",
                            region: "center",
                            bbar: {
                                xtype: "pagingtoolbar",
                                items: [{
                                    xtype: "netlabel",
                                    text: "تعداد نمایش در صفحه:"
                                }, {
                                    width: 10,
                                    xtype: "tbspacer"
                                }, {
                                    width: 80,
                                    xtype: "combobox",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    selectedItems: [{
                                        value: "10"
                                    }],
                                    queryMode: "local",
                                    store: [
                                        ["1", "1"],
                                        ["2", "2"],
                                        ["5", "5"],
                                        ["10", "10"],
                                        ["20", "20"],
                                        ["50", "50"],
                                        ["100", "100"],
                                        ["10000", "همه"]
                                    ],
                                    listeners: {
                                        select: {
                                            fn: function (item, records) {
                                                App.gridPersonnelInputFormItems.store.pageSize = parseInt(this.getValue(), 10);
                                                App.gridPersonnelInputFormItems.store.reload();
                                                changePagePIFI(this.up(), 1)
                                            }
                                        }
                                    }
                                }],
                                displayInfo: true,
                                store: "ide0a4abf834dcba0",
                                afterPageText: "صفحه بعد",
                                beforePageText: "صفحه قبل",
                                firstText: "صفحه اول",
                                lastText: "صفحه آخر",
                                nextText: "صفحه بعد",
                                prevText: "صفحه قبل",
                                refreshText: "بارگذاری مجدد",
                                listeners: {
                                    beforechange: {
                                        fn: changePagePIFI
                                    }
                                }
                            },
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    handler: function () {
                                        showPersonnelInputFormItemModalWindow(this.up('#TabInputFormItems'), this.up('grid'), 'Add')
                                    },
                                    iconCls: "#Add",
                                    text: "جدید"
                                }, {
                                    handler: function () {
                                        showPersonnelInputFormItemModalWindow(this.up('#TabInputFormItems'), this.up('grid'), 'Edit')
                                    },
                                    iconCls: "#NoteEdit",
                                    text: "ویرایش"
                                }, {
                                    handler: function () {
                                        deletePersonnelInputFormItem(this.up('grid'))
                                    },
                                    iconCls: "#Delete",
                                    text: "حذف"
                                }]
                            },
                            columns: {
                                items: [{
                                    width: 35,
                                    xtype: "rownumberer",
                                    align: "center",
                                    text: "ردیف"
                                }, {
                                    width: 100,
                                    dataIndex: "Code",
                                    text: "کد پرسنلی"
                                }, {
                                    width: 150,
                                    dataIndex: "FullName",
                                    sortable: true,
                                    text: "نام و نام خانوادگی"
                                }, {
                                    width: 100,
                                    dataIndex: "Title",
                                    sortable: true,
                                    text: "عنوان عامل"
                                }, {
                                    width: 100,
                                    dataIndex: "Value",
                                    renderer: digitGrouping,
                                    sortable: true,
                                    text: "مبلغ"
                                }, {
                                    width: 100,
                                    dataIndex: "IssueDate",
                                    sortable: true,
                                    text: "تاریخ صدور"
                                }, {
                                    width: 100,
                                    dataIndex: "ExecuteDate",
                                    sortable: true,
                                    text: "تاریخ اجرا"
                                }, {
                                    width: 100,
                                    dataIndex: "EndDate",
                                    sortable: true,
                                    text: "تاریخ پایان"
                                }, {
                                    width: 100,
                                    dataIndex: "CloseDate",
                                    sortable: true,
                                    text: "تاریخ پایان پرداخت"
                                }, {
                                    width: 100,
                                    dataIndex: "CategoryTypeTitle",
                                    sortable: true,
                                    text: "نوع عامل"
                                }, {
                                    flex: 1,
                                    dataIndex: "Dsc",
                                    sortable: true,
                                    text: "توضیحات"
                                }]
                            },
                            listeners: {
                                rowdblclick: {
                                    fn: function (item, record, node, index, e) {
                                        showPersonnelInputFormItemModalWindow(this.up('#TabInputFormItems'), this, 'Edit')
                                    }
                                }
                            }
                        }],
                        layout: "border",
                        title: "سایر کسورات و پرداخت ها",
                        iconCls: "#MoneyAdd"
                    }, {
                        id: "TabPersonnelGroupCalc",
                        cls: "personnel-search",
                        items: [{
                            id: "PPSFilter_PersonnelGroupCalc",
                            cls: "filter",
                            rtl: true,
                            xtype: "form",
                            keyMap: {
                                "ENTER": function () {
                                    personnelSearch(this.up('form'), 1)
                                }
                            },
                            region: "north",
                            split: true,
                            items: [{
                                rtl: true,
                                xtype: "form",
                                autoScroll: true,
                                items: [{
                                    id: "TabPersonnelGroupCalc_FullName",
                                    xtype: "textfield",
                                    fieldLabel: "نام و نام خانوادگی",
                                    validateOnFocusLeave: true
                                }, {
                                    id: "TabPersonnelGroupCalc_Code",
                                    tabIndex: 1,
                                    xtype: "textfield",
                                    fieldLabel: "کد پرسنلی",
                                    validateOnFocusLeave: true,
                                    maskRe: /[0-9-]/
                                }, {
                                    id: "TabPersonnelGroupCalc_NationalCode",
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
                                    id: "TabPersonnelGroupCalc_Sex",
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
                                    id: "TabPersonnelGroupCalc_StatusType",
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
                                    id: "TabPersonnelGroupCalc_EducationGrade",
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
                                    id: "TabPersonnelGroupCalc_MarriedStatus",
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
                                    id: "TabPersonnelGroupCalc_InsuranceType",
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
                                    id: "TabPersonnelGroupCalc_ContractBy",
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
                                    id: "TabPersonnelGroupCalc_JobStatus",
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
                                    id: "TabPersonnelGroupCalc_EmploymentType",
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
                                url: unescape("%2fdefault.aspx"),
                                fieldDefaults: {
                                    labelAlign: "top"
                                }
                            }, {
                                border: false,
                                rtl: true,
                                xtype: "form",
                                items: [{
                                    id: "TabPersonnelGroupCalc_PostActivityType",
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
                                    id: "TabPersonnelGroupCalc_Organization",
                                    xtype: "textfield",
                                    fieldLabel: "محل خدمت",
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    triggers: {
                                        "_trigger1": {
                                            handler: function () {
                                                (new OrganizitionTreeSelect(this.up('[cls=personnel-search]'), this)).show()
                                            },
                                            tag: "_trigger1",
                                            cls: Ext.form.trigger.Trigger.getIcon("Search")
                                        }
                                    }
                                }, {
                                    id: "TabPersonnelGroupCalc_PostTitle",
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
                                url: unescape("%2fdefault.aspx"),
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
                                id: "cf901edc-a9a6-4b2b-b546-aae35bdda033",
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
                            url: unescape("%2fdefault.aspx")
                        }, {
                            id: "panelGPSCalc",
                            frame: true,
                            height: "100%",
                            rtl: true,
                            region: "north",
                            items: [{
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
                                        }]
                                    }),
                                    proxy: {
                                        type: "page",
                                        reader: {
                                            type: "json"
                                        }
                                    }
                                },
                                id: "gridGroupCalc",
                                plugins: [{
                                    ptype: "filterheader"
                                }],
                                style: "height:100%",
                                xtype: "grid",
                                region: "center",
                                columnWidth: 0.48,
                                tbar: {
                                    xtype: "toolbar",
                                    items: [{
                                        id: "ddlGroupCalc_Year",
                                        width: 130,
                                        xtype: "combobox",
                                        fieldLabel: "سال",
                                        labelAlign: "right",
                                        labelWidth: 30,
                                        validateOnFocusLeave: true,
                                        editable: false,
                                        queryMode: "local",
                                        store: Ext.data.StoreManager.getArrayStore(2),
                                        listeners: {
                                            afterrender: {
                                                fn: function (item) {
                                                    comboBoxYearBinder(this, true)
                                                }
                                            }
                                        }
                                    }, {
                                        id: "ddlGroupCalc_Month",
                                        width: 130,
                                        xtype: "combobox",
                                        fieldLabel: "ماه",
                                        labelAlign: "right",
                                        labelWidth: 30,
                                        validateOnFocusLeave: true,
                                        editable: false,
                                        queryMode: "local",
                                        store: Ext.data.StoreManager.getArrayStore(2),
                                        listeners: {
                                            afterrender: {
                                                fn: function (item) {
                                                    comboBoxMonthBinder(this, true)
                                                }
                                            }
                                        }
                                    }, {
                                        id: "ddlGroupCalc_SalaryTypes",
                                        width: 230,
                                        xtype: "combobox",
                                        fieldLabel: "نوع فیش",
                                        labelAlign: "right",
                                        labelWidth: 60,
                                        validateOnFocusLeave: true,
                                        allowBlank: false,
                                        editable: false,
                                        queryMode: "local",
                                        store: Ext.data.StoreManager.getArrayStore(2),
                                        listeners: {
                                            afterrender: {
                                                fn: function (item) {
                                                    getPersonnelSalaryTypes(this, 0)
                                                }
                                            }
                                        }
                                    }]
                                },
                                columns: {
                                    items: [{
                                        width: 35,
                                        xtype: "rownumberer",
                                        items: [{
                                            hidden: true,
                                            html: "&nbsp;",
                                            xtype: "displayfield",
                                            validateOnFocusLeave: true
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
                                            validateOnFocusLeave: true
                                        }],
                                        dataIndex: "Code",
                                        text: "کد پرسنلی"
                                    }, {
                                        minWidth: 150,
                                        flex: 1,
                                        items: [{
                                            plugins: [{
                                                ptype: "clearbutton"
                                            }],
                                            xtype: "textfield",
                                            validateOnFocusLeave: true
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
                                            validateOnFocusLeave: true
                                        }],
                                        dataIndex: "JobStatusTitle",
                                        sortable: true,
                                        text: "وضعیت شغلی"
                                    }, {
                                        flex: 1,
                                        items: [{
                                            plugins: [{
                                                ptype: "clearbutton"
                                            }],
                                            xtype: "textfield",
                                            validateOnFocusLeave: true
                                        }],
                                        dataIndex: "StatusTypeTitle",
                                        sortable: true,
                                        text: "وضعیت اشتغال"
                                    }]
                                },
                                selModel: Ext.create("Ext.selection.CheckboxModel", {
                                    selType: "checkboxmodel"
                                }),
                                listeners: {
                                    rowdblclick: {
                                        fn: function (item, record, node, index, e) {
                                            showPersonnelInputFormItemModalWindow(this.up('#TabInputFormItems'), this, 'Edit')
                                        }
                                    }
                                }
                            }, {
                                cls: "height-full",
                                frame: true,
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
                                layout: "center",
                                bodyStyle: "margin-top:120px;"
                            }, {
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
                                        }]
                                    }),
                                    proxy: {
                                        type: "page",
                                        reader: {
                                            type: "json"
                                        }
                                    }
                                },
                                id: "gridGroupPersonnelCalc",
                                height: "100%",
                                plugins: [{
                                    ptype: "filterheader"
                                }],
                                xtype: "grid",
                                region: "center",
                                columnWidth: 0.48,
                                tbar: {
                                    xtype: "toolbar",
                                    items: [{
                                        handler: function () {
                                            groupSalaryCalculation(this.up('grid'))
                                        },
                                        iconCls: "#Calculator",
                                        text: "محاسبه گروهی"
                                    }, {
                                        handler: function () {
                                            groupSalaryCalcConfirm(this.up('grid'), 8)
                                        },
                                        iconCls: "#CalculatorAdd",
                                        text: "تایید گروهی"
                                    }, {
                                        handler: function () {
                                            groupSalaryCalcConfirm(this.up('grid'), 0)
                                        },
                                        iconCls: "#CalculatorError",
                                        text: "برگشت از تایید"
                                    }, {
                                        handler: function () {
                                            groupSalaryCalcDelete(this.up('grid'))
                                        },
                                        iconCls: "#CalculatorDelete",
                                        text: "حذف محاسبه"
                                    }]
                                },
                                columns: {
                                    items: [{
                                        width: 35,
                                        xtype: "rownumberer",
                                        items: [{
                                            hidden: true,
                                            html: "&nbsp;",
                                            xtype: "displayfield",
                                            validateOnFocusLeave: true
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
                                            validateOnFocusLeave: true
                                        }],
                                        dataIndex: "Code",
                                        text: "کد پرسنلی"
                                    }, {
                                        minWidth: 150,
                                        flex: 1,
                                        items: [{
                                            plugins: [{
                                                ptype: "clearbutton"
                                            }],
                                            xtype: "textfield",
                                            validateOnFocusLeave: true
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
                                            validateOnFocusLeave: true
                                        }],
                                        dataIndex: "JobStatusTitle",
                                        sortable: true,
                                        text: "وضعیت شغلی"
                                    }, {
                                        flex: 1,
                                        items: [{
                                            plugins: [{
                                                ptype: "clearbutton"
                                            }],
                                            xtype: "textfield",
                                            validateOnFocusLeave: true
                                        }],
                                        dataIndex: "StatusTypeTitle",
                                        sortable: true,
                                        text: "وضعیت اشتغال"
                                    }]
                                },
                                selModel: Ext.create("Ext.selection.CheckboxModel", {
                                    selType: "checkboxmodel"
                                }),
                                listeners: {
                                    rowdblclick: {
                                        fn: function (item, record, node, index, e) {
                                            showPersonnelInputFormItemModalWindow(this.up('#TabInputFormItems'), this, 'Edit')
                                        }
                                    }
                                }
                            }],
                            layout: "column"
                        }],
                        layout: "border",
                        title: "محاسبه گروهی فیش",
                        iconCls: "#GroupGear"
                    }, {
                        id: "TabSalaryReportDesigner",
                        items: [{
                            id: "treeSalaryReports",
                            plugins: [{
                                ptype: "cellediting",
                                listeners: {
                                    edit: {
                                        fn: renameReport
                                    }
                                }
                            }],
                            width: 250,
                            xtype: "treepanel",
                            region: "west",
                            split: true,
                            autoScroll: true,
                            collapsible: true,
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    id: "btnRefreshReportsSalary",
                                    handler: function () {
                                        getReports(this.up('panel'), 'Salary', 1)
                                    },
                                    iconCls: "#ArrowRefresh",
                                    tooltip: "بارگذاری گزارشات"
                                }, {
                                    handler: function () {
                                        deleteReport(this.up('panel'))
                                    },
                                    iconCls: "#Delete",
                                    tooltip: "حذف گزارش"
                                }, {
                                    handler: function () {
                                        renameReport(this.up('panel'))
                                    },
                                    iconCls: "#PageWhiteEdit",
                                    tooltip: "تغییر نام گزارش"
                                }]
                            },
                            title: "فرمت های فیش",
                            editors: [new Ext.grid.CellEditor(Ext.apply({
                                field: {
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }
                            }, {}))],
                            columns: {
                                items: [{
                                    xtype: "treecolumn",
                                    flex: 2,
                                    dataIndex: "text",
                                    sortable: true,
                                    text: "نام گزارش"
                                }, {
                                    width: 80,
                                    xtype: "actioncolumn",
                                    align: "center",
                                    menuDisabled: true,
                                    items: [{
                                        iconCls: X.net.RM.getIcon("PageWhiteEdit"),
                                        isDisabled: function (view, rowIndex, colIndex, item, record) {
                                            return !record.data.leaf;
                                        },
                                        handler: renameReportEditing,
                                        tooltip: "تغییر نام گزارش"
                                    }, {
                                        iconCls: X.net.RM.getIcon("Delete"),
                                        isDisabled: function (view, rowIndex, colIndex, item, record) {
                                            return !record.data.leaf;
                                        },
                                        handler: deleteReport,
                                        tooltip: "حذف گزارش"
                                    }, {
                                        iconCls: X.net.RM.getIcon("Eye"),
                                        isDisabled: function (view, rowIndex, colIndex, item, record) {
                                            return !record.data.leaf;
                                        },
                                        handler: loadReport,
                                        tooltip: "نمایش گزارش"
                                    }]
                                }]
                            },
                            fields: [{
                                name: "id",
                                type: "int"
                            }, {
                                name: "text"
                            }],
                            rootVisible: false,
                            useArrows: true
                        }, {
                            id: "panelSalaryReportDesigner",
                            region: "center",
                            split: true,
                            layout: "border",
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        loadReportDesigner(this, '../../ReportDesigner.aspx?SubSystem=Salary&ReportTypeID=1', 'Salary', 1)
                                    }
                                }
                            }
                        }],
                        layout: "border",
                        title: "طراحی فیش",
                        iconCls: "#Map"
                    }, {
                        id: "TabTaxInsuranceGroup",
                        rtl: true,
                        items: [{
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "ID",
                                        type: "int"
                                    }, {
                                        name: "Title",
                                        type: "string"
                                    }, {
                                        name: "Type"
                                    }, {
                                        name: "TypeTitle",
                                        type: "string"
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
                            id: "gridTaxInsuranceGroup",
                            frame: true,
                            plugins: [{
                                ptype: "rowediting",
                                clicksToEdit: 1,
                                autoCancel: false,
                                saveBtnText: "ذخیره",
                                cancelBtnText: "انصراف",
                                listeners: {
                                    edit: {
                                        fn: function (item, e) {
                                            editTaxInsuranceGroup(this)
                                        }
                                    }
                                }
                            }],
                            xtype: "grid",
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    iconCls: "#Add",
                                    text: "گروه جدید",
                                    listeners: {
                                        click: {
                                            fn: function (item, e) {
                                                addRecordGrid(this.up('grid'), null, true, true)
                                            }
                                        }
                                    }
                                }]
                            },
                            columns: {
                                items: [{
                                    width: 25,
                                    xtype: "rownumberer"
                                }, {
                                    width: 400,
                                    dataIndex: "Title",
                                    editor: {
                                        xtype: "textfield",
                                        validateOnFocusLeave: true,
                                        allowBlank: false
                                    },
                                    text: "عنوان"
                                }, {
                                    flex: 1,
                                    dataIndex: "TypeTitle",
                                    editor: {
                                        xtype: "combobox",
                                        validateOnFocusLeave: true,
                                        editable: false,
                                        queryMode: "local",
                                        store: [
                                            ["1", "مالیاتی"],
                                            ["2", "بیمه ای"]
                                        ]
                                    },
                                    text: "نوع گروه"
                                }, {
                                    width: 60,
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
                                        iconCls: "#NoteEdit"
                                    }],
                                    listeners: {
                                        command: {
                                            fn: function (item, command, record, recordIndex, cellIndex) {
                                                if (command === 'Edit') {
                                                    editRecordGrid(this.up('grid'), record)
                                                } else {
                                                    deleteTaxInsuranceGroup(record, this.up('grid'))
                                                }
                                            }
                                        }
                                    }
                                }]
                            },
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        getTaxInsuranceGroup(this, 0)
                                    }
                                },
                                rowclick: {
                                    fn: function (item, record, node, index, e) {
                                        this.editingPlugin.cancelEdit()
                                    }
                                }
                            }
                        }],
                        layout: "fit",
                        title: "تعریف گروه های مالیاتی و بیمه ای",
                        iconCls: "#ApplicationLink"
                    }, {
                        id: "TabInsuranceFactor",
                        frame: true,
                        rtl: true,
                        items: [{
                            id: "fpInsuranceFactors",
                            frame: true,
                            xtype: "form",
                            region: "west",
                            split: true,
                            items: [{
                                id: "txt_EmployerPercent",
                                xtype: "numberfield",
                                fieldLabel: "درصد کارفرما",
                                validateOnFocusLeave: true,
                                decimalSeparator: "."
                            }, {
                                id: "txt_PersonnelPercent",
                                xtype: "numberfield",
                                fieldLabel: "درصد کارمند",
                                validateOnFocusLeave: true,
                                decimalSeparator: "."
                            }, {
                                id: "txt_UnemploymentPercent",
                                xtype: "numberfield",
                                fieldLabel: "درصد بیمه بیکاری",
                                validateOnFocusLeave: true,
                                decimalSeparator: "."
                            }, {
                                id: "txt_InsuranceLimit",
                                xtype: "textfield",
                                fieldLabel: "سقف مبلغ بیمه(روزانه)",
                                validateOnFocusLeave: true,
                                enableKeyEvents: true,
                                maskRe: /[0-9-]/,
                                listeners: {
                                    keyup: {
                                        fn: function (item, e) {
                                            this.setValue(digitGrouping(this.value.split(',').join('')))
                                        }
                                    }
                                }
                            }],
                            layout: {
                                type: "table",
                                columns: 1
                            },
                            title: "ضرایب بیمه",
                            url: unescape("%2fdefault.aspx"),
                            fieldDefaults: {
                                labelAlign: "top",
                                msgTarget: "side",
                                allowBlank: false,
                                blankText: "این فیلد باید پر باشد"
                            }
                        }, {
                            frame: true,
                            region: "center",
                            items: [{
                                id: "chkgInsurance_ItemsID",
                                xtype: "checkboxgroup",
                                columns: 5,
                                vertical: true
                            }],
                            layout: "fit",
                            title: "عوامل مشمول بیمه"
                        }],
                        layout: "border",
                        bbar: {
                            rtl: false,
                            xtype: "toolbar",
                            items: [{
                                handler: function () {
                                    editInsuranceFactor(this.up('panel'))
                                },
                                iconCls: "#Disk",
                                text: "ذخیره"
                            }]
                        },
                        tbar: {
                            height: 40,
                            xtype: "toolbar",
                            items: [{
                                id: "ddlYearIG",
                                width: 100,
                                xtype: "combobox",
                                fieldLabel: "سال",
                                labelWidth: 25,
                                validateOnFocusLeave: true,
                                allowBlank: false,
                                editable: false,
                                queryMode: "local",
                                store: Ext.data.StoreManager.getArrayStore(2),
                                listeners: {
                                    afterrender: {
                                        fn: function (item) {
                                            comboBoxYearBinder(this, true)
                                        }
                                    },
                                    select: {
                                        fn: function (item, records) {
                                            changeInsuranceFactor(this, this.up('panel').down('#ddlMonthIG'), this.up('panel').down('#ddlTypeIG'))
                                        }
                                    }
                                }
                            }, {
                                id: "ddlMonthIG",
                                width: 150,
                                xtype: "combobox",
                                fieldLabel: "ماه",
                                labelStyle: "text-align:left",
                                labelWidth: 50,
                                validateOnFocusLeave: true,
                                allowBlank: false,
                                editable: false,
                                queryMode: "local",
                                store: Ext.data.StoreManager.getArrayStore(2),
                                listeners: {
                                    afterrender: {
                                        fn: function (item) {
                                            comboBoxMonthBinder(this, true)
                                        }
                                    },
                                    select: {
                                        fn: function (item, records) {
                                            changeInsuranceFactor(this.up('panel').down('#ddlYearIG'), this, this.up('panel').down('#ddlTypeIG'))
                                        }
                                    }
                                }
                            }, {
                                id: "ddlTypeIG",
                                width: 300,
                                xtype: "combobox",
                                fieldLabel: "گروه بیمه ای",
                                labelStyle: "text-align:left",
                                validateOnFocusLeave: true,
                                editable: false,
                                queryMode: "local",
                                store: Ext.data.StoreManager.getArrayStore(2),
                                listeners: {
                                    afterrender: {
                                        fn: function (item) {
                                            getTaxInsuranceGroup(this, 2)
                                        }
                                    },
                                    select: {
                                        fn: function (item, records) {
                                            changeInsuranceFactor(this.up('panel').down('#ddlYearIG'), this.up('panel').down('#ddlMonthIG'), this)
                                        }
                                    }
                                }
                            }]
                        },
                        title: " تعریف ضرایب بیمه",
                        iconCls: "#ApplicationLink",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    getBenefitItems(this.down('#chkgInsurance_ItemsID'))
                                }
                            }
                        }
                    }, {
                        id: "TabTaxTables",
                        frame: true,
                        rtl: true,
                        items: [{
                            store: {
                                model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                    extend: "Ext.data.Model",
                                    fields: [{
                                        name: "ID",
                                        type: "int"
                                    }, {
                                        name: "FromValue",
                                        type: "string"
                                    }, {
                                        name: "ToValue",
                                        type: "string"
                                    }, {
                                        name: "TaxPercent",
                                        type: "int"
                                    }, {
                                        name: "TaxGroupTitle",
                                        type: "string"
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
                            id: "gridTaxTable",
                            frame: true,
                            plugins: [{
                                ptype: "rowediting",
                                clicksToEdit: 1,
                                autoCancel: false,
                                saveBtnText: "ذخیره",
                                cancelBtnText: "انصراف",
                                listeners: {
                                    edit: {
                                        fn: function (item, e) {
                                            editTaxTable(this)
                                        }
                                    }
                                }
                            }],
                            width: 500,
                            xtype: "grid",
                            region: "west",
                            split: true,
                            tbar: {
                                xtype: "toolbar",
                                items: [{
                                    iconCls: "#Add",
                                    text: "بازه جدید",
                                    listeners: {
                                        click: {
                                            fn: function (item, e) {
                                                addRecordGrid(this.up('grid'), null, true, true)
                                            }
                                        }
                                    }
                                }]
                            },
                            title: "جدول مالیاتی",
                            columns: {
                                items: [{
                                    width: 25,
                                    xtype: "rownumberer"
                                }, {
                                    flex: 1,
                                    align: "center",
                                    dataIndex: "FromValue",
                                    editor: {
                                        xtype: "textfield",
                                        validateOnFocusLeave: true,
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        listeners: {
                                            keyup: {
                                                fn: function (item, e) {
                                                    this.setValue(digitGrouping(this.value.split(',').join('')))
                                                }
                                            }
                                        }
                                    },
                                    text: "از حقوق"
                                }, {
                                    flex: 1,
                                    align: "center",
                                    dataIndex: "ToValue",
                                    editor: {
                                        xtype: "textfield",
                                        validateOnFocusLeave: true,
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        listeners: {
                                            keyup: {
                                                fn: function (item, e) {
                                                    this.setValue(digitGrouping(this.value.split(',').join('')))
                                                }
                                            }
                                        }
                                    },
                                    text: "تا حقوق"
                                }, {
                                    width: 120,
                                    align: "center",
                                    dataIndex: "TaxPercent",
                                    editor: {
                                        xtype: "textfield",
                                        validateOnFocusLeave: true,
                                        allowBlank: false
                                    },
                                    text: "درصد مالیات"
                                }, {
                                    flex: 1,
                                    align: "center",
                                    dataIndex: "TaxGroupTitle",
                                    text: "گروه مالیاتی"
                                }, {
                                    width: 60,
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
                                        iconCls: "#NoteEdit"
                                    }],
                                    listeners: {
                                        command: {
                                            fn: function (item, command, record, recordIndex, cellIndex) {
                                                if (command === 'Edit') {
                                                    editRecordGrid(this.up('grid'), record)
                                                } else {
                                                    deleteTaxTaxTable(record, this.up('grid'))
                                                }
                                            }
                                        }
                                    }
                                }]
                            },
                            listeners: {
                                rowclick: {
                                    fn: function (item, record, node, index, e) {
                                        this.editingPlugin.cancelEdit()
                                    }
                                }
                            }
                        }, {
                            id: "pnlTaxTableItems",
                            frame: true,
                            region: "center",
                            items: [{
                                id: "chkgTaxTable_ItemsID",
                                xtype: "checkboxgroup",
                                columns: 5,
                                vertical: true
                            }],
                            layout: "fit",
                            title: "عوامل مشمول مالیات"
                        }],
                        layout: "border",
                        bbar: {
                            rtl: false,
                            xtype: "toolbar",
                            items: [{
                                handler: function () {
                                    editTaxTable(null, this.up('panel'))
                                },
                                iconCls: "#Disk",
                                text: "ذخیره"
                            }]
                        },
                        tbar: {
                            height: 40,
                            xtype: "toolbar",
                            items: [{
                                id: "ddlYearTG",
                                width: 100,
                                xtype: "combobox",
                                fieldLabel: "سال",
                                labelWidth: 25,
                                validateOnFocusLeave: true,
                                allowBlank: false,
                                editable: false,
                                queryMode: "local",
                                store: Ext.data.StoreManager.getArrayStore(2),
                                listeners: {
                                    afterrender: {
                                        fn: function (item) {
                                            comboBoxYearBinder(this, true)
                                        }
                                    },
                                    select: {
                                        fn: function (item, records) {
                                            changeTaxTable(this, this.up('panel').down('#ddlMonthTG'), this.up('panel').down('#ddlTypeTG'))
                                        }
                                    }
                                }
                            }, {
                                id: "ddlMonthTG",
                                width: 150,
                                xtype: "combobox",
                                fieldLabel: "ماه",
                                labelStyle: "text-align:left",
                                labelWidth: 50,
                                validateOnFocusLeave: true,
                                allowBlank: false,
                                editable: false,
                                queryMode: "local",
                                store: Ext.data.StoreManager.getArrayStore(2),
                                listeners: {
                                    afterrender: {
                                        fn: function (item) {
                                            comboBoxMonthBinder(this, true)
                                        }
                                    },
                                    select: {
                                        fn: function (item, records) {
                                            changeTaxTable(this.up('panel').down('#ddlYearTG'), this, this.up('panel').down('#ddlTypeTG'))
                                        }
                                    }
                                }
                            }, {
                                id: "ddlTypeTG",
                                width: 300,
                                xtype: "combobox",
                                fieldLabel: "گروه مالیاتی",
                                labelStyle: "text-align:left",
                                validateOnFocusLeave: true,
                                editable: false,
                                queryMode: "local",
                                store: Ext.data.StoreManager.getArrayStore(2),
                                listeners: {
                                    afterrender: {
                                        fn: function (item) {
                                            getTaxInsuranceGroup(this, 1)
                                        }
                                    },
                                    select: {
                                        fn: function (item, records) {
                                            changeTaxTable(this.up('panel').down('#ddlYearTG'), this.up('panel').down('#ddlMonthTG'), this)
                                        }
                                    }
                                }
                            }]
                        },
                        title: " تعریف جداول مالیاتی",
                        iconCls: "#TableGear",
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    getBenefitItems(this.down('#chkgTaxTable_ItemsID'))
                                }
                            }
                        }
                    }],
                    layout: "fit",
                    bodyPadding: 1,
                    activeTab: 0
                }],
                layout: "fit",
                bodyPadding: 5,
                title: "حقوق و دستمزد",
                iconCls: "#MoneyDollar"
            });
        });
    });
    Ext.net.Desktop.addModule(Ext.create("Ext.ux.desktop.Module", {
        id: "AttendanceModule",
        shortcut: {
            iconCls: "x-attendance-icon",
            sortIndex: 10,
            name: "حضور و غیاب",
            module: "AttendanceModule"
        }
    }));
    Ext.net.Desktop.getModule("AttendanceModule").addLauncher({
        xtype: "menuitem",
        iconCls: "#Time",
        text: "حضور و غیاب"
    });
    Ext.net.Desktop.getModule("AttendanceModule").addWindow(function () {
        Ext.net.ResourceMgr.load([{
            url: "/ux/clearbutton/clearbutton-js/ext.axd?v=4.6.0"
        }, {
            url: "/ux/filterheader/filterheader-js/ext.axd?v=4.6.0"
        }], function () {
            Ext.net.ResourceMgr.destroyCmp("App.AttendanceManagemenWindow");
            Ext.net.Desktop.getModule("AttendanceModule").setWindow({
                id: "AttendanceManagemenWindow",
                autoRender: false,
                height: 600,
                rtl: true,
                width: 1200,
                xtype: "window",
                items: [{
                    id: "TabPanelAttendanceManagement",
                    height: 250,
                    width: 600,
                    xtype: "tabpanel",
                    items: [{
                        id: "TabAttendanceTimeCard",
                        rtl: true,
                        items: [{
                            id: "rightPanel",
                            width: 300,
                            region: "west",
                            split: true,
                            items: [{
                                id: "pnlPersonnelInfo",
                                frame: true,
                                region: "north",
                                split: true,
                                items: [{
                                    id: "ddlMonth",
                                    xtype: "combobox",
                                    colspan: 3,
                                    fieldLabel: "ماه",
                                    labelAlign: "right",
                                    labelWidth: 50,
                                    validateOnFocusLeave: true,
                                    editable: false,
                                    displayField: "Title",
                                    queryMode: "local",
                                    valueField: "Title",
                                    store: {
                                        model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                            extend: "Ext.data.Model",
                                            fields: [{
                                                name: "Title"
                                            }, {
                                                name: "Year",
                                                type: "int"
                                            }, {
                                                name: "Month",
                                                type: "int"
                                            }]
                                        }),
                                        autoLoad: true,
                                        proxy: {
                                            type: 'memory'
                                        }
                                    },
                                    listeners: {
                                        select: {
                                            fn: function (item, records) {
                                                setMonth(records);
                                                setTitleVac(this)
                                            }
                                        }
                                    }
                                }, {
                                    id: "personnelFind",
                                    "hideSelected": true,
                                    xtype: "combobox",
                                    colspan: 3,
                                    fieldLabel: "نام فرد",
                                    labelAlign: "right",
                                    labelWidth: 50,
                                    validateOnFocusLeave: true,
                                    emptyText: "جستجو",
                                    queryDelay: 1000,
                                    store: {
                                        model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                            extend: "Ext.data.Model",
                                            fields: [{
                                                name: "text"
                                            }, {
                                                name: "value",
                                                type: "int"
                                            }, {
                                                name: "Code",
                                                type: "int"
                                            }, {
                                                name: "SerialEnc"
                                            }]
                                        }),
                                        autoLoad: true,
                                        proxy: {
                                            type: 'memory'
                                        }
                                    },
                                    listeners: {
                                        select: {
                                            fn: function (item, records) {
                                                setPersonnelRef(this, records)
                                            }
                                        },
                                        beforequery: {
                                            fn: userSearch
                                        }
                                    }
                                }],
                                layout: {
                                    type: "table",
                                    columns: 1
                                },
                                bbar: {
                                    xtype: "toolbar",
                                    items: [{
                                        id: "BtnSetting",
                                        tabIndex: 12,
                                        iconCls: "#GroupGear",
                                        text: "تنظیمات"
                                    }, {
                                        id: "BtnPersonnelCalendar",
                                        tabIndex: 12,
                                        iconCls: "#Calendar",
                                        text: "تقویم اختصاصی"
                                    }, {
                                        id: "BtnComputeAPersonnel",
                                        tabIndex: 12,
                                        handler: function () {
                                            ComputePersonnel()
                                        },
                                        iconCls: "#Calculator",
                                        text: "محاسبه فردی"
                                    }]
                                },
                                collapsible: true,
                                title: "اطلاعات پرسنلی",
                                iconCls: "#UserComment"
                            }, {
                                xtype: "tabpanel",
                                region: "center",
                                items: [{
                                    id: "pnlMonthInfo",
                                    frame: true,
                                    autoScroll: true,
                                    defaults: {
                                        "fieldStyle": 'color:#000066;font-weight:bold !important'
                                    },
                                    items: [{
                                        id: "lbl_WorkDay",
                                        xtype: "displayfield",
                                        fieldLabel: "کارکرد",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_ExtraLicTitle",
                                        xtype: "displayfield",
                                        fieldLabel: "مجاز به اضافه کار",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_MaxExtraTime",
                                        xtype: "displayfield",
                                        fieldLabel: "سقف اضافه کار",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_MorningExtraTime",
                                        xtype: "displayfield",
                                        fieldLabel: "اضافه کار صبح",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_PriodExtraTime",
                                        xtype: "displayfield",
                                        fieldLabel: "اضافه کار دوره",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_ExtraTime",
                                        xtype: "displayfield",
                                        fieldLabel: "اضافه کار عادی",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_VacationExtraTime",
                                        xtype: "displayfield",
                                        fieldLabel: "اضافه کار روز تعطیل",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_PersuasiveExtraTime",
                                        xtype: "displayfield",
                                        fieldLabel: "اضافه کار(سایر)",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_ExtraTimePlus",
                                        xtype: "displayfield",
                                        fieldLabel: "مازاد اضافه کاری",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_NightWorkTime",
                                        xtype: "displayfield",
                                        fieldLabel: "شب کاری",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_DeductionTime",
                                        xtype: "displayfield",
                                        fieldLabel: "تاخیر",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_EarlyTime",
                                        xtype: "displayfield",
                                        fieldLabel: "تعجیل",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_AbsenceTime",
                                        xtype: "displayfield",
                                        fieldLabel: "غیبت شناور",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_DeductionWorking",
                                        xtype: "displayfield",
                                        fieldLabel: "جمع کسر کار",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_MissionCount",
                                        xtype: "displayfield",
                                        fieldLabel: "تعداد ماموریت روزانه",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_NightWorkDay",
                                        xtype: "displayfield",
                                        fieldLabel: "نوبت کاری",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_RealMonthTime",
                                        xtype: "displayfield",
                                        fieldLabel: "حضور موظف",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_WorkTime",
                                        xtype: "displayfield",
                                        fieldLabel: "کل حضور",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_ExtraLicPlus",
                                        xtype: "displayfield",
                                        fieldLabel: "مازاد حضور",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "lbl_DefectCount",
                                        xtype: "displayfield",
                                        fieldLabel: "تعداد نواقص",
                                        validateOnFocusLeave: true
                                    }],
                                    title: "اطلاعات ماهانه",
                                    iconCls: "#CalendarViewMonth"
                                }, {
                                    id: "pnlVacationInfo",
                                    frame: true,
                                    items: [{
                                        id: "set_UseVacYear",
                                        xtype: "fieldset",
                                        defaultAnchor: "100%",
                                        flex: 1,
                                        defaults: {
                                            "fieldStyle": 'color:#000066;font-weight:bold !important'
                                        },
                                        items: [{
                                            id: "lbl_UseVacEstehghaghi",
                                            xtype: "displayfield",
                                            fieldLabel: "استحقاقي",
                                            validateOnFocusLeave: true
                                        }, {
                                            id: "lbl_UseVacEstelaji",
                                            xtype: "displayfield",
                                            fieldLabel: "استعلاجي",
                                            validateOnFocusLeave: true
                                        }, {
                                            id: "lbl_UseVacBH",
                                            xtype: "displayfield",
                                            fieldLabel: "بدون حقوق",
                                            validateOnFocusLeave: true
                                        }]
                                    }, {
                                        id: "set_RemainVacYear",
                                        xtype: "fieldset",
                                        defaultAnchor: "100%",
                                        flex: 1,
                                        defaults: {
                                            "fieldStyle": 'color:#000066;font-weight:bold !important'
                                        },
                                        items: [{
                                            id: "lbl_RemainVacEstehghaghi",
                                            xtype: "displayfield",
                                            fieldLabel: "استحقاقي",
                                            validateOnFocusLeave: true
                                        }]
                                    }, {
                                        id: "set_SaveVacYear",
                                        xtype: "fieldset",
                                        defaultAnchor: "100%",
                                        flex: 1,
                                        defaults: {
                                            "fieldStyle": 'color:#000066;font-weight:bold !important'
                                        },
                                        items: [{
                                            id: "lbl_SaveVacYear",
                                            xtype: "displayfield",
                                            fieldLabel: "مانده",
                                            validateOnFocusLeave: true
                                        }],
                                        title: "ذخیره مرخصی"
                                    }],
                                    title: "اطلاعات مرخصی",
                                    iconCls: "#Map"
                                }, {
                                    id: "pnlRequest",
                                    frame: true,
                                    items: [{
                                        id: "set_adminRequests",
                                        xtype: "fieldset",
                                        defaultAnchor: "100%",
                                        flex: 1,
                                        defaults: {
                                            "iconAlign": "right"
                                        },
                                        items: [{
                                            id: "BtnHourLicense",
                                            margin: "5 0 3 0",
                                            xtype: "button",
                                            iconCls: "#TimeAdd",
                                            text: "مجوز اضافه کار"
                                        }, {
                                            id: "BtnDailyVacation",
                                            margin: "0 0 3 0",
                                            xtype: "button",
                                            iconCls: "#House",
                                            text: "مرخصي روزانه"
                                        }, {
                                            id: "BtnHourVacation",
                                            margin: "0 0 3 0",
                                            xtype: "button",
                                            iconCls: "#Time",
                                            text: "مرخصي ساعتی"
                                        }, {
                                            id: "BtnDailyMission",
                                            margin: "0 0 3 0",
                                            xtype: "button",
                                            iconCls: "#World",
                                            text: "ماموريت روزانه"
                                        }, {
                                            id: "BtnHourMission",
                                            margin: "0 0 6 0",
                                            xtype: "button",
                                            iconCls: "#Time",
                                            text: "ماموريت ساعتی"
                                        }],
                                        layout: "fit",
                                        title: "درخواست های مدیریتی"
                                    }, {
                                        id: "set_FlowRequests",
                                        xtype: "fieldset",
                                        defaultAnchor: "100%",
                                        flex: 1,
                                        items: [{
                                            margin: "10 0 5 0",
                                            xtype: "segmentedbutton",
                                            defaults: {
                                                "height": 30
                                            },
                                            items: [{
                                                id: "BtnTTSDailyVacation",
                                                text: "درخواست مرخصي روزانه"
                                            }, {
                                                id: "BtnTTSHourVacation",
                                                text: "درخواست مرخصي ساعتي"
                                            }, {
                                                id: "BtnRestVac",
                                                text: "درخواست مرخصي استراحت - Rest"
                                            }, {
                                                id: "BtnTTSHourMission",
                                                text: "درخواست ماموریت ساعتی(درون شهری)"
                                            }, {
                                                id: "BtnTTSDailyMission",
                                                text: "درخواست ماموریت روزانه برون شهری"
                                            }, {
                                                id: "BtnHourOverTimeLicense",
                                                text: "مجوز اضافه کار ساعتي"
                                            }, {
                                                id: "BtnTTSDefectForm",
                                                text: "درخواست ثبت نواقص (فراموشی)"
                                            }, {
                                                id: "BtnHourOverTimeLicenseHoliday",
                                                text: "مجوز حضور روز پنجشنبه"
                                            }, {
                                                id: "BtnDailyMissionBron",
                                                text: "ماموریت روزانه برون شهری"
                                            }, {
                                                id: "btnPresenceHourOverTimeLicense",
                                                text: "درخواست اضافه کار ساعتی سایر"
                                            }],
                                            vertical: true
                                        }],
                                        layout: "fit",
                                        title: "درخواست های فرایندی"
                                    }],
                                    title: "درخواست ها",
                                    iconCls: "#ApplicationDouble"
                                }],
                                title: "اطلاعات حضور و غیاب",
                                iconCls: "#Date",
                                activeTab: 0,
                                tabPosition: "right"
                            }],
                            layout: "border",
                            collapseDirection: "left",
                            collapsible: true,
                            title: "امکانات",
                            iconCls: "#Vcard"
                        }, {
                            id: "mainGridPanelAttendance",
                            rtl: true,
                            xtype: "tabpanel",
                            region: "center",
                            items: [{
                                store: {
                                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                        extend: "Ext.data.Model",
                                        fields: [{
                                            name: "ID",
                                            type: "int"
                                        }, {
                                            name: "DateDay"
                                        }, {
                                            name: "TypeCode"
                                        }, {
                                            name: "DayName"
                                        }, {
                                            name: "TypeName"
                                        }, {
                                            name: "T1"
                                        }, {
                                            name: "T2"
                                        }, {
                                            name: "T3"
                                        }, {
                                            name: "T4"
                                        }, {
                                            name: "T5"
                                        }, {
                                            name: "T6",
                                            type: "int"
                                        }, {
                                            name: "DeductionTime"
                                        }, {
                                            name: "EarlyTime"
                                        }, {
                                            name: "AbsenceTime"
                                        }, {
                                            name: "DeductionWorking"
                                        }, {
                                            name: "VacTime"
                                        }, {
                                            name: "MissTime"
                                        }, {
                                            name: "ExtraLicPlus"
                                        }, {
                                            name: "ExtraTime"
                                        }, {
                                            name: "NightWorkTime"
                                        }, {
                                            name: "T1S"
                                        }, {
                                            name: "T2S"
                                        }, {
                                            name: "T3S"
                                        }, {
                                            name: "T4S"
                                        }, {
                                            name: "T5S"
                                        }, {
                                            name: "T6S"
                                        }]
                                    }),
                                    proxy: {
                                        type: "page",
                                        reader: {
                                            type: "json"
                                        }
                                    }
                                },
                                id: "tabDailyWork",
                                xtype: "grid",
                                title: "کارکرد روزانه",
                                iconCls: "#Date",
                                columns: {
                                    items: [{
                                        width: 85,
                                        dataIndex: "DateDay",
                                        sortable: true,
                                        tdCls: "first-column",
                                        text: "روز ماه"
                                    }, {
                                        flex: 1,
                                        dataIndex: "DayName",
                                        text: "روز هفته"
                                    }, {
                                        flex: 1,
                                        dataIndex: "TypeName",
                                        sortable: true,
                                        text: "وضعيت"
                                    }, {
                                        flex: 1,
                                        dataIndex: "T1",
                                        renderer: setCellColor,
                                        sortable: true,
                                        text: "ورود1"
                                    }, {
                                        flex: 1,
                                        dataIndex: "T2",
                                        renderer: setCellColor,
                                        sortable: true,
                                        text: "خروج1"
                                    }, {
                                        flex: 1,
                                        dataIndex: "T3",
                                        renderer: setCellColor,
                                        sortable: true,
                                        text: "ورود2"
                                    }, {
                                        flex: 1,
                                        dataIndex: "T4",
                                        renderer: setCellColor,
                                        sortable: true,
                                        text: "خروج2"
                                    }, {
                                        flex: 1,
                                        dataIndex: "T5",
                                        renderer: setCellColor,
                                        sortable: true,
                                        text: "ورود3"
                                    }, {
                                        flex: 1,
                                        dataIndex: "T6",
                                        renderer: setCellColor,
                                        sortable: true,
                                        text: "خروج3"
                                    }, {
                                        flex: 1,
                                        dataIndex: "DeductionTime",
                                        renderer: setCellColor,
                                        sortable: true,
                                        text: "تاخير"
                                    }, {
                                        flex: 1,
                                        dataIndex: "EarlyTime",
                                        sortable: true,
                                        text: "تعجيل"
                                    }, {
                                        flex: 1,
                                        dataIndex: "AbsenceTime",
                                        sortable: true,
                                        text: "غیبت شناور"
                                    }, {
                                        flex: 1,
                                        dataIndex: "DeductionWorking",
                                        renderer: setCellColor,
                                        sortable: true,
                                        text: "جمع کسر کار"
                                    }, {
                                        flex: 1,
                                        dataIndex: "VacTime",
                                        renderer: setCellColor,
                                        sortable: true,
                                        text: "مرخصي"
                                    }, {
                                        flex: 1,
                                        dataIndex: "MissTime",
                                        renderer: setCellColor,
                                        sortable: true,
                                        text: "ماموريت"
                                    }, {
                                        flex: 1,
                                        dataIndex: "ExtraLicPlus",
                                        renderer: setCellColor,
                                        sortable: true,
                                        text: "مازاد حضور"
                                    }, {
                                        flex: 1,
                                        dataIndex: "ExtraTime",
                                        sortable: true,
                                        text: "اضافه كار"
                                    }, {
                                        flex: 1,
                                        dataIndex: "NightWorkTime",
                                        sortable: true,
                                        text: "شب کاری"
                                    }, {
                                        width: 30,
                                        xtype: "commandcolumn",
                                        commands: [{
                                            xtype: "button",
                                            command: "Detail",
                                            tooltip: {
                                                text: "جزئيات"
                                            },
                                            iconCls: "#ApplicationViewDetail"
                                        }],
                                        listeners: {
                                            command: {
                                                fn: function (item, command, record, recordIndex, cellIndex) {
                                                    showDetail(command, record)
                                                }
                                            }
                                        }
                                    }]
                                },
                                emptyText: "اطلاعاتی برای این بخش یافت نگردید.",
                                viewConfig: {
                                    xtype: "gridview",
                                    getRowClass: setColorRow,
                                    stripeRows: false
                                },
                                listeners: {
                                    activate: {
                                        fn: function (item) {
                                            getPresenceInfo(null, null, null, false, true)
                                        }
                                    }
                                }
                            }, {
                                store: {
                                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                        extend: "Ext.data.Model",
                                        fields: [{
                                            name: "Serial",
                                            type: "int"
                                        }, {
                                            name: "Month",
                                            type: "int"
                                        }, {
                                            name: "MonthName"
                                        }, {
                                            name: "FullName"
                                        }, {
                                            name: "WorkDay",
                                            type: "int"
                                        }, {
                                            name: "MaxExtraTime",
                                            type: "int"
                                        }, {
                                            name: "MorningExtraTime"
                                        }, {
                                            name: "ExtraTime"
                                        }, {
                                            name: "VacationExtraTime"
                                        }, {
                                            name: "DeductionTime"
                                        }, {
                                            name: "EarlyTime"
                                        }, {
                                            name: "AbsenceTime"
                                        }, {
                                            name: "DailyVac",
                                            type: "int"
                                        }, {
                                            name: "HourVacHM"
                                        }, {
                                            name: "DailyMission",
                                            type: "int"
                                        }, {
                                            name: "HourlyMission"
                                        }, {
                                            name: "VacationDailyMission",
                                            type: "int"
                                        }, {
                                            name: "DailyVac",
                                            type: "int"
                                        }, {
                                            name: "DailyVacSick",
                                            type: "int"
                                        }, {
                                            name: "DailyVacBH",
                                            type: "int"
                                        }, {
                                            name: "RemainVac",
                                            type: "int"
                                        }, {
                                            name: "AbsenceDay",
                                            type: "int"
                                        }, {
                                            name: "DefectCount",
                                            type: "int"
                                        }, {
                                            name: "PersonnelRef",
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
                                id: "tabMonthWork",
                                xtype: "grid",
                                tbar: {
                                    xtype: "toolbar",
                                    items: [{
                                        id: "btnMonthWorkRefresh",
                                        tabIndex: 12,
                                        handler: function () {
                                            getPresenceInfo(null, null, null, false)
                                        },
                                        iconCls: "#ArrowRefresh",
                                        text: "بروزرسانی"
                                    }, {
                                        id: "BtnInsertMonth",
                                        tabIndex: 12,
                                        handler: function () {
                                            ReActionCommand('MonthWorkAdd', null)
                                        },
                                        iconCls: "#ApplicationAdd",
                                        text: "کارکرد ماهانه جدید"
                                    }, {
                                        id: "ddlYearPageView_Month",
                                        xtype: "combobox",
                                        fieldLabel: "سال",
                                        labelAlign: "right",
                                        validateOnFocusLeave: true,
                                        editable: false,
                                        displayField: "Year",
                                        queryMode: "local",
                                        valueField: "Year",
                                        store: {
                                            model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                                extend: "Ext.data.Model",
                                                fields: [{
                                                    name: "Year",
                                                    type: "int"
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
                                                    getYearMonth(this)
                                                }
                                            },
                                            select: {
                                                fn: function (item, records) {
                                                    getPresenceInfo(null, this.getValue(), null, false)
                                                }
                                            }
                                        }
                                    }]
                                },
                                title: "کارکرد ماهانه",
                                iconCls: "#CalendarViewMonth",
                                columns: {
                                    items: [{
                                        flex: 1,
                                        dataIndex: "MonthName",
                                        sortable: true,
                                        tdCls: "first-column",
                                        text: "ماه"
                                    }, {
                                        flex: 1,
                                        dataIndex: "WorkDay",
                                        text: "کارکرد"
                                    }, {
                                        flex: 1,
                                        dataIndex: "MaxExtraTime",
                                        sortable: true,
                                        text: "سقف اضافه كار"
                                    }, {
                                        flex: 1,
                                        dataIndex: "MorningExtraTime",
                                        sortable: true,
                                        text: "اضافه کار صبح",
                                        cellWrap: true
                                    }, {
                                        flex: 1,
                                        dataIndex: "ExtraTime",
                                        sortable: true,
                                        text: "اضافه کار"
                                    }, {
                                        flex: 1,
                                        dataIndex: "VacationExtraTime",
                                        sortable: true,
                                        text: "اضافه کار تعطیل"
                                    }, {
                                        flex: 1,
                                        dataIndex: "DeductionTime",
                                        renderer: setCellColor,
                                        sortable: true,
                                        text: "تاخیر"
                                    }, {
                                        flex: 1,
                                        dataIndex: "EarlyTime",
                                        renderer: setCellColor,
                                        sortable: true,
                                        text: "تعجیل"
                                    }, {
                                        flex: 1,
                                        dataIndex: "AbsenceTime",
                                        renderer: setCellColor,
                                        sortable: true,
                                        text: "غیبت شناور"
                                    }, {
                                        flex: 1,
                                        dataIndex: "DailyVac",
                                        sortable: true,
                                        text: "مرخصی روزانه"
                                    }, {
                                        flex: 1,
                                        dataIndex: "HourVacHM",
                                        sortable: true,
                                        text: "مرخصی ساعتی"
                                    }, {
                                        flex: 1,
                                        dataIndex: "DailyMission",
                                        sortable: true,
                                        text: "ماموریت روزانه"
                                    }, {
                                        flex: 1,
                                        dataIndex: "HourlyMission",
                                        sortable: true,
                                        text: "ماموریت ساعتی"
                                    }, {
                                        flex: 1,
                                        dataIndex: "VacationDailyMission",
                                        sortable: true,
                                        text: "ماموریت تعطیلی"
                                    }, {
                                        flex: 1,
                                        dataIndex: "DailyVac",
                                        sortable: true,
                                        text: "مرخصی استحقاقی"
                                    }, {
                                        flex: 1,
                                        dataIndex: "DailyVacSick",
                                        sortable: true,
                                        text: "مرخصی استعلاجی"
                                    }, {
                                        flex: 1,
                                        dataIndex: "DailyVacBH",
                                        sortable: true,
                                        text: "مرخصی بدون حقوق"
                                    }, {
                                        flex: 1,
                                        dataIndex: "RemainVac",
                                        sortable: true,
                                        text: "مانده مرخصی"
                                    }, {
                                        flex: 1,
                                        dataIndex: "AbsenceDay",
                                        sortable: true,
                                        text: "غیبت روزانه"
                                    }, {
                                        flex: 1,
                                        dataIndex: "DefectCount",
                                        sortable: true,
                                        text: "تعداد نواقص"
                                    }, {
                                        width: 40,
                                        xtype: "commandcolumn",
                                        commands: [{
                                            xtype: "button",
                                            command: "MonthWorkEdit",
                                            tooltip: {
                                                text: "ویرایش"
                                            },
                                            iconCls: "#ApplicationEdit",
                                            disabled: true
                                        }, {
                                            xtype: "button",
                                            command: "MonthWorkDelete",
                                            tooltip: {
                                                text: "حذف"
                                            },
                                            iconCls: "#ApplicationDelete",
                                            disabled: true
                                        }],
                                        prepareToolbar: setGridAccesses,
                                        listeners: {
                                            command: {
                                                fn: function (item, command, record, recordIndex, cellIndex) {
                                                    ReActionCommand(command, record)
                                                }
                                            }
                                        }
                                    }]
                                },
                                emptyText: "اطلاعاتی برای این بخش یافت نگردید.",
                                viewConfig: {
                                    xtype: "gridview",
                                    getRowClass: setColorRow,
                                    stripeRows: false
                                },
                                listeners: {
                                    activate: {
                                        fn: function (item) {
                                            getPresenceInfo(null, null, null, false, true)
                                        }
                                    }
                                }
                            }, {
                                store: {
                                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                        extend: "Ext.data.Model",
                                        fields: [{
                                            name: "Serial",
                                            type: "int"
                                        }, {
                                            name: "Related",
                                            type: "int"
                                        }, {
                                            name: "State"
                                        }, {
                                            name: "FullName"
                                        }, {
                                            name: "ReqDate"
                                        }, {
                                            name: "Duration",
                                            type: "int"
                                        }, {
                                            name: "StartDate"
                                        }, {
                                            name: "EndDate"
                                        }, {
                                            name: "TypeName"
                                        }, {
                                            name: "StateName"
                                        }, {
                                            name: "PDFFile"
                                        }, {
                                            name: "PDFFile"
                                        }, {
                                            name: "DataRefEnc"
                                        }, {
                                            name: "PersonnelRefSetForm"
                                        }, {
                                            name: "SerialEnc"
                                        }, {
                                            name: "PersonnelRef"
                                        }]
                                    }),
                                    proxy: {
                                        type: "page",
                                        reader: {
                                            type: "json"
                                        }
                                    }
                                },
                                id: "tabDailyVacation",
                                xtype: "grid",
                                tbar: {
                                    xtype: "toolbar",
                                    items: [{
                                        id: "btnDailyVacRefresh",
                                        tabIndex: 12,
                                        handler: function () {
                                            getPresenceInfo(null, null, null, false)
                                        },
                                        iconCls: "#ArrowRefresh",
                                        text: "بروزرسانی"
                                    }, {
                                        id: "ComboBox1",
                                        width: 150,
                                        xtype: "combobox",
                                        fieldLabel: "سال",
                                        labelAlign: "right",
                                        labelWidth: 70,
                                        validateOnFocusLeave: true,
                                        editable: false,
                                        displayField: "Year",
                                        queryMode: "local",
                                        valueField: "Year",
                                        store: {
                                            model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                                extend: "Ext.data.Model",
                                                fields: [{
                                                    name: "Year",
                                                    type: "int"
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
                                                    getYearMonth(this)
                                                }
                                            },
                                            select: {
                                                fn: function (item, records) {
                                                    getPresenceInfo(null, this.getValue(), null, false)
                                                }
                                            }
                                        }
                                    }]
                                },
                                title: "مرخصی روزانه",
                                iconCls: "#DateEdit",
                                columns: {
                                    items: [{
                                        width: 35,
                                        xtype: "rownumberer",
                                        align: "center",
                                        text: "ردیف"
                                    }, {
                                        flex: 1,
                                        dataIndex: "FullName",
                                        sortable: true,
                                        text: "کارمند"
                                    }, {
                                        flex: 1,
                                        dataIndex: "ReqDate",
                                        text: "تاریخ درخواست"
                                    }, {
                                        flex: 1,
                                        dataIndex: "Duration",
                                        sortable: true,
                                        text: "مدت"
                                    }, {
                                        flex: 1,
                                        dataIndex: "StartDate",
                                        sortable: true,
                                        text: "تاریخ شروع",
                                        cellWrap: true
                                    }, {
                                        flex: 1,
                                        dataIndex: "EndDate",
                                        sortable: true,
                                        text: "تاریخ پایان"
                                    }, {
                                        flex: 1,
                                        dataIndex: "TypeName",
                                        sortable: true,
                                        text: "نوع"
                                    }, {
                                        flex: 1,
                                        dataIndex: "StateName",
                                        sortable: true,
                                        text: "وضعیت"
                                    }, {
                                        width: 70,
                                        xtype: "commandcolumn",
                                        commands: [{
                                            xtype: "button",
                                            command: "DailyVacationEdit",
                                            tooltip: {
                                                text: "ویرایش"
                                            },
                                            iconCls: "#ApplicationEdit",
                                            disabled: true
                                        }, {
                                            xtype: "button",
                                            command: "DailyVacationDelete",
                                            tooltip: {
                                                text: "حذف"
                                            },
                                            iconCls: "#ApplicationDelete",
                                            disabled: true
                                        }, {
                                            xtype: "button",
                                            command: "DailyVacationDetail",
                                            tooltip: {
                                                text: "نمایش پیگیری"
                                            },
                                            iconCls: "#ApplicationViewDetail"
                                        }],
                                        prepareToolbar: setGridAccesses,
                                        listeners: {
                                            command: {
                                                fn: function (item, command, record, recordIndex, cellIndex) {
                                                    ReActionCommand(command, record)
                                                }
                                            }
                                        }
                                    }]
                                },
                                emptyText: "اطلاعاتی برای این بخش یافت نگردید.",
                                listeners: {
                                    activate: {
                                        fn: function (item) {
                                            getPresenceInfo(null, null, null, false, true)
                                        }
                                    }
                                }
                            }, {
                                store: {
                                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                        extend: "Ext.data.Model",
                                        fields: [{
                                            name: "Serial",
                                            type: "int"
                                        }, {
                                            name: "Related",
                                            type: "int"
                                        }, {
                                            name: "State",
                                            type: "int"
                                        }, {
                                            name: "FullName"
                                        }, {
                                            name: "ReqDate"
                                        }, {
                                            name: "UseDate"
                                        }, {
                                            name: "StartTime"
                                        }, {
                                            name: "EndTime"
                                        }, {
                                            name: "UseTime"
                                        }, {
                                            name: "TypeName"
                                        }, {
                                            name: "StateName"
                                        }, {
                                            name: "Dsc"
                                        }, {
                                            name: "Type"
                                        }, {
                                            name: "PersonnelRefSetForm"
                                        }, {
                                            name: "SerialEnc"
                                        }, {
                                            name: "DataRefEnc"
                                        }, {
                                            name: "PersonnelRef"
                                        }]
                                    }),
                                    proxy: {
                                        type: "page",
                                        reader: {
                                            type: "json"
                                        }
                                    }
                                },
                                id: "tabHourVacation",
                                xtype: "grid",
                                bbar: {
                                    xtype: "toolbar",
                                    defaults: {
                                        "fieldStyle": 'color:#000066;font-weight:bold !important'
                                    },
                                    items: [{
                                        id: "DisplayField1",
                                        width: 250,
                                        xtype: "displayfield",
                                        fieldLabel: "مرخصی استفاده شده به ساعت",
                                        labelWidth: 200,
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "DisplayField2",
                                        width: 250,
                                        xtype: "displayfield",
                                        fieldLabel: "مرخصی استفاده شده به روز",
                                        labelWidth: 200,
                                        validateOnFocusLeave: true
                                    }]
                                },
                                tbar: {
                                    xtype: "toolbar",
                                    flex: 1,
                                    items: [{
                                        id: "Button1",
                                        tabIndex: 12,
                                        handler: function () {
                                            getPresenceInfo(null, null, null, false)
                                        },
                                        iconCls: "#ArrowRefresh",
                                        text: "بروزرسانی"
                                    }, {
                                        id: "ComboBox2",
                                        width: 150,
                                        xtype: "combobox",
                                        fieldLabel: "سال",
                                        labelAlign: "right",
                                        labelWidth: 70,
                                        validateOnFocusLeave: true,
                                        editable: false,
                                        displayField: "Year",
                                        queryMode: "local",
                                        valueField: "Year",
                                        store: {
                                            model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                                extend: "Ext.data.Model",
                                                fields: [{
                                                    name: "Year",
                                                    type: "int"
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
                                                    getYearMonth(this)
                                                }
                                            },
                                            select: {
                                                fn: function (item, records) {
                                                    getPresenceInfo(null, this.getValue(), null, false)
                                                }
                                            }
                                        }
                                    }]
                                },
                                title: "مرخصی ساعتی",
                                iconCls: "#ClockEdit",
                                columns: {
                                    items: [{
                                        width: 35,
                                        xtype: "rownumberer",
                                        align: "center",
                                        text: "ردیف"
                                    }, {
                                        flex: 1,
                                        dataIndex: "FullName",
                                        sortable: true,
                                        text: "کارمند"
                                    }, {
                                        flex: 1,
                                        dataIndex: "ReqDate",
                                        text: "تاریخ درخواست"
                                    }, {
                                        flex: 1,
                                        dataIndex: "UseDate",
                                        sortable: true,
                                        text: "تاریخ استفاده"
                                    }, {
                                        flex: 1,
                                        dataIndex: "StartTime",
                                        sortable: true,
                                        text: "ساعت شروع",
                                        cellWrap: true
                                    }, {
                                        flex: 1,
                                        dataIndex: "EndTime",
                                        sortable: true,
                                        text: "ساعت پایان"
                                    }, {
                                        flex: 1,
                                        dataIndex: "UseTime",
                                        sortable: true,
                                        text: "مدت"
                                    }, {
                                        flex: 1,
                                        dataIndex: "TypeName",
                                        sortable: true,
                                        text: "نوع"
                                    }, {
                                        flex: 1,
                                        dataIndex: "StateName",
                                        sortable: true,
                                        text: "وضعیت"
                                    }, {
                                        flex: 1,
                                        dataIndex: "Dsc",
                                        sortable: true,
                                        text: "توضیحات"
                                    }, {
                                        width: 70,
                                        xtype: "commandcolumn",
                                        commands: [{
                                            xtype: "button",
                                            command: "HourVacationEdit",
                                            tooltip: {
                                                text: "ویرایش"
                                            },
                                            iconCls: "#ApplicationEdit",
                                            disabled: true
                                        }, {
                                            xtype: "button",
                                            command: "HourVacationDelete",
                                            tooltip: {
                                                text: "حذف"
                                            },
                                            iconCls: "#ApplicationDelete",
                                            disabled: true
                                        }, {
                                            xtype: "button",
                                            command: "HourVacationDetail",
                                            tooltip: {
                                                text: "نمایش پیگیری"
                                            },
                                            iconCls: "#ApplicationViewDetail"
                                        }],
                                        prepareToolbar: setGridAccesses,
                                        listeners: {
                                            command: {
                                                fn: function (item, command, record, recordIndex, cellIndex) {
                                                    ReActionCommand(command, record)
                                                }
                                            }
                                        }
                                    }]
                                },
                                emptyText: "اطلاعاتی برای این بخش یافت نگردید.",
                                listeners: {
                                    activate: {
                                        fn: function (item) {
                                            getPresenceInfo(null, null, null, false)
                                        }
                                    }
                                }
                            }, {
                                store: {
                                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                        extend: "Ext.data.Model",
                                        fields: [{
                                            name: "Serial",
                                            type: "int"
                                        }, {
                                            name: "Related",
                                            type: "int"
                                        }, {
                                            name: "State",
                                            type: "int"
                                        }, {
                                            name: "FullName"
                                        }, {
                                            name: "ReqDate"
                                        }, {
                                            name: "Duration",
                                            type: "int"
                                        }, {
                                            name: "StartDate"
                                        }, {
                                            name: "EndDate"
                                        }, {
                                            name: "StateName"
                                        }, {
                                            name: "PDFFile"
                                        }, {
                                            name: "SerialPayment",
                                            type: "int"
                                        }, {
                                            name: "ReportSerial",
                                            type: "int"
                                        }, {
                                            name: "PDFCost"
                                        }, {
                                            name: "PDFMiss"
                                        }, {
                                            name: "PDFReport"
                                        }, {
                                            name: "personnelTiketRef"
                                        }, {
                                            name: "DataRef"
                                        }, {
                                            name: "PersonnelRefSetForm"
                                        }, {
                                            name: "SerialEnc"
                                        }, {
                                            name: "ReportSerialEnc"
                                        }, {
                                            name: "DataRefEnc"
                                        }, {
                                            name: "PDFCostEnc"
                                        }, {
                                            name: "PDFMissEnc"
                                        }, {
                                            name: "PDFReportEnc"
                                        }]
                                    }),
                                    proxy: {
                                        type: "page",
                                        reader: {
                                            type: "json"
                                        }
                                    }
                                },
                                id: "tabDailyMission",
                                xtype: "grid",
                                tbar: {
                                    xtype: "toolbar",
                                    flex: 1,
                                    items: [{
                                        id: "ComboBox3",
                                        xtype: "combobox",
                                        fieldLabel: "سال",
                                        labelAlign: "right",
                                        validateOnFocusLeave: true,
                                        editable: false,
                                        displayField: "Year",
                                        queryMode: "local",
                                        valueField: "Year",
                                        store: {
                                            model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                                extend: "Ext.data.Model",
                                                fields: [{
                                                    name: "Year",
                                                    type: "int"
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
                                                    getYearMonth(this)
                                                }
                                            },
                                            select: {
                                                fn: function (item, records) {
                                                    getPresenceInfo(null, this.getValue(), null, false)
                                                }
                                            }
                                        }
                                    }, {
                                        id: "Button2",
                                        tabIndex: 12,
                                        handler: function () {
                                            getPresenceInfo(null, null, null, false)
                                        },
                                        iconCls: "#ArrowRefresh",
                                        text: "بروزرسانی"
                                    }]
                                },
                                title: "ماموریت روزانه",
                                iconCls: "#DateGo",
                                columns: {
                                    items: [{
                                        flex: 1,
                                        dataIndex: "ReqDate",
                                        text: "تاریخ درخواست"
                                    }, {
                                        flex: 1,
                                        dataIndex: "Duration",
                                        sortable: true,
                                        text: "مدت"
                                    }, {
                                        flex: 1,
                                        dataIndex: "StartDate",
                                        sortable: true,
                                        text: "تاریخ شروع",
                                        cellWrap: true
                                    }, {
                                        flex: 1,
                                        dataIndex: "EndDate",
                                        sortable: true,
                                        text: "تاریخ پایان"
                                    }, {
                                        flex: 1,
                                        dataIndex: "StateName",
                                        sortable: true,
                                        text: "وضعیت"
                                    }, {
                                        xtype: "commandcolumn",
                                        flex: 1,
                                        text: "عملیات",
                                        commands: [{
                                            xtype: "button",
                                            command: "DailyMissionEdit",
                                            tooltip: {
                                                text: "ویرایش"
                                            },
                                            iconCls: "#ApplicationEdit",
                                            disabled: true
                                        }, {
                                            xtype: "button",
                                            command: "DailyMissionDelete",
                                            tooltip: {
                                                text: "حذف"
                                            },
                                            iconCls: "#ApplicationDelete",
                                            disabled: true
                                        }, {
                                            xtype: "button",
                                            command: "DailyMissionDetail",
                                            tooltip: {
                                                text: "نمایش پیگیری"
                                            },
                                            iconCls: "#ApplicationViewDetail"
                                        }],
                                        prepareToolbar: setGridAccesses,
                                        listeners: {
                                            command: {
                                                fn: function (item, command, record, recordIndex, cellIndex) {
                                                    ReActionCommand(command, record)
                                                }
                                            }
                                        }
                                    }, {
                                        xtype: "commandcolumn",
                                        flex: 1,
                                        text: "ماموریت",
                                        commands: [{
                                            xtype: "button",
                                            command: "DailyMissionView",
                                            tooltip: {
                                                text: "مشاهده ماموریت"
                                            },
                                            iconCls: "#ApplicationEdit",
                                            disabled: true
                                        }],
                                        prepareToolbar: setGridAccesses,
                                        listeners: {
                                            command: {
                                                fn: function (item, command, record, recordIndex, cellIndex) {
                                                    ReActionCommand(command, record)
                                                }
                                            }
                                        }
                                    }, {
                                        xtype: "commandcolumn",
                                        flex: 1,
                                        text: "گزارش",
                                        commands: [{
                                            xtype: "button",
                                            command: "DailyMissionReportAdd",
                                            tooltip: {
                                                text: "ثبت گزارش"
                                            },
                                            iconCls: "#ApplicationEdit"
                                        }, {
                                            xtype: "button",
                                            command: "DailyMissionReportDelete",
                                            tooltip: {
                                                text: "حذف گزارش"
                                            },
                                            iconCls: "#ApplicationDelete"
                                        }, {
                                            xtype: "button",
                                            command: "DailyMissionReportView",
                                            tooltip: {
                                                text: "مشاهده گزارش"
                                            },
                                            iconCls: "#ApplicationViewDetail"
                                        }, {
                                            xtype: "button",
                                            command: "DailyMissionReportDetail",
                                            tooltip: {
                                                text: "سابقه گزارش"
                                            },
                                            iconCls: "#ApplicationViewDetail"
                                        }],
                                        prepareToolbar: setGridAccesses,
                                        listeners: {
                                            command: {
                                                fn: function (item, command, record, recordIndex, cellIndex) {
                                                    ReActionCommand(command, record)
                                                }
                                            }
                                        }
                                    }, {
                                        xtype: "commandcolumn",
                                        flex: 1,
                                        text: "احکام",
                                        commands: [{
                                            xtype: "button",
                                            command: "DailyMissionFilePDF",
                                            tooltip: {
                                                text: "حکم"
                                            },
                                            iconCls: "#ApplicationEdit"
                                        }, {
                                            xtype: "button",
                                            command: "DailyMissionCostPDF",
                                            tooltip: {
                                                text: "هزینه"
                                            },
                                            iconCls: "#ApplicationDelete"
                                        }, {
                                            xtype: "button",
                                            command: "DailyMissionLoadPDF",
                                            tooltip: {
                                                text: "گزارش"
                                            },
                                            iconCls: "#ApplicationViewDetail"
                                        }],
                                        prepareToolbar: setGridAccesses,
                                        listeners: {
                                            command: {
                                                fn: function (item, command, record, recordIndex, cellIndex) {
                                                    ReActionCommand(command, record)
                                                }
                                            }
                                        }
                                    }, {
                                        xtype: "commandcolumn",
                                        flex: 1,
                                        text: "پرداخت ماموریت",
                                        commands: [{
                                            xtype: "button",
                                            command: "DailyMissionPayment",
                                            tooltip: {
                                                text: "پرداخت"
                                            },
                                            iconCls: "#ApplicationEdit"
                                        }],
                                        prepareToolbar: setGridAccesses,
                                        listeners: {
                                            command: {
                                                fn: function (item, command, record, recordIndex, cellIndex) {
                                                    ReActionCommand(command, record)
                                                }
                                            }
                                        }
                                    }]
                                },
                                emptyText: "اطلاعاتی برای این بخش یافت نگردید.",
                                listeners: {
                                    activate: {
                                        fn: function (item) {
                                            getPresenceInfo(null, null, null, false)
                                        }
                                    }
                                }
                            }, {
                                store: {
                                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                        extend: "Ext.data.Model",
                                        fields: [{
                                            name: "Serial",
                                            type: "int"
                                        }, {
                                            name: "Related",
                                            type: "int"
                                        }, {
                                            name: "State"
                                        }, {
                                            name: "FullName"
                                        }, {
                                            name: "ReqDatE"
                                        }, {
                                            name: "UseDate"
                                        }, {
                                            name: "StartTime"
                                        }, {
                                            name: "EndTime"
                                        }, {
                                            name: "UseTime"
                                        }, {
                                            name: "TypeName"
                                        }, {
                                            name: "StateName"
                                        }, {
                                            name: "Editing"
                                        }, {
                                            name: "DataRef"
                                        }, {
                                            name: "PersonnelRefSetForm"
                                        }, {
                                            name: "DataRefEnc"
                                        }, {
                                            name: "PersonnelRefSetForm"
                                        }]
                                    }),
                                    proxy: {
                                        type: "page",
                                        reader: {
                                            type: "json"
                                        }
                                    }
                                },
                                id: "tabHourMission",
                                xtype: "grid",
                                tbar: {
                                    xtype: "toolbar",
                                    items: [{
                                        id: "btnHourMissionRefresh",
                                        tabIndex: 12,
                                        handler: function () {
                                            getPresenceInfo(null, null, null, false)
                                        },
                                        iconCls: "#ArrowRefresh",
                                        text: "بروزرسانی"
                                    }, {
                                        id: "cmbHourMissionYear",
                                        width: 150,
                                        xtype: "combobox",
                                        fieldLabel: "سال",
                                        labelAlign: "right",
                                        labelWidth: 70,
                                        validateOnFocusLeave: true,
                                        editable: false,
                                        displayField: "Year",
                                        queryMode: "local",
                                        valueField: "Year",
                                        store: {
                                            model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                                extend: "Ext.data.Model",
                                                fields: [{
                                                    name: "Year",
                                                    type: "int"
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
                                                    getYearMonth(this)
                                                }
                                            },
                                            select: {
                                                fn: function (item, records) {
                                                    getPresenceInfo(null, this.getValue(), null, false)
                                                }
                                            }
                                        }
                                    }]
                                },
                                title: " ماموریت ساعتی",
                                iconCls: "#ClockGo",
                                columns: {
                                    items: [{
                                        width: 35,
                                        xtype: "rownumberer",
                                        align: "center",
                                        text: "ردیف"
                                    }, {
                                        flex: 1,
                                        dataIndex: "FullName",
                                        sortable: true,
                                        text: "کارمند"
                                    }, {
                                        flex: 1,
                                        dataIndex: "ReqDate",
                                        text: "تاریخ درخواست"
                                    }, {
                                        flex: 1,
                                        dataIndex: "UseDate",
                                        sortable: true,
                                        text: "تاریخ استفاده"
                                    }, {
                                        flex: 1,
                                        dataIndex: "StartTime",
                                        sortable: true,
                                        text: "ساعت شروع",
                                        cellWrap: true
                                    }, {
                                        flex: 1,
                                        dataIndex: "EndTime",
                                        sortable: true,
                                        text: "ساعت پایان"
                                    }, {
                                        flex: 1,
                                        dataIndex: "UseTime",
                                        sortable: true,
                                        text: "مدت"
                                    }, {
                                        flex: 1,
                                        dataIndex: "TypeName",
                                        sortable: true,
                                        text: "نوع"
                                    }, {
                                        flex: 1,
                                        dataIndex: "StateName",
                                        sortable: true,
                                        text: "وضعیت"
                                    }, {
                                        width: 70,
                                        xtype: "commandcolumn",
                                        commands: [{
                                            xtype: "button",
                                            command: "HourMissionEdit",
                                            tooltip: {
                                                text: "ویرایش"
                                            },
                                            iconCls: "#ApplicationEdit",
                                            disabled: true
                                        }, {
                                            xtype: "button",
                                            command: "HourMissionDelete",
                                            tooltip: {
                                                text: "حذف"
                                            },
                                            iconCls: "#ApplicationDelete",
                                            disabled: true
                                        }, {
                                            xtype: "button",
                                            command: "HourMissionDetail",
                                            tooltip: {
                                                text: "نمایش پیگیری"
                                            },
                                            iconCls: "#ApplicationViewDetail"
                                        }],
                                        prepareToolbar: setGridAccesses,
                                        listeners: {
                                            command: {
                                                fn: function (item, command, record, recordIndex, cellIndex) {
                                                    ReActionCommand(command, record)
                                                }
                                            }
                                        }
                                    }]
                                },
                                emptyText: "اطلاعاتی برای این بخش یافت نگردید.",
                                listeners: {
                                    activate: {
                                        fn: function (item) {
                                            getPresenceInfo(null, null, null, false, true)
                                        }
                                    }
                                }
                            }, {
                                store: {
                                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                        extend: "Ext.data.Model",
                                        fields: [{
                                            name: "Serial",
                                            type: "int"
                                        }, {
                                            name: "Related",
                                            type: "int"
                                        }, {
                                            name: "State"
                                        }, {
                                            name: "FullName"
                                        }, {
                                            name: "ReqDate"
                                        }, {
                                            name: "UseDate",
                                            type: "int"
                                        }, {
                                            name: "StartTime"
                                        }, {
                                            name: "EndTime"
                                        }, {
                                            name: "UseTime"
                                        }, {
                                            name: "TypeName"
                                        }, {
                                            name: "StateName"
                                        }, {
                                            name: "DataRefEnc"
                                        }, {
                                            name: "PersonnelRefSetForm",
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
                                id: "tabHourLicense",
                                xtype: "grid",
                                tbar: {
                                    xtype: "toolbar",
                                    items: [{
                                        id: "btnHourLicenseRefresh",
                                        tabIndex: 12,
                                        handler: function () {
                                            getPresenceInfo(null, null, null, false)
                                        },
                                        iconCls: "#ArrowRefresh",
                                        text: "بروزرسانی"
                                    }, {
                                        id: "cmbHourLicense",
                                        width: 150,
                                        xtype: "combobox",
                                        fieldLabel: "سال",
                                        labelAlign: "right",
                                        labelWidth: 70,
                                        validateOnFocusLeave: true,
                                        editable: false,
                                        displayField: "Year",
                                        queryMode: "local",
                                        valueField: "Year",
                                        store: {
                                            model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                                extend: "Ext.data.Model",
                                                fields: [{
                                                    name: "Year",
                                                    type: "int"
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
                                                    getYearMonth(this)
                                                }
                                            },
                                            select: {
                                                fn: function (item, records) {
                                                    getPresenceInfo(null, this.getValue(), null, false)
                                                }
                                            }
                                        }
                                    }]
                                },
                                title: "مجوزاضافه کارساعتی",
                                iconCls: "#ClockAdd",
                                columns: {
                                    items: [{
                                        width: 35,
                                        xtype: "rownumberer",
                                        align: "center",
                                        text: "ردیف"
                                    }, {
                                        flex: 1,
                                        dataIndex: "FullName",
                                        sortable: true,
                                        text: "کارمند"
                                    }, {
                                        flex: 1,
                                        dataIndex: "ReqDate",
                                        text: "تاریخ درخواست"
                                    }, {
                                        flex: 1,
                                        dataIndex: "UseDate",
                                        sortable: true,
                                        text: "تاریخ استفاده"
                                    }, {
                                        flex: 1,
                                        dataIndex: "StartTime",
                                        sortable: true,
                                        text: "ساعت شروع",
                                        cellWrap: true
                                    }, {
                                        flex: 1,
                                        dataIndex: "EndTime",
                                        sortable: true,
                                        text: "ساعت پایان"
                                    }, {
                                        flex: 1,
                                        dataIndex: "UseTime",
                                        sortable: true,
                                        text: "مدت"
                                    }, {
                                        flex: 1,
                                        dataIndex: "TypeName",
                                        sortable: true,
                                        text: "نوع"
                                    }, {
                                        flex: 1,
                                        dataIndex: "StateName",
                                        sortable: true,
                                        text: "وضعیت"
                                    }, {
                                        width: 70,
                                        xtype: "commandcolumn",
                                        commands: [{
                                            xtype: "button",
                                            command: "HourLicenseDelete",
                                            tooltip: {
                                                text: "حذف"
                                            },
                                            iconCls: "#ApplicationDelete",
                                            disabled: true
                                        }, {
                                            xtype: "button",
                                            command: "HourLicenseDetail",
                                            tooltip: {
                                                text: "نمایش پیگیری"
                                            },
                                            iconCls: "#ApplicationViewDetail"
                                        }],
                                        prepareToolbar: setGridAccesses,
                                        listeners: {
                                            command: {
                                                fn: function (item, command, record, recordIndex, cellIndex) {
                                                    ReActionCommand(command, record)
                                                }
                                            }
                                        }
                                    }]
                                },
                                emptyText: "اطلاعاتی برای این بخش یافت نگردید.",
                                listeners: {
                                    activate: {
                                        fn: function (item) {
                                            getPresenceInfo(null, null, null, false, true)
                                        }
                                    }
                                }
                            }, {
                                store: {
                                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                        extend: "Ext.data.Model",
                                        fields: [{
                                            name: "Serial",
                                            type: "int"
                                        }, {
                                            name: "Year"
                                        }, {
                                            name: "DesertUse"
                                        }, {
                                            name: "Remain"
                                        }, {
                                            name: "Saved"
                                        }, {
                                            name: "TotalSaved"
                                        }, {
                                            name: "PersonnelRef"
                                        }, {
                                            name: "PdfFileName"
                                        }, {
                                            name: "IsConfirmation"
                                        }, {
                                            name: "SerialEnc"
                                        }]
                                    }),
                                    proxy: {
                                        type: "page",
                                        reader: {
                                            type: "json"
                                        }
                                    }
                                },
                                id: "tabSavedVacation",
                                xtype: "grid",
                                tbar: {
                                    xtype: "toolbar",
                                    items: [{
                                        id: "btnSavedVacationRefresh",
                                        tabIndex: 12,
                                        handler: function () {
                                            getPresenceInfo(null, null, null, false)
                                        },
                                        iconCls: "#ArrowRefresh",
                                        text: "بروزرسانی"
                                    }, {
                                        id: "BtnInsertSavedVacation",
                                        tabIndex: 12,
                                        handler: function () {
                                            ReActionCommand('SavedVacationAdd', null)
                                        },
                                        iconCls: "#Add",
                                        text: "ثبت ذخیره مرخصی سال جدید"
                                    }]
                                },
                                title: "ذخیره مرخصی",
                                iconCls: "#TableSave",
                                columns: {
                                    items: [{
                                        width: 35,
                                        xtype: "rownumberer",
                                        align: "center",
                                        text: "ردیف"
                                    }, {
                                        flex: 1,
                                        dataIndex: "Year",
                                        sortable: true,
                                        text: "سال"
                                    }, {
                                        flex: 1,
                                        dataIndex: "DesertUse",
                                        text: "استحقاقی"
                                    }, {
                                        flex: 1,
                                        dataIndex: "Remain",
                                        sortable: true,
                                        text: "مانده مرخصی"
                                    }, {
                                        flex: 1,
                                        dataIndex: "Saved",
                                        sortable: true,
                                        text: "ذخیره مرخصی",
                                        cellWrap: true
                                    }, {
                                        flex: 1,
                                        dataIndex: "TotalSaved",
                                        sortable: true,
                                        text: "ذخیره کل"
                                    }, {
                                        width: 70,
                                        xtype: "commandcolumn",
                                        commands: [{
                                            xtype: "button",
                                            command: "SavedVacationEdit",
                                            tooltip: {
                                                text: "ويرايش"
                                            },
                                            iconCls: "#ApplicationEdit",
                                            disabled: true
                                        }, {
                                            xtype: "button",
                                            command: "SavedVacationDelete",
                                            tooltip: {
                                                text: "حذف"
                                            },
                                            iconCls: "#ApplicationDelete",
                                            disabled: true
                                        }],
                                        prepareToolbar: setGridAccesses,
                                        listeners: {
                                            command: {
                                                fn: function (item, command, record, recordIndex, cellIndex) {
                                                    ReActionCommand(command, record)
                                                }
                                            }
                                        }
                                    }]
                                },
                                emptyText: "اطلاعاتی برای این بخش یافت نگردید.",
                                listeners: {
                                    activate: {
                                        fn: function (item) {
                                            getPresenceInfo(null, null, null, false, true)
                                        }
                                    }
                                }
                            }, {
                                store: {
                                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                        extend: "Ext.data.Model",
                                        fields: [{
                                            name: "Serial",
                                            type: "int"
                                        }, {
                                            name: "Related",
                                            type: "int"
                                        }, {
                                            name: "State"
                                        }, {
                                            name: "FullName"
                                        }, {
                                            name: "UseDate"
                                        }, {
                                            name: "HourMin"
                                        }, {
                                            name: "TYPENAME"
                                        }, {
                                            name: "STATENAME"
                                        }, {
                                            name: "ResConfirmText"
                                        }, {
                                            name: "DataRef"
                                        }, {
                                            name: "PersonnelRefSetForm"
                                        }, {
                                            name: "DataRefEnc"
                                        }]
                                    }),
                                    proxy: {
                                        type: "page",
                                        reader: {
                                            type: "json"
                                        }
                                    }
                                },
                                id: "tabDefectForms",
                                xtype: "grid",
                                tbar: {
                                    xtype: "toolbar",
                                    items: [{
                                        id: "btnDefectFormsRefresh",
                                        tabIndex: 12,
                                        handler: function () {
                                            getPresenceInfo(null, null, null, false)
                                        },
                                        iconCls: "#ArrowRefresh",
                                        text: "بروزرسانی"
                                    }]
                                },
                                title: "ورود و خروج ناقص",
                                iconCls: "#ClockDelete",
                                columns: {
                                    items: [{
                                        width: 35,
                                        xtype: "rownumberer",
                                        align: "center",
                                        text: "ردیف"
                                    }, {
                                        flex: 1,
                                        dataIndex: "FullName",
                                        sortable: true,
                                        text: "کارمند"
                                    }, {
                                        flex: 1,
                                        dataIndex: "UseDate",
                                        text: "تاریخ استفاده"
                                    }, {
                                        flex: 1,
                                        dataIndex: "HourMin",
                                        sortable: true,
                                        text: "زمان ثبت شده"
                                    }, {
                                        flex: 1,
                                        dataIndex: "TYPENAME",
                                        sortable: true,
                                        text: "نوع",
                                        cellWrap: true
                                    }, {
                                        flex: 1,
                                        dataIndex: "STATENAME",
                                        sortable: true,
                                        text: "وضعیت"
                                    }, {
                                        flex: 1,
                                        dataIndex: "ResConfirmText",
                                        sortable: true,
                                        text: "نظرمسئول"
                                    }, {
                                        width: 70,
                                        xtype: "commandcolumn",
                                        commands: [{
                                            xtype: "button",
                                            command: "DefectFormsDelete",
                                            tooltip: {
                                                text: "حذف"
                                            },
                                            iconCls: "#ApplicationDelete",
                                            disabled: true
                                        }, {
                                            xtype: "button",
                                            command: "DefectFormsDetail",
                                            tooltip: {
                                                text: "نمایش پیگیری"
                                            },
                                            iconCls: "#ApplicationViewDetail"
                                        }],
                                        prepareToolbar: setGridAccesses,
                                        listeners: {
                                            command: {
                                                fn: function (item, command, record, recordIndex, cellIndex) {
                                                    ReActionCommand(command, record)
                                                }
                                            }
                                        }
                                    }]
                                },
                                emptyText: "اطلاعاتی برای این بخش یافت نگردید.",
                                listeners: {
                                    activate: {
                                        fn: function (item) {
                                            getPresenceInfo(null, null, null, false, true)
                                        }
                                    }
                                }
                            }, {
                                store: {
                                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                        extend: "Ext.data.Model",
                                        fields: [{
                                            name: "Serial",
                                            type: "int"
                                        }, {
                                            name: "TypeCode",
                                            type: "int"
                                        }, {
                                            name: "StartTime"
                                        }, {
                                            name: "EndTime"
                                        }, {
                                            name: "Date"
                                        }, {
                                            name: "TypeName"
                                        }, {
                                            name: "REnterTime"
                                        }, {
                                            name: "RExitTime"
                                        }, {
                                            name: "Dur"
                                        }, {
                                            name: "txtDesc"
                                        }, {
                                            name: "PersonnelRefSetForm"
                                        }, {
                                            name: "PersonnelRef"
                                        }]
                                    }),
                                    proxy: {
                                        type: "page",
                                        reader: {
                                            type: "json"
                                        }
                                    }
                                },
                                id: "tabDefects",
                                xtype: "grid",
                                tbar: {
                                    xtype: "toolbar",
                                    items: [{
                                        id: "Button12",
                                        tabIndex: 12,
                                        handler: function () {
                                            getPresenceInfo(null, null, null, false)
                                        },
                                        iconCls: "#ArrowRefresh",
                                        text: "بروزرسانی"
                                    }]
                                },
                                title: "مشاهده و ثبت نواقص",
                                iconCls: "#TableError",
                                columns: {
                                    items: [{
                                        width: 35,
                                        xtype: "rownumberer",
                                        align: "center",
                                        text: "ردیف"
                                    }, {
                                        flex: 1,
                                        dataIndex: "Date",
                                        sortable: true,
                                        text: "تاریخ"
                                    }, {
                                        flex: 1,
                                        dataIndex: "TypeName",
                                        text: "نوع نقص"
                                    }, {
                                        flex: 1,
                                        dataIndex: "REnterTime",
                                        sortable: true,
                                        text: "از ساعت"
                                    }, {
                                        flex: 1,
                                        dataIndex: "RExitTime",
                                        sortable: true,
                                        text: "تا ساعت",
                                        cellWrap: true
                                    }, {
                                        flex: 1,
                                        dataIndex: "Dur",
                                        sortable: true,
                                        text: "مدت"
                                    }, {
                                        flex: 1,
                                        dataIndex: "ResConfirmText",
                                        sortable: true,
                                        text: "نظرمسئول"
                                    }, {
                                        "editor": true,
                                        flex: 1,
                                        dataIndex: "ComboField",
                                        renderer: getDefectsType,
                                        text: "نوع فرم"
                                    }]
                                },
                                emptyText: "اطلاعاتی برای این بخش یافت نگردید.",
                                listeners: {
                                    activate: {
                                        fn: function (item) {
                                            getPresenceInfo(null, null, null, false, true)
                                        }
                                    }
                                }
                            }, {
                                store: {
                                    model: Ext.ClassManager.isCreated(Ext.id()) ? Ext.id() : Ext.define(Ext.id(), {
                                        extend: "Ext.data.Model",
                                        fields: [{
                                            name: "Serial",
                                            type: "int"
                                        }, {
                                            name: "PersonnelRef",
                                            type: "int"
                                        }, {
                                            name: "RFullName"
                                        }, {
                                            name: "WorkDay"
                                        }, {
                                            name: "TypeName"
                                        }, {
                                            name: "Code"
                                        }, {
                                            name: "ExtraTime"
                                        }, {
                                            name: "VacationExtraTime"
                                        }, {
                                            name: "InvalidExtraTime"
                                        }, {
                                            name: "DeductionTime"
                                        }, {
                                            name: "AbsenceTime"
                                        }, {
                                            name: "EarlyTime"
                                        }, {
                                            name: "DeductionWorking"
                                        }, {
                                            name: "AbsenceDay"
                                        }, {
                                            name: "T1"
                                        }, {
                                            name: "T2"
                                        }, {
                                            name: "T3"
                                        }, {
                                            name: "T4"
                                        }, {
                                            name: "T5"
                                        }, {
                                            name: "T6"
                                        }, {
                                            name: "Photo"
                                        }]
                                    }),
                                    pageSize: 5,
                                    proxy: {
                                        type: "localstorage"
                                    }
                                },
                                id: "tblPersonnelSub",
                                xtype: "grid",
                                bbar: {
                                    xtype: "pagingtoolbar",
                                    items: [{
                                        xtype: "netlabel",
                                        text: "تعداد نمایش در صفحه:"
                                    }, {
                                        width: 10,
                                        xtype: "tbspacer"
                                    }, {
                                        width: 80,
                                        xtype: "combobox",
                                        validateOnFocusLeave: true,
                                        editable: false,
                                        selectedItems: [{
                                            value: "5"
                                        }],
                                        queryMode: "local",
                                        store: [
                                            ["1", "1"],
                                            ["2", "2"],
                                            ["5", "5"],
                                            ["10", "10"],
                                            ["20", "20"],
                                            ["50", "50"],
                                            ["100", "100"],
                                            ["10000", "همه"]
                                        ],
                                        listeners: {
                                            select: {
                                                fn: function (item, records) {
                                                    App.tblPersonnelSub.store.pageSize = parseInt(this.getValue(), 10); /*App.tblPersonnelSub.store.reload();*/
                                                    getPersonnelSubInfo(this.up(), 1)
                                                }
                                            }
                                        }
                                    }],
                                    displayInfo: true,
                                    store: "id879b6e3921483cc9",
                                    afterPageText: "صفحه بعد",
                                    beforePageText: "صفحه قبل",
                                    firstText: "صفحه اول",
                                    lastText: "صفحه آخر",
                                    nextText: "صفحه بعد",
                                    prevText: "صفحه قبل",
                                    refreshText: "بارگذاری مجدد",
                                    listeners: {
                                        beforechange: {
                                            fn: getPersonnelSubInfo
                                        }
                                    }
                                },
                                tbar: {
                                    xtype: "toolbar",
                                    items: [{
                                        id: "txtPersonnelName",
                                        xtype: "textfield",
                                        fieldLabel: "کارمند",
                                        labelAlign: "right",
                                        name: "txtPersonnelName",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "txtPersonnelCode",
                                        xtype: "textfield",
                                        fieldLabel: "کد پرسنلی",
                                        labelAlign: "right",
                                        name: "txtPersonnelCode",
                                        validateOnFocusLeave: true
                                    }, {
                                        id: "ddlPersonnelGroup",
                                        width: 700,
                                        xtype: "combobox",
                                        fieldLabel: "واحدسازمانی",
                                        labelAlign: "right",
                                        labelWidth: 130,
                                        validateOnFocusLeave: true,
                                        editable: false,
                                        queryMode: "local",
                                        store: Ext.data.StoreManager.getArrayStore(2),
                                        listeners: {
                                            afterrender: {
                                                fn: function (item) {
                                                    getPersonnelGroup(this)
                                                }
                                            }
                                        }
                                    }, {
                                        id: "btnSearch",
                                        autoShow: true,
                                        tabIndex: 12,
                                        handler: function () {
                                            getPersonnelSubInfo(this.up(), 1)
                                        },
                                        iconAlign: "right",
                                        iconCls: "#Find",
                                        text: "جستجو"
                                    }]
                                },
                                title: "پرسنل زیر مجموعه",
                                iconCls: "#User",
                                tools: [{
                                    type: "save"
                                }],
                                columns: {
                                    items: [{
                                        width: 35,
                                        xtype: "rownumberer",
                                        align: "center",
                                        text: "ردیف"
                                    }, {
                                        text: "عکس پرسنلی"
                                    }, {
                                        flex: 2,
                                        renderer: setSubPersonnelInfo,
                                        sortable: true,
                                        text: "مشخصات کارمند"
                                    }, {
                                        flex: 1,
                                        dataIndex: "ExtraTime",
                                        sortable: true,
                                        text: "اضافه کار"
                                    }, {
                                        flex: 1,
                                        dataIndex: "VacationExtraTime",
                                        text: "تعطیل کاری"
                                    }, {
                                        flex: 1,
                                        dataIndex: "InvalidExtraTime",
                                        sortable: true,
                                        text: "شب کاری"
                                    }, {
                                        flex: 1,
                                        dataIndex: "DeductionTime",
                                        sortable: true,
                                        text: "تاخیر",
                                        cellWrap: true
                                    }, {
                                        flex: 1,
                                        dataIndex: "AbsenceTime",
                                        sortable: true,
                                        text: "غیبت شناور"
                                    }, {
                                        flex: 1,
                                        dataIndex: "EarlyTime",
                                        sortable: true,
                                        text: "تعجیل"
                                    }, {
                                        flex: 1,
                                        dataIndex: "DeductionWorking",
                                        sortable: true,
                                        text: "جمع کسرکار"
                                    }, {
                                        flex: 1,
                                        dataIndex: "AbsenceDay",
                                        sortable: true,
                                        text: "غیبت"
                                    }, {
                                        flex: 1,
                                        dataIndex: "T1",
                                        sortable: true,
                                        text: "ورود1"
                                    }, {
                                        flex: 1,
                                        dataIndex: "T2",
                                        sortable: true,
                                        text: "خروج1"
                                    }, {
                                        flex: 1,
                                        dataIndex: "T3",
                                        sortable: true,
                                        text: "ورود2"
                                    }, {
                                        flex: 1,
                                        dataIndex: "T4",
                                        sortable: true,
                                        text: "خروج2"
                                    }, {
                                        flex: 1,
                                        dataIndex: "T5",
                                        sortable: true,
                                        text: "ورود3"
                                    }, {
                                        flex: 1,
                                        dataIndex: "T6",
                                        sortable: true,
                                        text: "خروج3"
                                    }, {
                                        width: 70,
                                        xtype: "commandcolumn",
                                        commands: [{
                                            xtype: "button",
                                            command: "Delete",
                                            tooltip: {
                                                text: "ثبت نواقص"
                                            },
                                            iconCls: "#ApplicationAdd"
                                        }, {
                                            xtype: "button",
                                            command: "Edit",
                                            tooltip: {
                                                text: "جزئیات"
                                            },
                                            iconCls: "#ApplicationViewDetail"
                                        }],
                                        prepareToolbar: setGridAccesses
                                    }]
                                },
                                emptyText: "اطلاعاتی برای این بخش یافت نگردید.",
                                listeners: {
                                    afterrender: {
                                        fn: function (item) {
                                            getPersonnelSubInfo(this, 1)
                                        }
                                    }
                                }
                            }],
                            activeTab: 0,
                            listeners: {
                                afterrender: {
                                    fn: function (item) {
                                        tabPanelMain = this;
                                    }
                                }
                            }
                        }],
                        layout: "border",
                        title: "مدیریت و نمایش تردد",
                        iconCls: "#PageEdit"
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
                                    name: "Code",
                                    type: "int"
                                }, {
                                    name: "RealTime"
                                }, {
                                    name: "ExtraTime"
                                }, {
                                    name: "NightTime"
                                }, {
                                    name: "LunchTime"
                                }, {
                                    name: "EnterFlexible"
                                }, {
                                    name: "ExitFlexible"
                                }, {
                                    name: "WorkTypeTitle"
                                }, {
                                    name: "IsLunchOvertime",
                                    type: "boolean"
                                }, {
                                    name: "MaxExtra"
                                }, {
                                    name: "MinExtra"
                                }, {
                                    name: "MaxLicExtra"
                                }, {
                                    name: "MinLicExtra"
                                }, {
                                    name: "FloatTime"
                                }, {
                                    name: "EnterFlexibleDeduction",
                                    type: "boolean"
                                }, {
                                    name: "IsNotDailyVacation",
                                    type: "boolean"
                                }, {
                                    name: "IsLicExtraHourMission",
                                    type: "boolean"
                                }, {
                                    name: "IsLicNightWork",
                                    type: "boolean"
                                }]
                            }),
                            proxy: {
                                type: "page",
                                reader: {
                                    type: "json"
                                }
                            }
                        },
                        id: "TabPresenceCode",
                        plugins: [{
                            ptype: "filterheader"
                        }],
                        xtype: "grid",
                        tbar: {
                            xtype: "toolbar",
                            items: [{
                                handler: function () {
                                    showPresenceCodeWindow(this.up('grid'), 'Add', 0)
                                },
                                iconCls: "#Add",
                                text: "کد حضور جدید"
                            }]
                        },
                        title: "مدیریت کدهای حضور",
                        iconCls: "#CalendarSelectDay",
                        columns: {
                            items: [{
                                width: 35,
                                xtype: "rownumberer",
                                items: [{
                                    hidden: true,
                                    html: "&nbsp;",
                                    xtype: "displayfield",
                                    validateOnFocusLeave: true
                                }],
                                align: "center",
                                text: "ردیف"
                            }, {
                                width: 40,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "Code",
                                sortable: true,
                                text: "کد"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "Title",
                                sortable: true,
                                text: "عنوان"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "RealTime",
                                sortable: true,
                                text: "حضور اداری"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "ExtraTime",
                                sortable: true,
                                text: "اضافه کار عادی"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "LunchTime",
                                sortable: true,
                                text: "زمان ناهار"
                            }, {
                                width: 50,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "NightTime",
                                sortable: true,
                                text: "شب کاری"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "EnterFlexible",
                                sortable: true,
                                text: "ارفاق در ورود"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "ExitFlexible",
                                sortable: true,
                                text: "ارفاق در خروج"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "MaxExtra",
                                sortable: true,
                                text: "سقف اضافه کار",
                                tooltip: "سقف اضافه کار"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "MinExtra",
                                sortable: true,
                                text: "حداقل اضافه کار",
                                tooltip: "حداقل اضافه کار"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "MaxLicExtra",
                                sortable: true,
                                text: "سقف اضافه کار با مجوز",
                                tooltip: "سقف اضافه کار با مجوز"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "MinLicExtra",
                                sortable: true,
                                text: "حداقل اضافه کار مجوز"
                            }, {
                                width: 45,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "FloatTime",
                                sortable: true,
                                text: "شناوری"
                            }, {
                                xtype: "checkcolumn",
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "IsLunchOvertime",
                                sortable: true,
                                text: "اضافه کار ناهار",
                                tooltip: "اضافه کار ناهار"
                            }, {
                                xtype: "checkcolumn",
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "EnterFlexibleDeduction",
                                sortable: true,
                                text: "ارفاق در ورود مشمول کسرکار نباشد",
                                cellWrap: true,
                                tooltip: "ارفاق در ورود مشمول کسرکار نباشد"
                            }, {
                                xtype: "checkcolumn",
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "IsLicExtraHourMission",
                                sortable: true,
                                text: "ماموریت ساعتی نیاز به مجوز دارد",
                                cellWrap: true,
                                tooltip: "ماموریت ساعتی نیاز به مجوز دارد"
                            }, {
                                xtype: "checkcolumn",
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "IsNotDailyVacation",
                                sortable: true,
                                text: "امکان ثبت مرخصی روزانه نداشته باشد",
                                cellWrap: true,
                                tooltip: "امکان ثبت مرخصی روزانه نداشته باشد"
                            }, {
                                xtype: "checkcolumn",
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "IsLicNightWork",
                                sortable: true,
                                text: "شب کاری نیاز به مجوز دارد",
                                cellWrap: true,
                                tooltip: "شب کاری نیاز به مجوز دارد"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "WorkTypeTitle",
                                sortable: true,
                                text: "نوع حضور",
                                cellWrap: true
                            }, {
                                width: 60,
                                xtype: "commandcolumn",
                                items: [{
                                    hidden: true,
                                    html: "&nbsp;",
                                    xtype: "displayfield",
                                    validateOnFocusLeave: true
                                }],
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
                                    iconCls: "#NoteEdit"
                                }],
                                listeners: {
                                    command: {
                                        fn: function (item, command, record, recordIndex, cellIndex) {
                                            if (command === 'Edit') {
                                                showPresenceCodeWindow(this.up('grid'), 'Edit', record.data.ID)
                                            } else {
                                                deletePresenceCode(this.up('grid'), record)
                                            }
                                        }
                                    }
                                }
                            }]
                        },
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    getPresenceCodes(this)
                                }
                            },
                            rowdblclick: {
                                fn: function (item, record, node, index, e) {
                                    showPresenceCodeWindow(this, 'Edit', null)
                                }
                            }
                        }
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
                                    name: "MaxExtraTime"
                                }, {
                                    name: "MinExtraTime"
                                }, {
                                    name: "DelayTime"
                                }, {
                                    name: "EarlyTime"
                                }, {
                                    name: "DeductionTime"
                                }, {
                                    name: "IsHourly",
                                    type: "boolean"
                                }, {
                                    name: "MinHourlyTime"
                                }, {
                                    name: "IsDynamicWork",
                                    type: "boolean"
                                }, {
                                    name: "ShiftTypeTitle"
                                }, {
                                    name: "IsBaseShift",
                                    type: "boolean"
                                }, {
                                    name: "PersonnelCount",
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
                        id: "TabShifts",
                        plugins: [{
                            ptype: "filterheader"
                        }],
                        xtype: "grid",
                        tbar: {
                            xtype: "toolbar",
                            items: [{
                                handler: function () {
                                    showShiftWindow(this.up('grid'), 'Add', 0)
                                },
                                iconCls: "#Add",
                                text: "شیفت جدید"
                            }]
                        },
                        title: "مدیریت شیفت ها",
                        iconCls: "#CalendarViewMonth",
                        columns: {
                            items: [{
                                width: 35,
                                xtype: "rownumberer",
                                items: [{
                                    hidden: true,
                                    html: "&nbsp;",
                                    xtype: "displayfield",
                                    validateOnFocusLeave: true
                                }],
                                align: "center",
                                text: "ردیف"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "Title",
                                sortable: true,
                                text: "عنوان"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "MaxExtraTime",
                                sortable: true,
                                text: "حداکثر اضافه کار"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "MinExtraTime",
                                sortable: true,
                                text: "حداقل اضافه کار"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "DelayTime",
                                sortable: true,
                                text: "تاخیر مجاز"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "EarlyTime",
                                sortable: true,
                                text: "تعجیل مجاز"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "EnterFlexible",
                                sortable: true,
                                text: "کسرکار مجاز"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "ShiftTypeTitle",
                                sortable: true,
                                text: "نوع نوبت کاری"
                            }, {
                                xtype: "checkcolumn",
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "IsHourly",
                                sortable: true,
                                text: "شیفت ساعتی"
                            }, {
                                xtype: "checkcolumn",
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "MinHourlyTime",
                                sortable: true,
                                text: "حداقل ساعت کارکرد"
                            }, {
                                xtype: "checkcolumn",
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "IsDynamicWork",
                                sortable: true,
                                text: "حضور پویا"
                            }, {
                                xtype: "checkcolumn",
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "IsBaseShift",
                                sortable: true,
                                text: "شیفت پایه"
                            }, {
                                flex: 1,
                                items: [{
                                    plugins: [{
                                        ptype: "clearbutton"
                                    }],
                                    xtype: "textfield",
                                    validateOnFocusLeave: true
                                }],
                                dataIndex: "PersonnelCount",
                                sortable: true,
                                text: "تعداد نفرات تخصيص شده"
                            }, {
                                width: 60,
                                xtype: "commandcolumn",
                                items: [{
                                    hidden: true,
                                    html: "&nbsp;",
                                    xtype: "displayfield",
                                    validateOnFocusLeave: true
                                }],
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
                                    iconCls: "#NoteEdit"
                                }],
                                listeners: {
                                    command: {
                                        fn: function (item, command, record, recordIndex, cellIndex) {
                                            if (command === 'Edit') {
                                                showShiftWindow(this.up('grid'), 'Edit', record.data.ID)
                                            } else {
                                                deleteShift(this.up('grid'), record)
                                            }
                                        }
                                    }
                                }
                            }]
                        },
                        listeners: {
                            afterrender: {
                                fn: function (item) {
                                    getShifts(this)
                                }
                            },
                            rowdblclick: {
                                fn: function (item, record, node, index, e) {
                                    showShiftWindow(this, 'Edit', null)
                                }
                            }
                        }
                    }],
                    layout: "fit",
                    bodyPadding: 1,
                    activeTab: 0
                }],
                layout: "fit",
                bodyPadding: 5,
                closeAction: "destroy",
                title: "حضور و غیاب",
                iconCls: "#Calendar"
            });
        });
    });
});