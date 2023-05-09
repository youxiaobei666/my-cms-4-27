<template>
  <!-- tableall -->
  <el-table
    :data="tableData"
    style="width: 98%"
    stripe
    height="600px"
    :scrollbar-always-on="true"
  >
    <el-table-column :label="$t('msg.menu_id')" width="100">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><key></key></el-icon>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>
    <!-- 姓名 -->
    <el-table-column :label="$t('msg.menu_name')" width="100">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>{{ $t('msg.menu_name') }}: {{ scope.row.name }}</div>
            <div>{{ $t('msg.menu_city') }}: {{ scope.row.city }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <!-- age -->
    <el-table-column :label="$t('msg.menu_age')" width="100">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-tag type="success">{{ scope.row.age }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <!-- city -->
    <el-table-column :label="$t('msg.menu_city')" width="100">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-tag type="warning">{{ scope.row.city }}</el-tag>
        </div>
      </template>
    </el-table-column>

    <!-- email -->
    <el-table-column :label="$t('msg.menu_email')" width="250">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><message></message></el-icon>
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </div>
      </template>
    </el-table-column>
    <!-- hobby -->
    <el-table-column :label="$t('msg.menu_hobby')" width="120">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><StarFilled /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.hobby }}</span>
        </div>
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column :label="$t('msg.menu_setup')" width="160">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">{{
          $t('msg.edit')
        }}</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >{{ $t('msg.delete') }}</el-button
        >
      </template>
    </el-table-column>
    <!-- img -->
    <el-table-column :label="$t('msg.menu_img')" width="200">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-avatar shape="square" :src="scope.row.img"></el-avatar>
          <div @click="dialogVisible = true">
            <el-button text @click="handleShowBigImg(scope.$index, scope.row)">
              {{ $t('msg.popover_img') }}
            </el-button>
          </div>

          <el-dialog v-model="dialogVisible" width="40%" :show-close="false">
            <!-- 弹出内容 -->
            <el-avatar :src="BigImgUrl" :size="300" shape="square"></el-avatar>
            <!-- 弹出内容 -->
            <template #footer>
              <span class="dialog-footer">
                <el-button>{{ $t('msg.popover_back') }}</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                  {{ $t('msg.popover_confirm') }}
                </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import store from '@/store'
import { ref } from 'vue'

// big img
let BigImgUrl = ''
let dialogVisible = ref(false)
const handleShowBigImg = (index, row) => {
  // 必须先绑定图片
  BigImgUrl = row.img
}

// 编辑&删除
const handleEdit = (index, row) => {}
const handleDelete = (index, row) => {}

// 表格数据源
const data = store.getters.userAllInfo
console.log(data)

// 表格内部数据
const tableData = []
data.forEach((item, index) => {
  tableData.push({
    id: data[index].id,
    name: data[index].username,
    age: data[index].age,
    img: data[index].img,
    city: data[index].city,
    email: data[index].email,
    hobby: data[index].hobby,
    setup: '删除',
  })
})
console.log(tableData)
</script>

<style scoped lang="scss">
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
