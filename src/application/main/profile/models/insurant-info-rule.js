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
  insuredInfo: {
    label: '被保人信息',
    name: 'insuredInfo',
    type: 'title',
    extraClass: 'title'
  },
  name: {
    label: '姓名',
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
  insuredEntryCertType: {
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
  insuredCertNo: {
    label: '證件號碼',
    type: "input",
    rules: {
      vRules: 'required|idcard',
      maxlength: '18',
      placeholder: '請輸入身份證號碼',
      errorMsg: errorMsg.idCardNo
    }
  },
  insuredCertValidate: {
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
  insuredMainlandIdNo: {
    label: '大陸身份證',
    type: "input",
    rules: {
      vRules: 'required|idcard',
      maxlength: '18',
      placeholder: '請輸入大陸身份證號碼',
      errorMsg: errorMsg.idCardNo
    }
  },
  beneficiaryInfo: {
    label: '受益人',
    name: 'beneficiaryInfo',
    type: 'title',
    extraClass: 'title'
  },
  beneficiary: {
    label: '受益人',
    type: 'input',
    rules: {
      vRules: 'required|mobile|checkmobile',
      maxlength: 11,
      readOnly: 'readonly',
      // txt: '同投保人',
      errorMsg: errorMsg.mobilePhone
    }
  },
  insuredPlan: {
    label: '保障計劃',
    name: 'insuredPlan',
    type: 'title',
    extraClass: 'title'
  }
}
