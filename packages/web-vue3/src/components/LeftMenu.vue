<script lang="ts" setup>
import ComponentLibrary from './ComponentLibrary.vue';
import { AppstoreOutlined, FileOutlined } from '@ant-design/icons-vue';
import FileManage from './FileManage.vue';

</script>

<template>
  <a-tabs tab-position="left" size="small" :tab-bar-gutter="6">
    <a-tab-pane key="1">
      <template #tab>
        <a-tooltip title="Files" placement="right">
          <FileOutlined style="font-size: 20px;" />
        </a-tooltip>
      </template>
      <FileManage />
    </a-tab-pane>
    <a-tab-pane key="2">
      <template #tab>
        <a-tooltip title="Components" placement="right">
          <AppstoreOutlined style="font-size: 20px;" />
        </a-tooltip>
      </template>
      <ComponentLibrary />
    </a-tab-pane>
  </a-tabs>
</template>

<style lang="less" scoped>
.ant-tabs {
  height: 100%;

  :deep(.ant-tabs-tab) {
    padding: 8px;

    .anticon {
      margin-right: 0;
    }
  }
}
</style>