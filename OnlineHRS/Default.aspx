<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="OnlineHRS.Default" EnableSessionState="ReadOnly" EnableViewState="false" %>

<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

   <%-- <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />--%>

    <link type="text/css" rel="stylesheet" href="/uipack/gray/extui-gray-all-rtl-css3-embedded-css/ext.axd?v=4.1.0" />
    <link href="Resources/IconShortcuts/desktop.css?ver=1" rel="stylesheet" />
    <link href="Assets/calendar.css" rel="stylesheet" />
    <%-- <script src="Assets/gzip.js"></script>--%>
    <script src="Assets/EntityClasses.js"></script>
    <script src="Assets/FarsiType.js"></script>
    <script src="Assets/ExcelExportGrid.js"></script>
   <%-- <script src="Assets/persian-date.js"></script>--%>
    <script src="Assets/persian-date-debug.js"></script>

    <script src="Assets/utility.js?ver=1"></script>
    <script src="Assets/salary.js?ver=1"></script>
    <script src="Assets/ModalWindows.js?ver=1"></script>
    <script src="Assets/attendance.js?ver=1"></script>
    <script src="Assets/calendarPanel.js?ver=1"></script>
    
    <%-- <script src="Assets/SignalR/jquery-1.6.4.min.js"></script>
    <script src="Assets/SignalR/jquery.signalR-2.2.0.js"></script>
    <script src="/signalr/hubs"></script>
    <script src="Assets/Hubs/companyHub.js"></script>--%>
    <style>
        body, div, form, img, ul, ol, li, dl, dt, dd, table, td, tr, th, input, a, span, label, textarea {
            font: 12px B Yekan,tahoma !important;
        }
    </style>
    <script>
        function sessionEnd() {
            App.direct.SessionEnd();
        }

        Ext.EventManager.on(window, 'beforeunload', function () {
            sessionEnd();
        });

    </script>
</head>
<body onload="setTokenID()">

    <form id="form1" runat="server">
        <ext:ResourceManager ID="ResourceManager1" runat="server" RTL="true" Theme="Gray" AjaxTimeout="3600000"
            ShowWarningOnAjaxFailure="false" DisableViewState="true">
        </ext:ResourceManager>
        <ext:Desktop ID="Desktop1" runat="server">
            <Modules>
                <ext:DesktopModule ModuleID="add1-module">
                    <Shortcut Name="test" X="200" Y="300" Hidden="true" SortIndex="1000">
                    </Shortcut>
                </ext:DesktopModule>
            </Modules>
            <DesktopConfig ID="desktopConfig" WallpaperStretch="true" ShortcutDragSelector="true" DDShortcut="false"
                Wallpaper="Resources/IconShortcuts/world-map.png" SortShortcuts="true" AlignToGrid="true">
                <ShortcutDefaults TextCls="shortcut-text" />
                <ContextMenu>
                    <ext:Menu runat="server">
                        <Items>
                            <%--<ext:MenuItem ID="MenuItem1" runat="server" Text="Change Settings" />--%>
                            <ext:MenuSeparator ID="MenuSeparator1" runat="server" />
                            <ext:MenuItem ID="MenuItem2" runat="server" Text="کاشی" Handler="tile" Icon="ApplicationViewTile" ToolTip="نمایش کاشی پنجره ها" />
                            <ext:MenuItem ID="MenuItem3" runat="server" Text="آبشاری" Handler="cascade" Icon="ApplicationCascade" ToolTip="نمایش آبشاری پنجره ها" />
                            <ext:MenuSeparator ID="MenuSeparator3" runat="server" />
                            <ext:MenuItem ID="MenuItem5" runat="server" Text="تغییر پس زمینه" Handler="authorization('pictureGalleryModule',2)"
                                IconCls="x-menu-icon" />
                            <ext:MenuItem ID="MenuItemFullScreen" runat="server" Text="تمام صفحه" Handler="fullScreenWindow();"
                                IconCls="x-fullscreen16-icon" />
                        </Items>
                    </ext:Menu>
                </ContextMenu>
                <%-- <Content>
                <ext:Image ID="Image1" runat="server" ImageUrl="Resources/IconShortcuts/Desktop.png" StyleSpec="position:absolute;top: 50%;left: 50%;width: 77px; height: 78px;margin-top: -39px; margin-left: -39px;" />
                <ext:Image ID="Image2" runat="server" ImageUrl="Resources/IconShortcuts/powered.png" StyleSpec="position:absolute;right:10px;bottom:20px;width:300px;height:39px;" />
            </Content>--%>
            </DesktopConfig>

            <StartMenu Title="Masood Ghaemi" Icon="Application" Height="300">
                <ToolConfig>
                    <ext:Toolbar runat="server" Width="100">
                        <Items>

                            <ext:Button ID="btnLogout" runat="server" Text="خروج از سایت" IconCls="x-logout-icon"
                                Hidden="true">
                            </ext:Button>
                        </Items>
                    </ext:Toolbar>
                </ToolConfig>
            </StartMenu>
            <TaskBar TrayWidth="100" StyleSpec="z-index:9000000000">
                <QuickStart>
                    <ext:Toolbar ID="Toolbar2" runat="server">
                        <Items>
                            <ext:Button runat="server" Handler="tile" Icon="ApplicationViewTile">
                                <QTipCfg Text="نمایش کاشی پنجره ها" />
                            </ext:Button>
                            <ext:Button runat="server" Handler="cascade" Icon="ApplicationCascade">
                                <QTipCfg Text="نمایش آبشاری پنجره ها" />
                            </ext:Button>
                        </Items>
                    </ext:Toolbar>
                </QuickStart>
                <Tray>
                    <ext:Toolbar runat="server">
                        <Items>

                            <ext:ToolbarFill runat="server" />
                        </Items>
                    </ext:Toolbar>
                </Tray>
            </TaskBar>
            <Listeners>
                <Ready Fn="function() {#{DirectMethods}.SiteLoader(); window.formatPersian = false;}">
                </Ready>
            </Listeners>
        </ext:Desktop>


        <%--<iframe id="downloadFile"  style="display:none"/>--%>
    </form>

</body>

</html>
