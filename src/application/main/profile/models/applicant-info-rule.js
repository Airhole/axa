import errorMsg from '@/components/items/error-msg/error-msg.js'
import dict from '@/application/base/dict-from-core'
import Vue from 'vue'
let translate = Vue.i18n.translate
let date = new Date()
let stime = `${date.getFullYear() - 65}-${date.getMonth() + 1}-${date.getDate()}`
let etime = `${date.getFullYear() - 16}-${date.getMonth() + 1}-${date.getDate()}`
// let birthday = this.formRules.birthday
// this.formRules.birthday.rules['stime'] = stime
// this.formRules.birthday.rules['etime'] = etime
// this.$set(this.formRules, 'birthday', birthday)

export default {
  applicantInfo: {
    label: translate('applicantInfo'),
    name: 'applicantInfo',
    type: 'title',
    extraClass: 'title'
  },
  name: {
    label: translate('name'),
    type: 'input',
    rules: {
      // maxlength: 6,
      vRules: 'required|username|checkUser|usernameLength',
      placeholder: translate('nameTips'),
      errorMsg: errorMsg.name
    }
  },
  gender: {
    label: translate('gender'),
    type: 'sex',
    rules: {
      disabled: false
    }
  },
  birthday: {
    label: translate('birthday'),
    type: 'time',
    rules: {
      vRules: 'required',
      // stime: stime,
      // etime: etime,
      placeholder: translate('birthdayTips'),
      errorMsg: errorMsg.birthday
    }
  },
  entryCertType: {
    label: translate('entryCertType'),
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: translate('entryCertTypeTips'),
      backendKey: {companyId: '', key: 'permitType'},
      options: [{name: "", value: ""}],
      errorMsg: errorMsg.nationality
    }
  },
  certNo: {
    label: translate('certNo'),
    type: "input",
    rules: {
      vRules: 'required|idcard',
      maxlength: '18',
      placeholder: translate('certNoTips'),
      errorMsg: errorMsg.idCardNo
    }
  },
  certValidate: {
    label: translate('certValidate'),
    type: 'time',
    rules: {
      vRules: 'required',
      // stime: stime,
      // etime: etime,
      showExtBtn: true,
      placeholder: translate('certValidateTips'),
      txt: translate('certValidateText'),
      errorMsg: errorMsg.birthday
    }
  },
  mainlandIdNo: {
    label: translate('mainlandIdNo'),
    type: "input",
    rules: {
      vRules: 'required|idcard',
      maxlength: '18',
      placeholder: translate('mainlandIdNoTips'),
      errorMsg: errorMsg.idCardNo
    }
  },
  entryCitizenship: {
    label: translate('entryCitizenship'),
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: translate('entryCitizenshipTips'),
      options: [dict.nation],
      backendKey: {companyId: '', key: 'country'},
      errorMsg: errorMsg.nationality
    }
  },
  mobile: {
    label: translate('mobile'),
    type: "input",
    rules: {
      vRules: 'required|mobile|checkmobile',
      maxlength: 11,
      placeholder: translate('mobileTips'),
      errorMsg: errorMsg.mobilePhone
    }
  },
  email: {
    label: translate('email'),
    type: "input",
    rules: {
      vRules: 'required|mobile|checkmobile',
      maxlength: 11,
      placeholder: translate('emailTips'),
      errorMsg: errorMsg.mobilePhone
    }
  },
  addressApplicant: {
    label: translate('address'),
    type: 'address',
    display: 'block',
    rules: {
      vRules: 'required',
      placeholder: translate('addressTips'),
      options: [['广东']],
      errorMsg: errorMsg.registeredBylaw,
      detail: {
        label: translate('addressDetails'),
        type: 'input',
        rules: {
          vRules: 'required|min:5|max:30',
          placeholder: translate('addressDetailsTips'),
          showExtBtn: false,
          errorMsg: errorMsg.registeredBylawDetailAdress
        }
      }
    }
  },
  country: {
    label: translate('country'),
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: translate('countryTips'),
      options: [dict.nation],
      backendKey: {companyId: '', key: 'country'},
      errorMsg: errorMsg.nationality
    }
  },
  entryRelation: {
    label: translate('entryRelation'),
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: translate('entryRelationTips'),
      backendKey: {companyId: '', key: 'relationships'},
      options: [dict.relationshipWithInsured],
      errorMsg: errorMsg.education
    }
  },
  insuredInfo: {
    label: translate('insuredInfo'),
    name: 'insuredInfo',
    type: 'title',
    extraClass: 'title'
  },
  insuredName: {
    label: translate('name'),
    type: 'input',
    rules: {
      // maxlength: 6,
      vRules: 'required|username|checkUser|usernameLength',
      placeholder: translate('nameTips'),
      errorMsg: errorMsg.name
    }
  },
  insuredGender: {
    label: translate('gender'),
    type: 'sex',
    rules: {
      disabled: false
    }
  },
  insuredBirthday: {
    label: translate('birthday'),
    type: 'time',
    rules: {
      vRules: 'required',
      // stime: stime,
      // etime: etime,
      placeholder: translate('birthdayTips'),
      errorMsg: errorMsg.birthday
    }
  },
  insuredEntryCertType: {
    label: translate('entryCertType'),
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: translate('entryCertTypeTips'),
      backendKey: {companyId: '', key: 'permitType'},
      options: [{name: "", value: ""}],
      errorMsg: errorMsg.nationality
    }
  },
  insuredCertNo: {
    label: translate('certNo'),
    type: "input",
    rules: {
      vRules: 'required|idcard',
      maxlength: '18',
      placeholder: translate('certNoTips'),
      errorMsg: errorMsg.idCardNo
    }
  },
  insuredCertValidate: {
    label: translate('certValidate'),
    type: 'time',
    rules: {
      vRules: 'required',
      // stime: stime,
      // etime: etime,
      showExtBtn: true,
      placeholder: translate('certValidateTips'),
      txt: translate('certValidateText'),
      errorMsg: errorMsg.birthday
    }
  },
  insuredMainlandIdNo: {
    label: translate('mainlandIdNo'),
    type: "input",
    rules: {
      vRules: 'required|idcard',
      maxlength: '18',
      placeholder: translate('mainlandIdNoTips'),
      errorMsg: errorMsg.idCardNo
    }
  },
  beneficiaryInfo: {
    label: translate('beneficiary'),
    name: 'beneficiaryInfo',
    type: 'title',
    extraClass: 'title'
  },
  beneficiary: {
    label: translate('beneficiary'),
    type: "input",
    rules: {
      vRules: 'required|mobile|checkmobile',
      maxlength: 11,
      readOnly: 'readonly',
      // txt: '同投保人',
      errorMsg: errorMsg.mobilePhone
    }
  },
  insuredPlan: {
    label: translate('insuredPlan'),
    name: 'insuredPlan',
    type: 'title',
    extraClass: 'title'
  }
}
