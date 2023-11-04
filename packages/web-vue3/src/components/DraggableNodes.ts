import type { ComponentNodeModel } from '@lightning-builder/core';
import { h, resolveComponent } from 'vue';
import draggable from 'vuedraggable';

export function DraggableNodes(props: { nodes: Array<ComponentNodeModel> }) {
  const { nodes } = props;

  return h(
    draggable,
    { list: nodes, group: 'components', itemKey: 'name', style: 'height: 100%;' },
    {
      item: ({ element }: { element: ComponentNodeModel }) =>
        h(resolveComponent(element.methodDefinitionId)),
    },
  );
}
