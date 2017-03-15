<template>
  <div class="page-wrap has-footer set">
    <vue-header>个人设置</vue-header>
    <cell :title="'地址管理'" is-link class="address"></cell>
    <div class="logout-wrap" @click="logout">退出登录</div>
  </div>
</template>
<script>
import VueHeader from 'components/common/header.vue'
import { Cell , Group} from 'vux'
  export default{
    components:{
      VueHeader,
      Group,
      Cell
    },
    data(){
      return {

      }
    },
    methods:{
      logout(){
        this.$store.commit('logout');
      }
    }
  }
</script>
<style lang="less">
  .set {
    .address {
      background: #fff;
      font-size: .28rem;
      height: .8rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    }
    .logout-wrap {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      text-align: center;
      height: 1rem;
      line-height: 1rem;
      background-color: #F4F4F4;
    }
  }

</style>
