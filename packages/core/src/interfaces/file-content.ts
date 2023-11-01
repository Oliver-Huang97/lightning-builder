export enum ContentType {
  Component = 'component',
  LibraryComponent = 'library-component',
}

export interface FileContent {
  type: ContentType;
}
