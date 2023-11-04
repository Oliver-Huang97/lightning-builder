import { BaseModel } from '@lightning-builder/framework';
import { ComponentContent } from '../interfaces/component-content';
import { Definition, DefinitionType } from '../services';

export class MethodDefinitionModel extends BaseModel {
  public id: string;
  public type: DefinitionType;
  public operation?: ComponentContent;
  public generator?: Array<any>;

  public constructor(data: Definition) {
    super();
    this.id = data.id;
    this.type = data.type;
    this.operation = data.operation;
    this.generator = data.generator;
  }
}
