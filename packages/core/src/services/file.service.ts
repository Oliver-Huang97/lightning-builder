import { Injectable } from '@lightning-builder/framework';
import { ComponentContent } from '../interfaces/component-content';

export interface FileRecord {
  id: string;
  name: string;
  isDirectory: boolean;
  parentId?: string;
  projectId: string;
}

export interface FileDetailRecord extends FileRecord {
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
  public abstract getFileList(projectId: string): Promise<Array<FileRecord>>;

  public abstract getFileDetail(id: string): Promise<FileDetailRecord | null>;

  public abstract createFile(data: FileAddRequest): Promise<string>;

  public abstract deleteFile(id: string): Promise<number>;
}
