<!--********************************************************************
 * Author     : ying
 * Email      :
 * Last modified  : 2017-11-14
 * Filename     : regist.vue
 * Description    : 注册

********************************************************************-->
<template>
  <div class="regist">
    <div class="step step-one" v-show="stepOne">
      <div class="main-content">
        <h3>會員註冊<em>／設置用戶名密碼</em></h3>
        <div class="w-box">
          <div class="box-cm title">用戶名</div>
          <!-- <input-btn-item :rules="123" :value="0909" :name="908"></input-btn-item> -->
          <div class="flex-1">
            <input type="text" class="ipt" placeholder="請輸入用户名" />
          </div>
        </div>
        <div class="w-box">
          <div class="box-cm title">密碼</div>
          <div class="flex-1">
            <input type="password" class="ipt" placeholder="請輸入密碼" />
          </div>
        </div>
        <div class="w-box">
          <div class="box-cm title">再次輸入密碼</div>
          <div class="flex-1">
            <input type="password" class="ipt" placeholder="請再次輸入密碼" />
          </div>
        </div>
      </div>
      <div class="sign">溫馨提示：用戶名不超過6-20位數字或字母，密碼不超過6-16位數字或字母，不能於用戶名相同</div>
      <default-btn val='下一步' @Click="nextStep"></default-btn>
    </div>
    <div class="step step-two" v-show="stepTwo">
      <div class="main-content">
        <h3>會員註冊</h3>
        <div class="w-box">
          <div class="box-cm title">姓</div>
          <div class="flex-1">
            <input type="text" class="ipt" placeholder="請輸入姓" />
          </div>
        </div>
        <div class="w-box">
          <div class="box-cm title">名</div>
          <div class="flex-1">
            <input type="text" class="ipt" placeholder="請輸入名" />
          </div>
        </div>
        <div class="w-box">
          <div class="box-cm title">手機號</div>
          <div class="flex-1">
            <input type="tel" class="ipt" placeholder="請輸入手機號" />
          </div>
        </div>
        <div class="w-box code">
          <div class="box-cm title">短信驗證碼</div>
          <div class="flex-1">
            <input type="tel" class="ipt" placeholder="請輸入短信驗證碼" />
          </div>
          <div class="flex-1 box-cm get-code" @click="getCode">獲取驗證碼</div>
        </div>
        <group>
          <popup-picker :title="title2" :data="list2" v-model="value2" value-text-align="left"></popup-picker>
        </group>
        <div class="w-box">
          <div class="box-cm title">證件號碼</div>
          <div class="flex-1">
            <input type="text" class="ipt" placeholder="請輸入證件號碼" />
          </div>
        </div>
        <div class="w-box">
          <div class="box-cm title">證件照片</div>
          <div class="flex-1 img" :style="{backgroundImage: 'url(' + src + ')'}"></div>
          <div class="flex-1 img" :style="{backgroundImage: 'url(' + src + ')'}"></div>
        </div>
      </div>
      <!-- <div :style="{backgroundImage: 'url(' + item.src + ')'}"></div> -->
      <default-btn class='finish' val='完成注册' @Click="finishStep"></default-btn>
    </div>
  </div>
</template>

<script>
  import defaultBtn from '@/components/base/default-btn.vue'
  import { PopupPicker, Group } from 'vux'
  // import inputBtnItem from '@/components/items/types/input-btn-item.vue'

  export default {
    name: 'baseInfo',
    data () {
      return {
        stepOne: true,
        stepTwo: false,
        title2: '證件類型',
        list2: [['香港身份证']],
        value2: ['香港身份证'],
        src: 'https://hq-app-dev.zhongan.io/api/data/downloadImage?url=2897466026208613.jpg'
      }
    },
    components: {
      // inputBtnItem,
      PopupPicker,
      Group,
      defaultBtn
    },
    methods: {
      nextStep () {
        this.stepOne = false
        this.stepTwo = true
      },
      getCode () {
        console.log('获取验证码')
      },
      finishStep () {
        console.log('finishStep')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .regist {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
    position: relative;
    font-family: 'PingFang SC';
    em {
      font-style: normal;
    }
    .step {
      .main-content {
        background-color: #fff;
        h3 {
          font-size: rem-calc(27);
          font-weight: 500;
          padding: rem-calc(20) rem-calc(15);
          border-bottom: .5px solid #e8e8e8;
        }
        > .w-box {
          font-size: rem-calc(15);
          margin-left: rem-calc(15);
          padding: rem-calc(10) rem-calc(15) rem-calc(10) 0;
          border-bottom: .5px solid #e8e8e8;
          color: #333;
          .ipt {
            width:  100%;
            border: none;
            outline: none;
            font-size: rem-calc(15);
          }
        }
      }
      .blue-btn-content {
        padding-top: rem-calc(20);
        /deep/ {
          .blue-btn {
            background-color: #485BBA;
          }
        }
      }
    }
    .step-one {
      .main-content {
        em {
          font-size: rem-calc(16);
          color: #999;
          font-weight: 400;
        }
        .title {
          width: rem-calc(120);
        }
      }
      .sign {
        color: #485BBA;
        font-size: rem-calc(13);
        line-height: rem-calc(20);
        padding: rem-calc(20) rem-calc(15);
      }
    }
    .step-two {
      .main-content {
        .title {
          width: rem-calc(95);
        }
        .code {
          .ipt {
            width: rem-calc(160);
          }
          .get-code {
            color: #485BBA;
          }
        }
        /deep/ {
          .vux-no-group-title {
            margin-top: 0;
          }
          .weui-cell {
            font-size: rem-calc(15);
            margin-left: rem-calc(15);
            padding: rem-calc(10) rem-calc(15) rem-calc(10) 0;
            border-bottom: .5px solid #e8e8e8;
            .weui-cell__hd {
              width: rem-calc(95);
              color: #333;
            }
          }
          .vux-popup-picker-value {
            color: #000;
          }
          .vux-cell-box:before, .weui-cells:before {
            border-top: none;
          }
          .weui-cells:after {
            border-bottom: none;
          }
        }
      }
      .w-box {
        .img {
          width: rem-calc(40);
          height: rem-calc(40);
          margin-right: rem-calc(20);
        }
        .img:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
