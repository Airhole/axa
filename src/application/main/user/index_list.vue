<template>
  <div class="index-list">
    <div class="panel-bg">
      <div class="index-top">
        <div class="w-box">
          <div class="flex-1"><strong>{{weixinShopName}}</strong></div>
          <!-- <div class="pack-e language" @click="LanguageSwitch">
            <span>{{language1}}</span>
            <span class="active">{{language}}</span>
          </div> -->
          <translate class="languageComp" @onChange="changeLanguage"></translate>
        </div>
        <div class="w-box">
          <div :style="{backgroundImage: 'url(' + iconUrl + ')'}" 
          class="img" 
          @click="gotoCard">
          </div>
          <div class="flex-1">
            <p>{{ userName }}<em @click="gotoCompany">AXA安盛</em></p>
            <p>{{org}}  {{position}}</p>
            <a :href="mobile" class="tel_box">{{ $t('tel_support') }}</a>
          </div>
        </div>
      </div>
      <div class="list-sign">{{ $t('hot_tips') }}</div>
      <div class="panel-main">
        <ul class="list-product">
          <li  v-for="(item, index) in orders" keys="index">
            <div @click="gotoProduct(item.id)" class="productTable">
              <b class="productImg" :style="{backgroundImage: 'url(' + item.src + ')'}">
              </b>
              <div class="productInfo">
                <h2>{{ item.name }}</h2>
                <h3>{{ item.dep }}</h3>
                <div class="bar">
                  <label>{{ item.type }}</label>
                  <strong>{{ item.price }}<small>{{ item.rate }}</small></strong>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="share-btn" @click="shareStore">{{ $t('share')}}</div>
  </div>
</template>

<script>
  import { IBUSINESS_CARD, HOT_PRODUCT } from '@/api'
  import translate from '@/components/translate'
  import cookie from '@/utils/cookie'
  export default {
    name: 'index_list',
    data () {
      return {
        iconUrl: '',
        userName: '',
        userId: '',
        org: '',
        position: '',
        mobile: '',
        weixinShopName: '',
        language: '中',
        language1: 'A',
        orders: {}
      }
    },
    created: function () {
      this.format()
    },
    components: {
      translate
    },
    methods: {
      format () {
        console.log('init')
        this.getOrderInfo()
        this.getAgentInfo()
      },
      changeLanguage (n) {
        this.format()
      },
      getAgentInfo () { // 获取代理人信息
        this.axios.post(IBUSINESS_CARD, {"staffNo": "1440000165"}).then(response => {
          this.agent = response.data.data
          this.iconUrl = this.agent.imgHeader
          this.userName = this.agent.userName
          this.org = this.agent.comcode
          this.position = this.agent.jobLevel
          this.mobile = 'tel:' + this.agent.mobile
          this.weixinShopName = this.agent.weixinShopName
          this.isLoading = false
        }).catch(err => {
          console.log(err)
          throw new Error(err)
        })
      },
      getOrderInfo () { // 获取产品信息
        this.axios.post(HOT_PRODUCT).then(response => {
          this.orders = response.data.data
          this.isLoading = false
        }).catch(err => {
          console.log(err)
          throw new Error(err)
        })
      },
      LanguageSwitch () { // 切换当前语言环境
        if (this.$i18n.locale() === "FAN") {
          this.$i18n.set('EN')
          this.language = 'A'
          this.language1 = '中'
        } else {
          this.$i18n.set('FAN')
          this.language = '中'
          this.language1 = 'A'
        }
        this.format()
      },
      gotoCard () {
        this.$router.push({path: "/card", query: {userId: this.userId}})
      },
      gotoProduct (n) {
        this.$router.push({path: "/product_detail", query: {userId: this.userId}})
      },
      shareStore () {
        console.log('shareStore')
      },
      gotoCompany () {
        this.$router.push({path: "/company", query: {userId: this.userId}})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .index-list {
    .panel-bg{
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background-color: #f4f4f4;
      display: flex;
      flex-direction: column;
      position: relative;
      font-family: 'PingFang SC';
      > .index-top {
        background-color: #fff;
        > .w-box {
          padding: rem-calc(20);
          & > .languageComp{
            margin-right: rem-calc(15);
          }
          strong {
            font-size: rem-calc(27);
            font-weight: 500;
          }
          .language {
            width: rem-calc(30);
            > span {
              border: 1px solid #999;
              color: #999;
              font-size: rem-calc(11);
              width: rem-calc(16);
              height: rem-calc(16);
              line-height: rem-calc(17);
              text-align: center;
              background-color: inherit;
              border-radius: rem-calc(3);
              display: block;
              position: relative;
            }
            > span.active {
              background-color: #4663ec;
              border: 1px solid #4663ec;
              color: #fff;
            }
            > span:last-child {
              top: rem-calc(5);
              right: rem-calc(3);
            }
          }
          p {
            margin-left: rem-calc(20);
            margin-bottom: rem-calc(10);
            line-height: rem-calc(15);
            em {
              color: #495dbc;
              border: .5px solid #495dbc;
              border-radius: rem-calc(3);
              display: inline-block;
              padding: rem-calc(3) rem-calc(5);
              margin-left: rem-calc(5);
              font-style: normal;
              font-size: rem-calc(12);
            }
          }
          p:nth-child(2) {
            color: #666;
          }
          .tel_box {
            color: #fff;
            text-align: center;
            background-color: #485bba;
            padding: rem-calc(4) rem-calc(20) rem-calc(5) rem-calc(5);
            max-width: rem-calc(98);
            border-radius: rem-calc(15);
            margin-bottom: 0;
            text-decoration: none;
            margin-left: rem-calc(20);
            margin-bottom: rem-calc(10);
            display: block;
            line-height: rem-calc(15);
            white-space:nowrap;
          }
          .tel_box:before {
            content: "";
            display: inline-block;
            vertical-align: rem-calc(-1);
            margin-right: rem-calc(5);
            width: rem-calc(16);
            height: rem-calc(16);
            line-height:  rem-calc(16);
            background-size: 100%;
            background-repeat: no-repeat;
            background-image: url("~@/assets/image/index_phone.png");
            margin-left: rem-calc(10);
          }
        }
        .w-box:first-child {
          border-bottom: .5px solid #e8e8e8;
          padding: rem-calc(25);
        }
        .img {
          width: rem-calc(90);
          height: rem-calc(90);
          background-size: 100% 100%;
          display: block;
          overflow: hidden;
          border-radius: rem-calc(1000);
        }
      }
      > .panel-main{
        color: #999;
        flex: 1;
        margin-bottom: rem-calc(50);
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        max-height: calc(100vh - #{rem-calc(44)});
      }
    }
    .list-sign {
      position: relative;
      text-align: center;
      background-color: #ecebeb;
      padding: rem-calc(15) 0;
      color: #999;
    }
    .list-sign:before, .list-sign:after {
      content: "";
      position: absolute;
      top: 50%;
      width: 24%;
      border-bottom: .5px solid #999;
    }
    .list-sign:before {
      left: 15%;
    }
    .list-sign:after {
      right: 15%;
    }
    .list-product{
      list-style: none;
      background-color: white;
      padding-left: rem-calc(15);
      > li {
        position: relative;
        overflow: hidden;
        padding: rem-calc(15) rem-calc(15) rem-calc(15) 0;
        .productTable{
          display: table;
          width: 100%;
          & .productImg {
            display: table-cell;
            width: 40%;
            height: rem-calc(45);
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
          & .productInfo {
            display: table-cell;
            padding-left: rem-calc(10);
          }
        }
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
      }
      h2{
        line-height: rem-calc(24);
        height: rem-calc(24);
        overflow: hidden;
        margin-top: rem-calc(5);
        font-size: rem-calc(15);
        color: #333;
      }
      h3{
        font-weight: 400;
        font-size: rem-calc(13);
        line-height: rem-calc(16);
        height: rem-calc(32);
        overflow: hidden;
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
          color: #999;
          border: .5px solid #e5e5e5;
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
          color: #ff0048;
          font-size: rem-calc(18);
        }
        small{
          font-size: rem-calc(13);
          font-weight: normal;
          color: #999;
        }
      }
    }
    .share-btn {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      line-height: rem-calc(50);
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: rem-calc(18);
      color: #fff;
      background-color: #485bba;
    }
  }
</style>
