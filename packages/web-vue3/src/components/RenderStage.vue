<script lang="ts" setup>
import { app } from "@/stores/app.store";
import type { ComponentNodeModel, ProjectModel } from "@lightning-builder/core";
import { DraggableNodes } from './DraggableNodes';

const project = app.currentProject as ProjectModel;

const nodes = project.currentOpenFile?.content?.renderNodes as Array<ComponentNodeModel>;

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