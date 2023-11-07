<script lang="ts" setup>
import type { ProjectFileModel } from '@lightning-builder/core';
import { computed } from 'vue';
import { DefinitionAttributeForm } from './DefinitionAttributeForm';
import type { ComponentNodeModel } from '@lightning-builder/core';

const props = defineProps<{ file: ProjectFileModel }>();

const node = computed(() => {
  return props.file.currentSelectedNode as ComponentNodeModel;
})

const definition = computed(() => {
  const { project, currentSelectedNode } = props.file;
  return project.getMethodDefinitionById(currentSelectedNode?.methodDefinitionId as string);
});

const attributes = computed(() => {
  return definition.value?.attributes || [];
})

const operation = computed(() => {
  const { project, currentSelectedNode } = props.file;
  return project.getMethodDefinitionById(currentSelectedNode?.methodDefinitionId as string)?.operation;
});

</script>

<template>
  <div :class="$style['operation-tree-container']">
    <a-typography-title>{{ definition?.tag }}</a-typography-title>
    <DefinitionAttributeForm :node="node" :attributes="attributes" />
  </div>
</template>

<style module>
.operation-tree-container {
  padding: 4px;
}
</style>