<template>
  <div class="list_two_type1">
    <div class="flex flex_v flex_a_s flex_j_c list-box" v-for="item in list">
      <img :src="item.img_url" alt="item.product_name">
      <div class="product-list-info list-box-bottom">
        <h4>{{item.product_name}}</h4>
        <h5>{{item.product_brief}}</h5>
        <span>{{item.product_price}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'vue-list-two',
    props:{
      list:{
        type:Array,
        default:[]
      }
    },
    data(){
      return {}
    }
  }
</script>
<style lang="less">
  .list-box {
    width: 3.6rem;
    height: auto;
    float: left;
    .list-box-bottom {
      padding: .2rem .27rem;
      width: 100%;
    }
  }

</style>
