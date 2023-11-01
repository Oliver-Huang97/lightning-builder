import { AutoWired } from '@lightning-builder/framework';
import { FileService, LibraryService, ProjectRecord } from '../services';
import { AppModel } from './app.model';
import { LibraryModel } from './library.model';
import { ProjectFileModel } from './project-file.model';
import { FileManageModel } from './file-manage.model';

export class ProjectModel extends FileManageModel<ProjectFileModel> {
  @AutoWired()
  private readonly fileService!: FileService;
  @AutoWired()
  private readonly libraryService!: LibraryService;

  public id: string;
  public name: string;
  public libraryIds = ['ant-design-vue'];

  public libraryList: Array<LibraryModel> = [];
  public openFiles: Array<ProjectFileModel> = [];
  public currentOpenFile: ProjectFileModel | null = null;

  public app: AppModel;

  public constructor(data: ProjectRecord, app: AppModel) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.app = app;
  }

  public async loadFiles() {
    return (await this.fileService.getFileList(this.id)).map((i) => new ProjectFileModel(i, this));
  }

  public async getLibraryList() {
    this.libraryList = (
      await Promise.all(
        this.libraryIds.map((i) =>
          this.libraryService
            .getLibrary(i)
            .then((record) => record && new LibraryModel(record, this.app)),
        ),
      )
    ).filter((i) => i) as Array<LibraryModel>;
  }

  public createFile(name: string, isDirectory: boolean, parentId?: string) {
    return this.fileService.createFile({ name, isDirectory, parentId, projectId: this.id });
  }

  public deleteFile(id: string) {
    return this.fileService.deleteFile(id);
  }

  public openFile(id: string) {
    const file = this.allFileMap[id];

    if (file.isDirectory) {
      return;
    }

    if (!this.openFiles.includes(file)) {
      this.openFiles.push(file);

      if (!file.content) {
        file.getContent();
      }
    }

    this.currentOpenFile = file;
  }

  public closeFile(id: string) {
    const file = this.allFileMap[id];

    const index = this.openFiles.indexOf(file);

    if (index !== -1) {
      this.openFiles.splice(index, 1);
    }

    if (file.id === this.currentOpenFile?.id) {
      this.currentOpenFile = this.openFiles[0] || null;
    }
  }
}
