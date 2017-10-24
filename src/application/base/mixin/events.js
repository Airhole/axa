/**
 auth: jankergg
 desc: 全局事件 mixin - event
 Warning: 添加全局方法须谨慎，非必要情况请把全局方法添加到 base/settings !!!!!
 */
export const funpage = document.getElementById('fullpage')

export default {
  methods: {
    maskShow () {
      return this.$store.state.ui.getters.maskState
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.planId) {
        let _qr = JSON.stringify(to.query)
        let _param = { params: {} }
        if (_qr !== "{}") {
          // 缓存query值, 只用于页面回跳
          _param.params[to.name] = { query: to.query }
          this.$root.updateCache(this.planId, _param)
        }
      }
      funpage.scrollTop = 0
      if (this.$route.query.type) {
        this.$store.dispatch('setPressStatus', this.$route.query.type)
      }
      window.shareCallback = () => {
        // alert('shareCallback')
      }
      window.gotoprogressSearch = () => {
        _self.$router.push({path: '/web/prosearch'})
      }
      window.gotoprogress = () => {
        _self.$router.push({path: '/web/searchquery', query: {'type': 5}})
      }
      window.gotorecommend = () => {
        _self.$router.push({name: 'recommend_search'})
      }
      window.gotorecommendgura = () => {
        _self.$router.push({name: 'recommend_search_gurarantee'})
      }
      window.gotoVerifiedInitialSearch = () => {
        _self.$router.push({name: 'entryVerifiedInitialSearch', query: _self.$route.query})
      }
      window.gotoVerifiedReviewSearch = () => {
        _self.$router.push({name: 'entryVerifiedReviewSearch', query: _self.$route.query})
      }
      window.gotoPage = param => {
        _self.$router.push({name: param, query: _self.$route.query})
      }
      window.addBenefit = () => {
        _self.$router.push({path: '/web/beneficiaryInfo', query: {'applyId': _self.$store.state.sale.applyId}})
      }
      window.gobackbtn = pathName => {
        let {meta} = _self.$router
        if (window.__callbacks && typeof window.__callbacks.gobackbtn === 'function') {
          window.__callbacks.gobackbtn()
        } else if (/^go:/.test(pathName)) {
          _self.$router.push({name: pathName.split(':')[1], query: _self.$route.query})
        } else {
          _self.$router.go(-1)
        }
      }
      window.goHistory = () => {
        let {meta: {leftMenu: {param: {go = -1} = {}} = {}} = {}} = this.$route
        this.$router.go(-Math.abs(go))
      }
      window.gotoexample = () => {
        _self.$store.state.ui.store.set('isNeedUpdate', false)
        window.setTimeout(() => {
          _self.$router.push({path: '/web/uploadexample'})
        })
      }
      window.gotoupload = () => {
        _self.$router.push({path: '/web/upload'})
      }
      window.goInput = () => {
        _self.$router.push({path: '/web/supplementInsure', query: {'applyId': _self.$store.state.sale.applyId}})
      }
      window.gobenefit = () => {
        _self.$router.push({path: '/web/beneficiary', query: {'applyId': _self.$store.state.sale.applyId}})
      }
      window.gotoStep = n => {
        //  新增路由拦截的功能，路由是否拦截，由meta中的prevent的函数的返回值决定。
        //  在具体的业务代码，设置$route.meta.prevent为一函数可以触发该能力。
        let {meta} = _self.$route
        if (meta && typeof meta.prevent === 'function') {
          if (meta.prevent()) {
            return
          }
        }
        switch (n) {
        case "recordCustomerInfor":
          if (_self.$store.state.ui.step == 2) {
            _self.$router.push({name: 'appfeature'})
          } else {
            window.closeWebview()
          }
          break
        case "addmajor":
          _self.$router.push({name: 'recordCustomerInfor'})
          break
        case "feature":
          if (_self.$store.state.ui.step == 2) {
            window.closeWebview()
          } else {
            _self.$router.push({name: 'addmajor'})
          }
          break
        case "makePlan":
          if (_self.$store.state.ui.step == 2) {
            _self.$router.push({name: 'recordCustomerInfor'})
          } else {
            _self.$router.push({name: 'feature'})
          }
          break
        case "previewsuggestion":
          _self.$router.push({name: 'makePlan'})
          break
        case "supplementInsure":
          _self.$router.push({name: 'previewsuggestion'})
          break
        case "beneficiary":
          _self.$router.push({name: 'supplementInsure'})
          break
        case "beneficiaryInfo":
          _self.$router.push({name: 'beneficiary'})
          break
        case "beneficiaryInformation":
          _self.$router.push({name: 'beneficiary'})
          break
        case "supplementInfo":
          _self.$router.push({name: 'beneficiary'})
          break
        case "notify":
          _self.$router.push({name: 'supplementInfo'})
          break
        case "announcement":
          _self.$router.push({name: 'notify'})
          break
        case "previewinsurance":
          _self.$router.push({name: 'announcement'})
          break
        }
      }

      // 路由设置
      let meta = to.meta
      if (meta.title) {
        if (meta.title === '__SKIP__') {
          //  跳过标题设置
        } else {
          window.SetH5Header(meta.title)
        }
      } else {
        window.SetH5Header('')
      }
      if (!meta.rightMenu && !meta.leftMenu) {
        window.toggleMenu(3, false)
      } else if (!meta.rightMenu) {
        // alert('rightMenuhide')
        window.toggleMenu(2, false)
      } else if (!meta.leftMenu) {
        window.toggleMenu(1, false)
      }
      if (meta.rightMenu) {
        if (meta.rightMenu === '__SKIP__') {
          //  跳过路由设置
        } else {
          window.toggleMenu(2, true)
          window.rightMenu(meta.rightMenu)
        }
      }
      if (meta.leftMenu) {
        if (this.$store.state.ui.step == 7 && to.name == 'searchquery') {
          window.toggleMenu(1, true)
        } else if (meta.leftMenu === '__SKIP__') {
           跳过路由设置
        } else {
          window.toggleMenu(1, true)
          window.leftMenu(meta.leftMenu)
        }
      }
    }
  }
}