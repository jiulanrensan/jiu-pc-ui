<template>
  <!-- 分两个部分，父元素包含指示器，左右箭头，子元素为每个carousel元素 -->
  <div 
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    class="j-carousel-container"
    :style="{'height': height}">
    <!-- 左右按钮 -->
    <div 
      :class="[
        'j-c-btngroup',
        isHover ? 'is-hover' : ''
      ]" 
      v-if="arrow" 
      :style="{'top': height && height.slice(0,-2)/2 + 'px'}">
      <j-button
        circle
        @click="handleArrow(-1)">
        <j-icon icon="iconarrow-left" color="#000"></j-icon>
      </j-button>
      <j-button 
        circle
        @click="handleArrow(1)">
        <j-icon icon="iconarrow-right" color="#000"></j-icon>
      </j-button>
    </div>
    <!-- 插槽，存放子元素 -->
    <div class="j-c-slot">
      <slot></slot>
    </div>
    <!-- 底部指示器(缩略图/小点/横杠) -->
    <ul 
      :class="[
        'j-c-indicator',
        `indicator-${indicatorPos}`
      ]" 
      v-if="!thumbnail && indicator"
      @click="handleClickIndic"
      @mouseover="handleMouseOverIndic">
      <li v-for="(item,index) in carouselArr" :key="index" :data-set="index">
        <div :class="[index === currentIdx ? 'curIndicator' : '']"></div>
      </li>
    </ul>
    <!-- 缩略图 -->
    <div ref="nailDiv" class="j-c-nail">
      <div class="j-c-nail-btn-left" :style="{height: thumbnailHeight}" @click="handleNail(-1)">
        <j-icon icon="iconarrow-left"></j-icon>
      </div>
      <div class="j-c-nail-btn-right" :style="{height: thumbnailHeight}" @click="handleNail(1)">
        <j-icon icon="iconarrow-right"></j-icon>
      </div>
      <ul 
        :class="[
          'j-c-nail-content'
        ]"
        :style="{
            height: thumbnailHeight, 
            width: thumbnailHeight.slice(0,-2)*carouselItems.length+'px',
            transform: jcnailLeft
          }"
        ref="jcnail"
        v-if="thumbnail">
        <li 
          v-for="(item,index) in carouselItems" 
          @click="handleSelectItem(index)"
          :class="[
            index === currentIdx ? 'nail-selected' : ''
          ]"
          :key="index" 
          :data-set="index"
          :style="{height: thumbnailHeight, width: thumbnailHeight}">
            <img :src="item.image" alt="">
        </li>
      </ul>
      
    </div>
  </div>
</template>

<script>
import JButton from 'package/button'
import JIcon from 'package/icon'
export default {
  name: 'JCarousel',
  props: {
    trigger: {
      type: String,
      default: 'click',
      validator: (value) => {
        return ['click', 'hover'].includes(value)
      }
    },
    arrow: {
      // always/hover/never
      // type: String,
      type: Boolean,
      default: true
    },
    indicator: {
      type: Boolean,
      default: true
    },
    thumbnail:{
      type: Boolean,
      default: false
    },
    thumbnailHeight: {
      type: String,
      default: '80px'
    },
    indicatorPos: {
      type: String,
      // outside/indside
      default: 'outside'
    },
    height: String,
    initIdx: {
      type: Number,
      default: 0
    },
    interval: {
      type: Number,
      default: 3000
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  components: {
    'j-button': JButton,
    'j-icon': JIcon
  },
  data () {
    return {
      // 当前展示索引
      currentIdx: 0,
      lastIdx: 0,
      carouselItems: [],
      carouselTimers: null,
      isHover: false,
      boxWidth: 0,
      nailDom: [],
      // 缩略图左移距离
      nailLeft: 0,
      // nail样式
      jcnailLeft: ''
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
    if (this.$refs.jcnail) {
      this.$nextTick(() => {
        this.nailDom = this.$refs.jcnail.getElementsByTagName('li')
      })
    }
    // 父组件最后mounted，此处开启定时轮播
    if (this.autoPlay) this.startCarousel(this.interval)
    
  },
  computed:{
    carouselArr () {
      return this.$slots.default
    },
    nailDiv () {
      return this.$refs.nailDiv
    }
  },
  watch: {
    // feat: transitionend事件
    // 暴露一个carousel change事件
    // carousel切换时触发
    currentIdx (newV, oldV) {
      this.lastIdx = oldV
      this.nailDom.length && this.setNailItem()
      this.$emit('change', newV, oldV)
    }
  },
  methods: {
    initPos (initIdx) {
      this.carouselItems = this._getCarouselItem()
      this._setItemWidth()
      this.setItemPos(initIdx)
    },
    startCarousel (interval) {
      this.carouselTimers = setInterval(() => {
        this._setItemIdx(this.currentIdx + 1)
        this.setItemPos(this.currentIdx)
      }, interval);
    },
    stopCarousel () {},
    handleMouseOver () {
      this.isHover = true
      clearInterval(this.carouselTimers)
    },
    handleMouseLeave () {
      this.isHover = false
      if (this.autoPlay) this.startCarousel(this.interval)
    },
    handleClick () {},
    handleClickIndic (ev) {
      if (this.trigger.includes('click')) this.handleIndicator(ev)
    },
    handleMouseOverIndic (ev) {
      if (this.trigger.includes('hover')) this.handleIndicator(ev)
    },
    handleIndicator (ev) {
      const target = ev.target
      let idx
      idx = target.tagName === 'LI' ? target.dataset.set : target.parentNode.dataset.set
      if (isNaN(idx)) return
      this._setItemIdx(Number(idx))
      this.setItemPos(this.currentIdx)
    },
    // 箭头按钮切换轮播图
    handleArrow (step) {
      this._setItemIdx(this.currentIdx + step)
      this.setItemPos(this.currentIdx)
    },
    // 箭头按钮移动缩略图位置
    handleNail (step) {
      if (!this.$refs.jcnail) return 
      // 单个缩略图宽度
      const itemWidth = this.thumbnailHeight.slice(0,-2)
      const {offsetWidth} = this.nailDiv
      const ul = this.$refs.jcnail
      if (step>0 && this.nailLeft === 0) return
      if (step<0 && Math.abs(this.nailLeft)*itemWidth + offsetWidth >= ul.offsetWidth) return
      this.nailLeft += Number(step)
      this.jcnailLeft = `translate(${this.nailLeft*itemWidth}px)`
    },
    setNailItem () {
      // 没有offsetRight属性
      // offsetLeft大于nailDiv或者小于0则要移动nailDom
      const {offsetWidth} = this.nailDiv
      const {offsetLeft} = this.nailDom[this.currentIdx]
      let dis = offsetWidth - offsetLeft
      // 单个缩略图宽度
      const itemWidth = this.thumbnailHeight.slice(0,-2)
      const isNailItemHide = ((dis < itemWidth) || (offsetLeft < 0))
      // 在可视区内，return
      if (!isNailItemHide) {
        this.jcnailLeft = ''
        return
      }
      // 否则移动
      if (offsetLeft < 0) {
        this.nailLeft = 0
      } else {
        this.nailLeft = (() => {
          let left = dis > 0 ? 
            (dis)/itemWidth :
            Math.abs(dis)/itemWidth + 1
          return Math.ceil(left)*(-1)*itemWidth
        })()
      }
      this.jcnailLeft = `translate(${this.nailLeft}px)`
    },
    handleSelectItem (idx) {
      this._setItemIdx(Number(idx))
      this.setItemPos(this.currentIdx)
    },
    _getCarouselItem(){
      return this.$children.filter(el => el.$options.name === 'JCarouselItem')
    },
    _setItemIdx (newIdx) {
      const final = this.carouselArr.length - 1
      this.lastIdx = this.currentIdx
      this.currentIdx = newIdx
      if (this.currentIdx > final) {
        this.currentIdx = 0
      } else if (this.currentIdx < 0){
        this.currentIdx = final
      }
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
    setItemPos (showIdx) {
      const length = this.carouselItems.length
      this.carouselItems.forEach((ele, idx) => {
        ele.left = idx - showIdx
        if (showIdx === 0 && idx === length - 1) {
          ele.left = -1
        } else if (idx < showIdx - 1) {
          ele.left = (length - 1) - showIdx + idx + 1
        }
        ele.itemStyle = this._setItemStyle(ele.left, idx)
      })
    },
    _setItemStyle (value, idx) {
      let style = `${(idx === this.currentIdx || idx === this.lastIdx) ? 'transition: transform .3s ease-in-out;' : ''}`
      style += `transform:translateX(${value*this.boxWidth}px);`
      // fix: css3兼容
      return style
    },
    _setItemWidth () {
      // resize时需触发，再加个防抖
      // this.carouselItems.forEach(ele => {
      //   ele.boxWidth = this.$el.offsetWidth
      // })
      this.boxWidth = this.$el.offsetWidth
    }
  }
}
</script>

<style lang="scss">
  @import "../../style/common.scss";
  $nail-btn-width: 20px;
  .j-carousel-container{
    width: 100%;
    height: 300px;
    position: relative;
    .j-c-btngroup{
      z-index: $--zIndex-10;
      @include absoluteBox(top);
      @include transition(all, $--transition-5);
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
    .j-c-indicator{
      width: 100%;
      height: 30px;
      @include flexCenter(center);
      &.indicator-inside{
        @include absoluteBox(bottom)
      }
      li{
        box-sizing: border-box;
        width: 30px;
        height: 10px;
        margin: 0 5px;
        @include flexCenter(center);
        cursor: pointer;
        div{
          width: 100%;
          height: 3px;
          background-color: mix($--color-default, $--color-info, 50%);
          @include transition(all, $--transition-3);
          &.curIndicator{
            background-color: $--color-info;
          }
        }
        &:hover{
          div{
            background-color: $--color-info;
          }
        }
        
      }
    }
    .j-c-nail{
      position: relative;
      margin: auto;
      overflow: hidden;
      padding: 0 $nail-btn-width;
    }
    .j-c-nail-content{
      overflow: hidden;
      @include transition(all, $--transition-3);
      li{
        float: left;
        cursor: pointer;
        box-sizing: border-box;
        border: 3px solid transparent;
        @include flexCenter(flex-start);
        img{
          display: block;
          box-sizing: border-box;
          padding: $--padding-1 $--padding-1;
          max-height: 100%;
          max-width: 100%;
        }
        &.nail-selected{
          border-color: $--border-color-black;
        }
      }
    }
    .j-c-nail-btn-left,
    .j-c-nail-btn-right{
      width: $nail-btn-width;
      position: absolute;
      background: $--color-info;
      z-index: $--zIndex-5;
      cursor: pointer;
      @include flexCenter(center)
    }
    .j-c-nail-btn-left{
      left: 0;
    }
    .j-c-nail-btn-right{
      right: 0;
    }
  }
</style>