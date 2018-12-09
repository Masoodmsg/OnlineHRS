<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<ext:ComboBox runat="server" AllowBlank="false" BlankText="یک عنوان پست را انتخاب کنید"
    FieldLabel="عنوان پست"  TypeAhead="true" ColSpan="2" EmptyText="جستجو پست" 
      ID="PostTitleID" IDMode="Parent" ValueField="ID" DisplayField="Title">
    <%--ValueField="ID" DisplayField="Title" QueryMode="Local"--%>
   <%-- <Store>
        <ext:Store
            runat="server">
            <Model>
                <ext:Model runat="server">
                    <Fields>
                        <ext:ModelField Name="Title" />
                        <ext:ModelField Name="ID" Type="Int" />

                    </Fields>
                </ext:Model>
            </Model>
        </ext:Store>
    </Store>--%>
    <Listeners>

        <AfterRender Handler="comboBoxPostTitleBinder(this)"></AfterRender>
        <Select Fn="setPostTitleInfo"></Select>
    </Listeners>
</ext:ComboBox>
