<!--
      descript: 单选组件
        author: gongshuai
        param: props

      methods:
   seledcheck: 用于选择默认值 传入一个索引数即可
-->
<template>
  <dl class="lineDialog">
    <dt class="part-title" :class="{'seled' : !show}" @click="toggle">{{title}}</dt>
    <dd class="part">
      <ul v-show="show">
        <li v-for="(item, index) in $Model">
          <div v-if="item.type == '1' || item.type == '2'">
            <div class="exam-title">{{item.titleSeq}}、{{item.title}}</div>
            <csinglebox :items="item.contentArray" :detailId="item.detailId" @formChange="onChange"
                        :type="item.type=='2'?'multiple':''"></csinglebox>
          </div>
          <div v-if="item.type == '3'">
            <radioBlock :item="item" :index="index" :detailId="item.detailId" @formChange="onInputSwitch">
            </radioBlock>
          </div>
        </li>
      </ul>
    </dd>
  </dl>
</template>
<script>
  import csinglebox from '@/components/base/csinglebox'
  import radioBlock from '@/components/rootItem/rootRadioBlock'

  export default {
    name: 'exam-item',
    data () {
      return {
        show: true,
        innerErrors: {},
        form: {}
      }
    },
    created: function () {
    },
    components: {
      csinglebox, radioBlock
    },
    props: {
      formModel: {
        type: [Object, Array]
      },
      title: {
        type: String,
        default () {
          return '标题'
        }
      }
    },
    watch: {
    },
    computed: {
      $Model () {
        return this.formModel
      }
    },
    methods: {
      toggle () {
        this.show = !this.show
      },
      onChange (val) {
        if (val) {
          this.$emit('formChange', {value: val, isValid: !!val.answer})
        }
      },
      onInputSwitch (val) {
//        console.log(val)
        if (val) {
          let radioAns = ''
          if (val.answer === -1) {
            radioAns = -1
          } else {
            radioAns = true
          }
          if (val.answer === true) {
            val.answer = 'Y'
          } else {
            val.answer = 'N'
          }
          this.$emit('formJudgement', {value: val, isValid: radioAns})
        }
      }
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~assets/scss/function';

  .lineDialog {
    .csinglebox {
      ul {
        position: relative;
        background-color: #fff;
        list-style: none;
        margin-bottom: rem-calc(15);
        margin-left: 0;
        li {
          line-height: rem-calc(45);
          position: relative;
          display: flex;
          align-items: center;
          padding-right: rem-calc(15);
          font-size: rem-calc(15);
          .ccheckbox {
            font-size: rem-calc(15) !important;
            color: #333;
          }
          .ccheckbox:before {
            width: rem-calc(14);
            height: rem-calc(14);
            top: rem-calc(14);
            /*<!--left: rem-calc(-33);-->*/
          }
        }
      }
    }
    .announcement_warp .radioTextarea {
      display: none;
    }
  }

</style>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~assets/scss/function';

  .lineDialog {
    & > dt {
      position: relative;
      &:after {
        content: " ";
        display: inline-block;
        height: 12px;
        width: 12px;
        border-width: 0 1px 1px 0;
        border-color: #9A9A9A;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        margin-top: -10px;
        right: rem-calc(15);
      }
      &.seled {
        &:after {
          /*transform: rotate(135deg) scale(.5);*/
          /*transform-origin:70% 50%;*/
          transform: rotate(225deg);
          top: 60%;
        }
      }
    }
    & > dd {
      /*min-height: rem-calc(45px);*/
      vertical-align: middle;
      display: table;
      width: 100%;
      & > div {
        display: table-cell;
        vertical-align: middle;
        @include borderbottom-1px(#efefef);
        &:last-child {
          text-align: right;
          padding-right: rem-calc(15px);
          color: #999;
        }
      }
    }
    &.sonlist {
      & > dt {
        &:before {
          display: none;
        }
      }
    }
  }

  ul {
    position: relative;
    background-color: #fff;
    list-style: none;
    & > li {
      align-items: center;
      padding: rem-calc(15);
      font-size: rem-calc(15);
      @include borderbottom-1px(#f0f0f0);
      .exam-title {
        color: #333;
        font-size: rem-calc(15);
        line-height: rem-calc(24);
      }
      & > span {
        display: inline-block;
      }
    }
    .input {
      flex: 1;
      font-size: rem-calc(15);
      border: 0;
      outline: none;
      -webkit-appearance: none;
      /*text-align: right;*/
      color: #999999;
      & > a {
        text-decoration: none;
      }
    }
  }

  .part-title {
    position: relative;
    padding: rem-calc(18) rem-calc(15);
    color: #333;
    background-color: #fff;
    font-size: rem-calc(15);
    @include borderbottom-1px(#f0f0f0);
  }

  .part {
    border-bottom: rem-calc(10) solid #F3F3F3;
  }

</style>
