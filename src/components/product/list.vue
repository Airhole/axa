<title>产品列表</title>
<template>
  <div>
    <header>
      <select>
        <option value="">保险公司</option>
        <option v-for="option in supplies" :key="option.id" :value="option.id">{{option.name}}</option>
      </select>
      <select>
        <option value="">产品类型</option>
        <option v-for="option in products" :key="option.id" :value="option.id">{{option.name}}</option>
      </select>
      <input type="search" placeholder="搜索（输入产品名称）">
    </header>
    <ul class="list-product">
      <li>
        <h2>保险公司产品名称XXX</h2>
        <h3>XXX保险公司</h3>
        <p>特色描述XX XX xx xx xxx xxx</p>
        <img src="placeholder.it/240x240">
        <div class="bar">
          <a href>203.00 起</a>
        </div>
      </li>
    </ul>

  </div>
</template>
<script>
  import supplies from '@/data/suppliers'
  import products from '@/data/products'
  export default {
    name: 'products',
    components: {},
    data () {
      return {
        supplies: [...supplies],
        products: [...products],
        selectedSupply: null,
        selectedProduct: null
      }
    }
  }
</script>
<style lang="scss">
  .list-product{
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    + .list-product {
      margin-top: -1px;
    }
  }

</style>
