<template>
  <transition name="fade">
    <div class="j-preview" v-show="showPreview">
      <div class="j-pre-mask"></div>
      <div class="j-pre-close" @click="preview(false)">
        <j-icon icon="iconguanbi" color="#000"></j-icon>
      </div>
      <div class="j-pre-btn j-pre-btn-left">
        <j-button
          circle>
          <j-icon icon="iconarrow-left" color="#000"></j-icon>
        </j-button>
      </div>
      <div class="j-pre-btn j-pre-btn-right">
        <j-button 
          circle>
          <j-icon icon="iconarrow-right" color="#000"></j-icon>
        </j-button>
      </div>
      <div class="j-pre-tool">
        <j-icon icon="iconarrow-left" color="#000"></j-icon>
        <j-icon icon="iconarrow-left" color="#000"></j-icon>
        <j-icon icon="iconarrow-left" color="#000"></j-icon>
        <j-icon icon="iconarrow-left" color="#000"></j-icon>
      </div>
      <div class="j-pre-imgbox"></div>
    </div>
  </transition>
</template>

<script>
import JIcon from 'package/icon'
import JButton from 'package/button'
import {event} from 'package/utils/event/event.js'
import {eventsName} from 'package/utils/event/const.js'
export default {
  name: 'JPreview',
  data () {
    return {
      showPreview: false
    }
  },
  components: {
    'j-button': JButton,
    'j-icon': JIcon
  },
  mounted () {
    event.on(eventsName.J_PREVIEW_SHOW, value => {
      this.showPreview = value
    })
  },
  methods: {
    /**
     * @param {Boolean} value
     */
    preview (value) {
      event.emit(eventsName.J_PREVIEW_SHOW, value)
    },
  }
}
</script>

<style lang="scss">
  @import "../../style/common.scss";
  .j-preview{
    @include fullScreen(fixed,$--zIndex-100);
  }
  .j-pre-mask{
    @include fullMask();
  }
  .j-pre-close{
    position: absolute;
    top: 40px;
    right: 40px;
    cursor: pointer;
  }
  .j-pre-btn{
    @include absVerCenter();
    &.j-pre-btn-left{
      left: 40px;
    }
    &.j-pre-btn-right{
      right: 40px;
    }
  }
  .j-pre-tool{
    @include absHorCenter();
    @include flexCenter(center);
    height: 40px;
    bottom: 50px;
    border-radius: 20px;
    span{
      padding: 10px;
    }
  }
</style>