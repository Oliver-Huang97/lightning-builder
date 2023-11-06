import { Injectable } from '@lightning-builder/framework';
import { FileRecord } from './file.service';
import { LibraryComponentContent } from '../interfaces/library-component-content';
import { JSONSchemaType } from 'ajv';

export interface LibraryListItem {
  id: string;
  name: string;
  version: string;
  projectId: string;
}

export enum DefinitionType {
  Method = 'method',
  Component = 'component',
}

export interface OperationNode {
  tag: string;
  props: any;
  on: Record<string, Array<Function>>;
  children: string | Array<OperationNode>;
}

export interface DefinitionAttribute {
  label: string;
  path: string;
  schema: JSONSchemaType<any>;
}

export interface BaseDefinition {
  id: string;
  type: DefinitionType;
  operation?: Array<OperationNode>;
  generator?: Array<any>;
  // temp
  attributes?: Array<DefinitionAttribute>;
  [key: string]: any;
}

export interface MethodDefinition extends BaseDefinition {
  type: DefinitionType.Method;
}

export interface ComponentDefinition extends BaseDefinition {
  type: DefinitionType.Component;
  tag: string;
}

export type Definition = MethodDefinition | ComponentDefinition;

export interface LibraryRecord extends LibraryListItem {
  files: Array<FileRecord<LibraryComponentContent>>;
  definitions: Array<Definition>;
}

@Injectable()
export abstract class LibraryService {
  public abstract getLibraryList(): Promise<Array<LibraryListItem>>;

  public abstract getLibrary(id: string): Promise<LibraryRecord | null>;
}
