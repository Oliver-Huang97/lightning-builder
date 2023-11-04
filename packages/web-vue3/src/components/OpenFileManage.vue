<script lang="ts" setup>
import { app } from '@/stores/app.store';
import type { ProjectModel } from '@lightning-builder/core';
import OpenPageEditor from './OpenPageEditor.vue';

const project = app.currentProject as ProjectModel;

</script>

<template>
  <a-tabs v-if="project.openFiles.length" :active-key="project.currentOpenFile?.id" type="editable-card" size="small"
    :tab-bar-gutter="0" destroyInactiveTabPane hideAdd @tab-click="(id: string) => project.openFile(id)"
    @edit="(id: string) => project.closeFile(id)">
    <a-tab-pane v-for="file in project.openFiles" :key="file.id" :tab="file.name">
      <OpenPageEditor :file="file" />
    </a-tab-pane>
  </a-tabs>
  <a-empty v-else style="padding-top: 24px;">
    <template #description>
      <span>Please Select File</span>
    </template>
  </a-empty>
</template>

<style lang="less" scoped>
.ant-tabs-card.ant-tabs {
  height: 100%;

  &>:deep(.ant-tabs-nav) {
    background-color: white;
    height: 28px;
    line-height: 28px;
    margin-bottom: 0;

    &::before {
      border-bottom-color: #d9d9d9;
    }

    .ant-tabs-tab {
      border-radius: 0;
      border: none;
      border-right: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
      background-color: white;
      padding: 0 8px 0 12px;
      transition: none;
    }

    .ant-tabs-tab-active {
      background-color: #f5f5f5;
      border-bottom-color: #f5f5f5;
    }
  }

  :deep(.ant-tabs-content) {
    height: 100%;

    .ant-tabs-tabpane {
      height: 100%;
    }
  }
}
</style>