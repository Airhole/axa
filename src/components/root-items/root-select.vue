<!--
      descript: select 行组件
        author: jankergg
        param: props
-->
<template>
  <div class="root-select">
    <template v-if="onload">
      <group v-if="rules.showName==false">
        <popup-picker
          :title="title"
          :data="$option"
          v-model="innerValue"
          @on-show="onShow"
          @on-hide="onHide"
          @on-change="onChange"
          :readonly="readonly"
          :placeholder="rules.placeholder"
        ></popup-picker>
      </group>
      <group v-else>
        <popup-picker
          :title="title"
          :data="$option"
          show-name
          v-model="innerValue"
          @on-show="onShow"
          @on-hide="onHide"
          @on-change="onChange"
          :readonly="readonly"
          :placeholder="rules.placeholder"
        ></popup-picker>
      </group>
    </template>
    <template v-else>
      加载中...
    </template>
  </div>
</template>
<script>
  import {Group, PopupPicker, Picker} from 'vux'
  import {GET_DICTITEMS} from '@/api'

  export default {
    data () {
      return {
        onload: false,
        isMiss: false,
        $option: this.rules.options,
        innerValue: this.modelValue
      }
    },
    props: {
      // 标题
      title: String,
      // 值
      value: [Array, String, Object],
      // 表单名
      name: String,
      // 是否可编辑
      readonly: Boolean,
      rules: Object
    },
    watch: {
      value: {
        deep: true,
        handler (v) {
          this.modelValue = v
        }
      },
      innerValue (v) {
        if (this.rules.update && v) {
          this.$nextTick(() => {
            this.rules.update.forEach(item => {
              if ((v[0] === item.when) && item.target) {
                // console.log('im::::', this.__str(v), this.rules.update)
                this.$emit('emission', {
                  target: item.target,
                  value: item.value
                })
              }
            })
          })
        }
        this.$nextTick(() => {
          let im = this.innerModel()
          this.$emit('formChange', im)
        })
      }
    },
    computed: {
      modelValue: {
        get () {
          let v
          if (!this.value) {
            v = []
          } else if (typeof this.value === 'string') {
            v = this.value.split('/')
          } else if (Array.isArray(this.value)) {
            v = this.value
          } else {
            v = this.value.value ? [this.value.value] : []
          }
          return v
        },
        set (v) {
          if (!v) {
            v = []
          } else if (typeof v === 'string') {
            v = v.split('/')
          } else if (Array.isArray(v)) {
          } else {
            v = v.value ? [v.value] : []
          }
          this.innerValue = v
        }
      },
      isValid () {
        if (!this.rules.vRules || this.rules.vRules.indexOf('required') == -1) {
          return true
        }
        return !!this.innerValue.length
      }
    },
    methods: {
      init () {
        this.onshow()
      },
      onshow () {
        if (this.rules.backendKey) {
          if (window[this.rules.backendKey.key]) {
            this.install([window[this.rules.backendKey.key]])
          } else {
            this.axios.post(GET_DICTITEMS, this.rules.backendKey).then(res => {
              let result = res.data
              let dictItems = []
              if (result.success && result.value) {
                res.data.value.items.map(item => {
                  dictItems.push({
                    name: item.name,
                    value: item.code
                  })
                })
                window[this.rules.backendKey.key] = dictItems
              }
              this.install(dictItems.length ? [dictItems] : this.rules.options)
            })
          }
        } else {
          this.install(this.rules.options)
        }
      },
      install (options) {
        this.$option = options
        this.onload = true
        // 一定要先置空，否则数据更新不了
        this.innerValue = []
        this.$nextTick(() => {
          this.innerValue = this.modelValue
        })
      },
      innerModel () {
        let origin = this.$option ? this.$option[0].find(i => i.value && i.value === this.innerValue[0]) : null
        return {
          name: this.name,
          value: origin ? this.__clone(origin) : '',
          msg: this.isValid ? null : this.rules.errorMsg || this.rules.placeholder,
          isValid: this.isValid
        }
      },
      onShow () {},
      onHide (v) {},
      onChange (v) {
        this.innerValue = v
      }
    },
    components: {
      Group, PopupPicker, Picker
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
  .root-select {
    .weui-cells:before, .weui-cells:after, .vux-cell-box:before, .vux-cell-box:after {
      display: none;
    }
    .vux-popup-picker-value {
      overflow:hidden;
      text-overflow: ellipsis;
      display:block;
      max-width:rem-calc(175px);
    }
    .weui-cells {
      margin-top: rem-calc(-2px);
      line-height: inherit;
      .weui-cell {
        padding: 0 rem-calc(15);
        font-size: rem-calc(15);
        white-space: nowrap;
      }
    }
  }
</style>
