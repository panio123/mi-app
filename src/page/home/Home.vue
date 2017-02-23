<template>
  <div class="page-wrap" id="home-page">
    <div class="home-header-wrap" :style="{background:'rgba(229, 131, 59,' + bgColor + ')'}">
      <div class="logo">
        <img src="http://m.mi.com/component/header/img/logo_e6453b2.png" alt="logo">
      </div>
      <div class="search-box">
          <router-link to="search">搜索商品名称</router-link>
      </div>
      <div class="login">
        <img src="http://m.mi.com/component/header/img/user_0319ba0.png" alt="login">
      </div>
    </div>
    <div class="home-swiper-box">
      <swiper :list="imgList" :auto="true" :loop="true" :show-desc-mask="false" height="260px"></swiper>
    </div>
    <div class="content">
      <div class="section-box" v-for="section in sectionsList">
        <vue-broadcast v-if="section.view_type === 'list_broadcast'" :list="section.body.items" :logo="section.body.title_logo_url"></vue-broadcast>
        <vue-line v-else-if="section.view_type === 'divider_line'" :height="section.body.line_height" :bgcolor="section.body.line_color"></vue-line>
        <vue-auto-img v-else-if="section.view_type === 'cells_auto_fill'" :list="section.body"></vue-auto-img>
        <vue-list-two v-else-if="section.view_type === 'list_two_type1'" :list="section.body.items"></vue-list-two>
        <vue-list-one v-else-if="section.view_type === 'list_one_type2'" :list="section.body.items"></vue-list-one>
        <div v-else-if="section.view_type === 'list_action_title'" class="list_action_title">
          <a>
            {{section.body.items[0].action_title}}>
          </a>
        </div>
      </div>
      <div class="section-box" v-for="section in sectionsList2">
        <vue-broadcast v-if="section.view_type === 'list_broadcast'" :list="section.body.items" :logo="section.body.title_logo_url"></vue-broadcast>
        <vue-line v-else-if="section.view_type === 'divider_line'" :height="section.body.line_height" :bgcolor="section.body.line_color"></vue-line>
        <vue-auto-img v-else-if="section.view_type === 'cells_auto_fill'" :list="section.body"></vue-auto-img>
        <vue-list-two v-else-if="section.view_type === 'list_two_type1'" :list="section.body.items"></vue-list-two>
        <vue-list-one12 v-else-if="section.view_type === 'list_one_type12'" :list="section.body.items"></vue-list-one12>
        <div v-else-if="section.view_type === 'list_action_title'" class="list_action_title">
          <a>
            {{section.body.items[0].action_title}}>
          </a>
        </div>        
      </div>
    </div>
    <vue-back-top :show="backTopShow"></vue-back-top>
  </div>
</template>
<script>
  import service from 'service'
  import {Swiper} from 'vux'
  import VueBroadcast from 'components/home/broadcast.vue'
  import VueLine from 'components/home/line.vue'
  import VueAutoImg from 'components/home/autoImg.vue'
  import VueListTwo from 'components/home/listTwo.vue'
  import VueListOne from 'components/home/listOne.vue'
  import VueListOne12 from 'components/home/listOne12.vue'
  import VueBackTop from 'components/common/backTop.vue'
  export default {
    name: 'home',
    components: {
      Swiper,
      VueBroadcast,
      VueLine,
      VueAutoImg,
      VueListTwo,
      VueListOne,
      VueListOne12,
      VueBackTop
    },
    data() {
      return {
        bgColor:0,
        backTopShow:false,
        imgList: [],
        sectionsList:[],
        sectionsList2:[]
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
      },
      getList(){
        let me = this;
        service.homeList.get().then(data=> {
          let result = data.body.data;
          me.sectionsList = result.sections;
          me.getImgList(result.header.body.items);
          me.getList2();
        })
      },
      getList2(){
        let me = this;
        service.homeList2.get().then(data=> {
          let result = data.body.data;
          me.sectionsList = me.sectionsList.concat(result.sections);
        })
      },
      listenScroll(e,type){
        let me = this,
          scrollTop = e.target.body.scrollTop;
          if(me.bgColor < 1 && scrollTop >= 200){
            me.bgColor += 0.1;
            if(type){
              me.bgColor = 1;
            }
          }else if(me.bgColor > 0 && scrollTop < 200){
            me.bgColor -= 0.1;
            if(scrollTop === 0){
              me.bgColor = 0;
            }
          }
          if(scrollTop > 400){
            me.backTopShow = true;
          }else{
            me.backTopShow = false;
          }
      }
    },
    created(){
      this.getList();
      this.getList2();
    },
    mounted(){
      document.addEventListener('scroll',this.listenScroll);
    },
    updated(){
      this.$nextTick(()=>{
        this.listenScroll({target:document},true);
      })
    }
  }
</script>

<style lang="less">
/*http://img01.mifile.cn/m/source/img/milogo.png*/
/*http://m.mi.com/component/footer/img/spr1_5b2e09c.png*/
  @import '../../assets/css/constructor.less';
  .home-header-wrap {
    .ccflex;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0.2rem 0;
    z-index: 999;
    .logo,
    .login {
      width: 1rem;
      img {
        display: block;
        width: 0.5rem;
        margin: auto;
      }
    }
    .login img {
      width: 0.3rem;
    }
    .search-box {
      width: 5.2rem;
      height: .53rem;
      border-radius: 3px;
      line-height: .34rem;
      overflow: hidden;
      background-image: url("http://m.mi.com/component/header/img/search_bfba941.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      a {
        font-size: 0.15rem;
        color: rgba(0, 0, 0, 0.3);
        padding-left: 0.55rem;
        padding-top: 0.1rem;
        box-sizing:border-box;
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
  }
  
  .section-box {
    position: relative;
    overflow: hidden;
  }
  
  .list_action_title {
    height: 1rem;
    line-height: 1rem;
    font-size: .28rem;
    text-align: center;
    background: #fff;
  }

</style>
