/**
 auth: jankergg
 desc: 全局 mixin
  init 方法可以在任何场景下使用
 Warning: 添加全局方法须谨慎，非必要情况请把全局方法添加到 base/settings !!!!!
 */

import tools from './tools'

export let initialized = Symbol('initialized')

export default {
  mixins: [tools],
  data () {
    return {
      [initialized]: false
    }
  },
  created () {
    if (!this[initialized]) {
      this[initialized] = true
    }
    this.init()
  },
  activated () {
    if (!this[initialized]) {
      this[initialized] = true
      this.init()
    }
  },
  mounted () {
    this.ready()
  },
  deactivated () {
    if (this[initialized]) {
      this.destroy()
    }
    this[initialized] = false
  },
  beforeDestroy () {
    if (this[initialized]) {
      this.destroy()
    }
    this[initialized] = false
  },
  methods: {
    init () {},
    ready () {},
    destroy () {},
    onValid () {},
    onChange () {}
  }
}
