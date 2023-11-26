<script setup lang="ts">
import VirtualList from "@/src/components/VirtualList.vue";

const items = [
  { id: "test" },
  { id: "test2" },
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: "test3" },
  { id: "test4" },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];
</script>

<template>
  <VirtualList :items="items" :height="150" />
</template>

<style></style>
