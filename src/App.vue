<script setup lang="ts">
import VirtualList from "@/src/components/VirtualList.vue";

const items = [{ id: "test" }, { id: "test2" }];
</script>

<template>
  <VirtualList :items="items" />
</template>

<style></style>
