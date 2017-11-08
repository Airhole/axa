<template>
  <div class="order-inquiry">
    <div class="order-inquiry-top" @click="visibility = true">
    <datetime 
    v-model="defaultValue" 
    @on-change="change" 
    :show.sync="visibility" 
    format="YYYY-MM" 
    :start-date="startDate" 
    :end-date="endDate"
    :cancelText= "cancel"
    :confirmText = "confirm"
    >
    </datetime>
    <i></i>
  </div>
    <div class="order-inquiry-list" v-for="order in orders">
      <div class="inquiry-list-item">
        <h3>{{ $t('orderNumber') }}{{ order.orderNumber }}</h3>
        <ul>
          <li>{{ $t('policyNumber') }}{{ order.policyNumber }}</li>
          <li>{{ $t('productName') }}{{ order.productName }}</li>
          <li>{{ $t('policyHolder') }}{{ order.policyHolder }}</li>
          <li>{{ $t('assured') }}{{ order.assured }}</li>
          <li>{{ $t('downPremium') }}{{ order.downPremium }}</li>
          <li>{{ $t('underwritingDate') }}{{ order.underwritingDate }}</li>
          <li>{{ $t('generalizedIntegral') }}{{ order.generalizedIntegral }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { Datetime, XButton } from 'vux'
  import { IORDER_QUERY } from '@/api'
  // var years = []
  // for (var i = 2000; i <= 2030; i++) {
  //   years.push({
  //     name: i + '年',
  //     value: i + ''
  //   })
  // }
  // console.log(years)
  
  export default {
    name: 'order_inquiry',
    data () {
      return {
        orders: [],
        startDate: (new Date().getFullYear() - 10) + '-' + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' + (new Date().getDate() > 9 ? new Date().getDate() : ('0' + new Date().getDate())),
        endDate: (new Date().getFullYear() + 10) + '-' + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' + (new Date().getDate() > 9 ? new Date().getDate() : ('0' + new Date().getDate())),
        defaultValue: (new Date().getFullYear() + 0) + '-' + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : (new Date().getMonth() + 1)),
        visibility: false,
        cancel: this.$i18n.locale() === "FAN" ? "取消" : "cancel",
        confirm: this.$i18n.locale() === "EN" ? "确定" : "done"
      }
    },
    created: function () {
      this.change()
    },
    components: {
      Datetime,
      XButton
    },
    methods: {
      change (value) {
        this.axios.post(IORDER_QUERY).then(response => {
          this.orders = response.data.data
          this.isLoading = false
        }).catch(err => {
          console.log(err)
          throw new Error(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .order-inquiry {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-color: #f7f7f7;
    .order-inquiry-top {
      background-color: #fff;
      text-align: center;
      padding: rem-calc(15);
      border-bottom: .5px solid #e8e8e8;
      position: relative;
      i {
        height: 0;
        width: 0;
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
        border-color: #999999 transparent transparent;
        border-style: solid solid none;
        border-width: 4px 4px 0px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: rem-calc(30);
        margin-top: -2px;
      }
      > a {
        color: #666;
        text-decoration: none;
        span {
          padding-right: rem-calc(20);
        }
      }
    }
    .order-inquiry-list {
      .inquiry-list-item {
        margin-top: rem-calc(10);
        background-color: #fff;
        padding-left: rem-calc(12);
        border-top: .5px solid #e8e8e8;
        border-bottom: .5px solid #e8e8e8;
        h3 {
          color: #333;
          font-weight: 400;
          font-size: rem-calc(15);
          padding: rem-calc(15) rem-calc(15) rem-calc(15) 0;
          border-bottom: .5px solid #e8e8e8;
        }
        ul {
          padding: rem-calc(7) 0;
          li {
            font-size: rem-calc(14);
            color: #666666;
            padding: rem-calc(7) 0;
          }
        }
      }
    }
  }
</style>
