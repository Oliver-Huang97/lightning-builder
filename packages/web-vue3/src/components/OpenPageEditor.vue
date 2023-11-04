<script lang="ts" setup>
import type { ProjectFileModel } from '@lightning-builder/core';
import RenderStage from './RenderStage.vue';

const props = defineProps<{ file: ProjectFileModel }>();

</script>

<template>
  <a-layout>
    <a-layout-content>
      <div class="middle-page">
        <a-spin v-if="!props.file.content"></a-spin>
        <RenderStage v-else />
      </div>
    </a-layout-content>
    <a-layout-sider theme="light"></a-layout-sider>
  </a-layout>
</template>

<style lang="less" scoped>
.ant-layout {
  height: 100%;
}

.ant-layout-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.middle-page {
  width: 960px;
  height: 600px;
  background-color: white;
}

.ant-layout-sider {
  border-left: 1px solid #d9d9d9;
}
</style>