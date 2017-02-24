<template>
  <div id="footer">
    <ul>
      <li v-for="item in list" :class="{'active':item.active}">
        <div class="iconfont" :class="[item.icon,item.active === true?item._icon:'']"></div>
        <span>{{item.label}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    name: 'vue-footer',
    props: {
      active:{
        type:String,
        default:'home'
      }
    },
    data(){
      return {
        list:{
          home:{
            label:'首页',
            icon:'icon-home',
            _icon:'icon-homefill',
            active:false
          },
          category:{
            label:'分类',
            icon:'icon-sort',
            _icon:'icon-sortfill',
            active:false
          },
          cart:{
            label:'购物车',
            icon:'icon-cart',
            _icon:'icon-cartfill',
            active:false
          },
          my:{
            label:'我的',
            icon:'icon-my',
            _icon:'icon-myfill',
            active:false
          }
        }
      }
    },
    created(){
      let key = this.active;
      this.list[key].active = true;
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/config.less';
  @import '../../assets/css/constructor.less';
  #footer {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 0.9rem;
    border-top: 1px solid #e0e0e0;
    ul{
      .ccflex;
      height:100%;
      text-align: center;
      justify-content: space-around;
      color:@baseColorHG;
      .active{
        color: @baseColorY;
      }
    }
  }

</style>
