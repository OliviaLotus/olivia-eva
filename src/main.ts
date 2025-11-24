// ===== 全局组件 =====
import * as ElementPlusIcons from '@element-plus/icons-vue'
import { createApp } from 'vue'

// ===== 核心配置 =====
import { setupDirective } from '@/directives'
import { setupI18n } from '@/lang'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import App from './App.vue'
// ===== 样式导入 =====
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'vxe-table/lib/style.css'
import '@/styles/index.scss'
import 'uno.css'
import 'animate.css'
// 创建 Vue 应用实例
const app = createApp(App)

// 1.核心配置
setupDirective(app)
setupRouter(app)
setupStore(app)
setupI18n(app)

// 2.全局组件
Object.entries(ElementPlusIcons).forEach(([name, comp]) =>
  app.component(name, comp),
)

// 6.挂载应用
app.mount('#app')
