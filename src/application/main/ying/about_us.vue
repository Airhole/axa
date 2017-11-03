<template>
  <div class="about-us">
    <div class="about-us-banner">企业简介banner</div>
    <div class="about-us-item">
      <h3>企業概覽</h3>
      <div class="survey-main">
        <p>多年來，AXA安盛為客戶提供涵蓋人壽、健康及財產的全面保障，與及財富管理和退休方案，幫助客戶實踐安穩及豐盛的生活。時至今日，AXA安盛為香港及澳門超過100萬名個人及企業客戶1提供優質的財富保障及管理服務。</p>
        <p>AXA安盛屬AXA安盛集團成員之一。秉持著集團的企業核心價值及承諾，我們一直積極拓展業務，讓AXA成為保險、投資及退休方面的世界翹楚。AXA安盛集團創立於19世紀初，於全球64個國家擁有1.07億名客戶，旗下員工達165,000人。AXA安盛集團的收益為1002億歐元 (約8,206.4億港元)，其管理資產為14,290億歐元 (約117,035.1億港元)。</p>
      </div>
    </div>
    <div class="about-us-item">
      <h3>AXA安盛</h3>
      <div class="company-main">
        <p>AXA 安盛為 AXA 安盛集團之成員，憑藉其超卓的產品及服務，現時於香港及澳門的客戶人數已超過 100 萬。AXA 安盛不單是香港其中一家最大的醫療保險供應商，其一般保險業務更在香港巿場擁有最大的佔有率，而其汽車保險亦是業界的翹楚。</p>
        <p>AXA 安盛致力為客戶提供涵蓋人壽、健康及財產的全面保障，與及財富管理和退休方案，幫助客戶實踐安定及豐盛的生活。</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ying',
    components: {},
    data () {
      return {
      }
    },
    methods: {
      initYing () {
        console.log(this)
      }
    },
    mounted () {
      this.initYing()
    }
  }
</script>

<style lang="scss" scoped>
  .about-us {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    position: relative;
    .about-us-item {
      background-color: #fff;
      margin-top: rem-calc(10);
      h3 {
        padding: rem-calc(15);
        border-bottom: .5px solid #e8e8e8;
      }
      p {
        padding: rem-calc(15) rem-calc(15) 0 rem-calc(15);
        font-size: rem-calc(12);
        line-height: rem-calc(18);
        color: #666;
        word-wrap: break-word;
        word-break: normal;
      }
      p:last-child {
        padding-bottom: rem-calc(15);
      }
    }
  }
</style>
