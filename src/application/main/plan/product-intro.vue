<!--********************************************************************
 * Author        : rickyshin
 * Filename      : product-intro.vue
 * Description   : 计划书-产品介绍
 * Time          : 2017/10/24
 *
********************************************************************-->
<template>
  <div class="page_plan-product-intro">
    <div class="img-wrapper">
      <img src="~@/assets/image/long-pic.jpg" alt="">
    </div>
    <div class="btn-wrapper">
      <default-btn val="制作计划书" @Click="makePlan" class="make-plan-btn"></default-btn>
    </div>
  </div>
</template>
<script>
  import defaultBtn from '@/components/base/default-btn.vue'
  export default {
    data () {
      return {
      }
    },
    methods: {
      makePlan () {
        this.$router.push({name: 'import_client_info'})
      }
    },
    created () {
    },
    props: {
    },
    components: {
      defaultBtn
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .page_plan-product-intro {
    @include fullpage;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .img-wrapper {
      margin-bottom: -20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .btn-wrapper {
      background: #fff;
      padding: rem-calc(15) 0;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .make-plan-btn {
      margin: 0 auto;
    }
  }
</style>
