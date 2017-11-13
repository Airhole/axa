//2017-10-9
import axios from 'axios'
import cookie from './cookie.js'
/*
  微信授权 获取openId | unionId
  @param type  string  openId |  unionId
*/
function queryParam (param) {
  if (window.location.search) {
    let params = window.location.search.split('?')[1].split('#')[0].split('&')
    let length = params.length

    for (let i = 0; i < length; i++) {
      let temp = params[i].split('=')
      if (temp[0] === param) {
        return temp[1]
      }
    }
  }
  return false
}

function spliceUrl (Url, arr) {
  let parts = Url.split('?')
  if (parts.length > 1) {
    let params = parts[1].split("&")
    for (let i = 0; i < arr.length; i++) {
      let a = arr[i]
      for (let j = params.length - 1; j >= 0; j--) {
        if (params[j].split('=')[0] == a) {
          params.splice(j, 1)
        }
      }
    }
    Url = params.length > 0 ? parts[0] + '?' + params.join('&') : parts[0]
  }
  return Url
}

function wxAuth (type) {
  console.log(!cookie.wechatUserInfo)
  let wxAuthUrl = ''
  let appId = window.appid
  let url = encodeURIComponent(location.href)
  let code = queryParam("code")
  let scope = type === "unionId" ? 'snsapi_userinfo' : 'snsapi_base'
  let wechatUserInfo = cookie.wechatUserInfo
  wxAuthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + url + '&response_type=code&scope=' + scope + '&state=STATE#wechat_redirect'
  if (!wechatUserInfo && !code) {
    location.replace(wxAuthUrl)
  } else {
    //请求用户信息不存在获取用户信息
    if (!wechatUserInfo) {
      // axios({
      //     url: requestLink("/user/WeChat") + "code=" + code
      //   })
      //   .then((res) => {
      //     //117微信已经绑定 116微信没有绑定
      //     if (res.data.code * 1 == 117 || res.data.code * 1 == 116) {
      //       localStorage.setItem('wechatUserInfo', JSON.stringify(res.data.data))
      //       if (res.data.code * 1 == 117) {
      //         localStorage.setItem("hqLoginCookieKey", res.data.data.accessKey)
      //       }
      //       resovel(res.data)
      //       // code失效
      //     } else if (res.data.code * 1 == 40163 || res.data.code * 1 == 40029) {
      //       let url = window.location.href
      //       if (url.indexOf('code=') > -1) {
      //         url = utils.spliceUrl(url, ['code', 'state'])
      //       }
      //       window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      //     }
      //   }).catch((error) => {
      //     console.log(error)
      //     reject(error)
        // })
    } else {
      // resovel(wechatUserInfo)
    }
  }
}
/*
  配置微信的jssdk调用权限
  @param type object  微信sdk对象
*/
function wxConfigSDk (wx) {
  // let url = encodeURIComponent(window.location.href)
  // return new Promise((resolve, reject) => {
  //   axios({
  //       url: requestRootLink("getWeixinSign") + "url=" + encodeURIComponent (url)
  //     })
  //     .then((data) => {
  //       if (data.status == 200) {
  //         data = data.data
  //         wx.config({
  //           debug: true,
  //           appId: data.appid,
  //           timestamp: data.timestamp,
  //           nonceStr: data.nonce,
  //           signature: data.signature,
  //           jsApiList: [
  //             'onMenuShareTimeline',
  //             'onMenuShareAppMessage',
  //             'chooseImage',
  //             'closeWindow'
  //           ]
  //         })
  //         wx.ready(() => {
  //           resolve(data)
  //         })
  //         wx.error(res => {
  //           reject()
  //           location.reload()
  //         })
  //       }
  //     })
  //     .catch(error => {
  //       reject(error)
  //       console.log(error)
  //     })
  // })
}
export default {
  wxAuth,
  wxConfigSDk
}
