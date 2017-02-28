<template>
  <div class="list_one_type12">
    <div class="box" v-for="item in list">
      <img :src="item.img_url" :alt="item.product_name">
      <div class="product-list-info info">
        <div class="flex flex_a_c flex_j_b">
          <h4>{{item.product_name}}</h4>
          <span>{{item.product_org_price}}<a v-if="item.show_price_qi === true">起</a></span>
        </div>
        <h5>{{item.product_brief}}</h5>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: '',
    props: {
      list:{
        type:Array,
        default:[]
      }
    },
    data(){
      return {

      }
    }
  }
</script>
<style lang="less">
  .list_one_type12 {
    .info {
      padding: .2rem .27rem;
    }
  }

</style>
