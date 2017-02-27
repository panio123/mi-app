<template>
  <div class="page-wrap category has-footer">
    <vue-header :rightBtnShow="true">商品分类<span v-link="'search'" class="iconfont icon-search" slot="right"></span></vue-header>
    <div class="content">
      <div class="section" v-for="section in list">
        <vue-line v-if="section.view_type === 'divider_line'" :height="section.body.line_height" :bgcolor="section.body.line_color"></vue-line>
        <vue-auto-img v-else-if="section.view_type === 'cells_auto_fill'" :list="section.body"></vue-auto-img>
        <div class="category-title" v-else-if="section.view_type === 'category_title'">{{section.body.category_name}}</div>
        <ul class="category-group" v-else-if="section.view_type === 'category_group'">
          <li v-for="item in section.body.items" v-link="{name:'category_list'}">
            <img :src="item.img_url" alt="item.product_name">
            <h4>{{item.product_name}}</h4>
          </li>
        </ul>
      </div>
    </div>
    <vue-footer :active="'category'"></vue-footer>
  </div>
</template>
<script>
  import service from 'service'
  import VueHeader from 'components/common/header.vue'
  import VueFooter from 'components/common/footer.vue'
  import VueLine from 'components/home/line.vue'
  import VueAutoImg from 'components/home/autoImg.vue'
  export default{
    components:{
      VueHeader,
      VueFooter,
      VueLine,
      VueAutoImg
    },
    data(){
      return {
        list:[]
      }
    },
    methods:{
      getCategory(){
        let me = this;
        service.category.get().then(data=>{
          console.log(data);
          let result = data.body.data;
          me.list = result;
        });
      }
    },
    created(){
      this.getCategory();
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/constructor.less';
  @import '../../assets/css/config.less';
  .category {
    .category-title {
      background: #fff;
      font-size: .28rem;
      text-align: center;
      font-weight: 400;
      margin-top: .2rem;
      height: 1.28rem;
      line-height: 1.28rem;
      overflow: hidden;
    }
    .category-group {
      width: 100%;
      overflow: hidden;
      li {
        .ccflex;
        .vflex;
        width: 33.33333%;
        float: left;
        img {
          width: 1.2rem;
        }
        h4 {
          text-align: center;
          line-height: 3;
          margin-top:0.1rem;
          margin-bottom:0.3rem;
        }
      }
    }
  }

</style>
