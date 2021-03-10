<template>
  <div id="myHeader">
    <div class="titlebtn">
      <div class="min" @click="min">
        <img src="@/assets/min.png" alt />
      </div>
      <div class="max">
        <div @click="max">
          <img src="@/assets/max.png" alt />
        </div>
      </div>
      <div class="close">
        <div @click="close">
          <img src="@/assets/close.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {};
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
  },
};
</script>

<style lang="scss">
#myHeader {
  width: 100%;
  height: 40px;
  line-height:40px;
  background:#272822;
  //可以拖拽
  -webkit-app-region: drag;
  position: fixed;
  top: 0;
}

.titlebtn {
  position: relative;
  width: 200px;
  height: 50px;
  line-height: 50px;
  float: right;

  //不可拖拽
  -webkit-app-region: no-drag;

  .min {
    position: absolute;
    right: 100px;
    width: 20px;
    cursor:pointer;
    -moz-user-select:none;		/* 火狐 */
	-webkit-user-select:none;	/* 谷歌 */
	-ms-user-select:none;		/* IE */
	user-select:none;
    img {
      width: 100%;
      margin-top: 6px;
    }
  }
  .max {
    position: absolute;
    right: 60px;
    width: 20px;
    cursor:pointer;
    -moz-user-select:none;		/* 火狐 */
	-webkit-user-select:none;	/* 谷歌 */
	-ms-user-select:none;		/* IE */
	user-select:none;
    img {
      width: 100%;
      margin-top: 6px;
    }
  }
  .close {
    position: absolute;
    right: 20px;
    width: 20px;
    cursor:pointer;
    -moz-user-select:none;		/* 火狐 */
	-webkit-user-select:none;	/* 谷歌 */
	-ms-user-select:none;		/* IE */
	user-select:none;
    img {
      width: 100%;
      margin-top: 6px;
    }
  }
}
</style>