<!--
      descript: textarea 组件
        author: rickyshin
        param: props
        example:
-->
<template>
  <div class="textarea">
    <div class="title">{{rules.title}}</div>
    <x-textarea
      @on-change="onChange"
      :placeholder="rules.placeholder"
      :max="rules.maxlength"
      :value="innerValue"
      :name="name"
      :class="{'is-danger': errorMsg()}"
      :disabled="rules.disabled">
    </x-textarea>
  </div>
</template>
<script>
  import {Group, XTextarea} from 'vux'
  import formMixin from '../mixin/rootInput-mixin'

  export default {
    name: 'root-input',
    mixins: [formMixin],
    methods: {
      onChange (val) {
        this.innerValue = val
      }
    },
    components: {
      XTextarea, Group
    }
  }
</script>

<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/function';
  .textarea {
    display: flex;
    flex-direction: column;
    .title {
      flex: 1;
      color: #333;
    }
    .weui-cell:before {
      border: none;
    }
    .weui-textarea {
      height: 90px;
      padding-left: rem-calc(5);
      border: 1px solid #dadada;
      border-radius: 0;
    }
    .vux-x-textarea {
      padding: 0 rem-calc(20) rem-calc(10) 0;
      line-height: rem-calc(20);
    }
  }
</style>
