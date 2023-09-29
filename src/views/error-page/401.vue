<template>
  <div class="main">
    <el-button size='large' type='danger' @click="goBack">权限不足，点击返回</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'

const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.main {
  text-align: center;
  padding-top: 100px;
}
</style>
