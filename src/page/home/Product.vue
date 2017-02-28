<template>
  <div class="page-wrap product-page has-footer">
    <div class="head">
      <div class="fixed-bar">
        <span class="left iconfont icon-roundleftfill" v-back></span>
        <span class="right iconfont icon-search" v-link="'search'"></span>
      </div>
      <swiper :list="bannerList" :auto="true" :loop="true" :show-desc-mask="false" height="7.92rem"></swiper>
      <div class="product-info">
        <div class="flex flex_a_c flex_j_b main-info-box">
          <div class="main-info product-list-info info">
            <h4>{{title}}</h4>
            <span>{{data.price_max}}</span>
          </div>
          <div class="share-btn iconfont icon-share_light"></div>
        </div>
        <div class="product-desc">
          <h5 v-html="data.product_desc"></h5>
        </div>
        <ul class="product-color-list">
          <li v-for="item in commodity_list" @click="selectColor(item)" :class="{on:item.active}">{{item.icon_name}}</li>
        </ul>
        <ul class="product-size-list">
          <li v-for="item in selectedColor.goods_list" @click="selectSize(item)" :class="{on:item.active}">{{item.spec_value_name}}</li>
        </ul>
        <div class="tab-wrap">
          <ul class="flex flex_a_c flex_j_b tab-bar-box">
            <li class="flex_g_1" v-for="(item,index) in data.body_list" @click="tabId = index" :class="{on:tabId === index}"><span>{{item.name}}</span></li>
          </ul>
          <ul class="tab-content-box">
            <li v-for="(item,index) in data.body_list" v-show="tabId === index">
              <img v-for="img in item.tab_content" v-if="img.view_type === 'plain_view'" :src="img.plain_view.img">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="flex flex_a_c flex_j_a footer">
      <span class="iconfont icon-home" v-link="'home'"></span>
      <div class="flex_g_1 btn">立即购买</div>
      <span class="iconfont icon-cart" v-link="'cart'"></span>
    </div>
    <vue-back-top :show="backTopShow"></vue-back-top>
  </div>
</template>
<script>
import service from 'service';
import {Swiper} from 'vux'
import VueBackTop from 'components/common/backTop.vue'
  export default{
    components:{
      Swiper,
      VueBackTop
    },
    data(){
      return {
        title:'',
        tabId:0,
        backTopShow:false,
        data:{},
        bannerList:[],
        commodity_list:[],
        selectedColor:{},
        selectedSize:{}
      }
    },
    methods:{
      selectSize(item){
        let me = this;
        me.selectedSize.active = false;        
        me.selectedSize = item;
        me.$set(item,'active',true);
      },
      selectColor(item){
        let me = this;
        console.log(item);
        me.selectedColor.active = false;
        me.title = item.name;
        me.selectedColor = item;
        me.$set(item,'active',true);
        me.selectSize(item.goods_list[0]);
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
        me.selectColor(me.commodity_list[0]);
        me.selectSize(me.commodity_list[0].goods_list[0]);
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
      padding: 0.3rem 0.2rem 0 0.2rem;
    }
    .product-desc {
      padding: 0.3rem 0.2rem 0 0.2rem;
      color: rgba(0, 0, 0, .54);
    }
    .product-color-list,
    .product-size-list {
      padding: 0.3rem 0.2rem 0 0.2rem;
      li {
        font-size: .24rem;
        line-height: .6rem;
        color: @baseColorHG;
        display: inline-block;
        border: 1px solid @baseBRColor;
        overflow: hidden;
        text-align: center;
        padding: 0 .3rem;
        margin-right: .15rem;
        &.on {
          border-color: @baseColorY;
        }
        &.off {
          background: @baseBGColorHG;
          opacity: .8;
        }
      }
    }
    .tab-wrap {
      margin-top: 0.45rem;
    }
    .tab-bar-box {
      width: 100%;
      padding: .28rem 0;
      text-align: center;
      border-top: 1px solid @baseColorLG;
      li {
        &.on {
          color: @baseColorY;
        }
        span {
          display: inline-block;
          width: 100%;
          border-right: 1px solid @baseColorLG;
        }
      }
      li:last-child {
        span {
          border-right: none;
        }
      }
    }
    .footer {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      background: #FFF;
      border-top: 1px solid @baseBRColor;
      text-align: center;
      padding: .12rem 0.3rem;
      .btn {
        margin: 0 0.3rem;
        height: 100%;
        font-size: .3rem;
        line-height: .86rem;
        color: #fff;
        border-radius: .05rem;
        background: @baseColorY;
      }
    }
  }

</style>
