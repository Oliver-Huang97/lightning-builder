import { BaseModule, Module } from '@lightning-builder/framework';
import { ProjectLocalService } from './project.local-service';
import { FileLocalService } from './file.local-service';
import { LibraryLocalService } from './library.local-service';

@Module({
  providers: [ProjectLocalService, FileLocalService, LibraryLocalService],
})
export class LocalServiceModule extends BaseModule {}
