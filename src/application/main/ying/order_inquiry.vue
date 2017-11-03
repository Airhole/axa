<template>
  <div class="order-inquiry">
    <div class="order-inquiry-top arrow_icon" @click="dataSelectHandler">2017年10月</div>
    <div class="order-inquiry-list" v-for="order in orders">
      <div class="inquiry-list-item">
        <h3>訂單號：{{ order.orderNumber }}</h3>
        <ul>
          <li>保單號：{{ order.policyNumber }}</li>
          <li>產品名稱：{{ order.productName }}</li>
          <li>投保人：{{ order.policyHolder }}</li>
          <li>被保险人：{{ order.assured }}</li>
          <li>首期保費：{{ order.downPremium }}</li>
          <li>承保日期：{{ order.underwritingDate }}</li>
          <li>推廣積分：{{ order.generalizedIntegral }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'order_inquiry',
    data () {
      return {
        orders: [{orderNumber: '21920392817', policyNumber: '192039281729', productName: '健康一生全名醫療保險', policyHolder: '安小盛', assured: '安大盛', downPremium: '1000.00', underwritingDate: '2017-10-09', generalizedIntegral: '100'}, {orderNumber: '21920392817', policyNumber: '192039281729', productName: '健康一生全名醫療保險', policyHolder: '安小盛', assured: '安大盛', downPremium: '1000.00', underwritingDate: '2017-10-09', generalizedIntegral: '100'}]
      }
    },
    methods: {
      dataSelectHandler (e) {
        console.log(e)
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
