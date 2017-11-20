<!--文本详情模态窗显示，当前已知用到页面计划书预览-->
<template>
  <div>
    <div class=paper @click=hide>
      <div class=box>
        <header>{{title}}</header>
        <div class=content>
          <p v-for="(p,index) in list" :key="index">{{p}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: String,
      content: [String, Array]
    },
    computed: {
      list: {
        get () {
          const {content} = this
          return content ? (Array.isArray(content) ? content : [content]) : []
        }
      }
    },
    methods: {
      hide () {
        this.$emit('close')
      }
    }
  }
</script>
<style lang=scss scoped>
  .paper{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.7);
    z-index: 1000;
    display: flex;
    flex-direction: column;
  }
  .box{
    width: rem-calc(320);
    margin: auto;
    border-radius: 4px;
    overflow: hidden;
  }
  header{
    color: white;
    background-color: #20aee5;
    font-weight: 500;
    font-size: rem-calc(16);
    line-height: rem-calc(45);
    height: rem-calc(45);
    text-align: center;
  }
  .content{
    flex: 1;
    max-height: 60vh;
    overflow-y: auto;
    background-color: white;
    padding: rem-calc(10) rem-calc(15);
    p{
      color: #666;
      font-size: rem-calc(14);
      line-height: rem-calc(20);
      margin: rem-calc(8) 0;
    }
  }
</style>
