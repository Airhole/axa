import '@/application/base'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import {axioshttp} from '@/widget'
import Vuex from 'vuex'
import { ToastPlugin, AlertPlugin, ConfirmPlugin } from 'vux'
// 全局mixin
import baseMixin from '../base/mixin'

Vue.use(Vuex)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)

Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
export const app = new Vue({
  el: '#app',
  router,
  store,
  mixins: [baseMixin],
  template: '<App/>',
  components: { App }
})

axioshttp(app)
