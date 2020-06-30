import JButton from './src/button'

// 每个组件暴露install 方法，可按需引入

JButton.install = function(Vue) {
  Vue.component(JButton.name, JButton);
};

export default JButton;