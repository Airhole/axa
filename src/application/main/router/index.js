import Vue from 'vue'
import Router from 'vue-router'
import hello from '@/components/hello.vue'
import products from '@/components/product/list.vue'
import product from '@/components/product/item.vue'
import Gallery from '@/application/base/gallery/gallery'

Vue.use(Router)

export default new Router({
  routes: [
    { //  当路径为空时随便指向一个页面  TODO : 移除
      path: '/',
      name: 'hello',
      component: hello
    }, { // 产品列表
      path: '/products',
      name: 'products',
      component: products
    }, { //  产品页
      path: '/product/:productId',
      name: 'product',
      component: product
    }
  ]
})
