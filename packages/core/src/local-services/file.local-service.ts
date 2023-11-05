import { Injectable } from '@lightning-builder/framework';
import { FileAddRequest, FileRecord, FileService, FileListItem } from '../services';
import { uuid } from '../utils/utils';
import { db } from './database';
import { FileContent } from '../interfaces/file-content';
import _ from 'lodash';

@Injectable()
export class FileLocalService extends FileService {
  public async getFileList(projectId: string): Promise<FileListItem[]> {
    return (await db.file.filter((i) => i.project_id === projectId).toArray()).map((i) => ({
      id: i.id,
      name: i.name,
      isDirectory: i.is_directory,
      parentId: i.parent_id,
      projectId: i.project_id,
    }));
  }

  public async getFileDetail<T extends FileContent>(id: string): Promise<FileRecord<T> | null> {
    const record = await db.file.get(id);

    if (!record) {
      return null;
    }

    return {
      id: record.id,
      name: record.name,
      isDirectory: record.is_directory,
      parentId: record.parent_id,
      projectId: record.project_id,
      content: record.content,
    };
  }

  public async createFile(data: FileAddRequest): Promise<string> {
    const id = uuid();
    await db.file.add({
      id,
      name: data.name,
      is_directory: data.isDirectory,
      parent_id: data.parentId,
      project_id: data.projectId,
      create_at: new Date(),
    });
    return id;
  }

  public async deleteFile(id: string): Promise<number> {
    await db.file.delete(id);
    return 1;
  }

  public async patchFile(data: Partial<FileRecord<any>> & { id: string }): Promise<number> {
    await db.file.update(data.id, { ..._.cloneDeep(data), update_at: new Date() });
    return 1;
  }
}
