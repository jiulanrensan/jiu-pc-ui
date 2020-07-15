<template>
  <section>
    <!-- 150+930=1080 -->
    <ul class="left">
      <router-link :to="item.path" v-for="item in routeList" :key="item.name" tag="li">{{item.name}}</router-link>
    </ul>
    <div class="right">
      <router-view />
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      routeList: [
        {name: 'Button', path: '/button'},
        {name: 'BackTop', path: '/backtop'},
        {name: 'Carousel', path: '/carousel'}
      ]
    }
  }
}
</script>
<style lang="scss">
  section{
    height: 100%;
    display: flex;
    justify-content: center;
    .left{
      width: 10%;
      min-width: 150px;
      padding-top: 100px;
      box-shadow: 2px 0 2px rgba($color: #000000, $alpha: .1);
      li{
        padding: 10px;
        text-align: left;
        cursor: pointer;
      }
    }
    .right{
      width: 90%;
      overflow-x: hidden;
    }
  }
</style>
