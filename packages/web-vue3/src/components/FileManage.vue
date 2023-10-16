<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue';

</script>

<template>
  <a-tree
    show-line
    :tree-data="treeData"
  >
    <template #switcherIcon="{ switcherCls }"><DownOutlined :class="switcherCls" /></template>
  </a-tree></template>

<style lang="less" scoped></style>