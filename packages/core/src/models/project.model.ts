import { AutoWired, BaseModel } from '@lightning-builder/framework';
import { FileService, ProjectRecord } from '../services';
import { AppModel } from './app.model';
import { LibraryService } from '../services/library.service';
import { LibraryModel } from './library.model';
import { ProjectFileModel } from './project-file.model';

export class ProjectModel extends BaseModel {
  @AutoWired()
  private readonly fileService!: FileService;
  @AutoWired()
  private readonly libraryService!: LibraryService;

  public id: string;
  public name: string;
  public libraryIds = ['ant-design-vue'];

  public libraryList: Array<LibraryModel> = [];
  public allFileList: Array<ProjectFileModel> = [];
  public allFileMap: Record<string, ProjectFileModel> = {};
  public treeFileList: Array<ProjectFileModel> = [];
  public openFiles: Array<ProjectFileModel> = [];
  public currentOpenFile: ProjectFileModel | null = null;

  public app: AppModel;

  public constructor(data: ProjectRecord, app: AppModel) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.app = app;
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

  public async getFileList() {
    this.allFileList = [];
    this.allFileMap = {};
    this.treeFileList = [];
    this.allFileList = (await this.fileService.getFileList(this.id)).map((i) =>
      this.createModel(new ProjectFileModel(i, this)),
    );
    this.allFileMap = this.allFileList.reduce(
      (result, file) => {
        result[file.id] = file;
        return result;
      },
      {} as Record<string, ProjectFileModel>,
    );
    this.allFileList.forEach((file) => {
      if (file.parentId) {
        this.allFileMap[file.parentId]?.children.push(file);
      }
    });
    this.allFileList.forEach((file) => {
      file.children.sort((a, b) => (a.isDirectory ? -1 : 1));
    });
    this.treeFileList = this.allFileList
      .filter((i) => !i.parentId)
      .sort((a, b) => (a.isDirectory ? -1 : 1));
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
