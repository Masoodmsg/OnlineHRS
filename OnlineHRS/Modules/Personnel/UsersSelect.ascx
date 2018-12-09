<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<ext:TagField runat="server"  HideSelected="true" TriggerAction="All" TypeAhead="false" EmptyText="جستجو" IDMode="Parent" QueryDelay="1000" >
    <Listeners>
        <BeforeQuery Fn="userSearch"></BeforeQuery>
        <Focus Handler="setCurrentSelectUser(this)"></Focus>
    </Listeners>
</ext:TagField>
