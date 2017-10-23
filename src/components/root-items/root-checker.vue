<!--
      descript: 单选组件
        author: xiangzhi
        param: props
        checked 选中状态
-->
<template>
  <div class="root-checker">
    <checker
      v-model="innerValue"
      :type="typeValue"
      default-item-class="checker"
      selected-item-class="checker-select">
      <checker-item v-for="(item, index) in items" :value="item" :key="index">{{item}}</checker-item>
    </checker>
  </div>
</template>
<script>
  import {Checker, CheckerItem} from 'vux'
  import formMixin from '../mixins/form-mixin'

  export default {
    name: 'root-checker',
    mixins: [formMixin],
    data () {
      return {
        innerValue: this.value || [],
        typeValue: this.rules.type,
        items: this.rules.value
      }
    },
    props: {
      name: {
        type: String
      },
      rules: {
        type: Object,
        default () {
          return {
            type: 'true',
            value: ["文艺", "影视", "旅游", "体育", "购物", "投资", "数码宠物", "宠物", "收藏", "餐饮", "其他"]
          }
        }
      },
      value: {
        type: [Array, String],
        default () {
          return []
        }
      }
    },
    computed: {
      isValid () {
        return this.innerValue.length > 0
      },
      errorMsg () {
        let msg = null
        if (!this.isValid) {
          msg = this.rules.placeholder
        }
        return msg
      },
      innerModel () {
        return {
          name: this.name,
          value: [].concat(this.innerValue).join('/'),
          msg: this.errorMsg,
          isValid: this.isValid
        }
      }
    },
    methods: {
      init () {
        if (this.rules.type == 'false') {
          this.typeValue = 'radio'
        } else {
          this.typeValue = 'checkbox'
        }
        this.onChange()
      },
      onChange () {
        this.$emit('formChange', this.__obj(this.innerModel))
      }
    },
    watch: {
      value (v) {
        this.innerValue = v ? v.split('/') : []
      },
      innerValue (val) {
        this.onChange()
      }
    },
    components: {
      Checker, CheckerItem
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';

  .root-checker {
    padding: rem-calc(20) 0 0 rem-calc(20);
    .checker {
      display: inline-block;
      color: #999999;
      text-align: center;
      height: rem-calc(30);
      width: rem-calc(75);
      text-align: center;
      line-height: rem-calc(30);
      margin-right: rem-calc(10);
      margin-bottom: rem-calc(10);
      border: 1px solid #b5b5b5;
      border-radius: rem-calc(5);
    }
    .checker-select {
      color: #ffffff;
      background-color: #91dbfe;
      border: 1px solid #91dbfe;
    }
  }
</style>
