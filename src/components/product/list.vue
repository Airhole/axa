<template>
  <div>
    <div class="panel-bg">
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
      <div class="panel-main">
        <ul class="list-product">
          <li>
            <img src="~@/resource/insurance-1.png">
            <h2>成人重大疾病保险</h2>
            <h3>人生何处不挑战 重压之下更需健康</h3>
            <div class="bar">
              <label>众安保险公司</label>
              <strong>¥219<small>起</small></strong>
            </div>
          </li>
          <li>
            <img src="~@/resource/insurance-2.png">
            <h2>老年人综合意外险</h2>
            <h3>人生何处不挑战 重压之下更需健康</h3>
            <div class="bar">
              <label>众安保险公司</label>
              <strong>¥219<small>起</small></strong>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import supplies from '@/data/suppliers'
  import products from '@/data/products'

  export default {
    name: 'products',
    components: {},
    data () {
      return {
        filters: [{
          title: '保险公司',
          active: false,
          selected: null,
          list: [...supplies]
        }, {
          title: '产品类型',
          active: false,
          selected: null,
          list: [...products]
        }]
      }
    },
    methods: {
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
        filter.active ? this.hide({filter}) : this.open({filters, index})
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
<style lang="scss" scoped>
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
  .list-product{
    list-style: none;
    background-color: white;
    padding-left: rem-calc(15);
    > li {
      position: relative;
      overflow: hidden;
      padding: rem-calc(15) rem-calc(15) rem-calc(15) 0;
    }
    > li + li::before{
      position: absolute;
      content: ' ';
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      transform: scaleY(0.5);
      background-color: #d0d0d0;
    }
    h2, h3{
      font-weight: normal;
      font-family: 'PingFang HK', "Helvetica Neue","Helvetica","Hiragino Sans GB","Century Gothic",system, Arial, Verdana, Tahoma,"微软雅黑", Arial,sans-serif;;
    }
    h2{
      line-height: rem-calc(24);
      height: rem-calc(24);
      overflow: hidden;
      margin-top: rem-calc(5);
      font-size: rem-calc(16);
      color: #333;
    }
    h3{
      font-weight: lighter;
      font-size: rem-calc(12);
      line-height: rem-calc(16);
      height: rem-calc(32);
      overflow: hidden;
      color: #666;
      margin: rem-calc(4) 0;
    }
    img{
      display: block;
      width: rem-calc(135);
      height: rem-calc(90);
      float:left;
      margin-right: rem-calc(15);
    }
    .bar{
      font-family: 'PingFang SC',"Helvetica Neue","Helvetica","Hiragino Sans GB","Century Gothic",system, Arial, Verdana, Tahoma,"微软雅黑", Arial,sans-serif;;
      text-align: right;
      > label {
        color: #00afff;
        border: .5px solid #00afff;
        height: rem-calc(17);
        line-height: rem-calc(17);
        border-radius: 3px;
        padding: 0 rem-calc(7);
        display: inline-block;
        float: left;
        font-size: rem-calc(11);
        font-weight: normal;
      }
      strong{
        color: #fa6d48;
        font-size: rem-calc(18);
      }
      small{
        font-size: rem-calc(12);
        font-weight: normal;
      }
    }
  }
</style>
