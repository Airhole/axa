
<!--********************************************************************
 * Author			: zhouzhe
 * Email			:
 * Last modified	: 2017-11-06
 * Filename			: my-score.vue
 * Description		:  我的积分

********************************************************************-->

<template>
  <div class="my-score">
    <div class="score-head">
      <p>積分賬戶餘額</p>
      <p>37280</p>
      <p>本月積分 +3000</p>
    </div>
    <div class="score-btn">
      <x-button class="primary-blue" @click.native="handleDetails">查看明細</x-button>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  export default {
    name: 'my-score',
    components: {
      XButton
    },
    data: () => {
      return {

      }
    },
    methods: {
      handleDetails () {
        console.log('点击 查看明细')
      }
    }
    // created () {
    //   this.resObjet = this.$route.params
    //   console.log(this.resObject)
    // },
    // methods: {
    //   getData () {
    //     let self = this
    //     this.axios.get(IRESULTSUCC, {}).then((response) => {
    //       this.contractId = response.data.contractid
    //       this.startTime = response.data.starttime
    //       self.show = true
    //     }).catch((err) => {
    //       console.log(err)
    //       self.show = false
    //       throw new Error(err)
    //     })
    //   }
    // }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .my-score {
    .score-head{
      width: 100%;
      height: rem-calc(189px);
      color: #fff;
      text-align: center;
      background:url('~@/assets/image/score-head.jpg') no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      p:nth-child(1) {
        padding-top: rem-calc(36px);
        font-size: rem-calc(14px);
      }
      p:nth-child(2) {
        font-size: rem-calc(34px);
        padding: rem-calc(20px) 0;
      }
      p:nth-child(3) {
        font-size: rem-calc(14px);
      }
    }
    .score-btn {
      margin: rem-calc(15px);
      .primary-blue {
        background-color: #0a359e;
        color: #fff;
        font-size: rem-calc(18);
        &:active {
          background-color: #0a359e!important;
          color: #fff!important;
        }
      }
    }
  }

</style>
