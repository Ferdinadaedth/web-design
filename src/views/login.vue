<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div class="login_container">
<div id="building">
<div id="back">
<el-page-header @back="redirectToLogin('/')" content="登录页面" class="custom-page-header">
</el-page-header>
</div>
    <div class="login_box">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="loginFormReset">重置</el-button>
          <el-button @click="redirectToLogin('register')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </div>
</template>
<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 2,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    loginFormReset () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async (isvalid) => {
        console.log(isvalid)
        if (!isvalid) return
        const { data: res } = await login(this.loginForm)
        if (res.status === '200') {
           this.$message({
           message: res.message,
             type: 'success',
            showClose: true,
             duration: 3000
           })
        sessionStorage.setItem('token', res.token)
        this.redirectToLogin('/')
        } else {
        this.$message({
           message: res.message,
             type: 'error',
            showClose: true,
             duration: 3000
           })
        }
        console.log(res)
      })
    },
    async redirectToLogin(name) {
      this.$router.push(name)
      console.log('go back')
    }

  }
}
</script>
<style lang="less" scoped>
.login_container {
  //background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
#building{
background:url("../../background-ocean.jpg");
width:100%;//大小设置为100%
height:100%;//大小设置为100%
position:fixed;
background-size:100% 100%;
}
#back {
  font-size: 60px; /* 调整字体大小，您可以根据需要设置其他大小值 */
}
.custom-page-header .el-page-header__content {
  font-size: 30px; /* 调整返回按钮的字体大小 */
}
.custom-page-header .el-page-header__back-btn {
  font-size: 30px; /* 调整返回按钮图标的大小 */
  margin-right: 10px; /* 增加右边距，使图标与文字之间有一定的间隔 */
}
</style>
