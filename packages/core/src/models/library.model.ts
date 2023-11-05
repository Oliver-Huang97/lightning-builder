import { Definition, LibraryRecord } from '../services';
import { AppModel } from './app.model';
import { LibraryFileModel } from './library-file.model';
import { FileManageModel } from './file-manage.model';
import { MethodDefinitionModel } from './method-definition.model';

export class LibraryModel extends FileManageModel<LibraryFileModel> {
  public id: string;
  public name: string;
  public version: string;
  public projectId: string;

  public methodDefinitionList: Array<Definition> = [];
  public methodDefinitionMap: Record<string, Definition> = {};

  public app: AppModel;

  private files: Array<LibraryFileModel>;

  public constructor(data: LibraryRecord, app: AppModel) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.version = data.version;
    this.projectId = data.projectId;
    this.app = app;
    this.files = data.files.map((i) => new LibraryFileModel(i, this));
    this.methodDefinitionList = data.definitions;
    this.methodDefinitionMap = this.methodDefinitionList.reduce(
      (map, item) => {
        map[item.id] = item;
        return map;
      },
      {} as Record<string, Definition>,
    );
    this.getFileList();
  }

  public async loadFiles(): Promise<LibraryFileModel[]> {
    return this.files;
  }
}
