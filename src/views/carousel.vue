<template>
  <div>
    <j-carousel :initIdx="initIdx">
      <j-carousel-item v-for="item in items" :key="item">
        <h2>{{item}}</h2>
      </j-carousel-item>
    </j-carousel>
    <br>
    <br>
    <j-carousel :initIdx="initIdx" :autoPlay="false">
      <j-carousel-item v-for="item in items" :key="item">
        <h2>{{item}}</h2>
      </j-carousel-item>
    </j-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [1, 2, 3, 4],
      initIdx: 3
    }
  }
}
</script>

<style lang="scss">
  h2{
    height: 100%;
  }
  .j-carousel-item {
    &:nth-of-type(2n){
      background-color: #99a9bf;
    }
    &:nth-of-type(2n+1){
      background-color: #d3dce6;
    }
  }
</style>
