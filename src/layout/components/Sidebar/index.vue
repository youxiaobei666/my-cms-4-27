<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        size="44"
        shape="square"
        src="https://p3-passport.byteimg.com/img/user-avatar/03fb8fef286c0520b75f4c9603024ccc~100x100.awebp"
        :size="logoHeight"
      />
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        <!-- 用户信息管理 -->
        {{ $t('msg.menu_system_menu') }}
      </h1>
    </div>
    <sidebarMenu :routes="adminRouterList"></sidebarMenu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import sidebarMenu from './sidebarMenu.vue'

import store from '@/store'
const logoHeight = 44
// admin 路由表
const adminRouterList = ref(store.getters.userInfo.adminRouterList)
</script>

<style lang="scss" scoped>
.logo-container {
  height: 44px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: v-bind(logoHeight) + 'px';
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
