<template>
  <div id="app">
    <router-view/>
    <bottab></bottab>
  </div>
</template>

<script>
import bottab from 'common/bot-tab/bot-tab'
export default {
  name: 'App',
  components:{
    bottab
  }
}
</script>

<style lang="less" scoped>

</style>

