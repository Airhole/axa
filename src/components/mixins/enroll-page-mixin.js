/**
 mix 组件
 auth: jankergg
 desc: 一些表单通用方法
 */
import formMixin from './form-mixin'
import {ENROLL_INTERSET} from '@/api'

export default {
  mixins: [formMixin],
  data () {
    return {
      formModels: null,
      formRules: null,
      formErrors: [],
      formStatus: '',
      form: {},
      editStep: '1',
      staffNo: '',
      entryId: '',
      options: {},
      __data: null
    }
  },
  computed: {
    isValid () {
      return this.formErrors.length === 0
    }
  },
  methods: {
    ready () {
      this.getId()
    },
    getId () {
      let staffNo = this.__getUrlParam("staffNo")
      let entryId = this.__getUrlParam("entryId")
      let id = this.__getUrlParam("id")
      if (staffNo) {
        this.options.staffNo = staffNo + ''
        // 这里通过history.length判断页面是不是首次进入, 如果是首次进入则不带入之前生成的id
        if (window.name && window.history.length > 1) {
          // console.log(window.name)
          this.options.id = JSON.parse(window.name).uid
        }
      } else if (entryId) {
        this.options.entryId = entryId + ''
      } else if (id) {
        this.options.id = id + ''
      }
      this.__data = this.getData()
    },
    getData () {
      return this.axios.post(ENROLL_INTERSET, this.options).then((res) => {
        if (res.data.success) {
          if (this.dataSetter && typeof this.dataSetter === 'function') {
            return this.dataSetter(res.data)
          } else {
            this.formModels = this.__patch(res.data.value)
          }
        }
        return res
      })
    },
    onChange (val) {
      this.updateForm(val)
      // console.log('val=====', val)
    },
    updateForm (val) {
      this.formModels = val.value
      this.formErrors = val.errorBag
      this.formStatus = val.status
      // TODO 想办法优化这段代码，formModel在初始化时的双向绑定部分未生效: web-select-item.vue
      this.$nextTick(() => {
        this.form = val.value
      })
    }
  }
}
