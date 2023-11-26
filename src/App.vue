<script setup lang="ts">
import VirtualList from "@/src/components/VirtualList.vue";

const items = [
  { id: "test", value: "Virtual list item 1" },
  { id: "test2", value: "Virtual list item 2" },
  { id: 1, value: "Virtual list item 3" },
  { id: 2, value: "Virtual list item 4" },
  { id: 3, value: "Virtual list item 5" },
  { id: "test3", value: "Virtual list item 6" },
  { id: "test4", value: "Virtual list item 7" },
  { id: 4, value: "Virtual list item 8" },
  { id: 5, value: "Virtual list item 9" },
  { id: 6, value: "Virtual list item 10" },
];
</script>

<template>
  <div class="test">
    <VirtualList :items="items">
      <template #item="{ props, item }">
        <div v-bind="props">{{ item.value }}</div>
      </template>
    </VirtualList>
  </div>
</template>

<style scoped>
.test {
  height: 150px;
}
</style>
