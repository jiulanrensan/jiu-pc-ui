<template>
  <!-- 分两个部分，父元素包含指示器，左右箭头，子元素为每个carousel元素 -->
  <section 
    class="j-carousel-container"
    :style="{'height': height, 'margin-top': height && height.slice(0,-2)/2 + 'px'}">
    <!-- 左右按钮 -->
    <div class="j-c-btngroup" v-if="arrow">
      <j-button circle><J-icon icon="iconarrow-left" ></J-icon></j-button>
      <j-button circle><J-icon icon="iconarrow-right" ></J-icon></j-button>
    </div>
    <!-- 底部指示器(缩略图/小点/横杠) -->
    <ul class="j-c-indicator"></ul>
    <slot></slot>
  </section>
</template>

<script>
import JButton from 'package/button'
export default {
  name: 'JCarousel',
  props: {
    arrow: {
      type: Boolean,
      default: true
    },
    height: String
  },
  components: {
    'j-button': JButton
  },
}
</script>

<style lang="scss">
  @import "../../style/common.scss";
  .j-carousel-container{
    height: 300px;
    position: relative;
    .j-c-btngroup{
      position: absolute;
      width: 100%;
      height: 100%;
      transition: all .5s;
      button{
        position: absolute;
        transform: translateY(-($--button-padding-default)/2);
        margin-top: 150px;
      }
      button:nth-of-type(1){
        left: 30px;
      }
      button:nth-of-type(2){
        right: 30px;
      }
    }
  }
</style>