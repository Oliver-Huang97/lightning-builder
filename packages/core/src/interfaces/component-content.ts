import { ContentType, FileContent } from './file-content';
import { JSONSchemaType } from 'ajv';

export interface Variable<T> {
  id: string;
  name: string;
  value: T;
  schema: JSONSchemaType<T>;
}

export interface MethodParameter<T> {
  schema: JSONSchemaType<T>;
  default?: T;
  name?: string;
}

export interface Method<T> {
  id: string;
  name: string;
  parameters: Array<MethodParameter<any>>;
  returnSchema: JSONSchemaType<T>;
}

export interface ComponentNode {
  id: string;
  methodDefinitionId: string;
  props: any;
  on: Record<string, Array<Function>>;
  children: Array<ComponentNode>;
}

export interface ComponentContent extends FileContent {
  type: ContentType.Component;
  variables: Array<Variable<any>>;
  methods: Array<Method<any>>;
  render: Array<ComponentNode>;
}
