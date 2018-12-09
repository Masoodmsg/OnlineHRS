using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineHRS
{
    //public  class Company_Info
    //{
    //    #region Factory Method

    //    /// <summary>
    //    /// Create a new Company_Info object.
    //    /// </summary>
    //    /// <param name="id">Initial value of the ID property.</param>
    //    public static Company_Info CreateCompany_Info(global::System.Int32 id)
    //    {
    //        Company_Info company_Info = new Company_Info();
    //        company_Info.ID = id;
    //        return company_Info;
    //    }

    //    #endregion

    //    #region Simple Properties

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = true, IsNullable = false)]
    //    [DataMemberAttribute()]
    //    public global::System.Int32 ID
    //    {
    //        get
    //        {
    //            return _ID;
    //        }
    //        set
    //        {
    //            if (_ID != value)
    //            {
    //                OnIDChanging(value);
    //                ReportPropertyChanging("ID");
    //                _ID = StructuralObject.SetValidValue(value);
    //                ReportPropertyChanged("ID");
    //                OnIDChanged();
    //            }
    //        }
    //    }
    //    private global::System.Int32 _ID;
    //    partial void OnIDChanging(global::System.Int32 value);
    //    partial void OnIDChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public global::System.String Name
    //    {
    //        get
    //        {
    //            return _Name;
    //        }
    //        set
    //        {
    //            OnNameChanging(value);
    //            ReportPropertyChanging("Name");
    //            _Name = StructuralObject.SetValidValue(value, true);
    //            ReportPropertyChanged("Name");
    //            OnNameChanged();
    //        }
    //    }
    //    private global::System.String _Name;
    //    partial void OnNameChanging(global::System.String value);
    //    partial void OnNameChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public Nullable<global::System.Int16> PersonType
    //    {
    //        get
    //        {
    //            return _PersonType;
    //        }
    //        set
    //        {
    //            OnPersonTypeChanging(value);
    //            ReportPropertyChanging("PersonType");
    //            _PersonType = StructuralObject.SetValidValue(value);
    //            ReportPropertyChanged("PersonType");
    //            OnPersonTypeChanged();
    //        }
    //    }
    //    private Nullable<global::System.Int16> _PersonType;
    //    partial void OnPersonTypeChanging(Nullable<global::System.Int16> value);
    //    partial void OnPersonTypeChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public global::System.String PersonTypeTitle
    //    {
    //        get
    //        {
    //            return _PersonTypeTitle;
    //        }
    //        set
    //        {
    //            OnPersonTypeTitleChanging(value);
    //            ReportPropertyChanging("PersonTypeTitle");
    //            _PersonTypeTitle = StructuralObject.SetValidValue(value, true);
    //            ReportPropertyChanged("PersonTypeTitle");
    //            OnPersonTypeTitleChanged();
    //        }
    //    }
    //    private global::System.String _PersonTypeTitle;
    //    partial void OnPersonTypeTitleChanging(global::System.String value);
    //    partial void OnPersonTypeTitleChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public Nullable<global::System.Int16> LegalPersonType
    //    {
    //        get
    //        {
    //            return _LegalPersonType;
    //        }
    //        set
    //        {
    //            OnLegalPersonTypeChanging(value);
    //            ReportPropertyChanging("LegalPersonType");
    //            _LegalPersonType = StructuralObject.SetValidValue(value);
    //            ReportPropertyChanged("LegalPersonType");
    //            OnLegalPersonTypeChanged();
    //        }
    //    }
    //    private Nullable<global::System.Int16> _LegalPersonType;
    //    partial void OnLegalPersonTypeChanging(Nullable<global::System.Int16> value);
    //    partial void OnLegalPersonTypeChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public global::System.String LegalPersonTypeTitle
    //    {
    //        get
    //        {
    //            return _LegalPersonTypeTitle;
    //        }
    //        set
    //        {
    //            OnLegalPersonTypeTitleChanging(value);
    //            ReportPropertyChanging("LegalPersonTypeTitle");
    //            _LegalPersonTypeTitle = StructuralObject.SetValidValue(value, true);
    //            ReportPropertyChanged("LegalPersonTypeTitle");
    //            OnLegalPersonTypeTitleChanged();
    //        }
    //    }
    //    private global::System.String _LegalPersonTypeTitle;
    //    partial void OnLegalPersonTypeTitleChanging(global::System.String value);
    //    partial void OnLegalPersonTypeTitleChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public global::System.String EmailCompany
    //    {
    //        get
    //        {
    //            return _EmailCompany;
    //        }
    //        set
    //        {
    //            OnEmailCompanyChanging(value);
    //            ReportPropertyChanging("EmailCompany");
    //            _EmailCompany = StructuralObject.SetValidValue(value, true);
    //            ReportPropertyChanged("EmailCompany");
    //            OnEmailCompanyChanged();
    //        }
    //    }
    //    private global::System.String _EmailCompany;
    //    partial void OnEmailCompanyChanging(global::System.String value);
    //    partial void OnEmailCompanyChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public global::System.String AddressCompany
    //    {
    //        get
    //        {
    //            return _AddressCompany;
    //        }
    //        set
    //        {
    //            OnAddressCompanyChanging(value);
    //            ReportPropertyChanging("AddressCompany");
    //            _AddressCompany = StructuralObject.SetValidValue(value, true);
    //            ReportPropertyChanged("AddressCompany");
    //            OnAddressCompanyChanged();
    //        }
    //    }
    //    private global::System.String _AddressCompany;
    //    partial void OnAddressCompanyChanging(global::System.String value);
    //    partial void OnAddressCompanyChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public global::System.String PostCode
    //    {
    //        get
    //        {
    //            return _PostCode;
    //        }
    //        set
    //        {
    //            OnPostCodeChanging(value);
    //            ReportPropertyChanging("PostCode");
    //            _PostCode = StructuralObject.SetValidValue(value, true);
    //            ReportPropertyChanged("PostCode");
    //            OnPostCodeChanged();
    //        }
    //    }
    //    private global::System.String _PostCode;
    //    partial void OnPostCodeChanging(global::System.String value);
    //    partial void OnPostCodeChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public global::System.String EconomicCode
    //    {
    //        get
    //        {
    //            return _EconomicCode;
    //        }
    //        set
    //        {
    //            OnEconomicCodeChanging(value);
    //            ReportPropertyChanging("EconomicCode");
    //            _EconomicCode = StructuralObject.SetValidValue(value, true);
    //            ReportPropertyChanged("EconomicCode");
    //            OnEconomicCodeChanged();
    //        }
    //    }
    //    private global::System.String _EconomicCode;
    //    partial void OnEconomicCodeChanging(global::System.String value);
    //    partial void OnEconomicCodeChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public global::System.String PhoneNumberCompany
    //    {
    //        get
    //        {
    //            return _PhoneNumberCompany;
    //        }
    //        set
    //        {
    //            OnPhoneNumberCompanyChanging(value);
    //            ReportPropertyChanging("PhoneNumberCompany");
    //            _PhoneNumberCompany = StructuralObject.SetValidValue(value, true);
    //            ReportPropertyChanged("PhoneNumberCompany");
    //            OnPhoneNumberCompanyChanged();
    //        }
    //    }
    //    private global::System.String _PhoneNumberCompany;
    //    partial void OnPhoneNumberCompanyChanging(global::System.String value);
    //    partial void OnPhoneNumberCompanyChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public Nullable<global::System.Int16> BranchCode
    //    {
    //        get
    //        {
    //            return _BranchCode;
    //        }
    //        set
    //        {
    //            OnBranchCodeChanging(value);
    //            ReportPropertyChanging("BranchCode");
    //            _BranchCode = StructuralObject.SetValidValue(value);
    //            ReportPropertyChanged("BranchCode");
    //            OnBranchCodeChanged();
    //        }
    //    }
    //    private Nullable<global::System.Int16> _BranchCode;
    //    partial void OnBranchCodeChanging(Nullable<global::System.Int16> value);
    //    partial void OnBranchCodeChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public global::System.String BranchName
    //    {
    //        get
    //        {
    //            return _BranchName;
    //        }
    //        set
    //        {
    //            OnBranchNameChanging(value);
    //            ReportPropertyChanging("BranchName");
    //            _BranchName = StructuralObject.SetValidValue(value, true);
    //            ReportPropertyChanged("BranchName");
    //            OnBranchNameChanged();
    //        }
    //    }
    //    private global::System.String _BranchName;
    //    partial void OnBranchNameChanging(global::System.String value);
    //    partial void OnBranchNameChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public global::System.String TFN
    //    {
    //        get
    //        {
    //            return _TFN;
    //        }
    //        set
    //        {
    //            OnTFNChanging(value);
    //            ReportPropertyChanging("TFN");
    //            _TFN = StructuralObject.SetValidValue(value, true);
    //            ReportPropertyChanged("TFN");
    //            OnTFNChanged();
    //        }
    //    }
    //    private global::System.String _TFN;
    //    partial void OnTFNChanging(global::System.String value);
    //    partial void OnTFNChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public global::System.String WorkshopCode
    //    {
    //        get
    //        {
    //            return _WorkshopCode;
    //        }
    //        set
    //        {
    //            OnWorkshopCodeChanging(value);
    //            ReportPropertyChanging("WorkshopCode");
    //            _WorkshopCode = StructuralObject.SetValidValue(value, true);
    //            ReportPropertyChanged("WorkshopCode");
    //            OnWorkshopCodeChanged();
    //        }
    //    }
    //    private global::System.String _WorkshopCode;
    //    partial void OnWorkshopCodeChanging(global::System.String value);
    //    partial void OnWorkshopCodeChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public global::System.String EstablishmentDate
    //    {
    //        get
    //        {
    //            return _EstablishmentDate;
    //        }
    //        set
    //        {
    //            OnEstablishmentDateChanging(value);
    //            ReportPropertyChanging("EstablishmentDate");
    //            _EstablishmentDate = StructuralObject.SetValidValue(value, true);
    //            ReportPropertyChanged("EstablishmentDate");
    //            OnEstablishmentDateChanged();
    //        }
    //    }
    //    private global::System.String _EstablishmentDate;
    //    partial void OnEstablishmentDateChanging(global::System.String value);
    //    partial void OnEstablishmentDateChanged();

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [EdmScalarPropertyAttribute(EntityKeyProperty = false, IsNullable = true)]
    //    [DataMemberAttribute()]
    //    public global::System.String RegisterDate
    //    {
    //        get
    //        {
    //            return _RegisterDate;
    //        }
    //        set
    //        {
    //            OnRegisterDateChanging(value);
    //            ReportPropertyChanging("RegisterDate");
    //            _RegisterDate = StructuralObject.SetValidValue(value, true);
    //            ReportPropertyChanged("RegisterDate");
    //            OnRegisterDateChanged();
    //        }
    //    }
    //    private global::System.String _RegisterDate;
    //    partial void OnRegisterDateChanging(global::System.String value);
    //    partial void OnRegisterDateChanged();

    //    #endregion

    //    #region Navigation Properties

    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [XmlIgnoreAttribute()]
    //    [SoapIgnoreAttribute()]
    //    [DataMemberAttribute()]
    //    [EdmRelationshipNavigationPropertyAttribute("OnlineHRSModel", "FK_CompanyInformation_SystemUser", "Personnel_Info")]
    //    public Personnel_Info Personnel_Info
    //    {
    //        get
    //        {
    //            return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Personnel_Info>("OnlineHRSModel.FK_CompanyInformation_SystemUser", "Personnel_Info").Value;
    //        }
    //        set
    //        {
    //            ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Personnel_Info>("OnlineHRSModel.FK_CompanyInformation_SystemUser", "Personnel_Info").Value = value;
    //        }
    //    }
    //    /// <summary>
    //    /// No Metadata Documentation available.
    //    /// </summary>
    //    [BrowsableAttribute(false)]
    //    [DataMemberAttribute()]
    //    public EntityReference<Personnel_Info> Personnel_InfoReference
    //    {
    //        get
    //        {
    //            return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Personnel_Info>("OnlineHRSModel.FK_CompanyInformation_SystemUser", "Personnel_Info");
    //        }
    //        set
    //        {
    //            if ((value != null))
    //            {
    //                ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Personnel_Info>("OnlineHRSModel.FK_CompanyInformation_SystemUser", "Personnel_Info", value);
    //            }
    //        }
    //    }

    //    #endregion

    //}
}