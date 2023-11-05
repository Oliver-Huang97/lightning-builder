<script lang="ts" setup>
import { app } from '@/stores/app.store';
import type { LibraryFileModel } from '@lightning-builder/core';
import type { ProjectModel } from '@lightning-builder/core';
import { ref } from 'vue';
import draggable from 'vuedraggable';
import { theme } from 'ant-design-vue';
import { useRootStore } from '@/stores/root.store';

interface LibraryGroup {
  name: string;
  items: Array<LibraryFileModel>;
}

const token = theme.useToken().token;

const project = app.currentProject as ProjectModel;
const rootStore = useRootStore();

const generateList = (items: Array<LibraryFileModel>, parents: string[]) => {
  const result: Array<LibraryGroup> = [];
  const children = items.filter((i) => !i.isDirectory);

  if (children.length) {
    result.push({ name: parents.join(' > '), items: children })
  }

  items.forEach((item) => {
    if (item.isDirectory) {
      result.push(...generateList(item.children, [...parents, item.name]));
    }
  })
  return result;
};

const list = ref<Array<LibraryGroup>>([]);
const activeKeys = ref<Array<string>>([]);

const getData = async () => {
  list.value = (await project.getLibraryList())
    .map((i) => generateList(i.treeFileList, [i.name]))
    .reduce((r, i) => r.concat(i), []);
  activeKeys.value = list.value.map((i) => i.name);
}

getData();

const clone = (item: LibraryFileModel) => {
  return item.nodes[0];
};
</script>

<template>
  <a-collapse v-model:active-key="activeKeys" ghost>
    <a-collapse-panel v-for="group in list" :key="group.name" :header="group.name">
      <draggable class="clearfix" :list="group.items" :group="{ name: 'components', pull: 'clone', put: false }"
        :clone="clone" item-key="id" :sort="false" @start="rootStore.startDrag" @end="rootStore.cancelDrag">
        <template #item="{ element }">
          <div class="drag-component-item" :data-component-id="element.id">{{ element.name }}</div>
        </template>
      </draggable>
    </a-collapse-panel>
  </a-collapse>
</template>

<style lang="less" scoped>
.ant-collapse-item {

  >:deep(.ant-collapse-header) {
    padding: 4px 4px 0;

    >.ant-collapse-expand-icon {
      padding-inline-end: 4px;
    }
  }

  >:deep(.ant-collapse-content)>.ant-collapse-content-box {
    padding: 4px;
    padding-block: 4px;
  }
}

.drag-component-item {
  width: calc(50% - 8px);
  margin: 4px;
  padding: 0 2px;
  background-color: v-bind('token.colorBgLayout');
  color: v-bind('token.colorTextHeading');
  border: 1px v-bind('token.colorBorder') solid;
  font-size: 12px;
  float: left;
  cursor: move;
}
</style>