<template>
  <div id="myHeader">
    <div class="Header_Name">
		<img src="@/assets/HTMLicon.png" alt="">
		<span>余山郡</span>
	</div>
    <div class="titlebtn">
	  <span v-if="showHeader" @click="outLogin">切换账号</span>
      <div class="min" @click="min">
        <img src="@/assets/min.png" alt />
      </div>
      <div class="max"  @click="max">
		  <img src="@/assets/max.png" alt />
      </div>
      <div class="close" @click="close">
		  <img src="@/assets/close.png" alt />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data(){
  	return{
  		showHeader:false,
  	}
  },
  created() {
  	this.$router.beforeEach((to, from, next) => {
  	    console.log(to);
  		if(to.name == 'login'){
  			this.showHeader = false;
  		}else{
  			this.showHeader = true;
  		}
  	    next();
  	});
  },
  methods: {
    min() {
        this.$electron.ipcRenderer.send("window-min");
    },
    max() {
        this.$electron.ipcRenderer.send("window-max");
    },
    close() {
        this.$electron.ipcRenderer.send("window-close");
    },
	outLogin(){
		this.$router.push({name:'login'})
	}
  },
};
</script>

<style lang="scss">
#myHeader {
  width: 100%;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background:#272822;
  //可以拖拽
  -webkit-app-region: drag;
  // position: fixed;
  top: 0;
  z-index: 9999;
}
.Header_Name{
	display: flex;
	align-items: center;
	justify-content: flex-start;
	>img{
		width: 8%;
		margin:0 10px;
	}
	>span{
		font-size: 15px;
		color: #fff;
	}
}
.titlebtn {
  // width: 150px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  float: right;
  //不可拖拽
  -webkit-app-region: no-drag;
  >span{
	  color: #23A9F2;
	  font-size: 15px;
	  text-decoration: underline;
	  cursor: pointer;
	  margin-right: 20px;
  }
  .min {
    width: 40px;
    cursor:pointer;
    -moz-user-select:none;		/* 火狐 */
	-webkit-user-select:none;	/* 谷歌 */
	-ms-user-select:none;		/* IE */
	user-select:none;
    img {
      width:60%;
      
    }
  }
  .max {

    width: 40px;
    cursor:pointer;
    -moz-user-select:none;		/* 火狐 */
	-webkit-user-select:none;	/* 谷歌 */
	-ms-user-select:none;		/* IE */
	user-select:none;
    img {
      width: 60%;
     
    }
  }
  .close {

    width: 40px;
    cursor:pointer;
    -moz-user-select:none;		/* 火狐 */
	-webkit-user-select:none;	/* 谷歌 */
	-ms-user-select:none;		/* IE */
	user-select:none;
    img {
      width: 60%;
     
    }
  }
}
.titlebtn>div{
	height: 100%;
	padding: 5px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}
.titlebtn>div:hover{
  background: #636363;
}
.titlebtn .close:hover{
  background: red;
}
</style>