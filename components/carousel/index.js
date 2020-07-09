import JCarousel from './src'

// 每个组件暴露install 方法，可按需引入

JCarousel.install = function(Vue) {
  Vue.component(JCarousel.name, JCarousel);
};

export default JCarousel;