<template>
  <div class="vsSign" id="canvasBox" :style="getHorizontalStyle">
    <div class="sign-title">请{{signName}}签名</div>
    <!--<div class="sign-title">请张三四签名</div>-->
    <canvas class="canvas-h"></canvas>
    <div class="menuCanvas" id="menuCanvas">
      <a @click="cancel">取消</a>
      <a @click="clear">清屏</a>
      <a @click="success" :class="[!status ? 'diable' : '']">确定</a>
    </div>
  </div>
</template>

<script>
  import Draw from './draw'
  export default {
    name: 'h5-sign-for-enroll'
  }
</script>

<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/global';

  $height: rem-calc(115);
  .vsSign{
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index: 9999;
    background: #fff;
    .sign-title {
      padding-top: 23px;
      font-size: rem-calc(17);
      text-align: center;
      color: #666;
    }
    /*& > .content{
      position: fixed;
      top:0;
      left:0;
      bottom:0;
      right:0;
      background:#efefef;
      touch-action: none;*/
    .canvas-h {
      width: 100%;
      height: calc(100% - #{$height});
    }
    #canvasBox {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .menuCanvas {
      margin: 0 rem-calc(15) rem-calc(15) rem-calc(15);
      height: 60px;
      border-top:1px solid #ccc;
      padding-top: rem-calc(15);
      /*padding: rem-calc(15) rem-calc(15) 0 rem-calc(15);*/
      font-size: rem-calc(20);
      user-select: none;
      box-sizing: content-box;
      display: flex;
      & > a {
        /*display: inline-block;*/
        /*width:31%;*/
        flex: 1;
        text-align: center;
        font-size: rem-calc(16px);
        border-radius: rem-calc(3px);
        height: rem-calc(40);
        line-height: rem-calc(40);
        background:#00aeff;
        color:#fff;
        margin-right: rem-calc(15);
        &.diable{
          background:#ccc;
          color:#333;
        }
      }
      & > a:last-child {
        margin-right: 0;
      }
    }
    canvas {
      flex: 1;
      cursor: crosshair;

    }
    /*}*/
  }
</style>
