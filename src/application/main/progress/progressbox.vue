
<!--********************************************************************
 * Author        : gy
 * Filename      : progressbox.vue
 * Description   : 投保进度－tab子页面 排列子组件
 *  canCopy      : true 显示复制按钮
 *  canDele      : true 显示作废
 *
********************************************************************-->

<template>
<div class='page-progressbox'>
  <c_scroll @Scroll="ScrollCallback" class="c_scrollData">
    <ul class="scrollList" v-if="show">
      <li v-for="(item, index) in items" :key="item.id">
        <progressarticle :id="item.id"
                   :imgpath="item.imgPath"
                   :title="item.title"
                   :applicant="item.applicantName"
                   :paytotal = "item.totalPremium"
                   :tag = "item.tag"
                   :step = "item.step"
                   :type = "item.type"
                   :time = "item.updateTime"
                   :canCopy = "item.btnCopy"
                   :canDele = "item.btnDelete"
                   :canEdit = "item.btnEdit"
                   :canView = "item.btnLook"
                   :canPay = "item.btnPay"
                   :proposalId = "item.proposalId"
                   :planId = "item.planId"
                   :applyId = "item.applyId"
                   :inAirPay="item.btnBackAirPay"
                   :inAirSign="item.btnBackAirSign"
                   @C_View = "View"
                   @C_Copy = "Copy"
                   @C_Dele = "Dele"
                   @C_Edit = "Edit"
                   @C_pay = "Pay"
                   @C_De_Sign="DeSign"
                   @C_De_Pay="DePay">
        </progressarticle>
      </li>
    </ul>
    <c_errMsg class='msg' txt = "啊哦 ～～,抱歉当前无记录信息哦!" v-else></c_errMsg>
  </c_scroll>
  <div>
    <div v-transfer-dom>
      <confirm v-model="confirmdiv"
               title="提示信息"
               confirm-text="确认"
               cancel-text="取消"
               @on-cancel="onCancel"
               @on-confirm="onConfirm">
        <p style="text-align:center;margin-top: 20px">是否确认作废？</p>
      </confirm>
    </div>
    <br>
  </div>
</div>
</template>

<script>
  import {
    Confirm,
    TransferDomDirective as TransferDom
  } from 'vux'
  import progressarticle from '@/components/service/progressarticle'
  import {IPROGRESS, PROGRESSDEL, PROGRESSCOPY, DE_SIGN_AIR, DE_PAY_AIR} from "@/api"
  export default {
    data: () => {
      return {
        confirmdiv: false,
        show: true,
        items: [],
        pageSize: 10,
        idc: 0,
        pageNum: 0,
        delpaln: '',
        delapply: ''
        // Interface: IPROGRESS
      }
    },
    name: 'progress',
    created: function () {
      if (this.$route.params.name) {
        this.doSearch()
      }
    },
    activated: function () {
      if (!this.$route.params.name) {
        this.getData(false)
      }
    },
    directives: {
      TransferDom
    },
    components: {
      progressarticle,
      Confirm
    },
    props: ["Interface", "idcode"],
    methods: {
      // getprogressDeatil (pid, aid) {
      //   this.$store.dispatch('setplanid', pid)
      //   this.$store.dispatch('setapplyId', aid)
      //   // /web/progressdetail
      //   console.log(pid)
      //   console.log(aid)
      //   this.$router.push({path: '/web/progressdetail', query: {applyId: aid, planId: pid}})
      // },
      doSearch () {
        if (this.$route.params) {
          var param = {applicantName: this.$route.query.name, genderCode: this.$route.query.genderCode, birthday: this.$route.query.startTime, certNo: this.$route.query.idnumber, tabId: this.idcode, pageNum: this.pageNum, pageSize: this.pageSize}
          // alert(JSON.stringify(param))
          // @debug
          this.axios.post(this.Interface, param).then((res) => {
            if (res.data.success) {
              this.items = res.data.value
              this.show = this.items.length !== 0
            } else {
              this.$vux.toast.show({
                text: res.data.errorMsg,
                type: 'text',
                width: '50%',
                isShowMask: true
              })
            }
          }).catch((err) => {
            console.log(err)
            throw new Error(err)
          })

          // @debug
          // this.items = JSON.parse('[ { "planId": "1081011033211454", "applyId": "1139", "imgPath": "/product/HQL00100/HQL00100.png", "title": "横琴优健人生终身重大疾病保险", "applicantName": "胡合松的", "totalPremium": "214000.00", "step": 1, "tag": "客户信息", "updateTime": "2017-08-16 17:34", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1071015155014327", "applyId": "1149", "imgPath": "/product/HQL00100/HQL00100.png", "title": "横琴优健人生终身重大疾病保险", "applicantName": "曹永胜", "totalPremium": "428.00", "step": 15, "tag": "代理人告知", "updateTime": "2017-08-11 00:07", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1070618425412005", "applyId": "923", "imgPath": "/product/HQL00100/HQL00100.png", "title": "横琴优健人生终身重大疾病保险", "applicantName": "齐胜", "totalPremium": "295.00", "step": 16, "tag": "预览投保书", "updateTime": "2017-08-10 20:42", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1080816422016487", "applyId": "1116", "imgPath": "/product/HQL00100/HQL00100.png", "title": "横琴优健人生终身重大疾病保险", "applicantName": "胡合松的", "totalPremium": "428.00", "step": 16, "tag": "承保失败", "updateTime": "2017-08-08 16:45", "btnCopy": true, "btnEdit": false, "btnDelete": false, "btnLook": true, "btnPay": false }, { "planId": "1080211165315908", "applyId": "1081", "imgPath": "/product/HQL00100/HQL00100.png", "title": "横琴优健人生终身重大疾病保险", "applicantName": "胡合松他的把", "totalPremium": "428.00", "step": 11, "tag": "受益人", "updateTime": "2017-08-02 11:19", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1072718205614680", "applyId": "1040", "imgPath": "/product/HQL00100/HQL00100.png", "title": "横琴优健人生终身重大疾病保险", "applicantName": "胡合松他", "totalPremium": "428.00", "step": 16, "tag": "预览投保书", "updateTime": "2017-08-02 10:20", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1072715464619600", "applyId": "1035", "imgPath": "/product/HQL00100/HQL00100.png", "title": "横琴优健人生终身重大疾病保险", "applicantName": "齐胜", "totalPremium": "2950.00", "step": 16, "tag": "人工核保", "updateTime": "2017-07-27 15:50", "btnCopy": true, "btnEdit": false, "btnDelete": false, "btnLook": true, "btnPay": false }, { "planId": "1072715385818239", "applyId": "1034", "imgPath": "/product/HQL00100/HQL00100.png", "title": "横琴优健人生终身重大疾病保险", "applicantName": "齐胜", "totalPremium": "295.00", "step": 16, "tag": "人工核保", "updateTime": "2017-07-27 15:43", "btnCopy": true, "btnEdit": false, "btnDelete": false, "btnLook": true, "btnPay": false }, { "planId": "1071716373412020", "applyId": "999", "imgPath": "/product/HQL00100/HQL00100.png", "title": "横琴优健人生终身重大疾病保险", "applicantName": "胡合松他的把", "totalPremium": "428.00", "step": 12, "tag": "投保信息", "updateTime": "2017-07-17 16:42", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1071517245212060", "applyId": "996", "imgPath": "/product/HQL00100/HQL00100.png", "title": "横琴优健人生终身重大疾病保险", "applicantName": "胡合松他么把", "totalPremium": "428.00", "step": 16, "tag": "已承保", "updateTime": "2017-07-15 17:26", "btnCopy": true, "btnEdit": false, "btnDelete": false, "btnLook": true, "btnPay": false } ]')
          // this.show = this.items.length !== 0
        }
      },
      Pay (pid, aid) {
        this.$store.dispatch('setplanid', pid)
        this.$store.dispatch('setapplyId', aid)
        this.$router.push({path: '/web/repay', query: {applyId: aid, planId: pid}})
      },
      View (pid, aid) {
        this.$store.dispatch('setplanid', pid)
        this.$store.dispatch('setapplyId', aid)
        this.$router.push({path: '/web/progressdetail', query: {applyId: aid, planId: pid}})
      },
      Edit (s, pid, aid) {
        this.$store.dispatch('setapplyId', aid)
        this.$store.dispatch('setplanid', pid)
        switch (s) {
        case 1:
          this.$router.push({path: "/web/recordCustomerInfor", query: {applyId: aid, planId: pid}})
          break
        case 2:
          this.$router.push({path: "/web/addmajor", query: {applyId: aid, planId: pid}})
          break
        case 3:
          this.$router.push({path: "/web/makePlan", query: {applyId: aid, planId: pid}})
          break
        case 4:
          this.$router.push({path: "/web/previewsug", query: {applyId: aid, planId: pid}})
          break
        case 10:
          this.$router.push({path: "/web/supplementInsure", query: {applyId: aid, planId: pid}})
          break
        case 11:
          this.$router.push({path: "/web/beneficiary", query: {applyId: aid, planId: pid}})
          break
        case 12:
          this.$router.push({path: "/web/supplementInfo", query: {applyId: aid, planId: pid}})
          break
        case 13:
          this.$router.push({path: "/web/notify", query: {applyId: aid, planId: pid}})
          break
        case 14:
          this.$router.push({path: "/web/notify", query: {applyId: aid, planId: pid}})
          break
        case 15:
          this.$router.push({path: "/web/announcement", query: {applyId: aid, planId: pid}})
          break
        case 16:
          this.$router.push({path: "/web/insuranceprev", query: {applyId: aid, planId: pid}})
          break
        }
      },
      getData (append = true) {
        this.pageNum = append ? Number(this.pageNum) + 1 : 1
        var param = {applicantName: this.$route.query.name, genderCode: this.$route.query.genderCode, birthday: this.$route.query.startTime, certNo: this.$route.query.idnumber, tabId: this.idcode, pageNum: this.pageNum, pageSize: this.pageSize}
        // @debug
        this.axios.post(this.Interface, param).then((response) => {
          if (response.data.success) {
            this.items = append ? this.items.concat(response.data.value) : response.data.value
            this.show = this.items.length !== 0
          } else {
            this.$vux.toast.show({
              text: response.data.errorMsg,
              type: 'text',
              width: '50%',
              isShowMask: true
            })
          }
        }, (response) => {
        }).catch((err) => {
          console.log(err)
          throw new Error(err)
        })

        // @debug
        // this.items = JSON.parse('[ { "planId": "1081519101611942", "applyId": "55", "imgPath": "/product/HQL00102/HQL00102.png", "title": "横琴尊享人生医疗保险", "applicantName": "张建强", "totalPremium": "448.00", "step": 2, "tag": "产品信息", "updateTime": "2017-08-16 17:26", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1081514161011660", "applyId": null, "imgPath": "/product/HQL00100/HQL00100.png", "title": "横琴优健人生终身重大疾病保险", "applicantName": "艾宏伟", "totalPremium": "0.00", "step": 2, "tag": "产品信息", "updateTime": "2017-08-16 15:54", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1081418551415453", "applyId": null, "imgPath": "/product/HQL00102/HQL00102.png", "title": "横琴尊享人生医疗保险", "applicantName": "张建强", "totalPremium": "448.00", "step": 2, "tag": "产品信息", "updateTime": "2017-08-15 15:13", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1081514153312533", "applyId": null, "imgPath": "/product/HQL00103/HQL00103.png", "title": "横琴百万乐途两全保险", "applicantName": "艾宏伟", "totalPremium": "0.00", "step": 2, "tag": "产品信息", "updateTime": "2017-08-15 14:15", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1081511574716853", "applyId": null, "imgPath": "/product/HQL00100/HQL00100.png", "title": "横琴优健人生终身重大疾病保险", "applicantName": "艾宏伟", "totalPremium": "0.26", "step": 2, "tag": "产品信息", "updateTime": "2017-08-15 13:39", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1081511570510827", "applyId": null, "imgPath": "/product/HQL00100/HQL00100.png", "title": "横琴百万乐途两全保险", "applicantName": "艾宏伟", "totalPremium": "0.00", "step": 2, "tag": "产品信息", "updateTime": "2017-08-15 11:57", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1081511530414394", "applyId": null, "imgPath": "/product/HQL00103/HQL00103.png", "title": "横琴百万乐途两全保险", "applicantName": "艾宏伟", "totalPremium": "0.00", "step": 2, "tag": "产品信息", "updateTime": "2017-08-15 11:53", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1080918482617321", "applyId": "5", "imgPath": "/product/HQL00102/HQL00102.png", "title": "横琴尊享人生医疗保险", "applicantName": "艾宏伟", "totalPremium": "554.00", "step": 2, "tag": "产品信息", "updateTime": "2017-08-14 19:34", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1080814021712889", "applyId": "2", "imgPath": "/product/HQL00100/HQL00100.png", "title": "横琴优健人生终身重大疾病保险", "applicantName": "艾宏伟", "totalPremium": "1284.00", "step": 12, "tag": "投保信息", "updateTime": "2017-08-14 15:48", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false }, { "planId": "1081117023418232", "applyId": null, "imgPath": null, "title": null, "applicantName": "高规格", "totalPremium": null, "step": 1, "tag": "客户信息", "updateTime": "2017-08-11 17:02", "btnCopy": true, "btnEdit": true, "btnDelete": true, "btnLook": false, "btnPay": false } ]')
        // this.show = this.items.length !== 0
      },
      ScrollCallback (e) {
        if ((e.scrollHeight - e.scrollZoneHeight - e.scrollTop) < 2) {
          e.scrollElement.scrollTop = e.scrollHeight - e.scrollZoneHeight - 3
          this.getData()
        }
      },
      DeSign (it) {
        this.confirm(() => this.DeSignConfirm(it))
      },
      //  收回空中签名
      DeSignConfirm ({planId, applyId}) {
        this.axios.post(DE_SIGN_AIR, {planId, applyId}).then(({data: {success, errorMsg}}) => {
          if (success) {
            let related = this.items.find(it => it.applyId == applyId)
            related && this.$set(related, 'btnBackAirSign', false)
            this.getData(false)
          } else {
            this.toast(errorMsg)
          }
        })
      },
      DePay (it) {
        this.confirm(() => this.DePayConfirm(it))
      },
      //  收回空中支付
      DePayConfirm ({planId, applyId}) {
        this.axios.post(DE_PAY_AIR, {planId, applyId}).then(({data: {success, errorMsg}}) => {
          if (success) {
            let related = this.items.find(it => it.applyId == applyId)
            related && this.$set(related, 'btnBackAirPay', false)
            this.getData(false)
          } else {
            this.toast(errorMsg)
          }
        })
      },
      confirm (callback) {
        this.$vux.confirm.show({
          title: '提示',
          confirmText: '确认',
          cancelText: '取消',
          content: '客户有可能正在操作中，请确认后再收回',
          onConfirm: callback
        })
      },
      toast (text) {
        this.$vux.toast.show({
          text: text,
          type: 'text',
          width: '50%',
          isShowMask: true
        })
      },
      Copy (plan, apply) {
        this.axios.post(PROGRESSCOPY, {planId: plan, applyId: apply}).then((response) => {
          if (response.data.success) {
            // 如果成功从新调用
            this.$vux.toast.show({
              text: `复制成功`,
              type: 'text',
              width: '50%',
              isShowMask: true
            })
            this.getData(false)
          } else {
            this.$vux.toast.show({
              text: response.data.errorMsg,
              type: 'text',
              width: '50%',
              isShowMask: true
            })
          }
        }).catch((err) => {
          console.log(err)
          throw new Error(err)
        })
      },
      onCancel () {
      },
      onConfirm () {
        this.axios.post(PROGRESSDEL, {planId: this.delpaln, applyId: this.delapply}).then((response) => {
          if (response.data.success) {
            this.getData(false)
          } else {
            this.$vux.toast.show({
              text: response.data.errorMsg,
              type: 'text',
              width: '50%',
              isShowMask: true
            })
          }
        }).catch((err) => {
          console.log(err)
          throw new Error(err)
        })
      },
      Dele (plan, apply) {
        this.confirmdiv = true
        this.delpaln = plan
        this.delapply = apply
      },
      Click (n) {
        this.$router.push({path: '/web/progressdetail', query: this.$router.query})
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  @import '~@/assets/scss/function';
  .page-progressbox{
    flex:1;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
    .scrollList li{
      margin: 0;
      padding:0;
      display: block;
    }
    .scrollList {
      & > li:last-child {
        margin-bottom: rem-calc(60);
      }
    }
    .msg {
      position: absolute;
      top: 10%;
    }
  }

</style>
