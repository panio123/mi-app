<template>
  <div class="vue-count-plugin" :class="{disabled:disabled}">
    <span class="iconfont icon-move" :class="{off:minStop||disabled}" @click="sub"></span>
    <span class="view">{{val}}</span>
    <span class="iconfont icon-add" :class="{off:maxStop||disabled}" @click="add"></span>
  </div>
</template>
<script>
  export default{
    name: 'vue-count-plugin',
    props: {
      value:{
        type:[Number,Object],
        default:0
      },
      max:{
        type:Number,
        default:10000
      },
      min:{
        type:Number,
        default:1
      },
      step:{
        type:Number,
        default:1
      },
      disabled:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        val:0,
        maxStop:false,
        minStop:true
      }
    },
    watch:{
      val:function(newVal){
        this.$emit('input',newVal,this.value);
        if(this.val >= this.max){
          this.maxStop = true;
          return;
        }else{
          this.minStop = false;
        }
        if(this.val <= this.min){
          this.minStop = true;
          return;
        }else{
          this.maxStop = false;
        }
      }
    },
    methods:{
      add(){
        if(this.maxStop === true || this.disabled === true){
          return;
        }
        this.val += this.step;
      },
      sub(){
        if(this.minStop === true || this.disabled === true){
          return;
        }
        this.val -= this.step;
      }
    },
    created(){
      if(typeof this.value === 'object'){
        this.val = this.value.num;
      }else{
        this.val = this.value;
      }
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/config.less';
  .vue-count-plugin {
    display: inline-block;
    border: 1px solid @baseColorWhite;
    background:#f4f4f4;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    color: @baseColorHG;
    font-size: 0;
    &.disabled {
      span {
        background: #fafafa;
        opacity:0.9;
      }
      .view {
        background: #fff;
        color:@baseColorLG;
      }
    }
    span {
      font-size: 0.3rem;
      display: inline-block;
      width: 0.6rem;
      height: 0.6rem;
      line-height: 0.6rem;
      vertical-align: middle;
      position: relative;
    }
    .view {
      width: auto;
      min-width: 0.6rem;
      background: #fff;
      padding: 0 0.2rem;
    }
    .off {
      background: #fafafa;
      color:@baseColorLG;
    }
  }

</style>
