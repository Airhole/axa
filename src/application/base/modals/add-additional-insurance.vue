<!--
      descript: 入职登记-考试确认
        author: chenrihua
        param:

-->
<template>
  <div class="page_exam_confirm">
    <confirm
      v-model="show"
      :close-on-confirm="false"
      title="请再次确认以下信息是否正确"
      @on-confirm="$emit('confirm')"
      @on-cancel="$emit('close')"
    >

      <ul>
        <li>
          <span class="title">渠道</span>
          <span class="exam-content">CCCC</span>
        </li>
        <li>
          <span class="title">营业部代码</span>
          <span class="exam-content">BBBB</span>
        </li>
      </ul>
    </confirm>
  </div>
</template>
<script>
  import { Group, XSwitch, Confirm } from 'vux'
  export default {
    name: 'examConfirm',
    data () {
      return {
        show: true
      }
    },
    methods: {
      /**
      onConfirm4 () {
        console.log('on confirm')
        this.$vux.loading.show({
          transition: '',
          text: 'processing'
        })
        setTimeout(() => {
          this.$vux.loading.hide()
          this.show4 = false
        }, 1000)
      }
       */
    },
    props: ['personalInfo'],
    components: {
      Confirm, XSwitch, Group
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
  .page_exam_confirm {
    .weui-dialog {
      max-width: rem-calc(500);
      width: 90%;
      .weui-dialog__title {
        font-size: rem-calc(15);
      }
      .weui-dialog__hd {
        @include borderbottom-1px(#f0f0f0);
        padding: rem-calc(15);
      }
      .weui-dialog__bd {
        padding: rem-calc(15);
      }
      .weui-dialog__btn {
        font-size: rem-calc(15);
        height: rem-calc(50);
        line-height: rem-calc(50);
      }
      .weui-dialog__btn_primary {
        color: #159dff;
      }
    }
  }
</style>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .page_exam_confirm {
    ul {
      position: relative;
      list-style: none;
      li {
        display: flex;
        line-height: rem-calc(36);
        font-size: rem-calc(15);
        text-align: left;

        .title {
          flex: 1;
          text-align: left;
          color: #333;
        }
        .exam-content {
          flex: 1;
          color: #999;
        }
      }
    }
  }
</style>
