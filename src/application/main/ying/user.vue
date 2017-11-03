<template>
  <div class="user">
    <div class="user-bg">
      <p>近七天數據</p>
      <p>37280.00</p>
      <p>微店成交額(元）</p>
    </div>
    <div class="user-list">
      <div class="user-list-item">訂單查詢</div>
      <div class="user-list-item">我的積分</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data () {
      return {
      }
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
    }
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
</style>
