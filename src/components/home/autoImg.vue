<template>
  <div class="cells_auto_fill" :style="parseStyle(list)">
    <div class="cells-item" v-for="item in list.items" :style="parseStyle(item)">
      <a>
        <img :src="item.img_url">
      </a>
    </div>
  </div>
</template>
<script>
  export default{
    name:'vue-auto-img',
    props:{
      list:{
        type:Object,
        default:{}
      }
    },
    data(){
      return {}
    },
    methods:{
      parseStyle(data){
        let style = {};
        style.width = data.w / 100 + 'rem';
        style.height =data.h / 100 + 'rem';
        style.top = data.y/100 + 'rem';
        style.left = data.x/100 + 'rem';
        return style
      }
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/constructor.less';
  .cells-item{
    position: absolute;
  }
</style>
