<template>

  <article class="main">
    <section class="mainC">
      <section v-for= '(item, index) in this.healthDate' class="content" :keys="index">
          <div class="title"><span>{{item.title}}</span></div>
          <div class="contentMain" v-for="(i,n) in item.data" :keys="n">
            <p class="contentItem">{{n+1}}.{{i.title}}</p>
            <div class="label" v-for="(z, index) in i.label" :keys="index">
              {{z}}
            </div>
          </div>
      </section>
    </section>
    <footer class="footer w-box">
      <p class="left flex-1" @click="subClick(1)">
          {{ $t('announcement_agree')}}
      </p>
      <p class="right flex-1" @click="subClick(2)">
         {{ $t('announcement_unagree')}}
      </p>
    </footer>
    <section >
      <loading :show="isLoading"></loading>
    </section>
  </article>
</template>
<script>
import {HEALTHINFORM} from '@/api'
import Vue from 'vue'
import {Loading, TransferDomDirective as TransferDom, AlertPlugin} from 'vux'
// switch : 中英文的切换从
export default {
  name: 'announcement',
  components: {Loading},
  data () {
    return {
      healthDate: [],
      isLoading: true,
      switch: this.$i18n.locale()
    }
  },
  methods: {
    //num:1 部分为是 2 以上皆否
    subClick (num) {
      if (num == 1) {
        this.$vux.alert.show({
          title: Vue.i18n.translate('remind'),
          content: Vue.i18n.translate('announcement_tips'),
          buttonText: Vue.i18n.translate('announcement_done')
        })
      } else {
        //跳到下一页
        this.$router.push({path: "/applicant", query: {userId: this.userId}})
      }
    },
    getDate () {
      this.axios.post(HEALTHINFORM, {"productId": "22332", "language": "EN"}).then((response) => {
        this.isLoading = false
        this.healthDate = response.data.data
      }, (response) => {
      }).catch((err) => {
        console.log(err)
        throw new Error(err)
      })
    }
  },
  mounted () {
    this.isLoading = true
    this.getDate()
  }
}
</script>

<style lang='scss' rel="stylesheet/scss" scoped>
  .main{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    position: relative;
    font-family: 'PingFang SC';
    .mainC{
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overflow: auto;
      width:100%;
      flex-grow: 1;
      margin-bottom: rem-calc(50);
      .content{
        width:100%;
        background-color: #fff;
        font-size:rem-calc(14);
        .title{
          padding: 0 rem-calc(14) 0 0;
          background-color:#f0f0f0;
          color:#666;
          font-size:rem-calc(14);
          height:rem-calc(40);
          width:100%;
          display: flex;
          align-items: center;
          position: relative;
          box-sizing: border-box;
          & > span{
            margin-left: rem-calc(30px);
          }
        }
        .title:before{
          box-sizing: border-box;
          width:rem-calc(3);
          height:rem-calc(17);
          background-color: #485bba;
          content:' ';
          border-radius:rem-calc(2);
          position: absolute;
          left: rem-calc(18);
          top:rem-calc(11);
          border-radius: 10px;
        }
        .contentMain{
          box-sizing: border-box;
          padding:rem-calc(14) rem-calc(14) rem-calc(14) 0;
          margin-left:rem-calc(14);
          border-bottom:1px solid #e6e6e6;
          & > .label{
            line-height: rem-calc(25);
            font-size:rem-calc(14);
          }
          &:last-child{
              border-bottom:0;
            }
          .contentItem{
            box-sizing: border-box;
            width:100%;
            font-size:rem-calc(16);
            line-height: rem-calc(23);
            color:#333;
            margin-bottom: rem-calc(3);
          }
        }
      }
    }
    .footer{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: rem-calc(50);
      line-height: rem-calc(50);
      box-sizing: border-box;
      background-color:#FFF;
      // box-shadow:0px 0px 10px #292929;
      text-align: center;
      .left{
        width:50%;
        align-items: center;
        justify-content: center;
        color:#485bba;
        font-size:rem-calc(15);
        box-sizing: border-box;
        border-top:1px solid #f0f0f0;
      }
      .right{
        width:50%;
        align-items: center;
        justify-content: center;
        color:#fff;
        background-color: #485bba;
        font-size:rem-calc(15);
        box-sizing: border-box;
        border-top:1px solid #485bba;
      }
    }
  }
</style>
