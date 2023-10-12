import Dexie, { Table } from 'dexie';
import { FileEntity } from './entities/file.entity';
import { name } from '../../package.json';
import { ProjectEntity } from './entities/project.entity';

const DATABASE_VERSION = 1;

class LocalServiceDatabase extends Dexie {
  public readonly project!: Table<ProjectEntity, string>;

  public readonly file!: Table<FileEntity, string>;

  public constructor() {
    super(name);
    this.version(DATABASE_VERSION).stores({
      project: 'id',
      file: 'id',
    });
  }
}

export const db = new LocalServiceDatabase();
