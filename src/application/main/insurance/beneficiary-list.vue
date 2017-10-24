<template>
  <div class="wrap" >
    <div class="wrapBox" @click="clickR(item.id)">
      <div class="head">
        <span class='msg'>第一受益人顺序</span>
        <div class="benefici">
          <span class="fontbenefici">受益比例：</span>
          <span class='percentag'>
            xxx%
          </span>
        </div>
      </div>
      <div class="contents">
        <div class="firstLine">
          <span class="name"><i></i>AAA</span>
          <span class="gender"><i></i>{{'M' === 'M' ? '男' : '女'}}</span>
          <span class="year">生日</span>
        </div>
        <div class="secondLine">
          <span class="card">xxx</span>
          <span class="number">certNo</span>
        </div>
      </div>
    </div>
    <div class="operation">
      <div class="btn">
        <button class="del" @click="del">删除</button>
        <button class="write" @click="write">编辑</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {ISBENEFICIARYINFOR} from '@/api'
  export default{
    data () {
      return {
        items: [{benefitRatio: ''}, {name: ''}],
        pageNum: 1,
        show: true,
        cardKindList: []
      }
    },
    computed: {
      bnu () {
        let order = ''
        // this.item.benefitOrder
        // let ratio = this.item.benefitRatio
        let _order
        // let _ratio
        switch (order) {
        case 1:
          _order = '一'
          // _ratio += _ratio
          break
        case 2:
          _order = '二'
          break
        case 3:
          _order = '三'
          break
        case 4:
          _order = '四'
          break
        case 5:
          _order = '五'
          break
        case 6:
          _order = '六'
          break
        case 7:
          _order = '七'
          break
        case 8:
          _order = '八'
          break
        case 9:
          _order = '九'
          break
        }
        return _order
      },
      custText () {
        const cust = this.item.certType || '0'
        return window.findDictionary(this.cardKindList, {value: cust}).name
      }
    },
    created: function () {
      /**
      this.cardKindList = [window.dictionary['card_type']]
      var arr = []
      if (this.item.benefitOrder == 1) {
        // arr.push(this.item.benefitRatio)
        console.log(this.item.benefitRatio)
      }
      console.log(arr)
       */
    },
    props: ["item"],
    methods: {
      write () {
        this.$emit("writeclick")
      },
      clickR (n) {
        this.$emit("clickR")
      },
      del () {
        this.$emit("delclick")
      }
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';

  .box {
    width: 100%;
    padding: 0px;
    margin: 0;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .wrap {
      background-color: white;
      height: rem-calc(295/2px);
    }
  }

  .head {
    font-size: rem-calc(30/2px);
    background-color: #ffffff;
    overflow: hidden;
    height: rem-calc(75/2px);
    line-height: rem-calc(75/2px);
    box-sizing: border-box;
    margin-top: rem-calc(20/2px);
    padding-right: rem-calc(30/2px);
    border-bottom: 1px solid #efefef;
    margin-left: rem-calc(30/2px);
    .msg {
      float: left;
    }
    .benefici {
      float: right;
      color: #999999;
      overflow: hidden;
      .fontbenefici {
        float: left;
      }
      .percentag {
        float: right;
        color: #f78600;
      }
    }
  }

  .contents {
    height: rem-calc(138/2px);
    padding-right: rem-calc(30/2px);
    margin-left: rem-calc(30/2px);
    font-size: rem-calc(30/2px);
    border-bottom: 1px solid #efefef;
    .firstLine {
      height: rem-calc(76/2px);
      line-height: rem-calc(76/2px);
      span {
        display: inline-block;
        float: left;
        font-size: rem-calc(30/2px);
        position: relative;
        i {
          display: inline-block;
          border-right: 1px solid #f7f7f7;
          position: absolute;
          right: 0;
          top: rem-calc(20/2px);
          height: rem-calc(24/2px);
          width: 1px;
        }
      }
      .name {
        min-width: 25%;
        box-sizing: border-box;
        padding-right: rem-calc(67/2px);
        /* border-right: 1px solid #ffffff; */
      }
      .gender {
        width: 20%;
        text-align: center;
      }
      .year {
        padding-left: rem-calc(58/2px);
      }
    }
    .secondLine {
      padding-top: rem-calc(10/2px);
      height: rem-calc(62/2px);
      box-sizing: border-box;
      color: #999999;
      font-size: rem-calc(26/2px);
    }
  }

  .operation {
    padding-right: rem-calc(30/2px);
  }

  .btn {
    position: relative;
    button {
      margin-top: rem-calc(15/2px);
      position: absolute;
      width: rem-calc(120/2px);
      height: rem-calc(50/2px);
      border-radius: rem-calc(4/2px);
      background-color: #ffffff;
    }
    .del {
      right: rem-calc(138/2px);
      color: #666666;
      border: 1px solid #666666;
      font-size: rem-calc(28/2px);
    }
    .write {
      right: 0;
      border: 1px solid #00adff;
      color: #00adff;
      font-size: rem-calc(28/2px);
    }
  }
</style>
