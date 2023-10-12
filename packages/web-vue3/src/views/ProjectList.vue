<script lang="ts" setup>
import { ref } from 'vue';
import { app } from '../stores/app.store';
import type { ProjectAddRequest } from '@lightning-builder/core';

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
const visible = ref<boolean>(false);
const form = ref<Partial<ProjectAddRequest>>({});
const createButtonLoading = ref<boolean>(false);

const handleClick = () => {
  visible.value = true;
  form.value = {};
};

const createProject = async () => {
  createButtonLoading.value = true;
  await app.createProject(form.value as ProjectAddRequest);
  createButtonLoading.value = false;
  visible.value = false;
  app.getProjectList();
};

app.getProjectList();
</script>

<template>
  <a-page-header title="Projects">
    <template #extra>
      <a-button type="primary" @click="handleClick">New</a-button>
    </template>
  </a-page-header>


  <a-table :dataSource="app.projectList" :columns="columns">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <RouterLink :to="{ name: 'design', params: { id: record.id } }">{{ text }}</RouterLink>
      </template>
    </template>
  </a-table>

  <a-modal :visible="visible" title="Create Project"
    :okButtonProps="{ disabled: !form.name, loading: createButtonLoading }" @ok="createProject">
    <a-form :model="form" @finish="createProject">
      <a-form-item label="Name" name="name" required>
        <a-input v-model:value="form.name"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less"></style>