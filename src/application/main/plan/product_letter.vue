<template>
  <div class="plan-show">
    <div class="product-info" :style="{backgroundImage: 'url(' + productInfo.img + ')'}">
      <p class="product-name">{{productInfo.name}}</p>
      <p class="product-desc">{{productInfo.desc1}}</p>
      <p class="product-desc">{{productInfo.desc2}}</p>
    </div>
    <div class="plan-info">
      <div class="view-details">亲启</div>
      <p class="tips-tit tips">敬呈 {{customer.name}} {{customer.sex==='1'?'女士':'男士'}}</p>
      <p class="tips">以下是{{customer.agentName}}为您定制的{{productInfo.name}}保障计划</p>
      <p class="tips">请您查阅！</p>
    </div>
    <x-button type="primary" class="share" @click.native="toggleMask(true)">分享</x-button>
    <div class="p-mask" v-show="showMask" @click="toggleMask(false)">
      <img src="@/assets/image/mask.png" class="p-mask-icon"/>
    </div>
  </div>
</template>
<script>
  import {XButton} from 'vux'
  import {IPLAN} from '@/api'
  export default {
    name: 'planShow',
    components: {XButton},
    data () {
      return {
        showMask: false,
        productInfo: {},
        customer: {}
      }
    },
    created: function () {
      this.getData()
    },
    methods: {
      toggleMask: function (val) {
        this.showMask = val
      },
      getData () {
        this.axios.get('http://easy-mock.com/mock/59f066041bd72e7a88898a61/xninsurance/queryPlan#!method=get').then((response) => {
          console.log(response)
          this.productInfo = response.data.productInfo
          this.customer = response.data.customer
        }, (response) => {
        }).catch((err) => {
          console.log(err)
          throw new Error(err)
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '~@/assets/scss/_variables';
  .plan-show{
    position: relative;
    padding-top: rem-calc(50);
    font-size: rem-calc(16);
    background: url('~@/assets/image/start_bg.png') no-repeat;
    background-size: contain;
    .product-info{
      margin: 0 auto;
      padding: 0 rem-calc(10) rem-calc(40);
      width: 70%;
      height: rem-calc(420);
      background-color: #fff;
      background-size: cover;
      border: 5px solid #fff;
      .product-name{
        display: inline-flex;
        padding: rem-calc(290) 0 rem-calc(15);
        font-size: rem-calc(30);
        color: #fff;
        text-shadow: -7px 4px 50px #999
      }
      .product-desc{
        display: inline-flex;
        margin-bottom: rem-calc(10);
        padding: 0 rem-calc(10);
        background: #21c0d3;
        border-radius: 10px;
        font-size: rem-calc(13);
        line-height: rem-calc(24);
        color: #fff;
      }
    }
    .plan-info{
      text-align: center;
      .view-details{
        display: inline-block;
        margin-top: rem-calc(-50);
        width: rem-calc(80);
        height: rem-calc(80);
        line-height: rem-calc(80);
        border: 4px solid #fff;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        background:linear-gradient(right, #21c2de 0, #20b4e2 100%, transparent);
        font-size: rem-calc(24);
        font-weight: bold;
      }
      .tips{
        margin-top: rem-calc(10);
        font-size: rem-calc(14);
        line-height: rem-calc(20);
        color: #666;
        &.tips-tit{
          font-family: 'STHeiTi';
          color: #1a1a1a;
          font-size: rem-calc(18);
        }
      }
    }
    .share{
      display: none;
      width: 60%;
    }
  }
  .p-mask {
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:#000;
    opacity:0.7;
    z-index: 2000 !important;
  }

  .p-mask-icon {
    float: right;
    width: rem-calc(200);
    position:fixed;
    right:0;
    top:0;
  }

</style>
