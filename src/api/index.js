let root = ''
let pro = process.env.NODE_ENV === 'production'
if (pro) {
  root = '/api'
} else {
  root = '/testapi'
  // root = '/devapi'
}
let path = (inf = null, n) => {
  let result = ''
  if (!n) n = false
  if (pro) {
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
let login = pro ? '/jdt-web/wx/configdata.do' : '/jdt-web/wx/configdata.do'
let demo = pro ? '/demo' : '/demo'
export const ILOGIN = n => path(login, n)
export const IDEMO = n => path(demo, n)

export const ENROLL_INTERSET = n => path(demo, n)
export const QUERY_DICT = n => path(demo, n)
export const ENROLL_SUBMMIT = n => path(demo, n)

// xnApp api
let makeplan = pro ? '/plan/createPlan' : '/xnapp/plan/createPlan'
export const MAKE_PLAN = n => path(makeplan, n)
