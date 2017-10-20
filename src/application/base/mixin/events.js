/**
 auth: jankergg
 desc: 全局事件 mixin - event
 Warning: 添加全局方法须谨慎，非必要情况请把全局方法添加到 base/settings !!!!!
 */

export default {
  watch: {
    '$route' (to, from) {
      console.log('rout::', to, from, '::end')
    }
  }
}
