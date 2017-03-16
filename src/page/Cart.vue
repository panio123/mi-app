<template>
  <div class="page-wrap cart-page has-footer">
    <vue-header :rightBtnShow="true">购物车<span v-link="'search'" class="iconfont icon-search" slot="right"></span></vue-header>
    <div class="no-login-wrap" v-if="!getLoginStatus">
      <div class="flex flex_a_c flex_j_b login-tips">
        <span class="tips">登录后享受更多优惠</span>
      <span class="go-login" @click="login">去登录<i class="iconfont icon-more"></i></span>
  </div>
  </div>
  <div class="no-goods-wrap" v-if="!getCartList || !getCartList.items.length || !getLoginStatus">
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
  <div class="cart-wrap" v-if="getCartList && getCartList.items.length">
    <div class="cart-list">
      <ul>
        <li class="item" v-for="(item,index) in getCartList.items">
          <div class="flex flex_a_c flex_j_b box">
            <div @click="selectGoods(item)" class="check-box" v-if="item.showType === 'buy'">
              <i class="iconfont icon-round" v-show="!item.is_available"></i>
              <i class="iconfont icon-roundcheckfill" v-show="item.is_available"></i>
            </div>
            <img :src="item.image_url" :alt="item.short_name" v-link="{name:'product',query:{id:item.product_id}}">
            <div class="flex_g_1 info">
              <h4>{{item.short_name}}</h4>
              <h5>售价：{{item.price+'元 '}}合计：{{item.subtotal+'元'}}</h5>
              <div class="flex flex_a_c flex_j_b plugin">
                <vue-count-plugin :value="item" @input="goodsNumChange" :disabled="!item.can_change_num" :max="item.buy_limit" :key="item.goodsId"></vue-count-plugin>
                <span class="iconfont icon-delete_light del-btn" @click="delGoods(index)" v-if="item.can_delete"></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="tips">温馨提示：产品是否购买成功，以最终下单为准，请尽快结算</div>
      <ul class="bargain">
        <li class="flex flex_a_c flex_j_b" v-for="item in getCartList.bargains">
          <div class="check">
            <span class="iconfont icon-square" v-show="!item.checked"></span>
            <span class="iconfont icon-squarecheck" v-show="item.checked"></span>
          </div>
          <div class="flex_g_1 title">{{item.bargain_name}}</div>
          <div class="btn">
            <span class="iconfont icon-more"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <vue-footer :active="'cart'" v-if="!getCartList || !getCartList.items.length"></vue-footer>
  <footer class="flex flex_a_c flex_j_b" v-if="getCartList && getCartList.items.length">
    <div class="price">
      <p>共{{getCartList.totalSelGoods}}件，金额：</p>
      <strong>{{getCartList.productMoneySelGoods}}<em>元</em></strong>
    </div>
    <div class="btn buy" v-link="'home'">继续购物</div>
    <div class="btn pay">去结算</div>
  </footer>
  </div>
</template>
<script>
import service from 'service'
import VueHeader from 'components/common/header.vue'
import VueFooter from 'components/common/footer.vue'
import VueCountPlugin from 'components/cart/countPlugin.vue'
  export default{
    components: {
      VueHeader,
      VueFooter,
      VueCountPlugin
    },
    data(){
      return {
        recommendList:[],
        count:10
      }
    },
    watch:{
      count:function(val){
        console.log(val);
      }
    },
    methods:{
      login(){
        this.$store.dispatch('login').then(()=>{
          this.$store.dispatch('cartList');
        });
      },
      getRecommend(){
        let me = this;
        service.recommend.get().then(data=>{
          let result = data.body.data;
          me.recommendList = result.recom_list;
        })
      },
      selectGoods(item){
        this.$store.commit('checkGoods',item);
      },
      goodsNumChange(num,item){
        this.$store.commit('changeGoodsNum',{item,num});
      },
      delGoods(index){
        this.$store.commit('delGoods',index);
      },
      setActiveItem(item){
        this.activeItem = item;
      }
    },
    computed:{
      getLoginStatus(){
        return this.$store.getters.getLoginStatus;
      },
      getCartList(){
        return this.$store.getters.getCartList;
      }
    },
    created(){
      this.$store.dispatch('cartList');
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
      ul {
        padding: 0 0.05rem;
      }
      .recom-list {
        width: 3.5rem;
        float: left;
        margin-bottom: 0.3rem;
      }
      .recom-list:nth-child(odd) {
        margin-right: 0.1rem;
      }
      .info {
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
    .cart-list {
      .item {
        .box {
          padding: 0.3rem 0.1rem;
          border-bottom: 1px solid @baseBRColor;
          .check-box {
            box-sizing: border-box;
            color: @baseColorY;
            display: block;
            text-align: center;
            width: 1rem;
            padding: 0.2rem;
            height: 100%;
            .icon-round {
              color: @baseColorLG;
            }
          }
          img {
            width: 1.8rem;
            /*height: 1.8rem;*/
            margin: 0 0.2rem;
          }
          .info {
            h4 {
              color: @baseFontColorH;
              font-size: .28rem;
              line-height: .32rem;
              margin-bottom: .12rem;
              margin-right: .3rem;
            }
            h5 {
              color: @baseColorHG;
              font-size: .24rem;
              margin-bottom: .12rem;
            }
            .del-btn {
              font-size: .4rem;
              color: @baseColorHG;
              margin-right: 0.25rem;
            }
          }
        }
      }
      .tips {
        font-size: .22rem;
        color: @baseColorHG;
        border-bottom: 0.2rem solid @baseBRColor;
        padding: .2rem .3rem;
      }
      .bargain {
        background: #fff;
        li {
          padding-left:.3rem;
          height: .8rem;
          line-height: .8rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          border-bottom: 1px solid @baseBRColor;
          .check {
            margin: 0 0.1rem;
            span {
              font-size: 0.3rem;
              color: @baseColorY;
            }
          }
          .btn {
            border-left: 1px solid @baseBRColor;
            padding:0 0.2rem;
            width: .8rem;
            color:@baseColorWhite;
          }
        }
      }
    }
    footer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1rem;
      border-top: 1px solid @baseBRColor;
      background: #FFF;
      font-size: .26rem;
      color: @baseColorHG;
      div {
        width: 2.4rem;
        text-align: center;
      }
      .btn {
        height: 1rem;
        line-height: 1rem;
      }
      .buy {
        background: @baseBGColorHG;
        color: @baseFontColor;
        border-left: 1px solid @baseBGColorHG;
        border-right: 1px solid @baseBGColorHG;
      }
      .pay {
        background: @baseColorY;
        color: #fff;
      }
      .price strong {
        font-size: .4rem;
        color: @baseColorY;
        margin-right: .2em;
        em {
          font-style: normal;
          font-size: 0.26rem;
          color: @baseColorHG;
        }
      }
    }
  }

</style>
