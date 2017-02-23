<template>
  <div class="page-wrap has-header search-page">
    <div class="header">
      <span class="iconfont icon-shouye" v-link="'home'"></span>
      <input type="text" @input="input" v-model="txt">
      <span class="iconfont icon-sousuo"></span>
    </div>
    <div class="content">
      <div class="title">热门搜索</div>
      <div class="add-box" v-if="list.ad_list.length" v-for="item in list.ad_list">
        <vue-auto-img v-if="item.view_type === 'cells_auto_fill'" :list="item.body"></vue-auto-img>
      </div>
      <ul class="keyword-list">
        <li v-for="item in list.keywords" :style="{background:item.back_n,border:'1px solid '+item.border_n,color:item.font_n}">
          {{item.word}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import service from 'service'
  import VueAutoImg from 'components/home/autoImg.vue'
  export default{
    components:{
      VueAutoImg
    },
    data(){
      return {
        list:[],
        txt:''
      }
    },
    methods:{
      input(){
        
      }
    },
    created(){
      let me = this;
        service.search_default.get().then(data=>{
          console.log(data);
          let result = data.body.data;
          me.list = result;
        })
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/constructor.less';
  .search-page {
    .header {
      .ccflex;
      height: 1rem;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #F5F5F5;
      .iconfont {
        padding: 0 0.2rem 0 0.1rem;
        font-size: .6rem;
        line-height: .5rem;
        color: #999;
      }
      input {
        height: 0.4rem;
        border: 1px solid #ccc;
        padding: .1rem .2rem;
        background: #FFF;
        -webkit-box-flex: 1;
        box-flex: 1;
        flex-grow: 1;
      }
    }
    .title{
      line-height: 0.9rem;
      text-indent: .3rem;
      font-size:0.3rem;
    }
    .keyword-list {
      overflow: hidden;
      padding: 0 0.2rem;
      li{
        display: inline-block;
        float: left;
        padding:0.1rem 0.2rem;
        margin: 0.1rem;
      }
    }
  }

</style>
