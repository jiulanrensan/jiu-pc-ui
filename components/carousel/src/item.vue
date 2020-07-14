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
    // left (value) {
      // bug: 2切换1时，4有动画效果，会看到4在移动
      // const {currenIdx, lastIdx} = this.$parent
      // if ([-1, 0, 1].includes(value)) this.itemStyle = `transition: transform .3s;`
      // 宽度width需要响应式，所以应该取父元素的盒子宽度
      // this.itemStyle = `transform:translateX(${value*this.boxWidth}px);`
    // }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  @import "../../style/common.scss";
  .j-carousel-item{
    width: 100%;
    height: 100%;
    position: absolute;
    // transition: transform .3s;
  }
</style>