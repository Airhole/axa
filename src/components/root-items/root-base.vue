<!--
      descript: 行组件
        author: chen
        param: props

  ---------------------------------------------------
  注意：此处的rule 并不是 配置文件中的rules
  如果要访问rules下的属性，须用rule.rules -- 只在本组件生效
-->
<template>
  <div class="baseBox" :class="$extraClass">
    <!-- 动态插槽 -->
    <template v-if="overRide">
      <div class="main" :class="{line: underline}" >
        <slot :name="slotName"></slot>
      </div>
    </template>
    <template v-else-if="rule.type=='block'||rule.type=='title'">
      <div class="main nonflex" :class="rule.class||rule.type" >
        <slot :name="rule.name"></slot>
      </div>
    </template>
    <!-- 默认插槽 -->
    <template v-else>
      <div class="main" :class="{line: underline}" >
        <span v-if="required" class="required">*</span>
        <div class="baseBoxLeft">
          <slot name="label"></slot>
        </div>
        <div class="baseBoxright">
          <slot name="val"></slot>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'root-items',
    activated () {
    },
    props: {
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
    },
    computed: {
      slotName () {
        if (!this.overRide) {
          return null
        }
        if (this.name) {
          return this.name
        } else {
          throw new Error('当指定overRide属性时，必须给name传值！')
        }
      },
      underline () {
        return this.rule.rules && this.rule.rules.underline === false
      },
      $extraClass () {
        return this.rule.vertical ? this.rule.extraClass + ' vertical' : this.rule.extraClass
      },
      required () {
        if (this.rule.rules.vRules) {
          return this.rule.rules.vRules.indexOf('required') !== -1
        } else {
          return false
        }
      }
    },
    methods: {
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';

  .baseBox {
    box-sizing: border-box;
    padding-left:rem-calc(15);
    .line{
      background-image: none !important;
    }
    &.title{
      padding-left:0 !important;
    }
    .main{
      min-height: rem-calc(45);
      line-height: rem-calc(45);
      padding-top:1px;
      padding-bottom:1px;
      @include borderbottom-1px(#efefef);
      display:flex;
      .required {
        color: #FE1641;
        position: absolute;
        left: 5px;
      }
      .baseBoxLeft{
        font-size: rem-calc(15px);
      }
      .baseBoxright{
        flex:1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .baseBoxright.atop{
        align-items: flex-start!important;
      }
    }
    .nonflex{
      display:block;
    }
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
