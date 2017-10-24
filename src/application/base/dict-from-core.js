/**
 * author: rickyshin
 * select数据字典
 * 有包含'(核心接口)'这样的标志的数据 和 从核心接口传过来的数据一致,为了避免不必要的请求，把这些数据在前端进行维护
 */
export default {
  // 学历 (核心接口)
  core_degree: ["博士以上", "硕士", "本科", "大专", "中专", "高中", "初中", "其他", "本科在读", "大专在读"],
  // 民族 (核心接口)
  nation: ["汉族", "满族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "蒙古族", "侗族", "瑶族", "白族", "土家族", "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族", "土族", "达翰尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛难族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族", "俄罗斯族", "鄂温克族", "崩龙族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族", "其它族", "入籍族"],
  // 银行 (核心接口) (银行建议最好使用接口进行请求，变动可能性比较大)
  core_bank_code: ["中国农业银行总行", "中国工商银行总行", "中国建设银行总行", "农村商业银行总行", "东莞农村商业银行", "清远农商行", "珠海华润银行股份有限公司", "中国银行总行", "广州市禛泰保险代理有限公司", "广东神华保险代理有限公司", "华康保险代理有限公司", "广东鼎智保险代理有限公司", "广州市仁华保险代理有限公司", "珠海诚信保险代理有限公司", "中山德保保险代理有限公司", "广州伟逸盛邦保险代理有限公司", "广州安晟达保险代理有限公司", "金惠家保险代理有限公司广州分公司", "广州全家康保险销售服务有限公司", "诺爱保险代理有限公司", "东莞市名车管家保险代理有限公司", "中山德保保险代理有限公司", "广州鸿泰世纪保险代理有限公司", "明亚保险经纪有限公司广东分公司", "上海懿玖保险经纪有限公司", "金诚国际保险经纪有限公司", "华润保险经纪有限公司", "黎明保险经纪有限公司"],
  // 婚姻状况 (核心接口)
  marryStatus: ["未婚", "已婚", "离异"],
  // 工作年限
  workingLife: ['1年', '2年', '3年', '4年', '5年', '6年', '7年', '8年', '9年', '10年', '11年', '12年', '13年', '14年', '15年', '16年', '17年', '18年', '19年', '20年', '21年', '22年', '23年', '24年', '25年', '26年', '27年', '28年', '29年', '30年', '31年', '32年', '33年', '34年', '35年', '36年', '37年', '38年', '39年', '40年', '41年', '42年', '44年', '44年', '45年', '46年', '47年', '48年', '49年', '50年', '51年', '52年', '55年', '55年', '55年', '56年', '57年', '58年', '59年', '60年'],
  // 政治面貌 (核心接口)
  politicalStatus: ['群众', '团员', '党员', '其它'],
  // 健康状况
  healthStatus: ['很健康', '健康', '一般', '差', '很差'],
  // 子女数量
  children: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
}