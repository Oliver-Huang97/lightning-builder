import { BaseModel } from '@lightning-builder/framework';
import { LibraryRecord } from '../services/library.service';
import { AppModel } from './app.model';
import { LibraryFileModel } from './library-file.model';

export class LibraryModel extends BaseModel {
  public id: string;
  public name: string;
  public version: string;
  public projectId: string;

  public allFileList: Array<LibraryFileModel> = [];
  public allFileMap: Record<string, LibraryFileModel> = {};

  public app: AppModel;

  public constructor(data: LibraryRecord, app: AppModel) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.version = data.version;
    this.projectId = data.projectId;
    this.app = app;
  }
}
