<!--
      descript: form-unit 表单 单元组件
        author: jankergg
        param: props {
          formModels // 表单值 数据结构
          formRules // 表单初始化属性，包含name/type/验证规则等等
        }
        example:
    <form-unit
    :formModels="formModels"
    :formRules="formRules"
    @formChange="onChange"
    @formValid="onValid">
      slot动态插入row:
      组件数据与视图通过name值绑定
      动态插入row时，需要显式在rule里添加 overRide：true
      例:
      Model = {
          value: '33333',
          name: 'testInput3' <<<< name
        }
      Rule = {
        testInput3: {     <<<<  name 为key值
          label: 'testInput3',
          type: 'input',
          overRide: true,  <<<<<  注意看这里
          rules: {
            vRules: 'required|phonenum',
            placeholder: 'xxxxx'
          }
        }
      }
      <template slot="testInput3" scope="props">
        <root-input
        @formChange="onChange"
        @formPassed="onValid"
        :rules="props.rule.rules"
        :value="props.item.value"
        :name="props.item.name">
        </root-input>
      </template>
    </form-unit>
    // TODO 排序
-->
<template>
  <div class="form-unit">
    <!--<div @click="deleteThis" v-if="delBtn=='top'" class="delbtn" :class="delBtn">删除</div>-->
<!--     <div class="head" v-if="delPart == 'top'">
      <div class="msg">
        <span>{{title}}</span>
      </div>
    </div>
    <div class="relative" v-if="delPart == 'relative'">
      <div class="msg">
        <span>{{title}}</span>
      </div>
      <span class="delete-unit" @click="deleteThis"></span>
    </div>
 -->
    <!-- title slot -->
    <slot name="unit-title" :index="index" :titleConfig="titleConfig"></slot>
    <!-- title slot -->

    <template v-for="(value, key, index) in $formRules">
      <!-- form-block -->
      <form-block
        v-if="value.display=='block'"
        :key="key"
        :index="index"
        :formModel="$formModels[key]"
        :formRule="value"
        :name="key"
        @formChange="onChange">
      </form-block>
      <form-row
        v-else
        :key="key"
        :index="index"
        :formModel="$formModels[key]"
        :formRule="value"
        :name="key"
        @formChange="onChange">
      </form-row>

      <!-- 如果含有子集 -->
      <template v-if="value.child">
      <template v-for="(subvalue, subkey, subindex) in value.child">
        <!-- form-block -->
        <form-block
          v-if="subvalue.display=='block'"
          :key="subkey"
          :index="index+''+subindex"
          :formModel="{name:subkey,value:$formModels[key].value[subkey]}"
          :formRule="subvalue"
          :name="subkey"
          @formChange="onChange">
        </form-block>
        <form-row
          v-else
          :key="subkey"
          :index="index+''+subindex"
          :formModel="{name:subkey,value:$formModels[key].value[subkey]}"
          :formRule="subvalue"
          :name="subkey"
          @formChange="onChange">
        </form-row>
      </template>
      </template>
      <!-- 如果含有子集 -->
    </template>
    <!--<div @click="deleteThis" v-if="delBtn=='bottom'" class="delbtn" :class="delBtn">删除</div>-->
  </div>
</template>

<script>
import formRow from '../item/form-row'
import formBlock from '../item/form-block'
import formMixin from '../mixin/form-mixin'

export default {
  name: 'form-unit',
  data () {
    return {
      form: {},
      formErrors: {},
      errorBag: [],
      isValid: false
    }
  },
  mixins: [formMixin],
  components: {
    formRow,
    formBlock
  },
  props: {
    titleConfig: Object,
    formModels: {
      type: [Array, Object],
      default () {
        return []
      }
    },
    formRules: {
      type: [Array, Object],
      default () {
        return []
      }
    },
    index: {
      type: [String, Number]
    },
    name: {
      type: [String, Number, Object]
    },
    delPart: {
      type: String
    }
  },
  computed: {
    $formModels () {
      if (typeof this.formModels === 'string') {
        return JSON.parse(this.formModels)
      }
      return this.formModels
    },
    $formRules () {
      if (typeof this.formRules === 'string') {
        return JSON.parse(this.formRules)
      }
      return this.formRules
    },
    // 用于排序
    keys () {
      let key
      let keys = []
      let obj = this.$formModels
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push(key)
        }
      }
      return keys
    }
  },
  methods: {
    submit () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      let mod = this.__obj(this.innerModel())
      this.timer = setTimeout(() => {
        this.$emit('formChange', mod)
        this.timer = null
      }, 200)
    },
    onChange (val) {
      this.updateForm(val)
    },
    updateForm (val) {
      // 缓存带有child的组件name
      if (!this.__cacheParent) {
        this.__cacheParent = {}
        this.mountChild()
      }
      // 如果是子节点更新了
      if (this.__cacheParent[val.name]) {
        let parent = this.__cacheParent[val.name]
        let realVal = this.form[parent] || {}
        realVal.value = realVal.value || {}
        this.$set(realVal, 'name', parent)
        this.$set(realVal.value, val.name, val.value)
        this.$set(this.form, parent, realVal)
      } else {
        // 添加需要更新的属性
        let prop = this.__attach(['name', 'value', 'index'], val)
        this.$set(this.form, val.name, prop)
      }
      this.$set(this.formErrors, val.name, val)
    },
    mountChild () {
      let obj = this.$formRules
      let ts = this
      for (let i in obj) {
        if (obj.hasOwnProperty(i) && obj[i].child) {
          for (let prop in obj[i].child) {
            if (obj[i].child.hasOwnProperty(prop)) {
              this.__cacheParent[prop] = i
            }
          }
        }
      }
    },
    deleteThis () {
      this.$emit('formDelete', {index: this.index, name: this.name})
    },
    mountErrors () {
      this.errorBag = []
      this.keys.forEach(i => {
        let err = this.formErrors[i]
        if (err && err.name && !err.isValid) {
          this.errorBag.push(err)
        }
      })
      return this.errorBag
    },
    innerModel () {
      this.mountErrors()

      let _msg = this.errorBag[0] && this.errorBag[0].msg || null
      return {
        name: ((this.name || this.index) || 'formUnit').toString(),
        value: this.form,
        index: this.index,
        msg: _msg,
        status: this.isEmpty() ? 'empty' : (this.isValid ? 'valid' : 'dirty'),
        errorBag: this.errorBag,
        isValid: this.isValid
      }
    },
    isEmpty () {
      let _all = Object.values(this.form).filter(item => {
        return (item.value === '' || item.value === null)
      })
      return _all.length === this.keys.length
    }
  },
  watch: {
    form: {
      deep: true,
      handler () {
        this.isValid = this.__isValid(this.formErrors)
        this.$nextTick(() => {
          this.submit()
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .form-unit {
    .head {
      position: relative;
      background-color: #f7f7f7;
      overflow: hidden;
      height: rem-calc(91/2px);
      line-height: rem-calc(91/2px);
      box-sizing: border-box;
      padding: 0px rem-calc(30/2px);
      .msg {
        float: left;
        font-size: rem-calc(30/2px);
        color: #666;
        &:before {
          content: "";
          display: inline-block;
          width: rem-calc(5/2px);
          height: rem-calc(32/2px);
          padding-left: rem-calc(16/2px);
          box-sizing: border-box;
          border-left: rem-calc(5/2px) solid #00b0ff;
          vertical-align: middle;
          margin-top: rem-calc(-2);
        }
      }
      .delete-unit {
        position: absolute;
        right: 0;
        display: inline-block;
        width: rem-calc(91/2px);
        height: rem-calc(91/2px);
        background: url('~@/assets/image/enroll/trash.png') no-repeat;
        -webkit-background-size: cover;
        background-size: 40%;
        background-position: center center;
      }
    }
    .relative {
      position: relative;
      /*background-color: #f7f7f7;*/
      @include borderbottom-1px(#000);
      overflow: hidden;
      height: rem-calc(91/2px);
      line-height: rem-calc(91/2px);
      box-sizing: border-box;
      padding-right: rem-calc(15);
      margin-left: rem-calc(15);
      .msg {
        float: left;
        font-size: rem-calc(30/2px);
        color: #666;
      }
      .delete-unit {
        position: absolute;
        right: 0;
        display: inline-block;
        width: rem-calc(91/2px);
        height: rem-calc(91/2px);
        background: url('~@/assets/image/enroll/trash.png') no-repeat;
        -webkit-background-size: cover;
        background-size: 40%;
        background-position: center center;
      }
    }
  }
</style>
