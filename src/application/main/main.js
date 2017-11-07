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
import vuexI18n from 'vuex-i18n'
// 全局mixin
import baseMixin from '../base/mixin'
import eventMixin from '../base/mixin/events'
import {translationsFan, translationsEn} from './language'
import {IAPP_INIT} from '@/api'

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

Vue.use(vuexI18n.plugin, store)
Vue.i18n.add('FAN', translationsFan)
Vue.i18n.add('EN', translationsEn)
Vue.i18n.set('FAN')
/* eslint-disable no-new */
export const app = new Vue({
  el: '#app',
  router,
  store,
  mixins: [eventMixin],
  template: '<App/>',
  components: { App },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.axios.get(IAPP_INIT).then(response => {
        // this.$i18n.add('FAN', response.data.fan)
        // this.$i18n.add('EN', response.data.en)
        // Object.assign(translationsFan, response.data.fan)
        // Object.assign(translationsEn, response.data.en)
        Vue.i18n.add('FAN', response.data.data.en)
        Vue.i18n.add('EN', response.data.data.fan)
      }).catch(err => {
        console.log(err)
        throw new Error(err)
      })
    }
  }
})

axioshttp(app)
