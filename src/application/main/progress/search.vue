<!--********************************************************************
 * Author        : xiangzhi
 * Filename      : index.vue
 * Description   : 投保查询

********************************************************************-->
<template>
  <div class="progressscanidcard-page">
    <div class="listbox">
      <ul>
        <li class="centeli">
          <span>姓名</span>
          <div class="_input">
            <input type="text" v-model.trim="form.name" placeholder="请输入姓名"
                      maxlength ="120"
                      v-validate:name.initial="'required|username|usernameLength'"
                      data-vv-as="请重新录入姓名"
                      name="name"
                      style="vertical-align: baseline"
                      :class="{'is-danger': errors.has('name') }"/>
          </div>
        </li>
        <li>
          <span>性别</span>
          <div>
            <c_gender @Click="chooseGender" :gender="form.genderCode === 'M'"></c_gender>
          </div>
        </li>
        <li><span>出生日期</span>
          <div>
            <group>
              <datetime
                @on-change="changebirthday"
                clear-text=""
                placeholder="请选择出生日期"
                v-model.trim="form.birthday"
                format="YYYY-MM-DD"
                :title="title"
                confirm-text="确定"
                cancel-text="取消"
                :start-date="stime"
                :end-date="etime"
                :min-year="1917"
              >
              </datetime>
            </group>
          </div>
      </li>
      <li>
        <popup-picker class="qeryele" title="证件类型" :data="cardKindList" @on-hide="onHide('cardKind')" placeholder="请选择证件类型"
                      @on-change="onChange" v-model.trim="form.cardKind"  show-name
        ></popup-picker>
        <input
          class="hiddenInput"
          type="hidden"
          placeholder="请选择证件类型"
          name="cardKind"
          v-model.trim="form.cardKind"
          v-validate
          data-vv-as="请选择证件类型"
          data-vv-rules="required">
      </li>
      <li class="centeli">
        <span class="name">证件号码</span>
        <div class="_input">
          <input type="text" class="input" maxlength="30" v-model.trim="form.cardNum" placeholder="请输入证件号码"
                 style="vertical-align: baseline"
                 v-validate:cardNum.initial="'required|idcard'" data-vv-as="请输入证件号码" name="cardNum"
                 :class="{'is-danger': errors.has('cardNum') }">
        </div>
      </li>
      <!-- <li>
        <span>代理人代码</span>
        <div>
          <input type="text" v-model.trim="form.agent" placeholder="请输入代理人代码"
                    maxlength ="10"
                    v-validate:name.initial="'required|agent'"
                    data-vv-as="请重新录入代理人代码"
                    name="agent"
                    :class="{'is-danger': errors.has('agent') }"/>
        </div>
      </li> -->
      </ul>
      <div class="buttonGroup">
        <div  class="resetbtn" @click="reset"><button style="border: 1px solid #dedede">重置</button></div>
        <div class="searchbtn" @click="submit"><button>搜索</button></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {PopupPicker, Group, Datetime} from 'vux'
  import {ISBANKS} from '@/api'
  const nowTime = function () {
    return new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) > 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + new Date().getDate()
  }
  let endtime = (new Date().getFullYear() - 100) + '-' + ((new Date().getMonth() + 1) > 10 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + '-' + new Date().getDate()
  export default {
    name: 'progressSearch',
    data () {
      return {
        stime: endtime,
        title: '',
        etime: nowTime(),
        hascardKind: false,
        cardKindList: [[
          {
            "value": "0",
            "name": "身份证"
          },
          {
            "value": "1",
            "name": "护照"
          },
          {
            "value": "10",
            "name": "中国护照"
          }]],
        // [['身份证', '军人证', '护照']],
        form: {
          name: '',
          insurestatus: '',
          genderCode: 'M',
          birthday: null,
          cardKind: [],
          cardNum: ''
        }
      }
    },
    created () {
      if (process.env.NODE_ENV === 'production') {
        window.getDictionary('card_type').then(success => {
          this.cardKindList = [[...success]]
        }, fail => {
          console.log(fail)
        }).catch(e => {
          console.log(e)
          throw new Error(e)
        })
      } else {
        this.cardKindList = [window.dictionary['card_type']]
      }
    },
    components: {
      PopupPicker, Group, Datetime
    },
    methods: {
      submit () {
        let param = {name: this.form.name || '', idType: this.form.cardKind[0] || '', idNo: this.form.cardNum || '', genderCode: this.form.genderCode || '', birthday: this.form.birthday || ''}
        // alert(JSON.stringify(param))
        // this.$router.push({path: "/web/progress", query: param})
      },
      chooseGender (v) {
        this.form.genderCode = v
      },
      ages: function (str) {
        const r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
        const d = new Date(r[1], r[3] - 1, r[4])
        if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
          const Y = new Date().getFullYear()
          const age = Y - r[1]
          if (age < 16) {
            this.$vux.toast.show({
              text: "投保人年龄不得小于16周岁",
              type: 'text',
              width: '50%',
              isShowMask: true
            })
          }
        }
      },
      changebirthday (v) {
        // this.ages(v)
        // console.log(nowTime())
      },
      chooseaddress () {
        this.address = !this.address
        this.seled = !this.seled
      },
      reset () {
        this.form = {
          name: '',
          insurestatus: '',
          genderCode: 'M',
          agent: '',
          birthday: null,
          cardKind: [],
          cardNum: ''
        }
      },
      onHide () {
      },
      onChange () {
      },
      change () {},
      cardtime () {

      }
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
@import '~@/assets/scss/function';
.vux-datetime-value,.vux-popup-picker-placeholder, input::-webkit-input-placeholder{
  font-size: rem-calc(30/2)
}
.weui-cell_access .weui-cell__ft:after{
  border-width: 1px 1px 0 0;
}
.progressscanidcard-page{
  .qeryele{
    &:before{display: none;}
    & > .weui-cell{
      padding:0 rem-calc(15px) 0 0;
      & .vux-popup-picker-select span{
        color:#666;
        padding:0 0;
      }
    }
  }
  .radio{
      display: inline-block;
      vertical-align: middle;
      font: normal normal normal 14px/1 "weui";
      font-size: inherit;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      margin-top: rem-calc(-10px);
      &.seled{
        &:before{
          content: '\EA06';
          color: #00acff !important;
          position: relative;
          top: 4px;
          font-size: rem-calc(20px);
          display: inline-block;
          margin-left: .2em;
          margin-right: .2em;
        }
      }
    &:before{
      content: '\EA01';
      color: #D9D9D9 !important;
      font-size: rem-calc(20px);
      display: inline-block;
      margin-left: .2em;
      margin-right: .2em;
      position: relative;
      top: 4px;
    }
  }
  .weui-cells:before,.weui-cells:after{display: none;}
  .vux-no-group-title{margin-top: 0;}
  .weui-cells{
    height: rem-calc(44px);
    line-height: rem-calc(44px);
    overflow: hidden;
    vertical-align: middle;
    a{padding:rem-calc(0px) 0 0 0;
      font-size: rem-calc(16px);
    }
  }
}
</style>
<style lang='scss' rel="stylesheet/scss" scoped>
@import '~@/assets/scss/function';
.centeli{
    display: flex;
    align-items: center;
}
._input{
    flex: 1;
    -webkit-appearance: none;
    text-align: right;
}
li:nth-child(2),li:nth-child(3),li:nth-child(4){
  line-height: rem-calc(45);
}
  input{
   border: 0;
   outline: none;
  }
  .progressscanidcard-page{
    background:#f7f7f7;
    min-height: 100%;
    .listbox{
      background: #fff;
      ul{
        margin-left: rem-calc(15px);
        padding:0;
        &>li{
          margin: 0;
          padding:0;
          list-style: none;
          height: rem-calc(45px);
          /*line-height: rem-calc(45px);*/
          vertical-align: middle;
          position: relative;
          @include borderbottom-1px(#e5e5e5);
          font-size: rem-calc(16px);
          overflow: hidden;
          &>span:first-child{
            color:#333;
            font-size: rem-calc(30/2)
          }
          .choose_gender{
            margin-top: rem-calc(5px);
          }
          &>div:last-child{
            float:right;
            display: inline-block;
            margin-right: rem-calc(14px);
            a{
              text-decoration: none;
            }
            input{
              font-size: rem-calc(16px);
              text-align: right;
            }
          }
        }
      }
      .buttonGroup{
        width: 100%;
        height: rem-calc(189/2);
        line-height: rem-calc(189/2);
        display: flex;
        flex-direction: row;
        align-items: center;
        button{
          border: 0;
          width: rem-calc(330/2);
          height: rem-calc(90/2);
          font-size: rem-calc(32/2);
          border-radius: rem-calc(8/2);
        }
        .searchbtn, .resetbtn{
          flex: 1;
          text-align: center;
        }
        .resetbtn button{
          border: 1px solid #d2d2d2;
          color: #666;
          background-color: #fff;
        }
        .searchbtn button{
          background-color: #00b1ff;
          color: #fff;
        }
      }
    }
  }
</style>
