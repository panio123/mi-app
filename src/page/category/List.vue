<template>
  <div class="page-wrap category-list">
    <vue-header :rightBtnShow="true">商品分类<span v-link="'search'" class="iconfont icon-search" slot="right"></span></vue-header>
    <div class="flex flex_a_c flex_j_s box" v-for="item in list" v-link="{name:'product',query:{id:item.id}}">
      <div class="img">
        <img :src="item.img_url" alt="item.name">
      </div>
      <div class="product-list-info info">
        <h4>{{item.name}}</h4>
        <h5 class="double-line">{{item.product_comment}}</h5>
        <span>{{item.market_price_max}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import VueHeader from 'components/common/header.vue'
import service from 'service'
  export default{
    components:{
      VueHeader
    },
    data(){
      return {
        list:[]
      }
    },
    methods:{
      getList(){
        service.category_list.get().then(data=>{
          console.log(data);
          this.list = data.body.data.list;
        })
      }
    },
    created(){
      this.getList();
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/config.less';
  .category-list .box {
    margin-bottom: 0.05rem;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 3.08rem;
      right: 0;
      border-bottom: 1px solid @baseColorLG;
    }
    .img {
      width: 3rem;
      flex-shrink: 0;
    }
    .info {
      padding: 0 0.3rem;
    }
  }

</style>
