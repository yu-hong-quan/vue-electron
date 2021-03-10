<template>
  <div id="Home">
    <el-button @click="message" type="success" icon="el-icon-search" round>跳转</el-button>
  </div>
</template>

<script>



  export default {
    name: 'home',
    components: {  },
    methods: {
      message(){
          this.$router.push({name:'landing-page',params:{setid:111222}});
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  
</style>
