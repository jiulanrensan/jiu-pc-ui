<template>
  <div 
    v-if="showBackTop"
    :class="[
      'j-back-to-top'
    ]"
    :style="{'width': width+'px', 'height': height+'px', 'bottom': bottom+'px', 'right': right+'px'}"
  >
    <!-- 用插槽插入自定义内容，不插入时显示默认内容 -->
    <slot>
      <J-icon icon="iconbangzhu" color="#000"></J-icon>
    </slot>
  </div>
</template>

<script>
import JIcon from '../../back-to-top/src';
export default {
  name: 'JBackTop',
  props: {
    width: {
      type: Number,
      default: 50
    },
    height: {
      type: Number,
      default: 50
    },
    bottom: {
      type: Number,
      default: 50
    },
    right: {
      type: Number,
      default: 50
    },
    // 向下滚动多少距离才显示
    showHeight: {
      type: Number,
      default: 400
    }
  },
  data () {
    return {
      showBackTop: false,
      scrollElement: {}
    }
  },
  components: {
    'j-icon': JIcon
  },
  mounted () {
    this.scrollElement = document.documentElement
    this.handleScroll()
  },
  methods: {
    handleScroll () {
      document.addEventListener('scroll', this.handleVisible)
    },
    handleVisible () {
      this.showBackTop = this.showHeight < this.scrollElement.scrollTop
    }
  }
}
</script>

<style lang="scss">
  @import "../../style/common.scss";
  .j-back-to-top{
    position: fixed;
    box-shadow: 0 0 6px rgba(0,0,0, .12);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>