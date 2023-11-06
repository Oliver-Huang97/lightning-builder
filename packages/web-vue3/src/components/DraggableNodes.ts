import { app } from '@/stores/app.store';
import { useRootStore } from './../stores/root.store';
import type {
  ComponentDefinition,
  ComponentNodeModel,
  ProjectModel,
} from '@lightning-builder/core';
import { h, resolveComponent, type VNode } from 'vue';
import draggable from 'vuedraggable';

export function renderComponent(node: ComponentNodeModel): VNode {
  const project = app.currentProject as ProjectModel;
  const methodDefinition = project.getMethodDefinitionById(
    node.methodDefinitionId,
  ) as unknown as ComponentDefinition;

  if (!methodDefinition) {
    return h('div', 'Unknown Component');
  }

  const children = Array.isArray(node.children)
    ? h(DraggableNodes, { nodes: node.children })
    : node.children;
  return h(
    resolveComponent(methodDefinition.tag),
    { ...node.props, onClick: () => (project.currentOpenFile!.currentSelectedNode = node) },
    () => children,
  );
}

export function OperationNodes(props: { nodes: Array<ComponentNodeModel> }) {
  return props.nodes.map((i) => renderComponent(i));
}

export function DraggableNodes(props: { nodes: Array<ComponentNodeModel> }) {
  const rootStore = useRootStore();
  const { nodes } = props;

  if (rootStore.dragEnable) {
    return h(
      draggable,
      {
        list: nodes,
        group: 'components',
        itemKey: 'name',
        style: 'height: 100%;',
      },
      {
        item: ({ element }: { element: ComponentNodeModel }) => renderComponent(element),
      },
    );
  }

  return nodes.map((i) => renderComponent(i));
}
