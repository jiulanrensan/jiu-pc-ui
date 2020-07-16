import Vue from 'vue'
import carousel from 'package/carousel/src'
import button from '@/views/button'

describe('button.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(button)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('p').textContent)
      .to.equal('use JButton')
  })
})
