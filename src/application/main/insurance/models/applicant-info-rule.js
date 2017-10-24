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
  baseInfo: {
    label: '基本信息',
    name: 'baseInfo',
    type: 'title',
    extraClass: 'title'
  },
  name: {
    label: '姓名',
    type: 'input',
    rules: {
      // maxlength: 6,
      vRules: 'required|username|checkUser|usernameLength',
      placeholder: '请输入您的姓名',
      errorMsg: errorMsg.name
    }
  },
  certificateType: {
    label: '证件类型',
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: '请选择证件类型',
      options: [dict.nation],
      errorMsg: errorMsg.nationality
    }
  },
  idCardNo: {
    label: '证件号码',
    type: "input-camera",
    rules: {
      vRules: 'required|idcard',
      maxLength: '18',
      type: 'idCard',
      update: ['name:name', 'nationality:people'],
      placeholder: '请输入您的身份证号',
      errorMsg: errorMsg.idCardNo
    }
  },
  periodOfValid: {
    label: '有效期至',
    type: 'time',
    rules: {
      vRules: 'required',
      stime: stime,
      etime: etime,
      placeholder: '请输入有效期至',
      errorMsg: errorMsg.birthday
    }
  },
  birthday: {
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
  age: {
    label: '年龄',
    type: 'input',
    rules: {
      vRules: 'required|max:3|age',
      // min: '16',
      // max: '66',
      // type: 'number',
      maxlength: 3,
      placeholder: '请输入年龄',
      errorMsg: errorMsg.age
    }
  },
  sex: {
    label: '性别',
    type: 'sex',
    rules: {
      disabled: false
    }
  },
  familyAdress: {
    label: '住所地址',
    type: 'web-select',
    rules: {
      vRules: 'required',
      placeholder: '请选择您的家庭住址',
      options: [['广东']],
      errorMsg: errorMsg.familyAdress
    }
  },
  familyDetailAdress: {
    label: '详细地址',
    type: 'input',
    // overRide: true,
    rules: {
      vRules: 'required|min:5|max:30',
      placeholder: '请输入家庭详细地址',
      errorMsg: errorMsg.familyDetailAdress
    }
  },
  relationshipWithInsured: {
    label: '与被保人关系',
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: '请选择您的职务',
      options: [dict.core_degree],
      errorMsg: errorMsg.education
    }
  },
  national: {
    label: '国籍',
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: '请选择国籍',
      options: [dict.nation],
      errorMsg: errorMsg.nationality
    }
  },
  majorJob: {
    label: '职业',
    type: 'select',
    rules: {
      vRules: '',
      placeholder: '请输入您的职业',
      options: [dict.core_degree],
      errorMsg: errorMsg.education
    }
  },
  height: {
    label: '年收入',
    type: "input-txt",
    rules: {
      vRules: 'required|numeric|min:3|max:3',
      maxLength: '3',
      txt: '万',
      placeholder: '请输入年收入',
      errorMsg: errorMsg.height
    }
  },
  contactInfo: {
    label: '其他信息',
    name: 'contactInfo',
    type: 'title',
    extraClass: 'title'
  },
  coName: {
    label: '单位名称',
    type: 'input',
    rules: {
      vRules: 'required',
      placeholder: '请输入单位名称',
      options: [['广东']],
      errorMsg: errorMsg.registeredBylaw
    }
  },
  coTelephone: {
    label: '单位电话',
    type: "input",
    rules: {
      vRules: 'phonenum',
      maxlength: 13,
      placeholder: '请输入单位电话',
      errorMsg: errorMsg.telephone
    }
  },
  coAddress: {
    label: '单位地址',
    type: 'web-select',
    rules: {
      vRules: 'required',
      placeholder: '请选择您的籍贯',
      options: [['广东']],
      errorMsg: errorMsg.nativePlace
    }
  },
  coDetailAddress: {
    label: '详细地址',
    type: 'input',
    // overRide: true,
    rules: {
      vRules: 'required|min: 5|max: 30',
      maxLength: '30',
      placeholder: '请输入单位详细地址',
      errorMsg: errorMsg.detailAdress
    }
  },
  coZipCode: {
    label: '单位邮编',
    type: "input",
    rules: {
      vRules: 'zipcode|max:6|min:6',
      maxlength: 6,
      placeholder: '请输入邮政编码',
      errorMsg: errorMsg.zipCode
    }
  },
  registeredBylaw: {
    label: '户口',
    type: 'web-select',
    rules: {
      vRules: 'required',
      placeholder: '请选择您的户口',
      options: [['广东']],
      errorMsg: errorMsg.registeredBylaw
    }
  },
  registeredDetailAdress: {
    label: '详细地址',
    type: 'input',
    // overRide: true,
    rules: {
      vRules: 'required|min:5|max:30',
      placeholder: '请输入户口详细地址',
      errorMsg: errorMsg.registeredBylawDetailAdress
    }
  },
  otherJob: {
    label: '副业',
    type: 'input',
    rules: {
      vRules: '',
      placeholder: '请输入您的副业',
      errorMsg: errorMsg.title
    }
  },
  title: {
    label: '职务',
    type: 'select',
    rules: {
      vRules: '',
      placeholder: '请选择您的职务',
      options: [dict.core_degree],
      errorMsg: errorMsg.education
    }
  },
  titleDetail: {
    label: '职务详细信息',
    type: 'input',
    rules: {
      vRules: '',
      placeholder: '请输入您的职务详细信息',
      errorMsg: errorMsg.title
    }
  },
  insurancePolicyAddress: {
    label: '保单通讯地址',
    type: 'web-select',
    rules: {
      vRules: 'required',
      placeholder: '请选择您的保单通讯地址',
      options: [['广东']],
      errorMsg: errorMsg.registeredBylaw
    }
  },
  insurancePolicyDetailAddress: {
    label: '详细地址',
    type: 'input',
    // overRide: true,
    rules: {
      vRules: 'required|min:5|max:30',
      placeholder: '请输入保单通讯详细地址',
      errorMsg: errorMsg.registeredBylawDetailAdress
    }
  },
  contactAddress: {
    label: '联系地址',
    type: 'web-select',
    rules: {
      vRules: 'required',
      placeholder: '请选择您的保单通讯地址',
      options: [['广东']],
      errorMsg: errorMsg.registeredBylaw
    }
  },
  contactDetailAdress: {
    label: '详细地址',
    type: 'input',
    // overRide: true,
    rules: {
      vRules: 'required|min:5|max:30',
      placeholder: '请输入详细地址',
      errorMsg: errorMsg.registeredBylawDetailAdress
    }
  },
  zipCode: {
    label: '邮编',
    type: "input",
    rules: {
      vRules: 'zipcode|max:6|min:6',
      maxlength: 6,
      placeholder: '请输入邮政编码',
      errorMsg: errorMsg.zipCode
    }
  },
  telephone: {
    label: '联系电话',
    type: "input",
    rules: {
      vRules: 'phonenum',
      maxlength: 13,
      placeholder: '请输入联系电话',
      errorMsg: errorMsg.telephone
    }
  },
  mobilePhone: {
    label: '移动电话',
    type: "input",
    rules: {
      vRules: 'required|mobile|checkmobile',
      maxlength: 11,
      placeholder: '请输入移动电话',
      errorMsg: errorMsg.mobilePhone
    }
  }
}
