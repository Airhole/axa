
<style lang='scss' rel="stylesheet/scss" scoped>
  .main{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    .mainC{
      overflow: auto;
      width:100%;
      flex-grow: 1;
        .content{
          width:100%;
          background-color: #fff;
          font-size:rem-calc(14);
          .title{
            padding: 0 rem-calc(14) 0 rem-calc(29);
            background-color:#f0f0f0;
            color:#666;
            font-size:rem-calc(14);
            height:rem-calc(40);
            width:100%;
            display: flex;
            align-items: center;
            position: relative;
            box-sizing: border-box;
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
            width:100%;
            border-bottom:rem-calc(1) solid #e6e6e6;
            &:last-child{
                border-bottom:0;
              }
            .contentItem{
              box-sizing: border-box;
              width:100%;
              font-size:rem-calc(14);
              line-height: rem-calc(23);
              color:#333;
             
              
            }
          }
        }
    }
     .footer{
          height:rem-calc(50);
          width:100%;
          display: flex;
          .left{
            width:50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ffffff;
            color:#485bba;
            font-size:rem-calc(15);
          }
          .right{
            width:50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color:#fff;
            background-color: #485bba;
            font-size:rem-calc(15);
          }
      }

  }
</style>
<template>

  <article class="main">
    <section class="mainC">
      <section v-for= 'item in this.healthDate' class="content">
          <div class="title">{{item.title}}</div>
          <div class="contentMain" v-for="i in item.data">
            <p class="contentItem">{{i}}</p>
          </div>
      </section>
    </section>
    <footer class="footer">
      <p class="left" @click="this.subClick(1)">
          {{this.switch ? '部分为是' : 'ldskfalsdfa'}}
      </p>
      <p class="right" @click="this.subClick(2)">
          {{this.switch ? '以上皆否' : 'ldskfalsdfa'}}
      </p>
    </footer>
    <section >
      <loading :show="isLoading"></loading>
    </section>
  </article>
   
</template>
<script>
import {IDEMO, ILOGIN, HEALTHINFORM} from '@/api'
import {Loading, TransferDomDirective as TransferDom} from 'vux'
export default {
  name: 'announcement',
  components: {Loading},
  data () {
    return {
      healthDate: [],
      isLoading: true,
      switch: 0
    }
  },
  methods: {
    // ajaxDemo () {
    //   this.axios.get(IDEMO).then((response) => {
    //     console.log(response)
    //   }, (response) => {
    //   }).catch((err) => {
    //     console.log(err)
    //     throw new Error(err)
    //   })
    // },
    // ajaxDemo1 () {
    //   this.axios.get(ILOGIN).then((response) => {
    //     console.log(response)
    //   }, (response) => {
    //   }).catch((err) => {
    //     console.log(err)
    //     throw new Error(err)
    //   })
    // },
    subClick (num) {
      if (num == 1) {
        alert('buxing ')
      } else {
        this.$router.push('/success')
      }
    },
    getDate () {
      this.axios.get(HEALTHINFORM).then((response) => {
        this.isLoading = false
        console.log(response.data.healthDate)
        this.healthDate = response.data.healthDate
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
