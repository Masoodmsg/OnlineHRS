<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<ext:GridPanel
    runat="server"
    Region="Center"
    Title="نقش ها"
    MultiSelect="false"
    IDMode="Parent"
    ID="gridRoles">
    <Store>
        <ext:Store
            runat="server">
            <Model>
                <ext:Model runat="server">
                    <Fields>
                        <ext:ModelField Name="Title" />
                        <ext:ModelField Name="ID" Type="Int" />
                        <ext:ModelField Name="UserID" Type="Int" />
                    </Fields>
                </ext:Model>
            </Model>
            <Proxy>
                <ext:AjaxProxy>
                    <Reader>
                        <ext:JsonReader>
                        </ext:JsonReader>
                    </Reader>
                </ext:AjaxProxy>
            </Proxy>
        </ext:Store>
    </Store>
    <SelectionModel>

        <ext:CheckboxSelectionModel runat="server" RowSpan="2">
            <Listeners>
                <BeforeDeselect Fn="rowDeselectEvent" />
            </Listeners>
        </ext:CheckboxSelectionModel>
    </SelectionModel>
    <ColumnModel runat="server">

        <Columns>

            <%--<ext:Column
                runat="server"
                Text=""
                Sortable="true"
                DataIndex="ID"
                Flex="1" Hidden="true" Width="3">
            </ext:Column>--%>
            <ext:Column
                runat="server"
                Text=""
                DataIndex="UserID"
                Flex="1" Hidden="true" Width="3">
            </ext:Column>
            <ext:Column
                runat="server"
                Text="نام نقش"
                Sortable="true"
                DataIndex="Title"
                Flex="1">
            </ext:Column>
        </Columns>
    </ColumnModel>
    <Listeners>
        <AfterRender Handler="gridRolesDataBind(this)"></AfterRender>
        <RowMouseUp Fn="rowMouseUpEvent" />
    </Listeners>
</ext:GridPanel>
