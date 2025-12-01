import { STORAGE_KEYS } from "@/constants";
import { defaults } from "@/settings";
import { store } from "..";

export const useAppStore = defineStore("app", () => {
  const language = useStorage(STORAGE_KEYS.LANGUAGE, defaults.language);
  return {
    language,
  };
});

export function useAppStoreHook() {
  return useAppStore(store);
}
