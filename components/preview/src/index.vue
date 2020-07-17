<template>
  <div class="j-preview" v-show="showPreview">

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

<style>
  /* @import "../../style/common.scss"; */
</style>