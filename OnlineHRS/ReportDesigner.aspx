<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReportDesigner.aspx.cs" Inherits="OnlineHRS.ReportDesigner" %>


<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>
<%@ Register Assembly="Stimulsoft.Report.MobileDesign" Namespace="Stimulsoft.Report.MobileDesign" TagPrefix="sti" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;">
<head runat="server">
    <title></title>
    <%--<script src="https://cdn.sencha.com/ext/commercial/6.2.0/build/ext-all-rtl.js"></script>
    <script src="https://cdn.sencha.com/ext/commercial/6.2.0/build/classic/theme-gray/theme-gray.js"></script>--%>

    <script type="text/javascript">
        var timer
        function start() {
            timer = setInterval(removeTrial, 1000)
        }

        function removeTrial() {
            var gTag
            var gTags = document.querySelectorAll("g[transform]");
            for (var i = 0; gTags.length > i; i++) {
                gTag = gTags[i]
                if (gTag.attributes.length === 1 && gTag.firstChild !== null && gTag.firstChild.attributes[0].value === 'rotate(-45)') {
                    gTag.remove()
                    return;
                    // clearInterval(timer);
                }
            }
        }

    </script>
</head>
<body onload="start()" style="width: 100%; height: 100%;">
    <form id="form1" runat="server" style="width: 100%; height: 100%;">
        <%--   <ext:ResourceManager ID="ResourceManager1"  runat="server" RTL="true" Theme="Gray" AjaxTimeout="3600000" 
               ShowWarningOnAjaxFailure="false" DisableViewState="true" >
        </ext:ResourceManager>--%>
      
      
        <sti:StiMobileDesigner ID="StiMobileDesigner1" runat="server" 
           
            OnCreateReport="StiMobileDesigner1_CreateReport"
            OnGetReport="StiMobileDesigner1_GetReport"
           
            OnPreRender="StiMobileDesigner1_PreRender"
           
            OnSaveReport="StiMobileDesigner1_SaveReport"
          
            InterfaceType="Auto"
            GlobalizationFile="Localization/en.xml" 
            Theme="Office2013WhiteTeal"/>

        <div>
        </div>
    </form>
</body>
</html>
