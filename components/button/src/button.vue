<template>
  <button
    class="j-button"
    :disabled="disabled"
    :class="[
      type ? 'j-button-' + type : '',
      btnSize ? 'j-button-' + btnSize : '',
      round ? 'j-button-round-' + btnSize : '',
      circle ? 'j-button-circle-' + btnSize : '',
      disabled ? 'j-button-disabled' : ''
    ]">
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  name: 'JButton',
  props: {
    size: {
      type: String,
      // small, medium, large
      default: 'medium'
    },
    type: {
      type: String,
      // default, primary, success, warning, danger, info
      default: 'default'
    },
    // 是否圆角
    round: Boolean,
    // 圆形按钮
    // 单个icon时使用
    circle: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 如果是按钮组，size以button-group的值为准
    btnSize () {
      return this.$parent.$options.name !== 'JButtonGroup' ? this.size : this.$parent.size
    }
  },
}
</script>

<style lang="scss">
  @import "../../style/common.scss";
  @mixin button-color ($color, $bg-color, $bd-color){
    color: $color;
    background-color: $bg-color;
    border-color: $bd-color;
    &:hover,
    &:focus {
      background: mix($--color-default, $bg-color, 20%);
      border-color: mix($--color-default, $bd-color, 20%);
      color: $color;
    }
    &:active {
      background: mix($--color-black, $bg-color, 10%);
      border-color: mix($--color-black, $bd-color, 10%);
      color: $color;
    }
    &.j-button-disabled {
      &,
      &:hover,
      &:focus,
      &:active {
        cursor: not-allowed;
        background-color: mix($bg-color, $--color-default);
        border-color: mix($bd-color, $--color-default);
      }
    }
  }
  @mixin button-round-cal ($type) {
    border-radius: $--border-width-default + $--font-line-height-default/2 + $type;
  }
  @mixin button-circle-cal ($type) {
    padding: $type;
    border-radius: 50%;
  }
  @mixin button-padding-cal ($type) {
    padding: $type $type*2;
  }
  .j-button{
    box-sizing: border-box;
    padding: $--button-padding-medium $--button-padding-medium*2;
    background: $--color-default;
    color: $--color-text-default;
    border: $--border-width-default $--border-style-default $--border-color-default;
    border-radius: $--border-radius-default;
    line-height: $--font-line-height-default;
    outline: none;
    transition: all 0.1s;
    cursor: pointer;
    .content{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .j-button-small{
    // @include button-padding-cal(small);
    @include button-padding-cal($--button-padding-small);
  }
  .j-button-medium{
    @include button-padding-cal($--button-padding-medium);
  }
  .j-button-large{
    @include button-padding-cal($--button-padding-large);
  }
  .j-button-default{
    &:hover,
    &:focus{
      background: mix($--color-default, $--color-primary, 90%);
      border-color: mix($--color-default, $--color-primary, 90%);
      color: mix($--color-default, $--color-primary, 10%);
    }
    &:active {
      background: mix($--color-default, $--color-primary, 90%);
      border-color: mix($--color-black, $--color-primary, 10%);
      color: mix($--color-default, $--color-primary, 10%);
    }
    &.j-button-disabled {
      &,
      &:hover,
      &:focus,
      &:active {
        cursor: not-allowed;
        background: $--color-default;
        border-color: mix($--color-default, $--color-primary, 90%);
        color: mix($--color-default, $--color-text-default, 10%);
      }
    }
  }
  .j-button-primary{
    @include button-color($--color-text-white, $--color-primary, $--color-primary);
  }
  .j-button-success{
    @include button-color($--color-text-white, $--color-success, $--color-success);
  }
  .j-button-warning{
    @include button-color($--color-text-white, $--color-warning, $--color-warning);
  }
  .j-button-danger{
    @include button-color($--color-text-white, $--color-danger, $--color-danger);
  }
  .j-button-info{
    @include button-color($--color-text-white, $--color-info, $--color-info);
  }
  .j-button-text{
    color: mix($--color-default, $--color-text-default, 60%);
    background-color: $--color-default;
    border-color: transparent;
    &:active {
      color: mix($--color-default, $--color-text-default, 10%);
    }
    &.j-button-disabled {
      &,
      &:hover,
      &:focus,
      &:active {
        cursor: not-allowed;
      }
    }
  }
  // 需要用函数
  .j-button-round-small{
    @include button-round-cal($--button-padding-small);
  }
  .j-button-round-medium{
    @include button-round-cal($--button-padding-medium);
  }
  .j-button-round-large{
    @include button-round-cal($--button-padding-large);
  }

  .j-button-circle-small{
    @include button-circle-cal($--button-padding-small)
  }
  .j-button-circle-medium{
    @include button-circle-cal($--button-padding-medium)
  }
  .j-button-circle-large{
    @include button-circle-cal($--button-padding-large)
  }
</style>