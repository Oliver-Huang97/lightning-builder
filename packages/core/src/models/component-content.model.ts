import { BaseModel } from '@lightning-builder/framework';
import { FileModel } from './file.model';
import { ComponentContent, Method, Variable } from '../interfaces/component-content';
import { ComponentNodeModel } from './component-node.model';

export class ComponentContentModel extends BaseModel {
  public variables: Array<Variable<any>>;
  public methods: Array<Method<any>>;
  public renderNodes: Array<ComponentNodeModel>;

  public file: FileModel;

  public get app() {
    return this.file.app;
  }

  public constructor(content: ComponentContent | null, file: FileModel) {
    super();
    this.variables = content?.variables || [];
    this.methods = content?.methods || [];
    this.renderNodes = content?.render.map((i) => new ComponentNodeModel(i, file)) || [];
    this.file = file;
  }
}
