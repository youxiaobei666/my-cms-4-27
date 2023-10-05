<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        shape="square"
        src='https://picx.zhimg.com/80/v2-06fa98e9fb5a71b77c6e956a71f05b4f_qhd.jpg'
        :size="logoHeight"
      />
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        <!-- 用户信息管理 -->
        {{ $t('msg.menu_system_menu') }}
      </h1>
    </div>
    <sidebarMenu :routes='routerList'></sidebarMenu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import sidebarMenu from './sidebarMenu.vue'

import store from '@/store'

const logoHeight = 44
// 路由表
const formatStore = store.getters.routerList.filter((i, index) => {
  return i.name
})
const routerList = ref(formatStore)

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
