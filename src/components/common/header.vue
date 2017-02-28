<template>
  <header class="flex flex_a_c flex_j_a">
    <slot name="left" v-if="leftBtnShow">
      <span class="iconfont icon-backlight" v-back></span>
    </slot>
    <h3>
      <slot></slot>
    </h3>
    <slot name="right" v-if="rightBtnShow"></slot>
    <span v-if="!rightBtnShow"></span>
  </header>
</template>
<script>
  export default{
    name: 'vue-header',
    props: {
      leftBtnShow:{
        type:Boolean,
        default:true
      },
      rightBtnShow:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {

      }
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/config.less';
  header {
    text-align: center;
    height: .84rem;
    border-bottom: 1px solid @baseColorWhite;
    background: @baseBGColorHG;
    color: @baseFontColorH;
    span {
      margin: 0 0.3rem;
    }
    h3 {
      font-size: .3rem;
      font-weight: 400;
      flex-grow: 1;
    }
  }

</style>
