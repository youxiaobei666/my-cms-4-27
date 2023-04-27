import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementPlus from 'element-plus'
// i18n
import i18n from './i18n'
// 导入全局样式
import './styles/index.scss'
// 导入路由鉴权
import './permission'
// 导入 element-plus 样式
import 'element-plus/dist/index.css'
// 注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(i18n).use(store).use(router).use(elementPlus).mount('#app')
