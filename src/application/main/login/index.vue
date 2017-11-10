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
      <h2>{{ welcome }}</h2>
    </div>
    <div class="login-content">
      <Group class="grop">
        <p>{{ userName }}</p>
        <x-input type="text" :placeholder="namePlaceholder" :show-clear="false"></x-input>
      </Group>
      <Group class="grop">
        <p>{{ password }}</p>
        <x-input type="password" :placeholder="passwordPlaceholder" :show-clear="false"></x-input>
      </Group>
    </div>
    <div class="login-footer">
      <x-button class="primary-blue" @click.native="handleLogin">{{ login }}</x-button>
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
        welcome: '',
        userName: '',
        namePlaceholder: '',
        password: '',
        passwordPlaceholder: '',
        login: '',
        a: 1
      }
    },
    created: function () {
      this.languageShow()
    },
    methods: {
      handleLogin () {
        console.log('登陸')
      },
      languageShow () {
        let language = this.$i18n.locale()
        if (language == "FAN") {
          this.welcome = "歡迎登錄AXA IYunBao"
          this.userName = "用護名"
          this.namePlaceholder = "請輸入用護名"
          this.password = "密碼"
          this.passwordPlaceholder = "請輸入密碼"
          this.login = "登錄"
        } else {
          this.welcome = "Welcome to login Axa Iyunbao"
          this.userName = "user name"
          this.namePlaceholder = "Please enter the name of the nurse"
          this.password = "password"
          this.passwordPlaceholder = "Please enter the password"
          this.login = "Log in"
        }
      }
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
  .login {
    .login-header {
      width: 100%;
      height: rem-calc(92px);
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
        top: 50%;
        transform: translate(-50%, -50%);
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
