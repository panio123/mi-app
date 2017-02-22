<template>
  <div class="list_broadcast">
    <div class="logo" v-if="logo">
      <img :src="logo">
    </div>
    <ul class="broadcast-box">
      <transition-group name="fade">
        <li v-for="(item,index) in list" v-show="broadcastIndex === index" :data-index="index" :key="index">
          <a :href="item.action.path">{{item.news_title}}</a>
        </li>
      </transition-group>
    </ul>
  </div>
</template>
<script>
  export default{
    name: 'vue-broadcast',
    props: {
      list: {
        type: Array,
        default: []
      },
      logo: {
        type: String,
        default: ''
      },
      speed: {
        type: Number,
        default: 5000
      }
    },
    data(){
      return {
        timer: null,
        broadcastIndex: 0
      }
    },
    mounted(){
      let me = this;
      me.timer = setInterval(()=> {
        me.broadcastIndex++;
        if (me.broadcastIndex >= me.list.length) {
          me.broadcastIndex = 0;
        }
      }, me.speed)
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/constructor.less';
  .list_broadcast {
  .csflex;

  .logo {
    width: 1.8rem;
    overflow: hidden;
    position: relative;

  &:after {
    content: '|';
    font-size: 0.3rem;
    color: #ccc;
    position: absolute;
    top: 50%;
    right: 3px;
    transform: translateY(-50%);
  }

  img {
    display: block;
    width: 100%;
  }

  }
  .broadcast-box {
    height: 0.9rem;
    overflow: hidden;
    line-height: 0.9rem;

  li {
    width: 100%;
    height: 100%;

  a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  }
  }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
