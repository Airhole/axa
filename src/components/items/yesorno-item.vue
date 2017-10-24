<!--
      descript: yes-no 组件
        author: jankergg
        param: props
        example:
-->
<template>
   <!-- 是否 类型 -->
  <div class="radio">
    <div class="radio-button">
      <span :class="{active: innerValue === 'true'}" @click="check(true)">是</span>
      <span :class="{active: innerValue === 'false'}" @click="check(false)">否</span>
    </div>
  </div>
  <!-- 是否 类型 -->
</template>

<script>
  export default {
    name: 'yes-no',
    data () {
      return {
        innerValue: this.modValue,
        isValid: false
      }
    },
    props: ['rules', 'name', 'value'],
    watch: {
      value (v) {
        if (JSON.stringify(v) !== JSON.stringify(this.innerValue)) {
          this.modValue = v
        }
      },
      innerValue () {
        this.isValid = !(this.innerValue === null)
        this.emit()
      }
    },
    computed: {
      modValue: {
        set (v) {
          if (typeof v === 'boolean') {
            this.innerValue = v + ''
          } else if (!v) {
            this.innerValue = null
          } else {
            this.innerValue = v
          }
        },
        get () {
          let v
          if (typeof this.value === 'boolean') {
            v = this.value + ''
          } else if (!this.value) {
            v = null
          } else {
            v = this.value
          }
          return v
        }
      }
    },
    methods: {
      init () {
        this.innerValue = this.modValue
      },
      check (val) {
        this.innerValue = val + ''
      },
      emit () {
        this.$emit('formChange', this.innerModel())
      },
      innerModel () {
        return {
          name: this.name,
          value: this.innerValue + '',
          msg: this.isValid ? null : (this.rules ? this.rules.errorMsg || '请选择是或者否' : null),
          isValid: this.isValid
        }
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .radio {
    display: flex;
    padding-right:rem-calc(20);
    .radio-button {
      margin-top: rem-calc(4);
      display: flex;
      height: rem-calc(25);
      overflow: hidden;
      width: rem-calc(70);
      margin-left: rem-calc(21);
      align-items: center;
      border: 1px solid #00a5ff;
      border-radius: 5px;
      & > span {
        flex: 1;
        text-align: center;
        color: #999999;
        padding: rem-calc(6) 0;
      }
      & > :first-child {
        border-right: 1px solid #00a5ff;
      }
      .active {
        color: #ffffff;
        background-color: #00a5ff;
      }
    }
  }
</style>
