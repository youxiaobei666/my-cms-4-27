<template>
  <div class="hamburger-container" @click="toggleClick">
    <!-- <svg-icon class="hamburger" :icon="icon"></svg-icon> -->

    <template v-if="store.getters.sidebarOpened">
      <el-icon class="hamburger">
        <Fold />
      </el-icon>
    </template>
    <template v-else>
      <el-icon class="hamburger">
        <Expand />
      </el-icon>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
