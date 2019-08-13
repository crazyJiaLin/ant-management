<template>
  <div class="dashboard-wrap">
    <div class="hello-wrap animated bounceInRight">
      <h1>{{realName}} ：</h1>
      <p>欢迎回来! 祝您开心每一天！</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dashboard",
    computed: {
      realName(){
        return this.$store.state.userInfo.real_name ? this.$store.state.userInfo.real_name : '亲爱的用户';
      }
    }
  }
</script>

<style scoped lang="less">
  .dashboard-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background: url("/static/img/background/home.jpg") center center no-repeat;
    background-size: cover;
    overflow: hidden;
    .hello-wrap {
      margin-left: 50px;
      h1 {
        font-size: 35px;
        font-weight: bold;
        transition: all .5s ease;
        cursor: pointer;
        &:hover {
          text-indent: 20px;
        }
      }
      p {
        font-size: 20px;
        font-weight: bold;
        text-indent: 2em;
        transition: all .5s ease;
        cursor: pointer;
        &:hover {
          text-indent: 3em;
        }
      }
    }
  }
</style>
