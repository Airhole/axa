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
      <!-- 遍历出options所有节点 -->
      <li v-for="(item, key, index) in rules.options" :key="index">
          <!-- 遍历出子节点 -->
          <template v-for="(subitem, subindex) in item">
            <!-- 如果是多行，需要强制加换行 -->
            <template v-if="subindex>0"><br/></template>
            <label class="input-labels" v-if="subitem.type && subitem.rules">
              {{subitem.label}}
              <!-- input 类型 -->
              <root-input
                v-if="subitem.type=='input-txt'||subitem.type=='input'"
                @formChange="onChange"
                :rules="subitem.rules"
                :value="getInptVal(key,subindex)"
                :index="subindex"
                :name="key">
              </root-input>
              <!-- input 类型 -->
              <!-- textarea-类型 -->
              <textarea-item
                v-if="subitem.type=='textarea'"
                @formChange="onChange"
                :rules="subitem.rules"
                :value="getInptVal(key,subindex)"
                :index="subindex"
                :name="key">
              </textarea-item>
              <!-- textarea-类型 -->
              {{subitem.rules.txt}}
            </label>

            <!-- checkbox 类型 -->
            <label :for="key" class="labels" v-else>
              <input class="checkbox" type="checkbox" :id="key" :name="key" :checked="isChecked(key)" :value="key" @change="toggleChecked(key)" />
              {{subitem.label}}
            </label>
            <!-- checkbox 类型 -->
          </template>
      </li>
    </ul>
  </div>
  <!-- 是否 类型 -->
</template>

<script>
  import rootInput from '../root-items/root-input'
  import textareaItem from '../items/textarea-item'
  export default {
    name: 'check-block-item',
    components: {rootInput, textareaItem},
    data () {
      return {
        innerValue: this.modValue,
        isValid: false,
        inputItems: {}, // 如果包含input、select子项
        errorMsg: this.rules.errorMsg || this.rules.placeholder || '您还有未完成的选项'
      }
    },
    props: ['rules', 'name', 'value'],
    watch: {
      value (v) {
        // if (this.__str(v) !== this.__str(this.innerValue)) {
        this.modValue = v
        // }
      },
      innerValue: {
        deep: true,
        handler () {
          if (this.innerValue.yesorno === 'no') {
            this.isValid = true
            if (this.innerValue.selected.length) {
              this.innerValue.selected = []
            }
          }
          this.$nextTick(() => {
            // console.error('emit', this.innerModel())
            this.emit()
          })
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
        if (this.name === 'q1') {
          window.cc = this
        }
        this.innerValue = this.modValue
      },
      check (val) {
        if (val) {
          this.$set(this.innerValue, 'yesorno', 'yes')
        } else {
          this.$set(this.innerValue, 'yesorno', 'no')
          this.$set(this.innerValue, 'selected', [])
        }
        this.validSelect()
      },
      getInptVal (key, index) {
        let val = this.innerValue.selected
        if (!val || !val.length) {
          return ''
        }
        let ob = val.find(i => i[key])
        if (!ob) {
          return ''
        }
        let list = ob[key]
        return list[index] || ''
      },
      emit () {
        let mod = this.innerModel()
        this.$emit('formChange', mod)
      },
      isChecked (key) {
        if (this.innerValue.selected.find) {
          let se = this.innerValue.selected.find(i => i[key])
          return !!se
        }
        return false
      },
      toggleChecked (key) {
        let se = this.innerValue.selected.find(i => i[key])
        if (!se) {
          let val = {}
          val[key] = []
          this.innerValue.selected.push(val)
        } else {
          let idx = this.innerValue.selected.indexOf(se)
          this.innerValue.selected.splice(idx, 1)
        }
        this.validSelect(key, se)
      },
      onChange (v) {
        let ob = this.innerValue.selected.find(i => i[v.name])
        if (!ob) {
          let val = {}
          val[v.name] = []
          this.innerValue.selected.push(val)
        }
        ob[v.name][v.index] = v.value
        this.validChild(v, ob)
      },
      validChild (v, ob) {
        let rule = this.rules.options[v.name]
        let val = ob ? ob[v.name] : null
        let valid = []
        rule.forEach((i, index) => {
          // 是否必填
          // console.log('xxxxxxxxx', v.name, this.__str(val[v.index]), this.__str(val[index]))
          if (i.rules && i.rules.vRules) {
            if (!val) {
              this.errorMsg = v.msg
              valid.push(i)
            } else if (!val[index]) {
              this.errorMsg = v.msg
              valid.push(i)
            } else {
            }
          }
        })
        this.isValid = !valid.length
        this.$nextTick(() => {
          this.emit()
        })
      },
      validSelect (key) {
        if (!this.rules.options) {
          this.isValid = true
          return
        }
        if (!this.showOptions) {
          this.isValid = true
          return
        }
        if (!key) {
          this.isValid = this.innerValue.selected.length
          return
        }
        let isHasInput = this.rules.options[key].find(i => i.rules)
        if (!isHasInput) {
          this.isValid = this.innerValue.selected.length
        }
      },
      innerModel () {
        let _val = this.__obj(this.innerValue)
        _val.rules = this.rules
        return {
          name: this.name,
          value: _val,
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
      & > li{
        line-height:1.4;
        font-size: rem-calc(14px);
        list-style: lower-alpha;
        list-style-position: outside;
        margin-left: rem-calc(20);
      }
      .labels{
        display:block;
        position:relative;
        margin-top:rem-calc(-18);
        padding-left:rem-calc(5);
        padding-bottom:rem-calc(5);
        vertical-align: middle;
        display: flex;
      }
      .input-labels{
        /*display:block;*/
        position:relative;
        padding-left:rem-calc(5);
        margin-top:rem-calc(-18);
        padding-bottom:rem-calc(5);
        display: flex;
      }
      .input-labels >>> .rootInput{
        height:rem-calc(15);
      }
      .checkbox{padding:0;vertical-align: middle;}
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
