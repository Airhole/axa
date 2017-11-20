let targetRoot = 'http://localhost'
let port = '9101'

module.exports = {
  '/devapi/**': {
    target: targetRoot + ':' + port,
    secure: false,
    changeOrigin:true,
    pathRewrite: {
      '^/devapi': '/'
      }
  },
  '/testapi/**': {
    target: targetRoot + ':' + port,
    secure: false,
    changeOrigin:true,
    pathRewrite: {
      '^/testapi': '/'
    }
  }
}
