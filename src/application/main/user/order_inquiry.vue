<!--********************************************************************
 * Author     : ying
 * Email      :
 * Last modified  : 2017-11-09
 * Filename     : order_inquiry.vue
 * Description    : 订单列表查询

********************************************************************-->
<template>
  <div class="order-inquiry">
    <div class="order-inquiry-top w-box" @click="showTimePlugin">
      <div class="flex-1 time-select" @click="timeClick(startTime)">{{ initStartTime }}</div>
      <div class="flex-1 line box-cm"></div>
      <div class="flex-1 time-select" @click="timeClick(endTime)">{{ initEndTime }}</div>
      <div class="flex-1 search" @click="searchResult">{{ search }}</div>
    </div>
    <div class="order-inquiry-list">
      <div class="inquiry-list-item" v-for="order in orders">
        <h3>{{ $t('orderNumber') }}{{ order.orderNumber }}</h3>
        <ul>
          <li>{{ $t('policyNumber') }}{{ order.policyNumber }}</li>
          <li>{{ $t('productName') }}{{ order.productName }}</li>
          <li>{{ $t('policyHolder') }}{{ order.policyHolder }}</li>
          <li>{{ $t('assured') }}{{ order.assured }}</li>
          <li>{{ $t('downPremium') }}{{ order.downPremium }}</li>
          <li>{{ $t('underwritingDate') }}{{ order.underwritingDate }}</li>
          <li>{{ $t('scorePoint') }}{{ order.generalizedIntegral }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { Datetime, XButton } from 'vux'
  import { IORDER_QUERY } from '@/api'

  export default {
    name: 'order_inquiry',
    data () {
      return {
        initStartTime: '',
        initEndTime: '',
        orders: [],
        startTime: (new Date().getFullYear() - 10) + '-' + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' + (new Date().getDate() > 9 ? new Date().getDate() : ('0' + new Date().getDate())),
        endTime: (new Date().getFullYear() + 10) + '-' + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' + (new Date().getDate() > 9 ? new Date().getDate() : ('0' + new Date().getDate())),
        defaultValue: (new Date().getFullYear() + 0) + '-' + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : (new Date().getMonth() + 1)),
        search: this.$i18n.translate('search'),
        cancel: this.$i18n.translate('cancel'),
        confirm: this.$i18n.translate('confirm')
      }
    },
    created: function () {
      this.change()
      this.initDefaultTime(this.startTime, "start")
      this.initDefaultTime(this.endTime, "end")
    },
    components: {
      Datetime,
      XButton
    },
    methods: {
      /**
       * 获取列表数据
       * @params staffNo 代理人工号,登录时提供
       * @params startDate 查询条件:开始时间
       * @params endDate 查询条件:结束时间
       * @params language 默认显示语言
       */
      change () {
        let params = {
          staffNo: "1440000165",
          startDate: this.startTime,
          endDate: this.endTime,
          language: "CN"
        }
        this.axios.post(IORDER_QUERY, params).then(response => {
          this.orders = response.data.data
          this.isLoading = false
        }).catch(err => {
          console.log(err)
          throw new Error(err)
        })
      },
      /**
       * 初始化默认时间
       * @param time 页面当前选择时间
       */
      initDefaultTime (val, type) {
        let valArr = []
        valArr = val.split('-')
        if (type == "start") {
          this.startTime = val
          this.initStartTime = valArr[0] + '年' + parseInt(valArr[1]) + '月' + parseInt(valArr[2]) + '日'
        } else if (type == "end") {
          this.endTime = val
          this.initEndTime = valArr[0] + '年' + parseInt(valArr[1]) + '月' + parseInt(valArr[2]) + '日'
        }
      },
      /**
       * 时间插件展示
       * @param time 页面当前选择时间
       */
      showTimePlugin (time, type) {
        let _self = this
        this.$vux.datetime.show({
          cancelText: _self.cancel,
          confirmText: _self.confirm,
          format: 'YYYY-MM-DD',
          value: time,
          minYear: new Date().getFullYear() - 10,
          maxYear: new Date().getFullYear() + 10,
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
      },
      /**
       * 检索事件触发
       */
      searchResult () {
        console.log(this.startTime)
        console.log(this.endTime)
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
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    position: relative;
    font-family: 'PingFang SC';
    .order-inquiry-top {
      background-color: #fff;
      padding: rem-calc(15);
      border-bottom: .5px solid #e8e8e8;
      line-height: rem-calc(30);
      position: relative;
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
        margin-top: -2px;
      }
      .search {
        background-color: #495dbc;
        color: #fff;
        border-radius: rem-calc(5);
        text-align: center;
      }
      > a {
        color: #666;
        text-decoration: none;
        span {
          padding-right: rem-calc(20);
        }
      }
      .line {
        position: relative;
        width: rem-calc(20);
      }
      .line:after {
        content: "";
        height: rem-calc(2);
        width: rem-calc(30);
        background-color: #999;
        position: absolute;
        top: 50%;
        left: rem-calc(-5);
      }
    }
    .order-inquiry-list {
      overflow-y: auto;
      -webkit-overflow-scrolling : touch;
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
            list-style: none;
          }
        }
      }
      .inquiry-list-item:last-child {
        margin-bottom: rem-calc(10);
      }
    }
  }
</style>
