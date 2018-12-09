<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<ext:Toolbar runat="server">
    <Items>
        <ext:Button runat="server" Text="صدور و ویرایش حکم" Icon="PencilAdd" Handler="showPersonnelSentencesWindow(this.up('window'),this.up('grid'))" />
       
    </Items>


</ext:Toolbar>
