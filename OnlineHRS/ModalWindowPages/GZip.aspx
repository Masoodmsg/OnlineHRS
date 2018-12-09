<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GZip.aspx.cs" Inherits="OnlineHRS.ModalWindowPages.GZip" ValidateRequest="false" EnableEventValidation="false" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../Assets/gzip.js"></script>
    <script>
        function unZip(mode) {

            var gzip = document.getElementById('TextBox1').value
            var resualt = document.getElementById('TextBox2')
            if (mode == 1)
                resualt.value = JSONC.unpack(gzip, true)
            if (mode == 2)
                resualt.value = JSONC.unpack(gzip, false)
            if (mode == 3)
                resualt.value = JSONC.decompress(gzip)
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <%--<textarea name="TextBox1" rows="2" cols="20" id="TextBox1" style="margin: 0px; width: 717px; height: 284px;" runat="server">

        </textarea>--%>
        <asp:TextBox  TextMode="MultiLine"  ID="TextBox1" style="margin: 0px; width: 717px; height: 284px;" runat="server" >

        </asp:TextBox>
        
        <input   type="button" name="Button1" value="Unpack 1" onclick="unZip(1);" id="Button1">
        <input   type="button" name="Button2" value="Unpack 2" onclick="unZip(2);" id="Button2">
        <input type="button" name="Button3" value="Decompress" onclick="unZip(3);" id="Button3">

        <textarea name="TextBox2" rows="2" cols="20" id="TextBox2"></textarea>
    <div>
    
    </div>
        <asp:Button ID="Button4" runat="server" Text="Compress String" OnClick="Button4_Click" />
    </form>
</body>
</html>
