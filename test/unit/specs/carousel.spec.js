import Vue from 'vue'
import carousel from '@view/carousel'

describe('carousel.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(carousel)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.j-carousel-container').className)
      .to.equal('j-carousel-container')
  })
})