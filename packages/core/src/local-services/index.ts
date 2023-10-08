import { BaseModule, Module } from '@lightning-builder/framework';
import { ProjectLocalService } from './project.local-service';
import { FileLocalService } from './file.local-service';

@Module({
  providers: [ProjectLocalService, FileLocalService],
})
export class LocalServiceModule extends BaseModule {}
