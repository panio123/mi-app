<template>
  <div class="divider_line" :style="{height:height/100+'rem',background:bgcolor}"></div>
</template>
<script>
  export default{
    name: 'vue-line',
    props: {
      height:{
        type:[Number,String],
        default:0
      },
      bgcolor:{
        type:String,
        default:'#fff'
      }
    },
    data(){
      return {}
    }
  }
</script>
<style></style>
