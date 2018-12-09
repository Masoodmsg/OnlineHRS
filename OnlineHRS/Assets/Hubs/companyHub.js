$(function () {

    var companyHub = $.connection.company;
    
    companyHub.client.savePersonnelPost = function (response) {

        alert(response)

    }

    $.connection.hub.start().done(function () {
       
        function savePersonnelPost(form, editMode) {

            var selectNode = App.TabBusinessAnalysisPost_treePost.selModel.getSelected().items[0].data;

            if (selectNode.NodeType == 2/*پست*/) {

                var values = form.getValues();

                if (!compareDate(values.txtTenureStartDate, values.txtTenureEndDate))
                    return false;

                var mask = showMask(form, 'درحال ذخیره...', false);
                companyHub.server.SavePersonnelPost(dateToNumber({
                    CompanyID: companyID,
                    PostID: selectNode.MainID,
                    PersonnelID: values.cmbPersonnelPostSearch,
                    StartDate: values.txtTenureStartDate,
                    EndDate: values.txtTenureEndDate,
                    IsActive: values.cmbTenureActiveState == 1 ? true : false,
                    PostTypeID: values.cmbPostType,
                }), editMode, App.TabBusinessAnalysisPost_ddlOrgVersioning.value
                )
            }
            else {

                Ext.Msg.info({ ui: 'danger', title: 'خطا', html: 'لطفا یک پست را انتخاب کنید', iconCls: '#Exclamation' });
            }
        }
    })
});