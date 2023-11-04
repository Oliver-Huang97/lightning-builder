import {
  LibraryComponentContent,
  LibraryComponentNode,
} from '../interfaces/library-component-content';
import { FileRecord } from '../services';
import { FileModel } from './file.model';
import { LibraryContentModel } from './library-content.model';
import { LibraryModel } from './library.model';

export class LibraryFileModel extends FileModel {
  public content: LibraryContentModel;
  public nodes: Array<LibraryComponentNode>;

  public library: LibraryModel;

  public get app() {
    return this.library.app;
  }

  public constructor(data: FileRecord<LibraryComponentContent>, library: LibraryModel) {
    super(data);
    this.nodes = data.content?.nodes || [];
    this.content = new LibraryContentModel();
    this.library = library;
  }
}
