<template>
  <div :class="{ show: isShow }" class="header-search">
    <svg-icon
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    />
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import store from '@/store'

const router = useRouter()
// 控制 search 显示
const isShow = ref(false)
// el-select 实例
const headerSearchSelectRef = ref(null)
const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}
// 数据源
// let searchPool = ref([
//   {
//     path: '/user',
//     title: ['用户']
//   },
//   {
//     path: '/user/manage',
//     title: ['用户', '用户管理']
//   },
//   {
//     path: '/auth',
//     title: ['权限']
//   },
//   {
//     path: '/auth/assign',
//     title: ['权限', '权限分配']
//   }
// ])

let searchPool = computed(() => {
  return store.getters.language === 'en' ? [
    {
      path: '/user',
      title: ['user']
    },
    {
      path: '/user/manage',
      title: ['user', 'userManage']
    },
    {
      path: '/auth',
      title: ['auth']
    },
    {
      path: '/auth/assign',
      title: ['auth', 'authAssign']
    }
  ] : [
    {
      path: '/user',
      title: ['用户']
    },
    {
      path: '/user/manage',
      title: ['用户', '用户管理']
    },
    {
      path: '/auth',
      title: ['权限']
    },
    {
      path: '/auth/assign',
      title: ['权限', '权限分配']
    }
  ]
})

// 搜索库
let fuse = new Fuse(searchPool.value, {
  // 是否按优先级进行排序
  shouldSort: true,
  // 匹配长度超过这个值的才会被认为是匹配的
  minMatchCharLength: 1,
  // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
  // name：搜索的键
  // weight：对应的权重
  keys: [
    {
      name: 'title',
      weight: 1
    },
    // {
    //   name: 'path',
    //   weight: 0.3,
    // },
  ],
})
// 搜索结果
const searchOptions = ref([])
// 搜索方法
const querySearch = (query) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
// 选中回调
const onSelectChange = (val) => {
  router.push(val.path)
}

/**
 * 关闭 search 的处理事件
 */
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}
/**
 * 监听 search 打开，处理 close 事件
 */
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

// // 语言
// watchSwitchLang(() => {
//   console.log('bianl')
//    if(store.getters.language === 'en') {
//      searchPool = [
//        {
//          path: '/user',
//          title: ['user'],
//        },
//        {
//          path: '/user/manage',
//          title: ['user', 'userManage'],
//        },
//        {
//          path: '/auth',
//          title: ['auth']
//        },
//        {
//          path: '/auth/assign',
//          title: ['auth', 'authAssign']
//        }
//      ]
//    } else {
//      searchPool = [
//        {
//          path: '/user',
//          title: ['用户'],
//        },
//        {
//          path: '/user/manage',
//          title: ['用户', '用户管理'],
//        },
//        {
//          path: '/auth',
//          title: ['权限']
//        },
//        {
//          path: '/auth/assign',
//          title: ['权限', '权限分配']
//        }
//      ]
//    }
// })
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
