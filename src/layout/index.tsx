import { useAppStoreHook } from "@/store";
import { useResponsive } from "@/hooks/useResponsive";

import Left from "./main/layout-left.vue";
import Top from "./main/layout-top.vue";
import Right from "./main/layout-right.vue";
import MixLeft from "./main/layout-mix-left.vue";
import MixRight from "./main/layout-mix-right.vue";
import Mobile from "./main/layout-mobile.vue";

const layoutMap = {
  Left,
  Top,
  Right,
  MixLeft,
  MixRight,
  Mobile,
};

const appStore = useAppStoreHook();

export default defineComponent({
  name: "Layout",
  setup() {
    const { isMobile } = useResponsive();

    const currentLayout = isMobile.value ? layoutMap.Mobile : layoutMap[appStore.layoutMode];

    return () => {
      const CurrentLayout = currentLayout;

      return <CurrentLayout />;
    };
  },
});
