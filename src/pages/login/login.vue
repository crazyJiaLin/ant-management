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
                    <a-form-item :wrapper-col="wrapperCol" has-feedback>
                        <a-input ref="usernameInput" placeholder="请输入用户名" type="text" size="large"
                            v-decorator="[
                                'username',
                                { rules: [{ required: true, message: '用户名不能为空' }] }
                            ]">
                            <a-icon slot="prefix" type="user" />
                            <!-- <a-icon v-if="username" slot="suffix" type="close-circle"/> -->
                        </a-input>
                    </a-form-item>
                    <a-form-item :wrapper-col="wrapperCol" has-feedback>
                        <a-input  ref="passwordInput" placeholder="请输入密码" type="passsword" size="large"
                            v-decorator="[
                                'password',
                                { rules: [{ required: true, message: '密码不能为空' }] }
                            ]" >
                            <a-icon slot="prefix" type="lock"/>
                            <!-- <a-icon v-if="password" slot="suffix" type="close-circle"/> -->
                        </a-input>
                    </a-form-item>
                    <a-row>
                        <a-col :span="15">
                            <a-form-item :wrapper-col="wrapperCol" has-feedback>
                                <a-input  ref="captchaCodeInput" placeholder="请输入验证码" type="text" size="large"
                                    v-decorator="[
                                        'captchaCode',
                                        { rules: [{ required: true, message: '验证码不能为空' }] }
                                    ]" >
                                    <a-icon slot="prefix" type="lock"/>
                                    <!-- <a-icon v-if="captchaCode" slot="suffix" type="close-circle" /> -->
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="8" :offset="1">
                            <div class="captcha-img" title="点击刷新" @click="reloadCaptcha">
                                <!-- {{captchaImg}} -->
                                <img :src="captchaImg" alt="验证码">
                            </div>
                        </a-col>
                    </a-row>
                   <a-form-item :wrapper-col="wrapperCol">
                        <a-button class="login-btn" :loading="btnLoading" type="primary" size="large" html-type="submit">登录</a-button>
                   </a-form-item>
                    
                </a-form>
            </div>
        </div>
    </div>
</template>
<script>
import {Form, Input, Button, Icon, Row, Col, Message} from 'ant-design-vue'
import Md5 from 'md5'

export default {
    components: {
        AForm: Form,
        AFormItem: Form.Item,
        AInput: Input,
        AButton: Button,
        AIcon: Icon,
        ARow: Row,
        ACol: Col
    },
    data () {
        return {
            username: '',
            password: '',
            captchaId: '',
            captchaImg: '',
            captchaCode: '',
            btnLoading: false,
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
                console.log('Received values of form: ', values);
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
                console.log('then', res)
                this.btnLoading = false;
                let data = res.data;
                if(data.access_token){
                    //将acces_token和用户名保存到localStorage
                    this.$setLocalStorage('access_token', data.access_token, data.expires_at);
                    this.$setLocalStorage('username', values.username, data.expires_at);
                    // localStorage.setItem('username', values.username)
                    //路由跳转
                    this.$router.push({
                        path: '/'
                    });
                }
            }).catch(err => {
                console.log('catch', err)
                console.log(err.response)
                this.btnLoading = false;
                // let errData = err.response.data.error;
                // if(errData.message === "无效的验证码"){
                    
                // }else if(errData.message === '用户名或密码错误'){}
                // if(err.response.)
            })
        },
        getCaptchaId () {
            //获取验证码
            this.$axios.get('/login/captchaid').then((res) => {
                console.log(res.data)
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
            this.getCaptchaId();
        },
        getCaptchaImg (action) {
            let params = {
                    id: this.captchaId,
                };
            action === 'reload' && (params.reload = 1);
            this.$axios.get('/login/captcha',{
                responseType : 'blob',  //一定要设置响应数据类型为blob，不然数据就是一群乱码，此处可以写份采坑记录
                params: params
            }).then((res) => {
                // console.log(res);
                if(res.data){
                this.blobToDataURL(res.data,(img) => {
                    this.captchaImg =img;
                })
                }
            }).catch((err) => {
                console.log(err)
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
    mounted () {
        this.getCaptchaId()
        // console.log(this.binToBase64(010))
        // console.log(window.URL, window.webkitURL)
    }
}
</script>
<style lang="less" scoped>
    @import './login';
</style>

