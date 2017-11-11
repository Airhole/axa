<!--********************************************************************
 * Author     : ying
 * Email      :
 * Last modified  : 2017-11-07
 * Filename     : integral_detail.vue
 * Description    : 积分明细

********************************************************************-->
<template>
  <div class="integral-detail panel-bg">
    <header>
      <div class="filters">
        <span v-for="(filter,index) in filters" :key="filter.title" @click="toggleFilter({filters,index})" :class="{active:filter.active}">
          {{filter.selected || filter.title}}
          <i class="arrow-down"></i>
        </span>
      </div>
      <div class="panel-options" v-for="filter in filters" v-if="filter.active" @click.self="hide({filter})">
        <ul :key="filter.title">
          <li v-for="(option,optionId) in filter.list" :key="option.id" @click="select({filter,optionId})" :class="{active:option.active}">
            {{option.name}}
          </li>
        </ul>
      </div>
    </header>
    <div class="integral-detail-list" v-for="order in orders">
      <div class="integral-detail-item">
        <h3>{{ $t('policyNumber') }}{{ order.policyNumber }}</h3>
        <ul>
          <li>{{ $t('productName') }}{{ order.productName }}</li>
          <li>{{ $t('downPremium') }}{{ order.downPremium }}</li>
          <li>{{ $t('underwritingDate') }}{{ order.underwritingDate }}</li>
          <li>{{ $t('scorePoint') }}{{ order.generalizedIntegral }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  // import supplies from '@/data/integral'
  import { SCORE_DETAIL } from '@/api'
  export default {
    name: 'integral_detail',
    data () {
      return {
        checkedTime: (new Date().getFullYear() - 10) + '-' + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' + (new Date().getDate() > 9 ? new Date().getDate() : ('0' + new Date().getDate())),
        filters: [{
          title: this.$i18n.translate('sales_points'),
          active: false,
          selected: null,
          list: [{
            name: this.$i18n.translate('sales_points'),
            value: 'saleIntegral',
            id: 123
          }, {
            name: this.$i18n.translate('bonus_points'),
            value: 'rewardIntegral',
            id: 58
          }]
          // list: [...supplies]
        }, {
          title: (new Date().getFullYear() - 10) + '-' + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' + (new Date().getDate() > 9 ? new Date().getDate() : ('0' + new Date().getDate())),
          time: true
        }],
        orders: [],
        cancel: this.$i18n.translate('orderCancel'),
        confirm: this.$i18n.translate('orderDone')
      }
    },
    created: function () {
      this.initDefaultTime(this.filters[1].title)

      this.axios.post(SCORE_DETAIL).then(response => {
        this.orders = response.data.data
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        throw new Error(err)
      })
    },
    methods: {
      /**
       * 初始化默认时间
       * @param time 页面当前选择时间
       */
      initDefaultTime (val) {
        let valArr = []
        this.checkedTime = val
        valArr = val.split('-')
        this.filters[1].title = valArr[0] + '年' + parseInt(valArr[1]) + '月' + parseInt(valArr[2]) + '日'
      },
      /**
       * 时间插件展示
       * @param time 页面当前选择时间
       */
      showTimePlugin () {
        let _self = this
        this.$vux.datetime.show({
          cancelText: _self.cancel,
          confirmText: _self.confirm,
          format: 'YYYY-MM-DD',
          value: _self.checkedTime,
          minYear: new Date().getFullYear() - 10,
          maxYear: new Date().getFullYear() + 10,
          onConfirm (val) {
            _self.initDefaultTime(val)
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
       * 打开过滤面板
       * 有多个过滤列表，但是一次只能打开一个
       * @param filters 过滤列表
       * @param index 当前过滤方式的索引
       */
      open ({filters, index}) {
        filters.forEach((filter, id) => {
          filter.active = (id === index)
        })
      },
      toggleFilter ({filters, index}) {
        let filter = filters[index]
        // filter.active ? this.hide({filter}) : this.open({filters, index})
        if (filter.time) {
          this.showTimePlugin()
        } else {
          filter.active ? this.hide({filter}) : this.open({filters, index})
        }
      },
      /**
       * 隐藏过滤面板
       * @param filter 当前正在执行过滤的列表
       */
      hide ({filter}) {
        filter.active = false
      },
      /**
       * 选择一个过滤项
       * @param filter 当前过滤类型
       * @param optionId 当前过滤项的索引
       */
      select ({filter, optionId}) {
        let options = filter.list
        options.forEach((option, id) => {
          option.active = (id === optionId)
        })
        filter.selected = options[optionId].name
        filter.active = false
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .panel-bg{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    position: relative;
    > header{
      height: rem-calc(44);
    }
    > .panel-main{
      flex: 1;
      overflow-y: auto;
      max-height: calc(100vh - #{rem-calc(44)});
    }
  }
  .filters{
    background-color: white;
    position: relative;
    text-align: center;
    font-size: 0;
    padding: rem-calc(13) 0;
    color: #666;
    display: flex;
    &::after{
      content: ' ';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #d0d0d0;
      transform: scaleY(.5);
    }
    > span {
      flex: 1;
      display: block;
      line-height: rem-calc(18);
      height: rem-calc(18);
      font-family: 'PingFang SC';
      font-size: rem-calc(15);
      cursor: pointer;
      + span {
        border-left: 1px solid #c0c4c7;
      }
    }
    .arrow-down{
      display: inline-block;
      line-height: 0;
      width: rem-calc(12);
      height: rem-calc(12);
      border-left: 1px solid #999;
      border-bottom: 1px solid #999;
      transform: rotate(-45deg) scale(0.6);
      transform-origin:25% 75%;
      margin:0 rem-calc(6);
      position: relative;
      top: rem-calc(-2);
    }
    .active{
      color: #20aee5;
      .arrow-down {
        border-color: #20aee5;
        transform: rotate(135deg) scale(0.7);
      }
    }
  }
  .panel-options{
    position: absolute;
    z-index: 1;
    width: 100%;
    top: rem-calc(45);
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
    ul{
      list-style-type: none;
      background-color: white;
      overflow: hidden;
      padding: rem-calc(7.5);
    }
    li{
      display: inline-block;
      float: left;
      margin: rem-calc(7.5);
      border: .5px solid #ccc;
      border-radius: 4px;
      width: rem-calc(103);
      line-height: rem-calc(34);
      text-align: center;
      color: #666;
      font-family: 'PingFang SC',"Helvetica Neue","Helvetica","Hiragino Sans GB","Century Gothic",system, Arial, Verdana, Tahoma,"微软雅黑", Arial,sans-serif;;
      word-break: keep-all;
      overflow: hidden;
      font-size: rem-calc(15);
    }
    .active{
      color: #20aee5;
      border-color: #20aee5;
    }
  }
  .integral-detail-list {
    .integral-detail-item {
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
  }
</style>
