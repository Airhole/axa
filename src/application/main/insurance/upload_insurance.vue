<!--********************************************************************
 * Author     : xiangzhi
 * Email      :
 * Last modified  : 2017-10-25
 * Filename     : upload_insurance.vue
 * Description    :  在线投保-投保书预览-手工单录入结果

********************************************************************-->
<template>
  <div class="upload_insurance">
    <sign-item @signChange="signChange" @on="signChange" :eSignModel="defaultMod"></sign-item>
    <div class="footer">
        <span class="btn btn-submit" @click="submit">确定</span>
    </div>
  </div>
</template>
<script>
  import { XTextarea, Group } from 'vux'
  import eSignModels from './models/e-signature-model'
  import signItem from "@/components/base/upload-and-sign"

  const defaultMod = {
    'value': {
      'placeholder': '请输入您的审批意见',
      'caInfoList': [
        {
          'title': 'approvalSign',
          'cType': 1,
          'imagePathList': [],
          'desc': '学历证明',
          'keyWordRule': {
            'alignMethod': 3,
            'xOffest': 10,
            'yOffest': 10,
            'keyword': '投保人签名'
          },
          'signPkgPath': null,
          'signImgPath': null,
          'photoPath': null
        }
      ]
    }
  }
  export default {
    name: 'upload_insurance',
    data () {
      return {
        now: Date.now(),
        innerErrors: {
          textarea: {
            value: false,
            errMsg: '请输入您的审批意见'
          },
          sign: {
            value: false,
            errMsg: '请审批人签名'
          }
        },
        textareaValue: '',
        placeholder: '请输入您的审批意见',
        info: '',
        status: '',
        timeTitle: '',
        agree: true,
        signInfo: null,
        form: {
          caInfoList: []
        },
        eSignModels: this.modValue
      }
    },
    methods: {
      init () {
        window.ini = this
        this.status = this.$route.query.status
        this.info = JSON.parse(this.$route.query.info)
        this.modValue = this.info
        console.log(this.info)
      },
      signChange (info) {
        if (info) {
          this.signInfo = info
          // this.innerErrors = info.approvalSign.errorMsg
          console.log('this.signInfo', this.signInfo)
          this.innerErrors.sign = {
            value: this.signInfo.info.approvalSign.isValid,
            errMsg: this.signInfo.info.approvalSign.msg
          }
        }
      },
      viewPdf (pdfPath) {
        window.articleDetail(pdfPath)
      },
      onChangeTextarea () {
        if (!this.textareaValue) {
          this.innerErrors.textarea = {
            value: false,
            errMsg: '请输入您的审批意见'
          }
        } else {
          this.innerErrors.textarea = {
            value: true,
            errMsg: ''
          }
        }
      },
      submit () {
        // console.log('LLLLLL', this.innerErrors)
        if (this.isValid) {
          let form = this.signInfo.form[0]
          let params = {
            comment: this.textareaValue,
            id: this.info.reviewApproval.id,
            signPath: form.signImgPath,
            updateTime: form.signTime,
            status: this.status,
            entryId: this.info.guarantee.entryId
          }
          params.status = '3'
        } else {
          this.__toast(this.innerErrors.errMsg)
        }
      }
    },
    computed: {
      modValue: {
        get () {
          let mod = defaultMod
          this.info = JSON.parse(this.$route.query.info)
          if (this.info) {
            mod.value.caInfoList[0].handlerName = this.info.reviewApproval.handlerName
          }
          return this.__str(mod)
        },
        set (v) {
          let mod = defaultMod
          if (v) {
            mod.value.caInfoList[0].handlerName = v.reviewApproval.handlerName
          }
          this.eSignModels = this.__str(mod)
        }
      },
      isValid () {
        let errors = this.innerErrors
        for (let i in errors) {
          let item = errors[i]
          if (typeof item === 'string') continue
          if (!item) return false
          if (!item.value) {
            this.innerErrors.errMsg = item.errMsg
            return false
          }
        }
        return true
      }
    },
    components: {
      signItem,
      XTextarea,
      Group
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';

  .upload_insurance {
    .weui-textarea {
      font-size: rem-calc(15);
    }
  }
</style>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';

  .upload_insurance {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .router-head {
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 9999;
      @include trans3d
    }
    .approval-title {
      color: #828282;
    }
    .approval-manager {
      color: #828282;
    }
    .view-info {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      padding-right: rem-calc(16);
      color: #43A6F8;
      font-size: rem-calc(15);
      text-decoration: none;
    }
    .view-info:after {
      content: " ";
      display: inline-block;
      height: 10px;
      width: 10px;
      border-width: 1px 1px 0 0;
      border-color: #43A6F8;
      border-style: solid;
      -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      position: absolute;
      top: 50%;
      margin-top: -6px;
      right: rem-calc(15);
    }
    .evaluation-by-recommender {
      display: flex;
      height: auto;
      background-size: 0;
      .evaluation-title {
        position: absolute;
        top: rem-calc(15);
        color: #828282;
      }
      .evaluation-content {
        padding-left: rem-calc(105);
        padding-top: rem-calc(9);
        padding-bottom: rem-calc(15);
        flex: 1;
        line-height: rem-calc(24);
        .recommender-name {
          color: #828282;
        }
      }
      .manager-idea {
        padding-left: rem-calc(105)!important;
      }
    }

    .footer {
      padding: rem-calc(18) 0;
      text-align: center;
      .btn {
        display: inline-block;
        width: rem-calc(150);
        height: rem-calc(45);
        line-height: rem-calc(45);
        border: 1px solid #d2d2d2;
        border-radius: rem-calc(2.5);
        font-size: rem-calc(15);
      }
      .btn-submit {
        background: #00b1ff;
        border-color: #00b1ff;
        color: #fff;
        /*margin: 0 20px;*/
        width: 25rem;
      }
    }
    ul {
      position: relative;
      background-color: #fff;
      list-style: none;
      padding-left: rem-calc(15);
      border-bottom: rem-calc(10) solid #F7F7F7;

      & > li {
        position: relative;
        display: flex;
        align-items: center;
        height: rem-calc(45);
        padding-right: rem-calc(15);
        font-size: rem-calc(15);
        @include borderbottom-1px(#efefef);
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
        color: #999999;
        & > a {
          text-decoration: none;
        }
      }
    }
    .weui-cells {
      padding: 0;
      height: rem-calc(44px);
      line-height: rem-calc(44px);
      overflow: hidden;
      vertical-align: middle;
      a {
        padding: rem-calc(0px) 0 0 0;
        font-size: rem-calc(16px);
      }
    }
    .approval-opinion {
      padding-left: 0;
      min-height: rem-calc(200);
      font-size: rem-calc(15);
      line-height: rem-calc(24);
    }
    .wrapper {
      background-size: 0;
      padding: rem-calc(5) rem-calc(15) rem-calc(5) 0;
    }
    .add-doc {
      position: absolute;
      top: rem-calc(16);
      right: rem-calc(16);
      width: rem-calc(25);
      height: rem-calc(24);
      font-size: rem-calc(15);
      text-decoration: none;
    }
    .sign {
      background: url('~@/assets/image/sign.png') no-repeat;
      background-size: contain;
      right: rem-calc(12px);
    }
    .esign-upload {
      .other-title {
        height: rem-calc(40);
        line-height: rem-calc(40);
        color: #646464;
        padding-left: rem-calc(15);
      }
      .item-wrapper {
        background-color: #ffffff;
        padding: 0 0 0 rem-calc(15);
        list-style: none;
        /*padding: rem-calc(5);*/
        li:last-child {
          border-bottom: 0;
        }
        & > li {
          display: block;
          height: auto;
          padding: rem-calc(5) rem-calc(15) rem-calc(5) 0;
          /*box-sizing: border-box;*/
          -webkit-background-size: 0;
          background-size: 0;
          /*border-bottom: 1px solid #e1e1e1;*/
          .item-block {
            display: flex;
            /*flex: 1;*/
            height: rem-calc(45);
            align-items: center;
            & > :first-child {
              flex: 1;
            }
            .upload-img {
              width: rem-calc(25);
              min-height: rem-calc(25);
              display: flex;
              padding-bottom: 5px;
              .sign {
                flex: 1;
                background: url("~@/assets/image/sign.png") no-repeat;
                background-size: contain;
              }
              .camera {
                flex: 1;
                background: url("~@/assets/image/camera.png") no-repeat;
                background-size: contain;
              }
            }
            .text {
              font-size: rem-calc(15);
              color: #999999;
            }
          }
          .img_gallery {
            margin-bottom: rem-calc(10px);
            padding-bottom: rem-calc(10);
          }
          .uploadImgEle {
            width: rem-calc(50px);
            height: rem-calc(50px);
            position: relative;
            display: inline-block;
            margin-right: rem-calc(8px);
            margin-top: rem-calc(5px);
            & > .deleimg {
              display: block;
              position: absolute;
              top: rem-calc(-9px);
              right: rem-calc(-12px);
              width: rem-calc(22px);
              height: rem-calc(22px);
              &:after {
                content: " ";
                background: url('~@/assets/image/dele.png') no-repeat;
                background-size: 20px 20px;
                padding: rem-calc(2px) rem-calc(3px);
                font-size: rem-calc(12px);
                line-height: rem-calc(14px);
                vertical-align: middle;
                overflow: hidden;
                color: #f00;
                width: rem-calc(22px);
                height: rem-calc(22px);
                font-style: normal;
                display: block;
              }
            }
            & > img {
              display: block;
              overflow: hidden;
              width: 100%;
              height: 100%;
            }
            & > i {
              display: block;
              position: absolute;
              top: 0;
              right: 0;
              width: rem-calc(15px);
              height: rem-calc(15px);
            }
          }
        }
      }
    }
    .sign-time {
      font-size: rem-calc(12);
      color: #999;
      span {
        color: #666;
      }
    }
  }
</style>
