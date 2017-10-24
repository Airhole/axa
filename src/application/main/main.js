import '@/application/base'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import {axioshttp} from '@/widget'
import Vuex from 'vuex'
import { ToastPlugin, AlertPlugin, ConfirmPlugin } from 'vux'
import VeeValidate from 'vee-validate'
import messagesCN from '@/widget/validate/zh_CN'
import * as VeeValidateExtends from '@/widget/validate/extends'
// 全局mixin
import baseMixin from '../base/mixin'
import eventMixin from '../base/mixin/events'

Vue.use(Vuex)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.mixin(baseMixin)

// validator
const veeConfig = {
  errorBagName: '__errors', // change if property conflicts.
  delay: 0.5,
  locale: 'cn',
  messages: null,
  strict: true,
  dictionary: {
    cn: {
      messages: messagesCN
    }
  }
}
Vue.use(VeeValidate, veeConfig)

/* eslint-disable no-new */
export const app = new Vue({
  el: '#app',
  router,
  store,
  mixins: [eventMixin],
  template: '<App/>',
  components: { App }
})

axioshttp(app)
