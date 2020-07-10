<template>
  <!-- 分两个部分，父元素包含指示器，左右箭头，子元素为每个carousel元素 -->
  <div 
    class="j-carousel-container"
    :style="{'height': height}">
    <!-- 左右按钮 -->
    <div class="j-c-btngroup" v-if="arrow" :style="{'top': height && height.slice(0,-2)/2 + 'px'}">
      <j-button
        circle
        @click="handleArrow(-1)">
        <J-icon icon="iconarrow-left" color="#000"></J-icon>
      </j-button>
      <j-button 
        circle
        @click="handleArrow(1)">
        <J-icon icon="iconarrow-right" color="#000"></J-icon>
      </j-button>
    </div>
    <!-- 插槽，存放子元素 -->
    <div class="j-c-slot">
      <slot></slot>
    </div>
    <!-- 底部指示器(缩略图/小点/横杠) -->
    <ul class="j-c-indicator" v-if="indicator">
      <li v-for="(item,index) in carouselArr" :key="index">
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
    height: String,
    initIdx: {
      type: Number,
      default: 0
    }
  },
  components: {
    'j-button': JButton
  },
  data () {
    return {
      // 当前展示索引
      currentIdx: 0,
      carouselItems: []
    }
  },
  /**
   * this.$slots.default 获取默认插槽的vnode(包括vuecomponent)
   * this.$children 获取所有子组件 vuecomponent,在mounted才能拿到,因此可以操作子组件的数据
   * 
   */
  created () {
    this.currentIdx = this.initIdx
  },
  mounted () {
    // 初始化子元素位置
    this.initPos(this.initIdx)
    // 父组件最后mounted，此处开启定时轮播
    this.startCarousel()
    
  },
  computed:{
    carouselArr () {
      return this.$slots.default
    }
  },
  methods: {
    initPos (initIdx) {
      this.carouselItems = this._getCarouselItem()
      this._setItemWidth()
      this._setItemPos(initIdx)
    },
    startCarousel () {},
    stopCarousel () {},
    handleArrow (step) {
      const final = this.carouselArr.length - 1
      this.currentIdx += step
      if (this.currentIdx > final) {
        this.currentIdx = 0
      } else if (this.currentIdx < 0){
        this.currentIdx = final
      }
      this._setItemPos(this.currentIdx)
    },
    _getCarouselItem(){
      return this.$children.filter(el => el.$options.name === 'JCarouselItem')
    },
    /**
     * 给每个item加上translate
     * 顺序规则:
     * 1. currentIdx: transform: translate(0)
     * 2. lastIdx: transform: translate( (currentIdx - lastIdx)*-1*width)
     * 3. other: transform: translate( (nextIdx - currentIdx)*width)
     */
    /**
     * @param {number} showIdx 当前应展示的索引
     */
    _setItemPos (showIdx) {
      const length = this.carouselItems.length
      this.carouselItems.forEach((ele, idx) => {
        ele.left = idx - showIdx
        if (showIdx === 0 && idx === length - 1) {
          ele.left = -1
        } else if (idx < showIdx - 1) {
          ele.left = (length - 1) - showIdx + idx + 1
        }
      })
    },
    _setItemWidth () {
      // resize时需触发，再加个防抖
      this.carouselItems.forEach(ele => {
        ele.boxWidth = this.$el.offsetWidth
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../../style/common.scss";
  .j-carousel-container{
    height: 300px;
    position: relative;
    .j-c-btngroup{
      position: absolute;
      z-index: $--zIndex-10;
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
      overflow: hidden;
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