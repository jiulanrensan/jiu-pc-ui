import BackToTop from './src'

// 每个组件暴露install 方法，可按需引入

BackToTop.install = function(Vue) {
  Vue.component(BackToTop.name, BackToTop);
};

export default BackToTop;