let root = ''
const pro = process.env.NODE_ENV === 'production'
const mock = process.env.MOCK
if (pro) {
  root = '/api'
} else {
  // root = '/testapi'
  root = '/devapi'
}
let path = (inf = null, n) => {
  let result = ''
  if (pro) {
    result = root + inf
  } else {
    switch (mock) {
    case 'local':
      console.warn('本地mock数据模式')
      result = root + '/local' + inf
      break
    case 'cross':
      console.warn('远程mock数据模式')
      result = root + '/cross' + inf
      break
    case 'mixin':
      if (n) {
        result = root + '/local' + inf
      } else {
        result = root + '/cross' + inf
      }
      break
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
let login = '/jdt-web/wx/configdata.do'
let demo = '/demo'

//健康告知
let healthInform = '/product/healthinfo'
export const HEALTHINFORM = path(healthInform)

export const ILOGIN = path(login)
export const IDEMO = path(demo, true)

/*
  app初始化
*/
export const IAPP_INIT = path('/init', true)
// 公司介绍
export const ICOMPANY_INTRODUCTION = path('/company', true)
// 投保结果
let insure = '/insure/approval'// /result'
export const INSURE_RESULT = path(insure, true)

// let order = '/order'
let order = '/order/queryOrderLisy'
export const IORDER_QUERY = path(order, true)

let accoutScore = '/accountscore'
export const IACCOUNT_SCORE = path(accoutScore, true)

// let myScore = '/myscore'
// export const IMY_SCORE = path(myScore, true)
// 我的积分
let myScore = '/points/getPoints'
export const IMY_SCORE = path(myScore, true)

// 我的积分-列表
// export const SCORE_DETAIL = path('/scoredetail', true)
export const SCORE_DETAIL = path('/points/getPoints/detailed', true)

let agentAccount = '/agent'
export const IACCOUNT_AGENT = path(agentAccount, true)

export const ENROLL_INTERSET = path(demo)
export const QUERY_DICT = path(demo)
export const ENROLL_SUBMMIT = path(demo)

// xnApp api 如果需要针对个别API开启mock,可以传入第二个参数为true
export const MAKE_PLAN = path('/plan/createPlan', true)
//在线投保-读取投保人信息
export const READ_APPLICANT_INFO = path('/insure/underwriting')
//在线投保-保费计算
export const CALC_INSURANCE_FEE = path('/insure/premTrial')
//在线投保-读取被保人信息
export const READ_INSURED_INFO = path('/insure/customer/loadApplicant', true)
// 用户中心
let user = '/user'
export const USER_INDEX = path(user, true)
// 产品列表
let product = '/product'
export const HOT_PRODUCT = path(product, true)

// 名片
let card = '/user/getAgentUserInformation' // /product'
export const IBUSINESS_CARD = path(card, true)

// 登录
export const LOGIN_INFO = path('/login/user', true)

export const GET_DICTITEMS = path('/login/user', true)
