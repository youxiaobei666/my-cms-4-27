import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
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
import svgIcon from './components/SvgIcon/index.vue'
import installIcons from '@/icons'

const app = createApp(App)
installIcons(app)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 全局注册同步组件
app.component('svgIcon', svgIcon)
app
  .use(i18n)
  .use(store)
  .use(router)
  .use(elementPlus, {
    locale: store.getters.language === 'en' ? en : zhCn,
  })
  .mount('#app')
