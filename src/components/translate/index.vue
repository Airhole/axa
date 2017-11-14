<template>
  <div class="languageChange" :class="{'active' : currentLanguage}" @click="LanguageSwitch">
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'index_list',
  data () {
    return {
      currentLanguage: this.language
    }
  },
  created: function () {
    this.init()
  },
  watch: {
    'currentLanguage' (nValue, oldValue) {
      this.changeLanguage(nValue)
    }
  },
  props: {
    language: {
      type: Boolean, //  type只能是当前组件预定义的“枚举值”
      default: false
    }
  },
  methods: {
    init () {
      this.currentLanguage = false
      this.changeLanguage(false)
    },
    changeLanguage (n) {
      if (n) {
        this.$i18n.set('EN')
        window.cookie.set('language', 'EN')
      } else {
        this.$i18n.set('FAN')
        window.cookie.set('language', 'FAN')
      }
      this.$emit("onChange", {lang: n ? 'EN' : 'FAN'})
    },
    LanguageSwitch () {
      this.currentLanguage = !this.currentLanguage
    }
  }
}
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
@import '~@/assets/scss/function';
.languageChange{
  position: relative;
  &:after,&:before{
    border-radius: rem-calc(10);
    border:1px solid #ccc;
    transform: scale(.5);
    font-size: rem-calc(20);
    color: #666;
    width: rem-calc(40);
    height: rem-calc(40);
    text-align: center;
    vertical-align: middle;
    line-height: rem-calc(40);
    display: block;
    position: absolute;
  }
  &{
    &:after{
      content: 'A';
      top: rem-calc(-15);
      left: rem-calc(-15);
      background: #fff;
      z-index: 1;
    }
    &:before{
      content: '中';
      bottom: rem-calc(-15);
      left: rem-calc(-5);
      color: #fff;
      background: #4663ec;
      z-index: 10;
    }
  }
  &.active {
    &:after{
      content: 'A';
      top: rem-calc(-15);
      left: rem-calc(-15);
      background: #4663ec;
      z-index: 10;
      color:#fff;
    }
    &:before{
      content: '中';
      bottom: rem-calc(-15);
      right: rem-calc(-15);
      background: #fff;
      z-index: 1;
      color: #666;
    }
  }
}
</style>