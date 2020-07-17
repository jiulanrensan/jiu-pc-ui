import Vue from 'vue'
import JPreview from './src'

// JPreview.install = function(Vue) {
//   Vue.component(JPreview.name, JPreview);
// };

console.log('JPreview',JPreview);
// 手动挂载到body下
// JPreviewConstructor是一个VueComponent函数
const JPreviewConstructor = Vue.extend(JPreview)
const body = document.querySelector('body')

// 挂载之后,previewNode就是一个VueComponent对象
const previewNode = new JPreviewConstructor().$mount()
body.appendChild(previewNode.$el)

// 挂载全局Vue事件
const {preview} = previewNode
const showPreview = {
  show: preview.bind(null, true),
  hide: preview.bind(null, false)
}
Vue.prototype.$showPreview = showPreview


// export default JPreview;