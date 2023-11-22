<template>
  <component
    :is="tag"
    ref="virtualListRef"
    class="virtual-list"
    :style="{
      '--vv-virtual-list-height': virtualListHeight,
    }"
  >
    <template v-for="item in items" :key="item">
      <slot name="item" v-bind="itemBinding(item)">
        <div v-bind="itemBinding(item).props">{{ item }}</div>
      </slot>
    </template>
  </component>
  {{ y }}
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from "vue";
import type { VirtualListItem } from "@/src/composables/useVirtualListItem";
import {
  virtualListItemProps,
  useVirtualListItem,
} from "@/src/composables/useVirtualListItem";
import { useVirtualList } from "@/src/composables/useVirtualList";
import { useScroll } from "@/src/composables/useScroll";

type VirtualListTags = "div" | "ul";
const supportedTags: VirtualListTags[] = ["div", "ul"];

export default defineComponent({
  name: "VirtualList",
  props: {
    items: {
      type: Array as PropType<VirtualListItem[]>,
      required: true,
    },
    tag: {
      type: String as PropType<VirtualListTags>,
      default: "div",
      validator: (tag: VirtualListTags) => supportedTags.includes(tag),
    },
    height: {
      type: [Number, String],
      default: "auto",
      validator: (height: string | number) => {
        if (typeof height === "string") return ["auto"].includes(height);
        return height >= 0;
      },
    },
    ...virtualListItemProps,
  },

  setup(props) {
    const virtualListRef = ref<HTMLElement>();

    const { itemBinding, boundedItemHeight } = useVirtualListItem(props);
    const { y } = useScroll(virtualListRef);
    const { virtualListHeight } = useVirtualList(props);

    return {
      virtualListRef,
      boundedItemHeight,
      virtualListHeight,
      y,
      itemBinding,
    };
  },
});
</script>
<style scoped>
.virtual-list {
  overflow-y: auto;
  height: var(--vv-virtual-list-height);
}
.virtual-list__item {
  height: v-bind(boundedItemHeight);
}
</style>
