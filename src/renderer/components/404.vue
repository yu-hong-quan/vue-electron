<template>
  <div id="error">
    <img src="../assets/timg.jpg" alt />
    <div class="notFoundBTN">
      <el-button type="primary" @click="goBrack">返回上一页</el-button>
       <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
  data() {
    return {
      timeout: null,
    };
  },
  components: {},
  created() {
    clearTimeout(this.timeout);
    this.$message.error({
      center: true,
      message: "页面丢失",
    });
  },
  methods: {
    goBrack() {
        this.$router.back();
    },
    goHome(){
        this.$router.push({name:'home'})
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#error {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .notFoundComponent > img {
    width: 100%;
  }
  .notFoundBTN {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    // span:nth-child(1) {
    //   background: #f8f8f8;
    // }
    // span:nth-child(2) {
    //   background: linear-gradient(left top, #7cf3d6, #20ee49);
    //   color: #fff;
    //   margin-left: 50px;
    // }
  }
}
</style>
