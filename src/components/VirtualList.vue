<template>
  <component :is="tag" class="virtual-list">
    <template v-for="item in items" :key="item">
      <slot name="item" v-bind="itemBinding(item)">
        <div v-bind="itemBinding(item).props">{{ item }}</div>
      </slot>
    </template>
  </component>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import type { VirtualListItem } from "@/src/composables/useVirtualListItem";
import {
  virtualListItemProps,
  useVirtualListItem,
} from "@/src/composables/useVirtualListItem";

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
    ...virtualListItemProps,
  },

  setup(props) {
    const { itemBinding, boundedItemHeight } = useVirtualListItem(props);

    return { boundedItemHeight, itemBinding };
  },
});
</script>
<style scoped>
.virtual-list {
  overflow-y: scroll;
}
.virtual-list__item {
  height: v-bind(boundedItemHeight);
}
</style>
