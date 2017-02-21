<template>
  <div class="page-wrap" id="home-page">
    <div class="home-header-wrap">
      <div class="logo">
        <img src="http://m.mi.com/component/header/img/logo_e6453b2.png" alt="logo">
      </div>
      <div class="search-box"></div>
      <div class="login">
        <img src="http://m.mi.com/component/header/img/user_0319ba0.png" alt="login">
      </div>
    </div>
    <div class="home-swiper-box">
      <swiper :list="imgList" :auto="true" :loop="true" :show-desc-mask="false" height="260px"></swiper>
    </div>
  </div>
</template>
<script>
  import service from '../../service'
  import {Swiper} from 'vux'
  export default {
    name: 'home',
    components: {
      Swiper
    },
    data() {
      return {
        test: 12414,
        imgList: []
      }
    },
    methods: {
      getImgList(data){
        let me = this;
        data.forEach(item=> {
          let a = {};
          a.img = item.img_url;
          a.title = '';
          a.url = me.parseUrl(item.action);
          me.imgList.push(a);
        });

        console.log(me.imgList);
      },
      parseUrl(action){
        let url;
        if (action.type === 'product') {
          url = '#/product/' + action.path;
        } else if (action.type === 'url') {
          url = action.path;
        } else {
          url = '';
        }
        return url;
      }
    },
    created(){
      let me = this;
      service.homeList.get().then(data=> {
        let result = data.body.data;
        console.log(result);
        me.getImgList(result.header.body.items);
      })
    }
  }
</script>

<style lang="less">
  @import '../../assets/css/constructor.less';

  .home-header-wrap {
  .vmflex;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0.3rem 0;
    z-index: 999;
  .logo,
  .login {
    width: 2.5rem;
    height: 1rem;

  img {
    display: block;
    width: 1.5rem;
    margin: auto;
  }

  }
  .login img {
    width: 0.8rem;
  }

  .search-box {
    width: 14rem;
    height: 1.4rem;
    border-radius: 3px;
    overflow: hidden;
    background-image: url("http://m.mi.com/component/header/img/search_bfba941.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  }
  .home-swiper-box {
  }
</style>
