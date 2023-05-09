<template>
  <div class="">个人中心</div>
  <div>
    <el-upload
      action=""
      :before-upload="handleBeforeUpload"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
    >
      <el-button type="primary">选择文件</el-button>
    </el-upload>
  </div>
</template>

<script setup>
import {} from 'vue'
import XLSX from 'xlsx'
const handleBeforeUpload = (file) => {
  // 只允许上传Excel文件
  const fileType = file.type
  if (
    fileType !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
    fileType !== 'application/vnd.ms-excel'
  ) {
    this.$message.error('只能上传Excel文件')
    return false
  }
  return true
}
const handleUploadSuccess = (response, file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    console.log(jsonData)
  }
  reader.readAsArrayBuffer(file.raw)
}

const handleUploadError = (error, file) => {
  console.error(error)
  this.$message.error('上传文件失败')
}
</script>

<style lang="scss" scoped></style>
