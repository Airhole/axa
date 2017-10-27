<!--********************************************************************
 * Author        : xiangzhi
 * Filename      : upload_insurance.vue
 * Description   :
 * Time          : 2017/10/26
 *
********************************************************************-->
<template>
  <div class="upload_insurance">
    <div class="upload_insurance_certify">
      <div class="head"><div class="msg">证件影像上传</div></div>
      <ul class="item-wrapper">
        <li>
          <div class="item-block">
            <div>
              <div>啊啊啊<span class="relation">投保人</span></div>
              <div class="id_card">身份证&nbsp;&nbsp;12312312312312</div>
            </div>
            <div class="upload-img">
             <div class="camera"></div>
            </div>
          </div>
          <div class="img_gallery" style="display: none;">
            <span class="uploadImgEle" style="display: none;"><i class="deleimg"></i> <img/></span>
            <span class="uploadImgEle" style="display: none;"><i class="deleimg"></i> <img/></span>
          </div>
          <div data-v-37149d1a="" class="img_gallery" style="display: none;"></div>
        </li>
        <li>温馨提示：证件影像必须上传，注意身份证必须上传正反面。</li>
      </ul>
    </div>
    <div class="upload_insurance_other">
      <!-- <div class="title">其他影像上传</div> -->
      <div class="head"><div class="msg">其他影像上传</div></div>
      <upload-img @signChange="signChange" @on="signChange" :eSignModel="eSignModels"></upload-img>
      <div class="prompt">温馨提示:根据客户投保情况选择性上传资料</div>
    </div>
    <div class="btn" @click="nextStep">确定</div>
  </div>
</template>
<script>
  import eSignModel from './models/e-signature-model'
  import UploadImg from '@/components/base/upload-and-sign'

  export default {
    data () {
      return {
        eSignModels: eSignModel,
        infoModel: '',
        submitInfo: ''
      }
    },
    activated () {
      // console.log('esign======', this.eSignModels)
    },
    methods: {
      nextStep () {
        this.$router.push({name: 'insurance_application_pre'})
      },
      signChange (info) {
        if (info) {
          console.log('infoList=====', info)
          this.infoModel = info
        }
      },
      onSubmit () {
        if (this.isValid) {
          alert('success')
          let subMsg = this.infoModel.info
          let submitModel = {}
          for (let i in subMsg) {
            let item = subMsg[i]
            submitModel[i] = item.value
          }
          console.log('submitMODEL=====', submitModel)
        } else {
          this.$vux.toast.show({
            text: this.infoModel.info.errorMsg,
            type: 'text',
            width: '50%',
            isShowMask: true
          })
        }
      }
    },
    computed: {
      isValid () {
        let errors = this.infoModel.info
        for (let i in errors) {
          let item = errors[i]
          if (typeof item === 'string') continue
          if (!item) return false
          if (!item.isValid) {
            this.infoModel.info.errorMsg = item.msg
            return false
          }
        }
        return true
      }
    },
    components: {
      UploadImg
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .upload_insurance {
    position:absolute;
    width:100%;
    height:100%;
    background-color:#f7f7f7;
    .head {
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
    }
    .upload_insurance_certify {
      .item-wrapper {
        background-color: #ffffff;
        padding: 0 0 0 rem-calc(15);
        list-style: none;
        /*padding: rem-calc(5);*/
        li:last-child {
          /*border-bottom: 0;*/
        }
        & > li {
          display: block;
          height: auto;
          padding: rem-calc(5) rem-calc(15) rem-calc(5) 0;
          box-sizing: border-box;
          -webkit-background-size: 0;
          background-size: 0;
          /*border-bottom: 1px solid #e1e1e1;*/
          @include borderbottom-1px(#efefef);

          &:last-child {
            font-size: rem-calc(12px);
            color: #00b0ff;
            padding: rem-calc(15) rem-calc(15) rem-calc(15) 0;
          }
          .item-block {
            display: flex;
            /*flex: 1;*/
            height: rem-calc(45);
            align-items: center;
            & > :first-child {
              flex: 1;
            }
            .relation {
              display: inline-block;
              padding: rem-calc(5);
              background-color: #00b0ff;
              color: #fff;
              font-size: rem-calc(13);
              margin-left: rem-calc(8);
              border-radius: rem-calc(5);
            }
            .id_card {
              font-size: rem-calc(12);
              padding-top: rem-calc(5);
              color: #ccc;
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
    .upload_insurance_other {
      .prompt {
        background-color: #fff;
        font-size: rem-calc(12px);
        color: #00b0ff;
        padding: rem-calc(15) rem-calc(15) rem-calc(15) rem-calc(15);
      }
    }
    .btn {
      display: block;
      border-radius: 4px;
      border: 1px solid;
      font-size:rem-calc(18px);
      text-align: center;
      box-sizing: border-box;
      height: rem-calc(45);
      line-height: rem-calc(45);
      margin-top: rem-calc(15);
      margin-right: rem-calc(15);
      margin-left: rem-calc(15);
      background-color: #00b0ff;
      border-color: #00b0ff;
      color: #fff;
    }
  }
</style>
