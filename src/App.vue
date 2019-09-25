<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <!-- <img src="./assets/logo.png"> -->
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
  import {LocaleProvider} from 'ant-design-vue'
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  export default {
    name: 'App',
    components: {
      ALocaleProvider: LocaleProvider
    },
    data() {
      return {
        locale: zhCN,
      }
    }
  }
</script>

<style>
#app {
  font-family: '微软雅黑','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
