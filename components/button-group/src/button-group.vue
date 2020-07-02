<template>
  <div :class="[
    'j-button-group',
    round ? 'j-button-group-round-' + size : '',
    'j-button-group-' + dir
    ]">
    <!-- 使用插槽形式 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'JButtonGroup',
  props: {
    round: Boolean,
    // 排列方向
    dir: {
      type: String,
      // row, column
      default: 'row',
      validator: (value) => {
        return ['row', 'column'].indexOf(value) !== -1
      }
    },
    size: {
      type: String,
      // small, medium, large
      default: 'medium',
      validator: (value) => {
        return ['small', 'medium', 'large'].indexOf(value) !== -1
      }
    }
  }
};
</script>

<style lang="scss">
  @import "../../style/common.scss";

  @mixin btngroup-radius-cal ($dir, $type) {
    $first-value: '';
    $second-value: '';
    @if $dir == 'row' {
      $first-value: 'bottom-left';
      $second-value: 'top-right';
    } @else if $dir == 'column' {
      $first-value: 'top-right';
      $second-value: 'bottom-left';
    }
    // column
    // top-left,top-right
    // bottom-left, bottom-right
    // row
    // top-left, bottom-left
    // top-right, bottom-right
    &:first-child {
      border-top-left-radius: $type;
      #{'border-'+ $first-value +'-radius'}: $type;
    }
    &:last-child {
      border-bottom-right-radius: $type;
      #{'border-'+ $second-value +'-radius'}: $type;
    }
  }
  @mixin btn-common($dir, $type) {
    .j-button{
      word-spacing: 0;
      border-radius: 0;
      @include btngroup-radius-cal($dir, $type);
    }
  }

  // 去除inline-block间隙
  // https://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/
  // element-ui用的浮动
  .j-button-group{
    display: inline-table;
    word-spacing: -6px;
    @include btn-common(row, $--border-radius-default);

    // 如何用函数抽象出来？
    &.j-button-group-round-small.j-button-group-row{
      @include btn-common(row, $--border-width-default + $--font-line-height-default/2 + $--button-padding-small);
    }
    &.j-button-group-round-medium.j-button-group-row{
      @include btn-common(row, $--border-width-default + $--font-line-height-default/2 + $--button-padding-medium);
    }
    &.j-button-group-round-large.j-button-group-row{
      @include btn-common(row, $--border-width-default + $--font-line-height-default/2 + $--button-padding-large);
    }

    // 垂直排列
    &.j-button-group-column{
      .j-button {
        display: block;
      }
      @include btn-common(column, $--border-radius-default);
    }
  }
  
</style>