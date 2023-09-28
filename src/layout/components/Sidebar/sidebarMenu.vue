<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    :default-active="activeMenu"
    :collapse="!$store.getters.sidebarOpened"
    active-text-color="#ffd04b"
    router
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import sidebarItem from './sidebarItem.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 定义 props
defineProps({
  routes: {
    type: Object,
    required: true,
  },
})
// 计算高亮 menu 的方法
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>


<style lang="scss"></style>
