<template>
  <div class="list_two_type1">
    <div class="list-box" v-for="item in list">
      <img :src="item.img_url" alt="item.product_name">
      <div class="list-box-bottom">
        <h4>{{item.product_name}}</h4>
        <h5>{{item.product_brief}}</h5>
        <span>{{item.product_price}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'vue-list-two',
    props:{
      list:{
        type:Array,
        default:[]
      }
    },
    data(){
      return {}
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/constructor.less';

  .list-box{
  .scflex;
  .vflex;
    width: 3.6rem;
    height: auto;
    float: left;
  .list-box-bottom{
    padding: .2rem .27rem;
  }
  h4{
    font-size: .28rem;
    color: rgba(0,0,0,.87);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h5{
    margin-top: .06rem;
    font-size: .23rem;
    line-height: .3rem;
    color: rgba(0,0,0,.54);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span{
    font-size: .32rem;
    color: #ff6000;
    margin-top: .08rem;
  &:before{
     content: "￥";
     font-size: .2rem;
     margin-right: .05rem;
   }
  }

  }
</style>
