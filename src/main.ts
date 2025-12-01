import * as ElementPlusIcons from "@element-plus/icons-vue";
import { createApp } from "vue";
import VXETable from "vxe-table";
import { setupWebSocket } from "@/composables";
import { setupDirective } from "@/directives";
import { setupI18n } from "@/lang";
import { configureVxeTable } from "@/plugins/vxe-table";
import { setupRouter } from "@/router";
import { setupPermissionGuard } from "@/router/guards/permission";
import { setupStore } from "@/store";
import App from "./App.vue";

// ===== 样式导入 =====
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "vxe-table/lib/style.css";
import "@/styles/index.scss";
import "uno.css";
import "animate.css";

// 创建 Vue 应用实例
const app = createApp(App);

// 1.核心配置
setupDirective(app);
setupRouter(app);
setupStore(app);
setupI18n(app);

// 2.全局组件
Object.entries(ElementPlusIcons).forEach(([name, comp]) => app.component(name, comp));

// 3.第三方插件
configureVxeTable();
app.use(VXETable);

// 4.路由守卫
setupPermissionGuard();

// 5.WebSocket 初始化
setupWebSocket();

// 6.挂载应用
app.mount("#app");
