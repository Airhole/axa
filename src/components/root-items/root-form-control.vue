<!--
      descript: 输入框 行组件
        author: chen
        param: props
        example:
        <inp :isShowUnderLine="test" :contentPlaceholder="inpplaceholder" :isalert="inputalert" :baseBoxLeft="baseBoxLeftInp"></inp>


        baseBoxLeft: 控制左边内容
        isShowUnderLine: 控制底部边框
        isalert： 控制必填写的 红点
        contentPlaceholder：placeholder

-->
<template>
  <div class="inputBox">
    <basecontrol :baseBoxLeft="baseBoxLeft" :isShowUnderLine="isShowUnderLine" :isalert="isalert">
      <div slot="baseBoxrightContent" >
        <input type="text" v-model.trim="content" :placeholder="contentPlaceholder">
      </div>
    </basecontrol>
  </div>
</template>
<script>
  import basecontrol from '@/components/root-items/root-base'
  export default {
    data () {
      return {
        content: ""
      }
    },
    created () {
    },
    props: ['contentPlaceholder', "isShowUnderLine", "isalert", "baseBoxLeft"],
    components: {basecontrol},
    methods: {
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
  input{
    border: 0 !important;
    font-size: rem-calc(15);
    text-align: right;
    color: #333;
    outline: none;
  }
  input::-webkit-input-placeholder {
              font-size: rem-calc(15px);
              color: #ccc;
              text-align: right;
            }
</style>
<style lang='scss' rel="stylesheet/scss" scope>
  @import '~@/assets/scss/function';
</style>
