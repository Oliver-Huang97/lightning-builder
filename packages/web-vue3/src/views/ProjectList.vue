<script lang="ts" setup>
import { app } from '../stores/app.store';
const columns = [
  {
    title: 'Title',
    dataIndex: 'name',
  },
  {
    title: 'Actions',
    key: 'actions',
  },
];
</script>

<template>
  <a-page-header title="Projects" />

  <a-table :dataSource="app.projectList" :columns="columns">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <RouterLink :to="{ name: 'design', params: { id: '-1' } }">{{ text }}</RouterLink>
      </template>
    </template>
  </a-table>
</template>