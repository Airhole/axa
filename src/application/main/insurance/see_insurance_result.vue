
<!--********************************************************************
 * Author			: xiangzhi
 * Email			:
 * Last modified	: 2017-10-25
 * Filename			: resultSucc.vue
 * Description		:  在线投保-投保书预览-手工单录入结果

********************************************************************-->

<template>
  <div class="see_insurance_result">
    <div v-if='show'>
      <div class="rst-succ">
        <p>恭喜您投保成功！</p>
        <!--<p>您的保险合同编号为{{resObjet.contNo}},保险合同生效日期为{{resObjet.startTime}}。</p>-->
        <p>您的保险合同编号为0033432233，保险合同生效日期为2017年03月21日00时00分。</p>
        <p class="succ-tip">温馨提示：电子保单将发送至您的电子邮箱，请注意查收。</p>
        <!--{{resObjet.isNeedEmail}}-->
      </div>
    </div>
    <c_errMsg  v-else txt = "啊哦 ～～,抱歉当前无记录信息哦!"></c_errMsg>
  </div>
</template>

<script>
  export default {
    name: 'manual_result',
    data: () => {
      return {
        show: true,
        contractId: '',
        startTime: '',
        resObjet: {
          msg: '',
          contNo: '',
          isNeedEmail: ''
        }
      }
    }
    // created () {
    //   this.resObjet = this.$route.params
    //   console.log(this.resObject)
    // },
    // methods: {
    //   getData () {
    //     let self = this
    //     this.axios.get(IRESULTSUCC, {}).then((response) => {
    //       this.contractId = response.data.contractid
    //       this.startTime = response.data.starttime
    //       self.show = true
    //     }).catch((err) => {
    //       console.log(err)
    //       self.show = false
    //       throw new Error(err)
    //     })
    //   }
    // }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';
  .see_insurance_result {
    position:absolute;
    width:100%;
    height:100%;
    text-align:center;
    background-color:#f7f7f7;
    .rst-succ {
      padding-top:rem-calc(50px);
      background-color:#fff;
      padding-bottom:rem-calc(50px);
      margin-bottom:rem-calc(26px);
      p {
      }
      .succ-icon-content {
        height:rem-calc(46px);
        margin-bottom:rem-calc(22px);
        text-align:center;
        img {
          height:100%;
        }
      }
      & p:nth-child(1) {
        font-size:rem-calc(18px);
        margin-bottom:rem-calc(24px);
        text-align:center;
      }
      & p:nth-child(2) {
        font-size:rem-calc(15px);
        color:#666;
        line-height:rem-calc(20px);
        padding-left:rem-calc(10px);
        padding-right:rem-calc(10px);
        margin-bottom:rem-calc(11px);
        text-align: left;
      }
      .succ-tip {
        color:#00aeff;
      }
    }
  }

</style>
