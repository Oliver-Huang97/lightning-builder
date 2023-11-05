import { Injectable } from '@lightning-builder/framework';
import { FileContent } from '../interfaces/file-content';

export interface FileListItem {
  id: string;
  name: string;
  isDirectory: boolean;
  parentId?: string;
  projectId: string;
}

export interface FileRecord<T extends FileContent> extends FileListItem {
  content: T | null;
}

export interface FileAddRequest {
  name: string;
  isDirectory: boolean;
  parentId?: string;
  projectId: string;
}

@Injectable()
export abstract class FileService {
  public abstract getFileList(projectId: string): Promise<Array<FileListItem>>;

  public abstract getFileDetail<T extends FileContent>(id: string): Promise<FileRecord<T> | null>;

  public abstract createFile(data: FileAddRequest): Promise<string>;

  public abstract deleteFile(id: string): Promise<number>;

  public abstract patchFile(data: Partial<FileRecord<any>> & { id: string }): Promise<number>;
}
