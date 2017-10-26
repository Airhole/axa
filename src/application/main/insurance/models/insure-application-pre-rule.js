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
    label: '投保人信息',
    name: 'baseInfo',
    type: 'title',
    extraClass: 'title'
  },
  // idCardNo: {
  //   label: '身份证',
  //   type: "input-camera",
  //   rules: {
  //     vRules: 'required|idcard',
  //     maxLength: '18',
  //     type: 'idCard',
  //     update: ['name:name', 'nationality:people'],
  //     placeholder: '请输入您的身份证号',
  //     errorMsg: errorMsg.idCardNo
  //   }
  // },
  name: {
    label: '姓名',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  certificateType: {
    label: '证件类型',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  idCardNo: {
    label: '证件号码',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  periodOfValid: {
    label: '有效期至',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  birthday: {
    label: '出生日期',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  age: {
    label: '年龄',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  sex: {
    label: '性别',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  national: {
    label: '国籍',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  height: {
    label: '年收入',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  contactInfo: {
    label: '其他信息',
    name: 'contactInfo',
    type: 'title',
    extraClass: 'title'
  },
  familyAdress: {
    label: '家庭住址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  familyDetailAdress: {
    label: '详细地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  familyZipCode: {
    label: '家庭邮编',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  familyTelephone: {
    label: '家庭电话',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  email: {
    label: '联系邮箱',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  coName: {
    label: '单位名称',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  coTelephone: {
    label: '单位电话',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  coAddress: {
    label: '单位地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  coDetailAddress: {
    label: '详细地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  coZipCode: {
    label: '单位邮编',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  registeredBylaw: {
    label: '户口',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  registeredDetailAdress: {
    label: '详细地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  majorJob: {
    label: '职业',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  otherJob: {
    label: '副业',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  title: {
    label: '职务',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  titleDetail: {
    label: '职务详细信息',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  relationshipWithInsured: {
    label: '与被保人关系',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  insurancePolicyAddress: {
    label: '保单通讯地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  insurancePolicyDetailAddress: {
    label: '详细地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  contactAddress: {
    label: '联系地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  contactDetailAdress: {
    label: '详细地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  zipCode: {
    label: '邮编',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  telephone: {
    label: '联系电话',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  mobilePhone: {
    label: '移动电话',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  baseInfo2: {
    label: '被保人信息',
    name: 'baseInfo2',
    type: 'title',
    extraClass: 'title'
  },
  // idCardNo: {
  //   label: '身份证',
  //   type: "input-camera",
  //   rules: {
  //     vRules: 'required|idcard',
  //     maxLength: '18',
  //     type: 'idCard',
  //     update: ['name:name', 'nationality:people'],
  //     placeholder: '请输入您的身份证号',
  //     errorMsg: errorMsg.idCardNo
  //   }
  // },
  name2: {
    label: '姓名',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  certificateType2: {
    label: '证件类型',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  idCardNo2: {
    label: '证件号码',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  periodOfValid2: {
    label: '有效期至',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  birthday2: {
    label: '出生日期',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  age2: {
    label: '年龄',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  sex2: {
    label: '性别',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  national2: {
    label: '国籍',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  height2: {
    label: '年收入',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  contactInfo2: {
    label: '其他信息',
    name: 'contactInfo2',
    type: 'title',
    extraClass: 'title'
  },
  familyAdress2: {
    label: '家庭住址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  familyDetailAdress2: {
    label: '详细地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  familyZipCode2: {
    label: '家庭邮编',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  familyTelephone2: {
    label: '家庭电话',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  email2: {
    label: '联系邮箱',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  coName2: {
    label: '单位名称',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  coTelephone2: {
    label: '单位电话',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  coAddress2: {
    label: '单位地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  coDetailAddress2: {
    label: '详细地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  coZipCode2: {
    label: '单位邮编',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  registeredBylaw2: {
    label: '户口',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  registeredDetailAdress2: {
    label: '详细地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  majorJob2: {
    label: '职业',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  otherJob2: {
    label: '副业',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  title2: {
    label: '职务',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  titleDetail2: {
    label: '职务详细信息',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  relationshipWithInsured2: {
    label: '与被保人关系',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  insurancePolicyAddress2: {
    label: '保单通讯地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  insurancePolicyDetailAddress2: {
    label: '详细地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  contactAddress2: {
    label: '联系地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  contactDetailAdress2: {
    label: '详细地址',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  zipCode2: {
    label: '邮编',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  telephone2: {
    label: '联系电话',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  mobilePhone2: {
    label: '移动电话',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  beneficiaryInfo: {
    label: '受益人信息',
    name: 'beneficiaryInfo',
    type: 'title',
    extraClass: 'title'
  },
  benefitTitle: {
    label: '受益人1',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  name3: {
    label: '姓名',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  sex3: {
    label: '性别',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  birthday3: {
    label: '出生日期',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  certificateType3: {
    label: '证件类型',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  idCardNo3: {
    label: '证件号码',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  periodOfValid3: {
    label: '有效期至',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  national3: {
    label: '国籍',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  relateWithInsured: {
    label: '是被保人的',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  benefitOrder: {
    label: '受益顺序',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  benefitRate: {
    label: '受益比例',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  transferAuth: {
    label: '转账授权',
    name: 'transferAuth',
    type: 'title',
    extraClass: 'title'
  },
  accountOwnerName: {
    label: '账户所有人姓名',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  bank: {
    label: '开户银行',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  bankAccount: {
    label: '银行账号',
    type: 'input',
    rules: {
      readOnly: true
    }
  },
  healthNotify: {
    label: '健康告知',
    name: 'healthNotify',
    type: 'title',
    extraClass: 'title'
  }
}
