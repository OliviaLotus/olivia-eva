import type {
  ConfigEnv,
  PluginOption,
} from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import {

  defineConfig,
  loadEnv,
} from 'vite'

const pathSrc = resolve(__dirname, 'src')

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  const isProduction = mode === 'production'
  return {
    resolve: {
      alias: {
        '@': pathSrc,
      },
    },
    css: {
      preprocessorOptions: {
        // 定义全局 SCSS 变量
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: +env.VITE_APP_PORT,
      open: true,
      proxy: {
        // 代理 /dev-api 的请求
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          // 代理目标地址：https://api.youlai.tech
          target: env.VITE_APP_API_URL,
          rewrite: (path: string) =>
            path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
        },
      },
    },
    plugins: [
      vue(),
      UnoCSS(),
      // API 自动导入
      AutoImport({
        // 导入 Vue 函数，如：ref, reactive, toRef 等
        imports: ['vue', '@vueuse/core', 'pinia', 'vue-router', 'vue-i18n'],
        resolvers: [
          // 导入 Element Plus函数，如：ElMessage, ElMessageBox 等
          ElementPlusResolver({ importStyle: 'sass' }),
        ],
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
        vueTemplate: true,
        dts: 'src/types/auto-imports.d.ts',
      }),
      // 组件自动导入
      Components({
        resolvers: [
          // 导入 Element Plus 组件
          ElementPlusResolver({ importStyle: 'sass' }),
        ],
        // 指定自定义组件位置(默认:src/components)
        dirs: ['src/components', 'src/**/components'],
        dts: 'src/types/components.d.ts',
      }),
    ] as PluginOption[],
  }
})
