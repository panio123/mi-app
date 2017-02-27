<template>
  <div class="page-wrap product-page">
    <div class="head">
      <div class="fixed-bar">
        <span class="left iconfont icon-roundleftfill"></span>
        <span class="right iconfont icon-search"></span>
      </div>
      <swiper :list="bannerList" :auto="true" :loop="true" :show-desc-mask="false" height="7.92rem"></swiper>
      <div class="product-info">
        <div class="main-info-box">
          <div class="main-info product-list-info info">
            <h4>{{title}}</h4>
            <span>{{data.price_max}}</span>
          </div>
          <div class="share-btn iconfont icon-share_light"></div>
        </div>
        <div class="product-desc">
          <h5 v-html="data.product_desc"></h5>
        </div>
        <ul>
          <li v-for="item in commodity_list" @click="selectColor(item)">{{item.icon_name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import service from 'service';
import {Swiper} from 'vux'
  export default{
    components:{
      Swiper
    },
    data(){
      return {
        title:'',
        data:{},
        bannerList:[],
        commodity_list:[]
      }
    },
    methods:{
      selectColor(item){
        let me = this;
        console.log(item);
        me.title = item.name;
      },
      getBannerList(data){
        let me = this;
        data.forEach(item=> {
          let a = {};
          a.img = item;
          a.title = '';
          a.url = '';
          me.bannerList.push(a);
        });
      },
      setDefaultVal(data){
        let me = this;
        me.data = data;
        me.title = data.name;
        me.commodity_list = data.commodity_list;
      },
      getDetail(){
        let me = this,
          id = me.$route.query.id;
        service.getProduct(id).get().then(data=>{
          let result = data.body.data;
          me.getBannerList(result.gallery_img);
          me.setDefaultVal(result);
        })
      }
    },
    created(){
      this.getDetail();
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/config.less';
  @import '../../assets/css/constructor.less';
  .product-page {
    position: relative;
    .fixed-bar {
      position: absolute;
      z-index: 500;
      width: 100%;
      top: 0;
      left: 0;
      padding: 0.2rem 0.5rem;
      color: #fff;
      .left {
        float: left;
      }
      .right {
        float: right;
      }
    }
    .main-info-box {
      .ccflex;
      padding: 0.3rem 0.2rem 0 0.2rem;
      justify-content: space-between;
    }
    .product-desc {
      padding: 0.3rem 0.2rem 0 0.2rem;
      color: rgba(0, 0, 0, .54);
    }
  }

</style>
