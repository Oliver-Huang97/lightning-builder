import type { ComponentNodeModel, DefinitionAttribute } from '@lightning-builder/core';
import { Form, FormItem, Input, InputNumber } from 'ant-design-vue';
import { h, type VNode } from 'vue';
import type { JSONSchemaType } from 'ajv';
import _, { at } from 'lodash';

function getComponentBySchema(
  schema: JSONSchemaType<any>,
  node: ComponentNodeModel,
  attribute: DefinitionAttribute,
): VNode {
  switch (schema.type) {
    case 'number':
      return h(InputNumber, {});
    case 'string':
    default:
      return h(Input, {
        value: _.get(node, attribute.path),
        'onUpdate:value': (v) => _.set(node, attribute.path, v),
      });
  }
}

export function DefinitionAttributeForm({
  node,
  attributes,
}: {
  node: ComponentNodeModel;
  attributes: Array<DefinitionAttribute>;
}): VNode {
  const children = attributes.map((attr) => {
    const component = getComponentBySchema(attr.schema, node, attr);

    return h(FormItem, { label: attr.label, name: attr.path }, component);
  });

  return h(Form, { model: node }, children);
}
