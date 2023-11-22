<template>
  <component :is="tag" class="virtual-list">
    <template v-for="item in items" :key="item">
      <slot name="item" v-bind="{ item }">
        <div class="virtual-list__item">{{ item }}</div>
      </slot>
    </template>
  </component>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";

type VirtualListTags = "div" | "ul";
const supportedTags: VirtualListTags[] = ["div", "ul"];

type VirtualListItemTags = "div";
const supportedItemTags: VirtualListItemTags[] = ["div"];

type VirtualListItem = Record<string, any> & { id: string | number };

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
    itemTag: {
      type: String as PropType<VirtualListItemTags>,
      default: "div",
      validator: (tag: VirtualListItemTags) => supportedItemTags.includes(tag),
    },
  },
});
</script>
<style scoped>
.virtual-list {
  overflow-y: scroll;
}
</style>
