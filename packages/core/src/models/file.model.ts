import { AutoWired, BaseModel } from '@lightning-builder/framework';
import { FileListItem, FileRecord, FileService } from '../services';

export class FileModel extends BaseModel {
  @AutoWired()
  protected readonly fileService!: FileService;

  public id: string;
  public name: string;
  public isDirectory: boolean;
  public parentId?: string;
  public children: Array<typeof this> = [];

  public constructor(data: FileListItem) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.isDirectory = data.isDirectory;
    this.parentId = data.parentId;
  }
}
