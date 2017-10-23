<!--
        description: 计划书-产品介绍
        author: ChenRihua
        param:
-->
<template>
  <div class="page_plan-product-int">
    <div class="img-wrapper">
      <img src="~@/assets/image/long-pic.jpg" alt="">
    </div>
    <div class="btn-wrapper">
      <default-btn val="制作计划书" @Click="makePlan" class="make-plan-btn"></default-btn>
    </div>
  </div>
</template>
<script>
  import defaultBtn from '../../../components/base/default-btn.vue'
  export default {
    data () {
      return {
      }
    },
    methods: {
      makePlan () {
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
  .page_plan-product-int {
    .img-wrapper {
      margin-bottom: -20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .btn-wrapper {
      width: 100%;
      position: fixed;
      bottom: 0;
    }
    .make-plan-btn {
      margin: 0 auto;
    }
  }
</style>
