<template>
  <div class="order-inquiry">
    <div class="order-inquiry-top w-box" @click="showTimePlugin">
     <div class="flex-1 time-select" @click="timeClick(startTime)">{{ initStartTime }}</div>——
     <div class="flex-1 time-select" @click="timeClick(endTime)">{{ initEndTime }}</div>
     <div class="flex-1 search">檢索</div>
    </div>
    <div class="order-inquiry-list" v-for="order in orders">
      <div class="inquiry-list-item">
        <h3>訂單號：{{ order.policyNumber }}</h3>
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
  import { Datetime, XButton } from 'vux'
  var years = []
  for (var i = 2000; i <= 2030; i++) {
    years.push({
      name: i + '年',
      value: i + ''
    })
  }
  console.log(years)
  export default {
    name: 'order_inquiry',
    data () {
      return {
        orders: [{
          orderNumber: '21920392817',
          policyNumber: '192039281729',
          productName: '健康一生全名醫療保險',
          policyHolder: '安小盛',
          assured: '安大盛',
          downPremium: '1000.00',
          underwritingDate: '2017-10-09',
          generalizedIntegral: '100'
        }, {
          orderNumber: '21920392817',
          policyNumber: '192039281729',
          productName: '健康一生全名醫療保險',
          policyHolder: '安小盛',
          assured: '安大盛',
          downPremium: '1000.00',
          underwritingDate: '2017-10-09',
          generalizedIntegral: '100'
        }],
        startDate: '2015-11-11',
        endDate: '2017-10-11',
        defaultValue: '2017-10',
        visibility: false,
        startTime: '2015-10',
        endTime: '2017-19',
        initStartTime: '',
        initEndTime: ''
      }
    },
    components: {
      Datetime,
      XButton
    },
    created: function () {
      this.initDefaultTime(this.startTime, "start")
      this.initDefaultTime(this.endTime, "end")

      // this.axios.get(INTERGRAL_DETAIL).then(response => {
      //   // this.result = response.data.data
      //   // this.status = response.data.status
      //   this.isLoading = false
      // }).catch(err => {
      //   console.log(err)
      //   throw new Error(err)
      // })
    },
    methods: {
      change (value) {
        console.log('change', value)
      },
      /**
       * 初始化默认时间
       * @param time 页面当前选择时间
       */
      initDefaultTime (val, type) {
        let valArr = []
        valArr = val.split('-')
        if (type == "start") this.initStartTime = valArr[0] + '年' + parseInt(valArr[1]) + '月'
        else if (type == "end") this.initEndTime = valArr[0] + '年' + parseInt(valArr[1]) + '月'
      },
      /**
       * 时间插件展示
       * @param time 页面当前选择时间
       */
      showTimePlugin (time, type) {
        let _self = this
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM',
          value: time,
          minYear: 2013,
          maxYear: 2018,
          onConfirm (val) {
            _self.initDefaultTime(val, type)
          },
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          }
        })
      },
      /**
       * 时间插件展示
       * @param time 页面当前选择时间,开始时间或结束时间
       */
      timeClick (time) {
        time == this.startTime ? this.showTimePlugin(time, "start") : this.showTimePlugin(time, "end")
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
      .time-select {
        position: relative;
      }
      .time-select:after {
        content: "";
        height: 0;
        width: 0;
        display: inline-block;
        vertical-align: middle;
        margin-left: rem-calc(5);
        border-color: #999999 transparent transparent;
        border-style: solid solid none;
        border-width: 4px 4px 0px;
        // position: absolute;
        // left: 50%;
        // top: 50%;
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
