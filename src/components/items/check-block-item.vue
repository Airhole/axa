<!--
      descript: yes-no 多级 组件
        author: jankergg
        param: props
        example:
-->
<template>
   <!-- 是否 类型 -->
  <div class="baseBox hotitle">
    <div class="main">
      <div class="baseBoxLeft"><label class="input-label">{{rules.label}}</label></div>
      <div class="baseBoxright atop">
        <div class="radio">
          <div class="radio-button">
            <span :class="{active: innerValue.yesorno === 'yes'}" @click="check(true)">是</span>
            <span :class="{active: innerValue.yesorno === 'no'}" @click="check(false)">否</span>
          </div>
        </div>
      </div>
    </div>
    <ul class="check-list" v-if="showOptions">
      <li v-for="(item, key, index) in rules.options" :key="index">
        <label :for="key" class="labels">
          <input class="checkbox" type="checkbox" :id="key" :name="key" :checked="isChecked(key)" :value="key" v-model="innerValue.selected" />
          {{item.label}}
        </label>
      </li>
    </ul>
  </div>
  <!-- 是否 类型 -->
</template>

<script>
  import formMixin from '../mixins/form-mixin'
  export default {
    name: 'check-block-item',
    mixins: [formMixin],
    data () {
      return {
        innerValue: this.modValue,
        isValid: false,
        errorMsg: this.rules.errorMsg || this.rules.placeholder || '您还有未完成的选项'
      }
    },
    props: ['rules', 'name', 'value'],
    watch: {
      value (v) {
        if (this.__str(v) !== this.__str(this.innerValue)) {
          this.modValue = v
        }
      },
      innerValue: {
        deep: true,
        handler () {
          if (this.innerValue.yesorno === 'yes') {
            this.isValid = this.rules.options ? !!this.innerValue.selected.length : true
          } else if (this.innerValue.yesorno === 'no') {
            this.isValid = true
          }
          this.emit()
        }
      }
    },
    computed: {
      showOptions () {
        return this.rules.options && (this.innerValue.yesorno === 'yes' || !this.innerValue.yesorno)
      },
      modValue: {
        set (v) {
          if (v.yesorno === undefined && v.selected === undefined) {
            v = {yesorno: 'no', selected: []}
          }
          if (typeof v.selected === 'string') {
            v.selected = v.selected.split('/')
          }
          // 处理接口异常数据
          if (v.selected === null) {
            v.selected = []
          }
          this.innerValue = v
        },
        get () {
          let v = this.value
          if (v.yesorno === undefined || v.selected === undefined) {
            v = {yesorno: 'no', selected: []}
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
        if (val) {
          this.$set(this.innerValue, 'yesorno', 'yes')
        } else {
          this.$set(this.innerValue, 'yesorno', 'no')
          this.$set(this.innerValue, 'selected', [])
        }
      },
      emit () {
        this.$emit('formChange', this.innerModel())
      },
      isChecked (key) {
        if (this.innerValue.selected.find) {
          return !!this.innerValue.selected.find(i => i == key)
        }
        return false
      },
      innerModel () {
        return {
          name: this.name,
          value: this.__obj(this.innerValue),
          msg: this.isValid ? null : this.errorMsg,
          isValid: this.isValid
        }
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .baseBox {
    box-sizing: border-box;
    padding-right:rem-calc(15);
    padding-bottom:rem-calc(10);
    padding-top:rem-calc(10);
    .main{
      display: flex;
      background:none;width:100%;
      .baseBoxLeft{
        line-height:1.6;
      }
    }
    .check-list{
      width:100%;
      flex:1;
      list-style:none;
      display:block;
      clear:both;
      & > li{line-height:1.4;}
      .labels{
        display:block;
        position:relative;
        padding-left:rem-calc(25);
        padding-top:rem-calc(5);
        padding-bottom:rem-calc(5);
      }
      .checkbox{position:absolute;top:rem-calc(5);left:0;}
    }
    .radio {
      display: flex;
      align-items: top;
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
  }
</style>
