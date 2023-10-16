<script lang="ts" setup>
import OpenPageEditor from './OpenPageEditor.vue';

</script>

<template>
  <a-tabs type="editable-card" size="small" :tab-bar-gutter="0" destroyInactiveTabPane hideAdd>
    <a-tab-pane key="1" tab="1">
      <OpenPageEditor />
    </a-tab-pane>
    <a-tab-pane key="2" tab="2">
      <OpenPageEditor />
    </a-tab-pane>
  </a-tabs>
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