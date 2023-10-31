import { Injectable } from '@lightning-builder/framework';
import { LibraryListItem, LibraryRecord, LibraryService } from '../services/library.service';
import { antDesignVueLibrary } from './libraries/ant-design-vue';

const libraryList = [antDesignVueLibrary];

@Injectable()
export class LibraryLocalService extends LibraryService {
  public async getLibraryList(): Promise<Array<LibraryListItem>> {
    return libraryList.map((i) => ({
      id: i.id,
      name: i.name,
      projectId: i.projectId,
      version: i.version,
    }));
  }

  public async getLibrary(id: string): Promise<LibraryRecord | null> {
    return libraryList.find((i) => i.id === id) || null;
  }
}
