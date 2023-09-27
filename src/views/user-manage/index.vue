<template>
  <!-- tableall -->
  <el-table
    :data="store.getters.userAllInfo"
    stripe
    height="600px"
    :scrollbar-always-on="true"
  >
    <el-table-column :label="$t('msg.menu_id')">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon>
            <key></key>
          </el-icon>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>
    <!-- 姓名 -->
    <el-table-column :label="$t('msg.menu_name')">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>{{ $t('msg.menu_name') }}: {{ scope.row.username }}</div>
            <div>{{ $t('msg.menu_city') }}: {{ scope.row.city }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.username }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <!-- age -->
    <el-table-column :label="$t('msg.menu_age')">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-tag type="success">{{ scope.row.age }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <!-- city -->
    <el-table-column :label="$t('msg.menu_city')">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-tag type="warning">{{ scope.row.city }}</el-tag>
        </div>
      </template>
    </el-table-column>
    <!-- email -->
    <el-table-column :label="$t('msg.menu_email')" width="300">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon>
            <message></message>
          </el-icon>
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </div>
      </template>
    </el-table-column>
    <!-- hobby -->
    <el-table-column :label="$t('msg.menu_hobby')">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon>
            <StarFilled />
          </el-icon>
          <span style="margin-left: 10px">
            <el-tag
              v-for="(item, index) in scope.row.hobby.split(',')"
              :key="index"
            >
              {{ hobbyMap[item - 1]?.label || '' }}
            </el-tag>
          </span>
        </div>
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column :label="$t('msg.menu_setup')">
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
    <el-table-column :label="$t('msg.menu_img')">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-avatar shape="square" :src="scope.row.img"></el-avatar>
          <div @click="imgVisible = true">
            <el-button
              text
              @click.stop="handleShowBigImg(scope.$index, scope.row)"
            >
              {{ $t('msg.popover_img') }}
            </el-button>
          </div>
        </div>
      </template>
    </el-table-column>
  </el-table>

  <!-- 图片框 -->
  <el-dialog
    v-model="imgVisible"
    :title="$t('msg.dialog_showBigImg')"
    width="40%"
    :show-close="false"
  >
    <el-avatar :src="BigImgUrl" :size="300" shape="square"></el-avatar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="imgVisible = false">{{
          $t('msg.popover_back')
        }}</el-button>
        <el-button type="primary" @click="imgVisible = false">
          {{ $t('msg.popover_confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 编辑框 -->
  <el-dialog v-model="editVisible" :title="$t('msg.dialog_edit')" width="30%">
    <!-- 表单 -->
    <el-form :form="editForm" label-width="80px">
      <el-form-item :label="$t('msg.menu_name')">
        <el-input v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('msg.menu_age')">
        <el-input v-model="editForm.age"></el-input>
      </el-form-item>
      <!-- 头像上传 -->
      <el-form-item :label="$t('msg.menu_img')">
        <el-upload
          action="/upload"
          :file-list="fileList"
          name="file"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          list-type="picture-card"
          :auto-upload="true"
          :limit="1"
          :headers="getAuthHeaders()"
        >
          <el-icon  class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <!-- 地区选择 -->
      <el-form-item :label="$t('msg.menu_city')">
        <el-cascader
          v-model="editForm.city"
          :options="regionOptions"
          @change="handleChangeRegion"
          :placeholder="editForm.city"
        ></el-cascader>
      </el-form-item>
      <el-form-item :label="$t('msg.menu_email')">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('msg.menu_hobby')">
        <el-checkbox-group
          v-model="hobbyCheckboxes"
          @change="handleHobbyChange"
        >
          <el-checkbox
            v-for="item in hobbyMap"
            :key="item.id"
            :label="item.value"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editVisible = false">{{
          $t('msg.popover_back')
        }}</el-button>
        <el-button type="primary" @click="handleConfirmEdit">
          {{ $t('msg.popover_confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import store from '@/store'
import { ref, reactive } from 'vue'
import { getItem } from '@/utils/storage'
import { TOKEN, hobbyMap } from '@/constant/index'
import formatRegion from '@/utils/formatRegion'
import regionDatas from '@/constant/regionData'
import { editUserInfo, deleteUser } from '@/utils/api/sys'
import { ElMessage } from 'element-plus'

// 表格数据源
const BigImgUrl = ref('')
const imgVisible = ref(false)
const editVisible = ref(false)
const editForm = reactive({
  name: '',
  id: '',
  name: '',
  age: '',
  img: '',
  city: '',
  email: '',
  hobby: '',
})
const toBeEditId = ref('')
const fileList = ref([])
const regionOptions = reactive(formatRegion(regionDatas)) // 获取地区的配置
const hobbyCheckboxes = ref()

// 图片显示事件
const handleShowBigImg = (index, row) => {
  imgVisible.value = true
  // 赋值图片 url
  BigImgUrl.value = row.img
}
// 编辑 | 删除事件
const handleEdit = (index, row) => {
  editVisible.value = true
  toBeEditId.value = row.id
}
const handleDelete = (index, row) => {
  deleteUser(row.id).then(res => {
    if (res.success) {
      ElMessage({
        message: res.message,
        type: 'success',
      })
    } else {
      ElMessage({
        message: res.message,
        type: 'error',
      })
    }
  })
  editVisible.value = false
}

// 文件上传
const getAuthHeaders = () => {
  const token = getItem(TOKEN) || ''
  return {
    Authorization: `Bearer ${token}`,
  }
}

const handleSuccess = (response, file) => {
  fileList.value.push(file)
  file.url = response.url
  editForm.img = response.url
}

const handleRemove = (file) => {
  fileList.value = fileList.value.filter((f) => f.url !== file.url)
  editForm.img = ''
}

const handleChangeRegion = (value) => {
  editForm.city = value[1]
}

const handleHobbyChange = (value) => {
  editForm.hobby = value.join(',')
}

// 确认修改用户信息事件
const handleConfirmEdit = () => {
  editForm.id = toBeEditId.value
  console.log(editForm)
  editUserInfo(editForm).then((res) => {
    if (res.success) {
      ElMessage({
        message: res.message,
        type: 'success',
      })
    } else {
      ElMessage({
        message: res.message,
        type: 'error',
      })
    }
  })
  editVisible.value = false
}
</script>

<style scoped lang="scss">
.dialog-footer button:first-child {
  margin-right: 10px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
