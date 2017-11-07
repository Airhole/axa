<!--********************************************************************
 * Author     : ying
 * Email      :
 * Last modified  : 2017-11-07
 * Filename     : user.vue
 * Description    :  用户中心

********************************************************************-->
<template>
  <div class="user">
    <div class="user-bg">
      <p>{{ $t('oneWeekData') }}</p>
      <!-- <p>{{ $t('turnover') }}</p> -->
      <p>{{ turnover }}</p>
      <p>{{ $t('shopTurnover') }}</p>
    </div>
    <div class="user-list">
      <router-link to="order_inquiry" class="user-list-item">{{ $t('orderInquiry') }}</router-link>
      <router-link to="myscore" class="user-list-item">{{ $t('myScore') }}</router-link>
    </div>
  </div>
</template>

<script>
  import { USER_INDEX } from '@/api'
  export default {
    name: 'user',
    data () {
      return {
        turnover: ''
      }
    },
    created: function () {
      this.axios.get(USER_INDEX).then(response => {
        // debugger
        console.log(response.data)
        this.turnover = response.data.data.turnover.toFixed(2)
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        throw new Error(err)
      })
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .user {
    .user-bg {
      background-image: url("~@/assets/image/user/user_bg.png");
      background-size: 100%;
      background-repeat: no-repeat;
      width: 100%;
      color: #fff;
      text-align: center;
      p:nth-child(1) {
        font-size: rem-calc(15);
        padding-top: rem-calc(35)
      }
      p:nth-child(2) {
        font-size: rem-calc(48);
        padding: rem-calc(15) 0;
      }
      p:nth-child(3) {
        font-size: rem-calc(12);
        padding-bottom: rem-calc(50)
      }
    }
    .user-list {
      background-color: #f7f7f7;
      position: relative;
      text-align: center;
      display: flex;
      border-bottom: .5px solid #e5e5e5;
      .user-list-item {
        flex: 1;
        display: block;
        color: #333;
        text-decoration: none;
        font-size: rem-calc(15);
        cursor: pointer;
        padding: rem-calc(15);
      }
      .user-list-item:first-child {
        border-right: .5px solid #e5e5e5;
      }
      .user-list-item:before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        background-repeat: no-repeat;
        background-size: 100%;
        width: rem-calc(43);
        height: rem-calc(43);
        margin-right: rem-calc(5);
      }
      .user-list-item:first-child:before {
        background-image: url("~@/assets/image/user/user_icon1.png");
      }
      .user-list-item:last-child:before {
        background-image: url("~@/assets/image/user/user_icon2.png");
      }
    }
  }
</style>
