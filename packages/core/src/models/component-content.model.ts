import { BaseModel } from '@lightning-builder/framework';
import { ComponentContent, Method, Variable } from '../interfaces/component-content';
import { ComponentNodeModel } from './component-node.model';
import { ProjectFileModel } from './project-file.model';

export class ComponentContentModel extends BaseModel {
  public variables: Array<Variable<any>>;
  public methods: Array<Method<any>>;
  public renderNodes: Array<ComponentNodeModel>;

  public file: ProjectFileModel;

  public get app() {
    return this.file.app;
  }

  public constructor(content: ComponentContent | null, file: ProjectFileModel) {
    super();
    this.variables = content?.variables || [];
    this.methods = content?.methods || [];
    this.renderNodes = content?.render.map((i) => new ComponentNodeModel(i, file)) || [];
    this.file = file;
  }
}
