<template>
  <div>
    <h1>我是HOME页</h1>
  </div>
</template>

<script>
export default {
  created() {
    if (localStorage.getItem("token")) {
      console.log("欢迎进入");
    } else {
      this.$router.push("/login");
    }

    this.$axios({
      method: "get",
      url: "/home",
    }).then((res) => {
      this.$message({
        type:'warning',
        message:res.data.msg
      })
    });
  },
};
</script>

<style lang="scss" scoped>
</style>