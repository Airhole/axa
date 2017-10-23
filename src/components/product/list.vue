<title>产品列表</title>
<template>
  <div>
    <group>
      <popup-picker title="保险公司" v-model="selectedSupply" :data="supplies"
                    cancel-text="取消" confirm-text="确定" :show-name="true" />
      <popup-picker title="产品类型" v-model="selectedProduct" :data="products"
                    cancel-text="取消" confirm-text="确定" :show-name="true"/>
    </group>
    <h2>hello test</h2>
  </div>
</template>
<script>
  import supplies from '@/data/suppliers'
  import products from '@/data/products'
  import {PopupPicker, Group} from 'vux'
  console.log(supplies)
  export default {
    name: 'products',
    components: {PopupPicker, Group},
    data () {
      return {
        supplies: [[...supplies]],
        products: [[...products]],
        selectedSupply: [],
        selectedProduct: []
      }
    }
  }
</script>
<style lang="scss">
  h2{
    font-size: rem-calc(22);
  }

</style>
