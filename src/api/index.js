let root
if (process.env.NODE_ENV === 'production') {
  root = '/api'
} else {
  root = '/testapi'
  // root = '/devapi'
}
let path = (inf = null, n = false) => {
  let result = ''
  if (process.env.NODE_ENV === 'production') {
    result = root + inf
  } else {
    if (n) {
      result = root + '/local' + inf
    } else {
      // result = root + '/corss' + inf
      result = root + '/cross' + inf
    }
  }
  return result
}
/*
corss  请求远端 
local  请求本地mock Json 文件

example:
export const ILOGIN = root + login
*/  
let login = (process.env.NODE_ENV === 'production') ? '/jdt-web/wx/configdata.do' : '/jdt-web/wx/configdata.do'
let demo = (process.env.NODE_ENV === 'production') ? '/demo' : '/demo'

export const ILOGIN = (n = false) => path(login, n)
export const IDEMO = (n = false) => path(demo, n)
export const ENROLL_INTERSET = (n = false) => path(demo, n)
export const QUERY_DICT = (n = false) => path(demo, n)
export const ENROLL_SUBMMIT = (n = false) => path(demo, n)
