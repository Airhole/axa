/**
  mix 组件
  auth: jankergg
  desc: 一些enroll通用方法
*/
import DICT from '../model/dict'
export default {
  methods: {
    // obj 需要添加名字的对象
    // names 字段组: ['sex','status']等
    addDict (obj, names) {
      if (!obj) return
      names.forEach((name) => {
        if (!DICT[name]) {
          throw new Error('字典里无' + name + '字段!')
        }
        if (!obj[name]) {
          throw new Error('对象无' + name + '字段!')
        }
        obj[name + '_name'] = DICT[name][obj[name]]
      })
      return obj
    }
  }
}
