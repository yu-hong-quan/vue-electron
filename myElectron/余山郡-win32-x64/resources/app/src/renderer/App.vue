<template>
  <div id="app">
    <MyHeader />
    <router-view></router-view>
  </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader.vue";
  export default {
    name: 'my_electron',
    components: {
      MyHeader,
    },
  }
</script>
<style lang="scss">
  /* CSS */
  #app,body,html{
    width: 100%;
    height: 100%;
  }
   * {
    margin: 0px;
    padding: 0px;
  }
  #app{
    padding-top: 40px;
    // box-sizing: border-box;
  }
</style>
