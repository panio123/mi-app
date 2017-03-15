<template>
  <div class="page-wrap my has-footer">
    <div class="flex flex_a_c flex_j_s header">
      <img :src="getUserInfo.img">
      <div>
        <p class="name" @click="login">{{getUserInfo.name}}</p>
        <p class="id">{{getUserInfo.id}}</p>
      </div>
    </div>
    <cell :title="'我的订单'" :value="'全部订单'" is-link class="all-orders"></cell>
    <ul class="flex flex_a_c flex_j_b order-category">
      <li>
        <span class="iconfont icon-pay"></span>
        <p>待付款</p>
      </li>
      <li>
        <span class="iconfont icon-send"></span>
        <p>待收货</p>
      </li>
      <li>
        <span class="iconfont icon-repair"></span>
        <p>退换修</p>
      </li>
    </ul>
    <group class="cell-list">
      <cell :title="'我的优惠'" is-link>
        <span slot="icon" class="iconfont icon-newsfill"></span>
      </cell>
      <cell :title="'服务中心'" is-link>
        <span slot="icon" class="iconfont icon-servicefill"></span>
      </cell>
      <cell :title="'小米之家'" is-link>
        <span slot="icon" class="iconfont icon-shopfill"></span>
      </cell>
    </group>
    <group class="cell-list">
      <cell :title="'设置'" is-link>
        <span slot="icon" class="iconfont icon-settings"></span>
      </cell>
    </group>
    <div class="logout-wrap" v-if="getLoginStatus" @click="logout">退出登录</div>
    <vue-footer :active="'my'"></vue-footer>
  </div>
</template>
<script>
import service from 'service'
import VueFooter from 'components/common/footer.vue'
import { Cell, Group } from 'vux'
  export default{
    components:{
      Cell, 
      Group,
      VueFooter
    },
    methods:{
      login(){
        this.$store.dispatch('login');
      },
      logout(){
        this.$store.commit('logout');
      }
    },
    computed:{
      getLoginStatus(){
        return this.$store.getters.getLoginStatus;
      },
      getUserInfo(){
        return this.$store.getters.getUserInfo;
      }
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/config.less';
  .my {
    background: @baseBRColor;
    height: 100vh;
    .header {
      background: url('http://m.mi.com/views/user/index/img/bg_0425a88.png') center 0 @baseColorY;
      background-size: auto 100%;
      padding: .32rem 0;
      img {
        margin: 0 .16rem 0 .32rem;
        width: .96rem;
        min-width: .96rem;
        height: .96rem;
        overflow: hidden;
        box-sizing: border-box;
        border-radius: 100%;
        border: 3px solid rgba(255, 255, 255, .4);
      }
      .name {
        margin-right: .16rem;
        font-size: .28rem;
        color: #fff;
      }
      .id {
        color: #fff;
        font-size: .24rem;
        opacity: .6;
      }
    }
    .all-orders {
      background: #fff;
      font-size: .28rem;
      height: .8rem;
      border-bottom: 1px solid rgba(0, 0, 0, .15);
    }
    .order-category {
      background: #fff;
      padding: 0 .8rem;
      li {
        text-align: center;
        font-size: .25rem;
        padding: .4rem 0;
        color: rgba(0, 0, 0, .87);
        .iconfont {
          font-size: .6rem;
          margin-bottom: 0.3rem;
          color: @baseColorLG;
        }
        p {
          margin-top: 0.1rem;
        }
      }
    }
    .cell-list {
      .weui_cells {
        font-size: 0.28rem;
      }
      .iconfont {
        margin-right: 0.1rem;
      }
      .icon-newsfill {
        color: #50bddf;
      }
      .icon-servicefill {
        color: #fe6c5c;
      }
      .icon-shopfill {
        color: @baseColorY;
      }
      .icon-settings {
        color: #7e8a93;
      }
    }
    .logout-wrap {
      width: 5rem;
      margin: 1rem auto 0;
      border-radius: 5px;
      text-align: center;
      height: 1rem;
      line-height: 1rem;
      background-color: @baseColorLG;
    }
  }

</style>
