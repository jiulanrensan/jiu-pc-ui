// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import JButton from 'package/button'
import JButtonGroup from 'package/button-group'
import JIcon from 'package/icon'
import JBackTop from 'package/back-to-top'
import JCarousel from 'package/carousel'
import JCarouselItem from 'package/carousel-item'
import 'package/preview'
Vue.use(JButton)
Vue.use(JButtonGroup)
Vue.use(JIcon)
Vue.use(JBackTop)
Vue.use(JCarousel)
Vue.use(JCarouselItem)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
