<template>
  <div id="Home">
	<div>
		<el-button @click="message" type="success" icon="el-icon-search" round>跳转</el-button>
	</div>
	<div>
		<router-view></router-view>
	</div>
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

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #Home{
	  
  }
</style>
