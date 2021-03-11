<template>
  <div id="myHeader">
    <div class="Header_Name">
		<img src="@/assets/HTMLicon.png" alt="">
		<span>余山郡</span>
	</div>
    <div class="titlebtn">
		<el-dropdown @command="handleCommand" size="small" v-show="showHeader">
		  <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
		    <el-dropdown-item command="outLogin" divided>切换账号</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
      <div class="min" @click="min">
	  <el-tooltip content="隐藏" placement="bottom">
		<img src="@/assets/min.png" alt />
	  </el-tooltip>
      </div>
      <div class="max"  @click="max">
		<el-tooltip content="放大/缩小" placement="bottom">
		  <img src="@/assets/max.png" alt />
		</el-tooltip>
      </div>
      <div class="close" @click="close">
		<el-tooltip content="关闭" placement="bottom">
		  <img src="@/assets/close.png" alt />
		</el-tooltip>
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
		this.MixinMessage('退出登录成功！', "success");
	},
	goUserInfo(){
		this.$router.push({name:'userInfo'})
	},
	handleCommand(command){
		switch (command){
			case 'outLogin':
				this.outLogin()
				break;
			case 'userInfo':
				this.goUserInfo()
				break;
			default:
				break;
		}

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