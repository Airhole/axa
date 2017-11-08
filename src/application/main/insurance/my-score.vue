
<!--********************************************************************
 * Author			: zhouzhe
 * Email			:
 * Last modified	: 2017-11-06
 * Filename			: my-score.vue
 * Description		:  我的积分

********************************************************************-->

<template>
<<<<<<< HEAD
  <div class="my-score">
    <div class="score-head">
      <p>{{ $t('scoreAccountBalance') }}</p>
      <p>{{ scoreAccountBalance }}</p>
      <p>{{ $t('monthScore') }} {{ monthScore }}</p>
    </div>
    <div class="score-btn">
      <x-button class="primary-blue" @click.native="handleDetails">{{ $t('viewDetails') }}</x-button>
=======
  <div>
    <div class="my-score"  v-show="!showLoading">
      <div class="score-head">
        <p>{{ $t('scoreNum')}}</p>
        <p>{{ total }}</p>
        <p>{{ $t('scorePrice', {"price": total})}}</p>
      </div>
      <div class="score-btn">
        <x-button class="primary-blue" @click.native="handleDetails">{{ $t('scoreView') }}</x-button>
      </div>
    </div>
    <div v-transfer-dom>
      <loading :show="showLoading"></loading>
>>>>>>> br_stanley
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
  import { XButton } from 'vux'
  import { MY_SCORE } from '@/api'
=======
  import { XButton, Loading, TransferDomDirective as TransferDom } from 'vux'
  import { IMY_SCORE } from '@/api'
>>>>>>> br_stanley
  export default {
    name: 'my-score',
    components: {
      XButton, Loading, TransferDom
    },
    data: () => {
      return {
<<<<<<< HEAD
        scoreAccountBalance: '',
        monthScore: ''
      }
    },
    created: function () {
      this.axios.get(MY_SCORE).then(response => {
        this.data = response.data.data
        if (this.data) {
          this.scoreAccountBalance = this.data.scoreAccountBalance
          this.monthScore = this.data.monthScore
        }
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        throw new Error(err)
      })
=======
        total: 0,
        showLoading: true
      }
    },
    created: function () {
      this.change()
    },
    directives: {
      TransferDom
>>>>>>> br_stanley
    },
    methods: {
      handleDetails () {
        // console.log('点击 查看明细')
      },
      change (value) {
        this.axios.post(IMY_SCORE).then(response => {
          this.total = response.data.data.total
          this.showLoading = false
        }).catch(err => {
          console.log(err)
          throw new Error(err)
        })
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
