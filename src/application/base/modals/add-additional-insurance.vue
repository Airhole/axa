<!--
      descript: 入职登记-考试确认
        author: chenrihua
        param:

-->
<!--
      descript: 展业工具-贺卡-模态框
        author: ChenRihua
        param:
-->
<template>
  <div class="page_add-additional-insurance">
    <x-dialog v-model="show" class="page_dialog">
      <div class="close-wrapper">
        <!--<span class="vux-close" @click="$emit('close')"></span>-->
        <span class="vux-close">
            <x-icon type="ios-close-outline" class="icon" @click="$emit('close')"></x-icon>
          </span>
      </div>
      <div class="dialog-wrapper">
        <div class="title">附加险</div>
        <slot name="content"></slot>
        <div class="checklist">
          <checklist :label-position="'left'" required :options="commonList" v-model="checklist001" @on-change="change"></checklist>
        </div>
        <div class="confirm-btn" @click="$emit('confirm')">
          确定
        </div>
      </div>

    </x-dialog>
  </div>
  <!--<div v-transfer-dom>-->
  <!---->
  <!--</div>-->

</template>
<script>
  import { Checklist, PopupPicker, Group, Datetime, XTextarea, XDialog, XSwitch, TransferDomDirective as TransferDom } from 'vux'
  import CButton from '../../../components/base/default-btn.vue'

  export default {
    name: 'c_modal',
    directives: {
      TransferDom
    },
    data () {
      return {
        commonList: ['1001 附加医疗', '1002 附加住院', '1003 附加保险', '1004 附加xx', '1003 附加保险', '1003 附加保险', '1003 附加保险', '1003 附加保险', '1003 附加保险'],
        show: true
      }
    },
    methods: {
      confirm () {
        console.log(this.firstdetail)
      },
      onHide () {

      },
      onChange () {

      },
      checkgander (v) {
        if (v === 'M') {
          this.form.genderCode = 'M'
        } else {
          this.form.genderCode = 'F'
        }
      }
    },
    components: {
      CButton, PopupPicker, Group, Datetime, XTextarea, XDialog, XSwitch, Checklist
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';

  .page_dialog {
    .weui-dialog {
      background: none;
      top: 45%;
      max-width: rem-calc(400);
      width: 90%;
    }
    /*.dialog-title {*/
    /*line-height: 30px;*/
    /*color: #666;*/
    /*}*/
    /*.img-box {*/
    /*height: 350px;*/
    /*overflow: hidden;*/
    /*}*/
    .close-wrapper {
      display: flex;
      justify-content: flex-end;
      .vux-close {
        margin-top: 8px;
        margin-bottom: 8px;
        display: inline-block;
        vertical-align: middle;
        .icon {
          fill: #fff;
          width: 28px;
          height: 28px;
        }
      }
    }
    .dialog-wrapper {
      background: #fff;
      border-radius: 8px;
      padding-bottom: rem-calc(50);
      /*height: 350px;*/
      overflow: hidden;
    }
    .confirm-btn {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: rem-calc(50);
      background-color: #20aee5;
      line-height: rem-calc(50);
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      font-size: rem-calc(17);
      color: #fff;
    }
    .weui-cell__bd {
      text-align: left;
      font-size: rem-calc(16);
    }
    .weui-cells:before {
      border-top: none;
    }
  }

  /*}*/
</style>
<style lang='scss' rel="stylesheet/scss" scoped>
  .page_dialog {
    .title {
      line-height: rem-calc(50);
      font-size: rem-calc(18);
      border-bottom: 1px solid #D9D9D9;
    }
    .checklist {
      /*padding: rem-calc(15) 0;*/
      max-height: rem-calc(350);
      overflow: scroll;
    }
  }
</style>
