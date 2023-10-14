<template>
  <div class="register-container">
    <div class="register-box">
      <div class="title-box">
      </div>
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginFn" class="btn-log">登录</el-button>
          <el-link @click="$router.push('/reg')">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index.js'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'my-login',
  data () {
    return {
      loginForm: { username: '', password: '' },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '必须1-10的大小写字母或数字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{4,8}$/,
            message: '必须4-8的非空字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    ...mapMutations(['updateToken']),
    loginFn () {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return false
        const { data: res } = await loginAPI(this.loginForm)
        if (res.code !== 0) return this.$message.error('登录失败！')
        this.$message.success('登录成功！')
        this.updateToken(res.token)
        console.log(this.token)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  background: url('../../assets/login_bg.jpg') center;
  background-size: cover;
  height: 100vh;
}
.register-box {
  width: 400px;
  height: 335px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 30px;
  box-sizing: border-box;
}
.title-box {
  height: 60px;
  background: url('../../assets/login_title.png') center no-repeat;
}
.btn-log {
  width: 100%;
}
</style>
