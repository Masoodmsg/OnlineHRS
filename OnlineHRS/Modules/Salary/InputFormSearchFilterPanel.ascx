<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>

<ext:FormPanel runat="server" RTL="true" BodyPadding="5" AnimCollapse="true" AutoScroll="true"
            Title="فیلتر عوامل" Icon="UserMagnify">
    <LayoutConfig>
        <ext:TableLayoutConfig Columns="3" ItemCls="width-full" />
    </LayoutConfig>
    <FieldDefaults LabelAlign="Top" />
    <Items>
        <ext:TagField MultiSelect="true" TabIndex="0" ID="tagIFIF_Item" runat="server" FieldLabel="عوامل" >

            <Listeners>
                <AfterRender Handler="getInputFormItems(this)" />
            </Listeners>
        </ext:TagField>

        <ext:TextField runat="server" ID="tagIFIF_ExecuteDate" FieldLabel="تاریخ اجرا" Icon="Date" RTL="false" LabelStyle="direction:rtl"
            Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="1" InputMaskString="9999/99/99">
           <%-- <Plugins>
                <ext:InputMask runat="server" Mask="yzzz/mn/dt" AllowInvalid="true">
                    <MaskSymbols>
                        <ext:MaskSymbol Name="d" Regex="[0123]" Placeholder="D" />
                        <ext:MaskSymbol Name="t" Regex="[0-9]" Placeholder="D" />
                        <ext:MaskSymbol Name="m" Regex="[01]" Placeholder="M" />
                        <ext:MaskSymbol Name="n" Regex="[0-9]" Placeholder="M" />
                        <ext:MaskSymbol Name="y" Regex="[1]" Placeholder="Y" />
                        <ext:MaskSymbol Name="z" Regex="[0-9]" Placeholder="Y" />
                    </MaskSymbols>
                </ext:InputMask>
            </Plugins>--%>

        </ext:TextField>

        <ext:TextField runat="server" ID="tagIFIF_CloseDate" FieldLabel="تاریخ پایان" Icon="Date" RTL="false" LabelStyle="direction:rtl"
            Vtype="isValidDate" VtypeText="تاریخ نامعتبر است" FieldStyle="text-align:center" TabIndex="2" InputMaskString="9999/99/99">
            <%--<Plugins>
                <ext:InputMask runat="server" Mask="yzzz/mn/dt" AllowInvalid="true">
                    <MaskSymbols>
                        <ext:MaskSymbol Name="d" Regex="[0123]" Placeholder="D" />
                        <ext:MaskSymbol Name="t" Regex="[0-9]" Placeholder="D" />
                        <ext:MaskSymbol Name="m" Regex="[01]" Placeholder="M" />
                        <ext:MaskSymbol Name="n" Regex="[0-9]" Placeholder="M" />
                        <ext:MaskSymbol Name="y" Regex="[1]" Placeholder="Y" />
                        <ext:MaskSymbol Name="z" Regex="[0-9]" Placeholder="Y" />
                    </MaskSymbols>
                </ext:InputMask>
            </Plugins>--%>

        </ext:TextField>
    </Items>


</ext:FormPanel>
