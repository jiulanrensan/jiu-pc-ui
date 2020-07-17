<template>
  <div class="j-preview" v-show="showPreview">
    <div class="j-pre-mask"></div>
  </div>
</template>

<script>
import {event} from 'package/utils/event/event.js'
import {eventsName} from 'package/utils/event/const.js'
export default {
  name: 'JPreview',
  data () {
    return {
      showPreview: false
    }
  },
  mounted () {
    event.on(eventsName.J_PREVIEW_SHOW, value => {
      this.showPreview = value
    })
  },
  methods: {
    // show () {
    //   this.preview(true)
    //   // event.emit(eventsName.J_PREVIEW_SHOW, true)
    // },
    // hide () {
    //   this.preview(false)
    //   // event.emit(eventsName.J_PREVIEW_SHOW, false)
    // },
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
</style>