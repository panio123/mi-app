<template>
  <div class="page-wrap cart-page">
    <vue-header :rightBtnShow="true">购物车<span v-link="'search'" class="iconfont icon-search" slot="right"></vue-header>
    <div class="no-login-wrap">
      <div class="flex flex_a_c flex_j_b login-tips">
        <span class="tips">登录后享受更多优惠</span>
      <span class="go-login" v-link="'login'">去登录<i class="iconfont icon-more"></i></span>
  </div>
  </div>
  <div class="no-goods-wrap">
    <div class="flex flex_a_c flex_j_c no-goods">
      <span class="iconfont icon-Emptyshoppingcart"></span>
      <span class="empty-tips">购物车还是空的</span>
      <span class="go-buy" v-link="'home'">去逛逛</span>
    </div>
    <h3>为你推荐</h3>
    <ul>
      <li class="flex flex_v flex_a_c flex_j_c recom-list" v-for="item in recommendList" v-link="{name:item.action.type,query:{id:item.action.path}}">
        <img :src="item.image_url" :alt="item.name">
        <div class="product-list-info info">
          <h4>{{item.name}}</h4>
          <span>{{item.price}}</span>
        </div>
      </li>
    </ul>
  </div>
  <vue-footer :active="'cart'"></vue-footer>
  </div>
</template>
<script>
import service from 'service'
import VueHeader from 'components/common/header.vue'
import VueFooter from 'components/common/footer.vue'
  export default{
    components: {
      VueHeader,
      VueFooter
    },
    data(){
      return {
        recommendList:[]
      }
    },
    methods:{
      getRecommend(){
        let me = this;
        service.recommend.get().then(data=>{
          let result = data.body.data;
          console.log(result);
          me.recommendList = result.recom_list;
        })
      }
    },
    created(){
      this.getRecommend();
    }
  }
</script>
<style lang="less">
  @import '../assets/css/config.less';
  .cart-page {
    .login-tips {
      height: 1rem;
      padding: 0 0.4rem;
      .tips {
        font-size: .32rem;
        color: rgba(0, 0, 0, 0.87);
      }
      .go-login {
        font-size: .24rem;
        color: @baseColorHG;
        .iconfont {
          font-size: 0.2rem;
        }
      }
    }
    .no-goods-wrap {
      h3 {
        height: .8rem;
        line-height: .8rem;
        background: #fff;
        font-size: .3rem;
        padding: 0 .32rem;
      }
      ul{
        padding: 0 0.05rem;
      }
      .recom-list{
        width: 3.5rem;
        float: left;
        margin-bottom: 0.3rem;
      }
      .recom-list:nth-child(odd){
        margin-right:0.1rem;
      }
      .info{
        width: 100%;
        padding: 0.1rem 0.3rem 0;
        text-align: left;
      }
    }
    .no-goods {
      background: @baseBGColorHG;
      height: 1rem;
      color: @baseColorHG;
      .iconfont {
        font-size: 0.7rem;
      }
      .go-buy {
        display: inline-block;
        border: 1px solid @baseBRColorH;
        padding: 0.05rem 0.15rem;
        margin-left: 0.1rem;
      }
    }
  }

</style>
