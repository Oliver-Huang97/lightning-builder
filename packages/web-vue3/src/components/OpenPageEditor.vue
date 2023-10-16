<script lang="ts" setup>
import RenderStage from './RenderStage.vue';

</script>

<template>
  <a-layout>
    <a-layout-content>
      <div class="middle-page">
        <RenderStage />
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