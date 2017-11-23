<!--
      descript: input-btn 组件
        author: jankergg
        param: props
        example:
-->
<template>
   <!-- input 类型 -->
  <div class="input-btn-box">
    <root-input
    @formChange="onChange"
    @formPassed="onVlid"
    :rules="$rules"
    :value="innerValue"
    :name="name">
    </root-input>
    <div class="txt" v-if="$rules.showExtBtn == undefined||$rules.showExtBtn == true">
      <div class="selectIcon" @click="emission">
        <span class="icon-cricle" :class="{'active': isMiss}"></span>
        <span class="icon-text" :class="{'icon-text-active': isMiss}">{{$rules.txt}}</span>
      </div>
    </div>
    <!-- input 类型 -->
  </div>
</template>
<script>
import rootInput from '../root-items/root-input'

export default {
  name: 'input-btn-item',
  data () {
    return {
      isMiss: false,
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
    },
    emission () {
      this.isMiss = !this.isMiss
      this.$set(this.$rules, 'readOnly', this.isMiss)
      // missionTarget: 通知父组件需要更新哪个字段
      this.$emit('emission', {target: this.rules.emitTarget, value: this.isMiss})
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
  .input-btn-box {
    display:flex;
    height:100%;
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
</style>
