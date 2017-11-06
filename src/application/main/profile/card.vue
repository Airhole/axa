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
          <span>头像</span>
          <div><img :src="userInfo.headImg" class="head-img" /></div>
        </div>
      </div>
      <div class="card-item">
        <div class="card-info">
          <span>微店名称</span>
          <div>{{userInfo.storeName}}</div>
        </div>
        <div class="card-info">
          <span>店主名称</span>
          <div>{{userInfo.shopkeeperName}}</div>
        </div>
      </div>
      <div class="card-item">
        <div class="card-info">
          <span>手机号码</span>
          <div><a :href="'tel:' + userInfo.telephone">{{userInfo.telephone}}</a> <i class="phone-icon"></i></div>
        </div>
        <div class="card-info">
          <span>微信号</span>
          <div>{{userInfo.wechat}} <i class="wechat-icon"></i></div>
        </div>
      </div>
      <div class="card-item">
        <div class="card-info">
          <span>公司</span>
          <div>{{userInfo.companyName}}</div>
        </div>
        <div class="card-info">
          <span>机构</span>
          <div>{{userInfo.org}}</div>
        </div>
        <div class="card-info">
          <span>职位</span>
          <div>{{userInfo.position}}</div>
        </div>
        <div class="card-info">
          <span>自我介绍</span>
          <div class="self-introduce">{{userInfo.introduce}}</div>
        </div>
      </div>
      <a class="share-card">分享名片</a>
    </div>
    <div v-transfer-dom>
      <loading :show="showLoading"></loading>
    </div>
  </div>
</template>
<script>
  import {Loading, TransferDomDirective as TransferDom} from 'vux'
  export default {
    name: 'planShow',
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
        this.axios.get('http://easy-mock.com/mock/59f066041bd72e7a88898a61/xninsurance/userInfo#!method=get').then((response) => {
          console.log(response)
          this.userInfo = response.data.userInfo
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
