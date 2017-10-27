<!--********************************************************************
 * Author        : rickyshin
 * Filename      : choose-beneficiary.vue
 * Description   : 在线投保-选择受益人
 * Time          : 2017/10/24
 *
********************************************************************-->
<template>
  <div class="beneficiary_page">
    <ul class="beneficiary_wrapper">
      <li @click="saveBeneficiary(1)">
        <span class="icon-cricle" v-if="beneficiaryType === 1"></span>
        <img src="~@/assets/image/legal.png">
        <div class="text_wrapper">
          <div>法定受益人</div>
          <div>法定受益人按顺序继承</div>
        </div>
        <div class="arrow_wrapper">
          <div class="arrow_icon3"></div>
        </div>
      </li>
      <li @click="saveBeneficiary(2)">
        <span class="icon-cricle" v-if="beneficiaryType === 2"></span>
        <img src="~@/assets/image/assign.png">
        <div class="text_wrapper">
          <div>指定受益人</div>
          <div>由被保险人或者投保人指定</div>
        </div>
        <div class="arrow_wrapper">
          <div class="arrow_icon3"></div>
        </div>
      </li>
      <li @click="saveBeneficiary(3)" v-if="showApplicant">
        <span class="icon-cricle" v-if="benefictaryType === 3"></span>
        <img src="~@/assets/image/applicant.png">
        <div class="text_wrapper">
          <div>投保人</div>
          <div>指定投保人为唯一受益人</div>
        </div>
        <div class="arrow_wrapper">
          <div class="arrow_icon3"></div>
        </div>
      </li>
    </ul>
    <div class="btn-wrapper">
      <!--<default-btn class='next' val='下一步' @Click="nextStep"></default-btn>-->
      <div class="pre-step">上一步</div>
      <div class="next-step" @click="nextStep">下一步</div>
    </div>
  </div>
</template>

<script>
  import {QUERYBENEFICTARY, saveBeneficiary} from '@/api'

  export default {
    name: 'beneficiary',
    data () {
      return {
        message: true,
        applyId: '',
        beneficiaryType: "",
        beneficiarySize: '',
        showApplicant: ""
      }
    },
    created () {
      /**
      this.applyId = this.$route.query.applyId || this.$store.state.sale.applyId
      this.getData()
       */
    },
    methods: {
      nextStep () {
        this.$router.push({name: 'insurance_pay_insurance'})
      },
      choose (index, size) {
        /**
        if (index == 1) {
          this.$router.push({path: '/web/supplementInfo', query: {'applyId': this.applyId}})
        } else if (index == 2) {
          if (size && size > 0) {
            this.$router.push({path: '/web/beneficiaryInformation', query: {'applyId': this.applyId}})
          } else {
            this.$router.push({path: '/web/beneficiaryInfo', query: {'applyId': this.applyId}})
          }
        } else {
          this.$router.push({path: '/web/supplementInfo', query: {'applyId': this.applyId}})
        }
         */
      },
      saveBeneficiary (index) {
        /**
        this.axios.post(SAVEBENEFICTARY, {'applyId': this.applyId, 'benefictary': {'beneficiaryType': index}}).then((res) => {
          this.choose(index, res.data.value.beneficiarySize)
        }, (res) => {}).catch((err) => {
          console.log(err)
          throw new Error(err)
        })
         */
      },
      getData () {
        /**
        this.axios.post(QUERYBENEFICTARY, {"applyId": this.applyId}).then((res) => {
          res.data.value && (this.beneficiaryType = res.data.value.beneficiaryType)
          res.data.value && (this.beneficiarySize = res.data.value.beneficiarySize)
          res.data.value && (this.showApplicant = res.data.value.showApplicant)
        }, (res) => {}).catch((err) => {
          console.log(err)
          throw new Error(err)
        })
         */
      }
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';

  .beneficiary_page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    background-color: #f7f7f7;
    & > .beneficiary_wrapper {
      padding-left: rem-calc(15px);
      background-color: #ffffff;
      & > li {
        height: rem-calc(80px);
        display: flex;
        align-items: center;
        @include borderbottom-1px(#efefef);
        list-style: none;
        position: relative;
        & > img {
          width: rem-calc(50px);
          height: rem-calc(50px);
          border-radius: 50%;
          overflow: hidden;
          position: relative;
        }
        & > .text_wrapper {
          margin-left: rem-calc(25px);
          & > :first-child {
            font-size: rem-calc(15px);
          }
          & > :last-child {
            font-size: rem-calc(13px);
            color: #a2a2a2;
            margin-top: rem-calc(10px);
          }
        }
        & > .arrow_wrapper {
          flex: 1;
          margin-right: rem-calc(15);
          & > .arrow_icon {
            top: rem-calc(-10);
          }
        }
      }
      & > li:last-child {
        background-image: none;
      }
    }
    .icon-cricle {
      position: absolute;
      left: rem-calc(35px);
      top: rem-calc(40px);
      z-index: 9999;
      width: rem-calc(20);
      height: rem-calc(20);
      line-height: rem-calc(20);
      border-radius: 50%;
      /*border: rem-calc(2) solid #00aeff;*/
      &:before {
        content: ' ';
        display: block;
        width: rem-calc(15);
        height: rem-calc(15);
        background: url('~@/assets/image/selecticon.png');
        background-size: contain;
        margin-top: rem-calc(10);
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
  }
</style>
