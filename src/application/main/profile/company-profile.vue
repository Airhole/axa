
<!--********************************************************************
 * Author        : zhouzhe
 * Create Date   : 2017-11-03
 * Filename      : company-profile.vue
 * Description   : 公司简介

********************************************************************-->

<template>
  <div class='company-profile-content'>
    <div v-show="!isLoading">
      <div class="img-wrapper">
        <img src="~@/assets/image/company-banner.jpg" alt="">
      </div>
      <div class="profile-text">
        <div class="item" v-for="item in textData">
          <h2>{{item.title}}</h2>
          <div v-html="item.text"></div>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <loading :show="isLoading"></loading>
    </div>
  </div>
</template>

<script>
  import { Loading, TransferDomDirective as TransferDom } from 'vux'
  import { ICOMPANY_INTRODUCTION } from '@/api'
  export default {
    name: 'company-profile',
    components: {
      Loading, TransferDom
    },
    directives: {
      TransferDom
    },
    data: () => {
      return {
        textData: [],
        isLoading: true
      }
    },
    created () {
      this.getData()
      // this.setDate()
    },
    methods: {
      getData () {
        // 'http://easy-mock.com/mock/59f066041bd72e7a88898a61/xninsurance/companyProfile'
        this.axios.get(ICOMPANY_INTRODUCTION).then(response => {
          this.textData = response.data.data
          this.isLoading = false
        }).catch(err => {
          console.log(err)
          throw new Error(err)
        })
      },
      setDate () {
        this.$i18n.add('FAN', {name: "fan 123123"})
        this.$i18n.add('EN', {name: "en 123123"})
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  @import '~@/assets/scss/function';
  .company-profile-content {
    background-color: #f0f0f0;
    overflow: scroll;
    .img-wrapper {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .profile-text {
      .item:not(:last-child) {
        margin-bottom: rem-calc(11px);
      }
      .item {
        background-color: #fff;
        color: #333333;
        h2 {
          font-size: rem-calc(20px);
          border-bottom: 1px solid #f0f0f0;
          padding:rem-calc(21px) 0 rem-calc(21px) rem-calc(19px);
        }
        div {
          font-size: rem-calc(15px);
          line-height: rem-calc(25px);
          text-align: justify;
          padding: rem-calc(15px) rem-calc(20px) rem-calc(32px);
        }
      }
    }
  }
</style>

