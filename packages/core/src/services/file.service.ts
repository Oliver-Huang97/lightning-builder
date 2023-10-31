import { Injectable } from '@lightning-builder/framework';
import { ComponentContent } from '../interfaces/component-content';

export interface FileListItem {
  id: string;
  name: string;
  isDirectory: boolean;
  parentId?: string;
  projectId: string;
}
export interface FileRecord extends FileListItem {
  content: ComponentContent;
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

  public abstract getFileDetail(id: string): Promise<FileRecord | null>;

  public abstract createFile(data: FileAddRequest): Promise<string>;

  public abstract deleteFile(id: string): Promise<number>;
}
