<script setup lang="ts">
import VirtualList from "@/src/components/VirtualList.vue";

const items = [
  { id: "test" },
  { id: "test2" },
  { id: 1 },
  { id: 2 },
  { id: 3 },
];
</script>

<template>
  <VirtualList :items="items" :height="50" />
</template>

<style></style>
