<!--
gallery用于在开发中汇总单个页面列表

-->
<template>
  <div class="page-gallery">
<!--     <input type="tel" v-maxLength="'8'" value="12313" maxlength="10"/>
    <input type="text" v-maxLength="'8'" value="12313" maxlength="10"/>
    <input type="text" v-maxLength="'8'" value="12313" maxlength="10"/>
    <input type="text" v-maxLength="'8'" value="12313" maxlength="10"/>
 <!--&ndash;&gt;    <details>-->
      <!--<summary>Gallery</summary>-->
      <!--<ol>-->
        <!--<li v-for="item in items">-->
          <!--<router-link :to="item.link" key="item.link" tag="div">-->
            <!--<p>{{item.descript}}</p>-->
            <!--link:{{ item.link }}-->
          <!--</router-link>-->
        <!--</li>-->
      <!--</ol>-->
    <!--</details>-->
    <details open>
      <summary>Router link</summary>
      <ol>
        <li v-for="item in linkitem.options.routes" key="item.link">
          <router-link :to="{path:item.path, saveScrollPosition: true}" tag="div">
            <div v-if="item.Info">
              <p>{{item.Info.description}}</p>
              <dl>
                <dt>link:{{ item.path }}</dt>
                <dt>name:{{item.name}}</dt>
                <dt>param:</dt>
                <dd v-for="(value, key) in item.Info.param">
                  {{ key }} : {{ value }}
                </dd>
              </dl>
            </div>
            <div v-else>==========这里没写Info=================={{item.name}}</div>
          </router-link>
        </li>
      </ol>
    </details>
    <router-link to="/web/recordCustomerInfor" tag="div">E投保</router-link>
    <br/>
    <router-link to="/web/progress" tag="div">投保过程</router-link>
    <br/>
    <router-link to="study" tag="div">学习</router-link>
    <br/>
    <router-link to="/web/jsApp" tag="div">JSaPP</router-link>
    <br/>
    <router-link to="appfeature" tag="div">featureapp</router-link>
    <div>
      <a href="https://hq-app-dev.zhongan.io/web/appfeature?id=HQL00100&type=2">feature</a>
      <!-- <router-link :to="item.path" tag="div">投保过程</router-link> -->
      <!-- <div @click="gg">lkjfl;kajld;kfjasld;kfjla;skdjf;lkasjdf;lkajslf;dk</div>
      <div @click="bb">asdfasdfasdfasdfasdfasdfasdf</div> -->
      <!-- <div @click="cc">asdfasdfasdfasdfasdfasdfasdf</div> -->
      <!-- <div @click="addressaaa">================addressaaa=====================</div> -->
      <Comp></Comp>
    </div>
    <div>cookies:<input @click="onFoucs" :value="cookies"/></div>
  </div>
</template>

<script>
import Vue from 'vue'
import routerconf from '../../main/router/index'
let a1 = {
  template: `<div>sdasdfsf</div>`
}
var Comp = Vue.extend({
  props: ['msg'],
  template: '<div>{{ msg }}<a1></a1></div>',
  components: {
    a1
  }
})

export default{
  name: 'Gallery',
  data () {
    return {
      cookies: '',
      items: [
        {
          link: '/gallery',
          descript: 'gallery用于在开发中汇总单个页面列表'
        },
        {
          link: '/uigallery',
          descript: 'baseUiGallery 基本 ui 组件汇总'
        },
        {
          link: '/servicegallery',
          descript: 'servicegallery 基本 业务 组件汇总'
        }
      ],
      linkitem: routerconf
    }
  },
  components: {Comp},
  created () {
    this.cookies = document.cookie
    console.log(this.linkitem)
  },
  methods: {
    addressaaa () {
      // window.HQAppJSInterface.popUpAddressChooseView()
    },
    onFoucs (e) {
      e.target.select()
    }
    // ,
    // gg () {
    //   console.log('gg')
    //   this.$store.dispatch('toggtestaa')
    //   let a = JSON.stringify(this.$store.state)
    //   sessionStorage.setItem("key", a)
    //   console.log(this.$store.state)
    //   console.log(sessionStorage.getItem("key"))
    // },
    // bb () {
    //   // console.log('bb')
    //   this.$store.dispatch('getStore')
    //   console.log(this.$store.state.ui.testid)
    //   // console.log(sessionStorage.getItem("key"))
    // },
    // cc () {
    //   this.axios({
    //     'url': 'http://192.168.26.39:9080/plan/listProduct',
    //     headers: {'X-Requested-With': 'asdfasdf123123123'}
    //   }).then((response) => {
    //     console.log('fffff')
    //   }, (response) => {
    //   }).catch((err) => {
    //   throw new Error(err)
    //   console.log(err)
    // })
    // }
  }
}
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
  .page-gallery {
    width: 100%;
    padding: 0px;
    margin: 0;
    height: 100%;
    overflow-y: auto;
    & > summary {
      font-size: 20px;
    }
    & > details {
      margin: 20px 0 20px 0;
      clear: both
    }
    ol {
      width: 100%;
      clear: both;
      font-size: 0;
      padding-top: 10px;
      & > li {
        text-align: left;
        vertical-align: top;
        margin-bottom: 10px;
        line-height: 25px;
        width:32%;
        display: inline-block;
        line-height: 1;
        margin-left:1%;
        box-sizing: border-box;
        word-spacing: normal;
        word-break: break-all;
        font-size:9px;
        border: 1px solid #999;
        border-radius: 10px;
        padding-bottom: 5px;
        p {
          font-size: 12px;
          border-radius: 5px;
          padding: 5px;
          background: #aaa;
          color: #fff;
        }
        dt {
          padding-left: 5px;
        }
      }
    }
    & > div {
      clear: both;
      padding-left:5%;
    }
  }
</style>
