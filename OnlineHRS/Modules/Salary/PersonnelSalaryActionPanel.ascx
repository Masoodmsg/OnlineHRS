<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<ext:Toolbar runat="server">
    <Items>
        <ext:Button runat="server" Text="صدور و ویرایش فیش" Icon="VcardAdd" Handler="showPersonnelSalarysWindow(this.up('window'),getValueGrid(this.up('grid'), 'ID'))" />
       
    </Items>


</ext:Toolbar>
