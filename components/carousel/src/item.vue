<template>
  <div class="j-carousel-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'JCarouselItem',
  data () {
    return {}
  },
  
}
</script>

<style lang="scss">
  .j-carousel-item{
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>