<script lang="ts" setup>
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
const dataSource = [
  {
    name: 'test',
  },
];
</script>

<template>
  <a-page-header title="Projects" />

  <a-table :dataSource="dataSource" :columns="columns">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <RouterLink :to="{ name: 'design', params: { id: '-1' } }">{{ text }}</RouterLink>
      </template>
    </template>
  </a-table>
</template>