<template>
  <div class="register-container">
    <div class="register-box">
      <div class="title-box">
      </div>
      <el-form :model="regForm" :rules="regRules" ref="regForm">
        <el-form-item prop="username">
          <el-input v-model="regForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="regForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="regForm.repassword" placeholder="确认密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="regNewUserFn" class="btn-reg">注册</el-button>
          <el-link @click="$router.push('/login')">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerAPI } from '@/api/index'
export default {
  name: 'my-register',
  data () {
    const samePwd = (rule, value, callback) => {
      if (value !== this.regForm.password) {
        callback(new Error('密码两次输入不同！'))
      } else {
        callback()
      }
    }
    return {
      regForm: { username: '', password: '', repassword: '' },
      regRules: {
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
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            pattern: /^\S{4,8}$/,
            message: '必须4-8的非空字符',
            trigger: 'blur'
          },
          { validator: samePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    regNewUserFn () {
      this.$refs.regForm.validate(async valid => {
        if (!valid) return false
        const { data: res } = await registerAPI(this.regForm)
        console.log(res)
        if (res.code !== 0) return this.$message.error('注册失败')
        this.$message.success('注册成功！')
        this.$router.push('/login')
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
.btn-reg {
  width: 100%;
}
</style>
