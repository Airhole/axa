/**
 mix 组件
 auth: jankergg
 desc: 一些表单通用方法
 */
// import {ENROLL_INTERSET} from '@/api'
export default {
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
      this.getData()
    },
    getData () {},
    onChange (val) {
      this.updateForm(val)
      // console.log('val=====', val)
    },
    updateForm (val) {
      this.formErrors = val.errorBag
      this.formStatus = val.status
      this.$nextTick(() => {
        this.form = val.value
      })
    }
  }
}
