<template>
  <div class="page-wrap has-header search-page">
    <div class="flex flex_a_c flex_v_c header">
      <span class="iconfont icon-home" v-link="'home'"></span>
      <input type="text" v-model="txt" class="flex_g_1">
      <span class="iconfont icon-search"></span>
    </div>
    <div class="content">
      <div class="title">热门搜索</div>
      <div class="add-box" v-if="list.ad_list.length" v-for="item in list.ad_list">
        <vue-auto-img v-if="item.view_type === 'cells_auto_fill'" :list="item.body"></vue-auto-img>
      </div>
      <ul class="keyword-list" v-show="!txt">
        <li v-for="item in list.keywords" :style="{background:item.back_n,border:'1px solid '+item.border_n,color:item.font_n}">
          {{item.word}}
        </li>
      </ul>
      <ul class="word-list" v-show="txt">
        <li v-for="item in wordList" v-link="{name:'product',query:{product_id:item.action.extra.commodityId}}">
          {{item.keyword}}
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
        txt:'',
        wordList:[]
      }
    },
    watch:{
      txt:function(val){
        let me = this;
        console.log(val);
        if(!me.wordList.length && val){
          me.getWordList();
        }
      }
    },
    methods:{
      getWordList(){
        let me = this;
        service.word_list.get().then(data=>{
          let result = data.body.data;
          me.wordList = result;
        })
      },
      getSearchDefault(){
        let me = this;
        service.search_default.get().then(data=>{
          console.log(data);
          let result = data.body.data;
          me.list = result;
        })
      }
    },
    created(){
      this.getSearchDefault();
    }
  }
</script>
<style lang="less">
  .search-page {
    .header {
      height: 1rem;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #F5F5F5;
      .iconfont {
        padding: 0 0.2rem 0 0.1rem;
        color: #999;
      }
      input {
        height: 0.4rem;
        border: 1px solid #ccc;
        padding: .1rem .2rem;
        background: #FFF;
      }
    }
    .title {
      line-height: 0.9rem;
      text-indent: .3rem;
      font-size: 0.3rem;
    }
    .keyword-list {
      overflow: hidden;
      padding: 0 0.2rem;
      li {
        display: inline-block;
        float: left;
        padding: 0.1rem 0.2rem;
        margin: 0.1rem;
      }
    }
    .word-list li {
      padding: .2rem .3rem;
      font-size: .28rem;
      border-bottom: 1px solid #f6f6f6;
    }
  }

</style>
