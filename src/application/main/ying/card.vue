<template>
  <div class="card">
    <div class="card-list">
      <!-- <div class="card-top w-box">
        <div class="flex-1">頭像</div>
        <img class="pack-e" src="~@/assets/image/user.png">
      </div> -->
      <root-text :list="list"></root-text>
    </div>
    <div class="share-btn">分享名片</div>
  </div>
</template>

<script>
  import rootText from '@/components/root-items/root-text'
  export default {
    name: 'card',
    data () {
      return {
        list: [{key: '微店名稱', value: '眾小安的微店'}, {key: '店主名稱', value: '眾小安'}, {key: '手機號碼', value: '15200005668'}, {key: '微信號', value: 'zhongxiaoan2017'}, {key: '公司', value: '眾小安的微店'}, {key: '機構', value: '眾小安'}, {key: '職位', value: '眾小安的微店'}, {key: '自我介紹', value: '聯繫我獲得最專業的保險服務聯繫我 獲得最專業的保險服務喔～ '}]
      }
    },
    components: {
      rootText
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-color: #f7f7f7;
    // .card-box {
    //   display: flex;
    //   .card-box-right {
    //     flex: 1;
    //     display: flex;
    //     -webkit-box-pack: end;
    //     justify-content: flex-end;
    //     -webkit-box-align: center;
    //   }
    // }
    .share-btn {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      margin: rem-calc(25) 0 0 0;
      display: flex;
      line-height: rem-calc(50);
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: rem-calc(18);
      color: #fff;
      background-color: #485bba;
    }
  }
</style>
