import JCarouselItem from '../carousel/src/item.vue'

// 每个组件暴露install 方法，可按需引入

JCarouselItem.install = function(Vue) {
  Vue.component(JCarouselItem.name, JCarouselItem);
};

export default JCarouselItem;