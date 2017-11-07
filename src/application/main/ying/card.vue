<template>
  <div class="card">
    <div class="card-list">
      <div class="card-top w-box">
        <div class="flex-1 box-cm">頭像</div>
        <img class="pack-e img" src="~@/assets/image/user.png">
      </div>
      <div class="card-list-box">
        <div class="card-item w-box">
          <div class="flex-1">微店名稱</div>
          <div class="flex-1 pack-e">{{ lists.shopName }}</div>
        </div>
        <div class="card-item w-box">
          <div class="flex-1">店主名稱</div>
          <div class="flex-1 pack-e">{{ lists.shopPerson }}</div>
        </div>
      </div>
      <div class="card-list-box">
        <div class="card-item w-box">
          <div class="flex-1">手機號碼</div>
          <div class="flex-1 pack-e phone">{{ lists.phone }}</div>
        </div>
        <div class="card-item w-box">
          <div class="flex-1">微信號</div>
          <div class="flex-1 pack-e weixin">{{ lists.weixin }}</div>
        </div>
      </div>
      <div class="card-list-box">
        <div class="card-item w-box">
          <div class="flex-1">公司</div>
          <div class="flex-1 pack-e">{{ lists.company }}</div>
        </div>
        <div class="card-item w-box">
          <div class="flex-1">機構</div>
          <div class="flex-1 pack-e">{{ lists.mechanism }}</div>
        </div>
        <div class="card-item w-box">
          <div class="flex-1">職位</div>
          <div class="flex-1 pack-e">{{ lists.position }}</div>
        </div>
        <div class="card-item w-box">
          <div class="flex-1">自我介紹</div>
          <div class="flex-1 pack-e">{{ lists.selfIntroduction }}</div>
        </div>
      </div>
      <!-- <root-text :list="list"></root-text> -->
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
        lists: {shopName: '眾小安的微店', shopPerson: '眾小安', phone: '15200005668', weixin: 'zhongxiaoan2017', company: '眾小安的微店', mechanism: '眾小安', position: '眾小安的微店', selfIntroduction: '聯繫我獲得最專業的保險服務聯繫我獲得最專業的保險服務喔～'}
        // list: [{key: '微店名稱', value: '眾小安的微店'}, {key: '店主名稱', value: '眾小安'}, {key: '手機號碼', value: '15200005668'}, {key: '微信號', value: 'zhongxiaoan2017'}, {key: '公司', value: '眾小安的微店'}, {key: '機構', value: '眾小安'}, {key: '職位', value: '眾小安的微店'}, {key: '自我介紹', value: '聯繫我獲得最專業的保險服務聯繫我 獲得最專業的保險服務喔～ '}]
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
    font-size: rem-calc(15);
    .card-list {
      .w-box {
        padding: rem-calc(15) 0;
      }
      .card-top {
        background-color: #fff;
        > div {
          padding-left: rem-calc(15);
        }
        .img {
          width: rem-calc(60);
          height: rem-calc(60);
          margin-right: rem-calc(15);
        }
      }
      .card-list-box {
        padding-left: rem-calc(15);
        background-color: #fff;
        margin-top: rem-calc(10);
        .card-item {
          border-bottom: .5px solid #e8e8e8;
          .pack-e {
            width: rem-calc(220);
            color: #666;
            padding-right: rem-calc(15);
          }
          .phone:after, .weixin:after {
            content: '';
            display: inline-block;
            width: rem-calc(20);
            height: rem-calc(20);
            vertical-align: middle;
            background-size: 100%;
            background-repeat: no-repeat;
            margin-left: rem-calc(10);
          }
          .phone:after {
            background-image: url('~@/assets/image/phone.png');
          }
          .weixin:after {
            background-image: url('~@/assets/image/wx.png');
          }
        }
        .card-item:last-child {
          border-bottom: none;
        }
      }
    }
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
