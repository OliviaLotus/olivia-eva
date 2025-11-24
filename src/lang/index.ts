import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { useAppStoreHook } from '@/store/modules/app'
// 本地语言包
import enLocale from './package/en.json'
import zhCnLocale from './package/zh-cn.json'

const appStore = useAppStoreHook()

const messages = {
  'en': enLocale,
  'zh-cn': zhCnLocale,
}

const i18n = createI18n({
  legacy: false,
  locale: appStore.language,
  messages,
  globalInjection: true,
})

export function setupI18n(app: App<Element>) {
  app.use(i18n)
}

export default i18n
