<!--********************************************************************
 * Author        : lisanmei
 * Filename      : card.vue
 * Description   : 名片页面
 * Time          : 2017/11/3
 *
********************************************************************-->
<template>
  <div v-show="!showLoading">
    <div class="profile-card">
      <div class="card-item">
        <div class="card-info">
          <span>{{ $t('ava') }}</span>
          <div>
            <b class="head-img" :style="{backgroundImage: 'url(' + userInfo.imgHeader + ')'}"></b>
          </div>
        </div>
      </div>
      <div class="card-item">
        <div class="card-info">
          <span>{{ $t('storeName') }}</span>
          <div>{{userInfo.weixinShopName}}{{ $t('shopend') }}</div>
        </div>
        <div class="card-info">
          <span>{{ $t('shopkeeperName')}}</span>
          <div>{{userInfo.userName}}</div>
        </div>
      </div>
      <div class="card-item">
        <div class="card-info">
          <span>{{ $t('telephone') }}</span>
          <div><a :href="'tel:' + userInfo.mobile">{{userInfo.mobile}}</a> <i class="phone-icon"></i></div>
        </div>
        <div class="card-info">
          <span>{{ $t('wechat') }}</span>
          <div>{{userInfo.weiXinNumber}} <i class="wechat-icon"></i></div>
        </div>
      </div>
      <div class="card-item">
        <div class="card-info">
          <span>{{ $t('companyName') }}</span>
          <div>{{userInfo.companyName}}</div>
        </div>
        <div class="card-info">
          <span>{{ $t('org') }}</span>
          <div>{{userInfo.comcode}}</div>
        </div>
        <div class="card-info">
          <span>{{ $t('position') }}</span>
          <div>{{userInfo.jobLevel}}</div>
        </div>
        <div class="card-info">
          <span>{{$t('introduce')}}</span>
          <div class="self-introduce">{{userInfo.introduction}}</div>
        </div>
      </div>
      <!-- <a class="share-card">{{$t('share')}}</a> -->
    </div>
    <div v-transfer-dom>
      <loading :show="showLoading"></loading>
    </div>
  </div>
</template>
<script>
  import {Loading, TransferDomDirective as TransferDom} from 'vux'
  import { BUSINESS_CARD } from '@/api'
  export default {
    name: 'card',
    directives: {
      TransferDom
    },
    components: {Loading},
    data () {
      return {
        userInfo: {},
        showLoading: true
      }
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData () {
        // http://easy-mock.com/mock/59f066041bd72e7a88898a61/xninsurance/userInfo#!method=get
        // BUSINESS_CARD
        // http://192.168.26.61:8080/user/getAgentUserInformation
        this.axios.post(BUSINESS_CARD, {"staffNo": "1440000165"}).then((response) => {
          this.userInfo = response.data.data
          this.showLoading = false
        }, (response) => {
        }).catch((err) => {
          this.showLoading = false
          console.log(err)
          throw new Error(err)
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '~@/assets/scss/_variables';
  .profile-card{
    position: relative;
    margin-bottom: rem-calc(50);
    background: #f0f0f0;
    .card-item{
      margin-bottom: rem-calc(10);
      background: #fff;
    }
    .card-info{
      display: flex;
      padding: rem-calc(15) rem-calc(15) rem-calc(15) 0;
      margin-left: rem-calc(15);
      // width: 100%;
      font-size: rem-calc(15);
      line-height: rem-calc(24);
      box-sizing: border-box;
      align-items: center;
      overflow: hidden;
      & > span{
        width: 30%;
        color: #1a1a1a;
      }
      & > div{
        flex: 1;
        color: #666;
        text-align: right;
        a {
          color: #666;
          text-decoration: none;
        }
      }
      &:not(:last-child){
        position: relative;
        &:before{
          content: "";
          position: absolute;
          border-bottom: 1px solid #ccc;
          display: block;
          width: 200%;
          transform: scale(1 .1);
          bottom:0;
          left:0;
        }
      }
      .head-img {
        width: rem-calc(60);
        height: rem-calc(60);
        border-radius: 50%;
        vertical-align: middle;
        display: block;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        float:right;
      }
      .self-introduce{
        text-align: left;
      }

      .phone-icon, .wechat-icon {
        display: inline-block;
        margin-left: rem-calc(10);
        width: rem-calc(20);
        height: rem-calc(20);
        background-size: contain;
        background-repeat: no-repeat;
        vertical-align: middle;
      }
      .phone-icon {
        background-image: url('~@/assets/image/phone.png');
      }
      .wechat-icon {
        background-image: url('~@/assets/image/wechat.png');
      }
    }
    .share-card{
      position:fixed;
      left:0;
      bottom: 0;
      display: block;
      width: 100%;
      line-height: rem-calc(50);
      background: #485bba;
      text-align: center;
      color: #fff;
      font-size: rem-calc(15);
    }
  }

</style>
