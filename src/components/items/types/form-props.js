/**
 * 表单组件传值类型定义
 * - jankergg
 */

export const formData = {
  value: {
    type: [String, Number],
    default () {
      return 'text'
    }
  },
  name: {
    type: String,
    default () {
      return 'formName'
    }
  }
}
