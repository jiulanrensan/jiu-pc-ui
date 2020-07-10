<template>
  <!-- 分两个部分，父元素包含指示器，左右箭头，子元素为每个carousel元素 -->
  <div 
    class="j-carousel-container"
    :style="{'height': height}">
    <!-- 左右按钮 -->
    <div class="j-c-btngroup" v-if="arrow" :style="{'top': height && height.slice(0,-2)/2 + 'px'}">
      <j-button circle><J-icon icon="iconarrow-left" color="#000"></J-icon></j-button>
      <j-button circle><J-icon icon="iconarrow-right" color="#000"></J-icon></j-button>
    </div>
    <!-- 插槽，存放子元素 -->
    <div class="j-c-slot">
      <slot></slot>
    </div>
    <!-- 底部指示器(缩略图/小点/横杠) -->
    <ul class="j-c-indicator" v-if="indicator">
      <li v-for="item in carouselArr" :key="item">
        <div></div>
      </li>
    </ul>
  </div>
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
    indicator: {
      type: Boolean,
      default: true
    },
    indicatorPos: String,
    height: String
  },
  components: {
    'j-button': JButton
  },
  data () {
    return {
      carouselArr: [1,2,3]
    }
  },
  created () {
    // console.log(this.$slots)
    // console.log(this.$children)
  }
}
</script>

<style lang="scss">
  @import "../../style/common.scss";
  .j-carousel-container{
    height: 300px;
    position: relative;
    /**临时代码 */
    background-color: $--color-primary;
    /** */
    .j-c-btngroup{
      position: absolute;
      z-index: 10;
      width: 100%;
      top: 0;
      transition: all .5s;
      button{
        position: absolute;
        /* 20为 icon 高度 */
        transform: translateY(-(20+$--button-padding-default)/2);
        top: 150px;
      }
      button:nth-of-type(1){
        left: 30px;
      }
      button:nth-of-type(2){
        right: 30px;
      }
    }
    .j-c-slot{
      height: 100%;
      position: relative;
    }
    ul.j-c-indicator{
      width: 100%;
      height: 30px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      li{
        box-sizing: border-box;
        width: 30px;
        height: 10px;
        margin: 0 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        div{
          width: 100%;
          height: 3px;
          background-color: $--color-default;
          transition: all .2s;
        }
        &:hover{
          div{
            background-color: $--color-info;
          }
        }
        
      }
    }
  }
</style>