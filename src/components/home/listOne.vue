<template>
  <div class="list_one_type2">
    <div class="flex flex_a_c flex_j_c box" v-for="item in list">
      <img :src="item.img_url" :alt="item.product_name">
      <div class="product-list-info info">
        <h4>{{item.product_name}}</h4>
        <h5>{{item.product_brief}}</h5>
        <span>{{item.product_price}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'vue-list-one',
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    data(){
      return {}
    }
  }
</script>
<style lang="less">
  .list_one_type2 {
    .box {
      .info,
      img {
        width: 3.6rem;
        height: 3.6rem;
      }
      .info {
        padding: 1rem 0.3rem;
        h5 {
          -webkit-line-clamp: 2;
          white-space: normal;
        }
      }
    }
  }

</style>
