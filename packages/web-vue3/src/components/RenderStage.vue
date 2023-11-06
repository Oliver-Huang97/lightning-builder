<script lang="ts" setup>
import type { ComponentNodeModel, ProjectFileModel } from "@lightning-builder/core";
import { DraggableNodes } from './DraggableNodes';
import { computed } from "vue";

const props = defineProps<{ file: ProjectFileModel }>();

const nodes = computed(() => props.file.content?.renderNodes as Array<ComponentNodeModel>);

</script>

<template>
  <div class="drag-area">
    <DraggableNodes :nodes="nodes" />
  </div>
</template>

<style lang="less" scoped>
.drag-area {
  height: 100%;
}
</style>