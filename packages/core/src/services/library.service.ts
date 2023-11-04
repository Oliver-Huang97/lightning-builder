import { Injectable } from '@lightning-builder/framework';
import { FileRecord } from './file.service';
import { LibraryComponentContent } from '../interfaces/library-component-content';
import { ComponentContent } from '../interfaces/component-content';

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

export interface BaseDefinition {
  id: string;
  type: DefinitionType;
  operation?: ComponentContent;
  generator?: Array<any>;
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
