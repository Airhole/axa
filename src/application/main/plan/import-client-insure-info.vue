<template>
  <!-- 主、附险信息 -->
  <div class="form">
    <template v-for="(insItem, index) in formMods" v-if="insItem.abbrName">
      <insurance-unit :order="index" :insItem="insItem" :index="index" @formChange="onChange">
        <template slot="unit-title" slot-scope="unit">
          <div class="baseBox title">
            <div class="main nonflex title">
              <div class="head">
                <div class="msg">保险计划</div>
                <!-- 暂不放出附加险 -->
                <!-- <div class="act-btn add-unit" v-if="unit.order==0" @click="addOneForm">添加附加险</div> -->
                <!-- <div class="act-btn delete-unit" v-else @click="onDelted(insItem, index)">删除</div> -->
              </div>
            </div>
          </div>
        </template>
      </insurance-unit>
    </template>
  </div>
  <!-- 主、附险信息 -->
</template>

<script>
  import insuranceUnit from '@/components/unit/insurance-unit'
  import multiInsureMixin from '@/components/mixins/multi-insure-form-mixin'
  //  import {ENROLL_SUBMMIT, ENROLL_INTERSET, QUERY_DICT} from '@/api'
  import defaultBtn from '@/components/base/default-btn.vue'

  export default {
    name: 'insurance-info',
    data () {
      return {
        formMods: this.$insureList
      }
    },
    mixins: [multiInsureMixin],
    components: {
      insuranceUnit,
      defaultBtn
    },
    props: ['insureList'],
    computed: {
      $insureList: {
        get () {
          let obj = {}
          if (this.insureList && this.insureList.length) {
            this.insureList.forEach((item, index) => {
              obj[index] = item
            })
          }
          return obj
        },
        set (form) {
          let obj = {}
          if (form && form.length) {
            form.forEach((item, index) => {
              obj[index] = item
            })
          }
          this.formMods = obj
        }
      }
    },
    watch: {
      insureList: {
        deep: true,
        handler (v) {
          if (v) {
            this.$insureList = v
            if (!this.defaultModel) {
              this.defaultModel = JSON.stringify(_v)
            }
          }
        }
      }
    },
    methods: {
      init () {
        window.ii = this
      }
    }
  }
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/function';

  .page_applicant-info {
    @include fullpage;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .form {
      margin: 0 0 rem-calc(50) 0;
    }
    .btn-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      margin: rem-calc(25) 0 0 0;
      display: flex;
      line-height: rem-calc(50);
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: rem-calc(16);
      border-top: 1px solid #e9e9e9;
      .pre-step {
        flex: 3;
        color: #666;
        background: #fff;
        span {
          color: #20aee5;
        }
      }
      .next-step {
        flex: 2;
        background: #20aee5;
        color: #fff;
      }
    }
  }

</style>
