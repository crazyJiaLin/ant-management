<template>
  <a-form class="login-form" :form="form"  @submit="handleSubmit">
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
    <a-row style="margin-bottom: 20px;">
      <a-col :span="12" >
        <a>忘记密码</a>
      </a-col>
      <a-col :span="12" style="text-align: right;">
        <router-link class="register" :to="{ path: '/register' }">注册账户</router-link>
        <!--        <a-checkbox v-model="autoLogin"> 自动登录 </a-checkbox>-->
      </a-col>
    </a-row>
    <a-form-item>
      <a-button class="login-btn" :loading="btnLoading" type="primary" size="large" html-type="submit">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  import {Form, Input, Button, Icon, Row, Col, Message, Checkbox} from 'ant-design-vue'
  export default {
    name: "mobile-login",
    components: {
      AForm: Form,
      AFormItem: Form.Item,
      AInput: Input,
      AButton: Button,
      AIcon: Icon,
      ARow: Row,
      ACol: Col,
      ACheckbox: Checkbox
    },
    data() {
      return {
        form: this.$form.createForm(this),
        autoLogin: false,
        btnLoading: false,
        state: {
          time: 60,
          loginBtn: false,
          smsSendBtn: false
        }
      }
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            this.btnLoading = true;
            this.login(values);
          }
        });
      },
      login (values) {
        console.log('mobile-login', values)
        this.btnLoading = true;
        setTimeout(() => {
          this.btnLoading = false;
          message.success('登陆成功');
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
    }
  }
</script>

<style scoped>

</style>
