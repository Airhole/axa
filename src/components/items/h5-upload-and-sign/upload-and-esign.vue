<template>
  <div class="esign-upload">
    <ul class="item-wrapper" v-show="true">
      <li v-for="(item, index) in form.caInfoList" :key="index">
        <div class="item-block">
          <div v-if="!item.certType">{{item.name}}</div>
          <div v-if="item.certType">
            <div>
              <div>{{item.name}}<span class="relation">{{item.customerType}}</span></div>
              <div class="id_card">{{item.certType}}&nbsp;&nbsp;{{item.certNo}}</div>
            </div>
          </div>
          <div class="upload-img" @click="uploadPic(item)">
            <!--<div :class="[item.cType != 1 ? 'camera' : 'sign']"></div>-->
            <div class="sign" v-if="item.cType == 1"></div>
            <div class="camera" v-else>
              <input :id="item.key" class="file-input" type="file" @change="inputChange(item)" accept="image/*" >
            </div>
          </div>
        </div>
        <div class="img_gallery" v-show="item.signImgPath || item.photoPath">
          <!--sign-->
          <span class="uploadImgEle" v-show="item.signImgPath">
            <i class="deleimg" @click.self="deleImg(item.cType, item)"></i>
            <img class="sign" :src="item.signImgPath"/>
          </span>
          <span class="uploadImgEle" v-show="item.photoPath">
            <i class="deleimg" @click.self="deleImg(item.cType, item)"></i>
            <img :src="item.photoPath"/>
          </span>
          <span class="sign-time">签名时间：<span>{{item.signTime}}</span></span>
        </div>
        <!--pic(imgShowList)-->
        <div class="img_gallery" v-show="item.imagePathList && item.imagePathList[0]">
          <span class="uploadImgEle" v-show="item.imagePathList" v-for="(i, index) in item.imagePathList" :key="index">
              <i class="deleimg" @click.self="dImg(item, index)"></i>
              <img :src="i"/>
            </span>
        </div>
      </li>
    </ul>
    <h5-sign-for-enroll v-if="eSignStatus" @OnCancel="signCancel" @OnSuccess="signSuccess" :handlerName="handlerName"></h5-sign-for-enroll>
  </div>
</template>
<script>
  import {UPLOAD_IMG} from '@/api'
  import Zip from './zip'
  import H5SignForEnroll from "./h5-sign-for-enroll.vue"

  export default {
    components: {
      H5SignForEnroll
    },
    name: 'c-upload-and-esign',
    data () {
      return {
        innerErrors: '',
        form: {},
        eSignStatus: false,
        currentImg: null,
        currentList: null,
        outputModels: {
          isValid: true
        }
      }
    },
    mounted () {
      this.Vzip = new Zip()
    },
    props: ['eSignModel', 'handlerName'],
    computed: {
      $eSignModel: function () {
        return this.eSignModel
      },
      innerModel () {
        return {
          // name: this.name,
          // value: this.form.caInfoList,
          // msg: this.innerErrors,
          // isValid: ''
        }
      }
    },
    watch: {
      $eSignModel: {
        deep: true,
        handler (v) {
          this.init()
        }
      }
    },
    methods: {
      init () {
        this.form = this.$eSignModel
        this.initInnerModel(this.form.caInfoList)
        this.onValidate(this.form.caInfoList)
      },
      initInnerModel (list) {
        list.map(el => {
          if (el.cType == '1') {
            this.innerModel[el.key] = {
              name: el.name,
              value: el.signImgPath,
              msg: '',
              isValid: false
            }
          }
          if (el.cType == '2' || el.cType == '3') {
            this.innerModel[el.key] = {
              name: el.name,
              value: el.signImgPath,
              msg: '',
              isValid: false
            }
          }
          if (el.cType == '4') {
            this.innerModel[el.key] = {
              name: el.name,
              value: el.imagePathList,
              msg: '',
              isValid: false
            }
          }
          if (el.key) {
            this.innerModel[el.key] = {
              name: el.name,
              value: el.imagePathList,
              msg: '',
              isValid: false
            }
          }
        })
      },
      onValidate (list) {
        if (list) {
          list.map(el => {
            let model = this.innerModel[el.key]
            if (el.cType == '1') {
              if (!el.signImgPath) {
                model.msg = this.errorMsg(el.name)
                model.isValid = false
                model.value = ''
              } else {
                model.msg = ''
                model.isValid = true
                model.value = el.signImgPath
              }
            }
            if (el.cType == '2' || el.cType == '3') {
              if (!el.photoPath) {
                model.msg = this.errorMsg(el.name)
                model.isValid = false
                model.value = ''
              } else {
                model.msg = ''
                model.isValid = true
                model.value = el.photoPath
              }
            }
            if (el.cType == '4') {
              if (!(el.imagePathList && el.imagePathList[0])) {
                model.msg = this.errorMsg(el.name)
                model.isValid = false
                model.value = ''
              } else {
                if (el.imagePathList.length < el.minNum) {
                  model.msg = '照片最少不能少于' + el.minNum
                  model.isValid = false
                  model.value = ''
                } else {
                  model.msg = ''
                  model.isValid = true
                  let arr = []
                  el.imagePathList.map((obj) => {
                    arr.push(obj)
                  })
                  model.value = arr
                }
              }
            }
            if (el.key) {
              if (!(el.imagePathList && el.imagePathList[0])) {
                model.msg = this.errorMsg(el.name + '身份证')
                model.isValid = false
                model.value = ''
              } else {
                if (el.imagePathList.length < el.minNum) {
                  model.msg = el.name + el.certType + '照片最少不能少于' + el.minNum
                  model.isValid = false
                  model.value = ''
                } else {
                  model.msg = ''
                  model.isValid = true
                  let arr = []
                  el.imagePathList.map((obj) => {
                    arr.push(obj)
                  })
                  model.value = arr
                }
              }
            }
          })
        }
        for (let key in this.innerModel) {
          this.outputModels[key] = this.innerModel[key].value
        }
        let obj = Object.values(this.innerModel).find(item => {
          return item.isValid === false
        })
        if (obj) {
          this.outputModels.isValid = false
          this.outputModels.msg = obj.msg
        } else {
          this.outputModels.isValid = true
          this.outputModels.msg = ''
        }
//        console.log('innerMOdel', this.innerModel)
        this.$emit('on', {info: this.outputModels, innerModel: this.innerModel, form: this.form.caInfoList})
      },
      errorMsg (_msg) {
        return _msg + '不能为空'
      },
      deleImg (type, item) {
        item.photoPath = ''
        item.signImgPath = ''
        item.signData = ''
        item.faceFlag = null
        item.signImgLocal = ''
        item.imagePathList = []
        this.$nextTick(() => {
        })
        this.innerModel[item.key].isValid = false
        this.innerModel[item.key].msg = this.errorMsg(item.name)
      },
      dImg (item, index) {
        // debugger
        item.imagePathList.splice(index, 1)
        // item.imgShowList.splice(index, 1)
//        let inputPics = document.getElementById(item.key)
//        inputPics.value = ''
        this.onValidate(this.form.caInfoList)
      },
      uploadPic (item) {
        if (item.cType == '1') {
          this.eSignStatus = true
          this.currentImg = item
        } else {
          this.currentList = item
        }
      },
      inputChange (item) {
        // begin loading
        //this.$store.dispatch('toggleLoadingStatus', true)
        let inputPics = document.getElementById(item.key)
        let firstImg = inputPics.files[0]
        let imgUpload = ''
        // zip image
        this.Vzip.run(firstImg).then(success => {
          this.nimg = {...success}
          let file = this.nimg.base64.split('base64,')
          this.axios.post(UPLOAD_IMG, {file: file[1], useFullUrl: 'yes'}).then(res => {
            // hide loading
            imgUpload = res.data.value.url[0]
            if (!item.imagePathList || item.imagePathList === null) {
              item.imagePathList = []
            }
            if (item.imagePathList.length < item.maxNum) {
              item.imagePathList.push(imgUpload)
            } else {
              this.$vux.toast.show({
                text: '照片数目大于最大值',
                type: 'text',
                width: '50%',
                isShowMask: true
              })
            }
            this.onValidate(this.form.caInfoList)
            this.$emit('signChange', {info: this.outputModels, innerModel: this.innerModel, form: this.form.caInfoList})
          })
        }, fail => {
          console.log(fail)
        }).catch(error => {
          console.log(error)
        })
      },
      signCancel () {
        this.eSignStatus = false
      },
      signSuccess (img) {
        let file = img.split('base64,')
        let imgUpload = ''
        this.eSignStatus = false
        // show loading
        // this.$store.dispatch('toggleLoadingStatus', true)
        this.axios.post(UPLOAD_IMG, {file: file[1], useFullUrl: 'yes'}).then(res => {
          // hide loading
          imgUpload = res.data.value.url[0]
          this.currentImg.signImgPath = imgUpload
          this.currentImg.signTime = Date.now()
          this.currentImg.signImgLocal = imgUpload
          this.onValidate(this.form.caInfoList)
          this.$emit('signChange', {info: this.innerModel, form: this.form.caInfoList})
          // this.$store.dispatch('toggleLoadingStatus', false)
        })
      }
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';

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
            position: relative;
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
            .file-input {
              position: absolute;
              right: 0;
              top: 0;
              opacity: 0;
              padding: 0;
              font-size: 0;
              border: none;
              filter: alpha(opacity=0);
              cursor: pointer;
              width: rem-calc(25);
              height: rem-calc(25);
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
          /*width: rem-calc(50px);*/
          /*height: rem-calc(50px);*/
          width: rem-calc(50);
          height: rem-calc(50);
          /*overflow: hidden;*/
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
          & > .sign {
            width: auto;
            min-width: rem-calc(50);
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
    .sign-time {
      font-size: rem-calc(12);
      color: #999;
      span {
        color: #666;
      }
    }
  }
</style>
