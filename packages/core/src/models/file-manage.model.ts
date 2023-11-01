import { BaseModel } from '@lightning-builder/framework';
import { FileModel } from './file.model';

export abstract class FileManageModel<T extends FileModel> extends BaseModel {
  public allFileList: Array<T> = [];
  public allFileMap: Record<string, T> = {};
  public treeFileList: Array<T> = [];

  public abstract loadFiles(): Promise<Array<T>>;

  public async getFileList() {
    this.allFileList = [];
    this.allFileMap = {};
    this.treeFileList = [];
    this.allFileList = (await this.loadFiles()).map((i) => this.createModel(i));
    this.allFileMap = this.allFileList.reduce(
      (result, file) => {
        result[file.id] = file;
        return result;
      },
      {} as Record<string, T>,
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
      .sort((a, b) =>
        a.isDirectory === b.isDirectory ? (a.name > b.name ? 1 : -1) : a.isDirectory ? -1 : 1,
      );
  }
}
