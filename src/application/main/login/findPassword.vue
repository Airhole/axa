<!--********************************************************************
 * Author        : zhouzhe
 * Filename      : findPassword.vue
 * Description   : 找回密码
 * Time          : 2017/11/14
 *
********************************************************************-->
<template>
  <div class="find-password">
    <div class="header">
      <h2>{{ $t("findpw") }}</h2>
    </div>
    <div class="item">
      <Group class="grop">
        <span>{{ $t("username") }}</span>
        <x-input type="text" :placeholder="$t('namePlaceholder')" :show-clear="false"></x-input>
      </Group>
      <Group class="grop">
        <span>{{ $t('pwmobile') }}</span>
        <x-input type="number" :placeholder="$t('namePlaceholder')" :show-clear="false"></x-input>
      </Group>
      <Group class="grop">
        <span>{{ $t('sns') }}</span>
        <x-input type="number" :placeholder="$t('namePlaceholder')" :show-clear="false">
          <x-button slot="right" class="getcode" mini :show-loading="false">{{ $t('getsns') }}</x-button>
        </x-input>
      </Group>
    </div>
    <div class="item">
      <Group class="grop">
        <span>{{ $t('pw') }}</span>
        <x-input type="password" :placeholder="$t('passwordPlaceholder')" :show-clear="false"></x-input>
      </Group>
      <Group class="grop">
        <span>{{ $t('againPw') }}</span>
        <x-input type="password" :placeholder="$t('passwordPlaceholder')" :show-clear="false"></x-input>
      </Group>
    </div>
    <p class="prompt">{{ $t('pwtips') }}</p>
    <div class="confirm">
      <x-button class="primary-blue" @click.native="handleConfirm">{{ $t('confirm') }}</x-button>
    </div>
  </div>
</template>

<script>
  import { XInput, Group, XButton, Cell } from 'vux'
  import Vue from 'vue'
  export default {
    name: 'findPassword',
    components: {
      XInput,
      XButton,
      Group,
      Cell
    },
    data () {
      return {
        H: document.body.clientHeight || document.documentElement.clientHeight
      }
    },
    methods: {
      handleConfirm () {
      }
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
  .find-password {
    position: absolute;
    top:0;
    bottom:0;
    left: 0;
    right:0;
    background-color: #f7f7f7;
    .header {
      background-color: #fff;
      border-bottom: 1px solid #e6e6e6;
      h2 {
        font-size: rem-calc(27px);
        padding: rem-calc(27px) 0 rem-calc(27px) rem-calc(13px);
      }
    }
    .item {
      background-color: #fff;
      margin-bottom: rem-calc(10px);
      .grop {
        margin-left: rem-calc(16px);
        .weui-cell {
          padding-left: 0;
        }
        .weui-cells {
          display: flex;
          align-items: center;
          margin-top: 0;
          span {
            font-size: rem-calc(15px);
            flex: 1;
          }
          .vux-x-input {
            flex: 2;
            font-size: rem-calc(15px);
          }
        }
        .getcode {
          background: transparent;
          color: #485ebc;
          font-size: rem-calc(15px);
          &:active {
            color: #485ebc!important;
          }
        }
        .weui-btn:after {
          border: none;
        }
        .weui-cell:before {
          border: none;
        }
        .vux-no-group-title:before {
          border: none;
        }
      }
    }
    .prompt {
      color: #485ebc;
      font-size: rem-calc(13px);
      line-height: 1.5;
      margin: 0 rem-calc(17px);
    }
    .confirm {
      margin: rem-calc(50px) rem-calc(15px) rem-calc(0);
      .primary-blue {
        background-color: #485ebc;
        color: #fff;
        font-size: rem-calc(16px);
        &:active {
          background-color: rgba(72, 94, 188, 0.8)!important;
          color: #fff!important;
        }
      }
    }
  }
</style>
