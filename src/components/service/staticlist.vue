<!--
      descript: 投保流程--完善投保人信息
        author: gongshuai
        param:

-->
<template>
  <div class="applicantInfo-page">
    <div class="head">
      <ul>
        <li>
          <span class="name">自核结果</span>
          <span class="input blue">{{underWriteResult}}</span>
        </li>
        <li>
          <span class="name">本单投保申请</span>
          <span type="text" class="input">{{applyDate}}</span>
        </li>
      </ul>
    </div>
    <div class="base-info">
      <div class="item-head">
        <span>投保人</span>
      </div>
      <ul>
        <li>
          <span class="name">姓名</span>
          <span class="input">{{applicant.name}}</span>
        </li>
        <li>
          <span class="name">性别</span>
          <span type="text" class="input" v-if='applicant.gender'>{{applicant.gender === 'M' ? '男' : '女'}}</span>
        </li>
        <li>
          <span class="name">出生日期</span>
          <span type="text" class="input">{{applicant.birthday}}</span>
        </li>
        <li>
          <span class="name">职业类型</span>
          <span type="text" class="input">{{applicant.occupationLevel}}<span v-if='applicant.occupationLevel'>类</span></span>
        </li>
      </ul>
    </div>
    <div class="connect-info" >
      <div class="item-head">
        <span>被投保人</span>
      </div>
      <ul>
        <li>
          <span class="name">姓名</span>
          <span class="input">{{insurant.name}}</span>
        </li>
        <li>
          <span class="name">性别</span>
          <span type="text" class="input" v-if='insurant.gender'>{{insurant.gender === 'M' ? '男' : '女'}}</span>
        </li>
        <li>
          <span class="name">出生日期</span>
          <span type="text" class="input">{{insurant.birthday}}</span>
        </li>
        <li>
          <span class="name">职业类型</span>
          <span type="text" class="input">{{insurant.occupationLevel}}<span v-if="insurant.occupationLevel">类</span></span>
        </li>
      </ul>
    </div>
    <div class="sup-info" v-if='show'>
      <div class="item-head">
        <span>投保险种</span>
      </div>
      <ul v-for="item in productList">
        <li>
          <span class="name">代码</span>
          <span type="text" class="input">{{item.code}}</span>
        </li>
        <li>
          <span class="name">险种</span>
          <span type="text" class="input">{{item.name}}</span>
        </li>
        <li>
          <span class="name">保额/份数</span>
          <span type="text" class="input">{{item.amount}}</span>
        </li>
        <li>
          <span class="name">保期</span>
          <span type="text" class="input">{{item.insured}}</span>
        </li>
                <li>
          <span class="name">交费年期</span>
          <span type="text" class="input">{{item.pay}}</span>
        </li>
        <li>
          <span class="name">期交保费</span>
          <span type="text" class="input">{{item.premium}}<span v-if='item.premium'>元</span></span>
        </li>
        <li>
          <span class="name">保险对象</span>
          <span type="text" class="input">{{item.target}}</span>
        </li>
        <li>
          <span class="name">首年保费合计</span>
          <span type="text" class="input blue">{{firstPremium}}<span v-if='firstPremium'>元</span></span>
        </li>
      </ul>
    </div>
    <div class="sup-info">
      <div class="item-head">
        <span>保险详情</span>
      </div>
      <ul>
        <li>
          <span class="name">电子投保单号</span>
          <span type="text" class="input">{{applyNo}}</span>
        </li>
        <li>
          <span class="name">保单号</span>
          <span type="text" class="input">{{policyNo}}</span>
        </li>
        <li>
          <span class="name">投保单状态</span>
          <span type="text" class="input">{{applyStatus}}</span>
        </li>
                <li>
          <span class="name">上次操作时间</span>
          <span type="text" class="input">{{lastUpdateDate}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {PopupPicker, Group, Datetime, XAddress, ChinaAddressV3Data, Value2nameFilter as value2name} from 'vux'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        show: true,
        firstPremium: "",
        applyDate: "",
        underWriteResult: "",
        policyDate: "",
        applyNo: "",
        policyNo: "",
        applyStatus: '',
        lastUpdateDate: '',
        applicant: {},
        insurant: {},
        productList: [],
        totalpremium: ""
      }
    },
    props: {
      planlist: ''
    },
    created () {
      console.log(4444)
      console.log(this.planlist)
      console.log(this.show)
      // console.log(this.productList.length)
      // !this.productList.length && (this.show = false)
    },
    watch: {
      'planlist' () {
        this.underWriteResult = this.planlist.underWriteResult
        this.applyDate = this.planlist.applyDate
        this.planlist.applicant && (this.applicant = this.planlist.applicant)
        this.planlist.insured && (this.insurant = this.planlist.insured)
        this.productList = this.planlist.productList
        !this.productList.length && (this.show = false)
        console.log(this.productList.length)
        this.firstPremium = this.planlist.firstPremium
        this.policyDate = this.planlist.policyDate
        this.applyNo = this.planlist.applyNo
        this.policyNo = this.planlist.policyNo
        this.applyStatus = this.planlist.applyStatus
        this.lastUpdateDate = this.planlist.lastUpdateDate
      }
    },
    methods: {
    },
    components: {
      PopupPicker,
      Group,
      Datetime,
      XAddress,
      ChinaAddressV3Data
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';

  .applicantInfo-page {
    .blue {
          color: #00b0ff!important;
    }
    .address-li {
      & > div {
        flex: 1;
      }
    }
    .vux-cell-box {
      font-size: rem-calc(15);
      flex: 1;
      height: rem-calc(45);
      line-height: rem-calc(45);
      overflow: hidden;
      &:before {
        opacity: 0;
      }
      .weui-cell {
        padding: 0;
        background-size: 0 !important;
        @include borderbottom-1px(#efefef);
        .vux-cell-primary {
          color: #999999;
          .vux-popup-picker-select {
            & > span {
              padding-right: 0;
            }
          }
        }

        .weui-cell__ft {
          position: relative;
          &:after {
            content: " ";
            display: inline-block;
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #C8C8CD;
            border-style: solid;
            -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
            top: -2px;
            position: absolute;
            top: 50%;
            margin-top: -4px;
            right: 2px;
          }
        }
      }
    }
    .weui-cells {
      height: rem-calc(44px);
      line-height: rem-calc(44px);
      overflow: hidden;
      vertical-align: middle;
      a {
        padding: rem-calc(0px) 0 0 0;
        font-size: rem-calc(16px);
      }
    }
  }
</style>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';

  .applicantInfo-page {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .item-head {
      height: rem-calc(40);
      line-height: rem-calc(40);
      padding-left: rem-calc(15);
      position: relative;
      &:before {
        position: absolute;
        top: rem-calc(24/2);
        content: ' ';
        display: block;
        border-left: rem-calc(2.5) solid #00b0ff;
        height: rem-calc(16px);
      }
      & > span {
        margin-left: rem-calc(8);
        color: #666;
      }
    }
    ul {
      position: relative;
      background-color: #ffffff;
      list-style: none;
      padding-left: rem-calc(15);
      & > li {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: rem-calc(45);
        padding-right: rem-calc(15);
        font-size: rem-calc(15);
        @include borderbottom-1px(#efefef);
        & > span {
          display: inline-block;
          justify-content: space-between;
          color: #333;
        }
        .name {
        }
        .input {
          flex: 1;
          font-size: rem-calc(15);
          border: 0;
          outline: none;
          -webkit-appearance: none;
          text-align: right;
          color: #999999;
          & > a {
            text-decoration: none;
          }
        }
        .input_padding {
          padding-right: rem-calc(15);
        }
        ._input {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }
        .upload-img {
          height: 100%;
          border-left: rem-calc(1) solid #efefef;
          display: flex;
          align-items: center;
          width: rem-calc(60);
          line-height: 100%;
          padding-left: rem-calc(15);
          .icon-cricle {
            width: rem-calc(18);
            height: rem-calc(18);
            line-height: rem-calc(18);
            border-radius: 50%;
            background-color: #999999;
            &:before {
              content: ' ';
              display: block;
              border-bottom: rem-calc(2) solid #ffffff;
              border-left: rem-calc(2) solid #ffffff;
              width: rem-calc(16);
              height: rem-calc(8);
              transform: rotate(-45deg) scale(.8);
              margin-top: rem-calc(1);
            }
          }
          .active {
            background-color: #00aeff;
          }
          .icon-text {
            font-size: rem-calc(13);
            color: #999999;
            margin-left: rem-calc(4);
          }
          .icon-text-active {
            color: #00aeff;
          }
        }
      }
      & > :last-child {
        background-size: 0 !important;
      }
      .picker {
        position: absolute;
        top: 0;
        left: 0;
        right: rem-calc(15);
        opacity: 0;
        .vux-cell-box {
          height: rem-calc(45);
        }
      }
      .picker {
        position: absolute;
        top: 0;
        left: 0;
        right: rem-calc(15);
        opacity: 0;
        .vux-cell-box {
          height: rem-calc(45);
        }
      }
    }

    .button-wrapper {
      margin-top: rem-calc(24);
      margin-bottom: rem-calc(25);
    }
  }

</style>
