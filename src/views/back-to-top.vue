<template>
  <div class="content">
    <p>use back-to-top</p>
    <j-back-top scrNode=".right"></j-back-top>
    <j-back-top scrNode=".right" bottom="200">
      <div>
        <p>To Top</p>
      </div>
    </j-back-top>
  </div>
</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style>
  .content{
    height: 2000px;
  }
</style>
