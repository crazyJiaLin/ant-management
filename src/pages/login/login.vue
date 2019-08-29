<template>
    <div class="login-wrap">
        <div class="login">
            <div class="login-title-wrap">
                <div class="login-title-img-wrap">
                    <div class="login-title-img">
                        <img src="/static/img/logo.svg" alt="">
                    </div>
                </div>
                <div class="login-title">权限管理脚手架</div>
            </div>
            <div class="login-body">
              <a-tabs :animated="false" defaultActiveKey="1" type="line" @change="tabChange">
                <a-tab-pane tab="账号密码登录" key="1">
                  <pwd-login></pwd-login>
                </a-tab-pane>
                <a-tab-pane tab="手机号登陆" key="2" forceRender>
                  <mobile-login></mobile-login>
                </a-tab-pane>
              </a-tabs>
<!--              <div class="user-login-other">-->
<!--                <span>其他登录方式</span>-->
<!--                <a>-->
<!--                  <a-icon class="item-icon" type="alipay-circle"></a-icon>-->
<!--                </a>-->
<!--                <a>-->
<!--                  <a-icon class="item-icon" type="taobao-circle"></a-icon>-->
<!--                </a>-->
<!--                <a>-->
<!--                  <a-icon class="item-icon" type="weibo-circle"></a-icon>-->
<!--                </a>-->
<!--                <router-link class="register" :to="{ name: 'register' }">注册账户</router-link>-->
<!--              </div>-->
            </div>
        </div>
    </div>
</template>
<script>
  import PwdLogin from './pwd-login/pwd-login'
  import MobileLogin from './mobile-login/mobile-login'
  import {Tabs, Icon} from 'ant-design-vue'
  export default {
    name: 'login',
    components: {
      AIcon: Icon,
      ATabs: Tabs,
      ATabPane: Tabs.TabPane,
      PwdLogin,
      MobileLogin
    },
    methods: {
      tabChange (key) {
      }
    }
  }
</script>
<style lang="less">
    @import './login';
</style>

