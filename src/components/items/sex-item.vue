<!--
      descript: 单选组件
        author: jankergg
        param: props

      methods:
   seledcheck: 用于选择默认值 传入一个索引数即可
-->
<template>
  <div class="choose_gender">
    <div class="choose_gender_content" :class="{dis: rules && rules.disabled === true}">
      <div class="male" :class="{seled: seled === true}" @click="onChange('M')">{{ $t('genderMale') }}</div>
      <div class="famale" :class="{seled: seled === false}" @click="onChange('F')">{{ $t('genderFemale') }}</div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'sex-item',
  data () {
    return {
      // 接受多种形式的性别字段传值，‘男、女’ 或者‘M/F’ 默认 M/F
      // 为保证接口字段修改过渡时期的正常显示
      alias: {
        'M': 'M',
        'F': 'F',
        '男': 'M',
        '女': 'F'
      },
      seled: this._gender
    }
  },
  props: {
    value: {
      type: [String, Number]
    },
    rules: {
      type: [Object]
    },
    name: {
      type: String
    }
  },
  computed: {
    _gender: {
      get () {
        if (this.alias[this.value] === 'M') {
          return true
        } else if (this.alias[this.value] === 'F') {
          return false
        }
        return null
      },
      set (v) {
        if (this.alias[v] === 'M') {
          this.seled = true
        } else if (this.alias[v] === 'F') {
          this.seled = false
        } else {
          this.seled = null
        }
      }
    },
    keys () {
      return Object.keys(this.alias)
    }
  },
  watch: {
    value (val) {
      this._gender = val
    },
    seled (v) {
      this.emit()
    }
  },
  methods: {
    init () {
      this.seled = this._gender
    },
    onChange (val) {
      if (this.rules && this.rules.disabled) {
        return
      }
      for (let i in this.alias) {
        if (this.alias[i] === val) {
          this._gender = i
          break
        }
      }
    },
    emit () {
      let mod = this.innerModel()
      this.$emit('formChange', mod)
    },
    innerModel () {
      let evalue = ''
      if (this.seled === true) {
        evalue = this.keys[0]
      } else if (this.seled === false) {
        evalue = this.keys[1]
      }
      return {
        name: this.name,
        value: evalue,
        msg: this.rules && (this.rules.errorMsg || this.rules.placeholder || '请选择性别'),
        isValid: (this.seled === false || this.seled === true) ? true : !!this.seled
      }
    }
  }
}
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
  .choose_gender {
    padding-right: rem-calc(15);
    margin-top: rem-calc(-2px);
  }
</style>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
 /* .progressscanidcard-page .listbox ul > li .choose_gender{
    margin-top: rem-calc(15/2) !important;
  }*/
  input{
    font-size: rem-calc(30/2)!important;
  }
  .choose_gender {
    display: inline-block;
    width: rem-calc(170px);
    height: rem-calc(31px);
    /*background-color: red;*/
    overflow: hidden;
    position: relative;
    .choose_gender_content {
      /*width: rem-calc(160px);*/
      overflow: hidden;
      height: rem-calc(31px);
      position: relative;
      & > div {
        position: absolute;
        top: rem-calc(-14.5px);
        color: #999999;
        display: inline-block;
        /*border: 1px solid #c3c3c3;*/
        background: url("~@/assets/image/gender.png") no-repeat;
        background-size: 100% 100%;
        border-radius: rem-calc(100px);
        position: relative;
        width: rem-calc(160px);
        /*padding-left: rem-calc(20px);*/
        box-sizing: border-box;
        height: rem-calc(60px);
        line-height: rem-calc(60px);
        vertical-align: middle;
        text-indent: rem-calc(58px);
        font-size: rem-calc(26px);
        transform: scale(.5);
        /*margin-left: rem-calc(-25px);*/
        &:before {
          content: '';
          position: absolute;
          top: rem-calc(12px);
        }
        &.male {
          position: absolute;
          left: rem-calc(-160/4px);
          padding-left: rem-calc(24px);
          &:before {
            background: url("~@/assets/image/male.png") no-repeat;
            background-size: 100%;
            width: rem-calc(28px);
            height: rem-calc(30px);
            left: rem-calc(40px) !important;
            top: rem-calc(28/2) !important;
          }
          &.seled {
            border: none;
            background: #91dbfe;
            color: #fff;
            &:before {
              background: url("~@/assets/image/male_seled.png") no-repeat;
              background-size: 100%;
              width: rem-calc(28px);
              height: rem-calc(30px);
              left: rem-calc(20px);
            }
          }
        }
        &.famale {
          position: absolute;
          right: rem-calc(-158/4px);
          padding-left: rem-calc(22px);
          /*margin-left: rem-calc(-45px);*/
          &.seled {
            background: #fb7d8f;
            color: #fff;
            border: none;
            &:before {
              background: url("~@/assets/image/famale_seled.png") no-repeat;
              background-size: 100% 100%;
              width: rem-calc(20px);
              height: rem-calc(30px);
              left: rem-calc(26px);
            }
          }
          &:before {
            background: url("~@/assets/image/famale.png") no-repeat;
            background-size: 100% 100%;
            width: rem-calc(20px);
            height: rem-calc(30px);
            left: rem-calc(46px) !important;
            top: rem-calc(28/2) !important;
          }
        }
      }
    }
    .dis > div.male.seled,
    .dis > div.famale.seled {
      background:#c0c0c0;
    }
  }
</style>
