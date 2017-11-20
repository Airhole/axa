<!--
      descript: timer 组件
        author: jankergg
        param: props
        example:
-->
<template>
    <group class="time-item-box" :class="{isempty: isEmpty, showext: rules.showExtBtn}">
      <datetime
      v-if="readOnly"
      readonly
      @on-change="onChange"
      clear-text=""
      :placeholder="rules.placeholder"
      v-model.trim="innerValue"
      :format="'YYYY-MM-DD'"
      :start-date="rules.stime"
      :end-date="rules.etime"
      :min-year="1940"
      :title="''"
      :name="name">
    </datetime>
    <datetime
      v-else
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
    <div class="txt" v-if="rules.showExtBtn">
      <div class="selectIcon" @click="emission">
        <span class="icon-cricle" :class="{'active': isLong}"></span>
        <span class="icon-text" :class="{'icon-text-active': isLong}">{{rules.txt}}</span>
      </div>
    </div>
  </group>
</template>
<script>
import {Datetime, Group} from 'vux'

export default {
  name: 'time-item',
  data () {
    return {
      isEmpty: true,
      readOnly: this.rules.readOnly,
      isLong: false,
      innerValue: this.modValue
    }
  },
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
    emission () {
      this.isLong = !this.isLong
      this.readOnly = this.isLong
      if (this.isLong) {
        this.innerValue = '9999'
      }
      // this.$emit('emission', {target: this.rules.emitTarget, value: this.isLong})
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
    display:flex;
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
    .txt {
      padding-right: rem-calc(15);
      font-size: rem-calc(15);
      display:flex;
      position: relative;
        .selectIcon {
        display: flex;
        align-items: center;
        .icon-cricle {
          display: inline-block;
          width: rem-calc(18);
          height: rem-calc(18);
          line-height: rem-calc(18);
          border-radius: 50%;
          background-color: #cccccc;
          &:before {
            content: ' ';
            display: block;
            border-bottom: rem-calc(2) solid #ffffff;
            border-left: rem-calc(2) solid #ffffff;
            width: rem-calc(16);
            height: rem-calc(8);
            transform: rotate(-45deg) scale(.8);
            margin-top: rem-calc(1);
          }
        }
        .active {
          background-color: #00aeff;
        }
        .icon-text {
          font-size: rem-calc(13);
          color: #a5a5a5;
          margin-left: rem-calc(4);
        }
        .icon-text-active {
          color: #00aeff;
        }
      }
    }
  }
  .time-item-box.isempty{
    .vux-datetime-value {
      color:#ccc !important;
    }
  }
  .time-item-box.showext{
    .vux-no-group-title {
      display:flex;
    }
  }
</style>
