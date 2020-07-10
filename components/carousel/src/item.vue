<template>
  <div class="j-carousel-item" :style="itemStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'JCarouselItem',
  data () {
    return {
      left: 0,
      itemStyle: '',
      boxWidth: 0,
      animationDuration: 0.3
    }
  },
  created () {
    // console.log(this.$parent);
    
  },
  mounted () {
  },
  computed: {
    
    
  },
  watch: {
    left (value) {
      // if ([-1, 0].includes(value)) this.itemStyle = `transition: transform .3s;`
      // 宽度width需要响应式，所以应该取父元素的盒子宽度
      this.itemStyle = `transform:translateX(${value*this.boxWidth}px);}`
      
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .j-carousel-item{
    width: 100%;
    height: 100%;
    position: absolute;
    transition: transform .3s;
  }
</style>