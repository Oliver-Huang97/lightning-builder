import { getModelBindModule } from '../helpers/utils';

export abstract class BaseModel {
  protected createModel<T extends BaseModel>(model: T): T {
    const module = getModelBindModule(this);
    if (!module) {
      throw new Error('Please create Model by Module');
    }
    return module.createModel(model);
  }
}
