function PersonnelSelectPanel(parent, title, topbarActions) {


    var filterPanel = new PersonnelSearchFiltersPanel(null)


    var rightGrid = new Ext.grid.Grid({

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

            plugins: [{

                ptype: "filterheader"
            }],
            style: "height:100%",
            xtype: "grid",
            region: "center",
            columnWidth: 0.48,

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
            selModel: window.App.ctl08 = Ext.create("Ext.selection.CheckboxModel", {
                proxyId: "ctl08",
                selType: "checkboxmodel"
            }),
            listeners: {
                rowdblclick: {
                    fn: function (item, record, node, index, e) {
                        showPersonnelInputFormItemModalWindow(this.up('#TabInputFormItems'), this, 'Edit')
                    }
                }
            }
        }]
    })
    var selectBtn = new Ext.container.Container({

        "bodyStyle": "margin-top:120px",
        cls: "height-full",
        frame: true,
        xtype: "container",
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
    var leftGrid = new Ext.grid.Grid({
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
            storeId: "ctl54",
            proxy: {
                type: "page",
                reader: {
                    type: "json"
                }
            }
        },

        height: "100%",
        plugins: [{
            proxyId: "ctl93",
            ptype: "filterheader"
        }],
        xtype: "grid",
        region: "center",
        columnWidth: 0.48,
        tbar: {

            xtype: "toolbar",
            items: topbarActions
        },
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
        }),

    })

    var personnelPanel = new Ext.container.Container({

        layout: 'column',
        items: [rightGrid, selectBtn, leftGrid]
    });

    var mainPanel = new Ext.panel.Panel({

        title: title,
        layout: 'border',
        renderTo: isNullOrEmpty(parent) ? null : parent.getEl(),
        items: [filterPanel, personnelPanel]
    });





    return mainPanel
}