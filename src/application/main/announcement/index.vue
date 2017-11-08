<template>

  <article class="main">
    <section class="mainC">
      <section v-for= '(item,index) in this.healthDate' class="content">
          <div class="title"><span>{{item.title}}</span></div>
          <div class="contentMain" v-for="(i,n) in item.data">
            <p class="contentItem">{{n+1}}.{{i}}</p>
          </div>
      </section>
    </section>
    <footer class="footer">
      <p class="left" @click="subClick(1)">
          {{ $t('announcement_agree')}}
      </p>
      <p class="right" @click="subClick(2)">
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
          title: this.switch === "FAN" ? '提示' : 'Remind',
          content: this.switch === "FAN" ? '您的健康不符合投保要求，不能承保' : 'Cannot underwrite',
          buttonText: this.switch === "FAN" ? '确定' : 'Done'
        })
      } else {
        //跳到下一页
        this.$router.push({path: "/applicant", query: {userId: this.userId}})
      }
    },
    getDate () {
      this.axios.post(HEALTHINFORM, {switch: this.switch}).then((response) => {
        this.isLoading = false
        this.healthDate = response.data.date
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
          height:rem-calc(70);
          width:100%;
          display: flex;
          box-sizing: border-box;
          background-color:#FFF;
          box-shadow:-15px -18px -33px #292929;
          .left{
            width:50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #FFF;
            color:#485bba;
            font-size:rem-calc(15);
            box-sizing: border-box;
            border-top:1px solid #f0f0f0;
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
            box-sizing: border-box;
            
          }
      }

  }
</style>
