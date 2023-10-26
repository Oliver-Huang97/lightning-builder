import { AutoWired, BaseModel } from '@lightning-builder/framework';
import { FileRecord, FileService } from '../services';
import { ProjectModel } from './project.model';
import { ComponentContentModel } from './component-content.model';

export class FileModel extends BaseModel {
  @AutoWired()
  private readonly fileService!: FileService;

  public id: string;
  public name: string;
  public isDirectory: boolean;
  public parentId?: string;
  public children: Array<FileModel> = [];
  public content: ComponentContentModel | null = null;

  public project: ProjectModel;

  public get app() {
    return this.project.app;
  }

  public constructor(data: FileRecord, project: ProjectModel) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.isDirectory = data.isDirectory;
    this.parentId = data.parentId;
    this.project = project;
  }

  public async getContent() {
    const file = await this.fileService.getFileDetail(this.id);
    if (!file) {
      throw new Error();
    }
    this.content = new ComponentContentModel(file.content || null, this);
  }
}
