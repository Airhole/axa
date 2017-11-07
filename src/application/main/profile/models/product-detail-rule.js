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
  age: {
    label: '承保年齡',
    type: 'input',
    rules: {
      readOnly: 'readonly'
    }
  },
  insuredPeriod: {
    label: '保障期限',
    type: 'input',
    rules: {
      readOnly: 'readonly'
    }
  },
  insuredInfo: {
    label: '被保人信息',
    name: 'insuredInfo',
    type: 'title',
    extraClass: 'title'
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
      placeholder: '請輸入證件號碼',
      errorMsg: errorMsg.idCardNo
    }
  },
  insuredPlan: {
    label: '保障計劃',
    name: 'insuredPlan',
    type: 'title',
    extraClass: 'title'
  }
}
