import errorMsg from '@/components/items/error-msg/error-msg.js'
import dict from '@/application/base/dict-from-core'
let date = new Date()
let stime = `${date.getFullYear() - 65}-${date.getMonth() + 1}-${date.getDate()}`
let etime = `${date.getFullYear() - 16}-${date.getMonth() + 1}-${date.getDate()}`
// let birthday = this.formRules.birthday
// this.formRules.birthday.rules['stime'] = stime
// this.formRules.birthday.rules['etime'] = etime
// this.$set(this.formRules, 'birthday', birthday)

export default {
  applicantInfo: {
    label: '投保人信息',
    name: 'applicantInfo',
    type: 'title',
    extraClass: 'title'
  },
  firstName: {
    label: '姓',
    type: 'input',
    rules: {
      // maxlength: 6,
      vRules: 'required|username|checkUser|usernameLength',
      placeholder: '請輸入姓名',
      errorMsg: errorMsg.name
    }
  },
  lastName: {
    label: '名',
    type: 'input',
    rules: {
      // maxlength: 6,
      vRules: 'required|username|checkUser|usernameLength',
      placeholder: '請輸入姓名',
      errorMsg: errorMsg.name
    }
  },
  sex: {
    label: '性别',
    type: 'sex',
    rules: {
      disabled: false
    }
  },
  birthday: {
    label: '出生日期',
    type: 'time',
    rules: {
      vRules: 'required',
      // stime: stime,
      // etime: etime,
      placeholder: '請輸入出生日期',
      errorMsg: errorMsg.birthday
    }
  },
  entryCertType: {
    label: '證件類型',
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: '請選擇證件類型',
      backendKey: {companyId: '', key: 'permitType'},
      options: [{name: "", value: ""}],
      errorMsg: errorMsg.nationality
    }
  },
  certNo: {
    label: '證件號碼',
    type: "input",
    rules: {
      vRules: 'required|idcard',
      maxlength: '18',
      placeholder: '請輸入身份證號碼',
      errorMsg: errorMsg.idCardNo
    }
  },
  certValidate: {
    label: '證件有效期至',
    type: 'time',
    rules: {
      vRules: 'required',
      // stime: stime,
      // etime: etime,
      showExtBtn: true,
      placeholder: '請輸入有效期至',
      txt: '长期',
      errorMsg: errorMsg.birthday
    }
  },
  mainlandIdNo: {
    label: '大陸身份證',
    type: "input",
    rules: {
      vRules: 'required|idcard',
      maxlength: '18',
      placeholder: '請輸入大陸身份證號碼',
      errorMsg: errorMsg.idCardNo
    }
  },
  entryCitizenship: {
    label: '國籍',
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: '請選擇國籍',
      options: [dict.nation],
      backendKey: {companyId: '', key: 'country'},
      errorMsg: errorMsg.nationality
    }
  },
  mobile: {
    label: '手機號碼',
    type: "input",
    rules: {
      vRules: 'required|mobile|checkmobile',
      maxlength: 11,
      placeholder: '請輸入手機號碼',
      errorMsg: errorMsg.mobilePhone
    }
  },
  mailAddress: {
    label: '電子郵箱',
    type: "input",
    rules: {
      vRules: 'required|mobile|checkmobile',
      maxlength: 11,
      placeholder: '請輸入電子郵箱',
      errorMsg: errorMsg.mobilePhone
    }
  },
  addressApplicant: {
    label: '地址',
    type: 'address',
    display: 'block',
    rules: {
      vRules: 'required',
      placeholder: '请选择户籍所在地',
      options: [['广东']],
      errorMsg: errorMsg.registeredBylaw,
      detail: {
        label: '詳細地址',
        type: 'input',
        rules: {
          vRules: 'required|min:5|max:30',
          placeholder: '请输入户口详细地址',
          showExtBtn: false,
          errorMsg: errorMsg.registeredBylawDetailAdress
        }
      }
    }
  },
  country: {
    label: '國家',
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: '請選擇國家',
      options: [dict.nation],
      backendKey: {companyId: '', key: 'country'},
      errorMsg: errorMsg.nationality
    }
  },
  entryRelation: {
    label: '與被保人關係',
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: '请选择與被保人關係',
      backendKey: {companyId: '', key: 'relationships'},
      options: [dict.relationshipWithInsured],
      errorMsg: errorMsg.education
    }
  }
}
