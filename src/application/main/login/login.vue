<!--********************************************************************
 * Author        : zhouzhe
 * Filename      : login.vue
 * Description   : 登录页
 * Time          : 2017/11/09
 *
********************************************************************-->
<template>
  <div class="login">
    <div class="login-header">
      <h2>歡迎登錄AXA IYunBao</h2>
      <div class="login-type">
        <div v-on:click="handleAgent">代理人登錄</div>
        <div v-on:click="handleOrdinary">普通會員登錄</div>
      </div>
      <div class="login-active" v-bind:style="{left: loginType == 1? '25%' : '75%'}"></div>
    </div>
    <div class="login-content">
      <Group class="grop">
        <p>用戶名</p>
        <x-input type="text" placeholder="請輸入用戶名" :show-clear="false"></x-input>
      </Group>
      <Group class="grop">
        <p>密碼</p>
        <x-input type="password" placeholder="請輸入密碼" :show-clear="false"></x-input>
      </Group>
    </div>
    <div class="login-footer">
      <x-button class="primary-blue" @click.native="handleLogin">登錄</x-button>
    </div>
  </div>
</template>

<script>
  import { XInput, Group, XButton, Cell } from 'vux'
  export default {
    name: 'Login',
    components: {
      XInput,
      XButton,
      Group,
      Cell
    },
    data () {
      return {
        loginType: 1
      }
    },
    methods: {
      handleLogin () {
        console.log('登陸')
      },
      handleAgent () {
        this.loginType = 1
      },
      handleOrdinary () {
        this.loginType = 2
      }
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
  .login {
    .login-header {
      width: 100%;
      height: rem-calc(143px);
      background: url("~@/assets/image/score-head.jpg") no-repeat;
      background-size: 100% 100%;
      background-position: bottom center;
      position: relative;
      h2 {
        color: #fff;
        font-size: rem-calc(20px);
        white-space: nowrap;
        position: absolute;
        left: 50%;
        top: rem-calc(52px);
        transform: translate(-50%, -50%);
      }
      .login-type {
        width: 100%;
        color: #fff;
        background: rgba(0, 0, 0, 0.3);
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        text-align: center;
        div {
          flex: 1;
          padding: rem-calc(13px) 0;
        }
      }
      .login-active {
        width: 0;
        height: 0;
        border-buttom: 8px solid #fff;
        border-top: 8px solid #fff;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        transform: rotate(180deg);
        position: absolute;
        bottom: -1px;
        left: 25%;
        margin-left: rem-calc(-8px);
        transition: left 0.4s;
      }
    }
    .login-content {
      .grop {
        margin: 0 rem-calc(45px);
        p {
          color: #666;
          font-size: rem-calc(12px);
        }
        .weui-cell {
          padding-left: 0;
        }
        .weui-cell:before {
          border: none;
        }
        .vux-no-group-title:before {
          border: none;
        }

      }
    }

    .login-footer {
      margin: rem-calc(36px) rem-calc(28px) rem-calc(28px);
      .primary-blue {
        background-color: #485ebc;
        color: #fff;
        font-size: rem-calc(18);
        &:active {
          background-color: rgba(72, 94, 188, 0.8)!important;
          color: #fff!important;
        }
      }
    }
  }
</style>
