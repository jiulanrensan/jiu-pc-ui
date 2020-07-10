<template>
  <j-carousel>
    <j-carousel-item v-for="item in items" :key="item">
      <h2>{{item}}</h2>
    </j-carousel-item>
  </j-carousel>
</template>

<script>
export default {
  data () {
    return {
      items: [1, 2, 3, 4]
    }
  }
}
</script>

<style>

</style>
