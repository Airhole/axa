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
      // maxlength: 6,
      vRules: 'required|username|checkUser|usernameLength',
      placeholder: '请输入您的姓名',
      errorMsg: errorMsg.name
    }
  },
  gender: {
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
      readOnly: 'readonly',
      maxlength: 3,
      placeholder: '请输入年龄',
      errorMsg: errorMsg.age
    }
  },
  entryCertType: {
    label: '证件类型',
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: '请选择证件类型',
      backendKey: {companyId: '', key: 'permitType'},
      options: [{name: "", value: ""}],
      errorMsg: errorMsg.nationality
    }
  },
  certNo: {
    label: '证件号码',
    type: "input",
    rules: {
      vRules: 'required|idcard',
      maxlength: '18',
      placeholder: '请输入您的身份证号',
      errorMsg: errorMsg.idCardNo
    }
  },
  certValidate: {
    label: '证件有效期至',
    type: 'time',
    rules: {
      vRules: 'required',
      // stime: stime,
      // etime: etime,
      showExtBtn: true,
      placeholder: '请输入有效期至',
      txt: '长期',
      errorMsg: errorMsg.birthday
    }
  },
  entryMarriage: {
    label: '婚姻状况',
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: '请选择婚姻状况',
      backendKey: {companyId: '', key: 'marriagestatus'},
      options: [dict.marryStatus],
      errorMsg: errorMsg.nationality
    }
  },
  mobile: {
    label: '移动电话',
    type: "input",
    rules: {
      vRules: 'required|mobile|checkmobile',
      maxlength: 11,
      placeholder: '请输入移动电话',
      errorMsg: errorMsg.mobilePhone
    }
  },
  wechatNo: {
    label: '微信号',
    type: "input",
    rules: {
      vRules: 'required|mobile|checkmobile',
      maxlength: 11,
      placeholder: '请输入微信号',
      // txt: '同投保人',
      errorMsg: errorMsg.mobilePhone
    }
  },
  email: {
    label: '电子邮箱',
    type: "input",
    rules: {
      vRules: 'required|mobile|checkmobile',
      maxlength: 11,
      placeholder: '请输入移动电话',
      errorMsg: errorMsg.mobilePhone
    }
  },
  height: {
    label: '身高',
    type: "input-txt",
    rules: {
      vRules: 'required|numeric|min:3|max:3',
      maxLength: '3',
      txt: '厘米',
      placeholder: '请输入您的身高',
      errorMsg: errorMsg.height
    }
  },
  entryRelation: {
    label: '与被保人关系',
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: '请选择关系',
      backendKey: {companyId: '', key: 'relationships'},
      options: [dict.relationshipWithInsured],
      errorMsg: errorMsg.education
    }
  },
  weight: {
    label: '体重',
    type: "input-txt",
    rules: {
      vRules: 'required|numeric|min:2|max:3',
      maxLength: '3',
      txt: '公斤',
      placeholder: '请输入您的体重',
      errorMsg: errorMsg.weight
    }
  },
  entryCitizenship: {
    label: '国籍',
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: '请选择国籍',
      options: [dict.nation],
      backendKey: {companyId: '', key: 'country'},
      errorMsg: errorMsg.nationality
    }
  },
  entryDegree: {
    label: '学历',
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: '请选择学历',
      backendKey: {companyId: '', key: 'degree'},
      options: [dict.core_degree],
      errorMsg: errorMsg.nationality
    }
  },
  entryOccupation: {
    label: '职业',
    type: 'select',
    rules: {
      vRules: '',
      placeholder: '请选择您的职业',
      backendKey: {companyId: '', key: 'vocation'},
      options: [dict.job],
      errorMsg: errorMsg.education
    }
  },
  jobContent: {
    label: '工作内容',
    type: 'input',
    rules: {
      vRules: '',
      placeholder: '请输入您的工作内容',
      errorMsg: errorMsg.title
    }
  },
  partTimeJob: {
    label: '兼职',
    type: 'input',
    rules: {
      vRules: '',
      placeholder: '请输入您的兼职',
      errorMsg: errorMsg.title
    }
  },
  income: {
    label: '固定收入',
    type: "input-txt",
    rules: {
      vRules: 'required|numeric|min:3|max:3',
      maxLength: '3',
      txt: '万',
      placeholder: '请输入收入',
      errorMsg: errorMsg.height
    }
  },
  incomeSource: {
    label: '固定收入主要来源',
    type: 'input',
    rules: {
      vRules: '',
      placeholder: '请输入您的兼职',
      errorMsg: errorMsg.title
    }
  },
  contactInfo: {
    label: '通讯信息',
    name: 'contactInfo',
    type: 'title',
    extraClass: 'title'
  },
  domicile: {
    label: '户籍所在地',
    type: 'address',
    display: 'block',
    rules: {
      vRules: 'required',
      placeholder: '请选择户籍所在地',
      options: [['广东']],
      errorMsg: errorMsg.registeredBylaw,
      detail: {
        label: '详细地址',
        type: 'input',
        rules: {
          vRules: 'required|min:5|max:30',
          placeholder: '请输入户口详细地址',
          txt: '同投保人',
          errorMsg: errorMsg.registeredBylawDetailAdress
        }
      }
    }
  },
  address: {
    label: '家庭地址',
    type: 'address',
    display: 'block',
    rules: {
      vRules: 'required',
      placeholder: '请选择家庭地址',
      options: [['广东']],
      errorMsg: errorMsg.registeredBylaw,
      detail: {
        label: '详细地址',
        type: 'input',
        rules: {
          vRules: 'required|min:5|max:30',
          placeholder: '请输入家庭详细地址',
          txt: '同投保人',
          errorMsg: errorMsg.registeredBylawDetailAdress
        }
      }
    }
  },
  postcode: {
    label: '家庭邮编',
    type: "input",
    rules: {
      vRules: 'zipcode|max:6|min:6',
      maxlength: 6,
      placeholder: '请输入邮政编码',
      errorMsg: errorMsg.zipCode
    }
  },
  unitOrSchoolName: {
    label: '单位或名称',
    type: 'input',
    rules: {
      vRules: 'required',
      placeholder: '请输入单位名称',
      options: [['广东']],
      errorMsg: errorMsg.registeredBylaw
    }
  },
  unitOrSchoolMobile: {
    label: '单位或学校电话',
    type: "input",
    rules: {
      vRules: 'phonenum',
      maxlength: 13,
      placeholder: '请输入单位电话',
      errorMsg: errorMsg.telephone
    }
  },
  unitOrSchoolAddress: {
    label: '单位或学校地址',
    type: 'address',
    display: 'block',
    rules: {
      vRules: 'required',
      placeholder: '请选择单位或学校地址',
      options: [['广东']],
      errorMsg: errorMsg.registeredBylaw,
      detail: {
        label: '详细地址',
        type: 'input',
        rules: {
          vRules: 'required',
          placeholder: '请输入单位或学校详细地址',
          txt: '同投保人',
          errorMsg: errorMsg.registeredBylawDetailAdress
        }
      }
    }
  },
  unitOrSchoolZipcode: {
    label: '单位/学校邮编',
    type: "input",
    rules: {
      vRules: 'zipcode|max:6|min:6',
      maxlength: 6,
      placeholder: '请输入邮政编码',
      errorMsg: errorMsg.zipCode
    }
  },
  entryUnitType: {
    label: '单位类型',
    type: 'select',
    rules: {
      vRules: 'required',
      placeholder: '请选择您的职务',
      backendKey: {companyId: 'zhonghan', key: 'jobType'},
      options: [dict.companyType],
      errorMsg: errorMsg.education
    }
  },
  postalAddress: {
    label: '保单通讯地址',
    type: 'address',
    display: 'block',
    rules: {
      vRules: 'required',
      placeholder: '请选择保单通讯地址',
      options: [['广东']],
      errorMsg: errorMsg.registeredBylaw,
      detail: {
        label: '详细地址',
        type: 'input',
        rules: {
          vRules: 'required',
          placeholder: '请输入保单通讯详细地址',
          txt: '同投保人',
          errorMsg: errorMsg.registeredBylawDetailAdress
        }
      }
    }
  },
  postalAddressZipcode: {
    label: '邮编',
    type: "input",
    rules: {
      vRules: 'zipcode|max:6|min:6',
      maxlength: 6,
      placeholder: '请输入邮政编码',
      errorMsg: errorMsg.zipCode
    }
  }
  // socialInsurance: {
  //   label: '有无社保',
  //   type: 'select',
  //   rules: {
  //     vRules: 'required',
  //     placeholder: '请选择国籍',
  //     options: [dict.nation],
  //     errorMsg: errorMsg.nationality
  //   }
  // },
  // familyTelephone: {
  //   label: '家庭电话',
  //   type: "input",
  //   rules: {
  //     vRules: 'phonenum',
  //     maxlength: 13,
  //     placeholder: '请输入固定电话',
  //     errorMsg: errorMsg.telephone
  //   }
  // },
  // contactAddress: {
  //   label: '联系地址',
  //   type: 'web-select',
  //   rules: {
  //     vRules: 'required',
  //     placeholder: '请选择您的保单通讯地址',
  //     options: [['广东']],
  //     errorMsg: errorMsg.registeredBylaw
  //   }
  // },
  // contactDetailAdress: {
  //   label: '详细地址',
  //   type: 'input',
  //   // overRide: true,
  //   rules: {
  //     vRules: 'required|min:5|max:30',
  //     placeholder: '请输入详细地址',
  //     errorMsg: errorMsg.registeredBylawDetailAdress
  //   }
  // },
  // telephone: {
  //   label: '联系电话',
  //   type: "input",
  //   rules: {
  //     vRules: 'phonenum',
  //     maxlength: 13,
  //     placeholder: '请输入联系电话',
  //     errorMsg: errorMsg.telephone
  //   }
  // },
  // mobilePhone: {
  //   label: '移动电话',
  //   type: "input",
  //   rules: {
  //     vRules: 'required|mobile|checkmobile',
  //     maxlength: 11,
  //     placeholder: '请输入移动电话',
  //     errorMsg: errorMsg.mobilePhone
  //   }
  // }
}
