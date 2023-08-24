<script lang="ts" setup>
import ComponentLibrary from '@/components/ComponentLibrary.vue';
import RenderStage from '@/components/RenderStage.vue';

</script>

<template>
  <a-layout class="layout-container">
    <a-layout-header>Header</a-layout-header>
    <a-layout>
      <a-layout-sider theme="light">
        <ComponentLibrary />
      </a-layout-sider>
      <a-layout class="layout-content-box">
        <a-layout-header></a-layout-header>
        <a-layout-content>
          <RenderStage />
        </a-layout-content>
        <a-layout-footer></a-layout-footer>
      </a-layout>
      <a-layout-sider theme="light">
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.layout-container {
  height: 100vh;
}

.layout-content-box {
  display: flex;
  flex-direction: column;

  >.ant-layout-header {
    height: 30px;
  }

  >.ant-layout-content {
    flex-grow: 1;
  }
}
</style>