using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace OnlineHRS.ModalWindowPages
{
    public partial class GZip : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button4_Click(object sender, EventArgs e)
        {
            TextBox1.Text = Utility.Helper.CompressString(TextBox1.Text)+"_____"+ Utility.Helper.ZipStr(TextBox1.Text);
        }
    }
}