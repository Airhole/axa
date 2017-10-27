
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-10-27
 * Filename      : detail.vue
 * Description   : 投保进度－投保进度详情

********************************************************************-->

<template>
<div class='progress-detail-content'>
  <div v-if='show'>
    <!-- <StaticList v-for='item in lists' :list='item.list' :title='item.name' :key='item.id'></StaticList> -->
    <StaticList :planlist='planlist'></StaticList>
    <!-- <c_button class='share-btn' val='分享建议书' @click="shareBtn"></c_button> -->
  </div>
  <c_errMsg  v-else txt = "啊哦 ～～,抱歉当前无记录信息哦!"></c_errMsg>
</div>
</template>

<script>
  import StaticList from '@/components/service/staticlist'
  // import {IPROGRESSDETAIL, IVIEWPLAN, QUERYDEATIL, ISHAREPROPOSAL} from '@/api'

  export default {
    name: 'progressdetail',
    data: () => {
      return {
        show: true,
        planlist: {},
        applylist: {},
        planId: "",
        applyId: ""
      }
    },
    components: {StaticList},
    props: []
    // created: function () {
    //   this.planId = this.$store.state.sale.planId || this.$route.query.planId || ""
    //   this.applyId = this.applyId = this.$store.state.sale.applyId || this.$route.query.applyId || ""
    //   this.getData()
    // },
    // methods: {
    //   shareBtn () {
    //     // alert(ISHAREPROPOSAL)
    //     // alert(this.planId)
    //     this.axios.post(ISHAREPROPOSAL, {planId: this.planId}).then(response => {
    //       if (response.data.success) {
    //         window.showShare('1', response.data.value.url, response.data.value.coverPath, response.data.value.title, response.data.value.remark, 'shareCallback')
    //       }
    //     }, fail => {
    //     }).catch((err) => {
    //       throw new Error(err)
    //     })
    //   },
    //   getData () {
    //     this.axios.post(QUERYDEATIL, {planId: this.planId.toString(), applyId: this.applyId}).then((res) => {
    //       console.log(res)
    //       this.planlist = res.data.value
    //       console.log(this.planlist)
    //     }).catch((err) => {
    //       console.log(err)
    //       throw new Error(err)
    //     })
    //   }
    // }
    // activated: function () {
    //   this.getData()
    // }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  @import '~@/assets/scss/function';
  .progress-detail-content {
    position:absolute;
    top:0;right:0;bottom:0;left:0;
    overflow-x:hidden;
    overflow-y:auto;
    background-color: #f7f7f7;
    .share-btn {
      margin-top:rem-calc(23px);
      margin-bottom:rem-calc(23px);
    }
  }

</style>
