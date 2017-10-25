/**
 auth: jankergg
 desc: 全局 mixin
  init 方法可以在任何场景下使用
 Warning: 添加全局方法须谨慎，非必要情况请把全局方法添加到 base/settings !!!!!
 */

import tools from './tools'

export default {
  mixins: [tools],
  data () {
    return {
      isInit: null
    }
  },
  created () {
    if (!this.isInit) {
      this.isInit = true
    }
    this.init()
  },
  activated () {
    if (!this.isInit) {
      this.isInit = true
      this.init()
    }
  },
  mounted () {
    this.ready()
  },
  deactivated () {
    if (this.isInit !== null) {
      this.destroy()
    }
    this.isInit = null
  },
  beforeDestroy () {
    if (this.isInit !== null) {
      this.destroy()
    }
    this.isInit = null
  },
  methods: {
    init () {},
    ready () {},
    destroy () {},
    onValid () {},
    onChange () {}
  }
}
