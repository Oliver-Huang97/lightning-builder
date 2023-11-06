<script lang="ts" setup>
import type { ProjectFileModel } from '@lightning-builder/core';
import RenderStage from './RenderStage.vue';
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import OperationTree from './OperationTree.vue';

const props = defineProps<{ file: ProjectFileModel }>();
const loading = ref(false);

const save = async () => {
  loading.value = true;
  console.log(props.file);
  await props.file.save();
  loading.value = false;
  message.success('success');
}

</script>

<template>
  <a-layout>
    <a-layout-content>
      <div class="page-actions clearfix"><a-button type="primary" style="float: right;" @click="save">Save</a-button>
      </div>
      <div class="page-container">
        <div class="middle-page">
          <a-spin v-if="!props.file.content"></a-spin>
          <RenderStage v-else :file="props.file" />
        </div>
      </div>
    </a-layout-content>
    <a-layout-sider theme="light">
      <OperationTree v-if="props.file.currentSelectedNode" :file="props.file" />
    </a-layout-sider>
  </a-layout>
</template>

<style lang="less" scoped>
.ant-layout {
  height: 100%;
}

.page-actions {
  width: 100%;
  margin-bottom: 12px;
  padding: 12px;
}

.page-container {
  display: flex;
  flex-direction: column;
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