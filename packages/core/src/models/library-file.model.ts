import { FileRecord } from '../../types';
import { FileModel } from './file.model';
import { LibraryContentModel } from './library-content.model';
import { ProjectModel } from './project.model';

export class LibraryFileModel extends FileModel {
  public content: LibraryContentModel;

  public constructor(data: FileRecord, project: ProjectModel) {
    super(data, project);
    this.content = new LibraryContentModel();
  }
}
