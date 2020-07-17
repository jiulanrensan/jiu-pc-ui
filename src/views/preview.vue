<template>
  <div @click="handleClick">点击预览大图</div>
</template>

<script>
export default {
  name: 'JPreview',
  data () {
    return {
      imgUrl: 'http://erp2.kd1.pagoda.com.cn/sttrace/static/img/welcome.0421271.png'
    }
  },
  methods: {
    handleClick () {
      this.$showPreview.show()
    }
  }
}
</script>

<style>

</style>
