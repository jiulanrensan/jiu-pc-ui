<template>
  <span>
    <svg :class="[
      'j-icon',
      iconPos,
    ]"
    aria-hidden="true" 
    :style="{'fill': iconColor}">
      <use :xlink:href="`#${icon}`"></use>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'JIcon',
  props: {
    icon: String,
    color: {
      type: String,
      default: '#fff'
    },
    // 默认为空
    pos: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconColor () {
      return this.color
    },
    iconPos () {
      return ['left', 'right'].indexOf(this.pos) !== -1 ? `j-icon-${this.pos}` : ''
    }
  }
}
</script>

<style lang="scss">
  @import "../../style/common.scss";
  // 如何用函数表示
  .j-icon-left{
    margin-right: $--margin-1;
  }
  .j-icon-right{
    margin-left: $--margin-1;
  }
</style>