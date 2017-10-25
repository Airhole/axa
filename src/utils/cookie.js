//  Thanks to:
//  - https://github.com/MoeKit/cookie
//  - http://www.nczonline.net/blog/2009/05/05/http-cookies-explained/
//  - http://developer.yahoo.com/yui/3/cookie/
let isNonEmptyString = s => typeof s === 'string' && s.length > 0
export default {
  set (name, value, {expires, domain, path, secure} = {}) {
    let text = name + '=' + encodeURIComponent(value)

    let date = expires
    if (typeof date === 'number') {
      date = new Date()
      date.setDate(date.getDate() + expires)
    }
    if (date instanceof Date) {
      text += '; expires=' + date.toUTCString()
    }

    if (isNonEmptyString(domain)) {
      text += '; domain=' + domain
    }

    if (isNonEmptyString(path)) {
      text += '; path=' + path
    }

    if (secure) {
      text += '; secure'
    }

    document.cookie = text
    return text
  },
  get (name) {
    for (let part of document.cookie.split(/;\s/)) {
      let [key, value = ''] = part.split('=')
      if (name === key) {
        return decodeURIComponent(value)
      }
    }
  },
  remove (name) {
    return this.set(name, '', {expires: new Date(0)})
  }
}
