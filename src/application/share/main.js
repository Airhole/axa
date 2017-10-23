// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import '@/application/base'
import Vue from 'vue'
import App from './App'
import router from './router'
import {axioshttp} from '@/widget'
import Vuex from 'vuex'
import { ToastPlugin, AlertPlugin, ConfirmPlugin } from 'vux'
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
  template: '<App/>',
  mixins: [baseMixin],
  components: { App }
})

axioshttp(app)
