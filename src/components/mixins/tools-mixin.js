/**
 mix 组件
 auth: jankergg
 desc: 一些表单通用方法
 */
export default {
  methods: {
    // 以下是工具方法，添加工具方法请以 '__' 为前缀
    __toast (msg) {
      this.$vux.toast.show({
        text: msg,
        type: 'text',
        width: '50%',
        isShowMask: true
      })
    }
  }
}
