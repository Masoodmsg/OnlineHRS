<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<ext:Toolbar runat="server">
    <Items>
        <ext:Button runat="server" Text="پرسنل جدید" Icon="UserAdd" Handler="personnelEdit('Add',this.up('gridpanel'))" />
        <ext:Button runat="server" Text="ویرایش پرسنل" Icon="UserEdit" Handler="personnelEdit('Edit',this.up('gridpanel'))" />
        <ext:Button runat="server" Text="حذف پرسنل" Icon="UserDelete" Handler="personnelEdit('Delete',this.up('gridpanel'))"  ID="btnPersonnelDelete"/>
    </Items>


</ext:Toolbar>
