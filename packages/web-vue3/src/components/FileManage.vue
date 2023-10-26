<script lang="ts" setup>
import { Modal } from 'ant-design-vue';
import { app } from '@/stores/app.store';
import { DownOutlined, MoreOutlined, FileAddOutlined, FolderAddOutlined } from '@ant-design/icons-vue';
import type { FileModel, ProjectModel } from '@lightning-builder/core';
import type { TreeDataNode } from 'ant-design-vue/es/vc-tree-select/interface';
import { reactive, ref } from 'vue';

const project = app.currentProject as ProjectModel;
const activeCollapseKey = ref(['1']);

const translate2TreeData = (file: FileModel): TreeDataNode => {
  return {
    title: file.name,
    key: file.id,
    isLeaf: !file.isDirectory,
    file,
    children: file.children.map((i) => translate2TreeData(i)),
  };
}

const treeData = ref<Array<TreeDataNode>>([]);

const getData = () => {
  project.getFileList().then(() => {
    treeData.value = project.treeFileList.map((i) => translate2TreeData(i));
  });
}

getData();

const fileModalForm = reactive({ visible: false, name: '', isDirectory: false, parentId: '' });
const showAddFileModel = (isDirectory: boolean, parentId?: string) => {
  fileModalForm.visible = true;
  fileModalForm.name = '';
  fileModalForm.isDirectory = isDirectory;
  fileModalForm.parentId = parentId || '';
};
const handleAddFile = async () => {
  await project.createFile(fileModalForm.name, fileModalForm.isDirectory, fileModalForm.parentId || undefined);
  fileModalForm.visible = false;
  await getData();
};
const handleDeleteFile = (id: string) => {
  Modal.confirm({
    title: 'Are you sure delete this file?',
    onOk: async () => {
      await project.deleteFile(id);
      await getData();
    },
  });
}
</script>

<template>
  <a-collapse v-model:activeKey="activeCollapseKey" class="file-manage" ghost>
    <a-collapse-panel key="1" :header="project.name">
      <template #extra>
        <a-space align="baseline">
          <FileAddOutlined @click.stop="showAddFileModel(false)" />
          <FolderAddOutlined style="font-size: 16px; vertical-align: -.22em;" @click.stop="showAddFileModel(true)" />
        </a-space>
      </template>
      <a-tree show-line :tree-data="treeData" :selectable="false" class="file-tree" blockNode>
        <template #switcherIcon="{ switcherCls }">
          <DownOutlined :class="switcherCls" />
        </template>
        <template #title="{ title, key, isLeaf }">
          <span class="file-item-title" @click="project.openFile(key)">{{ title }}</span>
          <a-dropdown>
            <MoreOutlined class="file-item-extra" />
            <template #overlay>
              <a-menu>
                <a-menu-item v-if="!isLeaf" key="file" @click="showAddFileModel(false, key)">
                  New File
                </a-menu-item>
                <a-menu-item v-if="!isLeaf" key="folder" @click="showAddFileModel(true, key)">
                  New Folder
                </a-menu-item>
                <a-menu-item key="delete" @click="handleDeleteFile(key)">
                  Delete
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tree>
    </a-collapse-panel>
  </a-collapse>

  <a-modal v-model:open="fileModalForm.visible" :title="`New ${fileModalForm.isDirectory ? 'Folder' : 'File'}`"
    :okButtonProps="{ disabled: !fileModalForm.name }" @ok="handleAddFile">
    <a-form :model="fileModalForm" @finish="handleAddFile">
      <a-form-item label="Name" name="name" required>
        <a-input v-model:value="fileModalForm.name"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less">
.file-manage.ant-collapse {
  &>.ant-collapse-item .ant-collapse-header {
    padding: 0 8px 0 4px;

    .ant-collapse-extra {
      visibility: hidden;
    }

    &:hover .ant-collapse-extra {
      visibility: visible;
    }
  }

  .ant-collapse-content>.ant-collapse-content-box {
    padding: 0;
    padding-block: 0;
  }
}

.file-tree.ant-tree {
  .ant-tree-treenode {
    padding: 0;

    .file-item-extra {
      visibility: hidden;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);

      .file-item-extra {
        visibility: visible;
      }
    }

    .ant-tree-indent {
      margin-left: 12px;
    }
  }

  .ant-tree-node-content-wrapper:hover {
    background-color: transparent;
  }

  .ant-tree-title {
    display: flex;
    align-items: center;
  }

  .file-item-title {
    flex: 1;
  }
}
</style>