import { BaseModel } from './base-model';
import { createInstance } from '../helpers/create-instance';
import { setModelBindModule } from '../helpers/utils';

export abstract class BaseModule {
  public static createModel<T extends BaseModel>(model: T): T {
    setModelBindModule(model, this);
    return createInstance(this, model);
  }
}
