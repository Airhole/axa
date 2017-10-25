import Vue from 'vue'

import dateFormat from './dateFormat'
Vue.filter('dateFormat', dateFormat)  //  格式化一个Date对象，参数为日期格式。日期格式无默认
//  过滤器toDate, toTime是dateFormat的便捷过滤器，它们提供了相似的功能

import toDate from './toDate'
Vue.filter('toDate', toDate)  //  format = 'yyyy-MM-dd'

import toTime from './toTime'
Vue.filter('toTime', toTime)  //  format = 'yyyy-MM-dd hh:mm'

import bankCard from './bankCard'
Vue.filter('bankCard', bankCard)  //  银行卡号码格式化，无参数

import mosaic from './mosaic'
Vue.filter('mosaic', mosaic)  //  将手机号码中间4位马赛克，无参数

import maxLength from './maxLength'
Vue.filter('maxLength', maxLength)  //  长度限定

import number from './number'
Vue.filter('number', number)  //  数字筛选器，过滤掉非数字部分

