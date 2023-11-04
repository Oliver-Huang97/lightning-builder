import { ContentType } from '../../interfaces/file-content';
import { DefinitionType, LibraryRecord } from '../../services';

export const antDesignVueLibrary: LibraryRecord = {
  id: 'ant-design-vue',
  name: 'ant design',
  projectId: 'ant-design-vue',
  version: '1.0.0',
  files: [
    {
      id: 'general',
      name: 'general',
      isDirectory: true,
      projectId: 'ant-design-vue',
      content: null,
    },
    {
      id: 'a-button',
      name: 'Button',
      isDirectory: false,
      projectId: 'ant-design-vue',
      parentId: 'general',
      content: {
        type: ContentType.LibraryComponent,
        nodes: [{ methodDefinitionId: 'a-button', props: {}, on: {}, children: [] }],
      },
    },
    {
      id: 'a-typography-title',
      name: 'Title',
      isDirectory: false,
      projectId: 'ant-design-vue',
      parentId: 'general',
      content: {
        type: ContentType.LibraryComponent,
        nodes: [{ methodDefinitionId: 'a-typography-title', props: {}, on: {}, children: [] }],
      },
    },
    {
      id: 'a-typography-text',
      name: 'Text',
      isDirectory: false,
      projectId: 'ant-design-vue',
      parentId: 'general',
      content: {
        type: ContentType.LibraryComponent,
        nodes: [{ methodDefinitionId: 'a-typography-text', props: {}, on: {}, children: [] }],
      },
    },
    {
      id: 'data-entry',
      name: 'data entry',
      isDirectory: true,
      projectId: 'ant-design-vue',
      content: null,
    },
    {
      id: 'a-input',
      name: 'Input',
      isDirectory: false,
      projectId: 'ant-design-vue',
      parentId: 'data-entry',
      content: {
        type: ContentType.LibraryComponent,
        nodes: [{ methodDefinitionId: 'a-input', props: {}, on: {}, children: [] }],
      },
    },
  ],
  definitions: [{ id: 'a-button', type: DefinitionType.Component, tag: 'a-button' }],
};
