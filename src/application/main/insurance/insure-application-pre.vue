<!--********************************************************************
 * Author        : rickyshin
 * Filename      : insure-application-pre.vue
 * Description   : 在线投保-投保书预览
 * Time          : 2017/10/25
 *
********************************************************************-->
<template>
  <div class="page_insure-application-pre">
    <tab :animate="false" :line-width="2" :defaultColor="'#333'" :active-color="'#20aee5'" v-model="tabIndex">
      <tab-item @on-item-click="tabChange" selected>基本信息</tab-item>
      <tab-item @on-item-click="tabChange">保障计划</tab-item>
      <tab-item @on-item-click="tabChange">支付信息</tab-item>
      <tab-item @on-item-click="tabChange">健康告知</tab-item>
    </tab>

    <div class="form" id="preview_form" ref="preview_form">
      <div class="sale-info-wrapper">
        <div class="sale-info">
          <div class="title">销售信息</div>
          <div class="e-insurance-policy">电子投保单号：EBK334342222</div>
          <ul class="detail">
            <li><span>业务人员姓名</span><span>张三</span></li>
            <li><span>业务人员姓名</span><span>张三</span></li>
            <li><span>业务人员姓名</span><span>张三</span></li>
            <li><span>业务人员姓名</span><span>张三</span></li>
            <li><span>所属机构及代码</span><span>张三</span></li>
          </ul>
        </div>
      </div>
      <div class="head" id="applicant">
        <div class="msg">投保人信息</div>
      </div>
      <root-text :list="list"></root-text>

      <div class="head">
        <div class="msg">被保人信息</div>
      </div>
      <root-text :list="list"></root-text>

      <div class="head">
        <div class="msg">受益人信息</div>
      </div>
      <div v-for="item in [1, 2]">
        <div class="beneficiary">受益人{{item}}</div>
        <root-text :list="list"></root-text>
      </div>

      <div class="head" id="insure">
        <div class="msg">保障计划</div>
      </div>
      <div>
        <div class="main-insure">
          <label>主</label>
          <span>康乐人寿重大疾病保险-30年期</span>
        </div>
        <root-text :list="list"></root-text>
        <div v-for="item in [1, 2]">
          <div class="main-insure additional-insure">
            <label>附</label>
            <span>康乐人寿重大疾病保险-30年期</span>
          </div>
          <root-text :list="list"></root-text>
        </div>
      </div>

      <div class="head" id="pay">
        <div class="msg">支付信息</div>
      </div>
      <root-text :list="list"></root-text>

      <div class="head" id="health">
        <div class="msg">健康告知</div>
      </div>
      <div class="preview-notify-form" >
        <table class="notify-table">
          <thead>
          <tr>
            <td width="60%">询问事项</td>
            <td width="20%">被保险人</td>
            <td width="20%">投保人</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in [1, 2]">
            <td width="60%">01.请告知您的身高体重</td>
            <td width="20%">101CM 20KG</td>
            <td width="20%">20KG</td>
          </tr>
          </tbody>
        </table>
      </div>


      <div class="head">
        <div class="msg">客户声明信息</div>
      </div>
      <div class="tips-wrapper">
        <div class="tips">
          <span class="icon" :class="{active: selected}" @click="changeAgreement"></span>
          <span class="view">本人已阅读并同意
            <a href="#">《入职登记表》</a>、
            <a href="#">《入职登记表》</a>、
            <a href="#">《入职登记表》</a>、
            <a href="#">《入职登记表》</a>
            的内容
          </span>
          <input class="hiddenInput" type="hidden" name="clause" v-validate
                 data-vv-as="请同意营销员声明" data-vv-rules="required">
        </div>
      </div>
    </div>

    <!--<div class="form">-->
      <!--<form-unit-->
        <!--:formModels="formModels"-->
        <!--:formRules="formRules"-->
        <!--@formChange="onChange"-->
        <!--@formValid="onValid">-->
      <!--</form-unit>-->
    <!--</div>-->
    <div class="btn-wrapper">
      <!--<default-btn class='next' val='下一步' @Click="nextStep"></default-btn>-->
      <div class="pre-step">上一步</div>
      <div class="next-step">下一步</div>
    </div>
  </div>
</template>

<script>
  import {Tab, TabItem} from 'vux'
  import formUnit from '@/components/unit/form-unit'
  import rootText from '@/components/root-items/root-text'
  import epMixin from '@/components/mixins/enroll-page-mixin'
  //  import {ENROLL_SUBMMIT, ENROLL_INTERSET, QUERY_DICT} from '@/api'
  import defaultBtn from '@/components/base/default-btn.vue'

  // models
  import formModels from './models/insure-application-pre-model'
  import formRules from './models/insure-application-pre-rule'

  const ENROLL_SUBMMIT = ''
  const ENROLL_INTERSET = ''
  const QUERY_DICT = ''
  export default {
    name: 'baseInfo',
    components: {
      formUnit,
      defaultBtn,
      Tab,
      TabItem,
      rootText
    },
    mixins: [epMixin],
    data () {
      window.info = this
      return {
        formModels: formModels,
        formRules: formRules,
        options: {
          editStep: '1'
        },
        selected: false,
        tabIndex: 0,
        list: [{key: '姓名', value: '任汝芬'}, {key: '证件类型', value: '身份证'}, {key: '证件类型', value: '身份证'}]
      }
    },
    methods: {
      changeAgreement () {
        this.selected = !this.selected
      },
      tabChange: function () {
        let id = ''
        switch (this.tabIndex) {
        case 0:
          id = '#applicant'
          break
        case 1:
          id = '#insure'
          break
        case 2:
          id = '#pay'
          break
        case 3:
          id = '#health'
          break
        default:
          break
        }
        // debugger
        let _offset = this.$el.querySelector(id).offsetTop
        this.$refs.preview_form.scrollTop = _offset
      }
      /**
      nextStep () {
        if (!this.isValid) {
          this.__toast(this.formErrors[0].msg)
        } else {
          if (this.validIdCardBirthdaySex()) {
            this.axios.post(ENROLL_SUBMMIT, {baseInfo: Object.values(this.form), ...this.options}).then(res => {
              let result = res.data
              if (result.success) {
                window.name = JSON.stringify({uid: result.value.id})
                this.$router.push({name: 'registerResume', query: {id: result.value.id}})
              } else {
                if (result.errorMsg) {
                  this.__toast(result.errorMsg)
                }
              }
            })
          }
        }
      },
      // 验证身份证和性别，身份证和出生日期是否符合
      validIdCardBirthdaySex () {
        let idCardVal = this.form.idCardNo.value
        let birthday = this.form.birthday.value
        let sex = this.form.sex.value
        let birthFromIdCard = idCardVal.split('').splice(6, 8).join('')
        let birthFromBirth = birthday.split('-').join('')
        let sexFromIdCard = idCardVal.split('').splice(16, 1).join('')
        let sexFlag = sexFromIdCard % 2 === 0 ? 'F' : 'M'
        if (sex !== sexFlag) {
          this.__toast('性别和身份证不符')
          return false
        } else if (birthFromBirth !== birthFromIdCard) {
          this.__toast('出生日期和身份证不符')
          return false
        } else {
          return true
        }
      },
      getData () {
        this.axios.all([this.getBackendData(), this.getBank()]).then(res => {
          let serverData = res[0].data
          let bankData = res[1].data
          this.$nextTick(() => {
            if (serverData.success) {
              this.formModels = this.__patch(serverData.value)
            } else {
              this.__toast(serverData.value.errorMsg)
            }
            if (bankData.success) {
              this.getDictFromBackend(bankData.value.core_bank_code, 'bank')
            } else {
              this.__toast(bankData.value.errorMsg)
            }
          })
        })
      },
      // 获取后台数据
      getBackendData () {
        return this.axios.post(ENROLL_INTERSET, this.options)
      },
      // 获取银行字典数据
      getBank () {
        return this.axios.get(QUERY_DICT, {params: {dictionarys: 'core_bank_code'}})
      },
      // 数据转义，将后台接口返回数据转换成前端可用的数据
      getDictFromBackend (arr, formRulesKey) {
        let temp = []
        arr.map(item => {
          temp.push(item.name)
        })
        this.formRules[formRulesKey].rules.options = [temp]
      },
      setIdCardInfo (val) {
        let year = val.split('').splice(6, 4).join('')
        let month = val.split('').splice(10, 2).join('')
        let day = val.split('').splice(12, 2).join('')
        let birthdayFromIdCard = [year, month, day].join('-')
        let sexFromIdCard = val.split('').splice(16, 1).join('')
        let sexFlag = sexFromIdCard % 2 === 0 ? 'F' : 'M'
        this.formModels.birthday.value = birthdayFromIdCard
        this.formModels.sex.value = sexFlag
        // this.formRules.idCardNo.rules.disabled = true
      }
    },
    watch: {
      'form.idCardNo': {
        deep: true,
        handler () {
          let idCardNoValid = this.formErrors.find(item => (item.name === 'idCardNo' && item.isValid === false))
          if (idCardNoValid === undefined && this.formModels.idCardNo.value) {
            this.setIdCardInfo(this.form.idCardNo.value)
          }
        }
      },
      'form.nationality': {
        deep: true,
        handler (v) {
          if (v && v.value && v.value.indexOf('族') === -1) {
            this.formModels.nationality.value = v.value + '族'
          }
        }
      }
      */
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
  .page_insure-application-pre {
    .vux-tab {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: rem-calc(50);
      line-height: rem-calc(50);
      align-items: center;
      background: #fff;
      z-index: 2;
      .vux-tab-item {
        line-height: rem-calc(50);
        font-size: rem-calc(15);
      }
    }
  }


</style>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/_function';

  .page_insure-application-pre {
    @include fullpage;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .form {
      position: absolute;
      top: 0;
      left:0;
      right: 0;
      bottom:0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      margin: rem-calc(50) 0;
      .sale-info-wrapper {
        padding: rem-calc(15) 0 0 0;
        background-color: #F7F7F7;
      }
      .sale-info {
        height: rem-calc(230);
        margin: 0 rem-calc(15);
        border-radius: 5px;
        background: #fff;
        .title {
          height: rem-calc(35);
          line-height: rem-calc(35);
          font-size: rem-calc(15);
          text-align: center;
          color: #fff;
          background-color: #B0B1B2;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
        .e-insurance-policy {
          height: rem-calc(45);
          line-height: rem-calc(45);
          font-size: rem-calc(15);
          color: $blue;
          text-align: center;
          @include borderbottom-1px(#efefef);
        }
        ul {
          list-style: none;
          padding: rem-calc(15) rem-calc(15) 0 rem-calc(15);
          font-size: rem-calc(14);
          li {
            display: flex;
            span:first-child {
              color: #B0B1B2;
              flex: 3;
              line-height: rem-calc(24);
            }
            span:last-child {
              flex: 5;
              line-height: rem-calc(24);
            }
          }
        }
      }
      .head {
        background-color: #f7f7f7;
        overflow: hidden;
        height: rem-calc(91/2px);
        line-height: rem-calc(91/2px);
        box-sizing: border-box;
        padding: 0 rem-calc(30/2px);
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
      .main-insure {
        padding-left: rem-calc(15);
        height: rem-calc(45);
        line-height: rem-calc(45);
        background-color: #20aee5;
        font-size: rem-calc(15);
        color: #fff;
        @include borderbottom-1px(#efefef);
        label {
          border-radius: 5%;
          padding: rem-calc(1) rem-calc(5);
          border: 1px solid #fff;
          margin-right: rem-calc(8);
        }
      }
      .additional-insure {
        background-color: #4AD995;
      }
    }
    .preview-notify-form {
      margin: 0 rem-calc(15);
      .notify-table{
        color: #666;
        &.nobord {
          td{
            border: none;
          }
          & > tbody td{
            &:first-child{
              text-align:center;
            }
          }
        }
        width: 100%;
        margin: rem-calc(15px) 0;
        table-layout: fixed;
        td{
          border-bottom:1px solid #e3e3e3;
          padding:rem-calc(3px);
          line-height: rem-calc(20px);
        }
        tr:last-child td{
          border-bottom:none;
        }
        tr td:last-child{
          border-right:none;
        }
        & > thead td{
          background: #c3c3c3;
          color:#fff;
          font-size: rem-calc(13px);
          text-align: center;
          padding:rem-calc(10px) 0;
          border-right: 1px solid #D5D6D7;
        }
        & > tbody td{
          background: #f7f7f7;
          font-size: rem-calc(13px);
          text-align: center;
          word-wrap : break-word ;
          padding:rem-calc(10px) rem-calc(10px);
          border-right:1px solid #e3e3e3;
          &:first-child{
            text-align:left;
          }
        }
      }
    }
    .tips-wrapper {
      height: auto;
      padding: rem-calc(15) rem-calc(15) rem-calc(20) rem-calc(15);
    }
    .tips {
      /*padding: rem-calc(15) rem-calc(15) rem-calc(15) 0;*/
      display: flex;
      span {
        font-size: rem-calc(14);
        color: #666666;
        line-height: 1.5;
        a, a:visited {
          text-decoration: none;
          color: $blue;
        }
      }
      .icon {
        display: inline-block;
        background-color: #fff;
        min-width: rem-calc(16);
        height: rem-calc(15);
        line-height: rem-calc(15);
        text-align: center;
        border-radius: rem-calc(2);
        margin-top: rem-calc(2);
        margin-right: rem-calc(10);
        border: 1px solid #ddd;
        box-sizing: border-box;
        &:before {
          content: ' ';
          display: block;
          width: rem-calc(16);
          height: rem-calc(8);
          transform: rotate(-45deg) scale(.8);
        }
        &.active {
          background-color: #6DC54F;
          border: 0;
          &:before {
            content: ' ';
            display: block;
            border-bottom: 2px solid #ffffff;
            border-left: 2px solid #ffffff;
            width: rem-calc(15);
            height: rem-calc(8);
            transform: rotate(-45deg) scale(.8);
          }
        }
      }
    }
    .btn-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      margin: rem-calc(25) 0 0 0;
      display: flex;
      line-height: rem-calc(50);
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: rem-calc(18);
      .pre-step {
        flex: 1;
        color: #20aee5;
        background: #fff;
      }
      .next-step {
        flex: 1;
        background: #20aee5;
        color: #fff;
      }
    }
    .beneficiary {
      min-height: rem-calc(45);
      line-height: rem-calc(45);
      color: #999;
      margin: 1px 0 1px rem-calc(15);
      @include borderbottom-1px(#efefef);
    }
  }

</style>
