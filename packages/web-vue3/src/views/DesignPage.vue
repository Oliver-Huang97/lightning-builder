<script lang="ts" setup>
import LeftMenu from '@/components/LeftMenu.vue';
import OpenFileManage from '@/components/OpenFileManage.vue';
import RenderStage from '@/components/RenderStage.vue';

const items = [
  {
    label: 'File',
    popupOffset: [-10, 1],
    popupClassName: 'page-menu-popup',
    children: [
      { label: 'item1' },
      { label: 'item2' },
    ],
  },
  {
    label: 'Edit',
    popupOffset: [-10, 1],
    popupClassName: 'page-menu-popup',
    children: [
      { label: 'item1' },
      { label: 'item2' },
    ],
  },
];

</script>

<template>
  <a-layout class="layout-container">
    <a-layout-header>
      <a-space>
        <div class="logo">Lightning Builder</div>
        <a-menu mode="horizontal" triggerSubMenuAction="click" :items="items" :selectable="false" />
      </a-space>
    </a-layout-header>
    <a-layout>
      <a-layout-sider theme="light" width="240" class="left-sider">
        <LeftMenu />
      </a-layout-sider>
      <a-layout-content>
        <OpenFileManage />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.layout-container {
  height: 100vh;

  >.ant-layout-header {
    display: flex;
    height: 32px;
    line-height: 32px;
    border-bottom: 1px solid #d9d9d9;
    padding: 0 24px;
    overflow: hidden;
    background-color: white;
  }

  .logo {
    color: rgba(0, 0, 0, .85);
    font-size: 16px;
  }
}

.left-sider {
  border-right: 1px solid #d9d9d9;
}
</style>