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
        <a-form class="login-form" :form="form"  @submit="handleSubmit">
          <a-form-item>
            <a-input size="large" type="text" placeholder="用户名"
                     v-decorator="['username', {rules: [{ required: true, message:'请输入用户名'}], validateTrigger: 'blur'}]">
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-popover
            placement="rightTop"
            :trigger="['focus']"
            :getPopupContainer="(trigger) => trigger.parentElement"
            v-model="state.passwordLevelChecked">
            <template slot="content">
              <div :style="{ width: '240px' }" >
                <div :class="['user-register', passwordLevelClass]">强度：<span>{{ passwordLevelName }}</span></div>
                <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor " />
                <div style="margin-top: 10px;">
                  <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                </div>
              </div>
            </template>
            <a-form-item>
              <a-input
                size="large"
                type="password"
                @click="handlePasswordInputClick"
                autocomplete="false"
                placeholder="至少6位密码，区分大小写"
                v-decorator="['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
              >
                <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
            </a-form-item>
          </a-popover>
          <a-form-item>
            <a-input size="large" placeholder="确认密码" type="password" v-decorator="['confirmPassword', {rules: [{ required: true},{ validator: this.handlePasswordCheck }], validateTrigger: 'blur'}]">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input size="large" type="text" placeholder="手机号" v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]">
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input size="large" type="text" placeholder="验证码" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                size="large" style="width: 100%"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
              ></a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="14">
              <a-form-item>
                <a-button class="login-btn" :loading="btnLoading" type="primary" size="large" html-type="submit">注册</a-button>
              </a-form-item>
            </a-col>
            <a-col :span="10" style="text-align: right;">
              <router-link class="ant-btn ant-btn-link ant-btn-lg" :to="{path: '/login'}">使用已有账号登录</router-link>
<!--              <a-button size="large" type="link">使用已有账号登录</a-button>-->
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
  const levelNames = {
    0: '低',
    1: '低',
    2: '中',
    3: '强'
  }
  const levelClass = {
    0: 'error',
    1: 'error',
    2: 'warning',
    3: 'success'
  }
  const levelColor = {
    0: '#ff0000',
    1: '#ff0000',
    2: '#ff7e05',
    3: '#52c41a'
  }
  import {Form, Input, Button, Icon, Row, Col, Message, Popover, Progress} from 'ant-design-vue'
  export default {
    name: "register",
    components: {
      AForm: Form,
      AFormItem: Form.Item,
      AInput: Input,
      AButton: Button,
      AIcon: Icon,
      ARow: Row,
      ACol: Col,
      APopover: Popover,
      AProgress: Progress
    },
    computed: {
      passwordLevelClass () {
        return levelClass[this.state.passwordLevel]
      },
      passwordLevelName () {
        return levelNames[this.state.passwordLevel]
      },
      passwordLevelColor () {
        return levelColor[this.state.passwordLevel]
      }
    },
    data () {
      return {
        form: this.$form.createForm(this),
        btnLoading: false,
        state: {
          time: 60,
          smsSendBtn: false,
          passwordLevel: 0,
          passwordLevelChecked: false,
          percent: 10,
          progressColor: '#FF0000'
        },
      }
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            this.btnLoading = true;
            this.register(values)
          }
        });
      },
      register (values) {
        console.log('register', values)
        this.btnLoading = true;
        setTimeout(() => {
          this.btnLoading = false;
          message.success('注册成功');
        }, 1000)
      },
      getCaptcha (e) {
        e.preventDefault()
        const { form: { validateFields }, state } = this

        validateFields(['mobile'], { force: true }, (err, values) => {
          if (!err) {
            state.smsSendBtn = true

            const interval = window.setInterval(() => {
              if (state.time-- <= 0) {
                state.time = 60
                state.smsSendBtn = false
                window.clearInterval(interval)
              }
            }, 1000)

            const hide = message.loading('验证码发送中..', 0)
            setTimeout(() => {
              hide();
              notification['success']({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + 1234,
                duration: 8
              })
            }, 2500)
          }
        })
      },
      // 密码等级确认
      handlePasswordLevel (rule, value, callback) {
        let level = 0

        // 判断这个字符串中有没有数字
        if (/[0-9]/.test(value)) {
          level++
        }
        // 判断字符串中有没有字母
        if (/[a-zA-Z]/.test(value)) {
          level++
        }
        // 判断字符串中有没有特殊符号
        if (/[^0-9a-zA-Z_]/.test(value)) {
          level++
        }
        this.state.passwordLevel = level
        this.state.percent = level * 30
        if (level >= 2) {
          if (level >= 3) {
            this.state.percent = 100
          }
          callback()
        } else {
          if (level === 0) {
            this.state.percent = 10
          }
          callback(new Error('密码强度不够'))
        }
      },
      // 密码校验
      handlePasswordCheck (rule, value, callback) {
        const password = this.form.getFieldValue('password')
        // console.log('value', value)
        if (value === undefined) {
          callback(new Error('请输入密码'))
        }
        if (value && password && value.trim() !== password.trim()) {
          callback(new Error('两次密码不一致'))
        }
        callback()
      },
      handlePasswordInputClick () {
        this.state.passwordLevelChecked = true
      },
    }
  }
</script>
<style lang="less">
  .user-register {

    &.error {
      color: #ff0000;
    }

    &.warning {
      color: #ff7e05;
    }

    &.success {
      color: #52c41a;
    }

  }
  .user-layout-register {
    .ant-input-group-addon:first-child {
      background-color: #fff;
    }
  }
</style>
<style lang="less" scoped>
  @import "../login/login";
  .user-layout-register {

    & > h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .register-button {
      width: 50%;
    }

    .login {
      float: right;
      line-height: 40px;
    }
  }
</style>

