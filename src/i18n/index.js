// 创建语言列表，不同语言的内容
import EN from './en'
import ZH from './zh'
import store from '@/store'

const messages = {
  en: {
    msg: EN,
  },
  zh: {
    msg: ZH,
  },
}

const locale = 'zh' // 创建本地标识，通过修改它来控制全文的语言环境

/**
 * 返回当前 lang
 */
function getLanguage() {
  return store && store.getters && store.getters.language
}

import { createI18n } from 'vue-i18n' // 导入createI18n方法

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: getLanguage(),
  messages, // 这是定义好的语言表
})

export default i18n // 导出 i18n
