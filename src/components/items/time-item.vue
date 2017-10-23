<!--
      descript: timer 组件
        author: jankergg
        param: props
        example:
-->
<template>
    <group class="time-item-box" :class="{isempty: isEmpty}">
      <datetime
      @on-change="onChange"
      clear-text=""
      :placeholder="rules.placeholder"
      v-model.trim="innerValue"
      :format="'YYYY-MM-DD'"
      confirm-text="确定"
      cancel-text="取消"
      :start-date="rules.stime"
      :end-date="rules.etime"
      :min-year="1940"
      :title="''"
      :name="name">
    </datetime>
  </group>
</template>
<script>
import {Datetime, Group} from 'vux'
import formMixin from '../mixins/form-mixin'

export default {
  name: 'time-item',
  data () {
    return {
      isEmpty: true,
      innerValue: this.modValue
    }
  },
  mixins: [formMixin],
  props: {
    label: String,
    value: [String, Number],
    name: String,
    title: String,
    rules: {
      type: Object,
      default () {
        return {
          vRules: '',
          disabled: false,
          maxlength: ''
        }
      }
    }
  },
  computed: {
    modValue: {
      set (v) {
        if (v) {
          this.innerValue = v
        }
      },
      get () {
        if (!this.value) {
          return ''
        }
        return this.value
      }
    }
  },
  watch: {
    value (v) {
      this.modValue = v
    }
  },
  methods: {
    init () {
      this.innerValue = this.modValue
      this.$nextTick(() => {
        this.$emit('formChange', this.innerModel())
      })
    },
    onChange (val) {
      this.modValue = val
      this.$emit('formChange', this.innerModel())
    },
    innerModel () {
      this.isEmpty = !this.innerValue
      return {
        name: this.name,
        value: this.innerValue,
        msg: this.value ? '' : (this.rules.errorMsg || this.rules.placeholder),
        isValid: (!this.rules.vRules || this.rules.vRules.indexOf('required') == -1) ? true : !!this.innerValue
      }
    }
  },
  components: {
    Datetime, Group
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped>-->
<!--.time-item-box >>> .vux-no-group-title {-->
  <!--margin-top: -2px;-->
<!--}-->
<!--.time-item-box >>> .weui-cells:before,.time-item-box >>> .weui-cells:after{-->
  <!--display:none;-->
<!--}-->
<!--.time-item-box >>> .vux-datetime {-->
  <!--text-decoration: none-->
<!--}-->
<!--</style>-->

<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
  .time-item-box {
    .weui-cells:before, .weui-cells:after, .vux-cell-box:before, .vux-cell-box:after {
      display: none;
    }
    .vux-no-group-title {
      margin-top: rem-calc(-2px);
      /*.weui-cell {*/
        /*padding: 0 rem-calc(10);*/
        /*font-size: rem-calc(15);*/
      /*}*/
    }
    .vux-datetime {
      font-size: rem-calc(15);
      text-decoration: none
    }
    .vux-datetime-value {
      color:#333 !important;
    }
  }
  .time-item-box.isempty{
    .vux-datetime-value {
      color:#ccc !important;
    }
  }
</style>
