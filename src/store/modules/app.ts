import { STORAGE_KEYS } from "@/constants";
import { defaults } from "@/settings";
import { store } from "..";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { DeviceEnum } from "@/enums";

export const useAppStore = defineStore("app", () => {
  const device = useStorage(STORAGE_KEYS.DEVICE, DeviceEnum.DESKTOP);
  const size = useStorage(STORAGE_KEYS.SIZE, defaults.size);
  const language = useStorage(STORAGE_KEYS.LANGUAGE, defaults.language);
  const locale = computed(() => (language?.value === "en" ? en : zhCn));
  return {
    device,
    language,
    locale,
    size,
  };
});

export function useAppStoreHook() {
  return useAppStore(store);
}
