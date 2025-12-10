import { STORAGE_KEYS } from "@/constants";
import type { ThemeMode } from "@/enums";
import { defaults } from "@/settings";

export const useSettingsStore = defineStore("setting", () => {
  const showWatermark = useStorage(STORAGE_KEYS.SHOW_WATERMARK, defaults.showWatermark);
  // 主题
  const theme = useStorage<ThemeMode>(STORAGE_KEYS.THEME, defaults.theme);
  const themeColor = useStorage(STORAGE_KEYS.THEME_COLOR, defaults.themeColor);
  return {
    showWatermark,
    theme,
    themeColor,
  };
});
