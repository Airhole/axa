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
  applicantName: {
    label: '姓名',
    type: 'input',
    rules: {
      // maxlength: 6,
      vRules: 'required|username|checkUser|usernameLength',
      placeholder: '请输入投保人姓名',
      errorMsg: errorMsg.name
    }
  },
  applicantSex: {
    label: '性别',
    type: 'sex',
    rules: {
      disabled: false
    }
  },
  applicantBirthday: {
    label: '出生日期',
    type: 'time',
    rules: {
      vRules: 'required',
      stime: stime,
      etime: etime,
      placeholder: '请输入出生日期',
      errorMsg: errorMsg.birthday
    }
  },
  applicantMajorJob: {
    label: '职业',
    type: 'select',
    rules: {
      vRules: '',
      placeholder: '请输入您的职业',
      options: [dict.core_degree],
      errorMsg: errorMsg.education
    }
  },
  relationshipWithInsured: {
    label: '与被保人关系',
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: '请选择与被保人关系',
      options: [dict.core_degree],
      errorMsg: errorMsg.education
    }
  },
  insuredInfo: {
    label: '被保人信息',
    name: 'insuredInfo',
    type: 'title',
    extraClass: 'title'
  },
  insuredName: {
    label: '姓名',
    type: 'input',
    rules: {
      // maxlength: 6,
      vRules: 'required|username|checkUser|usernameLength',
      placeholder: '请输入被保人姓名',
      errorMsg: errorMsg.name
    }
  },
  insuredSex: {
    label: '性别',
    type: 'sex',
    rules: {
      disabled: false
    }
  },
  insuredBirthday: {
    label: '出生日期',
    type: 'time',
    rules: {
      vRules: 'required',
      stime: stime,
      etime: etime,
      placeholder: '请输入出生日期',
      errorMsg: errorMsg.birthday
    }
  },
  insuredMajorJob: {
    label: '职业',
    type: 'select',
    rules: {
      vRules: '',
      placeholder: '请输入您的职业',
      options: [dict.core_degree],
      errorMsg: errorMsg.education
    }
  }
}
