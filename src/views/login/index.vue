<template>
  <div class="auth-view">
    <div class="auth-view__toolbar">
      <el-tooltip :content="t('login.themeToggle')" placement="bottom">
        <div class="toolbar-item">
          <ThemeSwitch />
        </div>
      </el-tooltip>
      <el-tooltip :content="t('login.languageToggle')" placement="bottom">
        <div class="toolbar-item">
          <LangSelect size="text-20px" />
        </div>
      </el-tooltip>
    </div>

    <div class="auth-view__wrapper">
      <section class="auth-panel">
        <div class="auth-panel__brand">
          <div class="auth-panel__logo-wrap">
            <el-image :src="logo" class="auth-panel__logo" />
          </div>
          <div class="auth-panel__meta">
            <div class="auth-panel__title-row">
              <span class="auth-panel__title">{{ appConfig.title }}</span>
            </div>
            <div v-if="tenantEnabled" class="auth-panel__version-row">
              <el-tag v-if="tenantEnabled" type="success" size="small" effect="light" round>
                多租户
              </el-tag>
            </div>
          </div>
        </div>

        <transition name="fade-slide" mode="out-in">
          <component :is="formComponents[component]" v-model="component" class="auth-panel__form" />
        </transition>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/images/logo.png";
import { appConfig } from "@/settings";
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";

type LayoutMap = "login" | "register" | "resetPwd";

const { t } = useI18n();
const component = ref<LayoutMap>("login");

const tenantEnabled = appConfig.tenantEnabled;

const formComponents = {
  login: defineAsyncComponent(() => import("./components/Login.vue")),
  register: defineAsyncComponent(() => import("./components/Register.vue")),
  resetPwd: defineAsyncComponent(() => import("./components/ResetPwd.vue")),
};
</script>

<style lang="scss" scoped>
.auth-view {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding: clamp(1rem, 3vw, 2rem);
  overflow: hidden;
  background-color: #f5f7ff;

  &::before {
    position: fixed;
    inset: 0;
    z-index: -2;
    content: "";
    background: url("@/assets/images/login-bg.svg") center/cover no-repeat;
  }

  &::after {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    content: "";
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0));
  }
}

.auth-view__toolbar {
  display: inline-flex;
  gap: 0.75rem;
  align-self: flex-end;
  padding: 0.5rem 0.75rem;
  background-color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(22, 93, 255, 0.15);
  border-radius: 999px;
  box-shadow: 0 10px 30px rgba(22, 93, 255, 0.12);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 16px 40px rgba(22, 93, 255, 0.18);
    transform: translateY(-2px);
  }

  .toolbar-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--el-fill-color);
    }
  }

  @media (max-width: 640px) {
    position: fixed;
    top: 12px;
    right: 16px;
    z-index: 20;
    align-self: flex-end;
    justify-content: center;
  }

  @media (prefers-color-scheme: dark) {
    background-color: rgba(24, 28, 43, 0.8);
    border-color: rgba(64, 128, 255, 0.3);
  }
}

/* 应用内暗黑主题下顶部设置面板的深色样式 */
.dark .auth-view__toolbar {
  background-color: rgba(24, 28, 43, 0.9);
  border-color: rgba(64, 128, 255, 0.35);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(90, 140, 255, 0.25) inset;
}

.auth-view__wrapper {
  display: grid;
  flex: 1;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1.5rem, 3vw, 3rem);
  align-items: stretch;
  padding: clamp(1.5rem, 2vw, 2.5rem);
}

@media (max-width: 768px) {
  .auth-view__wrapper {
    display: block;
    padding: 1.25rem 0.75rem 1.75rem;
  }

  .auth-panel {
    width: 100%;
    margin-inline: 0;
    box-shadow:
      0 12px 32px rgba(22, 93, 255, 0.18),
      0 2px 8px rgba(22, 93, 255, 0.12);
  }
}

.auth-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: center;
  justify-content: flex-start;
  justify-self: end;
  width: min(420px, 100%);
  min-height: 560px;
  padding: clamp(1.5rem, 3vw, 2rem);
  margin-inline: auto;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(22, 93, 255, 0.1);
  border-radius: 24px;
  box-shadow:
    0 16px 48px rgba(22, 93, 255, 0.12),
    0 4px 16px rgba(22, 93, 255, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.5) inset;
  backdrop-filter: blur(20px);
  animation: panelLift 0.7s ease;

  @media (prefers-color-scheme: dark) {
    background: rgba(18, 20, 32, 0.88);
    border-color: rgba(64, 128, 255, 0.25);
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.6),
      0 4px 16px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(90, 140, 255, 0.12) inset;
  }
}

/* 应用内暗黑主题（例如 html/body 上挂 .dark 类）下的登录表单样式 */
.dark .auth-panel {
  background: rgba(26, 32, 48, 0.9);
  border-color: rgba(86, 140, 255, 0.28);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.58),
    0 4px 16px rgba(0, 0, 0, 0.36),
    0 0 0 1px rgba(110, 150, 255, 0.16) inset;
}

.auth-panel__brand {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.875rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(22, 93, 255, 0.06);

  @media (prefers-color-scheme: dark) {
    border-color: rgba(64, 128, 255, 0.12);
  }
}

.auth-panel__logo-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background: radial-gradient(circle at 30% 20%, #ffffff, #e6efff);
  border-radius: 18px;
  box-shadow:
    0 8px 20px rgba(22, 93, 255, 0.16),
    0 0 0 1px rgba(255, 255, 255, 0.8) inset;

  @media (prefers-color-scheme: dark) {
    background: radial-gradient(circle at 30% 20%, #1f2438, #141827);
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.7),
      0 0 0 1px rgba(90, 140, 255, 0.3) inset;
  }
}

.auth-panel__logo {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
}

.auth-panel__meta {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.auth-panel__title-row {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
}

.auth-panel__title {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.2rem;
  font-weight: 650;
  line-height: 1.4;
  color: var(--el-text-color-primary);
  white-space: nowrap;
}

.auth-panel__version-row {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.78rem;
}

.auth-panel__form {
  width: 100%;
  max-width: 100%;
  min-height: 360px;
  margin-inline: auto;

  :deep(.el-form-item) {
    margin-bottom: 1rem;
  }

  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--el-border-color) inset;
    transition: all 0.2s ease;

    &:hover {
      box-shadow: 0 0 0 1px var(--el-border-color-hover) inset;
    }

    &.is-focus {
      box-shadow: 0 0 0 1px var(--el-color-primary) inset;
    }
  }

  :deep(.el-card) {
    background: transparent;
    box-shadow: none;
  }
}

@keyframes panelLift {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-40px) scale(0.95);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(40px) scale(0.95);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}
</style>
