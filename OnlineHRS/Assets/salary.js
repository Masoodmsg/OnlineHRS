var companyID = 0
var orgAccess = ''
var userID = 0
var selectedPersonnelID = 0;
var userType = 0
var personnelIDs = [];
var personnelsName = [];
var counter = 0
var maskTextEl;
var tokenID;


function setTokenID() {

    Ext.net.DirectMethod.request('GetTokenID', {
        specifier: "static",
        url: "/Default.aspx",
        success: function (token) {
            tokenID = token
        }
    });
    
}
function downloadFile(fileType, data) {

    data = Ext.isString(data) ? data : Ext.encode(data)
    if (fileType === 'SalaryFish') {


        FileDownloader.download(Ext.String.format('DownloadFile.aspx?fileType={0}&jsonData={1}', fileType, data));
    }

}

function selectPersonType() {
    //var cmbPersonType = document.getElementById('cmbPersonType-inputEl');
    if (App.cmbPersonType.value == '1') {
        App.cmbPersonLegalType.setDisabled(true);

        App.txtCompanyName.setDisabled(true);
    }
    else {
        App.cmbPersonLegalType.setDisabled(false);
        App.txtCompanyName.setDisabled(false);

    }
}
function selectPersonTypeCompanyManagement() {
    if (App.cmbPersonTypeCompanyManagement.value == '1') {
        App.cmbPersonLegalTypeCompanyManagement.setDisabled(true);
        App.txtNameCompanyManagement.setDisabled(true);
        App.txtEconomicCodeCompanyManagement.setDisabled(true);
    }
    else {
        App.cmbPersonLegalTypeCompanyManagement.setDisabled(false);
        App.txtNameCompanyManagement.setDisabled(false);
        App.txtEconomicCodeCompanyManagement.setDisabled(false);
    }
}

function register() {
    //var myMask = new Ext.LoadMask(Ext.getCmp('basicFormRegister').el, { useMsg: false });
    //myMask.show();
    var mask = showMask('RegisterationWindow', 'در حال ثبت نام...')
    var companyObj = {
        PersonType: App.cmbPersonType.value,
        PersonTypeTitle: App.cmbPersonType.value == 1 ? "حقیقی" : "حقوقی",
        LegalPersonType: App.cmbPersonType.value == 1 ? null : App.cmbPersonLegalType.value,
        LegalPersonTypeTitle: App.cmbPersonType.value == 1 ? null : App.cmbPersonLegalType.rawValue,
        Name: App.txtCompanyName.getRawValue(),
        BranchCode: 1,
        BranchName: 'شعبه مرکزی',
        FirstName: App.txtEmployerName.value,
        LastName: App.txtEmployerFamily.value,
        NationalCode: App.txtEmployerNationalCode.value,
        Email: App.txtEmailAddress.value,
        Username: App.txtUsernameReg.value,
        Password: App.txtConfirmPasswordReg.value
    };
   // execSPInsert(spName, isID, isResult, fillControl, extraData, mask, isTitle, afterInsertFn, msgConfig)
    execSPInsert('GL28BdhJBv5ZYagNJPjx8mNNxwipaSTo'/*SPC_CompanyRegistration*/, true, false, null, companyObj, mask, false, function (result) {
        
        companyID = result

        if (!isNullOrEmpty(result) && result > 0) {
            App.RegisterationWindow.close();
            login(App.txtUsernameReg.value, App.txtConfirmPasswordReg.value,true)

        }
    })
    

}

//function setCompanyID(id) {
//    companyID = id;
//}
function login(username,password, isReg) {

    //username = username == undefined ? App.txtUsernameSystem.value
    //execSPSelect('ZBfqnPQilSrBmr5XC0BXRw=='/*SPS_Login*/, { Username: username, Password: password }, null, null, null, function (data) {

    //    data = data[0]
    //    App.LoginCompanyWindow.close();
    //    Ext.Msg.info({ ui: 'success', title: 'ورود به شرکت', html: ' شما با موفقیت وارد شدید ', iconCls: '#Accept' });
    //    Ext.getHead().el.insertFirst({ tag: 'title', html: data.title });
    //    companyID = data.companyID
    //    orgAccess = data.orgAccess
    //    userID = data.userID
    //    userType = data.userType
    //})
    isReg = isReg == undefined ? false : isReg
    App.direct.Login({ Username: username, Password: password }, isReg,
        {
            success: function (result) {
                if (result.Success) {
                    var data = Ext.JSON.decode(result.Result)
                    App.LoginCompanyWindow.close();
                    Ext.Msg.info({ ui: 'success', title: 'ورود به شرکت', html: ' شما با موفقیت وارد شدید ', iconCls: '#Accept' });
                    Ext.getHead().el.insertFirst({ tag: 'title', html: data.title });
                    companyID = data.companyID
                    orgAccess = data.orgAccess
                    userID = data.userID
                    userType = data.userType
                }

            }
        });
}
function getErrorMassage(errors) {
    if (errors.length == 0) {
        return false;
    }
}


function isValidLogin(txtUsername, txtPass, btnLogin) {
    if (txtUsername.getErrors().length == 0 && txtPass.getErrors().length == 0)
        btnLogin.setDisabled(false);
    else
        btnLogin.setDisabled(true);
}
var tile = function () {
    Ext.ComponentQuery.query('desktop')[0].tileWindows();
};
var cascade = function () {
    Ext.ComponentQuery.query('desktop')[0].cascadeWindows();

};


function fullScreenWindow() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

function showCompanyInfo() {
    var mask = showMask('CompanyManagemenWindow', 'در حال بارگذاری اطلاعات شرکت...')

    execSPSelect('hRdt1ZolD5ZVOkOaP+lc1zOvlVJzyKZ1'/*SPC_GetCompanyInfo*/, { CompanyID: companyID }, mask, null, null, function (companyInfo) {

        companyInfo = companyInfo[0]
        if (App.tabCompanyInfo) {

            if (companyInfo.PersonType == 1) {
                App.cmbPersonLegalTypeCompanyManagement.setDisabled(true);
                App.txtNameCompanyManagement.setDisabled(true);
                App.txtEconomicCodeCompanyManagement.setDisabled(true);
            }
            else {
                App.cmbPersonLegalTypeCompanyManagement.setDisabled(false);
                App.txtNameCompanyManagement.setDisabled(false);
                App.txtEconomicCodeCompanyManagement.setDisabled(false);
            }
            App.cmbPersonTypeCompanyManagement.setValue(companyInfo.PersonType);
            App.cmbPersonLegalTypeCompanyManagement.setValue(companyInfo.LegalPersonType);
            App.txtNameCompanyManagement.setValue(companyInfo.Name);
            // App.txtFamilyNameCompanyManagement.setValue(obj.FamilyName)
            App.txtPostCodeCompanyManagement.setValue(companyInfo.PostCode)
            App.txtPhoneCompanyManagement.setValue(companyInfo.PhoneNumberCompany)
            App.txtEconomicCodeCompanyManagement.setValue(companyInfo.EconomicCode)
            App.txtTFNCompanyManagement.setValue(companyInfo.TFN)
            App.txtWorkshopCodeCompanyManagement.setValue(companyInfo.WorkshopCode)
            App.txtEmailAddressCompanyManagement.setValue(companyInfo.EmailCompany)
            App.txtAddressCompanyManagement.setValue(companyInfo.AddressCompany)
        }
        if (App.tabCompanyManagerInfo) {
            App.txtEmployerNameCompanyManagement.setValue(companyInfo.FirstName);
            App.txtEmployerFamilyCompanyManagement.setValue(companyInfo.LastName);
            App.txtEmployerNationalCodeCompanyManagement.setValue(companyInfo.NationalCode);
            App.txtEmployerPostCompanyManagement.setValue(companyInfo.PostName);
            App.txtEmployerEmailCompanyManagement.setValue(companyInfo.Email);
            App.txtEmployerMobileCompanyManagement.setValue(companyInfo.Mobile);
            App.txtEmployerNationalCodeCompanyManagement.tag = companyInfo.ManagerID
        }
    })


}
function editCompanyInfo() {
    if (isValidCompanyManagementForms()) {
        if (App.TabPanelCompanyManagement.activeTab.id == 'tabCompanyInfo') {

            var mask = showMask('CompanyManagemenWindow', 'در حال ویرایش اطلاعات شرکت...')
            var company = new Company_Info();


            company.PersonType = App.cmbPersonTypeCompanyManagement.value;
            company.PersonTypeTitle = App.cmbPersonTypeCompanyManagement.rawValue;
            company.LegalPersonType = company.PersonType == 2 ? App.cmbPersonLegalTypeCompanyManagement.value : null;
            company.LegalPersonTypeTitle = company.PersonType == 2 ? App.cmbPersonLegalTypeCompanyManagement.rawValue : null;
            company.Name = company.PersonType == 2 ? App.txtNameCompanyManagement.value : '';
            //company.FamilyName = company.PersonType == 1 ? Company.FamilyName : null;
            company.EmailCompany = App.txtEmailAddressCompanyManagement.value;
            company.AddressCompany = App.txtAddressCompanyManagement.value;
            company.PostCode = App.txtPostCodeCompanyManagement.value;
            company.EconomicCode = company.PersonType == 2 ? App.txtEconomicCodeCompanyManagement.value : '';
            company.PhoneNumberCompany = App.txtPhoneCompanyManagement.value;
            company.TFN = App.txtTFNCompanyManagement.value;
            company.WorkshopCode = App.txtWorkshopCodeCompanyManagement.value;
            company.ID = companyID;
            //company = Ext.JSON.encode(company);

            execSPUpdate('GL28BdhJBv5jTB9UKYen5sDAnW2nG37N'/*SPC_CompanyUpdate*/, null, company, mask, false, true, false, null)


        }
        else if (App.TabPanelCompanyManagement.activeTab.id == 'tabCompanyManagerInfo') {
            var mask = showMask('CompanyManagemenWindow', 'در حال ویرایش اطلاعات کارفرما...', true);
            var userInfo = new Personnel_Info();

            userInfo.NationalCode = App.txtEmployerNationalCodeCompanyManagement.value;
            userInfo.FirstName = App.txtEmployerNameCompanyManagement.value;
            userInfo.LastName = App.txtEmployerFamilyCompanyManagement.value;
            userInfo.PostName = App.txtEmployerPostCompanyManagement.value;
            userInfo.Email = App.txtEmployerEmailCompanyManagement.value;
            userInfo.ID = App.txtEmployerNationalCodeCompanyManagement.tag;
            userInfo.CompanyID = companyID;
            // userInfo = Ext.JSON.encode(userInfo);

            execSPUpdate('kVO2zRa9c8KptxOR3lh++nu/sVlsKNbg'/*SPP_PersonnelInfoUpdate*/, null, userInfo, mask, false, true, false, null)




        }
        else {//تغییر کلمه عبور
            var mask = showMask('CompanyManagemenWindow', 'در حال تغییر کلمه عبور...', true);
            var obj = { CompanyID: companyID, OldPassword: App.txtOldPasswordCompanyManagement.value, NewPassword: App.txtPassword.value }
            execSPUpdate('kVO2zRa9c8KptxOR3lh++nu/sVlsKNbg'/*SPP_PersonnelInfoUpdate*/, null, obj , mask, false, true, false, null)
           
        }
    }
}
function isValidCompanyManagementForms() {
    if (App.TabPanelCompanyManagement.activeTab.id == 'tabPasswordChange') {
        if (!App.tabPasswordChange1.getForm().isValid()) {
            Ext.Msg.info({ ui: 'danger', title: 'تغییر کلمه عبور', html: '.اطلاعات تغییر کلمه عبور معتبر نمیباشد', iconCls: '#Exclamation' });
            return false;
        }
    }
    else if (App.TabPanelCompanyManagement.activeTab.id == 'tabCompanyInfo') {
        if (!App.tabCompanyInfo1.getForm().isValid()) {
            Ext.Msg.info({ ui: 'danger', title: 'اطلاعات شرکت', html: '.اطلاعات شرکت معتبر نمیباشد', iconCls: '#Exclamation' });
            return false;
        }
    }
    else if (App.TabPanelCompanyManagement.activeTab.id == 'tabCompanyManagerInfo') {
        if (!App.tabCompanyManagerInfo1.getForm().isValid()) {
            Ext.Msg.info({ ui: 'danger', title: 'اطلاعات کارفرما', html: '.اطلاعات کارفرما معتبر نمیباشد', iconCls: '#Exclamation' });
            return false;
        }
    }
    return true;
}
function setCustomAttr(cmp, attrName, attrValue) {
    cmp.getEl().set({
        "lang": 'fa',

    });

}
//--------------------------------------------------مدیریت دسترسی ها---------------------------------------------------------

//-------------------------------------------------------------System\UserAccessManagement.ascx\مدیریت نقش ها-----------------------------------
function gridRolesDataBind(grid) {
    var mask = showMask(grid, 'بارگذاری نقش ها...', false);
    execSPSelect('7L0X8KxwuFvl7b3PCtoVUQ=='/*SPS_GetRoles*/, { CompanyID: companyID }, mask, grid, null, null)
}
function addRole() {
    //var grid = Ext.getCmp('gridRoles'),
    var record;
    App.tabRoleManagement_gridRoles.editingPlugin.cancelEdit();

    record = App.tabRoleManagement_gridRoles.store.insert(0, {
        ID: 0,
        Title: '',

        active: true
    });
    App.tabRoleManagement_gridRoles.editingPlugin.startEdit(record[0]);
};
function editRole(command, record) {
    if (command == 'Save') {
        if (record.context.record.data.ID > 0) {
            var mask = showMask(App.tabRoleManagement_gridRoles, 'ویرایش نقش ...', false);
            var title = record.context.record.data.Title
            var id = record.context.record.data.ID
            execSPUpdate('BoAGXt2XCb9YitRzpH/n/w=='/*SPS_RoleUpdate*/, null, { CompanyID: companyID, ID: id, Title: title }, mask, false, false, false, null)

        }
        else {
            var mask = showMask(App.tabRoleManagement_gridRoles, 'ویرایش نقش ...', false);
            var title = record.context.record.data.Title
            execSPInsert('BoAGXt2XCb9YitRzpH/n/w=='/*SPS_RoleUpdate*/, false, false, null, { CompanyID: companyID, UserID: userID, Title: title }, null, false, function (result) {
                mask.unmask();
                gridRolesDataBind();

            })


        }
    }
    else if (command == 'Edit') {
        App.tabRoleManagement_gridRoles.editingPlugin.startEdit(record);
    }
    else {

        confirmMsg(' حذف نقش ' + record.data.Title, 'ایا مطمئن هستید ؟', function (btn) {
            if (btn == 'yes') {
                var mask = showMask(App.tabRoleManagement_gridRoles, 'بارگذاری نقش ها...', false);
                var id = record.data.ID
                execSPDelete('BoAGXt2XCb9YitRzpH/n/w=='/*SPS_RoleUpdate*/, { CompanyID: companyID, ID: id }, null, function (result) {

                    removeRecordGrid(App.tabRoleManagement_gridRoles, record)
                    mask.unmask();

                })

            }

        });

    }
}

function treeModuleDataBind() {
    var mask = showMask('treeModuleRoleAccess', 'بارگذاری اطلاعات...', false);
    execSPSelect('5mDsw1HtuxhqmIR9lEHIeNDtsHdtWEru'/*ModuleUserTypeAccess*/, { UserTypeID: userType == 1 || 2 ? 1 : 5, CompanyID: companyID }, mask, {}, null, function (result) {

        var moduleItemes = result;
        var moduleIDs = [];
        var modulesInfo = [];
        for (var i = 0; moduleItemes.length > i; i++) {
            if (moduleIDs.indexOf(moduleItemes[i].ModuleID) < 0) {
                moduleIDs.push(moduleItemes[i].ModuleID);
                modulesInfo.push({ id: moduleItemes[i].ModuleID, text: moduleItemes[i].ModuleTitle });
            }
        }
        var rootNode = App.treeModuleRoleAccess.getRootNode();
        for (var i = 0; modulesInfo.length > i; i++) {
            var moduleNode = rootNode.appendChild({ id: modulesInfo[i].id + 10000, text: modulesInfo[i].text, leaf: false, checked: false, expanded: true, iconCls: 'icon-application' });
            for (var j = 0; moduleItemes.length > j; j++) {
                if (moduleItemes[j].ModuleID == modulesInfo[i].id)
                    moduleNode.appendChild({ id: moduleItemes[j].ModuleItemID, text: moduleItemes[j].ControlText, leaf: true, checked: false });
            }
        }

        mask.unmask();

    })

}

function selectRole(event) {
    App.tabRoleManagement_gridRoles.editingPlugin.cancelEdit();
    //var comboBoxAccessType = Ext.Array.filter(App.treeModuleRoleAccess.columns[1].cache, function (item) {
    //    return item.cmp.bodyEl !== null && item.cmp.bodyEl.dom !== null
    //});
    var mask = showMask('treeModuleRoleAccess', 'بارگذاری اطلاعات...', false);
    if (callout)
        callout.destroy();
    execSPSelect('bgMoV8LR3AlvD6cA5/658wli++lbQJ3KVTC9tCwvHto='/*SPS_GetModuleItemRoleAccess*/, { CompanyID: companyID, RoleID: event.record.data.ID }, mask, {}, null, function (result) {
        var moduleItemeIDs = result;
        var rootNode = App.treeModuleRoleAccess.getRootNode();
        //var comboBoxAccessType = Ext.Array.filter(App.treeModuleRoleAccess.columns[1].cache, function (item) { return item.cmp.value !== null })
        rootNode.eachChild(function (n) { n.set('checked', false); });
        for (var i = 0; rootNode.childNodes.length > i; i++) {
            for (var j = 0; rootNode.childNodes[i].childNodes.length > j; j++) {
                var moduleItem = contains(moduleItemeIDs, 'ModuleItemID', rootNode.childNodes[i].childNodes[j].id);
                if (moduleItem != null) {
                    rootNode.childNodes[i].childNodes[j].set('checked', true);
                    rootNode.childNodes[i].set('checked', true);

                    //var item = contains(App.treeModuleRoleAccess.columns[1].cache, 'id', rootNode.childNodes[i].childNodes[j].id);
                    Ext.Array.filter(App.treeModuleRoleAccess.columns[1].cache, function (item) {
                        return item.id == rootNode.childNodes[i].childNodes[j].id && item.cmp.bodyEl !== null && item.cmp.bodyEl.dom !== null
                    }).forEach(function (item) {
                        item.cmp.setValue(moduleItem.AccessType)
                    })
                    //App.treeModuleRoleAccess.columns[1].cache
                    //if (item != null) {
                    //    item.cmp.setValue(moduleItem.AccessType);
                    //}
                }
                else
                    rootNode.childNodes[i].childNodes[j].set('checked', false);
            }

        }

        mask.unmask();

    })


    var orgTree = App.TabAccesses.items.items[1].down('treepanel');
    if (orgTree != null) {
        var organizationIDs = event.record.data.OrganizationIDs.split(',')
        orgTree.getRootNode().cascadeBy(function (node) {
            node.set('checked', false);
        });
        if (organizationIDs.length > 0) {

            orgTree.getRootNode().cascadeBy(function (node) {

                if (organizationIDs.indexOf(node.data.id.toString()) > -1) {

                    node.set('checked', true);

                    node.cascadeBy(function (childNode) {
                        childNode.set('checked', true);
                    })
                }
            });
        }
    }
}

var callout;
function saveRoleAccess() {
    var mask = showMask(App.tabRoleManagement, 'درحال ذخیره اطلاعات...', false);
    var moduleItemIDs;
    var RoleModuleItemAccess = []
    var leafIndex = 0;
    var comboBoxAccessType = Ext.Array.filter(App.treeModuleRoleAccess.columns[1].cache, function (item) {
        return Ext.getBody().dom.innerHTML.indexOf(item.cmp.id) > -1
    });

    if (callout)
        callout.destroy();
    if (App.tabRoleManagement_gridRoles.getSelectionModel().hasSelection()) {
        var row = App.tabRoleManagement_gridRoles.getSelectionModel().getSelection()[0];
        var rootNode = App.treeModuleRoleAccess.getRootNode();

        var isValid = true;
        rootNode.cascadeBy(function (node) {

            if (isValid) {

                if (node.data.checked) {

                    var comboAccessType = Ext.Array.filter(comboBoxAccessType, function (item) {
                        return (item.id == node.id)
                    })

                    if (comboAccessType.length == 0)
                        return

                    comboAccessType = comboAccessType[0].cmp
                    if (comboAccessType.value == null) {

                        isValid = false;
                        callout = Ext.Msg.callout(comboAccessType, { alignment: 'left', html: 'نوع دسترسی مشخص نشده است', ui: 'danger', rtl: "true", title: 'هشدار' });
                        callout.setZIndex(9000000);
                        mask.unmask();
                        return false;
                    }

                    RoleModuleItemAccess.push({
                        RoleID: row.data.ID,
                        ModuleItemID: node.data.id,
                        ModuleID: node.parentNode.data.id - 10000,
                        AccessType: parseInt(comboAccessType.value),
                        CompanyID: companyID
                    });

                }
            }
        });

        if (RoleModuleItemAccess.length > 0) {
            if (isValid) {

                var orgTree = App.TabAccesses.items.items[1].down('treepanel');
                var organizationIDs = orgTree != null ? orgTree.getChecked('id', true) : '0';
                var info = { Accesses: RoleModuleItemAccess, OrgIDs: organizationIDs }
                execSPInsert('BoAGXt2XCb/9gVMPOVIWiSy5EeZXPvkSSg60y/LRfls='/*SPS_RoleModuleItemAccessUpdate*/, false, true, null, info, mask, false, function (result) {

                    App.tabRoleManagement_gridRoles.store.loadData(result);
                    Ext.Msg.info({ ui: 'success', title: 'مدیریت نقش ها', html: 'دسترسی به نقش با موفقیت انجام شد', iconCls: '#Accept' });
                })

            }
            else
                mask.unmask();
        }
        else {
            mask.unmask();
            Ext.Msg.info({ ui: 'danger', title: 'مدیریت نقش ها', html: 'هیچ دسترسی برای این نقش انتخاب نشده است', iconCls: '#Exclamation' });

        }
    }
    else {
        mask.unmask();
        Ext.Msg.info({ ui: 'danger', title: 'ویرایش نقش', html: '.هیچ نقشی انتخاب نشده است', iconCls: '#Exclamation' });

    }
}
function selectAccessType() {
    if (callout)
        callout.destroy();
}
var prepare = function (grid, toolbar, rowIndex, record) {
    var h = grid.getView().getRow(rowIndex);
    var firstButton = toolbar.items.get(0);
    var editButton = toolbar.items.get(2);
    if (record.data.UserID == 0) {
        firstButton.setDisabled(true);
        editButton.setDisabled(true);
    }

    //you can return false to cancel toolbar for this record
};
function rowDataBind(records, index, node, eOpts) {
    var d = records
}

//---------------------------------------------------System\UsersSelect.ascx------------------------------------------------------------------------------
var currentSelectUserTagField
function setCurrentSelectUser(userSearchTagField) {
    comboBoxBindStore(userSearchTagField, 'text', 'value');
    userSearchTagField.store.addListener('add', isExistsUser)
    currentSelectUserTagField = userSearchTagField
}
function setKeyUp(tagField, ev) {
    // ev.target.addEventListener = userSearch(tagField, ev.target.value);
    //tagField.events.change = null;
    //tagField.events.errorchange = null;

    if (typeof ev.target.addEventListener != "undefined") {
        ev.target.addEventListener("keyup", function (e) { userSearch(e, this, tagField) }, false);
    } else if (typeof ev.target.attachEvent != "undefined") {
        ev.target.attachEvent("onkeyup", function () { userSearch2(this, tagField) });
    }

    //tagField.events.keypress = null;
    tagField.un('keypress', setKeyUp)

}

function userSearch(queryPlan, eOpts) {

    if (queryPlan.query.length > 2) {

        execSPSelect('E8CNs/CY9KESvwYzeMyUBQ=='/*SPP_UserSearch*/, { CompanyID: companyID, NameCode: queryPlan.query }, null, null, null, function (result) {

            queryPlan.combo.store.loadData(result);
            queryPlan.combo.onTriggerClick()
            queryPlan.combo.expand()
        })

    }
}
function isExistsUser(store, item) {

    var tags = currentSelectUserTagField.tagLabel.tags
    if (tags[tags.length - 1].text == tags[tags.length - 1].value) {

        currentSelectUserTagField.removeTag(tags[tags.length - 1].text)

        Ext.Msg.info({ ui: 'danger', title: 'جستجو', html: '.کاربری با این نام وجود ندارد', iconCls: '#Exclamation' });
    }
}
//-------------------------------------------------------------System\UserAccessManagement.ascx\تخصیص نقش به پرسنل-----------------------------------


//-------------------------------------------------------------System\UserAccessManagement.ascx\نقش های پرسنل-----------------------------------
function getUserRolesAssigment(cmbUserSearch, records, gridRoles) {
    var mask = showMask(App.TabPanelUserRoles_gridRoles, 'بارگذاری نقش های کاربر...', false);
    gridRoles.selModel.deselectAll()
    execSPSelect('XOa1+Vl0p9gB4I66CRjwfNumeSjGe2ZM'/*SPS_GetUserRoles*/, { UserID: cmbUserSearch.value }, mask, {}, null, function (result) {


        if (result.length > 0) {
            var roleIDs = result

            for (var i = 0; gridRoles.store.data.items.length > i; i++) {
                var item = contains(roleIDs, 'RoleID', gridRoles.store.data.items[i].data.ID)
                if (item !== null) {
                    gridRoles.selModel.doMultiSelect(gridRoles.store.data.items[i], true);
                }
            }
        }

        mask.unmask();
    })

}
//---------------------------------------------------------System\Roles.ascx-------------------------------------------------------------------

function setUserRoleAssigment(gridRoles) {
    var items = []
    var updateMode
    var users
    if (currentSelectUserTagField.tagLabel) {
        users = currentSelectUserTagField.tagLabel.tags
        updateMode = "Insert"
    }
    else {
        users = [{ text: currentSelectUserTagField.rawValue, value: currentSelectUserTagField.value }]
        updateMode = "Update"
    }

    if (users.length <= 0) {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'کاربری انتخاب نشده است', iconCls: '#Exclamation' });
        return
    }
    var rolesSelected = gridRoles.getSelection();
    if (rolesSelected.length <= 0) {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ نقشی انتخاب نشده است', iconCls: '#Exclamation' });
        return
    }
    var mask = showMask(gridRoles, 'درحال ذخیره اطلاعات...', false);

    for (var i = 0; i < users.length; i++) {
        if (users[i].value !== users[i].text) {
            for (var j = 0; j < rolesSelected.length; j++) {
                items.push({ UserID: users[i].value, RoleID: rolesSelected[j].data.ID, CompanyID: companyID })
            }
        }
    }
    execSPUpdate('wTEQZbygQPp9q8cfN0UHlbcEEQ7KOUBE'/*SPS_UserRoleAssigment*/, null, items, mask, false, true, false, null)
   
}
//----------------------------------------------------------------Company/OrganizationStructure.ascx/تعریف سطح سازمانی واحدها----------------------------------------------
function getOrganizationLevel(grid) {
    grid = (grid != undefined && grid != null) ? grid : App.TabPanelOrgLevel_gridOrgLevel
    var mask = showMask(grid, 'درحال بارگذاری...', false);

    execSPSelect('H6IJCP8wn13B6PsudDHD3/db75dXx4gho5gQZVx9WC8='/*SPC_GetOrganizationLevel*/, { CompanyID: companyID }, mask, grid, null, null)

}
var organizationLevelIcon = function (value, metaData) {
    //var src = 'data:image/jpeg;base64,' + metaData.record.data['Icon'] == null ? '' : btoa(metaData.record.data['Icon'])
    var src = 'data:image/jpeg;base64,' + metaData.record.data['Icon']
    return '<img  src="' + src + '"/>';
};
function editOrganisationLevel(editMode, record, grid) {

    var id = record !== null ? record.data.ID : 0
    if (editMode == "Delete") {

        confirmMsg(' حذف ' + record.data.Title, 'ایا مطمئن هستید ؟', function (btn) {
            if (btn == 'yes') {
                var mask = showMask(grid, 'در حال حذف...', false);
                execSPDelete('e1Tc7qcDX1fNaHueQ9qqg/SgOcmG8R9v1V69YlMo8dE='/*SPC_OrganizationLevelUpdate*/, { CompanyID: companyID, ID: id }, mask, function (success) {
                    if (success)
                        removeRecordGrid(grid, record)
                    //getOrganizationLevel(null);
                })

            }

        });
    }
    else {
        var win = new OrganizationLevelModalWindow(grid, editMode, record);
        //App.OrganizationStructureWindow.items.add(win.window);
        win.show();
    }


}
//----------------------------------------------------------------Dynamic Grid---------------------------------------------------------------
function bindDynamicGrid(renderTo, data) {
    var grid = Ext.create('Ext.ux.grid.DynamicGrid', {
        dataJson: Ext.JSON.decode(data)
    });
    grid.store.proxy.reader.readRecords(Ext.JSON.decode(data))
    grid.store.loadData(Ext.JSON.decode(data))
    renderTo.items.add(grid)

}
//--------------------------------------------------------------Company/OrganizationStructure.ascx/مدیریت واحدهای سازمانی-------------------------------------------
var editModeOrgUnit = "Edit"
function addNewOrgUnit(tree) {
    var orgTree = tree;//App.TabOrgStrucManagment_treeOrganisation
    if (orgTree.selModel.getSelected().length > 0) {
        var selectUnit = orgTree.selModel.getSelected().items[0].data;
        App.TabOrgStrucManagment_OrgUnitInfo.getForm().reset();
        App.TabOrgStrucManagment_OrgUnitInfo.getComponent('TabOrgStrucManagment_txtTopOfUnit').setValue(selectUnit.text);
        App.TabOrgStrucManagment_OrgUnitInfo.getComponent('TabOrgStrucManagment_txtTopOfUnit').tag = selectUnit.id;
        App.TabOrgStrucManagment_OrgUnitInfo.getComponent('TabOrgStrucManagment_txtUnitName').tag = undefined;
        editModeOrgUnit = "Add";
    }
    else {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ واحدی انتخاب نشده است', iconCls: '#Exclamation' });
    }
}
function deleteOrganisationUnit(tree) {

    var orgTree = tree;//App.TabOrgStrucManagment_treeOrganisation
    var selectUnit = orgTree.selModel.getSelected().items[0].data;
    if (orgTree.selModel.getSelected().length == 0) {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ واحدی انتخاب نشده است', iconCls: '#Exclamation' });
        return
    }
    //if (selectUnit.leaf == false) {
    //    Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'واحد انتخابي داراي زيرمجموعه است! قابل حذف نيست', iconCls: '#Exclamation' });
    //    return
    //}

    var titleMsg = ' حذف واحد <b> ' + selectUnit.text + ' </b> ';
    confirmMsg(titleMsg, 'ایا مطمئن هستید ؟', function (btn) {
        if (btn == 'yes') {

            var mask = showMask(orgTree, 'درحال حذف واحد...', false);
            execSPDelete('e1Tc7qcDX1fNaHueQ9qqgwtlS9pc1sK5'/*SPC_OrganizationUpdate*/, { CompanyID: companyID, ID: selectUnit.id, OrgVersionID: tree.down('combo').value }, mask, function () {

                getOrganisationTree(orgTree);
            }, null)


        }

    });
}
var copyOrgUnitSourceID = null;
function copyOrganizationUnit(tree) {
    cutOrgUnitSourceID = null;
    var orgTree = tree;//App.TabOrgStrucManagment_treeOrganisation
    if (orgTree.selModel.getSelected().length > 0) {
        var selectUnit = orgTree.selModel.getSelected().items[0].data;
        copyOrgUnitSourceID = selectUnit.id
    }
    else {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ واحدی انتخاب نشده است', iconCls: '#Exclamation' });
    }
}
var cutOrgUnitSourceID = null;
function cutOrganizationUnit(tree) {
    copyOrgUnitSourceID = null;
    var orgTree = tree//App.TabOrgStrucManagment_treeOrganisation
    if (orgTree.selModel.getSelected().length > 0) {
        var selectUnit = orgTree.selModel.getSelected().items[0].data;
        cutOrgUnitSourceID = selectUnit.id
    }
    else {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ واحدی انتخاب نشده است', iconCls: '#Exclamation' });
    }
}
function confirmCutOrgUnitDragDrop(node, nodeSource, nodeTarget, dropPosition, dropHandlers) {
    // Defer the handling
    var sourceUnitData = nodeSource.records[0].data,
        targetUnitData = nodeTarget.data

    dropHandlers.wait = true;
    var titleMsg = ' انتقال واحد <b> ' + sourceUnitData.text + ' </b> به واحد <b> ' + targetUnitData.text + '</b>';
    confirmMsg(titleMsg, 'ایا مطمئن هستید ؟', function (btn) {
        if (btn == 'yes') {
            dropHandlers.processDrop();
            if (targetUnitData.id !== sourceUnitData.id && targetUnitData.parentId !== sourceUnitData.id) {
                var mask = showMask(nodeSource.view.panel, 'درحال بارگذاری...', false);
                var obj = { CompanyID: companyID, ID: sourceUnitData.id, ParentID: targetUnitData.id, OrgVersionID: nodeSource.view.up().down('combo').value, PasteType: 'Cut' }
                execSPUpdate('e1Tc7qcDX1fNaHueQ9qqgwtlS9pc1sK5'/*SPC_OrganizationUpdate*/, null, obj, mask, false, true, false, function () {

                    getOrganisationTree(nodeSource.view.panel);
                })

              
            }
            else {

                Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'مبدا و مقصد نمیتواند یکی باشد', iconCls: '#Exclamation' });
            }
        }
        else {
            dropHandlers.cancelDrop();
        }
    });

}
function showTreeOrgUnitContextMenu(view, record, item, index, event) {
    var menu = Ext.create("Ext.menu.Menu", { id: "treeOrgUnitContextMenu", items: [{ handler: function () { addNewOrgUnit(view.panel) }, iconCls: "#ChartOrganisationAdd", text: "واحد جدید" }, { xtype: "menuseparator" }, { handler: function () { deleteOrganisationUnit(view.panel) }, iconCls: "#ChartOrganisationDelete", text: "حذف واحد" }, { xtype: "menuseparator" }, { handler: function () { cutOrganizationUnit(view.panel) }, iconCls: "#CutRed", text: "برش" }, { xtype: "menuseparator" }, { handler: function () { copyOrganizationUnit(view.panel) }, iconCls: "#PageCopy", text: "کپی" }, { xtype: "menuseparator" }, { handler: function () { pasteOrganizationUnit(view.panel) }, iconCls: "#PastePlain", text: "چسباندن" }, { xtype: "menuseparator" }] });
    menu.showAt(event.getXY());

    event.stopEvent();
}
function pasteOrganizationUnit(tree) {
    var orgTree = tree;// App.TabOrgStrucManagment_treeOrganisation

    if (orgTree.selModel.getSelected().length > 0) {
        var selectUnit = orgTree.selModel.getSelected().items[0].data;
        if (copyOrgUnitSourceID !== null) {

            var mask = showMask(orgTree, 'درحال کپی واحد...', false);
            if (selectUnit.id !== copyOrgUnitSourceID/* && selectUnit.parentId !== cutOrgUnitSourceID*/) {

                var obj = { CompanyID: companyID, ID: copyOrgUnitSourceID, ParentID: selectUnit.id, OrgVersionID: App.TabOrgStrucManagment_ddlOrgVersioning.value, PasteType: 'Copy' }
                execSPUpdate('e1Tc7qcDX1fNaHueQ9qqgwtlS9pc1sK5'/*SPC_OrganizationUpdate*/, null, obj, mask, false, true, false, function () {

                    getOrganisationTree(orgTree);
                })

                
            }
            else {
                mask.unmask();
                Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'مبدا و مقصد نمیتواند یکی باشد', iconCls: '#Exclamation' });
            }
        }
        else if (cutOrgUnitSourceID !== null) {

            var mask = showMask(orgTree, 'درحال برش واحد...', false);
            if (selectUnit.id !== cutOrgUnitSourceID/* && selectUnit.parentId !== cutOrgUnitSourceID*/) {

                var obj = { CompanyID: companyID, ID: cutOrgUnitSourceID, ParentID: selectUnit.id, OrgVersionID: App.TabOrgStrucManagment_ddlOrgVersioning.value, PasteType: 'Cut' }
                execSPUpdate('e1Tc7qcDX1fNaHueQ9qqgwtlS9pc1sK5'/*SPC_OrganizationUpdate*/, null, obj, mask, false, true, false, function () {

                    getOrganisationTree(orgTree);
                })
               
            }
            else {
                mask.unmask();
                Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'مبدا و مقصد نمیتواند یکی باشد', iconCls: '#Exclamation' });
            }

        }
        else {
            mask.unmask();
            Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ واحدی برای چسباندن انتخاب نشده است', iconCls: '#Exclamation' });
        }

    }
    else {
        mask.unmask();
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ واحدی انتخاب نشده است', iconCls: '#Exclamation' });
    }
    copyOrgUnitSourceID = null;
    cutOrgUnitSourceID = null;
}
function getOrganisationTree(tree, orgVersionID, isSelectable) {

    //var mask = showMask(tree, 'در حال بارگذاری ساختار...', false);
    orgVersionID = orgVersionID == undefined ? tree.down('combobox').value : orgVersionID
    tree.store.clearData();

    execSPSelect('H6IJCP8wn13B6PsudDHD30jXBgBFSGWM'/*SPC_GetOrganizationTree*/, { CompanyID: companyID, VersionID: orgVersionID, OrgAccess: orgAccess }, tree, null, null, function (items) {

        var orgUnits = items
        var rootUnit = null
        Ext.Array.forEach(orgUnits[0], function (parent) {
            var children = Ext.Array.filter(orgUnits[0], function (item) {
                if (item.ParentID == parent.ID)
                    return true;
            });
            if (children.length == 0)
                parent.Children = null;
            else
                parent.Children = children;

            if (parent.ParentID == null)
                rootUnit = parent;

        })
        var rootNode = tree.getRootNode();

        if (rootUnit !== null) {
            organisationTreeBinder(rootNode, rootUnit/*orgUnits[0][0]*/, orgUnits[1], isSelectable)
        }
        else {

            var children = [];
            Ext.Array.forEach(orgUnits[0], function (child) {
                var parent = Ext.Array.filter(orgUnits[0], function (item) {
                    if (child.ParentID == item.ID)
                        return true;
                });

                if (parent.length == 0) {
                    child.ParentID = 0;
                    children.push(child);
                }
            });

            rootUnit = { ID: 0, Name: '', Icon: '', ParentID: null, Children: children, OrgLevelID: 0 }
            orgUnits[0].push(rootUnit);
            organisationTreeBinder(rootNode, rootUnit/*orgUnits[0][0]*/, orgUnits[1], isSelectable)
        }


        if (tree.up('window'))
            tree.up('window').setSize(tree.up('window').width, tree.up('window').height + 1)
    })
   
}
var orgUnitDragOver = function (targetNode, position, dragData) {
    var sourceData = dragData.records[0].data,
        targetData = targetNode.data

    if (selectUnit.id !== cutOrgUnitSourceID && selectUnit.parentId !== cutOrgUnitSourceID) {
        return isFirst ? canDropFirst : canDropSecond;
    };
}

function appendChildRecusive(nodeTarget, orgUnits) {


    for (var i = 0; i < orgUnits.length; i++) {

        if (orgUnits[i].ParentID == null) {
            nodeTarget.setId(orgUnits[i].ID);
            nodeTarget.set('text', orgUnits[i].Name);
            nodeTarget.set('expanded', true);
            //nodeTarget.setIconCls('icon-application');
        }
        else {
            var newNode;

            if (orgUnits[i].Children != null) {
                newNode = nodeTarget.createNode({ id: orgUnits[i].ID, text: orgUnits[i].Name, iconCls: 'icon-application', expanded: true });
                appendChildRecusive(newNode, orgUnits[i].Children);
            }
            else {
                newNode = nodeTarget.createNode({ id: orgUnits[i].ID, text: orgUnits[i].Name, iconCls: 'icon-application', leaf: true, expanded: true });
                nodeTarget.appendChild(newNode);
            }
        }
    }
}
function organisationTreeBinder(parent, Rels, icons, isSelectable) {

    Ext.Array.forEach(icons, function (item) {
        if (item.ID == Rels.OrgLevelID) {
            Rels.Icon = item.Icon;
            return;
        }
    });
    if (Rels.Children != null) {

        var childNodeModel = {
            id: Rels.ID,
            text: Rels.Name,
            icon: 'data:image/jpeg;base64,' + Rels.Icon,
            expanded: Rels.ParentID == null ? true : false,
            parentId: Rels.ParentID,
            checked: isSelectable
        };

        var childNode = parent.appendChild(childNodeModel);

        for (var i = 0; i < Rels.Children.length; i++) {
            organisationTreeBinder(childNode, Rels.Children[i], icons, isSelectable);
        }
    }
    else {
        var childNodeModel = {
            id: Rels.ID,
            text: Rels.Name,
            icon: 'data:image/jpeg;base64,' + Rels.Icon,
            leaf: true,
            parentId: Rels.ParentID,
            checked: isSelectable
        };
        parent.appendChild(childNodeModel);

    }
}

function saveOrganizationUnit(form) {

    if (form.isValid()) {
        //var unitInfo = App.TabOrgStrucManagment_OrgUnitInfo.getForm()


        //var mask = showMask(form, 'در حال ذخیره اطلاعات...', false);
        var fieldsValues = form.getValues();
        var orgID = form.getComponent('TabOrgStrucManagment_txtUnitName').tag == undefined ? 0 : form.getComponent('TabOrgStrucManagment_txtUnitName').tag

        var obj = {
            ID: orgID,
            CompanyID: companyID,
            OrgVersionID: App.TabOrgStrucManagment_ddlOrgVersioning.value,
            Name: fieldsValues.TabOrgStrucManagment_txtUnitName,
            Code: fieldsValues.TabOrgStrucManagment_txtCode,
            Desc: fieldsValues.TabOrgStrucManagment_txtDesc,
            ParentID: parseInt(form.getComponent('TabOrgStrucManagment_txtTopOfUnit').tag),
            ActiveState: fieldsValues.TabOrgStrucManagment_cmbStatus == "1" ? true : false,
            OrgLevelID: fieldsValues.TabOrgStrucManagment_cmbOrgUnit,
            UnitPropDate: fieldsValues.TabOrgStrucManagment_txtUnitPropDate,
            CityID: form.getComponent('TabOrgStrucManagment_txtLocationCity').tag,
            CityName: fieldsValues.TabOrgStrucManagment_txtLocationCity,
            CreateDate: fieldsValues.TabOrgStrucManagment_txtCreateDate,
            Degree: parseInt(fieldsValues.TabOrgStrucManagment_cmbDegree),
            HistoryDesc: fieldsValues.TabOrgStrucManagment_txtHistoryDesc
        }
        if (editModeOrgUnit == 'Add') {
            //execSPInsert(spName, isID, isResult, fillControl, extraData, mask, isTitle, afterInsertFn, msgConfig)
            execSPInsert('e1Tc7qcDX1fNaHueQ9qqgwtlS9pc1sK5'/*SPC_OrganizationUpdate*/, true, false, null, obj, form, false, function (result) {

                getOrganisationTree(App.TabOrgStrucManagment_treeOrganisation, TabOrgStrucManagment_ddlOrgVersioning.value);
                mask.unmask();
                form.getComponent('TabOrgStrucManagment_txtUnitName').tag = result
            })
            editModeOrgUnit = 'Edit'
        }
        else if(editModeOrgUnit == 'Edit' && orgID > 0) {

          
            execSPUpdate('e1Tc7qcDX1fNaHueQ9qqgwtlS9pc1sK5'/*SPC_OrganizationUpdate*/, null, obj, form, false, true, false, function () {

                getOrganisationTree(App.TabOrgStrucManagment_treeOrganisation, TabOrgStrucManagment_ddlOrgVersioning.value);
                
            })
        }
        
    }
}
function getOrganizationUnit(tree, record, item, index, e, eOpts) {
    editModeOrgUnit = "Edit"
    var nodeData = record.data;
    var formOrgUnitInfo = App.TabOrgStrucManagment_OrgUnitInfo
    //var mask = showMask(formOrgUnitInfo, 'درحال بارگذاری...', false);

    var obj = { CompanyID: companyID, OrgVersionID: App.TabOrgStrucManagment_ddlOrgVersioning.value, ID: record.data.id }
    execSPSelect('H6IJCP8wn13B6PsudDHD3yPr+YUGqJhI'/*SPC_GetOrganizationUnit*/, obj, formOrgUnitInfo, null, null, function (items) {

        var orgUnitInfo = items[0];

        formOrgUnitInfo.getComponent('TabOrgStrucManagment_txtTopOfUnit').setValue(record.parentNode.data.text == 'Root' ? record.data.text : record.parentNode.data.text);
        formOrgUnitInfo.getComponent('TabOrgStrucManagment_txtTopOfUnit').tag = record.parentNode.data.text == 'Root' ? undefined : record.parentNode.data.id

        formOrgUnitInfo.getComponent('TabOrgStrucManagment_txtUnitName').tag = orgUnitInfo.ID
        formOrgUnitInfo.getComponent('TabOrgStrucManagment_txtUnitName').setValue(orgUnitInfo.Name);

        formOrgUnitInfo.getComponent('TabOrgStrucManagment_txtCode').setValue(orgUnitInfo.Code);
        formOrgUnitInfo.getComponent('TabOrgStrucManagment_cmbDegree').setValue(orgUnitInfo.Degree);
        formOrgUnitInfo.getComponent('TabOrgStrucManagment_cmbOrgUnit').setValue(orgUnitInfo.OrgLevelID);
        formOrgUnitInfo.getComponent('TabOrgStrucManagment_txtUnitPropDate').setValue(orgUnitInfo.UnitPropDate);
        formOrgUnitInfo.getComponent('TabOrgStrucManagment_txtCreateDate').setValue(orgUnitInfo.CreateDate);

        formOrgUnitInfo.getComponent('TabOrgStrucManagment_txtLocationCity').setValue(orgUnitInfo.CityName);
        formOrgUnitInfo.getComponent('TabOrgStrucManagment_txtLocationCity').tag = orgUnitInfo.CityID;

        formOrgUnitInfo.getComponent('TabOrgStrucManagment_cmbStatus').setValue(orgUnitInfo.Status == true ? 1 : 2);
        formOrgUnitInfo.getComponent('TabOrgStrucManagment_txtDesc').setValue(orgUnitInfo.Desc);
        formOrgUnitInfo.getComponent('TabOrgStrucManagment_txtHistoryDesc').setValue(orgUnitInfo.HistoryDesc);

    })
}

function selectOrgVersion(comboBox, treeMode) {


    comboBoxBindStore(comboBox, 'Title', 'ID')
    execSPSelect('H6IJCP8wn13zi/Udz91g9nCQEJCSdIcv'/*SPC_GetOrgVersionsTitle*/, { CompanyID: companyID }, null, {}, null, function (result) {

        comboBox.store.clearData();
        comboBox.store.loadData(result);
        if (comboBox.value == null)
            comboBox.setValue(comboBox.store.getAt(0).get(comboBox.valueField));
        if (treeMode == 'Org')
            getOrganisationTree(comboBox.up('treepanel'), comboBox.value)
        else if (treeMode == 'Post')
            getOrganisationPostTree(comboBox.up('treepanel'), comboBox.value);


    })

}
//------------------------------------------------------------Province/City/شهرها و استان ها------------------------------------------------------

function getCities(grid) {

    var mask
    if (grid != undefined && grid != null)
        mask = showMask(grid.up().up(), 'درحال بارگذاری...', false);
    execSPSelect('Cp5+AmaKOy10LqIVF04FOQ=='/*SPS_GetCities*/, { CompanyID: companyID }, null, {}, null, function (result) {

        if (grid != undefined && grid != null)
            grid.store.loadData(result)
        else
            return result;

        mask.unmask();
    })

}
function getProvinces(grid) {

    var mask
    if (grid != undefined && grid != null)
        mask = showMask(grid, 'درحال بارگذاری...', false);

    execSPSelect('xJEkrMWwoiKjEnw8cGg4HfPIK3ngeFdw'/*SPS_GetProvinces*/, { CompanyID: companyID }, null, {}, null, function (result) {

        if (grid != undefined && grid != null) {
            grid.store.loadData(result)
            mask.unmask();
        }
        else
            return result;
    })
}
function openCitiesModalWindow(parent, textField) {
    var citiesModalWindow = new CitiesModalWindow(parent, textField);
    citiesModalWindow.show();
}
function selectCity(record) {

    var gridCities = winProvinceCity.getForm().getComponent('TabCities_gridCities')
}

//----------------------------------------------------------------------تجزیه و تحلیل مشاغل-------------------------------------------------------------------

//--Company/BusinessAnalysis.ascx/تعریف رسته و رشته شغلی
var fieldEditMode = "Add";
function getFieldsTreeBinder(tree) {
    //var mask = showMask(tree, 'بارگذاری اطلاعات...', false);
    tree.store.clearData();

    execSPSelect('3wxQnJ0bAeG6o33401CSO0gAe5/tFzdP'/*SPC_GetFieldsCompany*/, { CompanyID: companyID }, tree, null, null, function (items) {

        var fields = items
        Ext.Array.forEach(fields, function (parent) {
            var children = Ext.Array.filter(fields, function (item) {
                if (item.ParentID == parent.ID)
                    return true;
            });
            if (children.length == 0)
                parent.Children = null;
            else
                parent.Children = children;

        })
        tree.setRootNode({ expanded: true, text: 'رسته ها / رشته ها', iconCls: '#BookOpen' })
        var rootNode = tree.getRootNode();


        Ext.Array.forEach(fields, function (item) {
            if (item.ParentID == undefined)
                fieldsTreeBinder(rootNode, item);
        });
    })
   
}
function fieldsTreeBinder(parent, Rels) {

    if (Rels.Children != null) {

        var childNodeModel = {
            id: Rels.ID,
            text: Rels.Title,
            //expanded: Rels.ParentID == null ? true : false,
            type: Rels.Type,
            code: Rels.Code,
            parentId: Rels.ParentID,
            iconCls: '#BookKey'
        };

        var childNode = parent.appendChild(childNodeModel);

        for (var i = 0; i < Rels.Children.length; i++) {
            fieldsTreeBinder(childNode, Rels.Children[i]);
        }
    }
    else {
        var childNodeModel = {
            id: Rels.ID,
            text: Rels.Title,
            type: Rels.Type,
            code: Rels.Code,
            leaf: true,
            parentId: Rels.ParentID,
            iconCls: '#BookLink'
        };
        parent.appendChild(childNodeModel);

    }
}
function getFieldInfo(tree) {

    fieldEditMode = "Edit";
    //var fieldTree = App.TabBusinessAnalysis_treeFields
    var selectUnit = tree.selModel.getSelected().items[0].data;
    if (selectUnit.type == 1/*رسته*/) {
        App.TabBusinessAnalysis_Fields.getComponent('TabBusinessAnalysis_txtFieldType').setValue('رسته');
        App.TabBusinessAnalysis_Fields.getComponent('TabBusinessAnalysis_txtFieldType').tag = 1;
    }
    else {
        App.TabBusinessAnalysis_Fields.getComponent('TabBusinessAnalysis_txtFieldType').setValue('رشته');
        App.TabBusinessAnalysis_Fields.getComponent('TabBusinessAnalysis_txtFieldType').tag = 2;
    }
    App.TabBusinessAnalysis_Fields.getComponent('TabBusinessAnalysis_txtFieldTitle').setValue(selectUnit.text);
    App.TabBusinessAnalysis_Fields.getComponent('TabBusinessAnalysis_txtFieldTitle').tag = selectUnit.id;
    App.TabBusinessAnalysis_txtFieldCode.setValue(selectUnit.code);
}

function addNewCategory() {
    App.TabBusinessAnalysis_Fields.getForm().reset();
    App.TabBusinessAnalysis_Fields.getComponent('TabBusinessAnalysis_txtFieldType').setValue('رسته');
    App.TabBusinessAnalysis_Fields.getComponent('TabBusinessAnalysis_txtFieldType').tag = 1;
    fieldEditMode = "Add";
}

function addNewField() {
    fieldEditMode = "Add";
    var fieldTree = App.TabBusinessAnalysis_treeFields
    var selectUnit = fieldTree.selModel.getSelected().items[0].data;
    if (fieldTree.selModel.getSelected().length > 0 && selectUnit.root == false && fieldTree.selModel.getSelected().items[0].data.type == 1) {

        App.TabBusinessAnalysis_Fields.getForm().reset();
        App.TabBusinessAnalysis_Fields.getComponent('TabBusinessAnalysis_txtFieldType').setValue('رشته');
        App.TabBusinessAnalysis_Fields.getComponent('TabBusinessAnalysis_txtFieldType').tag = 2;
    }
    else {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ رسته ای انتخاب نشده است', iconCls: '#Exclamation' });
    }
}

function saveBusinessAnalysisField(form) {


    if (form.isValid()) {
        //var mask = showMask(form, 'درحال ذخیره...', false);
        var selectTreeItem = App.TabBusinessAnalysis_treeFields.selModel.getSelected().length > 0 ? App.TabBusinessAnalysis_treeFields.selModel.getSelected().items[0].data : App.TabBusinessAnalysis_treeFields.getRootNode().data;
        var fieldInfo = {
            ID: fieldEditMode == "Add" ? undefined : App.TabBusinessAnalysis_Fields.getComponent('TabBusinessAnalysis_txtFieldTitle').tag,
            Title: App.TabBusinessAnalysis_Fields.getComponent('TabBusinessAnalysis_txtFieldTitle').value,
            Code: App.TabBusinessAnalysis_Fields.getComponent('TabBusinessAnalysis_txtFieldCode').value,
            Type: App.TabBusinessAnalysis_txtFieldType.tag == undefined ? 1 : App.TabBusinessAnalysis_txtFieldType.tag,
            ParentID: selectTreeItem.type == 2 ? selectTreeItem.id : null,
            CompanyID: companyID
        }
        if (fieldEditMode == "Add") {
            execSPInsert('AANq0U7e20u3lkJhpHzZKg=='/*SPC_FieldUpdate*/, false, false, null, fieldInfo, form, false, function (result) {
                getFieldsTreeBinder(App.TabBusinessAnalysis_treeFields);
            })
        }
        else {
            execSPUpdate('AANq0U7e20u3lkJhpHzZKg=='/*SPC_FieldUpdate*/, null, fieldInfo, form, false, true, false, function (result) {
                getFieldsTreeBinder(App.TabBusinessAnalysis_treeFields);
            })
        }
    };

}
function deleteFieldCategory() {

    var orgTree = App.TabBusinessAnalysis_treeFields
    var selectUnit = orgTree.selModel.getSelected().items[0].data;
    if (orgTree.selModel.getSelected().length == 0) {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ آیتمی انتخاب نشده است', iconCls: '#Exclamation' });
        return
    }
    if (selectUnit.leaf == false) {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'رسته انتخابي داراي زيرمجموعه است! قابل حذف نيست', iconCls: '#Exclamation' });
        return
    }


    confirmMsg('حذف', 'ایا مطمئن هستید ؟', function (btn) {
        if (btn == 'yes') {
            //var mask = showMask(orgTree, 'درحال حذف ...', false);
            execSPDelete('hRdt1ZolD5a6uwycAS6osZR2w/umXP4T'/*SPC_GetCategoryCompany*/, { ID: selectUnit.id, CompanyID: companyID }, orgTree, function () {
                getFieldsTreeBinder(App.TabBusinessAnalysis_treeFields);
            }, null)
            
        }

    });
}
function comboBoxCategoryBinder(comboBox) {

    comboBoxBindStore(comboBox, 'Title', 'ID');

    execSPSelect('3wxQnJ0bAeG6o33401CSO0gAe5/tFzdP'/*SPC_GetFieldsCompany*/, { CompanyID: companyID }, null, comboBox, null, null)
    
}
function comboBoxFieldBinder(comboBoxField, comboBoxCategory) {

    var categoryID = comboBoxCategory == null || comboBoxCategory == undefined ? 0 : comboBoxCategory.value;
    comboBoxBindStore(comboBoxField, 'Title', 'ID');
    comboBoxField.setEmptyText('در حال باگذاری...');
    execSPSelect('hRdt1ZolD5ay2xWAsMdzXcJQzINnFOHV'/*SPC_GetCategoryFields*/, { CompanyID: companyID, CategoryID: categoryID }, null, comboBoxField, null, function (data) {
        comboBoxField.setValue(comboBoxField.findRecord('ID', data[0].ID))
    })


}

//----Company/BusinessAnalysis.ascx/مديريت مشاغل سازمانی

function getJobs(grid) {
    var mask
    grid = grid != undefined && grid != null ? grid : App.TabPanelBusinessAnalysis_gridJobs

    //mask = showMask(grid, 'درحال بارگذاری...', false);
    execSPSelect('ZaaIFkWsTHl5gh+MbWva/w=='/*SPC_GetJobsInfo*/, { CompanyID: companyID }, grid, grid, null, null)

}
function editJob(editMode, record, parent) {

    var id = record !== null ? record.data.ID : 0
    if (editMode == "Delete") {

        confirmMsg(' حذف ' + record.data.Title, 'ایا مطمئن هستید ؟', function (btn) {
            if (btn == 'yes') {
                //var mask = showMask(App.TabBusinessAnalysisJobs, 'در حال حذف...', false);

                execSPDelete('NKgYLpP54xv2Hg08Jgqacw=='/*SPC_JobUpdate*/, { CompanyID: companyID, ID: id }, App.TabBusinessAnalysisJobs, function () {
                    //mask.unmask();
                    getJobs(App.TabPanelBusinessAnalysis_gridJobs);
                })

            }

        });
    }
    else if (editMode == "Edit") {

        var win = new JobsModalWindow(parent, editMode, id)
        win.show();
    }

}
function saveEditJob(editMode, jobWin, jobID) {


    var jobForm = jobWin.form;
    var param = {
        ID: jobID,
        CompanyID: companyID,
        Title: jobForm.getComponent('Jobs_txtJobTitle').value,
        Code: jobForm.getComponent('Jobs_txtJobCode').value,
        LevelID: jobForm.getComponent('Jobs_cmbJobLevel').value,
        CategoryID: jobForm.getComponent('Jobs_cmbJobCategory').value,
        FieldID: jobForm.getComponent('Jobs_cmbJobField').value,
        Desc: jobForm.getComponent('Jobs_txtJobDesc').value,
    }
    if (editMode == "Add" && jobForm.getForm().isValid()) {

        //var mask = showMask(jobForm, 'در حال ذخیره...', false);
        execSPInsert('NKgYLpP54xv2Hg08Jgqacw=='/*SPC_JobUpdate*/, false, true, null, param, jobForm, false, function (result) {
            jobWin.jobID = result[0].ID
            mask.unmask();
            Ext.Msg.info({ ui: 'success', title: 'ذخیره شغل', html: 'اطلاعات با موفقیت ذخیره شد', iconCls: '#Accept' });
        })

    }
    else
        if (editMode == "Edit" && jobForm.getForm().isValid()) {

            //var mask = showMask(jobForm, 'در حال ویرایش...', false);
            execSPUpdate('NKgYLpP54xv2Hg08Jgqacw=='/*SPC_JobUpdate*/, null, param, jobForm, false, true, true, function () {
                mask.unmask();
                Ext.Msg.info({ ui: 'success', title: 'ویرایش شغل', html: 'اطلاعات با موفقیت ویرایش شد', iconCls: '#Accept' });
            })

        }
}
function showJobWindow(parent, editMode) {

    var win = new JobsModalWindow(parent, editMode)
    win.show();
}
function showJobItemsWindow(parent, editMode, jobID, jobTitle, jobItemsGrid, jobItemID) {

    var win = new JobItemsModalWindow(parent, editMode)
    win.jobID = jobID;
    win.jobItemID = jobItemID;
    win.jobTitle = jobTitle;
    win.jobItemsGrid = jobItemsGrid

    win.show();
}

function saveEditJobItem(editMode, jobItemForm, jobItemID, jobID) {

    var param = {
        ID: jobItemID,
        CompanyID: companyID,
        JobID: jobID,
        Title: jobItemForm.getComponent('JobsItem_txtJobItemTitle').value,
        Code: jobItemForm.getComponent('JobsItem_txtJobItemCode').value,
        JobLevelID: jobItemForm.getComponent('JobsItem_cmbJobItemLevel').value,
        JobCategoryID: jobItemForm.getComponent('JobsItem_cmbJobItemCategory').value,
        JobGroupID: jobItemForm.getComponent('JobsItem_cmbJobItemGroup').value,
        EducationGradeID: jobItemForm.getComponent('JobsItem_cmbMinEducation').value,
        MinExperience: jobItemForm.getComponent('JobsItem_txtMinExperience').value,
        MinTrainingHours: jobItemForm.getComponent('JobsItem_txtMinTrainingHours').value,
        QualifyingConditions: jobItemForm.getComponent('JobsItem_txtQualifyingConditions').value
    }

    if (editMode == "Add" && jobItemForm.getForm().isValid()) {

        //var mask = showMask(jobItemForm, 'در حال ذخیره...', false);
        execSPInsert('o+h+s6QIN9i/R/h4x9FuWQizvx4XNNWl'/*SPC_JobItemUpdate*/, false, false, null, param, jobItemForm, false, function () {

            jobItemForm.reset();
            Ext.Msg.info({ ui: 'success', title: 'ذخیره طبقه شغل', html: 'اطلاعات با موفقیت ذخیره شد', iconCls: '#Accept' });
        })

    }
    else if (editMode == "Edit" && jobItemForm.getForm().isValid()) {

        //var mask = showMask(jobItemForm, 'در حال ویرایش...', false);
        execSPUpdate('o+h+s6QIN9i/R/h4x9FuWQizvx4XNNWl'/*SPC_JobItemUpdate*/, null, param, jobItemForm, false, true, false, function () {
            mask.unmask();
            Ext.Msg.info({ ui: 'success', title: 'ویرایش طبقه شغل', html: 'اطلاعات با موفقیت ذخیره شد', iconCls: '#Accept' });
        })

    }
}
function getJobItems(grid, jobID) {


    //grid = grid != undefined && grid != null ? grid : App.TabPanelBusinessAnalysis_gridJobs

    //var mask = showMask(grid, 'درحال بارگذاری...', false);
    execSPSelect('ZaaIFkWsTHnj7PTTAe7hcA=='/*SPC_GetJobItems*/, { CompanyID: companyID, JobID: jobID }, grid, grid, null, null)

}

function editJobItem(editMode, record, parent, gridJobItem, jobID) {

    var id = record !== null ? record.data.ID : 0
    if (editMode == "Delete") {

        confirmMsg(' حذف ' + record.data.Title, 'ایا مطمئن هستید ؟', function (btn) {
            if (btn == 'yes') {
                //var mask = showMask(gridJobItem, 'در حال حذف...', false);
                execSPDelete('o+h+s6QIN9i/R/h4x9FuWQizvx4XNNWl'/*SPC_JobItemUpdate*/, { CompanyID: companyID, ID: id }, gridJobItem, function () {
                    //mask.unmask();
                    getJobItems(gridJobItem, jobID);
                })

            }

        });
    }
    else if (editMode == "Edit") {
        //(parent, editMode, jobID, jobTitle, jobItemsGrid)
        showJobItemsWindow(parent, editMode, jobID, '', gridJobItem, id)

    }

}

function comboBoxJobsBinder(comboBox) {

    comboBoxBindStore(comboBox, 'Title', 'ID');
    comboBox.minChars = 0;
    execSPSelect('ZaaIFkWsTHl3DdN+f4ArVbuoQ4V9McZA'/*SPC_GetJobsTitle*/, { CompanyID: companyID }, null, comboBox, null, null)

}
//----Company/BusinessAnalysis.ascx/مديريت عناوين پست ها

function getPostTitles(grid) {
    var mask
    grid = grid != undefined && grid != null ? grid : App.TabPanelBusinessAnalysis_gridPostTitle
    var result
    //mask = showMask(grid, 'درحال بارگذاری...', false);
    execSPSelect('AGEy4yfoMC5/mPV1SLNLAvIOG916hmRL'/*SPC_GetPostTitlesInfo*/, { CompanyID: companyID }, grid, grid, null, function (items) {
        result = items
    })
    return result
}
function showPostTitleWindow(parent, editMode, postTitleID) {

    var win = new PostTitleModalWindow(parent, editMode)
    win.postTitleID = postTitleID;
    win.show();
}

function saveEditPostTitle(editMode, form, postTitleID) {

    var param = {
        ID: postTitleID,
        CompanyID: companyID,
        Title: form.getComponent('PostTitle_txtPostTitle').value,
        Code: form.getComponent('PostTitle_txtJobItemCode').value,
        ActivityType: form.getComponent('PostTitle_cmbActivityType').value,
        JobID: form.getComponent('PostTitle_cmbJobs').value,
        PostOrgLevelID: form.getComponent('PostTitle_cmbPostOrgLevel').value,
        Desc: form.getComponent('PostTitle_txtDesc').value,
        QualifyingConditions: form.getComponent('PostTitle_txtQualifyingConditions').value
    }

    if (editMode == "Add" && form.isValid()) {

       // var mask = showMask(form, 'در حال ذخیره...', false);

        execSPInsert('YpGdIr0HGhDdLQvUf3A5Ovs5EzJhwugy'/*SPC_PostTitleUpdate*/, false, false, null, param, form, false, function (result) {
            form.reset();
            //mask.unmask();
            Ext.Msg.info({ ui: 'success', title: 'ذخیره پست', html: 'اطلاعات با موفقیت ذخیره شد', iconCls: '#Accept' });
        })

    }
    else
        if (editMode == "Edit" && form.isValid()) {

            //var mask = showMask(form, 'در حال ویرایش...', false);
            execSPUpdate('YpGdIr0HGhDdLQvUf3A5Ovs5EzJhwugy'/*SPC_PostTitleUpdate*/, null, param, form, false, true, false, function () {
                //mask.unmask();
                Ext.Msg.info({ ui: 'success', title: 'ویرایش پست', html: 'اطلاعات با موفقیت ویرایش شد', iconCls: '#Accept' });
            })

        }
}
function editPostTitle(editMode, record, parent) {

    var id = record !== null ? record.data.ID : 0
    if (editMode == "Delete") {

        confirmMsg(' حذف ' + record.data.Title, 'ایا مطمئن هستید ؟', function (btn) {
            if (btn == 'yes') {
                //var mask = showMask(App.TabBusinessAnalysisPostTitle, 'در حال حذف...', false);

                execSPDelete('YpGdIr0HGhDdLQvUf3A5Ovs5EzJhwugy'/*SPC_PostTitleUpdate*/, { CompanyID: companyID, ID: id }, App.TabBusinessAnalysisPostTitle, function () {
                    getJobs(App.TabPanelBusinessAnalysis_gridJobs);
                }, null)
                
            }

        });
    }
    else if (editMode == "Edit") {

        //var win = new JobsModalWindow(parent, editMode, id)
        showPostTitleWindow(parent, editMode, id)
    }

}
//------------------------------------------------------------------------------System_Constant------------------------------------------------------------------------------------
var rowDataBound_GridConstant = function (grid, toolbar, rowIndex, record) {
    var firstButton = toolbar.items.get(0);
    var editButton = toolbar.items.get(2);
    if (record.data.CompanyID == 1) {
        firstButton.setDisabled(true);
        editButton.setDisabled(true);
    }
};

function editConstant(command, record, grid, tableName, columnName, isDefault) {
    if (command == 'Save') {
        var param = {
            CompanyID: companyID,
            ID: record.context.record.data.ID,
            TableName: tableName,
            ColumnName: columnName,
            DisplayLabel: record.context.record.data.DisplayLabel,
            Value: record.context.record.data.Value,
            Order: record.context.record.data.Order
        }

        if (record.context.record.data.ID > 0) {
            //var mask = showMask(grid, 'در حال ویرایش  ...', false);
            execSPUpdate('3GVviGpjiNYeBW1nUPTEmrzDARJQrSPR'/*SPS_ConstantUpdate*/, fillControl, param, grid, false, true, true, function (result) {

                grid.store.loadData(result)
                //mask.unmask();
            })

        }
        else {
           // var mask = showMask(grid, 'در حال ذخیره...', false);
            execSPInsert('3GVviGpjiNYeBW1nUPTEmrzDARJQrSPR'/*SPS_ConstantUpdate*/, false, true, null, param, grid, false, function (result) {
                grid.store.loadData(result)
               // mask.unmask();
            })

        }
    }
    else if (command == 'Edit') {
        grid.editingPlugin.startEdit(record);
    }
    else {

        confirmMsg(' حذف  ' + record.data.DisplayLabel, 'ایا مطمئن هستید ؟', function (btn) {
            if (btn == 'yes') {
                var mask = showMask(grid, ' در حال حذف...', false);
                var param = {
                    ID: record.data.ID,
                    CompanyID: record.data.CompanyID,
                    TableName: tableName,
                    ColumnName: columnName
                }
                execSPDelete('3GVviGpjiNYeBW1nUPTEmrzDARJQrSPR'/*SPS_ConstantUpdate*/, param, null, function (success) {
                    if (success)
                        grid.store.remove(record);
                    mask.unmask();

                })

            }

        });

    }
}

function gridConstantDataBind(grid, tableName, columnName, isDefault) {
    //var mask = showMask(grid, 'در حال بارگذاری اطلاعات...', false);
    execSPSelect('Cp5+AmaKOy0UpMSQB77o9uq/TDc4FuaS'/*SPS_GetConstants*/, { CompanyID: companyID, TableName: tableName, ColumnName: columnName, }, grid, grid, null, null)
  
}

function addConstant(grid) {
    //var grid = Ext.getCmp('gridRoles'),
    var record;
    grid.editingPlugin.cancelEdit();

    record = grid.store.insert(0, {
        ID: 0,
        DisplayLabel: '',
        Value: '',

        active: true
    });
    grid.editingPlugin.startEdit(record[0]);
};
function getGridConstant(parent, windowTitle, gridTitle, btnAddTitle, tableName, columnName, isDefault) {

    var constantModalWindow = new ConstantModalWindow(parent, windowTitle, gridTitle, btnAddTitle, tableName, columnName, isDefault)
    return constantModalWindow.getGrid();

}
function showWindowConstant(parent, windowTitle, gridTitle, btnAddTitle, tableName, columnName, isDefault) {

    var constantModalWindow = new ConstantModalWindow(parent, windowTitle, gridTitle, btnAddTitle, tableName, columnName, isDefault)
    constantModalWindow.show();

}

function comboBoxConstantBinder(comboBox, tableName, columnName, isDefault, valueField) {

    comboBoxBindStore(comboBox, 'DisplayLabel', valueField);
    execSPSelect('Cp5+AmaKOy0UpMSQB77o9uq/TDc4FuaS'/*SPS_GetConstants*/, { CompanyID: companyID, TableName: tableName, ColumnName: columnName, }, null, comboBox, null, null)
   
}



//--------------------------------------------------------------------مديريت پست هاي سازماني
function getOrganisationPostTree(tree, orgVersionID) {

    //var mask = showMask(tree, 'در حال بارگذاری ساختار...', false);
    orgVersionID = orgVersionID == undefined ? tree.down('combobox').value : orgVersionID

    tree.store.clearData();

    execSPSelect('H6IJCP8wn13B6PsudDHD3/marCU5MiG+QQ+uo2HzSn8='/*SPC_GetOrganizationPostTree*/, { CompanyID: companyID, OrgVersionID: orgVersionID }, tree, {}, null, function (result) {
        //if (result.Success) {

        var orgUnits = result

        Ext.Array.forEach(orgUnits[0], function (parent) {
            var children;
            if (parent.NodeType == 1) {
                children = Ext.Array.filter(orgUnits[0], function (item) {
                    if (item.ParentID == parent.MainID && !isParentPost(orgUnits[0], item))
                        return true;
                });
            }
            else {
                children = Ext.Array.filter(orgUnits[0], function (item) {
                    if (item.ParentID == parent.MainID && item.NodeType == 2)
                        return true;
                });
            }
            if (children.length == 0)
                parent.Children = null;
            else
                parent.Children = children;

        })
        var rootNode = tree.getRootNode();

        if (orgUnits[0][0] !== undefined)
            organisationPostTreeBinder(rootNode, orgUnits[0][0], orgUnits[1])

        tree.up('window').setSize(tree.up('window').width, tree.up('window').height - 1)
        //mask.unmask();

        //}
    })

}
function isParentPost(orgPostArray, childNode) {
    var parents = Ext.Array.filter(orgPostArray, function (item) {
        if (childNode.ParentID == item.MainID && item.NodeType == 2 && childNode.NodeType == 2)
            return true;
    });
    if (parents.length == 1)
        return true
    return false
}
function organisationPostTreeBinder(parent, Rels, icons) {

    Ext.Array.forEach(icons, function (item) {
        if (item.ID == Rels.OrgLevelID) {
            Rels.Icon = item.Icon;
            return;
        }
    });
    if (Rels.Children != null) {

        var childNodeModel = {
            id: Rels.ID,
            text: Rels.Title,
            icon: 'data:image/jpeg;base64,' + Rels.Icon,
            iconCls: Rels.NodeType == 1 ? null : Rels.TenureType == 1 ? '#UserGreen' : '#UserRed',
            expanded: Rels.ParentID == null ? true : false,
            MainID: Rels.MainID,
            ParentID: Rels.ParentID,
            NodeType: Rels.NodeType
        };

        var childNode = parent.appendChild(childNodeModel);

        for (var i = 0; i < Rels.Children.length; i++) {
            organisationPostTreeBinder(childNode, Rels.Children[i], icons);
        }
    }
    else {
        var childNodeModel = {
            id: Rels.ID,
            text: Rels.Title,
            icon: 'data:image/jpeg;base64,' + Rels.Icon,
            iconCls: Rels.NodeType == 1 ? null : '#UserGreen',
            leaf: true,
            parentId: Rels.ParentID,
            MainID: Rels.MainID,
            ParentID: Rels.ParentID,
            NodeType: Rels.NodeType
        };
        parent.appendChild(childNodeModel);

    }
}

function getOrganizationPostInfo(tree, record, item, index, e, eOpts) {
    editModeOrgUnit = "Edit"
    var nodeData = record.data;


    if (nodeData.NodeType == 1) {

        if (App.gridPersonnelPost != undefined)
            App.gridPersonnelPost.hide()

        var formOrgUnitInfo = App.TabBusinessAnalysisPost_OrgPostInfo
        var tab = formOrgUnitInfo.up();
        //var mask = showMask(formOrgUnitInfo, 'درحال بارگذاری...', false);
        tab.setActiveTab(0);
        tab.items.items[0].tab.show();
        tab.items.items[1].tab.hide()

        var obj = { CompanyID: companyID, OrgVersionID: App.TabBusinessAnalysisPost_ddlOrgVersioning.value, ID: nodeData.MainID }
        execSPSelect('H6IJCP8wn13B6PsudDHD3yPr+YUGqJhI'/*SPC_GetOrganizationUnit*/, obj, formOrgUnitInfo, formOrgUnitInfo, null, function (items) {

            if (items.length > 0) {
                var orgUnitInfo = items[0];

                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_txtTopOfUnit').setValue(record.parentNode.data.text == 'Root' ? record.data.text : record.parentNode.data.text);
                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_txtTopOfUnit').tag = record.parentNode.data.text == 'Root' ? undefined : record.parentNode.data.id

                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_txtUnitName').tag = orgUnitInfo.ID
                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_txtUnitName').setValue(orgUnitInfo.Name);

                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_txtCode').setValue(orgUnitInfo.Code);
                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_cmbDegree').setValue(orgUnitInfo.Degree);
                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_cmbOrgUnit').setValue(orgUnitInfo.OrgLevelID);
                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_txtUnitPropDate').setValue(orgUnitInfo.UnitPropDate);
                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_txtCreateDate').setValue(orgUnitInfo.CreateDate);

                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_txtLocationCity').setValue(orgUnitInfo.CityName);
                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_txtLocationCity').tag = orgUnitInfo.CityID;

                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_cmbStatus').setValue(orgUnitInfo.Status == true ? 1 : 2);
                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_txtDesc').setValue(orgUnitInfo.Desc);
                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_txtHistoryDesc').setValue(orgUnitInfo.HistoryDesc);
            }
            else
                formOrgUnitInfo.reset();
        })
       
    }
    else if (nodeData.NodeType == 2/*پست*/) {

        var formOrgUnitInfo = App.TabBusinessAnalysisPost_PostInfo
        var tab = formOrgUnitInfo.up();
        tab.setActiveTab(1);
        tab.items.items[0].tab.hide();
        tab.items.items[1].tab.show();

        if (App.gridPersonnelPost != undefined)
            App.gridPersonnelPost.show()

        //var mask = showMask(formOrgUnitInfo, 'درحال بارگذاری...', false);

        var obj = { CompanyID: companyID, PostID: nodeData.MainID }
        execSPSelect('AGEy4yfoMC7syTKxf6KViA=='/*SPC_GetPostInfo*/, obj, formOrgUnitInfo, formOrgUnitInfo, null, function (items) {

           
                var postInfo = items.Table1
                var orgUnitInfo = postInfo[0];

                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_OrgUnitName').tag = getTopOfOrgUnit(record).MainID
                formOrgUnitInfo.getComponent('TabBusinessAnalysisPost_OrgUnitName').setValue(getTopOfOrgUnit(record).text);


                formOrgUnitInfo.getComponent('PostTitleID').setValue(orgUnitInfo.PostTitleID)
                formOrgUnitInfo.getComponent('txtOrgPostLevel').setValue(orgUnitInfo.PostOrgLevelTitle);

                formOrgUnitInfo.getComponent('txtOrgPostActivityType').setValue(orgUnitInfo.ActivityTypeTitle);
                formOrgUnitInfo.getComponent('txtTitleInUnit').setValue(orgUnitInfo.TitleInUnit);
                formOrgUnitInfo.getComponent('txtPostNumber').setValue(orgUnitInfo.Code);
                formOrgUnitInfo.getComponent('cmbOrgPostStatus').setValue(orgUnitInfo.Status == true ? 1 : 2);
                formOrgUnitInfo.getComponent('txtOrgPostJobName').setValue(orgUnitInfo.JobTitle);

                formOrgUnitInfo.getComponent('txtOrgPostField').setValue(orgUnitInfo.FieldTitle);
                formOrgUnitInfo.getComponent('txtOrgPostJobLevel').setValue(orgUnitInfo.JobLevelTitle);

                formOrgUnitInfo.getComponent('ddlOrgPostChargeType').setValue(orgUnitInfo.TenureType);
                formOrgUnitInfo.getComponent('ddlOrgPostStabilityType').setValue(orgUnitInfo.StabilityType);
                formOrgUnitInfo.getComponent('txtOrgPostCreateDate').setValue(orgUnitInfo.CreateDate);
                formOrgUnitInfo.getComponent('txtOrgPostDesc').setValue(orgUnitInfo.Desc);

                if (App.gridPersonnelPost != undefined)
                    if (items.Table2 !== undefined && items.Table2.length > 0)
                        App.gridPersonnelPost.store.loadData(numberToDate(items.Table2));
                    else
                        App.gridPersonnelPost.store.loadData([]);
            
        })
        


    }
}

var editModePost = "Edit"
function addNewPost(tree) {
    var orgTree = tree;//App.TabOrgStrucManagment_treeOrganisation
    var selectNode = orgTree.selModel.getSelected();

    if (selectNode.length > 0) {
        var selectUnit = selectNode.items[0].data;
        //if (selectUnit.NodeType == 1)
        var tabs = App.TabOrgPost
        tabs.setActiveTab(1);
        tabs.items.items[0].tab.hide();
        tabs.items.items[1].tab.show();
        var form = tabs.items.items[1];
        form.reset();
        if (selectUnit.NodeType == 1) {
            form.getComponent('TabBusinessAnalysisPost_OrgUnitName').setValue(selectUnit.text);
            form.getComponent('TabBusinessAnalysisPost_OrgUnitName').tag = selectUnit.MainID;
        }
        else {
            form.getComponent('TabBusinessAnalysisPost_OrgUnitName').setValue(getTopOfOrgUnit(selectNode.items[0]).text);
            form.getComponent('TabBusinessAnalysisPost_OrgUnitName').tag = getTopOfOrgUnit(selectNode.items[0]).MainID
        }
        //App.TabOrgStrucManagment_OrgUnitInfo.getComponent('TabOrgStrucManagment_txtTopOfUnit').tag = selectUnit.id;
        //App.TabOrgStrucManagment_OrgUnitInfo.getComponent('TabOrgStrucManagment_txtUnitName').tag = undefined;
        editModePost = "Add";

    }
    else {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ واحدی یا پستی انتخاب نشده است', iconCls: '#Exclamation' });
    }
}

function savePost(form) {

    if (form.isValid()) {
        //var unitInfo = App.TabOrgStrucManagment_OrgUnitInfo.getForm()


        var mask = showMask(form, 'در حال ذخیره اطلاعات...', false);
        var fieldsValues = form.getValues();
        var orgID = form.getComponent('TabBusinessAnalysisPost_OrgUnitName').tag == undefined ? 0 : form.getComponent('TabBusinessAnalysisPost_OrgUnitName').tag
        var treePost = form.up().prev('#TabBusinessAnalysisPost_treePost')
        var selectNode = treePost.selModel.getSelected().items[0];
        var nodeType = selectNode.data.NodeType
        var orgVersionID = treePost.down('#TabBusinessAnalysisPost_ddlOrgVersioning').value
        var parentID;

        if (editModePost == 'Add' && nodeType == 1)
            parentID = null
        else if (editModePost == 'Edit' && nodeType == 2)
            parentID = selectNode.data.ParentID
        else if (editModePost == 'Add' && nodeType == 2)
            parentID = selectNode.data.MainID

        var postID = editModePost == 'Edit' ? selectNode.data.MainID : 0;
        var param = {
            ID: postID,
            CompanyID: companyID,
            OrganizationID: orgID,
            Title: fieldsValues.txtTitleInUnit,
            Code: fieldsValues.txtPostNumber,
            Desc: fieldsValues.txtOrgPostDesc,
            ParentID: parentID,
            PostTitleID: fieldsValues.PostTitleID,
            Status: fieldsValues.cmbOrgPostStatus == "1" ? true : false,
            CreateDate: fieldsValues.txtOrgPostCreateDate,
            TenureType: 1,
            StabilityType: fieldsValues.ddlOrgPostStabilityType,
            OrgVersionID: orgVersionID
        }
        if (editModePost == 'Add') {

            execSPInsert('YpGdIr0HGhBNfABhTxNk5Q=='/*SPC_PostUpdate*/, false, true, null, param, null, false, function (result) {
                getOrganisationPostTree(treePost, orgVersionID);
                mask.unmask();
                form.getComponent('txtTitleInUnit').tag = result[0].PostID
                Ext.Msg.info({ ui: 'success', title: 'ویرایش پست', html: 'اطلاعات با موفقیت ذخیره شد', iconCls: '#Accept' });
            })


        }
        else if (editModePost == 'Edit' && orgID > 0) {
            execSPUpdate('YpGdIr0HGhBNfABhTxNk5Q=='/*SPC_PostUpdate*/, null, param, null, false, true, false, function (result) {
                getOrganisationPostTree(treePost, orgVersionID);
                mask.unmask();
                form.getComponent('txtTitleInUnit').tag = result[0].PostID
                Ext.Msg.info({ ui: 'success', title: 'ویرایش پست', html: 'اطلاعات با موفقیت ذخیره شد', iconCls: '#Accept' });
            })
        }
        editModePost = 'Edit'
    }
}

function saveOrganizationPostUnit(form) {

    if (form.isValid()) {
        //var unitInfo = App.TabOrgStrucManagment_OrgUnitInfo.getForm()


        //var mask = showMask(form, 'در حال ویرایش اطلاعات...', false);
        var fieldsValues = form.getValues();

        var obj = {
            ID: form.getComponent('TabBusinessAnalysisPost_txtUnitName').tag,
            CompanyID: companyID,
            OrgVersionID: App.TabBusinessAnalysisPost_ddlOrgVersioning.value,
            Name: fieldsValues.TabBusinessAnalysisPost_txtUnitName,
            Code: fieldsValues.TabBusinessAnalysisPost_txtCode,
            Desc: fieldsValues.TabBusinessAnalysisPost_txtDesc,
            ParentID: parseInt(form.getComponent('TabBusinessAnalysisPost_txtTopOfUnit').tag),
            ActiveState: fieldsValues.TabBusinessAnalysisPost_cmbStatus == "1" ? true : false,
            OrgLevelID: fieldsValues.TabBusinessAnalysisPost_cmbOrgUnit,
            UnitPropDate: fieldsValues.TabBusinessAnalysisPost_txtUnitPropDate,
            CityID: form.getComponent('TabBusinessAnalysisPost_txtLocationCity').tag,
            CityName: fieldsValues.TabBusinessAnalysisPost_txtLocationCity,
            CreateDate: fieldsValues.TabBusinessAnalysisPost_txtCreateDate,
            Degree: parseInt(fieldsValues.TabBusinessAnalysisPost_cmbDegree),
            HistoryDesc: fieldsValues.TabBusinessAnalysisPost_txtHistoryDesc
        }
        execSPUpdate('e1Tc7qcDX1fNaHueQ9qqgwtlS9pc1sK5'/*SPC_OrganizationUpdate*/, null, obj, form, false, true, false, function () {

            getOrganisationPostTree(App.TabBusinessAnalysisPost_treePost, App.TabBusinessAnalysisPost_ddlOrgVersioning.value);

        })
        


    }
}


function getTopOfOrgUnit(orgPostNode) {

    if (orgPostNode.data.NodeType == 1)
        return orgPostNode;
    if (orgPostNode.parentNode.data.NodeType == 1) {

        var data = orgPostNode.parentNode.data
        return data;
    }
    else
        return getTopOfOrgUnit(orgPostNode.parentNode);
    //tree.store.getRootNode().eachChild(function (node) {
    //    if (node) {
    //        return node
    //    }
    //})
}
function setPostTitleInfo(comboBox, selectItem) {

    var form = comboBox.up();
    //var mask = showMask(form, 'درحال بارگذاری اطلاعات پست...', false);
    execSPSelect('AGEy4yfoMC5/mPV1SLNLAui74qyroYW/'/*SPC_GetPostTitleInfo*/, { CompanyID: companyID, ID: selectItem[0].data.ID }, form, {}, null, function (result) {


        var postTitleInfo = result[0]

        form.getComponent('txtOrgPostLevel').setValue(postTitleInfo.PostOrgLevelTitle);
        form.getComponent('txtOrgPostActivityType').setValue(postTitleInfo.ActivityTypeTitle);
        form.getComponent('txtOrgPostJobName').setValue(postTitleInfo.JobTitle);
        form.getComponent('txtOrgPostField').setValue(postTitleInfo.FieldTitle);
        form.getComponent('txtOrgPostJobLevel').setValue(postTitleInfo.JobLevelTitle);
        form.getComponent('ddlOrgPostChargeType').setValue(1);
        //mask.unmask();

    })

}
function comboBoxPostTitleBinder(comboBox) {


    comboBoxBindStore(comboBox, 'Title', 'ID');
    execSPSelect('AGEy4yfoMC5/mPV1SLNLAsUnMamTCPiT'/*SPC_GetPostTitles*/, { CompanyID: companyID }, null, {}, null, function (result) {
        //if (result.Success) {
        comboBox.store.clearData();
        comboBox.store.loadData(result);
        //comboBox.store.insert(0, { id:0, text:'--انتخاب کنید--'})
        //}

    })

}
function deleteOrgPost(tree) {

    var orgTree = tree;//App.TabOrgStrucManagment_treeOrganisation
    var selectUnit = orgTree.selModel.getSelected().items[0].data;
    if (selectUnit.NodeType == 1) {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'واحد سازمانی در این قسمت قابل حذف نيست', iconCls: '#Exclamation' });
        return
    }
    if (orgTree.selModel.getSelected().length == 0) {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ پستی انتخاب نشده است', iconCls: '#Exclamation' });
        return
    }
    if (selectUnit.leaf == false) {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'پست انتخابي داراي زيرمجموعه است! قابل حذف نيست', iconCls: '#Exclamation' });
        return
    }

    var titleMsg = ' حذف پست <b> ' + selectUnit.text + ' </b> ';

    confirmMsg(titleMsg, 'ایا مطمئن هستید ؟', function (btn) {
        if (btn == 'yes') {
            var mask = showMask(orgTree, 'درحال حذف پست...', false);
            var orgVersionID = orgTree.down('#TabBusinessAnalysisPost_ddlOrgVersioning').value
            execSPDelete('YpGdIr0HGhBNfABhTxNk5Q=='/*SPC_PostUpdate*/, { CompanyID: companyID, ID: selectUnit.MainID, OrgVersionID: orgVersionID }, null, function () {
                mask.unmask();
                tree.store.remove(orgTree.selModel.getSelected().items[0]);
                Ext.Msg.info({ ui: 'success', title: 'حذف پست', html: titleMsg + ' با موفقیت انجام شد ', iconCls: '#Accept' });
            })

        }

    });
}
var cutPostSourceID = null;
var copyPostSourceID = null;
function cutPost(tree) {
    copyPostSourceID = null;
    var orgTree = tree//App.TabOrgStrucManagment_treeOrganisation
    if (orgTree.selModel.getSelected().length > 0) {
        var selectUnit = orgTree.selModel.getSelected().items[0].data;
        cutPostSourceID = selectUnit.MainID
    }
    else {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ پستی انتخاب نشده است', iconCls: '#Exclamation' });
    }
}
function showTreePostContextMenu(view, record, item, index, event) {
    var menu = Ext.create("Ext.menu.Menu", { id: "treeOrgUnitContextMenu", items: [{ handler: function () { addNewPost(view.panel) }, iconCls: "#UserAdd", text: "پست جدید" }, { xtype: "menuseparator" }, { handler: function () { deleteOrgPost(view.panel) }, iconCls: "#ChartOrganisationDelete", text: "حذف پست" }, { xtype: "menuseparator" }, { handler: function () { cutPost(view.panel) }, iconCls: "#CutRed", text: "برش" }, { xtype: "menuseparator" }, { handler: function () { copyPost(view.panel) }, iconCls: "#PageCopy", text: "کپی" }, { xtype: "menuseparator" }, { handler: function () { pastePost(view.panel) }, iconCls: "#PastePlain", text: "چسباندن" }, { xtype: "menuseparator" }] });
    menu.showAt(event.getXY());

    event.stopEvent();
}
function pastePost(tree) {
    var orgTree = tree;// App.TabOrgStrucManagment_treeOrganisation
    var mask = showMask(orgTree, 'درحال بارگذاری...', false);
    if (orgTree.selModel.getSelected().length > 0) {
        var targetNode = orgTree.selModel.getSelected().items[0].data;
        if (copyPostSourceID !== null) {

        }
        else if (cutPostSourceID !== null) {
            if (targetNode.MainID !== cutPostSourceID /*&& targetNode.parentId !== cutPostSourceID*/) {
                var orgVersionID = orgTree.down('#TabBusinessAnalysisPost_ddlOrgVersioning').value
                execSPUpdate('YpGdIr0HGhBNfABhTxNk5Q=='/*SPC_PostUpdate*/, null, { ID: cutPostSourceID, ParentID: targetNode.MainID, CompanyID: companyID, Mode: 'Cut', OrgVersionID: orgVersionID, NodeType: targetNode.NodeType }, null, false, true, false, function () {
                    mask.unmask();
                    getOrganisationPostTree(tree, App.TabBusinessAnalysisPost_ddlOrgVersioning.value);
                })

            }
            else {
                mask.unmask();
                Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'مبدا و مقصد نمیتواند یکی باشد', iconCls: '#Exclamation' });
            }

        }
        else {
            mask.unmask();
            Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ واحدی برای چسباندن انتخاب نشده است', iconCls: '#Exclamation' });
        }

    }
    else {
        mask.unmask();
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ واحدی انتخاب نشده است', iconCls: '#Exclamation' });
    }
    copyOrgUnitSourceID = null;
    cutOrgUnitSourceID = null;
}


function showPersonnelPostWindow(parent, mode, id) {

    var win = new PersonnelPostModalWindow(parent, mode, id);
    win.show();
}
function savePersonnelPost(form, editMode, id) {

    if (form.isValid()) {

        var selectNode = App.TabBusinessAnalysisPost_treePost.selModel.getSelected().items[0].data;
        if (selectNode.NodeType == 2/*پست*/) {

            var values = form.getValues();

            if (!compareDate(values.txtTenureStartDate, values.txtTenureEndDate))
                return false;
            //var mask = showMask(form, 'درحال ذخیره...', false);
            var param = dateToNumber({
                ID: id,
                CompanyID: companyID,
                PostID: selectNode.MainID,
                PersonnelID: values.cmbPersonnelPostSearch,
                StartDate: values.txtTenureStartDate,
                EndDate: values.txtTenureEndDate,
                IsActive: values.cmbTenureActiveState == 1 ? true : false,
                PostTypeID: values.cmbPostType,
            })

            if (editMode == 'Add') {
                execSPInsert('b25wg3UhoH/vrUHAqQhifSnKLuwAa4nb'/*SPC_PersonnelPostUpdate*/, false, true, null, param, form, false, function (result) {

                    App.gridPersonnelPost.store.loadData(numberToDate(result));
                    Ext.Msg.info({ ui: 'success', title: 'تصدی', html: 'اطلاعات با موفقیت ذخیره شد', iconCls: '#Accept' });


                    form.up('window').close();

                })
            }
            else if (editMode == 'Edit') {
                execSPUpdate('b25wg3UhoH/vrUHAqQhifSnKLuwAa4nb'/*SPC_PersonnelPostUpdate*/, null, param, form, false, true, true, function (result) {

                    App.gridPersonnelPost.store.loadData(numberToDate(result));
                    Ext.Msg.info({ ui: 'success', title: 'تصدی', html: 'اطلاعات با موفقیت ذخیره شد', iconCls: '#Accept' });
                    mask.unmask();

                    form.up('window').close();

                })

            }
        }
        else {

            Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'لطفا یک پست را انتخاب کنید', iconCls: '#Exclamation' });
        }
    }
}
function editPersonnelPost(editMode, record, parent) {

    var id = record !== null ? record.data.ID : 0
    var selectNode = App.TabBusinessAnalysisPost_treePost.selModel.getSelected().items[0].data;
    if (editMode == "Delete") {

        confirmMsg(' حذف پرسنل ', 'ایا مطمئن هستید ؟', function (btn) {
            if (btn == 'yes') {
                //var mask = showMask(App.gridPersonnelPost, 'در حال حذف...', false);

                var param = { ID: id, CompanyID: companyID, IsActive: record.data.IsActive, PostID: selectNode.MainID }
                execSPDelete('b25wg3UhoH/vrUHAqQhifSnKLuwAa4nb'/*SPC_PersonnelPostUpdate*/, param, App.gridPersonnelPost, function () {

                    App.gridPersonnelPost.store.remove(record);
                })

            }

        });
    }
    else if (editMode == "Edit") {
        showPersonnelPostWindow(App.PanelOrgPostHistory, 'Edit', id);
    }
}
function isSelectedPost() {

    var nodes = App.TabBusinessAnalysisPost_treePost.selModel.getSelected();

    if (nodes.length == 0)
        App.gridPersonnelPost.hide();
    else if (nodes.items[0].data.NodeType == 1)
        App.gridPersonnelPost.hide();
    else
        App.gridPersonnelPost.show();
}
//--------------------------------------------------تعریف وضعیت های شغلی
var addJobStatus = function () {

    var grid = App.gridJobStatus,
        store = grid.getStore();

    grid.editingPlugin.cancelEdit();

    store.getSorters().removeAll(); // We have to remove sorting to avoid auto-sorting on insert
    grid.getView().headerCt.setSortState(); // To update columns sort UI

    store.insert(0, {
        Title: '',
        Status: 'شاغل',
        IsExperience: true
    });

    grid.editingPlugin.startEdit(0, 0);


};

function gridJobStatusBinder(grid) {
    //var mask = showMask(grid, 'درحال بارگذاری...', false);

    execSPSelect('ZaaIFkWsTHkWGGNn6GMIqG+r/BcMH1n4'/*SPC_GetJobStatus*/, { CompanyID: companyID }, grid, grid, null, null)
   
}

function editJobStatus(command, record, grid) {
    if (command == 'Save') {
        if (record.context.record.data.ID > 0) {
            //var mask = showMask(grid, 'در حال ویرایش  ...', false);
            var param = {
                ID: record.context.record.data.ID,
                CompanyID: companyID,
                Title: record.context.record.data.Title,
                Status: record.context.record.data.StatusTitle == '0' ? false : true,
                IsExperience: record.context.record.data.ExperienceTitle == '0' ? false : true
            }
            execSPUpdate('gYPtdpBBoLjNfSOI/6GIEetgbLAN8Mhp'/*SPC_JobStatusUpdate*/, null, param, grid, false, true, true, function (items) {
                grid.store.loadData(items);
            }, null)

            
        }
        else {
            //var mask = showMask(grid, 'ذخیره در حال ...', false);
            var param = {
                ID: record.context.record.data.ID,
                CompanyID: companyID,
                Title: record.context.record.data.Title,
                Status: record.context.record.data.StatusTitle == '0' ? false : true,
                IsExperience: record.context.record.data.ExperienceTitle == '0' ? false : true
            }
            execSPInsert('gYPtdpBBoLjNfSOI/6GIEetgbLAN8Mhp'/*SPC_JobStatusUpdate*/, false, true, null, param, grid, false, function (items) {
                grid.store.loadData(items);
            }, null)
            
        }
    }
    else if (command == 'Edit') {
        grid.editingPlugin.startEdit(record);
    }
    else {

        confirmMsg(' حذف  ' + record.data.Title, 'ایا مطمئن هستید ؟', function (btn) {
            if (btn == 'yes') {
                var mask = showMask(grid, ' در حال حذف...', false);
                var param = { ID: record.data.ID, CompanyID: companyID }
                execSPDelete('gYPtdpBBoLjNfSOI/6GIEetgbLAN8Mhp'/*SPC_JobStatusUpdate*/, param, mask, function () {

                    grid.store.remove(record);
                })
                
            }

        });

    }
}

function comboBoxJobStatusBinder(comboBox) {

    comboBoxBindStore(comboBox, 'Title', 'ID');
    execSPSelect('ZaaIFkWsTHkWGGNn6GMIqMhJMVG4Oa8z'/*SPC_GetJobStatusTitle*/, { CompanyID: companyID }, null, comboBox, null, null)
   
}

//----------------------------------------------------------------------------------------------Personnel----------------------------------------------------------------------------
function personnelSearch(formSearchFilters, pageNo) {

    //var mask = showMask(formSearchFilters.up(), 'در حال جستجو ...', false);
    var grid = formSearchFilters.up().down('grid');
    var paging = '{ "PageNumber":' + (pageNo == 0 ? 1 : pageNo).toString() + ', "PageSize":' + grid.store.pageSize.toString() + ' }'

    var parametersJson = getParametersJson(grid, formSearchFilters, '', paging, { CompanyID: companyID }, null)
    execSPSelect('kVO2zRa9c8IrXHq30ktPnDEJzjjdQFAl'/*SPP_PersonnelSearch*/, parametersJson, formSearchFilters.up(), grid, formSearchFilters, null)
    //
}

function personnelEdit(mode, gridPersonnel) {


    var tabPersonnelManegment = gridPersonnel.up('tabpanel')

    //tabPersonnelManegment.items.items[1].set('hidden', false);
    var tabPersonnelInfo = tabPersonnelManegment.bin[0]

    tabPersonnelManegment.addTab(tabPersonnelInfo);
    tabPersonnelManegment.setActiveTab(1)
    var tabs = tabPersonnelManegment.getActiveTab().down('tabpanel');

    if (mode == 'Add') {
        selectedPersonnelID = 0
        tabPersonnelInfo.setTitle('پرسنل جدید');
        tabPersonnelInfo.down('panel').setHidden(true)
        tabs.items.items.forEach(function (tab) {
            tab.reset();
            tab.rendering = true
        })
    }
    else if (mode == 'Edit') {

        var selectPersonnel = gridPersonnel.getSelectionModel().getSelection()[0].data;
        tabPersonnelInfo.setTitle(selectPersonnel.FirstName + ' ' + selectPersonnel.LastName);
        var headerPanel = tabPersonnelInfo.down('panel')
        headerPanel.setHidden(false)
        //setJsonToFields(tabPersonnelInfo.down('panel'), 'panel', '');

        tabPersonnelInfo.tag = selectPersonnel.ID
        selectedPersonnelID = selectPersonnel.ID

        tabs.items.items.forEach(function (tab) {
            tab.reset();
            tab.rendering = false
        })

        var obj = { CompanyID: companyID, TableName: 'Personnel_Photoes', FileName: selectedPersonnelID.toString() + '.jpeg' }
        execSPSelect('t3MF7frIiDUQhSFGiFTwuw=='/*SPS_GetFile*/, obj, null, null, null, function (result) {
            var img = tabPersonnelInfo.down('panel').down('netimage')

            img.setSrc(result.length == 0 ? '' : 'data:image/jpeg;base64,' + result[0].File)
            
        })
        

        getPersonnelInfo(tabs, tabs.items.items[0])
        headerPanel.rendering = false;
        getPersonnelInfo(null, headerPanel)


    }

    tabs.setActiveTab(0)
}

function changePagePersonnel(pagingToolbar, pageNo, eOpts) {
    personnelSearch(pagingToolbar.up().prev('form'), pageNo)
}

function savePersonnelInfo(form) {

    if (form.isValid()) {

        var mode = selectedPersonnelID == 0 ? 'Add' : 'Edit';
        //var mask = showMask(form, 'در حال ذخیره ...', false);
        var jsonData

        if (mode == 'Add') {

            jsonData = getFieldsToJson(form, 'field', true, '_', { Password: '6509573377285784504', UserType: 2 }, false, true);
            execSPInsert('kVO2zRa9c8KptxOR3lh++nu/sVlsKNbg'/*SPP_PersonnelInfoUpdate*/, false, false, null, jsonData, form, false, null, null)
            
        }
        else if (mode == 'Edit') {

            jsonData = getFieldsToJson(form, 'field', true, '_', { CompanyID: companyID, ID: selectedPersonnelID }, false, true);
            execSPUpdate('kVO2zRa9c8KptxOR3lh++nu/sVlsKNbg'/*SPP_PersonnelInfoUpdate*/, null, jsonData, form, false, true, false, null)
            
        }
    }
}

function getPersonnelInfo(tabPanel, formPanel) {

    if (formPanel.rendering == false || formPanel.rendering == null) {

        formPanel.rendering = true
        //var infoJson = getFieldsToJson(formPanel, 'field', false, '_', { ID: selectedPersonnelID })
        //var mask = showMask(formPanel, 'در حال بارگذاری ...', false);

        var params = getParametersJson(formPanel, { ID: selectedPersonnelID,CompanyID: companyID }, '', '',null , '', '')

        execSPSelect('eh4NeOGsl9p/U9g1o865APzHozWrihZz'/*SPP_GetPersonnelInfo*/, params, formPanel, formPanel, null, null)
       // selectDynamicQuery('bm++HWha1weS2zJetvDeJA==', '', '', mask, formPanel, { ID: selectedPersonnelID, CompanyID: companyID })

    }

}
function savePersonnelPhoto(fileField) {

    var file = fileField.getEl().down('input[type=file]').dom.files[0]
    if (file == undefined) {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'هیچ عکسی انتخاب نشده است', iconCls: '#Exclamation' });
        return
    }
    if (file.type.indexOf('image') == -1) {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'فرمت عکس باید تصویر باشد', iconCls: '#Exclamation' });
        return
    }
    if (file.type.split('/')[1] !== 'jpeg') {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'فرمت عکس باید jpeg باشد', iconCls: '#Exclamation' });
        return
    }
    if (file.size > 30720) {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'حجم عکس نمیتواند از 30 کیلوبایت بیشتر باشد', iconCls: '#Exclamation' });
        return
    }
    //var mask = showMask(fileField.up('panel'), 'در حال ذخیره...', true)
    var reader = new FileReader();
    // create handler
    reader.onload = (function (theFile) {
        return function (e) {
            // process file
            icon = btoa(e.target.result);

            var obj = { TableName: 'Personnel_Photoes', FileName: selectedPersonnelID.toString() + '.' + file.type.split('/')[1], FileContent: icon}
            execSPInsert('cP/cIeC5JuJaJ0ald9doeQ=='/*SPS_SaveFile*/, false, false, null, obj, fileField.up('panel'), false, null, null)
            
        };
    })(file);
    // start upload
    if (file !== undefined)
        reader.readAsBinaryString(file);
}

//---------------------------------------------------حکم-----------------------------------------------------------------
//تعریف عوامل حکم
function getSentenceItems(panel) {

    //var mask = showMask(panel.up('panel'), 'در حال بارگذاری...', true)
    //var where = getFieldsToJson(panel, 'field', true, '_', null, true)
    var grid = panel.xtype == 'grid' ? panel : panel.next('grid');

    var params = getParametersJson(grid, panel, '', '', {CompanyID: companyID }, '', '')
    
    execSPSelect('HkER3MkBNss6NxPtcAR7iTcL7G6bk+Xs'/*SPH_GetSentenceItems*/, params, panel.up('panel'), grid, null, null)
    //selectDynamicQuery('wnYUZzMrLGxsiirhvDKWEg=='/*Sentence_Items*/, '', '', mask, grid, panel)


    //(tableName, queryType,  join, paging, isID, mask, fillControl, filterControl,id) 
}


function showSentenceItemWindow(parent, editMode, id) {

    var win = new SentenceItemModalWindow(parent, editMode, id)
    win.show();
}


function SaveSentenceItem(editMode, id, modalWindow) {

    if (editMode == 'Delete') {

        //var row = getSelectedRowGrid(modalWindow)
        if (id) {

            confirmMsg(' حذف عامل ', 'ایا مطمئن هستید ؟', function (btn) {
                if (btn == 'yes') {
                    //var mask = showMask(modalWindow, 'در حال حذف...', false);
                    execSPDelete('H2THoNP90OIuMPwha4nQ+gP33wspaQlh'/*SPH_SentenceItemsUpdate*/, { CompanyID: companyID, ID: id }, modalWindow,
                        function () {
                            getSentenceItems(modalWindow.prev())
                        })
                }

            });
        }

    }
    else if (modalWindow.form.isValid()) {
        //var mask = showMask(modalWindow.form, 'در حال ذخیره...', false)
        if (editMode == 'Add') {
            //insertDynamicQuery('wnYUZzMrLGxsiirhvDKWEg=='/*Sentence_Items*/, false, mask, modalWindow.form, { CompanyID: companyID }, false)
            execSPInsert('H2THoNP90OIuMPwha4nQ+gP33wspaQlh'/*SPH_SentenceItemsUpdate*/, false, false, modalWindow.form, { CompanyID: companyID }, modalWindow.form, false, function () { modalWindow.close(); })

        }
        else if (editMode == 'Edit') {
            //updateDynamicQuery('wnYUZzMrLGxsiirhvDKWEg=='/*Sentence_Items*/, mask, modalWindow.form, { CompanyID: companyID, ID: id }, false)
            execSPUpdate('H2THoNP90OIuMPwha4nQ+gP33wspaQlh'/*SPH_SentenceItemsUpdate*/, modalWindow.form, { CompanyID: companyID, ID: id }, modalWindow.form, false, false, false,
                function (isEdit) {
                    modalWindow.close(isEdit);
                })

        }

    }
}

//تعریف انواع حکم
function getSentenceTypes(grid) {

    //var mask = showMask(grid, 'در حال بارگذاری...', true)

    //selectDynamicQuery('wnYUZzMrLGwNMQcMaJDxGA=='/*Sentence_Types*/, '', '', mask, grid, { CompanyID: companyID })
    execSPSelect('HkER3MkBNsv6HSnO2E0YOTw8HzvXUlxI'/*SPH_GetSentenceTypes*/, { CompanyID: companyID }, grid, grid)

    //(tableName, queryType,  join, paging, isID, mask, fillControl, filterControl,id) 
}


function showSentenceTypeWindow(parent, editMode, id) {

    var win = new SentenceTypeModalWindow(parent, editMode, id)
    win.show();
}


function SaveSentenceType(editMode, id, modalWindow) {

    if (editMode == 'Delete') {

        //var row = getSelectedRowGrid(modalWindow)
        if (id) {

            confirmMsg(' حذف عامل ', 'ایا مطمئن هستید ؟', function (btn) {
                if (btn == 'yes') {
                    //var mask = showMask(modalWindow, 'در حال حذف...', false);
                    execSPDelete('H2THoNP90OIt5lqlckspB79uBhvSnall'/*SPH_SentenceItemsUpdate*/, { CompanyID: companyID, ID: id }, modalWindow, function () { getSentenceTypes(modalWindow) })
                }

            });
        }

    }
    else if (modalWindow.form.isValid()) {
        //var mask = showMask(modalWindow.form, 'در حال ذخیره...', false)
        if (editMode == 'Add') {

            execSPInsert('H2THoNP90OIt5lqlckspB79uBhvSnall'/*SPH_SentenceTypesUpdate*/, false, false, modalWindow.form, { CompanyID: companyID }, modalWindow.form, false,
                function () {
                    modalWindow.close();
                })

        }
        else if (editMode == 'Edit') {

            execSPUpdate('H2THoNP90OIt5lqlckspB79uBhvSnall'/*SPH_SentenceTypesUpdate*/, modalWindow.form, { CompanyID: companyID, ID: id }, modalWindow.form, false, false, false,
                function (isEdit) {

                    modalWindow.close(isEdit);
                })

        }

    }
}

var sentenceTypeInstanceItems = null;
function getSentenceTypeItems(gridSentenceType) {


    //var row = getSelectedRowGrid(gridSentenceType)
    var tabPanel = gridSentenceType.next('tabpanel')
    //var mask = showMask(tabPanel, 'در حال بارگذاری...', false)
    var typeInstanceID = getValueGrid(gridSentenceType, 'TypeInstanceID')
    execSPSelect('j1gT/iZpkwZ0clV1+A/jEOIGQq+VRYn5LPBD8Z6vUzk='/*SPH_GetTypeInstanceItems*/, { TypeInstanceID: typeInstanceID }, tabPanel, {}, null, function (itemIDList) {
        sentenceTypeInstanceItems = Ext.Array.pluck(itemIDList, 'ItemID');
        var gridSentenceTypeItems = tabPanel.query('#gridSentenceTypeItems')[0]
        var length = gridSentenceTypeItems.store.data.items.length;
        isGridRowClick = false
        gridSentenceTypeItems.selModel.deselectAll();
        for (var i = 0; length > i; i++) {
            var item = contains(itemIDList, 'ItemID', gridSentenceTypeItems.store.data.items[i].data.ID)
            if (item !== null) {
                gridSentenceTypeItems.selModel.doMultiSelect(gridSentenceTypeItems.store.data.items[i], true);
            }
        }
    })



}

function SaveSentenceTypeInstanceItems(gridSentenceTypeItems) {

    if (sentenceTypeInstanceItems == null)
        sentenceTypeInstanceItems = [];

    var selectedItems = Ext.Array.pluck(Ext.Array.pluck(gridSentenceTypeItems.getSelectionModel().getSelection(), 'data'), 'ID')

    var deleteItemIDs = Ext.Array.difference(sentenceTypeInstanceItems, selectedItems)//delete
    var insertItemIDs = Ext.Array.difference(selectedItems, sentenceTypeInstanceItems)//insert

    if (deleteItemIDs.length == 0 && insertItemIDs.length == 0) {
        Ext.Msg.info({ ui: 'danger', title: 'انتخاب رکورد', html: '.هیچ تغییری ایجاد نشده است', iconCls: '#Exclamation' });
        return
    }

    var gridSentenceType = gridSentenceTypeItems.up('tabpanel').prev('grid')

    var typeID = getValueGrid(gridSalaryType, 'ID', '.هیچ نوع حکمی انتخاب نشده است')
    if (!typeID)
        return

    var typeInstanceID = getValueGrid(gridSentenceType, 'TypeInstanceID')
    //var mask = showMask(gridSentenceTypeItems, 'در حال ویرایش...', false)


    if (deleteItemIDs.length > 0) {
        var deleteItem = []

        Ext.Array.forEach(deleteItemIDs, function (item) { deleteItem.push({ ItemID: item, TypeInstanceID: typeInstanceID }) })
        //deleteDynamicQuery('wnYUZzMrLGxyC4+tpestRVtJkGbjxmQyeOWkJ/lRwSE='/*Sentence_TypeInstanceItems*/, insertItemIDs.length > 0 ? null : mask, deleteItem)
        execSPDelete('xhuwdA3Y+W/kPtMEuse76OsMvFO0uJM6EzjtO0/zJCg='/*SPH_TypeInstanceItemsUpdate*/, deleteItem, insertItemIDs.length > 0 ? null : gridSentenceTypeItems, null)
    }

    if (insertItemIDs.length > 0) {
        var insertItem = []
        Ext.Array.forEach(insertItemIDs, function (item) { insertItem.push({ CompanyID: companyID, ItemID: item, TypeInstanceID: typeInstanceID, TypeID: typeID }) })

        //insertDynamicQuery('wnYUZzMrLGxyC4+tpestRVtJkGbjxmQyeOWkJ/lRwSE='/*Sentence_TypeInstanceItems*/, false, mask, insertItem, null, false)
        execSPInsert('xhuwdA3Y+W/kPtMEuse76OsMvFO0uJM6EzjtO0/zJCg='/*SPH_TypeInstanceItemsUpdate*/, false, false, null, insertItem, gridSentenceTypeItems, false, null)
    }


}

// صدور حکم پرسنلی




function getPersonnelSentenceTypes(comboBox, personnelID) {

    comboBoxBindStore(comboBox, 'Title', 'ID');
    //var mask = showMask(tabPanel, 'در حال بارگذاری...', false)
    execSPSelect('qMGkc4KKdXD+x1kb3n+oBqs9rAYoDeSWhs43556+KwU='/*SPH_GetPersonnelSentenceTypes*/, { CompanyID: companyID, PersonnelID: personnelID }, null, comboBox, null)

}

function getPersonnelSentences(grid, personnelID) {
    //var mask = showMask(grid, 'در حال بارگذاری...', false)
    execSPSelect('qMGkc4KKdXD+x1kb3n+oBqs9rAYoDeSWaAYKoIckmfs='/*SPH_GetPersonnelSentences*/, { CompanyID: companyID, PersonnelID: personnelID }, grid, grid, null)
}




function getSentenceTypeInstanceItems(combo) {

    var win = combo.up('window')
    //var mask = showMask(win.down('#tabPanelPSI'), 'در حال بارگذاری...', false);
    execSPSelect('HkER3MkBNsv6HSnO2E0YOcNySrzzuT04MwpjvNHq6VQl1MEZ3Uut1Q=='/*SPH_GetSentenceTypeInstanceItems*/, { CompanyID: companyID, ID: combo.value }, win.down('#tabPanelPSI'), win.down('#gridSPItems'), null, null)
}

function showPersonnelSentencesWindow(parent, grid) {

    var personnelID = getValueGrid(grid, 'ID')
    if (personnelID) {
        var win = new PersonnelSentencesModalWindow(parent, personnelID);
        win.show();
    }
    
}


//-------Salary------------------------------------------------------

function getItemTypes(cmbCategory, comboItemType) {

    var category = cmbCategory.getValue()
    var itemType

    if (category == 1/*کارکرد*/) {
        //itemType = [{ ItemTypeID: 4, ItemTypeTitle: 'روز' }, { ItemTypeID: 5, ItemTypeTitle: 'ساعت/دقیقه' }, { ItemTypeID: 6, ItemTypeTitle: 'روز/ساعت/دقیقه' }];
        itemType = [{ ItemTypeID: 2, ItemTypeTitle: 'محاسباتی' }, { ItemTypeID: 3, ItemTypeTitle: 'فرم ورودی' }, { ItemTypeID: 4, ItemTypeTitle: 'سیستمی' }];
        comboItemType.setFieldLabel('نوع کارکرد')
    }
    else if (category == 2/*مزایا*/) {
        itemType = [{ ItemTypeID: 1, ItemTypeTitle: 'مستمر(حکمی)' }, { ItemTypeID: 2, ItemTypeTitle: 'محاسباتی' }, { ItemTypeID: 3, ItemTypeTitle: 'فرم ورودی' }];
        comboItemType.setFieldLabel('نوع مزایا')
    }
    else if (category == 3/*کسور*/) {
        itemType = [{ ItemTypeID: 2, ItemTypeTitle: 'محاسباتی' }, { ItemTypeID: 3, ItemTypeTitle: 'فرم ورودی' }, { ItemTypeID: 4, ItemTypeTitle: 'سیستمی' }];
        comboItemType.setFieldLabel('نوع کسور')
    }
    else if (category == 4/*سایر عوامل*/) {
        itemType = [{ ItemTypeID: 2, ItemTypeTitle: 'محاسباتی' }, { ItemTypeID: 3, ItemTypeTitle: 'فرم ورودی' }, { ItemTypeID: 4, ItemTypeTitle: 'سیستمی' }];
        comboItemType.setFieldLabel('نوع سایر عوامل')
    }
    else if (category == 5/*تعهدات کارفرما*/) {
        itemType = [{ ItemTypeID: 2, ItemTypeTitle: 'محاسباتی' }, { ItemTypeID: 3, ItemTypeTitle: 'فرم ورودی' }, { ItemTypeID: 4, ItemTypeTitle: 'سیستمی' }];
        comboItemType.setFieldLabel('نوع تعهدات کارفرما')
    }

    comboBoxBindStore(comboItemType, 'ItemTypeTitle', 'ItemTypeID');
    comboItemType.store.clearData();
    comboItemType.store.loadData([]);
    comboItemType.setRawValue('')
    comboItemType.setValue(0)
    comboItemType.store.loadData(itemType);
}

function showSalaryItemWindow(parent, editMode, id) {

    var win = new SalaryItemModalWindow(parent, editMode, id)
    win.show();
}


function SaveSalaryItem(editMode, id, modalWindow) {

    if (editMode == 'Delete') {

        //var row = getSelectedRowGrid(modalWindow)
        if (id) {

            confirmMsg(' حذف عامل ', 'ایا مطمئن هستید ؟', function (btn) {
                if (btn == 'yes') {
                    //var mask = showMask(modalWindow, 'در حال حذف...', false);
                    execSPDelete('5rwbVFvy+AZv1B/Qp8H4kNt3KCSIdx6O'/*SPF_SalaryItemsUpdate*/, { CompanyID: companyID, ID: id }, modalWindow,
                        function () {
                            getSalaryItems(modalWindow.prev())
                        })
                }

            });
        }

    }
    else if (modalWindow.form.isValid()) {
        var mask = showMask(modalWindow.form, 'در حال ذخیره...', false)

        var chkBestankar = modalWindow.form.down('#chkBestankar')
        var chkBedehkar = modalWindow.form.down('#chkBedehkar')
        var nature = chkBestankar.checked && chkBedehkar.checked ? 3 : chkBestankar.checked ? 2 : 1
        if (modalWindow.form.down('#sal_DebtorSpecificCode').value !== '' && chkBedehkar.checked == false) {
            Ext.Msg.info({ ui: 'danger', title: 'اطلاعات مالی/ماهیت عامل', html: 'بدهکار انتخاب نشده است', iconCls: '#Exclamation' });
            //mask.unmask()
            return
        }
        if (modalWindow.form.down('#sal_CreditorSpecificCode').value !== '' && chkBestankar.checked == false) {
            Ext.Msg.info({ ui: 'danger', title: 'اطلاعات مالی/ماهیت عامل', html: 'بستانکار انتخاب نشده است', iconCls: '#Exclamation' });
            //mask.unmask()
            return
        }

        if (editMode == 'Add') {

            execSPInsert('5rwbVFvy+AZv1B/Qp8H4kNt3KCSIdx6O'/*SPF_SalaryItemsUpdate*/, false, false, modalWindow.form, { CompanyID: companyID, NatureTypeID: nature }, modalWindow.form, false, function () { modalWindow.close(); })

        }
        else if (editMode == 'Edit') {

            execSPUpdate('5rwbVFvy+AZv1B/Qp8H4kNt3KCSIdx6O'/*SPF_SalaryItemsUpdate*/, modalWindow.form, { CompanyID: companyID, ID: id, NatureTypeID: nature }, modalWindow.form, false, true, false,
                function (isEdit) {

                    var isEdit1 = chkBestankar.preValue !== undefined ? chkBestankar.preValue.toString() !== chkBestankar.value.toString() : true;
                    var isEdit2 = chkBedehkar.preValue !== undefined ? chkBedehkar.preValue.toString() !== chkBedehkar.value.toString() : true;
                    modalWindow.close(isEdit || isEdit2 || isEdit1);

                })

        }

    }
}

function getSalaryItems(panel) {

    //var mask = showMask(panel.up('panel'), 'در حال بارگذاری...', true)
    //var where = getFieldsToJson(panel, 'field', true, '_', null, true)
    var grid = panel.xtype == 'grid' ? panel : panel.next('grid');
    var col = getParametersJson(grid, panel, '', '', { CompanyID: companyID })//.replace(',"IsDeactive":0','')
    execSPSelect('W3wqtUb/9WADUizR7hTXfOS1S1Ef6VgS'/*SPF_GetSalaryItems*/, col, panel.up('panel'), grid, null, null)

}

//تعریف انواع حکم
function getSalaryTypes(grid, isLastSelect) {

    //var mask = showMask(grid, 'در حال بارگذاری...', true)
    execSPSelect('W3wqtUb/9WDq2iHAaEBRXwmYPR9U9edB'/*SPF_GetSalaryTypes*/, { CompanyID: companyID }, grid, grid, null, function () {

        if (isLastSelect) {
            grid.getSelectionModel().select(grid.store.data.length - 1)
            grid.view.fireEvent('rowclick', grid, grid.store.data.length - 1);
        }
    })


}
function deleteSalaryType(record, grid) {


    var id = record.data.ID
    confirmMsg(' حذف عامل ', 'ایا مطمئن هستید ؟', function (btn) {
        if (btn == 'yes') {
            //var mask = showMask(grid, 'در حال حذف...', false);
            execSPDelete('5rwbVFvy+AZ1KRv3WhHEYgmENm03c58W'/*SPF_SalaryTypesUpdate*/, { CompanyID: companyID, ID: id }, grid,
                function (success) {
                    if (success)
                        removeRecordGrid(grid, record)

                })
        }

    });
}
function SaveSalaryType(record) {

    var id = record.context.record.data.ID
    var editMode
    var grid = record.grid

    var editMode = id > 0 ? 'Edit' : 'Add'
    //var mask = showMask(grid, 'در حال ذخیره...', false)
    var title = record.context.record.data.Title
    if (editMode == 'Add') {

        execSPInsert('5rwbVFvy+AZ1KRv3WhHEYgmENm03c58W'/*SPF_SalaryTypesUpdate*/, false, false, grid, { CompanyID: companyID, Title: title }, grid, false, function () {
            getSalaryTypes(grid, true)
        })

    }
    else if (editMode == 'Edit') {

        execSPUpdate('5rwbVFvy+AZ1KRv3WhHEYgmENm03c58W'/*SPF_SalaryTypesUpdate*/, grid, { CompanyID: companyID, ID: id, Title: title }, grid, false, true, false, null)

    }

}

var salaryTypeItems = [];
function getSalaryTypeItems(gridSalaryType) {


    //var row = getSelectedRowGrid(gridSentenceType)
    var gridSalaryTypeItems = gridSalaryType.next('#gridSalaryTypeItems')
    //var mask = showMask(gridSalaryTypeItems, 'در حال بارگذاری...', false)
    var typeID = getValueGrid(gridSalaryType, 'ID')

    execSPSelect('BjaxtKr4YqNg9BqkLoW/2XVRKKQE/JVx'/*SPF_GetTypeItems*/, { CompanyID: companyID, TypeID: typeID }, gridSalaryTypeItems, {}, null, function (itemIDList) {

        gridSalaryTypeItems.store.loadData(itemIDList)

        salaryTypeItems = [];
        itemIDList = itemIDList.filter(function (item) { return item.TypeItemID !== 0 })
        //salaryTypeItems = Ext.Array.pluck(itemIDList, 'ID');
        var items = gridSalaryTypeItems.store.data.items;
        isGridRowClick = false
        gridSalaryTypeItems.selModel.deselectAll();
        for (var i = 0; items.length > i; i++) {

            if (items[i].data.TypeItemID > 0) {
                gridSalaryTypeItems.selModel.doMultiSelect(items[i], true);
                salaryTypeItems.push(items[i].data.ID)
            }
            //gridSalaryTypeItems.store.data.items[i].data.TypeItemID = 0;
            //var item = contains(itemIDList, 'ID', gridSalaryTypeItems.store.data.items[i].data.ID)
            //if (item !== null) {
            //    gridSalaryTypeItems.selModel.doMultiSelect(gridSalaryTypeItems.store.data.items[i], true);
            //    gridSalaryTypeItems.store.data.items[i].data.TypeItemID = item.TypeItemID;
            //}
        }
    })

}

function SaveSalaryTypeItems(gridSalaryTypeItems) {

    if (salaryTypeItems == null)
        salaryTypeItems = [];


    var selectedItems = Ext.Array.pluck(Ext.Array.pluck(gridSalaryTypeItems.getSelectionModel().getSelection(), 'data'), 'ID')

    var deleteItemIDs = Ext.Array.difference(salaryTypeItems, selectedItems)//delete
    var insertItemIDs = Ext.Array.difference(selectedItems, salaryTypeItems)//insert

    if (deleteItemIDs.length == 0 && insertItemIDs.length == 0) {
        Ext.Msg.info({ ui: 'danger', title: 'انتخاب رکورد', html: '.هیچ تغییری ایجاد نشده است', iconCls: '#Exclamation' });
        return
    }

    var gridSalaryType = gridSalaryTypeItems.prev('#gridSalaryTypes')
    var typeID = getValueGrid(gridSalaryType, 'ID', '.هیچ نوع فیشی انتخاب نشده است')
    if (!typeID)
        return
    //var typeInstanceID = getValueGrid(gridSalaryType, 'TypeInstanceID')
    //var mask = showMask(gridSalaryTypeItems, 'در حال ویرایش...', false)


    if (deleteItemIDs.length > 0) {
        var deleteItem = []

        Ext.Array.forEach(deleteItemIDs, function (item) { deleteItem.push({ CompanyID: companyID, ItemID: item, TypeID: typeID }) })

        execSPDelete('TDXPJvAQBOvI3tdPIpdIGHRiyC5Owlro'/*SPF_TypeItemsUpdate*/, deleteItem, insertItemIDs.length > 0 ? null : gridSalaryTypeItems, function () {
            getSalaryTypeItems(gridSalaryTypeItems.prev('#gridSalaryTypes'))
        })

    }

    if (insertItemIDs.length > 0) {
        var insertItem = []
        Ext.Array.forEach(insertItemIDs, function (item) { insertItem.push({ CompanyID: companyID, ItemID: item, TypeID: typeID, IsDeactive: false }) })

        //insertDynamicQuery('wnYUZzMrLGxyC4+tpestRVtJkGbjxmQyeOWkJ/lRwSE='/*Sentence_TypeInstanceItems*/, false, mask, insertItem, null, false)
        //execSPInsert(spName, isID, fillControl, extraData, mask, isTitle, afterInsertFn)
        execSPInsert('TDXPJvAQBOvI3tdPIpdIGHRiyC5Owlro'/*SPF_TypeItemsUpdate*/, false, false, null, insertItem, gridSalaryTypeItems, false, function () {
            getSalaryTypeItems(gridSalaryTypeItems.prev('#gridSalaryTypes'))
        })
    }


}
function typeItemDeactive(checkColumn, rowIndex, record, checked, eOpts) {

    var msg;
    if (record.data.TypeItemID > 0) {

        if (checked)
            msg = 'پس از فعال کردن این گزینه این عامل در این نوع فیش محاسبه نمیشود. ایا مطمئن هستید ؟'
        else
            msg = 'پس از غیر فعال کردن این گزینه این عامل در این نوع فیش محاسبه میشود. ایا مطمئن هستید ؟'

        confirmMsg(record.data.Title, msg, function (btn) {
            if (btn == 'yes') {
                //var mask = showMask(checkColumn.up('grid'), 'در حال ذخیره...', true)
                var json = getParametersJson({ IsDeactive: checked }, { CompanyID: companyID, ID: record.data.TypeItemID }, null, null, null, null, null)
                execSPUpdate('TDXPJvAQBOvI3tdPIpdIGHRiyC5Owlro'/*SPF_TypeItemsUpdate*/, null, json, checkColumn.up('grid'), false, true, false, null)

            }

        });
    }
}
function getItemFormulaInstance(grid, typeItemID) {
    var win = grid.up('window')
    //var mask = showMask(win, 'در حال بارگذاری...', true)
    execSPSelect('FgFKr9w99h43pPVkYQYH2b8DgX6SzLGd7ZOfdOCV7hU='/*SPF_GetItemFormulaInstances*/, { CompanyID: companyID,TypeItemID: typeItemID }, null, {}, null, function (items) {

        items.forEach(function (item) {

            item['IssueMonth'] = getMonthName(item['IssueMonth'])
            item['ExecuteMonth'] = getMonthName(item['ExecuteMonth'])
        })
        grid.store.loadData(items)
        selectRowGrid(grid, 0)
    })
}
function saveItemFormulaInstance(plugin, typeItemID) {

    var data = plugin.context.record.data
    var info = {
        ID: data.ID,
        IssueDate: parseInt(data.IssueYear.toString() + monthNameToMonthNo(data.IssueMonth)),
        ExecuteDate: parseInt(data.ExecuteYear.toString() + monthNameToMonthNo(data.ExecuteMonth)),
        EmploymentTypeID: data.EmploymentTypeTitle.join(','),
        Dsc: data.Dsc,
        TypeItemID: typeItemID
    }

    var records = plugin.grid.store.getRecordsValues()
    for (var i = 0; records.length > i; i++) {
        if (records[i].ID !== info.ID && info.IssueDate == parseInt(records[i].IssueYear.toString() + monthNameToMonthNo(records[i].IssueMonth))) {
            Ext.Msg.info({ ui: 'danger', title: 'خطا', html: '.امکان تاریخ صدور یکسان وجود ندارد', iconCls: '#Exclamation' });
            plugin.startEdit(plugin.context.record)
            return false;
        }
    }

    if (parseInt(getYear(true) + getMonth(true)) < info.IssueDate) {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: '.تاریخ صدور نمی تواند بعد از تاریخ روز باشد', iconCls: '#Exclamation' });
        plugin.startEdit(plugin.context.record)
        return
    }
    if (info.ExecuteDate > info.IssueDate) {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: '.تاریخ اجرا نمی تواند بعد از تاریخ صدور باشد', iconCls: '#Exclamation' });
        plugin.startEdit(plugin.context.record)
        return
    }
    if (info.ExecuteDate < info.IssueDate) {
        confirmMsg('هشدار', 'اگر تاریخ اجرا قبل از تاریخ صدور باشد این عامل در این ماه برای تمام پرسنل معوقه محاسبه می شود.<br/><br/> آیا مطمئن هستید ؟', function (btn) {
            if (btn == 'no') {
                plugin.startEdit(plugin.context.record)
                return false
            }
            else {
                saveItemFormulaInstanceConfirm(plugin.grid, info)
            }

        });
    }
    else {

        saveItemFormulaInstanceConfirm(plugin.grid, info)
    }
}
function saveItemFormulaInstanceConfirm(grid, record, isDelete) {

    if (isDelete) {
        record = record == null ? getSelectedRowGrid(grid) : record
        if (record) {
            confirmMsg('حذف', 'آیا مطمئن هستید ؟', function (btn) {
                if (btn == 'yes') {
                    //var mask = showMask(grid, 'در حال حذف...', false)
                    execSPDelete('FJXLVXvbQ/qYgAQsAvlTGIfTDWP63ggiydfQpbvq4ag='/*SPF_ItemFormulaInstanceUpdate*/, { ID: record.data.ID, CompanyID: companyID, TypeItemID: record.data.TypeItemID }, grid, function (success) {
                        if (success)
                            removeRecordGrid(grid, record)
                    })
                }

            });
        }
    }
    else {
        //var mask = showMask(grid, 'در حال ذخیره...', false)
        record["CompanyID"] = companyID
        if (record.ID == 0) {
            execSPInsert('FJXLVXvbQ/qYgAQsAvlTGIfTDWP63ggiydfQpbvq4ag='/*SPF_ItemFormulaInstanceUpdate*/, false, true, null, record, grid, false, function (result) {

                result.forEach(function (item) {
                    item['IssueMonth'] = getMonthName(item['IssueMonth'])
                    item['ExecuteMonth'] = getMonthName(item['ExecuteMonth'])
                })
                grid.store.loadData(result)
            })
        }
        else {
            execSPUpdate('FJXLVXvbQ/qYgAQsAvlTGIfTDWP63ggiydfQpbvq4ag='/*SPF_ItemFormulaInstanceUpdate*/, null, record, mask, false, true, false, null)
        }
    }
}
//------------------------------------------Formula-----------------------------------------------
function showFormulaWindow(parent, editMode, itemFormulaInstanceID, itemFormulaID, type/*فیش-حکم*/, mode/*فرمول-شرط*/, parentWin) {

    var win = new FormulaModalWindow(parent, editMode, itemFormulaInstanceID, itemFormulaID, type/*فیش-حکم*/, mode/*فرمول-شرط*/, parentWin)
    win.show()
}
function getPropertyTree(tree, type/*فیش-حکم*/, mode/*فرمول-شرط*/) {

    var mask = showMask(tree.up('window'), 'در حال بارگذاری ساختار...', true);
    tree.store.clearData();

    execSPSelect('B1YrUuA19r9uTh+x94/K8zm0V2/oSF8H'/*SPF_GetPropertyTree*/, { CompanyID: companyID, Type: type, Mode: mode }, null, {}, null, function (items) {

        var orgUnits = items
        var rootUnit = null
        var rootNode = tree.getRootNode();

        Ext.Array.forEach(items, function (parent) {
            var children = Ext.Array.filter(items, function (item) {
                if (item.ParentID == parent.ID)
                    return true;
            });
            if (children.length == 0)
                parent.Children = null;
            else
                parent.Children = children;

            //if (parent.ParentID == null) {
            //    propertyTreeBinder(rootNode, parent)
            //}

        })

        Ext.Array.filter(items, function (item) {
            if (item.ParentID == null)
                return true;
        }).forEach(function (rootParent) {
            propertyTreeBinder(rootNode, rootParent)
        });
        mask.unmask();
    })


}
function propertyTreeBinder(parent, Rels) {



    if (Rels.Children != null) {

        var childNodeModel = {
            id: Rels.ID,
            text: Rels.Title,
            iconCls: '#Folder',
            // expanded: Rels.ParentID == null ? true : false,
            leaf: false,
            parentId: Rels.ParentID

        };

        var childNode = parent.appendChild(childNodeModel);

        for (var i = 0; i < Rels.Children.length; i++) {
            propertyTreeBinder(childNode, Rels.Children[i]);
        }
    }
    else {
        var childNodeModel = {
            id: Rels.ID,
            text: Rels.Title,
            iconCls: Rels.ItemID > 0 ? '#Lightning' : '#Folder',
            leaf: true,
            parentId: Rels.ParentID,
            ItemType: Rels.ItemType,
            IFormula: Rels.IFormula,
            FieldCondition: Rels.FieldCondition,
            FieldConditionTitle: Rels.FieldConditionTitle,
            ItemID: Rels.ItemID
        };
        parent.appendChild(childNodeModel);

    }
}


function addItemFormula(btnItem) {

    var value = btnItem.text
    var win = btnItem.up('window')
    var tagItemFormula = win.down('#tagItemFormula')
    var lblItemFormula = win.down('#lblItemFormula')
    var index = tagItemFormula.value.length - 1

    if ((Ext.isNumeric(value) || value == '.') && tagItemFormula.value.length > 0) {


        var lastTag = tagItemFormula.value[index]
        var lastValue = lastTag.Value

        if (Ext.isNumeric(lastValue)) {
            tagItemFormula.removeTag(lastTag)
            tagItemFormula.addTag({ value: Ext.id(), text: lastValue + value, closable: false, Value: lastValue + value, Title: lastValue + value, ItemID: 0, IsFn: 0 })
            lblItemFormula.setText(arrayObjectToString(tagItemFormula.value, 'Title', ''))
        }
        else {

            tagItemFormula.addTag({ value: Ext.id(), text: value, closable: false, Value: value, Title: value, ItemID: 0, IsFn: 0 })
            lblItemFormula.setText(arrayObjectToString(tagItemFormula.value, 'Title', ''))
        }
    }
    else if (value != '.') {

        var valueP = value == '(' ? ')' : value == ')' ? '(' : value
        tagItemFormula.addTag({ value: Ext.id(), text: valueP, closable: false, Value: value, Title: value, ItemID: 0, IsFn: 0 })
        lblItemFormula.setText(arrayObjectToString(tagItemFormula.value, 'Title', ''))
    }
    else
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: '.مقدار غیر مجاز است', iconCls: '#Exclamation' });

}
function removeItemFormula(menuItem) {

    var menu = menuItem.up();
    menu.tagLabel.remove(menu.activeTag);
    App.lblItemFormula.setText(arrayObjectToString(menu.tagLabel.tags, 'Title', ''))
}
function addFormula(tree, record, item, index, e, eOpts) {

    var data = record.data
    if (data.leaf == true) {
        var win = tree.up('window')
        var tagItemFormula = win.down('#tagItemFormula')
        var lblItemFormula = win.down('#lblItemFormula')
        tagItemFormula.addTag({ value: Ext.id(), text: data.text, closable: false, Value: data.IFormula, Title: data.text, ItemID: data.ItemID, IsFn: 1 })
        lblItemFormula.setText(arrayObjectToString(tagItemFormula.value, 'Title', ''))
    }
}
function deleteFormula(btnDelete) {

    var win = btnDelete.up('window')
    var tagItemFormula = win.down('#tagItemFormula')
    var lblItemFormula = win.down('#lblItemFormula')
    tagItemFormula.clear();
    lblItemFormula.setText('')
}

function saveFormulaSalary(win, itemFormulaInstanceID, parentWindow, editMode, itemFormulaID) {

    //var mask = showMask(win, 'در حال ذخیره...', true);
    var tagItemFormula = win.down('#tagItemFormula')
    var lblItemFormula = win.down('#lblItemFormula')

    var items = []
    if (tagItemFormula.value.length > 0) {


        if (editMode == 'Add') {

            if (parentWindow.down('#gridSalFormulaList').store.data.items.length > 0 && parentWindow.down('#txtConditionTitle').getValue() == '') {
                Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'لطفا ابتدا شرط را وارد کنید', iconCls: '#Exclamation' });
                mask.unmask()
                return
            }
            tagItemFormula.value.forEach(function (item) {

                items.push({ Title: item.Title, Value: item.Value, ItemID: item.ItemID, IsFn: item.IsFn,CompanyID: companyID })
            })

            var itemFormula = {
                ItemFormulaInstanceID: itemFormulaInstanceID,
                Formula: arrayObjectToString(tagItemFormula.value, 'Value', ''),
                FormulaTitle: arrayObjectToString(tagItemFormula.value, 'text', ''),
                Title: parentWindow.down('#txtItemTitle').getValue(),
                CompanyID: companyID
            }

            var formula = { ItemFormula: itemFormula, FormulaItems: items }

            execSPInsert('FJXLVXvbQ/pvtYDUIkg5p3ei5lTvi7Gx'/*SPF_ItemFormulaUpdate*/, false, false, null, formula, win, false, function (result) {
                if (result !== 'Error') {
                    //var textFormula = parentWindow.down('#txtFormulaTitle')
                    //var grid = parentWindow.down('#gridSalFormulaList')
                    //textFormula.setValue(itemFormula.FormulaTitle)
                    //addRecordGrid(grid, { FormulaTitle: itemFormula.FormulaTitle }, false, true)
                    getItemFormulaSalary(parentWindow, itemFormulaInstanceID)
                    win.close();
                }
            })
        }
        else if (editMode == 'Edit') {

            tagItemFormula.value.forEach(function (item) {

                items.push({ ItemFormulaID: itemFormulaID, Title: item.Title, Value: item.Value, ItemID: item.ItemID, IsFn: item.IsFn,CompanyID: companyID })
            })

            var itemFormula = {
                ItemFormulaID: itemFormulaID,
                Formula: arrayObjectToString(tagItemFormula.value, 'Value', ''),
                FormulaTitle: arrayObjectToString(tagItemFormula.value, 'Title', ''),
                Title: parentWindow.down('#txtItemTitle').getValue(),
                CompanyID: companyID
            }

            var formula = { ItemFormula: itemFormula, FormulaItems: items }

            //execSPUpdate(spName, fillControl, extraData, mask, isTitle, forceUpdate, isResult, afterUpdateFn)
            execSPUpdate('FJXLVXvbQ/pvtYDUIkg5p3ei5lTvi7Gx'/*SPF_ItemFormulaUpdate*/, null, formula, win, false, true, false, function (success) {

                if (success) {
                    getItemFormulaSalary(parentWindow, itemFormulaInstanceID)
                    win.close();
                }
            })
        }


    }
    else
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: '.فرمول نمیتواند خالی باشد', iconCls: '#Exclamation' });
}

function showSalaryItemFormulaModalWindow(textField) {

    var data = textField.record.data;
    var grid = textField.column.grid
    var panel = grid.up('#TabSalaryTypes')

    if (data.TypeItemID == 0) {
        Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'برای نوشتن فرمول عامل باید ذخیره شود', iconCls: '#Exclamation' });
        return;
    }
    var win = new SalaryItemFormulaModalWindow(panel, '', data.TypeItemID, data.Title)
    win.show()
}

function parseFormula(formula) {

    execSPSelect('zdxbREzIoHUnuCxiMSMAQTB/DAkAt8zJ'/*SPF_FormulaParse*/, { Formula: formula }, null, {}, null)
}

function getItemFormulaSalary(win, itemFormulaInstanceID) {
    //var mask = showMask(win, 'در حال ...', true);
    var gridSalFormulaList = win.down('#gridSalFormulaList')
    var dataJson = getParametersJson(gridSalFormulaList, { ItemFormulaInstanceID: itemFormulaInstanceID, CompanyID: companyID }, null, null, null, null)
    execSPSelect('FgFKr9w99h43pPVkYQYH2ddGZFEQs5WgKQSGlvriF9U='/*SPF_GetItemFormulaSalary*/, dataJson, null, gridSalFormulaList, null, function (formulaList) {

        selectRowGrid(gridSalFormulaList, 0)
        win.body.unmask()
    })
}
function getItemFormulaSalary(win, itemFormulaInstanceID) {
    //var mask = showMask(win, 'در حال ...', true);
    var gridSalFormulaList = win.down('#gridSalFormulaList')
    var dataJson = getParametersJson(gridSalFormulaList, { ItemFormulaInstanceID: itemFormulaInstanceID, CompanyID: companyID }, null, null, null, null)
    execSPSelect('FgFKr9w99h43pPVkYQYH2ddGZFEQs5WgKQSGlvriF9U='/*SPF_GetItemFormulaSalary*/, dataJson, null, gridSalFormulaList, null, function (formulaList) {

        selectRowGrid(gridSalFormulaList, gridSalFormulaList.store.data.items.length - 1)
        win.body.unmask()
    })
}
function getFormulaItems(type, itemFormulaID) {

    var dataJson = getParametersJson({}/*همه ستون ها*/, { ItemFormulaID: itemFormulaID, CompanyID: companyID }, null, null, null, null, { Type: type/*فیش - حکم*/ })
    execSPSelect('CzArv02SKc0kRdKnvA2d5Z5MgeeZFRSt'/*SPF_GetFormulaItems*/, dataJson, null, null, null, function (formulaList) {


    })
}
function selectItemFormula(win, grid, record) {

    var txtFormulaTitle = win.down('#txtFormulaTitle')
    var txtConditionTitle = win.down('#txtConditionTitle')
    var txtItemTitle = win.down('#txtItemTitle')
    txtFormulaTitle.setValue(record.data.FormulaTitle)
    txtConditionTitle.setValue(record.data.ConditionTitle)
    txtItemTitle.setValue(record.data.Title)
}

function addNewFormula(win) {

    var txtFormulaTitle = win.down('#txtFormulaTitle')
    var txtConditionTitle = win.down('#txtConditionTitle')
    var txtItemTitle = win.down('#txtItemTitle')
    win.down('#gridSalFormulaList').selModel.deselectAll()

    txtFormulaTitle.setValue('')
    txtConditionTitle.setValue('')
    txtItemTitle.setValue('')
}

function deleteItemFormula(grid, record) {


    confirmMsg(' حذف  ' + record.data.Title, 'ایا مطمئن هستید ؟', function (btn) {
        if (btn == 'yes') {

            var mask = showMask(grid.up(), 'در حال حذف ...', true);
            var itemFormula = {
                ItemFormulaID: record.data.ID,
                CompanyID: companyID
            }

            var formula = { ItemFormula: itemFormula, FormulaItems: null }


            execSPDelete('FJXLVXvbQ/pvtYDUIkg5p3ei5lTvi7Gx'/*SPF_ItemFormulaUpdate*/, formula, null, function (success) {

                if (success) {
                    //Ext.Msg.info({ ui: 'success', title: 'حذف', html: 'حذف با موفقیت انجام شد', iconCls: '#Accept' });
                    removeRecordGrid(grid, record)
                    selectRowGrid(grid, grid.store.data.items.length - 1)
                    mask.unmask()
                }
            })

        }

    });
}

function showPersonnelSalaryWindow(parent, personnelGrid) {

    var record = getSelectedRowGrid(personnelGrid)
    var personnelID = record.data.ID
    var personnelName = record.data.FirstName + ' ' + record.data.LastName
    var win = new PersonnelSalaryModalWindow(personnelGrid.up('panel'), personnelID, personnelName);
    win.show();
}

function getPersonnelSalary(grid, personnelID) {
    var mask = showMask(grid, 'در حال بارگذاری...', false)
    //execSPSelect(spName, parametersJson, mask, fillControl, filterControl, afterSelectFn)
    execSPSelect('B1YrUuA19r/YyQB2GWQPhmTad0V2KMYt'/*SPF_GetPersonnelSalary*/, { CompanyID: companyID, PersonnelID: personnelID }, mask, null, null, function (items) {

        items.forEach(function (item) {

            item['MonthName'] = getMonthName(item['Date'].toString().substr(4, 2))
            item['Year'] = item['Date'].toString().substr(0, 4)
            item['Month'] = item['Date'].toString().substr(4, 2)
        })
        grid.store.loadData(items)
        selectRowGrid(grid, 0)
    })
}

function getPersonnelSalaryTypes(comboBox, personnelID) {

    comboBoxBindStore(comboBox, 'Title', 'ID');
    //var mask = showMask(tabPanel, 'در حال بارگذاری...', false)
    execSPSelect('B1YrUuA19r/YyQB2GWQPhlOKnk7RV/rP0wo0nOh+08g='/*SPF_GetPersonnelSalaryTypes*/, { CompanyID: companyID, PersonnelID: personnelID }, null, comboBox, null)

}

function getInputFormItems(ctrl) {


    comboBoxBindStore(ctrl, 'Title', 'ID')
    var col = getParametersJson({ ID: 0, Title: '' }, { CompanyID: companyID, ItemTypeID: 3, CategoryTypeID: '1,2,3,4,5' }, '', '', null)//.replace(',"IsDeactive":0','')
    execSPSelect('W3wqtUb/9WADUizR7hTXfOS1S1Ef6VgS'/*SPF_GetSalaryItems*/, col, null, ctrl, null, null)

}
function getBenefitItems(ctrl) {

    var col = getParametersJson({ ID: 0, Title: '' }, { CompanyID: companyID, CategoryTypeID: 2 }, '', '', null)//.replace(',"IsDeactive":0','')
    execSPSelect('W3wqtUb/9WADUizR7hTXfOS1S1Ef6VgS'/*SPF_GetSalaryItems*/, col, null, ctrl, null, null)

}

function personnelInputFormItemsSearch(filterPanel, pageNo) {
    pageNo = pageNo == undefined ? 1 : pageNo
    var mask = showMask(filterPanel.up(), 'در حال جستجو ...', false);
    var grid = filterPanel.next('grid');
    var paging = '{ "PageNumber":' + (pageNo == 0 ? 1 : pageNo).toString() + ', "PageSize":' + grid.store.pageSize.toString() + ' }'

    var parametersJson = getParametersJson(grid, filterPanel, '', paging, { CompanyID: companyID }, null)
    execSPSelect('ha+/yKdfgIHkDTDUbHth4y5tlBIwbtqxmSJUIvfKekyo/dm1dDEYVA=='/*SPF_PersonnelInputFormItemsSearch*/, parametersJson, mask, grid, filterPanel, null)
    //
}
function changePagePIFI(pagingToolbar, pageNo, eOpts) {
    personnelInputFormItemsSearch(pagingToolbar.up().prev('form'), pageNo)
}


function showPersonnelInputFormItemModalWindow(parent, gridInputForm, mode) {

    if (mode == 'Edit') {
        var record = getSelectedRowGrid(gridInputForm)
        var inputFormObj = record.data
    }

    var win = new PersonnelInputFormItemModalWindow(parent, inputFormObj, mode);
    win.show();
}
function deletePersonnelInputFormItem(gridInputForm) {

    var record = getSelectedRowGrid(gridInputForm)

    if (record !== null) {

        var inputFormID = record.data.ID
        confirmMsg(' حذف  ' + record.data.Title, 'ایا مطمئن هستید ؟', function (btn) {
            if (btn == 'yes') {
                var mask = showMask(gridInputForm, 'در حال حذف...', false);

                execSPDelete('WZ++bjklNUJaKcAeq9jZGPaUnNUNwkaUA5txTbqdCck='/*SPF_InputFormItemValueUpdate*/, { CompanyID: companyID, ID: inputFormID }, null, function (success) {

                    if (success) {
                        removeRecordGrid(gridInputForm, record)
                        mask.unmask();
                    }

                })

            }

        });
    }
}

function groupSalaryCalculation(grid) {

    // var maskText
    var gridGroupCalc = grid.prev('grid')
    var salaryType = gridGroupCalc.down('#ddlGroupCalc_SalaryTypes').value;
    var date = gridGroupCalc.down('#ddlGroupCalc_Year').value + gridGroupCalc.down('#ddlGroupCalc_Month').value

    if (isNullOrEmpty(salaryType)) {

        showMsgInfo('نوع فیش انتخاب نشده است', 'خطا', 'danger', false/*closable*/, true/*autoHide*/)
        return
    }

    if (isNullOrEmpty(personnelIDs) || personnelIDs.length == 0) {

        personnelIDs = getRowsGrid(grid, 'ID')


        if (isNullOrEmpty(personnelIDs) || personnelIDs.length == 0) {
            showMsgInfo('هیچ پرسنلی برای حذف فیش انتخاب نشده است', 'خطا', 'danger', false/*closable*/, true/*autoHide*/)
            return
        }

        personnelsName = getRowsGrid(grid, 'FullName')
        personnelsName.forEach(function (item, i) { personnelsName[i] = '<span style="font-weight: bold !important">' + item + '</span>' });

        var tabPanel = grid.up('#TabPersonnelGroupCalc')
        tabPanel.mask('در حال محاسبه فیش...');
        var maskTextEls = tabPanel.el.query("div.x-mask-msg-text")
        maskTextEl = maskTextEls[maskTextEls.length - 1];

    }

    var personnelID = personnelIDs[counter]

    execSPInsert('ha+/yKdfgIFvAaBpvMNyJ2WN19tt/Wgwi+Y+ydYDEkM='/*SPF_PersonnelSalaryCalculation*/, false, false, null,
        { SalaryType: salaryType, CompanyID: companyID, PersonnelID: personnelID, Date: parseInt(date) }, null, false,
        function () {
            counter++;
            maskTextEl.innerText = Ext.String.format('تعداد کل: {0} | افراد محاسبه شده: {1} | افراد باقیمانده: {2}', personnelIDs.length, counter, personnelIDs.length - counter);

            if (personnelIDs.length == counter) {


                showMsgInfo('محاسبه گروهی فیش با موفقیت انجام شد', 'محاسبه گروهی فیش', 'success', true/*closable*/, false/*autoHide*/)
                grid.up('#TabPersonnelGroupCalc').unmask();
                counter = 0;
                personnelIDs = [];
                personnelsName = [];
                maskTextEl = null;
                return;
            }
            else {
                groupSalaryCalculation(grid)
            }

        },
        {
            msg: Ext.String.format('محاسبه فیش {0} تمام شد', personnelsName[counter]),
            title: 'محاسبه فیش',
            isShow: false
        }
    )



}

function groupSalaryCalcDelete(grid) {

    var gridGroupCalc = grid.prev('grid')
    var salaryType = gridGroupCalc.down('#ddlGroupCalc_SalaryTypes')
    var salaryTypeID = salaryType.value;
    if (isNullOrEmpty(salaryTypeID)) {

        showMsgInfo('نوع فیش انتخاب نشده است', 'خطا', 'danger', false/*closable*/, true/*autoHide*/)
        return
    }

    confirmMsg(' حذف گروهی فیش ' + salaryType.getSelection().data.Title, 'ایا مطمئن هستید ؟', function (btn) {
        if (btn == 'yes') {


            var date = gridGroupCalc.down('#ddlGroupCalc_Year').value + gridGroupCalc.down('#ddlGroupCalc_Month').value



            var personnelsID = getRowsGrid(grid, 'ID')

            if (isNullOrEmpty(personnelsID) || personnelsID.length == 0) {

                showMsgInfo('هیچ پرسنلی برای حذف فیش انتخاب نشده است', 'خطا', 'danger', false/*closable*/, true/*autoHide*/)
                return
            }
            var tabPanel = grid.up('#TabPersonnelGroupCalc')
            var mask = showMask(tabPanel, 'در حال حذف ...', false);

            execSPDelete('VcsCydpJtP48AbE1/VDX8SOynXdRmj8lCvUjVCVB1EU='/*SPF_GroupSalaryCalcDelete*/,
                { SalaryType: salaryTypeID, CompanyID: companyID, PersonnelIDs: personnelsID, Date: parseInt(date) }, null, function (success) {

                    if (success)
                        showMsgInfo('حذف محاسبه فیش با موفقیت انجام شد', 'حذف محاسبه فیش', 'success', false/*closable*/, true/*autoHide*/)
                    mask.unmask();

                }, { isShow: false })

        }

    });

}

function groupSalaryCalcConfirm(grid, status) {

    // var maskText
    var statusTitle = status == 8 ? 'تایید' : 'برگشت از تایید';
    var gridGroupCalc = grid.prev('grid')
    var salaryType = gridGroupCalc.down('#ddlGroupCalc_SalaryTypes');
    var salaryTypeID = salaryType.value;
    var date = gridGroupCalc.down('#ddlGroupCalc_Year').value + gridGroupCalc.down('#ddlGroupCalc_Month').value

    if (isNullOrEmpty(salaryTypeID)) {

        showMsgInfo('نوع فیش انتخاب نشده است', 'خطا', 'danger', false/*closable*/, true/*autoHide*/)
        return
    }

    if (isNullOrEmpty(personnelIDs) || personnelIDs.length == 0) {

        personnelIDs = getRowsGrid(grid, 'ID')


        if (isNullOrEmpty(personnelIDs) || personnelIDs.length == 0) {
            showMsgInfo('هیچ پرسنلی برای ' + statusTitle + ' فیش انتخاب نشده است', 'خطا', 'danger', false/*closable*/, true/*autoHide*/)
            return
        }

        //personnelsName = getRowsGrid(grid, 'FullName')
        // personnelsName.forEach(function (item, i) { personnelsName[i] = '<span style="font-weight: bold !important">' + item + '</span>' });



        confirmMsg(statusTitle + ' گروهی فیش ' + salaryType.getSelection().data.Title, 'ایا مطمئن هستید ؟', function (btn) {
            if (btn == 'yes') {

                var tabPanel = grid.up('#TabPersonnelGroupCalc')
                tabPanel.mask('در حال تایید فیش...');
                var maskTextEls = tabPanel.el.query("div.x-mask-msg-text")
                maskTextEl = maskTextEls[maskTextEls.length - 1];
                groupConfirmSalary()
            }
            else {
                counter = 0;
                personnelIDs = [];
                personnelsName = [];
                maskTextEl = null;
                return;
            }
        })

    }
    else
        groupConfirmSalary();

    function groupConfirmSalary() {

        var personnelID = personnelIDs[counter]
        execSPUpdate('HX/gwH5uTX0qdd/VR2UDXMkyswG04EslRGkoZbiECYY='/*SPF_ConfirmPersonnelSalary*/, null,
            { CompanyID: companyID, PersonnelID: personnelID, SalaryTypeID: salaryTypeID, Date: date, Status: status }, null, false, true, false,
            function () {
                counter++;
                maskTextEl.innerText = Ext.String.format('تعداد کل: {0} | فیش های {3} شده: {1} | فیش های باقیمانده: {2}', personnelIDs.length, counter, personnelIDs.length - counter, statusTitle);

                if (personnelIDs.length == counter) {

                    showMsgInfo(statusTitle + 'گروهی فیش با موفقیت انجام شد ', salaryType.getSelection().data.Title + statusTitle + ' گروهی فیش ', 'success', true/*closable*/, false/*autoHide*/)
                    grid.up('#TabPersonnelGroupCalc').unmask();
                    counter = 0;
                    personnelIDs = [];
                    personnelsName = [];
                    maskTextEl = null;
                    return;
                }
                else {
                    groupSalaryCalcConfirm(grid)
                }
            }, { isShow: false })
    }
}

function loadReportDesigner(panel, src, subSystem, reportTypeID) {

    var tree = panel.up().down('treepanel');

    //panel.loader = Ext.create('Ext.ComponentLoader',
    //    {
    //        loadMask: { showMask: true, msg: 'در حال بارگذاری ...' },
    //        renderer: "frame",
    //        url: src,
    //        target: panel,
    //        autoLoad: true
    //    })
    Ext.create('Ext.Component', {
        autoEl: {
            tag: "iframe",
            id: "iframeReportDesigner",
            src: src,
            style: {
                width: '100%',
                height: '100%',
            }
        },
        id: "iframeReportDesigner",
        frame: false,
        border: false,
        frameborder: 0,
        renderTo: panel.getBody(),
        layout: "fit",
        // region: "center"

    });
    //panel.items.add(component);
    getReports(tree, subSystem, reportTypeID)
}

function getReports(tree, subSystem, reportTypeID) {
    var mask = showMask(tree, 'در حال بارگذاری ...', true);
    execSPSelect('7L0X8KxwuFtG429Zv6pW6A=='/*SPS_GetReports*/, { CompanyID: companyID, SubSystem: subSystem, ReportTypeID: reportTypeID }, null, null, null, function (items) {

        treePanelBinder(tree, items, 'Title', 'ID', null, false, 'Vcard')
        mask.unmask();

    })

}

function loadReport(treeview, rowNo, colNo, btnCommand, event, record) {

    var tree = treeview.up()
    selectRowGrid(tree, rowNo)
    var isLeaf = record.data.leaf;

    if (isLeaf) {
        var iframe = tree.next('panel').el.down('iframe').dom
        iframe.src = addParamQueryString(iframe.src, { Mode: '1'/*Get report*/, paramsJson: Ext.encode({ ID: parseInt(record.data.id) }) });
    }

    //Ext.String.format('ReportDesigner.aspx?spName={0}&paramsJson={1}', '7L0X8KxwuFvKjN0lpmGeuQ==', Ext.encode({ ID: parseInt(data.data.id) }))
    //App.direct.LoadReport('7L0X8KxwuFvKjN0lpmGeuQ==', Ext.encode({ ID: data.data.id }))
    //Ext.net.DirectMethod.request('LoadReport', {

    //    //params: {
    //    //    paramsJson: Ext.encode({ ID: data.data.id }),
    //    //    spName: '7L0X8KxwuFvKjN0lpmGeuQ=='
    //    //},
    //    specifier: 'public',
    //    method: 'GET',
    //    url: Ext.String.format('ReportDesigner.aspx?spName={0}&paramsJson={1}', '7L0X8KxwuFvKjN0lpmGeuQ==', Ext.encode({ ID: parseInt(data.data.id) })),
    //    type: 'load',
    //    cleanRequest: true
    //})
}

function deleteReport(treeview, rowNo, colNo, btnCommand, event, record) {

    var tree = treeview.up()
    selectRowGrid(tree, rowNo)
    var id = record.data.id

    if (id > 0) {

        confirmMsg('حذف گزارش', 'ایا مطمئن هستید ؟', function (btn) {
            if (btn == 'yes') {
                //var mask = showMask(tree, 'در حال حذف ...', true);
                execSPDelete('WMJd6lHsVzVSI1/ZfzUwD8E+NsO9ca3Q'/*SPS_ReportUpdate*/, { CompanyID: companyID, ID: id }, tree, function () {

                    removeRecordGrid(tree, null)
                }, null)
            }

        })

    }
    //execSPUpdate('WMJd6lHsVzVSI1/ZfzUwD8E+NsO9ca3Q'/*SPS_ReportUpdate*/, null,
    //  { CompanyID: companyID, PersonnelID: personnelID, SalaryTypeID: salaryTypeID, Date: date, Status: status }, null, false, true, false,
    //             function () {

    //             }, { isShow: false })
}

function renameReportEditing(treeview, rowNo, colNo, btnCommand, event, record) {
    var tree = treeview.up()
    editRecordGrid(tree, record)
}
function renameReport(plugin, row) {

    var id = row.record.data.id
    var title = row.record.data.text
    var preTitle = row.record.data.preTitle

    if (title !== preTitle) {

        if (id > 0) {

            confirmMsg('تغییر نام گزارش', 'ایا مطمئن هستید ؟', function (btn) {
                if (btn == 'yes') {
                    row.record.data.preTitle = title
                    //var mask = showMask(row.view.up(), 'در حال ویرایش ...', true);
                    execSPUpdate('WMJd6lHsVzVSI1/ZfzUwD8E+NsO9ca3Q'/*SPS_ReportUpdate*/, null, { CompanyID: companyID, ID: id, Title: title }, row.view.up(), false, true, false, null, null)
                }
                else {
                    row.record.data.text = preTitle
                    row.value = preTitle;
                    row.row.querySelector('.x-tree-node-text').innerText = preTitle
                    //row.row.innerText = preTitle;//x-tree-node-text
                }
            })

        }
    }
}


function getTaxInsuranceGroup(ctrl, type) {


    var mask

    if (ctrl.xtype == 'grid')
        mask = showMask(ctrl, 'درحال بارگذاری...', false);

    execSPSelect('BjaxtKr4YqOdDV0wIQuIcqQyYqtcqZCj6A6bU+Sau0g='/*SPF_GetTaxInsuranceGroup*/, { CompanyID: companyID, Type: type }, null, null, null, function (items) {


        if (ctrl.xtype == 'grid') {
            ctrl.store.loadData(items);
            mask.unmask();
        }
        else if (ctrl.xtype == 'combobox') {
            comboBoxBindStore(ctrl, 'Title', 'ID', 'int')
            ctrl.store.loadData(items);
            ctrl.select(ctrl.getStore().getAt(0));
            ctrl.fireEvent('select', ctrl, ctrl.store.data.items[0]);
        }

    })
}
function editTaxInsuranceGroup(record) {

    var id = record.context.record.data.ID
    var editMode
    var grid = record.grid

    var editMode = id > 0 ? 'Edit' : 'Add'
    //var mask = showMask(grid, 'در حال ذخیره...', false)
    var title = record.context.record.data.Title
    var type = parseInt(record.context.record.data.TypeTitle)
    if (editMode == 'Add') {

        execSPInsert('QpiIuHYWXX/F2rFimqOKEzSwcqSUzaDpYNPW6t0nm1g='/*SPF_TaxInsuranceGroupUpdate*/, false, false, grid,
            { CompanyID: companyID, Title: title, Type: type }, grid, false, function () {
                getTaxInsuranceGroup(grid)
            })

    }
    else if (editMode == 'Edit') {

        execSPUpdate('QpiIuHYWXX/F2rFimqOKEzSwcqSUzaDpYNPW6t0nm1g='/*SPF_TaxInsuranceGroupUpdate*/, grid, { CompanyID: companyID, ID: id, Title: title, Type: type }, mask, false, true, false, function () {
            getTaxInsuranceGroup(grid)
        })

    }

}

function deleteTaxInsuranceGroup(record, grid) {


    var id = record.data.ID
    confirmMsg(' حذف عامل ', 'ایا مطمئن هستید ؟', function (btn) {
        if (btn == 'yes') {
            //var mask = showMask(grid, 'در حال حذف...', false);
            execSPDelete('QpiIuHYWXX/F2rFimqOKEzSwcqSUzaDpYNPW6t0nm1g='/*SPF_TaxInsuranceGroupUpdate*/, { CompanyID: companyID, ID: id }, grid,
                function (success) {
                    if (success)
                        removeRecordGrid(grid, record)

                })
        }

    });
}


function changeInsuranceFactor(ddlYear, ddlMonth, ddlInsuranceGroup) {


    //var id = record.data.ID
    var fillControl = ddlYear.up('panel')//.down('#fpInsuranceFactors')
    //var mask = showMask(fillControl, 'در حال حذف...', false);

    execSPSelect('FgFKr9w99h7ue2uQrq9TGzgssZ3gtoi6'/*SPF_GetInsurance*/, { CompanyID: companyID, ExecuteDate: parseInt(ddlYear.value + ddlMonth.value), TaxInsuranceGroupID: ddlInsuranceGroup.value },
        fillControl, fillControl, null, null)
}

function editInsuranceFactor(panel) {

    var execDate = parseInt(panel.down('#ddlYearIG').value + panel.down('#ddlMonthIG').value);

    if (execDate < getCurrentDate(4, false)) {
        showMsgInfo('سال یا ماه انتخابی نمیتواند قبل از سال و ماه جاری باشد', 'خطا', 'danger', false/*closable*/, true/*autoHide*/)
        return
    }



    var insType = panel.down('#ddlTypeIG').value
    var EmpPercent = panel.down('#txt_EmployerPercent').value
    var perPercent = panel.down('#txt_PersonnelPercent').value
    var unempPercent = panel.down('#txt_UnemploymentPercent').value
    var insuranceLimit = panel.down('#txt_InsuranceLimit').value
    var itemsID = ''
    var checkboxGroup = panel.down('#chkgInsurance_ItemsID')
    itemsID = checkboxGroup.getChecked(true)

    //Ext.Array.filter(checkboxGroup.items.items, function (item) {
    //    return item.value
    //}).forEach(function (item) { itemsID = itemsID + item.inputValue.toString() + ','; })


    var obj = {
        CompanyID: companyID,
        ExecuteDate: execDate,
        TaxInsuranceGroupID: insType,
        EmployerPercent: EmpPercent,
        PersonnelPercent: perPercent,
        UnemploymentPercent: unempPercent,
        InsuranceLimit: parseInt(insuranceLimit.replace(',', '')),
        ItemsID: itemsID
    }


    //var mask = showMask(panel, 'در حال ذخیره...', false)
    execSPInsert('wFACvZqRxWuntI/v5BvNvfPMp2uSUpap'/*SPF_InsuranceUpdate*/, false, false, null, obj, panel, false, null, null)


}
//---------------------------------------------------------------جدول مالیاتی
function changeTaxTable(ddlYear, ddlMonth, ddlTaxGroup) {


    //var id = record.data.ID
    var fillControl = ddlYear.up('panel')//.down('#fpInsuranceFactors')
    //var mask = showMask(fillControl, 'در حال حذف...', false);

    execSPSelect('BjaxtKr4YqMHM6wO4aZ0OQ=='/*SPF_GetTaxTable*/, { CompanyID: companyID, ExecuteDate: parseInt(ddlYear.value + ddlMonth.value), TaxInsuranceGroupID: ddlTaxGroup.value },
        fillControl, fillControl, null, null)
}

function editTaxTable(record, topPanel) {

    var panel = topPanel ? topPanel : record.grid.up('#TabTaxTables')
    var execDate = parseInt(panel.down('#ddlYearTG').value + panel.down('#ddlMonthTG').value);
    var mask

    if (execDate < getCurrentDate(4, false)) {
        showMsgInfo('سال یا ماه انتخابی نمیتواند قبل از سال و ماه جاری باشد', 'خطا', 'danger', false/*closable*/, true/*autoHide*/)
        return
    }

    var taxType = panel.down('#ddlTypeTG').value
    var itemsID = ''
    var checkboxGroup = panel.down('#chkgTaxTable_ItemsID')
    itemsID = checkboxGroup.getChecked(true)

    if (!isNullOrEmpty(topPanel)) {
        //mask = showMask(panel, 'در حال ذخیره...', false)
        var obj = {
            CompanyID: companyID,
            ExecuteDate: execDate,
            TaxGroupID: taxType,
            ItemsID: itemsID
        }
        execSPUpdate('sWUFIt4wtMY1IOFLssymxnv06w5svRCK'/*SPF_TaxTableUpdate*/, null, obj, panel, false, true, false, null)
        return
    }

    data = record.context.record.data
    var id = data.ID
    var editMode
    var editMode = id > 0 ? 'Edit' : 'Add'


    var fromValue = replace(data.FromValue, ',', '', true)
    var toValue = replace(data.ToValue, ',', '', true)
    var taxPercent = data.TaxPercent


    //Ext.Array.filter(checkboxGroup.items.items, function (item) {
    //    return item.value
    //}).forEach(function (item) { itemsID = itemsID + item.inputValue.toString() + ','; })


    var obj = {
        ID: id,
        CompanyID: companyID,
        ExecuteDate: execDate,
        TaxGroupID: taxType,
        TaxPercent: taxPercent,
        FromValue: fromValue,
        ToValue: toValue,
        ItemsID: itemsID
    }


    //mask = showMask(panel, 'در حال ذخیره...', false)
    if (editMode === 'Add')
        execSPInsert('sWUFIt4wtMY1IOFLssymxnv06w5svRCK'/*SPF_TaxTableUpdate*/, false, false, null, obj, panel, false, null, null)
    else
        execSPUpdate('sWUFIt4wtMY1IOFLssymxnv06w5svRCK'/*SPF_TaxTableUpdate*/, null, obj, panel, false, true, false, null)


}

function deleteTaxTaxTable(record, grid) {

    var id = record.data.ID
    confirmMsg('حذف', 'ایا مطمئن هستید ؟', function (btn) {
        if (btn == 'yes') {
            //var mask = showMask(grid, 'در حال حذف...', false);
            execSPDelete('sWUFIt4wtMY1IOFLssymxnv06w5svRCK'/*SPF_TaxTableUpdate*/, { CompanyID: companyID, ID: id }, grid,
                function (success) {
                    if (success)
                        removeRecordGrid(grid, record)

                })
        }

    });
}


