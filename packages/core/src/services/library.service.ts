import { Injectable } from '@lightning-builder/framework';
import { FileRecord } from './file.service';
import { LibraryComponentContent } from '../interfaces/library-component-content';

export interface LibraryListItem {
  id: string;
  name: string;
  version: string;
  projectId: string;
}

export interface LibraryRecord extends LibraryListItem {
  files: Array<FileRecord<LibraryComponentContent>>;
}

@Injectable()
export abstract class LibraryService {
  public abstract getLibraryList(): Promise<Array<LibraryListItem>>;

  public abstract getLibrary(id: string): Promise<LibraryRecord | null>;
}
