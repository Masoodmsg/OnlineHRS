<%@ Control Language="C#" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>
<script runat="server">

    protected void Page_Load(object sender, EventArgs e)
    {


        string personnelActionInfo = ((UserControl)sender).ID;
        btnPersonnelSearch.ID = Guid.NewGuid().ToString();

        if (!string.IsNullOrEmpty(personnelActionInfo))
        {
            string[] filters = personnelActionInfo.Split(';');
            string path = filters[0];
            if (!string.IsNullOrEmpty(path))
            {
                FormPanel filterPanel = Ext.Net.Utilities.ControlUtils.FindControl<Ext.Net.FormPanel>(this.LoadControl(path));
                PPSFilter.Items.Add(filterPanel);
            }


            if (filters.Length > 1 && !string.IsNullOrEmpty(filters[1]))
                btnPersonnelSearch.Listeners.Click.Handler = filters[1].Contains("this.up('form')") ? filters[1] : filters[1] + "(this.up('form'))";


            if (filters.Length > 2 && !string.IsNullOrEmpty(filters[2]))
                PPSFilter.ID = filters[2];


        }

    }
</script>

<ext:FormPanel runat="server" Layout="Accordion" RTL="true" ID="PPSFilter"
    Region="North" Split="true" Title="جستجو" Icon="Find" AnimCollapse="true" Cls="filter">

    <LayoutConfig>
        <ext:AccordionLayoutConfig Animate="true" Multi="true" ReserveScrollbar="true" />
    </LayoutConfig>

    <Items>
        <ext:FormPanel runat="server" Layout="TableLayout" RTL="true" BodyPadding="5" AnimCollapse="true" AutoScroll="true"
            Title="فیلتر اطلاعات فردی" Icon="UserMagnify">
            <%--BodyStyle="background:#f1f1f1"--%>
            <LayoutConfig>
                <ext:TableLayoutConfig Columns="4" ItemCls="width-full" />
            </LayoutConfig>
            <FieldDefaults LabelAlign="Top" />
            <Items>
                <ext:TextField ID="FullName" TabIndex="0" runat="server" FieldLabel="نام و نام خانوادگی" IDMode="Parent" />
                <ext:TextField ID="Code" TabIndex="1" runat="server" FieldLabel="کد پرسنلی" IDMode="Parent" MaskRe="/[0-9-]/" />
                <ext:TextField ID="NationalCode" TabIndex="2" runat="server" FieldLabel="کد ملی" IDMode="Parent" MaxLength="10" Vtype="isValidNationalCode" VtypeText=".کد ملی نامعتبر است" EnforceMaxLength="true" MaskRe="/[0-9-]/" MinLength="10" MinLengthText="این فیلد باید 10 رقم باشد" />
                <ext:ComboBox Editable="false" TabIndex="3" ID="Sex" runat="server" FieldLabel="جنسیت" IDMode="Parent">
                    <Items>
                        <ext:ListItem Text="همه" Value="-1" />
                        <ext:ListItem Text="مرد" Value="1" />
                        <ext:ListItem Text="زن" Value="2" />
                    </Items>
                    <SelectedItems>
                        <ext:ListItem Value="-1" />
                    </SelectedItems>
                </ext:ComboBox>
                <ext:ComboBox Editable="false" TabIndex="4" ID="StatusType" runat="server" FieldLabel="وضعیت اشتغال" IDMode="Parent">

                    <Items>
                        <ext:ListItem Text="همه" Value="-1" />
                        <ext:ListItem Text="شاغل" Value="1" />
                        <ext:ListItem Text="غیر شافل" Value="2" />
                    </Items>
                    <SelectedItems>
                        <ext:ListItem Value="-1" />
                    </SelectedItems>
                </ext:ComboBox>

                <ext:TagField MultiSelect="true" Editable="false" TabIndex="5" ID="EducationGrade" runat="server" FieldLabel="مدرک تحصیلی" IDMode="Parent">

                    <Listeners>
                        <AfterRender Handler=" comboBoxConstantBinder(this, 'EducationGrade', 'GradeType', 1, 'Value')" />
                    </Listeners>
                </ext:TagField>

                <ext:TagField MultiSelect="true" Editable="false" TabIndex="6" ID="MarriedStatus" runat="server" FieldLabel="وضعیت تاهل" IDMode="Parent">

                    <Listeners>
                        <AfterRender Handler=" comboBoxConstantBinder(this, 'BaseInfo', 'MarriedStatus', 1, 'ID')" />
                    </Listeners>
                </ext:TagField>
                <ext:TagField MultiSelect="true" Editable="false" TabIndex="7" ID="InsuranceType" runat="server" FieldLabel="نوع بيمه" IDMode="Parent">

                    <Listeners>
                        <AfterRender Handler=" comboBoxConstantBinder(this, 'BaseInfo', 'InsuranceType', 1, 'ID')" />
                    </Listeners>
                </ext:TagField>
                <ext:TagField MultiSelect="true" Editable="false" TabIndex="8" ID="ContractBy" runat="server" FieldLabel="طرف قرارداد" IDMode="Parent">

                    <Listeners>
                        <AfterRender Handler="comboBoxConstantBinder(this, 'BaseInfo', 'ContractBy', 1, 'ID')" />
                    </Listeners>
                </ext:TagField>
                <ext:TagField MultiSelect="true" Fixed="true" Editable="false" TabIndex="9" ID="JobStatus" runat="server" FieldLabel="وضعیت شغلی" IDMode="Parent">
                    <Listeners>
                        <AfterRender Handler="comboBoxJobStatusBinder(this)" />

                    </Listeners>
                </ext:TagField>
                <ext:TagField MultiSelect="true" Editable="false" Floating="false" TabIndex="10" ID="EmploymentType" runat="server" FieldLabel="نوع استخدام" IDMode="Parent">
                    <Listeners>
                        <AfterRender Handler="comboBoxConstantBinder(this, 'BaseInfo', 'EmploymentType', 1, 'ID')" />

                    </Listeners>
                </ext:TagField>
            </Items>
        </ext:FormPanel>

        <ext:FormPanel runat="server" Layout="TableLayout" RTL="true" Border="false" Collapsed="true"
            Title="فیلتر ساختار" Icon="ChartOrganisation" BodyPadding="10">
            <LayoutConfig>
                <ext:TableLayoutConfig Columns="4" ItemCls="width-full" />
            </LayoutConfig>
            <FieldDefaults LabelAlign="Top" />
            <Items>
                <ext:ComboBox Editable="false" TabIndex="4" ID="PostActivityType" runat="server" FieldLabel="صفی/ستادی" IDMode="Parent">

                    <Items>
                        <ext:ListItem Text="همه" Value="-1" />
                        <ext:ListItem Text="صفی" Value="1" />
                        <ext:ListItem Text="ستادی" Value="2" />
                    </Items>
                    <SelectedItems>
                        <ext:ListItem Value="-1" />
                    </SelectedItems>
                </ext:ComboBox>
                <ext:TextField runat="server" IDMode="Parent" ID="Organization" FieldLabel="محل خدمت" Editable="false">
                    <Triggers>
                        <ext:FieldTrigger Icon="Search" Handler="(new OrganizitionTreeSelect(this.up('[cls=personnel-search]'),this)).show()" />
                    </Triggers>
                </ext:TextField>
                <%--<ext:UserControlLoader ColSpan="2" Path="~\Modules\Company\ComboPostTitles.ascx" runat="server"  />--%>
                <ext:TagField MultiSelect="true" Fixed="true" Editable="false" TabIndex="9" ID="PostTitle" runat="server" IDMode="Parent"
                    FieldLabel="عنوان پست" TypeAhead="true" ColSpan="2" EmptyText="جستجو پست" RTL="true">
                    <Listeners>
                        <AfterRender Handler="comboBoxPostTitleBinder(this)" />

                    </Listeners>
                </ext:TagField>
            </Items>
        </ext:FormPanel>
    </Items>
    <Buttons>

        <ext:Button Text="جستجو" runat="server" Icon="Zoom" ID="btnPersonnelSearch" >
            <Listeners>
                <Click Handler="personnelSearch(this.up('form'),1)" />
            </Listeners>
        </ext:Button>
    </Buttons>
    <%--<KeyMap runat="server">
        <Binding>
         
            <ext:KeyBinding Handler="personnelSearch(this.up('form'),1)">
                <Keys>
                    <ext:Key Code="ENTER" />
                </Keys>
            </ext:KeyBinding>
        </Binding>
    </KeyMap>--%>
    <KeyMap runat="server">
        <ext:KeyBindItem Handler="personnelSearch(this.up('form'),1)" Key="ENTER" />

    </KeyMap>
</ext:FormPanel>

