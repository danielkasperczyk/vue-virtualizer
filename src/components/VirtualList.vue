<template>
  <component
    :is="tag"
    ref="virtualListRef"
    class="virtual-list"
    :style="{
      '--vv-virtual-list-height': boundedVirtualListHeight,
    }"
  >
    <div
      class="virtual-list__outer-expander"
      :style="{
        '--vv-virtual-list-expander-height': `${expanderHeight}px`,
      }"
    >
      <div class="virtual-list__viewport" :style="transformToIndex">
        <template v-for="item in visibleItems" :key="item[itemKey]">
          <slot name="item" v-bind="itemBinding(item)">
            <div v-bind="itemBinding(item).props">{{ item[itemText] }}</div>
          </slot>
        </template>
      </div>
    </div>
  </component>
</template>
<script lang="ts">
import { PropType, computed, defineComponent, ref } from "vue";
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
      default: "100%",
      validator: (height: string | number) => {
        if (typeof height === "string") return ["auto"].includes(height);
        return height >= 0;
      },
    },
    ...virtualListItemProps,
  },

  setup(props) {
    const virtualListRef = ref<HTMLElement>();

    const { y } = useScroll(virtualListRef);
    const { itemBinding, boundedItemHeight } = useVirtualListItem(props);
    const { boundedVirtualListHeight, height, visibleItems, startIndex } =
      useVirtualList({
        ...props,
        target: virtualListRef,
        currentVerticalPosition: y,
      });

    const expanderHeight = computed(
      () => props.items.length * props.itemHeight
    );

    const transformToIndex = computed(() => ({
      position: "absolute" as const,
      top: `${props.itemHeight * startIndex.value}px`,
    }));

    return {
      virtualListRef,
      boundedItemHeight,
      boundedVirtualListHeight,
      height,
      y,
      expanderHeight,
      visibleItems,
      transformToIndex,
      itemBinding,
    };
  },
});
</script>
<style scoped>
.virtual-list {
  overflow-y: auto;
  height: var(--vv-virtual-list-height);
  position: relative;
}
.virtual-list__outer-expander {
  position: relative;
  height: var(--vv-virtual-list-expander-height);
}
.virtual-list__viewport {
  position: relative;
  top: 0;
  left: 0;
}
:global(.virtual-list__item) {
  height: v-bind(boundedItemHeight);
}
</style>
