<template>
  <div 
    v-if="showBackTop"
    @click="handleTop"
    :class="[
      'j-back-to-top'
    ]"
    :style="{'width': width+'px', 'height': height+'px', 'bottom': bottom+'px', 'right': right+'px'}"
  >
    <!-- 用插槽插入自定义内容，不插入时显示默认内容 -->
    <slot>
      <div style="border-radius: 50%">
        <J-icon icon="iconarrow-up" color="#000"></J-icon>
      </div>
    </slot>
  </div>
</template>

<script>
import JIcon from '../../back-to-top/src';
import {throttle} from 'package/utils/common'
export default {
  name: 'JBackTop',
  props: {
    width: {
      type: Number | String,
      default: 50
    },
    height: {
      type: Number | String,
      default: 50
    },
    bottom: {
      type: Number | String,
      default: 50
    },
    right: {
      type: Number | String,
      default: 50
    },
    // 向下滚动多少距离才显示
    showHeight: {
      type: Number | String,
      default: 400
    },
    // 自定义的滚动节点
    scrNode: String
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
    this.initNode()
    // this.handleVisible = throttle(this.handleVisible, 100)
    this.handleListenScroll()
  },
  methods: {
    initNode () {
      this.scrollElement = (() => {
        const node = !this.scrNode ? document.documentElement : document.querySelector(this.scrNode)
        // 还需要对查找的node节点进行判断，保证代码健壮性
        if (!node) throw Error(`can't find this node: ${this.scrNode}`)
        return node
      })()
    },
    handleListenScroll () {
      this.scrollElement.addEventListener('scroll', this.handleVisible)
    },
    handleVisible () {
      this.showBackTop = this.showHeight < this.scrollElement.scrollTop
    },
    handleTop () {
      let beginTime = +new Date()
      this.handleScroll(beginTime)
    },
    handleScroll (beginTime) {
      if (+new Date() - beginTime > 500) {
        this.showBackTop = false
      } else {
        setTimeout(() => {
          this.scrollElement.scrollTop = this.scrollElement.scrollTop - 100
          this.handleScroll(beginTime)
        }, 16);
      }
      /**
       * element-ui此处用了window.requestAnimationFrame
       * scrollToTop() {
          const el = this.el;
          const beginTime = Date.now();
          const beginValue = el.scrollTop;
          // 浏览器1s内重绘60次，即16.6ms重绘一次
          const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
          const frameFunc = () => {
            // 超过500ms直接赋值scrollTop为0
            const progress = (Date.now() - beginTime) / 500;
            if (progress < 1) {
              el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
              rAF(frameFunc);
            } else {
              el.scrollTop = 0;
            }
          };
          rAF(frameFunc);
        }
       */
    }
  }
}
</script>

<style lang="scss">
  @import "../../style/common.scss";
  .j-back-to-top{
    position: fixed;
    box-shadow: 0 0 6px rgba(0,0,0, .12);
    @include flex-center(center);
    cursor: pointer;
  }
</style>