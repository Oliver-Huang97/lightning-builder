import { Module, BaseModule } from '@lightning-builder/framework';
import { AppModel, LocalServiceModule } from '@lightning-builder/core';
import { reactive } from 'vue';

@Module({
  imports: [LocalServiceModule],
  providers: [],
})
class AppModule extends BaseModule {}

export const app = reactive(AppModule.createModel(new AppModel()));
