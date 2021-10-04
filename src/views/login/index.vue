<template>
  <div class="login">
    <div class="login-form">
      <h2 class="login-form-title">Edu Boss 后台管理系统</h2>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('form')"
            round
            :loading="isLoading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { ElForm } from 'element-ui/types/form'
  import { login } from '@/api/login'

  interface LoginResponse {
    success: boolean
    state: number
    message: string
    content: string
  }

  @Component
  export default class Login extends Vue {
    isLoading = false

    form = {
      phone: '18201288771',
      password: '111111',
    }

    rules = {
      phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        {
          pattern: /^1[3-9]\d{9}$/,
          message: '请输入正确的手机号',
          trigger: 'blur',
        },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
      ],
    }

    submitForm(formName: string) {
      ;(this.$refs[formName] as ElForm).validate((valid: boolean) => {
        if (valid) {
          this._login()
        } else {
          return false
        }
      })
    }

    async _login() {
      try {
        this.isLoading = true
        const res: any = await login(this.form)
        this.$store.commit('setUser', res.content)
        this.$router.push((this.$route.query.redirect as string) || '/')
      } catch (error) {
        this.$message.warning(error.message)
      } finally {
        this.isLoading = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .login {
    width: 100vw;
    height: 100vh;
    background: url('~@/assets/bg.jpg') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    &-form {
      display: flex;
      align-items: center;
      flex-direction: column;
      background: #fff;
      border-radius: 8px;
      padding: 20px;
      min-width: 20%;

      &-title {
        color: rgb(206, 144, 50);
      }

      .el-form {
        width: 100%;
        .el-button {
          width: 100%;
        }
      }
    }
  }
</style>
