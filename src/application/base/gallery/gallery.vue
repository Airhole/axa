<!--
gallery用于在开发中汇总单个页面列表
-->
<template>
  <div class="page-gallery">
    <details open>
      <summary>Main Link</summary>
      <ol>
        <li v-for="item in mainRouter.options.routes" key="item.link">
          <router-link :to="{path:item.path, saveScrollPosition: true}" tag="div">
            <div v-if="item.Info">
              <p>{{item.Info.description}}</p>
              <dl>
                <dt class="link">link:{{ item.path }}</dt>
                <dt>name:{{item.name}}</dt>
                <dt>param:</dt>
                <dd v-for="(value, key) in item.Info.param">
                  {{ key }} : {{ value }}
                </dd>
              </dl>
            </div>
            <div v-else>
              <dl>
                <dt>===这里没写Info===</dt>
                <dt>{{item.name}}</dt>
              </dl>
            </div>
          </router-link>
        </li>
      </ol>
    </details>
    <details open>
      <summary>Share Link</summary>
      <ol>
        <li v-for="item in shareRouter.options.routes" key="item.link">
          <a :href="'/share.html#' + item.path">
            <!--<a href="/share.html#">AAA</a>-->
            <div v-if="item.Info">
              <p>{{item.Info.description}}</p>
              <dl>
                <dt class="link">link:{{ item.path }}</dt>
                <dt>name: &nbsp;{{item.name}}</dt>
                <dt>param:</dt>
                <dd v-for="(value, key) in item.Info.param">
                  {{ key }} : {{ value }}
                </dd>
              </dl>
            </div>
            <div v-else>
              <dl>
                <dt>==这里没写Info==</dt>
                <dt>name: {{item.name}}</dt>
              </dl>
            </div>
          </a>
        </li>
      </ol>
    </details>
  </div>
</template>

<script>
import Vue from 'vue'
import mainRouter from '../../main/router/index'
import shareRouter from '../../share/router/index'

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
      routers: [{
        title: 'Main Link',
        name: this.mainRouter
      }, {
        title: 'Share Link',
        name: this.shareRouter
      }],
      mainRouter: mainRouter,
      shareRouter: shareRouter
    }
  },
  components: {Comp},
  created () {
    this.cookies = document.cookie
    console.log(this.mainRouter)
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
  @import '~@/assets/scss/function';
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
    summary {
      background: #ffd89b;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #19547b, #ffd8Bb);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #19547b, #ffd8Bb); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      color: #fff;
      padding: 3px 10px;
    }
    ol {
      padding-left: 0;
      width: 100%;
      clear: both;
      font-size: 0;
      padding-top: 10px;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      & > li {
        text-align: left;
        vertical-align: top;
        margin-bottom: 10px;
        flex: 0 0 48%;
        display: inline-block;
        line-height: 1;
        margin-left:1%;
        box-sizing: border-box;
        word-spacing: normal;
        word-break: break-all;
        font-size:9px;
        border: 1px solid #999;
        border-radius: 5px;
        padding-bottom: 5px;
        a {
          text-decoration: none;
        }
        a:visited {
          color: #000;
        }
        p {
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          margin: 0 0 5px 0;
          font-size: 12px;
          padding: 8px;
          text-align: center;
          background: #485563;  /* fallback for old browsers */
          background: -webkit-linear-gradient(to right, #29323c, #485563);  /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(to right, #29323c, #485563); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          color: #fff;
        }
        dl {
          margin: 0;
        }
        dt {
          line-height: 1.5;
          padding-left: 5px;
          padding-right: 5px;
          padding-bottom: .3rem;
          font-size: 1rem;
        }
        .link {
          color: #00abff;
        }
      }
    }
    & > div {
      clear: both;
      padding-left:5%;
    }
  }
</style>
