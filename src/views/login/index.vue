<template>
  <div class="login-page">
    <div class="login-box">
      <h3 class="login-title">{{ $t('msg.login_title') }}</h3>
      <!-- 表单 -->
      <el-form ref="ruleForm" :model="LoginCount" :rules="LoginRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            autofocus
            maxlenght="20"
            style="padding-bottom: 10px"
            :placeholder="noUsername"
            v-model="LoginCount.username"
          ></el-input>
        </el-form-item>
        <!-- 密码项 -->
        <el-form-item prop="password">
          <el-input
            show-password
            type="password"
            maxlenght="20"
            :placeholder="pleaseinpass"
            style="padding-bottom: 10px"
            v-model="LoginCount.password"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 下方的选项 -->
      <div class="login-options" style="padding-bottom: 10px">
        <!-- 转换 -->
        <div class="switch">
          <!-- 记住密码 -->
          <el-switch size="small" v-model="ifRemember"></el-switch
          ><span class="switch-text" style="font-weight: 500">{{
            $t('msg.login_remember')
          }}</span>
        </div>
        <!-- 忘记密码 -->
        <el-link
          class="forgotPass"
          type="primary"
          @click="handleToRegister_Pass"
          >{{ $t('msg.register_Retrieve') }}</el-link
        >
      </div>
      <!-- 登陆按钮 -->
      <el-button
        @click="handleLogin"
        class="loginBtn"
        style="padding-bottom: 10px"
        type="primary"
        >{{ $t('msg.login_title') }}</el-button
      >
    </div>
  </div>
</template>

<script setup>
import '@/styles/login/index.scss' // 导入login样式
import { reactive, ref } from 'vue'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import router from '@/router/index'
import i18n from '@/i18n'
import { ElLoading } from 'element-plus'
const store = useStore()
// 记住密码
const ifRemember = ref(true)

// 注册按钮
const handleToRegister_Pass = () => {
  router.push('/register_forgotPass')
}

// i18n
const { t } = i18n.global
// holder没输入密码，错误提示
const pleaseinpass = computed(() => {
  return t('msg.login_inputpass')
})
// holder没输入用户名
const noUsername = computed(() => {
  return t('msg.login_noUsername')
})
// 错的用户名
const falsename = computed(() => {
  return t('msg.login_falsename')
})
// 错的密码
const falsepass = computed(() => {
  return t('msg.login_falsepass')
})

// 定义用户列表,默认体验用户
const LoginCount = ref({
  username: 'admin',
  password: '123456',
})

// 表单验证
const ruleForm = ref()
const LoginRules = reactive({
  username: [
    {
      required: true,
      message: noUsername,
      trigger: 'change',
    },
    {
      min: 3,
      max: 12,
      message: falsename,
      trigger: 'change',
    },
  ],
  password: [
    {
      required: true,
      message: pleaseinpass,
      trigger: 'change',
    },
    {
      min: 6,
      max: 6,
      message: falsepass,
      trigger: 'change',
    },
  ],
})

/**
 * 登陆动作处理
 */
const loading = ref(false)

const handleLogin = () => {
  // 加载蒙版
  loading.value = true
  store
    .dispatch('user/login', LoginCount.value) // 把用户列表传递给 login dispatch
    .then(() => {
      loading.value = false
      // TODO: 登录后操作
      // 登录后操作
      router.push('/')
    })
    .catch((err) => {
      console.log(err)
      loading.value = false
    })
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module";
.switch {
  color: $menuBg
}
</style>
