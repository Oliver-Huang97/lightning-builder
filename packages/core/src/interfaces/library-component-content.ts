import { ContentType, FileContent } from './file-content';

export interface LibraryComponentNode {
  methodDefinitionId: string;
  props: any;
  on: Record<string, Array<Function>>;
  children: Array<LibraryComponentNode>;
}

export interface LibraryComponentContent extends FileContent {
  type: ContentType.LibraryComponent;
  nodes: Array<LibraryComponentNode>;
}
