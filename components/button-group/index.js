import JButtonGroup from './src/button-group'

// 每个组件暴露install 方法，可按需引入

JButtonGroup.install = function(Vue) {
  Vue.component(JButtonGroup.name, JButtonGroup);
};

export default JButtonGroup;