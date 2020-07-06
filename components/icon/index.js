import JIcon from './src'

// 引入iconfont
// https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8cf4382a&helptype=code
const script = document.createElement('script')
script.src = '//at.alicdn.com/t/font_1914048_z0urfy5yby.js'
const head = document.getElementsByTagName('head')[0]
head.appendChild(script)

// 每个组件暴露install 方法，可按需引入

JIcon.install = function(Vue) {
  Vue.component(JIcon.name, JIcon);
};

export default JIcon;