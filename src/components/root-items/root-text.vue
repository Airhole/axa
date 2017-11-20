<!--
      descript: 行组件
        author: chen
        param: props

  ---------------------------------------------------
  注意：此处的rule 并不是 配置文件中的rules
  如果要访问rules下的属性，须用rule.rules -- 只在本组件生效
-->
<template>
  <div class="baseBox">
      <div v-for="(item ,index) in list" :key="index">
        <div class="main">
          <div class="baseBoxLeft">
            <!--<slot name="label"></slot>-->
            <label>{{item.value}}</label>
          </div>
          <div class="baseBoxright">
            <!--<slot name="val"></slot>-->
            <label v-html="item.name"></label>
          </div>
        </div>
      </div>
    <!--</template>-->
  </div>
</template>
<script>
  export default {
    name: 'root-items',
    activated () {
    },
    data () {
      return {
        // list: [{key: '姓名', value: '任汝芬'}, {key: '证件类型', value: '身份证'}, {key: '证件类型', value: '身份证'}]
      }
    },
    props: {
      list: {
        type: [Object, Array]
      }
      /**
      name: {
        type: String
      },
      rule: {
        type: Object
      },
      isalert: {
        type: Boolean,
        default () {
          return false
        }
      },
      overRide: {
        type: [Boolean, Object, Array],
        default () {
          return false
        }
      },
      isShowUnderLine: {
        type: Boolean,
        default () {
          return true
        }
      }
       */
    }
//    computed: {
//      slotName () {
//        if (!this.overRide) {
//          return null
//        }
//        if (this.name) {
//          return this.name
//        } else {
//          throw new Error('当指定overRide属性时，必须给name传值！')
//        }
//      },
//      underline () {
//        return this.rule.rules && this.rule.rules.underline === false
//      },
//      $extraClass () {
//        return this.rule.vertical ? this.rule.extraClass + ' vertical' : this.rule.extraClass
//      }
//    },
//    methods: {
//    }
  }
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .line{
    background-image: none !important;
  }
  .title{
    padding-left:0 !important;
  }
  .baseBox{
    box-sizing: border-box;
    padding-left:rem-calc(15);
  }
  .main{
    min-height: rem-calc(45);
    line-height: rem-calc(45);
    padding-top:1px;
    padding-bottom:1px;
    padding-right: rem-calc(15);
    @include borderbottom-1px(#efefef);
    display:flex;
    .baseBoxLeft{
      font-size: rem-calc(15px);
    }
    .baseBoxright{
      flex:1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: rem-calc(15px);
      label {
        color: #999999;
        text-align: right;
        max-width: 14.5rem;
      }
    }
    .baseBoxright.atop{
      align-items: flex-start!important;
    }
  }
  .nonflex{
    display:block;
  }

  .vertical {
    .line{
      background-image: none !important;
    }
    .title{
      padding-left:0 !important;
    }
    .baseBox{
      box-sizing: border-box;
      padding-left:rem-calc(15);
    }
    .main{
      padding-right: rem-calc(15);
      height: 0;
      line-height: 0;
      @include borderbottom-1px(#efefef);
      display:flex;
      flex-direction: column;
      .baseBoxLeft{
        /*flex: 1;*/
        height: rem-calc(45);
        font-size: rem-calc(15px);
      }
      .baseBoxright{
        flex:1;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
      }
    }
    .nonflex{
      display:block;
    }
  }
</style>
