<template>
  <component :is="tag" class="virtual-list">test</component>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";

type VirtualListTags = "div" | "ul";
const supportedTags: VirtualListTags[] = ["div", "ul"];

export default defineComponent({
  name: "VirtualList",
  props: {
    items: {
      type: Array as PropType<unknown[]>,
      required: true,
    },
    tag: {
      type: String as PropType<VirtualListTags>,
      default: "div",
      validator: (tag: VirtualListTags) => supportedTags.includes(tag),
    },
  },
});
</script>
