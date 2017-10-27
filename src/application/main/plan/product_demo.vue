
<!--********************************************************************
 * Author        : xiangzhi
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-10-24 14:49
 * Filename      : suggestion.vue
 * Description   : 计划书-产品演示

********************************************************************-->

<template>
<div class='suggestion-content' id="suggcontent" ref="suggcontent">
  <div class="suggposfix" id="suggposfix">
    <!-- <div @click="getBenefitText">12312312312313333333</div> -->
    <div class='suggest-header'>
      <img :src='banner' class="suggestbanner">
      <!-- <span class='header-title'>横琴护身符</span>
      <span class='header-desc'>健康保障计划</span> -->
    </div>
    <div class='suggest-guide' ref="guide" id="suggguide">
      <tab :animate="false" :line-width="2" v-model="tabIndex">
        <tab-item @on-item-click='onHashChange' selected>投保方案</tab-item>
        <tab-item @on-item-click='onHashChange'>保险利益</tab-item>
        <tab-item @on-item-click='onHashChange'>利益金额</tab-item>
      </tab>
    </div>
    <div id='userInfo' class='suggest-user-info info-block'>
      <div class='info-header'>
        <p style="color: #666">敬呈&nbsp;<span style="color: #00aeff">{{insurantName}}</span>&nbsp;{{insuregenderCode == 'M'? '男士' : '女士'}}的专属投保方案</p>
      </div>
      <div class='applicant-info info-line'>
        <p>投保人</p>
        <div v-for="(item, index) in applicantitems" :key="index">
          <p class='info-item'>
            <span>{{item.name}} {{item.genderCode == 'M'? '男士' : '女士'}}</span>
            <span>{{item.genderCode == 'M'? '男' : '女'}}</span>
            <span>{{item.age}}岁</span>
          </p>
        </div>
      </div>
      <div class='recognizee-info info-line'>
        <p>被保险人</p>
        <div v-for="(item, index) in insureitems" :key="index">
          <p class='info-item'>
            <span>{{item.name}} {{item.genderCode == 'F'? '女士' : '男士'}}</span>
            <span>{{item.genderCode == 'F'? '女' : '男'}}</span>
            <span>{{item.age}}岁</span>
          </p>
        </div>
      </div>
      <div class='product-info info-line'>
        <p>产品信息</p>
        <CTable :head='productInfoHeader' :data='productInfo'></CTable>
        <p class='charge-total'>首年保费总计：<span class='figure'>{{totalPremium}}元</span></p>
      </div>
    </div>



    <div id='userOwn' class='suggest-user-own info-block'>
      <div class='info-header'>
        <p>您所拥有的保险利益</p>
      </div>
      <div class='own-title'>
        在合同有效期，您拥有如下保险利益:
      </div>
      <div class='own-explain'>
        ［说明］以下给付原因及标准仅供了解产品使用，实际以保险条款描述为准。该保险计划将以您最终选择时的险种组合为准。
      </div>

      <!-- <div class='own-life'>
        <p class='life-title'>生存保险利益<span>－生存保险金</span></p>
        <CTable :head='benifitHeader' :data='pageData.lifeInfo.partData'></CTable>
      </div> -->





      <div v-for="(item, index) in benefitItems" :key = "index" >
        <div v-for="(ite, inde) in item" :key = "inde">
          <div class='own-life'>
            <p class='life-title'>{{ite.title}}<span v-if="false">－满期生存保险金</span></p>
            <table class="suggtable">
              <thead>
                <tr>
                   <td v-for="(it, ind) in ite.content[0].head" :key="ind" v-html="it.text.wordbreak()">
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(itb, indb) in ite.content[0].body" :key="indb">
                  <td v-for="(itz, idx) in itb" :key="idx" v-html="itz.wordbreak()"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class='own-comments'>
            <span v-for="(iz, idx) in ite.content" v-html="iz.type == 'text' ? iz.text + '<br/>' : ''">
            </span>
          </div>
        </div>
      </div>
      <div class='own-contract'>
        <!-- <p>·鑫利<span @click='window.location.href=termLink1'>《产品条款》</span></p>
        <p>·鑫利重疾<span @click='window.location.href=termLink2'>《产品条款》</span></p>
        <p>·豁免重疾c12<span @click='window.location.href=termLink3'>《产品条款》</span></p> -->
        <ul>
          <li v-for="(item, index) in pdfItem" :key="index">
            <p><a @click='viewPdf(item.path)' style="color: #00aeff;text-decoration: none;">{{item.name}}</a></p>
          </li>
        </ul>
      </div>
    </div>




    <div id='userCalc' class='suggest-user-calc info-block'>
      <div class='info-header'>
        <p>查看保险利益金额</p>
      </div>
      <div class='calc-detail'>
        <div class='detail-line'>
          <div class='detail-left'>被保险人<span>{{ age }}</span>岁</div>
          <!-- 时&nbsp;&nbsp;累计保费
          <div class='detail-right blue'>{{ totalAll }}</div> -->
        </div>

        <div v-for = "(item, index) in articleItem" :key = "index" v-show="index == curStage ">
          <div v-for = "(ele, idx) in item.HEADER[0]" v-show="idx > 1 && idx != (item.HEADER[0].length - 1)">
              <div class='detail-line'>
                <div class='detail-left'>{{ele}}</div>
                <div class='detail-right'>{{ datatable[idx] }}</div>
              </div>
          </div>
        </div>

        <!-- <div class='detail-line'>
          <div class='detail-left'>意外身故金</div>
          <div class='detail-right'>{{ curCalc && curCalc.acciDie }}</div>
        </div>
        <div class='detail-line'>
          <div class='detail-left'>当年生存金</div>
          <div class='detail-right'>{{ curCalc && curCalc.curLife }}</div>
        </div>
        <div class='detail-line'>
          <div class='detail-left'>疾病身故金</div>
          <div class='detail-right'>{{ curCalc && curCalc.diseDie }}</div>
        </div>
        <div class='detail-line'>
          <div class='detail-left'>现金价值（退保金）</div>
          <div class='detail-right'>{{ curCalc && curCalc.cash }}</div>
        </div>
        <div class='detail-line'>
          <div class='detail-left'>意外身故总利益（{{ curStage == 0 ? '低' : (curStage == 1 ? '中' : '高') }}档分红）</div>
          <div class='detail-right'>{{ curCalc && curCalc.acciShare[curStage] }}</div>
        </div>
        <div class='detail-line'>
          <div class='detail-left'>疾病身故总利益（{{ curStage == 0 ? '低' : (curStage == 1 ? '中' : '高') }}档分红）</div>
          <div class='detail-right'>{{ curCalc && curCalc.diseShare[curStage] }}</div>
        </div>
        <div class='detail-line'>
          <div class='detail-left'>生存总利益（{{ curStage == 0 ? '低' : (curStage == 1 ? '中' : '高') }}档分红）</div>
          <div class='detail-right'>{{ curCalc && curCalc.liveShare[curStage] }}</div>
        </div>
        <div class='detail-line'>
          <div class='detail-left'>累计生存金</div>
          <div class='detail-right'>{{ curCalc && curCalc.liveTotal }}</div>
        </div>
        <div class='detail-line end'>
          <div class='detail-left'>重疾保险金</div>
          <div class='detail-right'>{{ curCalc && curCalc.acciInsure }}</div>
        </div> -->
        <div class='calc-dividend' v-if="false">
          <div class='detail-line'>
            <div class='detail-left'>累积红利</div>
            <div class='detail-right'>{{ curCalc && curCalc.totalShare }}</div>
          </div>
          <div class='detail-line'>
            <div class='detail-left'>当年红利</div>
            <div class='detail-right'>{{ curCalc && curCalc.yearShare }}</div>
          </div>
          <CButtonGroup class='calc-btn-group' :btlist='pageData.chargeInfo.btGroupList' @Check='OnCheck'></CButtonGroup>
          <p class='check-tip'>“低／中／高”代表分红水平</p>
        </div>

        <div class='calc-tool'>
          <div class='calc-operate'>
            <i class='operate-before' @click='ageMinus'></i>
            <i class='operate-after' @click='agePlus'></i>
            <p>第{{years}}保单年度：被保险人<span>{{ age }}</span>岁</p>
          </div>
          <div class='calc-slide'>
            <CRange @onChange='onChange' :cur='curage' :min='beginage' :max='endage' unit='岁' :follow='true'></CRange>
            <!-- <range v-model="data4" :min="beginage" :max="endage"></range> -->
            <p>在{{ each == '0.00元' ? '交费期外' : '交费期内'}}，您的每日投入为<span>{{ each }}</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class='declaration'>
      <p class='dec-confirm' @click='onConfirmCheck'>我已阅读并知晓该险种的相关利益。</p>
      <input
        class="hiddenInput"
        type="hidden"
        name="clauseValue"
        v-model.trim="clauseValue"
        v-validate
        data-vv-as="请阅读该险种的相关利益"
        data-vv-rules="required">
      <p class="endRemark" style="color:#949494">{{endRemark}}</p>
    </div>
  </div>
    <!-- <ul class='suggest-footer' v-if="isWeixin"> -->
    <ul class='suggest-footer'>
    <li>
      <button class='suggest-btn default' @click='shareBtn'>分享</button>
    </li>
    <li>
      <!-- <button class='suggest-btn default' @click='getshowBenefit'>制作投保单</button> -->
      <!-- <router-link to="/applicantInfo"><button class='suggest-btn default' @click='getshowBenefit'>制作投保单</button></router-link> -->
      <button class='suggest-btn default' @click='makeOrder'>制作投保书</button>
    </li>
    </ul>
</div>
</template>

<script>
import {
  Tab,
  Range,
  TabItem
} from 'vux'
import CTable from '@/components/service/table'
import CButtonGroup from '@/components/base/btngroup'
import CRange from '@/components/service/range'

export default {
  data: () => {
    return {
      linkmanImg: '',
      linkman: '易烊千玺',
      checked: false,
      years: '',
      // add start
      isWeixin: !window.is_weixn(),
      endRemark: '',
      data4: 0,
      banner: '', // '/product/HQL00100/HQL00100.png',
      datatable: [],
      curStage: 0, // 0低 1中 2高
      articleItem: [],
      articleContent: [],
      pdfItem: [],
      beginage: 0,
      endage: 0,
      curage: 0,
      insurantName: null,
      applicantitems: [],
      insureitems: [],
      insuregenderCode: 'F',
      productInfoHeader: [
        {
          name: '产品简称',
          figure: false
        },
        {
          name: '保额/份数',
          figure: true
        },
        {
          name: '缴费期/保险期',
          figure: false
        },
        {
          name: '首年保费',
          figure: true
        }
      ],
      productInfo: [],
      totalPremium: [],
      proposal: null,
      planId: null,
      productId: null,
      applyId: null,
      benefitItems: [],
      // add end
      tabIndex: 0,
      age: 10,
      ageMin: 10,
      ageMax: 100,
      each: 5,
      benifitHeader: [
        {
          name: '给付原因及标准',
          figure: false
        },
        {
          name: '给付金额',
          figure: false
        }
      ],
      pageData: {
        suggestion: {
          userName: '吴柴',
          applicantInfo: [
            {
              name: '林心如',
              sex: '女',
              age: '40'
            }
          ],
          recognizeeInfo: [
            {
              name: '赵薇',
              sex: '女',
              age: '42'
            }
          ],
          productInfo: [
            ['鑫利', '1万', '20年 / 至80岁', '￥1227'],
            ['鑫利', '1万', '20年 / 至80岁', '￥1227']
          ]
        },
        lifeInfo: {
          partData: [
            ['等期待(90日)后,被保险人初次发生并被医院的专科医生确诊', '50万元／两年']
          ],
          fullData: [
            ['被保险人每满2周年仍生存，按照鑫利基本保险金额的7%给付。', '2万元／两年']
          ],
          termLink1: '',
          termLink2: '',
          termLink3: ''
        },
        chargeInfo: {
          ageList: [
            {
              age: 27,
              acciDie: '20000元',
              curLife: '0元',
              diseDie: '20000元',
              cash: '470元',
              acciShare: ['2014元', '2000元', '2500元'],
              diseShare: ['2014元', '2001元', '2501元'],
              liveShare: ['484元', '2002元', '2502元'],
              liveTotal: '0元',
              acciInsure: '20000元',
              totalShare: '4元',
              yearShare: '4元'
            },
            {
              age: 28,
              acciDie: '2000元',
              curLife: '0元',
              diseDie: '20000元',
              cash: '470元',
              acciShare: ['15000元', '20000元', '25000元'],
              diseShare: ['15001元', '20001元', '25001元'],
              liveShare: ['15002元', '20002元', '25002元'],
              liveTotal: '0元',
              acciInsure: '22233元',
              totalShare: '4元',
              yearShare: '4元'
            },
            {
              age: 29,
              acciDie: '20000元',
              curLife: '0元',
              diseDie: '200000元',
              cash: '4700元',
              acciShare: ['150000元', '200000元', '250000元'],
              diseShare: ['150001元', '200001元', '250001元'],
              liveShare: ['150020元', '200002元', '250002元'],
              liveTotal: '0元',
              acciInsure: '222303元',
              totalShare: '40元',
              yearShare: '40元'
            }
          ],
          btGroupList: [
            {
              id: '0',
              val: '低'
            },
            {
              id: '1',
              val: '中'
            },
            {
              id: '2',
              val: '高'
            }
          ]
        }
      }
    }
  },
  // watch: {
  //   curStage: function () {
  //     this.getLevel()
  //   },
  //   age: function () {
  //     this.curage = this.age
  //     this.getLevel()
  //   }
  // },
  // computed: {
  //   clauseValue () {
  //     return this.checked ? 1 : null
  //   },
  //   curage: function () {
  //     console.log('---' + this.age + '---')
  //     return this.age
  //   },
  //   setCurAge: function (v) {
  //     console.log(v)
  //   },
  //   curCalc: function () {
  //     console.log('curCalc')
  //     return this.getAgeData(this.age)
  //   },
  //   totalAll: function () {
  //     let _charge = this.curCalc
  //     if (!_charge) return 0
  //     let total = 0
  //     total += parseFloat(_charge.acciDie.replace('元', ''))
  //     total += parseFloat(_charge.curLife.replace('元', ''))
  //     total += parseFloat(_charge.diseDie.replace('元', ''))
  //     total += parseFloat(_charge.cash.replace('元', ''))
  //     total += parseFloat(_charge.acciShare[this.curStage].replace('元', ''))
  //     total += parseFloat(_charge.diseShare[this.curStage].replace('元', ''))
  //     total += parseFloat(_charge.liveShare[this.curStage].replace('元', ''))
  //     total += parseFloat(_charge.liveTotal.replace('元', ''))
  //     total += parseFloat(_charge.acciInsure.replace('元', ''))
  //     total += parseFloat(_charge.totalShare.replace('元', ''))
  //     total += parseFloat(_charge.yearShare.replace('元', ''))
  //     return total + '元'
  //   }
  // },
  // mounted () {
  //   let suggguide = document.getElementById('suggguide')
  //   let suggposfix = document.getElementById('suggposfix')
  //   if (window.getComputedStyle(suggguide).position === 'static') {
  //     let suggtop = suggguide.offsetTop
  //     suggposfix.addEventListener('scroll', function (e) {
  //       requestAnimationFrame(() => {
  //         if (suggposfix.scrollTop > suggtop) {
  //           suggguide.style.position = 'fixed'
  //           suggguide.style.top = 0
  //         } else {
  //           suggguide.style.position = 'initial'
  //         }
  //       })
  //     })
  //   }
  // },
  // props: [],
  // created: function () {
  //   this.proposal = this.$store.state.sale.proposal
  //   this.planId = this.$store.state.sale.planId || this.$route.query.planId || ""
  //   this.productId = this.$store.state.sale.productId
  //   // this.getstep(this.planId)
  // },
  // activated: function () {
  //   // this.getData()
  //   this.getInfoProgressData()
  //   // if (!this.productId) {
  //   // } else {
  //   //   this.getInfoData()
  //   //   this.getshowBenefit()
  //   //   this.getBenefitText()
  //   // }
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
  //       console.log(err)
  //       throw new Error(err)
  //     })
  //   },
  //   getstep (pid) {
  //     this.axios.post(MKAESTEP, {planId: pid}).then(response => {
  //       if (response.data.success) {
  //         this.$router.push({path: '/web/supplementInsure'})
  //       }
  //     }, fail => {
  //     }).catch((err) => {
  //       console.log(err)
  //       throw new Error(err)
  //     })
  //   },
  //   makeOrder () {
  //     this.$validator.validateAll().then(() => {
  //       this.getstep(this.planId)
  //     }).catch((e) => {
  //       this.$vux.toast.show({
  //         type: "text",
  //         width: "200px",
  //         text: this.$validator.getErrors().errors[0].msg
  //       })
  //       throw new Error(e)
  //     })
  //   },
  //   viewPdf (n) {
  //     window.articleDetail(n)
  //   },
  //   OnCheck (val) {
  //     this.curStage = val
  //   },
  //   agePlus () {
  //     this.age = (this.age + 1) <= this.endage ? this.age + 1 : this.endage
  //   },
  //   ageMinus () {
  //     this.age = (this.age - 1) >= this.beginage ? this.age - 1 : this.beginage
  //   },
  //   onChange (age) {
  //     this.age = age
  //   },
  //   onConfirmCheck (e) {
  //     const ele = e.target
  //     this.checked = !this.checked
  //     this.toggleClass(ele, 'checked')
  //   },
  //   toggleClass (ele, name) {
  //     let cName = ele.className
  //     const reg = new RegExp('(^' + name + '$|\\s' + name + '\\s|\\s' + name + '$|^' + name + '\\s)', 'g')
  //     if (cName.match(reg)) {
  //       cName = cName.replace(reg, '')
  //     } else {
  //       cName += cName ? ' ' + name : name
  //     }

  //     ele.className = cName
  //   },
  //   onHashChange () {
  //     let id = ''
  //     switch (this.tabIndex) {
  //     case 0:
  //       id = '#userInfo'
  //       break
  //     case 1:
  //       id = '#userOwn'
  //       break
  //     case 2:
  //       id = '#userCalc'
  //       break
  //     default:
  //       break
  //     }
  //     let _offset = this.$el.querySelector(id).offsetTop - 50
  //     this.$el.querySelector('#suggposfix').scrollTop = _offset
  //   },
  //   getAgeData (curAge) {
  //     for (let item of this.pageData.chargeInfo.ageList) {
  //       if (curAge === item.age) {
  //         return item
  //       }
  //     }
  //     return null
  //   },
  //   getData (append = false) {
  //     this.axios.get(SUGGESTIONPREV).then((response) => {
  //       this.pageData = response.data
  //     }, (response) => {
  //     }).catch((err) => {
  //       console.log(err)
  //       throw new Error(err)
  //     })
  //   },
  //   getInfoData () {
  //     this.axios.post(IVIEWPLAN, {planId: this.planId}).then(
  //       response => {
  //         if (response.data.success) {
  //           this.insurantName = response.data.value.content.insurant.name
  //           this.insuregenderCode = response.data.value.content.insurant.genderCode
  //           this.applicantitems = [response.data.value.content.applicant]
  //           this.insureitems = [response.data.value.content.insurant]
  //           let _self = this
  //           let pdf = []
  //           this.productInfo = response.data.value.content.productList.map(function (v, i, arr) {
  //             v.clause.map(function (view, i, arr) {
  //               pdf.push({name: view.name, path: view.value})
  //             })
  //             if (!v.parent) {
  //               _self.banner = v.coverPath
  //               // _self.banner = "http://192.168.26.36:8081/product/HQL00100/HQL00100.png"
  //               _self.endRemark = v.endRemark
  //             }
  //             return [v.abbrName, v.amount_value, v.pay + '/' + v.insure, v.premium]
  //           })
  //           // console.log(this.productInfo)
  //           this.pdfItem = [...pdf]
  //           console.log(this.pdfItem)
  //           this.totalPremium = response.data.value.content.totalPremium
  //         } else {
  //           this.$vux.toast.show({
  //             text: response.data.errorMsg,
  //             type: 'text',
  //             width: '50%',
  //             isShowMask: true
  //           })
  //         }
  //       },
  //       response => {
  //       }
  //     ).catch((err) => {
  //       console.log(err)
  //       throw new Error(err)
  //     })
  //   },
  //   getInfoProgressData () {
  //     this.axios.post(IVIEWPLAN, {planId: this.planId}).then(
  //       response => {
  //         if (response.data.success) {
  //           this.productId = response.data.value.content.productList[0].productId
  //           this.$store.dispatch('setproduct', this.productId)
  //           this.getInfoData()
  //           this.getshowBenefit()
  //           this.getBenefitText()
  //         } else {
  //           this.$vux.toast.show({
  //             text: response.data.errorMsg,
  //             type: 'text',
  //             width: '50%',
  //             isShowMask: true
  //           })
  //         }
  //       },
  //       response => {
  //       }
  //     ).catch((err) => {
  //       console.log(err)
  //       throw new Error(err)
  //     })
  //   },
  //   getLevel () {
  //     let a = this.articleItem[this.curStage]['CONTENT'].find(function (v, i, arr) {
  //       return v[0] == this.self.age
  //     }, {self: this})
  //     if (a) {
  //       this.datatable = [...a]
  //       this.years = this.datatable[1]
  //       this.each = this.datatable[this.datatable.length - 1]
  //     } else {
  //       this.each = 0
  //       this.datatable = []
  //     }
  //   },
  //   getshowBenefit () { // this.productId
  //     this.axios.post(ISHOWBENEFIT, {planId: this.planId, productId: this.productId, type: 'table'}).then(
  //       response => {
  //         if (response.data.success) {
  //           this.beginage = response.data.value.AGE_BEGIN
  //           this.endage = response.data.value.AGE_END
  //           this.curage = response.data.value.AGE_BEGIN
  //           this.articleItem = response.data.value.content
  //           this.getLevel()
  //           // this.$router.push({path: '/beneficiaryInfo'})
  //         } else {
  //           this.$vux.toast.show({
  //             text: response.data.errorMsg,
  //             type: 'text',
  //             width: '50%',
  //             isShowMask: true
  //           })
  //         }
  //       },
  //       response => {
  //       }
  //     ).catch((err) => {
  //       console.log(err)
  //       throw new Error(err)
  //     })
  //   },
  //   getBenefitText () {
  //     this.axios.post(ISURETEXT, {planId: this.planId, productIds: [this.productId], type: 'liability'}).then(
  //       response => {
  //         if (response.data.success) {
  //           this.benefitItems = response.data.value.content
  //           let ele = response.data.value.content.map(function (e, i, arr) {
  //             let v = {}
  //             return v
  //           })
  //         } else {
  //           this.$vux.toast.show({
  //             text: response.data.errorMsg,
  //             type: 'text',
  //             width: '50%',
  //             isShowMask: true
  //           })
  //         }
  //       },
  //       response => {
  //       }
  //     ).catch((err) => {
  //       console.log(err)
  //       throw new Error(err)
  //     })
  //   }
  // },
  components: {
    Tab,
    TabItem,
    CTable,
    CButtonGroup,
    CRange,
    Range
  }
}
</script>

<style lang='scss' rel='stylesheet/scss'>
@import '~@/assets/scss/function';
.table_content_sty .info-table .info-head .info-td{
  border: none !important;
}
.suggestion-content .table_content_sty .info-table .info-head .info-td{
  background: #d9f3ff;
}
.suggestion-content .table_content_sty .info-table .info-line .info-td{
  background: #f8f8f8;
}
.suggestion-content .suggtable > thead td, .suggestion-content .suggtable td{
  border-right: rem-calc(0.5) solid #e0e3e5 !important;
}
.suggestion-content .suggtable > thead td:last-child, .suggestion-content .suggtable td:last-child{
  border: none !important;
}
.suggestion-content {

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;

    background-color: #f7f7f7;
    font-family: 'PingFangSC-Regular', 'Microsoft YaHei';
    color: #666;

    .suggposfix{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: rem-calc(65px);
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .suggestbanner{
      width: 100%;
      display: block;
      min-height: rem-calc(170px);
    }
    .endRemark{
      line-height: rem-calc(20px);
      font-size: rem-calc(13px);
      margin-top: rem-calc(10px);
    }
    .suggtable{
      margin: 0;
      padding: 0;
      width: rem-calc(344px);
      margin-left: auto;
      margin-right: auto;
      background: #c3c3c3 !important;
      td{
        font-weight: normal;
        padding:rem-calc(2px);
        line-height: rem-calc(20px);
        word-wrap:break-word;
        font-size: rem-calc(12px);
      }
      td:first-child{
        width:70%;
        /*border-right: 1px solid #ccc;*/
      }
      td:nth-child(2){
        text-align: left !important;
      }
      &>thead td{
        background: #d9f3ff;
        padding:rem-calc(10px);
        color:#fff;
        font-size:rem-calc(14px);
        text-align: center;
        color: #666;
      }
      &>tbody td{
        text-align: left;
        padding:rem-calc(10px);
        background:#f8f8f8;
        &:first-child{
          text-align: left;
        }
      }
      &>tbody>tr:last-child dd{
        background: #c3c3c3;
        &>div{
          text-align: left;
          padding:rem-calc(10px) 0;
          background:#f8f8f8;
          border-bottom: none;
        }
      }
    }
    .suggest-header {
        position: relative;
        img {
            width: 100%;
        }
        .header-title {
            position: absolute;
            top: rem-calc(30px);
            left: rem-calc(22px);
            font-size: rem-calc(27px);
            color: #00aeff;
            /*font-weight: bolder;*/
        }
        .header-desc {
            position: absolute;
            top: rem-calc(66px);
            left: rem-calc(43px);
            font-size: rem-calc(15px);
            /*font-weight: bold;*/
        }
    }
    .suggest-guide {
        position: static;
        position: -webkit-sticky;
        position: sticky;
        top:0;
        z-index: 999;
        width:100%;
        border-bottom: 1px solid #d0d0d0;
        margin-bottom: rem-calc(9px);
        @include trans3d;
        .vux-tab-selected {
            color: #00b1ff!important;
            border-bottom: 2px solid #00b1ff!important;
        }
        .vux-tab-ink-bar {
            background-color: #00b1ff!important;
            height: 1px!important;
        }
        .vux-tab-item {
            background: none!important;
        }
    }
    .info-block {
        width: rem-calc(360px);
        margin-left: auto;
        margin-right: auto;
        margin-bottom: rem-calc(19px);
        background-color: #fff;
        border-radius: rem-calc(5px);
        overflow: hidden;
        .info-header {
            width: 100%;
            height: rem-calc(47px);
            background-color: #d9f3ff;
            p {
                width: 100%;
                text-align: center;
                font-size: rem-calc(17px);
                font-weight: normal;
                line-height: rem-calc(47px);
                color: #00aeff;
                span {
                    color: #00aeff;
                }
            }
        }
    }
    .suggest-user-info {
        .info-line {
            font-size: rem-calc(15px);
            /*font-weight: bold;*/
            padding-top: rem-calc(16px);
            padding-bottom: rem-calc(16px);
            border-bottom: 1px solid #f0f0f0;
            .figure {
                color: #00aeff;
            }
            & > p:nth-child(1) {
                padding-left: rem-calc(36px);
                padding-top: rem-calc(2px);
                padding-bottom: rem-calc(16px);
            }
            & .info-item {
                display: table;
                width: 100%;
                span {
                    display: table-cell;
                    width: 33.33%;
                    border-right: 1px solid #f0f0f0;
                    text-align: center;
                }
                & span:nth-child(3) {
                    border-right: none;
                }
            }
        }
        .applicant-info {
            & > p:nth-child(1) {
                color: #fa9b25;
                background: url('~@/assets/image/icon_man.png') no-repeat;
                background-size: rem-calc(21px);
                background-position: rem-calc(8px) 0;
            }
        }
        .recognizee-info {
            & > p:nth-child(1) {
                color: #00cac0;
                background: url('~@/assets/image/icon_man1.png') no-repeat;
                background-size: rem-calc(21px);
                background-position: rem-calc(8px) 0;
            }
        }
        .product-info {
            border-bottom: none;
            & > p:nth-child(1) {
                color: #00aeff;
                background: url('~@/assets/image/icon_flower.png') no-repeat;
                background-size: rem-calc(21px);
                background-position: rem-calc(8px) 0;
            }
            .charge-total {
                text-align: right;
                padding-right: rem-calc(13px);
                margin-top: rem-calc(17px);
            }
        }
    }
    .suggest-user-own {
      /*font-weight:bold;*/
      padding-bottom:rem-calc(26px);
      .own-title {
        font-size:rem-calc(15px);
        margin-top:rem-calc(19px);
        padding-left:rem-calc(8px);
        font-weight:normal;
      }
      .own-explain {
        margin-top:rem-calc(20px);
        padding-left:rem-calc(8px);
        padding-right:rem-calc(8px);
        font-size:rem-calc(13px);
        line-height:rem-calc(25px);
        color:#999;
      }
      .own-life {
        margin-top:rem-calc(28px);
        .life-title {
          position:relative;
          margin-bottom:rem-calc(13px);
          font-size:rem-calc(15px);
          padding-left:rem-calc(21px);
          span {
            font-size:rem-calc(12px);
          }
          &:before {
            content: '';
            position:absolute;
            width:rem-calc(6px);
            height:rem-calc(6px);
            border-radius:50%;
            background-color:#00aeff;
            left:rem-calc(8px);
            top:0;
            bottom:0;
            margin:auto;
          }
        }
      }
      .own-comments {
        color:#999;
        padding-left:rem-calc(8px);
        padding-right:rem-calc(8px);
        font-size:rem-calc(11px);
        margin-top:rem-calc(13px);
        line-height: rem-calc(15px);
        padding-bottom:rem-calc(10px);
        border-bottom:1px solid #f0f0f0;
      }
      .own-contract {
        padding-left:rem-calc(8px);
        padding-right:rem-calc(8px);
        margin-top:rem-calc(19px);
        p{
          font-size:rem-calc(13px);
          color:#999;
          line-height: rem-calc(24px);
          span {
            color:#00aeff;
          }
        }
      }
    }
    .suggest-user-calc {
      /*font-weight:bold;*/
      padding-bottom:rem-calc(26px);
      .calc-detail {
        padding-left:rem-calc(8px);
        padding-right:rem-calc(8px);
        & .detail-line:first-child {
          font-size:rem-calc(15px);
        }
        & .detail-line.end {
          border-bottom:none;
        }
        .detail-line {
          padding-left:rem-calc(12px);
          padding-right:rem-calc(7px);
          height:rem-calc(44px);
          line-height:rem-calc(44px);
          border-bottom:1px solid #f0f0f0;
          .detail-left {
            float:left;
            span {
              color:#00aeff;
            }
          }
          .detail-right {
            float:right;
            color:#999;
          }
          .blue {
            color:#00aeff;
          }
        }
        .calc-dividend {
          padding-bottom:rem-calc(18px);
          background-color:#f8f8f8;
          & .detail-line:nth-child(2) {
            border-bottom:none;
          }
          .calc-btn-group {
            margin-top:rem-calc(6px);
            margin-bottom:rem-calc(14px);
          }
          .check-tip {
            font-size:rem-calc(13px);
            text-align:center;
            color:#949494;
          }
          .detail-left {
            color:#00aeff;
          }
        }
      }
      .calc-tool {
        /*font-weight:bold;*/
        margin-top:rem-calc(26px);
        .calc-operate {
          text-align:center;
          height:rem-calc(26px);
          position:relative;
          p{
            font-size:rem-calc(15px);
            line-height:rem-calc(26px);
            color:#333;
            font-weight: normal;
            span {
              color:#00aeff;
              font-weight: bold;
            }
          }
          i {
            position:absolute;
            width:rem-calc(26px);
            height:rem-calc(26px);
            background-color:#dedede;
            color:#fff;
            font-size:rem-calc(36px);
            line-height:rem-calc(26px);
            font-weight:normal;
            text-align:center;
            vertical-align:middle;
            font-style:normal;
          }
          .operate-before {
            left:0;
            top:0;
            background: url("~@/assets/image/subtract.png") no-repeat;
            background-size: cover;
          }
          .operate-after {
            right:0;
            top:0;
            background: url("~@/assets/image/plus.png") no-repeat;
            background-size: cover;
          }
        }
        .calc-slide {
          margin-top:rem-calc(32px);
          p {
            font-size: rem-calc(12px);
            color:#999;
            text-align:center;
            margin-top:rem-calc(16px);
            span {
              color:#00aeff;
            }
          }
        }
      }
    }
    .declaration {
      background-color:#fff;
      padding-top:rem-calc(21px);
      padding-bottom:rem-calc(30px);
      padding-left:rem-calc(17px);
      padding-right:rem-calc(17px);
      margin-top:rem-calc(10px);
      margin-bottom:rem-calc(20px);
      .dec-confirm {
        line-height:rem-calc(20px);
        height:rem-calc(20px);
        min-height: rem-calc(20px);
        font-size:rem-calc(15px);
        color:#00aeff;
        /*font-weight:bold;*/
        padding-left:rem-calc(32px);
        background:url(~@/assets/image/checke.png) no-repeat;
        background-size:rem-calc(20px) rem-calc(20px);
        /*<!--background-position:0 -33.5px;-->*/
      }
      .dec-confirm.checked {
        line-height:rem-calc(20px);
        height:rem-calc(20px);
        font-size:rem-calc(15px);
        color:#00aeff;
        /*font-weight:bold;*/
        padding-left:rem-calc(32px);
        background:url(~@/assets/image/checked.png) no-repeat;
        background-size:rem-calc(20px)
      }
      p:nth-child(2) {
        margin-top:rem-calc(25px);
        font-size:rem-calc(13px);
        color:#949494;
        /*font-size:bold;*/
        line-height:rem-calc(24px);
        span {
          float:right;
          color:#00aeff;
        }
      }
    }
    .suggest-footer {
      position: fixed;
      width: 100%;
      left:0;
      bottom:0;
      background: #f7f7f7;
      padding:rem-calc(10px) 0 rem-calc(10px) 0;
      display: table;
      width:100%;
      text-align:center;
      @include trans3d;
      &>li{
        display: table-cell;
      }
      button:first-child {
        /*margin-right:rem-calc(15px);*/
      }
      .suggest-btn {
        font-size:rem-calc(16px);
        width:rem-calc(165px);
        height:rem-calc(45px);
        /*margin-left: rem-calc(10px);*/
        color:#333;
        background-color:#d2d2d2;
        /*font-weight:bold;*/
        border:none;
        border-radius:rem-calc(3px);
      }
      .suggest-btn.default {
        color:#fff;
        background-color:#00b1ff;
      }
    }

    .table_content_sty {
        width: rem-calc(344px);
        margin-left: auto;
        margin-right: auto;
        /*font-weight: bold;*/
        .info-table {
            width: 100%;
            display: table;
            border-collapse: collapse;
            .info-head,
            .info-line {
                list-style: none;
                display: table-row;
                .info-td {
                    display: table-cell;
                    padding-top: rem-calc(8px);
                    padding-bottom: rem-calc(8px);
                    padding-left:rem-calc(8px);
                    padding-right:rem-calc(8px);
                    text-align: center;
                    vertical-align: middle;
                    /*background: #d9f3ff;*/
                    span {
                      font-size:rem-calc(13px);
                      text-align:center;
                      font-weight: normal;
                      color: #666666;
                    }
                }
            }
            .info-line {
              background-color:#f8f8f8;
              .info-td {
                color:#666;
                span {
                  line-height: rem-calc(18px);
                }
              }
              .info-td .figure {
                color:#00aeff;
              }
            }
            .info-head {
                background-color: #00a4ff;
                .info-td {
                    margin:0;
                    font-size: rem-calc(13px);
                    color: #fff;
                    /*border:1px solid #00a4ff;*/
                    span {
                        word-break: keep-all;
                        line-height: rem-calc(18px);
                        box-sizing: border-box;
                    }
                }
            }
        }
        .info-table.border {
          .info-head {
            .info-td {
              border:1px solid #f0f0f0;
            }
          }
          .info-line {
            border:1px solid #f0f0f0;
            .info-td {
              border:1px solid #f0f0f0;
            }
          }
        }
    }


    .range-container {
      height:rem-calc(32px);
      position:relative;
      padding-left:rem-calc(50px);
      padding-right:rem-calc(50px);
      .range-base {
        height:rem-calc(8px);
        background-color:#d9f3ff;
        position:relative;
        border-radius:rem-calc(4px);
        .range-left {
          position:absolute;
          left:0;
          top:0;
          height:100%;
          width:rem-calc(40px);
          background-color:#00aeff;
          border-top-left-radius:rem-calc(4px);
          border-bottom-left-radius:rem-calc(4px);
        }
        .range-slider {
          position:absolute;
          left:0;
          top:rem-calc(-6px);
          width:rem-calc(20px);
          height:rem-calc(20px);
          margin-left:(-10px);
          border-radius:rem-calc(10px);
          background-color:#f7f7f7;
          box-shadow: inset 0 0 0 rem-calc(6px) #00aeff;
          .range-cur {
            position:absolute;
            left:0;
            right:0;
            top:rem-calc(26px);
            margin:auto;
            width:rem-calc(30px);
            font-size:rem-calc(13px);
            /*font-weight:bold;*/
            word-break:keep-all;
            color:#00aeff;
          }
        }
      }
      .range-min {
        position:absolute;
        left:rem-calc(0px);
        top:rem-calc(0px);
        color:#999;
        font-size:rem-calc(13px);
      }
      .range-max {
        position:absolute;
        right:rem-calc(0px);
        top:rem-calc(0px);
        color:#999;
        font-size:rem-calc(13px);
      }
    }
  .phone{
    width: 100%;
    height: rem-calc(98/2);
    line-height: rem-calc(98/2);
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 rem-calc(22/2);
    box-sizing: border-box;
    .linkman{
      img{
        width: rem-calc(70/2);
        height: rem-calc(70/2);
        vertical-align: middle;
      }
    }
    .detailphone ,.name{
        display: inline-block;
        color: #fff;
        font-size: rem-calc(28/2);
        padding-left: rem-calc(10 )
      }
     .detailphone:before{
      content: "";
      display: inline-block;
      width: rem-calc(32/2);
      height: rem-calc(36/2);
      background: url(~@/assets/image/telephone.png) no-repeat;
      background-size: contain;
      vertical-align: middle;
      padding-right:rem-calc(15/2);
     }
  }
}
</style>
