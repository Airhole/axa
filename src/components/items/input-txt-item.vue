<!--
      descript: input-txt 组件
        author: jankergg
        param: props
        example:
-->
<template>
   <!-- input 类型 -->
  <div class="input-txt-box">
    <root-input
    @formChange="onChange"
    @formPassed="onVlid"
    :rules="$rules"
    :value="innerValue"
    :name="name">
    </root-input>
    <span class="txt">{{$rules.txt}}</span>
    <!-- input 类型 -->
  </div>
</template>
<script>
import rootInput from '../root-items/root-input'

export default {
  name: 'input-txt-item',
  data () {
    return {
      innerErrors: null,
      innerValid: null
    }
  },
  props: ['rules', 'value', 'name'],
  watch: {
    value (v) {
      if (v === null || v === undefined) {
        return
      }
      this.innerValue = v
    }
  },
  computed: {
    $rules: {
      get () {
        return this.rules
      },
      set (val) {
        return val
      }
    },
    innerValue: {
      get () {
        return this.value
      },
      set () {}
    }
  },
  methods: {
    onChange (e) {
      this.$emit('formChange', e)
    },
    onVlid (e) {
      this.$emit('formValid', e)
    }
  },
  components: {
    rootInput
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .input-txt-box {
    display:flex;
    height:100%;
    .txt {
      padding-right: rem-calc(15);
      font-size: rem-calc(15);
    }
  }
</style>
