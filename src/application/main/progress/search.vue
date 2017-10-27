<!--********************************************************************
 * Author        : xiangzhi
 * Filename      : prosearch.vue
 * Description   : 投保进度－查询保单
 * Time          : 2017/10/27

********************************************************************-->
<template>
  <div class="page_progress_search">
    <div class="listbox">
      <ul>
        <li class="centeli">
          <span>投保人</span>
          <div class="_input">
            <input type="text" v-model.trim="form.name" placeholder="被推荐人姓名"/>
          </div>
        </li>
        <li class="centeli">
          <span class="name">证件号码</span>
          <div class="_input">
            <input type="text" class="input" maxlength="30" v-model.trim="form.cardNum" placeholder="请输入证件号"
                  style="vertical-align: baseline">
          </div>
        </li>
        <li class="centeli">
          <span class="name">保单号</span>
          <div class="_input">
            <input type="text" class="input" maxlength="30" v-model.trim="form.contNo" placeholder="请输入保单号"
                  style="vertical-align: baseline">
          </div>
        </li>
        <li class="search_time">
          <span class="name">日期</span>
          <div>
            <group>
              <datetime
                placeholder="开始日期"
                v-model.trim="form.polApplyStartDate"
                format="YYYY-MM-DD"
                :title="title"
                confirm-text="确定"
                cancel-text="取消"
              >
              </datetime>
              <span class="time_txt">至</span>
              <datetime
                placeholder="结束日期"
                v-model.trim="form.polApplyEndDate"
                format="YYYY-MM-DD"
                :title="title"
                confirm-text="确定"
                cancel-text="取消"
              >
              </datetime>
            </group>
          </div>
        </li>
        <li>
          <popup-picker class="qeryele" title="状态" :data="cardKindList" @on-hide="onHide('cardKind')" placeholder="不限"
                        @on-change="onChange" v-model.trim="form.appFlag"  show-name
          ></popup-picker>
          <input
            class="hiddenInput"
            type="hidden"
            placeholder="不限"
            name="cardKind"
            v-model.trim="form.appFlag"
            v-validate
            data-vv-as="不限"
            data-vv-rules="required">
        </li>
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
  export default {
    name: 'recommend_search',
    data () {
      return {
        title: '',
        cardKindList: [[
          { value: '0', name: '录入中' },
          { value: '1', name: '待担保提交' },
          { value: '2', name: '待初审' },
          { value: '3', name: '待复审' },
          { value: '4', name: '待公司审核' },
          { value: '100', name: '入职成功' },
          { value: '101', name: '入职不通过' }]],
        form: {
          name: '',
          insurestatus: '',
          cardNum: '',
          appFlag: [], //  保单状态
          contNo: '', //  保单号
          polApplyStartDate: '', //  投保开始日期
          polApplyEndDate: '' //  投保结束日期
        }
      }
    },
    activated () {
      // this.hideRight()
    },
    components: {
      PopupPicker, Group, Datetime
    },
    methods: {
      // hideRight () {
      //   window.toggleMenu('2', 'false')
      // },
      submit () {
        let param = {name: this.form.name || '', phone: this.form.phone || '', sex: this.form.sex || '', startTime: this.form.startTime || '', endTime: this.form.endTime || '', status: this.form.status[0] || ''}
        // console.log(param)
        // this.$router.push({name: 'recommend_result', query: param})
      },
      chooseGender (v) {
        this.form.sex = v
      },
      reset () {
        this.form = {
          name: '',
          insurestatus: '',
          cardNum: '',
          appFlag: [], //  保单状态
          contNo: '', //  保单号
          polApplyStartDate: '', //  投保开始日期
          polApplyEndDate: '' //  投保结束日期
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
.page_progress_search{
  .vux-datetime-value,.vux-popup-picker-placeholder, input::-webkit-input-placeholder{
    font-size: rem-calc(30/2)
  }
  .weui-cell_access .weui-cell__ft:after{
    border-width: 1px 1px 0 0;
  }
  .search_time {
    .vux-no-group-title {
      display: flex;
      &>a {
        &:before {
          display: none;
        }
        .weui-cell__ft {
          padding-right: rem-calc(16);
          &:after {
            width: 0;
            height: 0;
            border: 0;
            border-bottom: rem-calc(7) solid #999999;
            border-left: rem-calc(7) solid transparent;
            margin-top: rem-calc(-6);
          }
        }
      }
    }
  }
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
  input{
   border: 0;
   outline: none;
  }
  .page_progress_search{
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
          line-height: rem-calc(45px);
          vertical-align: middle;
          position: relative;
          @include borderbottom-1px(#e5e5e5);
          font-size: rem-calc(16px);
          overflow: hidden;
          .time_txt {
            padding: 0 rem-calc(36);
            font-size: rem-calc(30/2);
          }
          &>span:first-child{
            color:#333;
            font-size: rem-calc(30/2);
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
