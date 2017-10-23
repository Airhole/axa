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
        <img src="placeholder.it/240x240">
        <h2>保险公司产品名称XXX</h2>
        <h3>XXX保险公司</h3>
        <p>特色描述XX XX xx xx xxx xxx</p>
        <div class="bar">
          <a href>203.00 起</a>
        </div>
      </li>
      <li>
        <img src="placeholder.it/240x240">
        <h2>保险公司产品名称XXX</h2>
        <h3>XXX保险公司</h3>
        <p>特色描述XX XX xx xx xxx xxx</p>
        <div class="bar">
          <a href>203.00 起</a>
        </div>
      </li>
      <li>
        <img src="placeholder.it/240x240">
        <h2>保险公司产品名称XXX</h2>
        <h3>XXX保险公司</h3>
        <p>特色描述XX XX xx xx xxx xxx</p>
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
  import {PopupPicker, Group} from 'vux'

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
    list-style: none;
    > li {
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: rem-calc(10);
      overflow: hidden;
      line-height: rem-calc(30);
    }
    > li + li {
      margin-top: -1px;
    }
    h2, h3{
      font-weight: normal;
      font-size:rem-calc(18);
    }
    h3{
      color: #f54000;
    }
    img{
      display: block;
      width: rem-calc(120);
      height: rem-calc(120);
      float:left;
      margin-right: rem-calc(12);
    }
    .bar{
      text-align: right;
      a {
        text-decoration: none;
      }
    }
  }
</style>
<style lang="scss" scoped>
  header{
    height: rem-calc(44);
    display: flex;
    background-color: #dedede;
    select{
      flex: 1;
      height: rem-calc(44);
      border: 0 none;
      line-height: rem-calc(44);
      border-radius: 0;
      background-color: white;
      padding-left: rem-calc(8);
    }
    input {
      margin: rem-calc(5) rem-calc(8);
      height: rem-calc(34);
      line-height: rem-calc(24);
      padding: rem-calc(5) rem-calc(8);
      flex: 2;
    }
  }
</style>
