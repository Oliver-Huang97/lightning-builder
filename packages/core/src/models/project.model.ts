import { BaseModel } from '@lightning-builder/framework';
import { FileModel } from './file.model';

export class ProjectModel extends BaseModel {
  public fileList: Array<FileModel> = [];
}
