<!--********************************************************************
 * Author        : rickyshin
 * Filename      : insured-info.vue
 * Description   : Native-上传图片-人脸识别-电子签名-组件，该组件由一个Model渲染页面：eSignModel，引用组件的时候使用:eSignModel语法
 * Time          : 2017/10/25
 *
********************************************************************-->
<template>
  <div class="esign-upload">
    <ul class="item-wrapper" v-show="true">
      <li v-for="(item, index) in form.caInfoList" :key="index">
        <div class="item-block">
          <div>{{item.desc}}</div>
          <div class="upload-img" @click="uploadPic(item)">
            <div :class="[item.cType != 1 ? 'camera' : 'sign']"></div>
          </div>
        </div>
        <div class="img_gallery" v-show="item.signImgPath || item.photoPath" v-if="item.cType == 1">
            <span class="uploadImgEle" v-show="item.signImgPath">
              <i class="deleimg" @click.self="deleImg(item.cType, item)"></i>
              <img :src="item.signImgPath"/>
            </span>
            <span class="uploadImgEle" v-show="item.photoPath">
              <i class="deleimg" @click.self="deleImg(item.cType, item)"></i>
              <img :src="item.photoPath"/>
            </span>
            <span class="sign-time">签名时间：<span>{{item.signTime | timefilter}}</span></span>
        </div>
        <div class="img_gallery" v-show="item.signImgPath || item.photoPath" v-if="item.cType == 2 || item.cType == 3 || item.cType == 4">
            <span class="uploadImgEle" v-show="item.signImgPath">
              <i class="deleimg" @click.self="deleImg(item.cType, item)"></i>
              <img :src="item.signImgPath"/>
            </span>
            <span class="uploadImgEle" v-show="item.photoPath">
              <i class="deleimg" @click.self="deleImg(item.cType, item)"></i>
              <img :src="item.photoPath"/>
            </span>
        </div>
        <!--{{item.imagePathList}}-->
        <div class="img_gallery" v-show="item.imagePathList && item.imagePathList[0]">
            <span class="uploadImgEle" v-show="item.imagePathList" v-for="(i, index) in item.imagePathList" :key="index">
              <i class="deleimg" @click.self="dImg(item.imagePathList, index)"></i>
              <img :src="i.url"/>
            </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  //  import eSignModel from './model/e-signature-model'
  export default {
    name: 'uploadImg',
    data () {
      return {
        innerErrors: '',
        form: {}
      }
    },
    props: ['eSignModel'],
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
    activated () {
      this.init()
      // this.deleImg()
      // this.$emit('on', this.innerModel)
      // this.delCache()
      console.log('this.info ==== ', this.info)
      console.log('this.status ==== ', this.status)
    },
    methods: {
      init () {
        this.form = this.$eSignModel.value
        // console.log('this.Model', this.form)
        this.initInnerModel(this.form.caInfoList)
        this.getCachedImg()

        this.onValidate(this.form.caInfoList)
      },
      initInnerModel (list) {
        list.map(el => {
          if (el.cType == '1') {
            this.innerModel[el.title] = {
              name: el.title,
              value: el.signImgPath,
              msg: '',
              isValid: false
            }
          }
          if (el.cType == '2' || el.cType == '3') {
            this.innerModel[el.title] = {
              name: el.title,
              value: el.signImgPath,
              msg: '',
              isValid: false
            }
          }
          if (el.cType == '4') {
            this.innerModel[el.title] = {
              name: el.title,
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
            if (el.cType == '1') {
              if (!el.signImgPath) {
                this.innerModel[el.title].msg = this.errorMsg(el.desc)
                this.innerModel[el.title].isValid = false
                this.innerModel[el.title].value = ''
              } else {
                this.innerModel[el.title].msg = ''
                this.innerModel[el.title].isValid = true
                this.innerModel[el.title].value = el.signImgPath
              }
            }
            if (el.cType == '2' || el.cType == '3') {
              if (!el.photoPath) {
                this.innerModel[el.title].msg = this.errorMsg(el.desc)
                this.innerModel[el.title].isValid = false
                this.innerModel[el.title].value = ''
              } else {
                this.innerModel[el.title].msg = ''
                this.innerModel[el.title].isValid = true
                this.innerModel[el.title].value = el.photoPath
              }
            }
            if (el.cType == '4') {
              // debugger
              if (!(el.imagePathList && el.imagePathList[0])) {
                this.innerModel[el.title].msg = this.errorMsg(el.desc)
                this.innerModel[el.title].isValid = false
                this.innerModel[el.title].value = ''
              } else {
                if (el.imagePathList.length < el.minLength) {
                  this.innerModel[el.title].msg = el.errMsgForMin
                  this.innerModel[el.title].isValid = false
                  this.innerModel[el.title].value = ''
                } else {
                  this.innerModel[el.title].msg = ''
                  this.innerModel[el.title].isValid = true
                  let arr = []
                  el.imagePathList.map((obj) => {
                    arr.push(obj.url)
                  })
                  this.innerModel[el.title].value = arr
                }
              }
            }
          })
        }
        this.$emit('on', {info: this.innerModel, form: this.form.caInfoList})
      },
      errorMsg (_msg) {
        return _msg + '不能为空'
      },
      delCache () {
        this.$store.state.ui.store.del('formCache')
      },
      deleImg (type, item) {
        item.photoPath = ''
        item.signImgPath = ''
        item.signData = ''
        item.faceFlag = null
        this.$nextTick(() => {
          this.$store.state.ui.store.set('formCache', this.form)
        })
        this.innerModel[item.title].isValid = false
        this.innerModel[item.title].msg = this.errorMsg(item.desc)
        console.log('del======', this.innerModel)
        this.onValidate(this.form.caInfoList)
      },
      dImg (list, index) {
        list.splice(index, 1)
        this.onValidate(this.form.caInfoList)
        this.$nextTick(() => {
          this.$store.state.ui.store.set('formCache', this.form)
        })
      },
      uploadPic (item) {
        if (item.cType == '4') {
          window.callCamera('123').then((success, n) => {
            console.log('uploadIMG=====', success, n)
            this.n = n
            // debugger
            if (item.imagePathList.length < item.maxLength) {
              item.imagePathList.push(JSON.parse(success))
            } else {
              this.$vux.toast.show({
                text: '照片数目大于最大值',
                type: 'text',
                width: '50%',
                isShowMask: true
              })
            }
            this.onValidate(this.form.caInfoList)
            this.$store.state.ui.store.set('formCache', this.form)
            this.$emit('signChange', {info: this.innerModel, form: this.form.caInfoList})
          }, fail => {
            console.log(fail)
          }).catch(e => {
            console.log(e)
            throw new Error(e)
          })
        } else {
          let itemJSON = Object.assign({}, item.keyWordRule)
          window.caSign(item.title, item.cType, JSON.stringify(itemJSON)).then(success => {
            let res = JSON.parse(success)
            console.log('res=======', res)
            if (item.cType == 1) {
              item.signImgPath = res.gestureImage // 签名 url
              item.signTime = Date.now()
              // this.now = Date.now()
            }
            console.log('imgPATH', item.signImgPath)
            if (item.cType == 2) {
              item.photoPath = res.captureImage // 拍照url
              item.signImgPath = '' // 签名 url
            }
            if (item.cType == 3) {
              if (res.IDRecognizeResult === '0') {
                item.faceFlag = '1'
              }
              item.signImgPath = '' // 签名 url
              item.photoPath = res.gestureImage // 人脸识别url
            }
            // write to localStorage
            console.log('caInfoList', this.form.caInfoList)
            this.onValidate(this.form.caInfoList)
            this.$store.state.ui.store.set('formCache', this.form)
            this.$emit('signChange', {info: this.innerModel, form: this.form.caInfoList})
          }, fail => {
            console.log(fail)
          }).catch(e => {
            console.log(e)
            throw new Error(e)
          })
        }
      },
      getCachedImg () {
        const info = this.$store.state.ui.store.get('formCache') || {}
        // console.log('infoFromCache====', info)
        // let cacheList = info.caInfoList
        this.onValidate(info.caInfoList)
        const _info = info.caInfoList
        if (_info && _info.length > 0 && info.applyId === this.form.applyId) {
          this.form.caInfoList = _info
        } else {
          this.delCache()
        }
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
    .sign-time {
      font-size: rem-calc(12);
      color: #999;
      span {
        color: #666;
      }
    }
  }
</style>
