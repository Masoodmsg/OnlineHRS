Ext.net.ResourceMgr.init({
    ajaxTimeout: 3600000, id: "ResourceManager1", aspForm: "form1", theme: "gray", icons: ["ApplicationViewTile", "ApplicationCascade", "Application"], rtl: true, locale: "en-US"
}

);
Ext.onReady(function () {
    Ext.net.DirectEvent.showFailure = Ext.emptyFn;
    Ext.ns("App.direct");
    Ext.apply(App.direct, {
        ShowCompanyInfo: function (config) {
            return Ext.net.DirectMethod.request("ShowCompanyInfo", Ext.applyIf(config || {}
            , {
                specifier: "static", url: "/Default.aspx"
            }
            ));
        }
        , EditCompanyInfo: function (companyInfoJson, config) {
            return Ext.net.DirectMethod.request("EditCompanyInfo", Ext.applyIf(config || {}
            , {
                params: {
                    companyInfoJson: companyInfoJson
                }
                , specifier: "static", url: "/Default.aspx"
            }
            ));
        }
        , GetOrganizationLevel: function (config) {
            return Ext.net.DirectMethod.request("GetOrganizationLevel", Ext.applyIf(config || {}
            , {
                specifier: "static", url: "/Default.aspx"
            }
            ));
        }
        , SaveOrganizationLevel: function (orgLevelJson, editMode, config) {
            return Ext.net.DirectMethod.request("SaveOrganizationLevel", Ext.applyIf(config || {}
            , {
                params: {
                    orgLevelJson: orgLevelJson, editMode: editMode
                }
                , specifier: "static", url: "/Default.aspx"
            }
            ));
        }
        , ChangePassword: function (oldPass, newPass, config) {
            return Ext.net.DirectMethod.request("ChangePassword", Ext.applyIf(config || {}
            , {
                params: {
                    oldPass: oldPass, newPass: newPass
                }
                , specifier: "static", url: "/Default.aspx"
            }
            ));
        }
        , EditUserInfo: function (userInfoJson, config) {
            return Ext.net.DirectMethod.request("EditUserInfo", Ext.applyIf(config || {}
            , {
                params: {
                    userInfoJson: userInfoJson
                }
                , specifier: "static", url: "/Default.aspx"
            }
            ));
        }
        , GetUserRoles: function (config) {
            return Ext.net.DirectMethod.request("GetUserRoles", Ext.applyIf(config || {}
            , {
                specifier: "static", url: "/Default.aspx"
            }
            ));
        }
        , EditRole: function (roleTitle, roleID, editeMode, config) {
            return Ext.net.DirectMethod.request("EditRole", Ext.applyIf(config || {}
            , {
                params: {
                    roleTitle: roleTitle, roleID: roleID, editeMode: editeMode
                }
                , specifier: "static", url: "/Default.aspx"
            }
            ));
        }
        , GetRoleAccess: function (roleID, config) {
            return Ext.net.DirectMethod.request("GetRoleAccess", Ext.applyIf(config || {}
            , {
                params: {
                    roleID: roleID
                }
                , specifier: "static", url: "/Default.aspx"
            }
            ));
        }
        , GetModuleUserTypeAccess: function (config) {
            return Ext.net.DirectMethod.request("GetModuleUserTypeAccess", Ext.applyIf(config || {}
            , {
                specifier: "static", url: "/Default.aspx"
            }
            ));
        }
        , SetRoleAccess: function (roleAccessJson, roleID, config) {
            return Ext.net.DirectMethod.request("SetRoleAccess", Ext.applyIf(config || {}
            , {
                params: {
                    roleAccessJson: roleAccessJson, roleID: roleID
                }
                , specifier: "static", url: "/Default.aspx"
            }
            ));
        }
        , UserSearch: function (user, config) {
            return Ext.net.DirectMethod.request("UserSearch", Ext.applyIf(config || {}
            , {
                params: {
                    user: user
                }
                , specifier: "static", url: "/Default.aspx"
            }
            ));
        }
        , SetUserRoleAssigment: function (userRoleAccessJson, updateMode, config) {
            return Ext.net.DirectMethod.request("SetUserRoleAssigment", Ext.applyIf(config || {}
            , {
                params: {
                    userRoleAccessJson: userRoleAccessJson, updateMode: updateMode
                }
                , specifier: "static", url: "/Default.aspx"
            }
            ));
        }
        , GetUserRolesAssigment: function (userID, config) {
            return Ext.net.DirectMethod.request("GetUserRolesAssigment", Ext.applyIf(config || {}
            , {
                params: {
                    userID: userID
                }
                , specifier: "static", url: "/Default.aspx"
            }
            ));
        }
        , SiteLoader: function (config) {
            return Ext.net.DirectMethod.request("SiteLoader", Ext.applyIf(config || {}
            , {
                eventMask: {
                    showMask: true, msg: "...در حال بارگذاری سایت"
                }
            }
            ));
        }
        , CompanyRegistration: function (personType, legalPersonType, legalPersonTypeTitle, name, email, username, password, employerName, employerFamily, employerNationalCode, config) {
            return Ext.net.DirectMethod.request("CompanyRegistration", Ext.applyIf(config || {}
            , {
                params: {
                    personType: personType, legalPersonType: legalPersonType, legalPersonTypeTitle: legalPersonTypeTitle, name: name, email: email, username: username, password: password, employerName: employerName, employerFamily: employerFamily, employerNationalCode: employerNationalCode
                }
            }
            ));
        }
        , Login: function (username, password, config) {
            return Ext.net.DirectMethod.request("Login", Ext.applyIf(config || {}
            , {
                params: {
                    username: username, password: password
                }
                , eventMask: {
                    showMask: true, msg: "...در حال اعتبار سنجی"
                }
            }
            ));
        }
    }
    );
    window.App.Desktop1 = Ext.create("Ext.ux.desktop.App", {
        id: "Desktop1", desktopConfig: {
            id: "desktopConfig", xtype: "panel", contextMenu: {
                id: "Menu1", xtype: "menu", items: [{
                    id: "MenuSeparator1", xtype: "menuseparator"
                }
                , {
                    id: "MenuItem2", handler: tile, iconCls: "#ApplicationViewTile", text: "کاشی", tooltip: "نمایش کاشی پنجره ها"
                }
                , {
                    id: "MenuItem3", handler: cascade, iconCls: "#ApplicationCascade", text: "آبشاری", tooltip: "نمایش آبشاری پنجره ها"
                }
                , {
                    id: "MenuSeparator3", xtype: "menuseparator"
                }
                , {
                    id: "MenuItem5", handler: function () {
                        authorization('pictureGalleryModule', 2)
                    }
                    , iconCls: "x-menu-icon", text: "تغییر پس زمینه"
                }
                , {
                    id: "MenuItemFullScreen", handler: function () {
                        fullScreenWindow();
                    }
                    , iconCls: "x-fullscreen16-icon", text: "تمام صفحه"
                }
                ]
            }
            , shortcutDefaults: {
                textCls: "shortcut-text"
            }
            , wallpaper: "Resources/IconShortcuts/world-map.png", wallpaperStretch: true
        }
        , startConfig: {
            height: 300, xtype: "menu", title: "Masood Ghaemi", iconCls: "#Application", toolConfig: {
                id: "Toolbar1", width: 100, xtype: "toolbar", items: [{
                    id: "btnLogout", hidden: true, iconCls: "x-logout-icon", text: "خروج از سایت"
                }
                ]
            }
        }
        , taskbarConfig: {
            xtype: "toolbar", quickStartConfig: {
                id: "Toolbar2", xtype: "toolbar", items: [{
                    id: "Button3", handler: tile, iconCls: "#ApplicationViewTile", tooltip: {
                        text: "نمایش کاشی پنجره ها"
                    }
                }
                , {
                    id: "Button4", handler: cascade, iconCls: "#ApplicationCascade", tooltip: {
                        text: "نمایش آبشاری پنجره ها"
                    }
                }
                ]
            }
            , trayConfig: {
                id: "Toolbar3", xtype: "toolbar", items: [{
                    id: "ToolbarFill1", xtype: "tbfill"
                }
                ]
            }
            , trayWidth: 100, trayClock: {
                xtype: "trayclock", timeFormat: "g:i a"
            }
        }
        , listeners: {
            ready: {
                fn: function () {
                    App.direct.SiteLoader();
                }
            }
        }
    }
    );
}

);
//------------------------------------------------------------------------------------

Ext.net.Desktop.addModule(Ext.create("Ext.ux.desktop.Module", {
    id: "CompanyManagementModule", shortcut: {
        "iconCls": "x-company-icon", "sortIndex": 1, "name": "مدیرت شرکت", "x": "20", "y": "250", "module": "CompanyManagementModule"
    }
}

));
Ext.net.Desktop.getModule("CompanyManagementModule").addLauncher({
    xtype: "menuitem", iconCls: "#House", text: "مدیرت شرکت"
}

);
Ext.net.Desktop.getModule("CompanyManagementModule").addWindow(function () {
    Ext.net.ResourceMgr.destroyCmp("App.CompanyManagemenWindow");
    Ext.net.Desktop.getModule("CompanyManagementModule").setWindow({
        id: "CompanyManagemenWindow", autoRender: false, height: 550, rtl: true, width: 800, xtype: "window", keyMap: {
            binding: {
                handler: editCompanyInfo, key: [13]
            }
        }
        , resizable: false, items: [{
            id: "TabPanelCompanyManagement", height: 250, width: 600, xtype: "tabpanel", items: [{
                id: "tabCompanyInfo", frame: true, style: "width:100%;padding-top:15px", xtype: "form", items: [{
                    id: "cmbPersonTypeCompanyManagement", tabIndex: 1, xtype: "combobox", anchor: "-5", fieldLabel: "نوع مودی", editable: false, queryMode: "local", store: [["1", "حقیقی"], ["2", "حقوقی"]], listeners: {
                        select: {
                            fn: function (item, records) {
                                selectPersonTypeCompanyManagement()
                            }
                        }
                    }
                }
                , {
                    id: "cmbPersonLegalTypeCompanyManagement", tabIndex: 2, xtype: "combobox", anchor: "100%", fieldLabel: "نوع شخص حقوقی", editable: false, queryMode: "local", store: [["1", "وزارت خانه"], ["2", "موسسه دولتي"], ["3", "شرکت دولتي"], ["4", "سایر دستگاههاي دولتي"], ["5", "نهادهاي عمومي غیردولتي"], ["6", "بخش خصوصي"], ["7", "سایر پرداخت کنندگان حقوق"]]
                }
                , {
                    id: "txtNameCompanyManagement", style: "width:99%;", tabIndex: 3, xtype: "textfield", anchor: "-5", colspan: 2, fieldLabel: "نام شرکت", fieldStyle: "text-align:center;font-weight:bold !important", allowBlank: false, blankText: ".این فیلد باید پر باشد"
                }
                , {
                    id: "txtPostCodeCompanyManagement", tabIndex: 5, xtype: "textfield", fieldLabel: "کد پستی", enforceMaxLength: true, maskRe: /[0-9-]/, maxLength: 10, minLength: 10, minLengthText: "این فیلد باید 10 رقم باشد"
                }
                , {
                    id: "txtPhoneCompanyManagement", tabIndex: 6, xtype: "textfield", fieldLabel: "تلفن", enforceMaxLength: true, maskRe: /[0-9-]/, maxLength: 11, minLength: 11, minLengthText: "تلفن باید 11 رقم باشد"
                }
                , {
                    id: "txtEconomicCodeCompanyManagement", tabIndex: 7, xtype: "textfield", fieldLabel: "کد اقتصادی (TIN)", enforceMaxLength: true, maskRe: /[0-9-]/, maxLength: 12, minLength: 12, minLengthText: "این فیلد باید 12 رقم باشد"
                }
                , {
                    id: "txtTFNCompanyManagement", tabIndex: 8, xtype: "textfield", fieldLabel: "شماره پرونده مالیاتی (TFN)", enforceMaxLength: true, maskRe: /[0-9-]/, maxLength: 12, minLength: 12, minLengthText: "این فیلد باید 12 رقم باشد"
                }
                , {
                    id: "txtWorkshopCodeCompanyManagement", tabIndex: 9, xtype: "textfield", fieldLabel: "کد کارگاه", enforceMaxLength: true, maskRe: /[0-9-]/, maxLength: 10, minLength: 10, minLengthText: "این فیلد باید 10 رقم باشد"
                }
                , {
                    id: "txtEmailAddressCompanyManagement", tabIndex: 10, xtype: "textfield", anchor: "-5", fieldLabel: "آدرس الكترونيكى", vtype: "email", vtypeText: "فرمت ایمیل اشتباه است."
                }
                , {
                    id: "txtAddressCompanyManagement", style: "width:99%", tabIndex: 11, xtype: "textareafield", colspan: 2, fieldLabel: "آدرس"
                }
                ], layout: {
                    type: "table", itemCls: "width-full", columns: 2
                }
                , buttons: [{
                    id: "btnCompanyEdit1", tabIndex: 12, handler: editCompanyInfo, iconCls: "#ApplicationEdit", text: "ویرایش"
                }
                ], title: "اطلاعات شرکت", iconCls: "#HouseGo", url: unescape("%2fDefault.aspx"), fieldDefaults: {
                    labelAlign: "top", labelStyle: "color:#205a8c", msgTarget: "side"
                }
            }
            , {
                id: "tabCompanyManagerInfo", frame: true, style: "width:100%;padding-top:15px", xtype: "form", autoScroll: true, items: [{
                    id: "txtEmployerNameCompanyManagement", "readOnly": true, tabIndex: 1, xtype: "textfield", anchor: "-5", fieldLabel: "نام"
                }
                , {
                    id: "txtEmployerFamilyCompanyManagement", "readOnly": true, tabIndex: 2, xtype: "textfield", anchor: "100%", fieldLabel: "نام خانوادگی"
                }
                , {
                    id: "txtEmployerNationalCodeCompanyManagement", "readOnly": true, tabIndex: 3, xtype: "textfield", fieldLabel: "کد ملی", vtype: "isValidNationalCode", vtypeText: ".کد ملی نامعتبر است", allowBlank: false, blankText: ".این فیلد باید پر باشد", enforceMaxLength: true, maskRe: /[0-9-]/, maxLength: 10, minLength: 10, minLengthText: "این فیلد باید 10 رقم باشد"
                }
                , {
                    id: "txtEmployerPostCompanyManagement", "readOnly": true, tabIndex: 4, xtype: "textfield", fieldLabel: "سمت"
                }
                , {
                    id: "txtEmployerEmailCompanyManagement", "readOnly": true, tabIndex: 5, xtype: "textfield", anchor: "-5", fieldLabel: "آدرس الكترونيكى", vtype: "email", vtypeText: "فرمت ایمیل اشتباه است"
                }
                , {
                    id: "txtEmployerMobileCompanyManagement", "readOnly": true, tabIndex: 6, xtype: "textfield", fieldLabel: "شماره تلفن همراه", vtype: "isValidMobileNo", vtypeText: "شماره تلفن همراه باید با ۰۹ شروع شود", enforceMaxLength: true, maskRe: /[0-9-]/, maxLength: 11, minLength: 11, minLengthText: "این فیلد باید 11 رقم باشد"
                }
                ], layout: {
                    type: "table", itemCls: "width-full", columns: 2
                }
                , bodyPadding: 6, buttons: null, title: "اطلاعات کارفرما", iconCls: "#UserKey", url: unescape("%2fDefault.aspx"), fieldDefaults: {
                    labelAlign: "top", labelStyle: "color:#205a8c", msgTarget: "side", minLengthText: "این فیلد باید 12 رقم باشد"
                }
            }
            , {
                id: "tabPasswordChange", frame: true, style: "width:100%;padding-top:15px", width: 350, xtype: "form", autoScroll: true, items: [{
                    id: "txtOldPasswordCompanyManagement", "readOnly": true, tabIndex: 1, xtype: "textfield", anchor: "-5", fieldLabel: "کلمه عبور قدیم", inputType: "password"
                }
                , {
                    id: "txtPassword", "readOnly": true, tabIndex: 2, xtype: "textfield", anchor: "100%", fieldLabel: "کلمه عبور جدید", inputType: "password", vtype: "isValidNewPassword", vtypeText: "کلمه عبور جدید نمیتواند با کلمه عبور قدیم یکی باشد"
                }
                , {
                    id: "txtConfirmPasswordCompanyManagement", "readOnly": true, tabIndex: 3, xtype: "textfield", fieldLabel: "تکرار کلمه عبور جدید", inputType: "password", vtype: "isValidConfirmPassword", vtypeText: "تکرار کلمه عبور جدید صحیح نیست"
                }
                ], layout: {
                    type: "table", itemCls: "width-half", columns: 1
                }
                , bodyPadding: 6, buttons: null, title: "تغییر کلمه عبور", iconCls: "#LockKey", url: unescape("%2fDefault.aspx"), fieldDefaults: {
                    labelAlign: "top", labelStyle: "color:#205a8c", msgTarget: "side", allowBlank: false, blankText: ".این فیلد باید پر باشد", minLength: 4, minLengthText: "طول کلمه عبور باید حداقل 4 کاراکتر باشد"
                }
            }
            ], layout: "fit", bodyPadding: 1, activeTab: 0
        }
        ], layout: "fit", bodyPadding: 5, closeAction: "destroy", title: "مدیرت شرکت", iconCls: "#House", maximizable: false, listeners: {
            afterrender: {
                fn: function (item) {
                    showCompanyInfo();
                }
            }
        }
    }
    );
}

);