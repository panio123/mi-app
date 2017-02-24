<template>
  <div class="back-top-wrap" @click="goTop" v-show="show">
    <img src="http://m.mi.com/views/index/img/top_1a2bcd9.png" alt="backTop">
  </div>
</template>
<script>
  export default{
    name:'vue-back-top',
    props:{
      callback:{
        type:Function
      },
      node:{
        default:()=>{
          return document.body
        }
      },
      show:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {}
    },
    methods:{
      goTop(){
        this.node.scrollTop = 0;
        if(typeof this.callback === 'function') {
          this.callback();
        }
      }
    }
  }
</script>
<style>
  .back-top-wrap{
    width:0.8rem;
    position: fixed;
    bottom: 1.3rem;
    right: 0.5rem;
    overflow: hidden;
    -webkit-border-radius:50%;
    border-radius:50%;
  }
</style>
