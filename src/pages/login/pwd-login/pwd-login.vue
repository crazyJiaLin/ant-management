<template>
  <a-form class="login-form" :form="form"  @submit="handleSubmit">
    <a-form-item :wrapper-col="wrapperCol" has-feedback>
      <a-input ref="usernameInput" placeholder="请输入用户名" type="text" size="large" autocomplete="true"
               v-decorator="[
                                'username',
                                { rules: [{ required: true, message: '用户名不能为空' }] }
                            ]">
        <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        <!-- <a-icon v-if="username" slot="suffix" type="close-circle"/> -->
      </a-input>
    </a-form-item>
    <a-form-item :wrapper-col="wrapperCol" has-feedback>
      <a-input  ref="passwordInput" placeholder="请输入密码" type="password" size="large"
                v-decorator="[
                                'password',
                                { rules: [{ required: true, message: '密码不能为空' }] }
                            ]" >
        <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        <!-- <a-icon v-if="password" slot="suffix" type="close-circle"/> -->
      </a-input>
    </a-form-item>
    <a-row>
      <a-col :span="15">
        <a-form-item :wrapper-col="wrapperCol" has-feedback>
          <a-input ref="captchaCodeInput" placeholder="请输入验证码" type="text" size="large" autocomplete="off"
                   v-decorator="[
                                        'captchaCode',
                                        { rules: [{ required: true, message: '验证码不能为空' }] }
                                    ]" >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            <!-- <a-icon v-if="captchaCode" slot="suffix" type="close-circle" /> -->
          </a-input>
        </a-form-item>
      </a-col>
      <a-col :span="8" :offset="1">
        <div class="captcha-img" title="点击刷新" @click="reloadCaptcha">
          <div v-if="captchaLoading" class="captcha-loading">
            <a-icon type="loading"></a-icon>
          </div>
          <!-- {{captchaImg}} -->
          <img v-if="!captchaLoading" :src="captchaImg" alt="验证码">
        </div>
      </a-col>
    </a-row>
    <a-row style="margin-bottom: 20px;">
      <a-col :span="12">
        <a>忘记密码</a>
      </a-col>
      <a-col :span="12"  style="text-align: right;">
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
  import Md5 from 'md5'

  export default {
    name:'pwd-login',
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
    data () {
      return {
        username: '',
        password: '',
        captchaId: '',
        captchaImg: '',
        captchaCode: '',
        autoLogin: false, //自动登录
        captchaLoading: false,
        btnLoading: false,
        redirectPath: this.$route.query.redirect ? this.$route.query.redirect : '/',
        form: this.$form.createForm(this),
        labelCol: {span: 0},
        wrapperCol: {span: 24},
      }
    },
    methods: {
      emptyInput (value, ref) {
        this.$refs[ref].focus()
        this[value] = ''
      },
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
        this.$axios.post('/login',{
          "captcha_code": values.captchaCode,
          "captcha_id": this.captchaId,
          "password": Md5(values.password),
          "user_name": values.username
        }).then(res => {
          // console.log('then', res)
          this.btnLoading = false;
          let data = res.data;
          if(data.access_token){
            this.$emit('login', data, values.username)
          }
        }).catch(err => {
          console.log(err.response)
          this.btnLoading = false;
          //如果登陆失败，则重新获取验证码
          this.getCaptchaId();
          this.form.resetFields('captchaCode');
          if(err.response.data.error.message == "无效的验证码"){
            this.$refs.captchaCodeInput.focus();
          }
        })
      },
      getCaptchaId () {
        //获取验证码
        this.$axios.get('/login/captchaid').then((res) => {
          // console.log(res.data)
          let data = res.data;
          if(data.captcha_id) {
            this.captchaId = data.captcha_id;
            this.getCaptchaImg()
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      reloadCaptcha () {
        //重新加载验证码图片
        this.getCaptchaImg('reload');
      },
      getCaptchaImg (action) {
        let params = {
          id: this.captchaId,
        };
        if(action === 'reload') {
          params.reload = Math.random()
        }
        this.captchaLoading = true;
        this.$axios.get('/login/captcha',{
          responseType : 'blob',  //一定要设置响应数据类型为blob，不然数据就是一群乱码，此处可以写份采坑记录
          params: params
        }).then((res) => {
          // console.log(res);
          if(res.data){
            this.blobToDataURL(res.data,(img) => {
              this.captchaImg =img;
              this.captchaLoading = false;
            })
          }
        }).catch((err) => {
          console.log(err)
        }).finally(() => {

        })
      },
      blobToDataURL(blob, callback) {
        var a = new FileReader();
        a.onload = function(e) {
          callback(e.target.result);
        }
        a.readAsDataURL(blob);
        return a;
      }
    },
    created () {
      //获取验证码
      this.getCaptchaId()
      //获取当前页面请求参数，用于做登陆重定向
      // console.log(this.$route.query)
    }
  }
</script>

<style scoped>

</style>
