import { BaseModel } from '@lightning-builder/framework';
import { ComponentNode } from '../interfaces/component-content';
import { ProjectFileModel } from './project-file.model';

export class ComponentNodeModel extends BaseModel {
  public id: string;
  public methodDefinitionId: string;
  public props: any;
  public on: Record<string, Array<Function>>;
  public children: Array<ComponentNodeModel>;

  public file: ProjectFileModel;

  public get app() {
    return this.file.app;
  }

  public constructor(data: ComponentNode, file: ProjectFileModel) {
    super();
    this.id = data.id;
    this.methodDefinitionId = data.methodDefinitionId;
    this.props = data.props;
    this.on = data.on;
    this.children = data.children.map((i) => new ComponentNodeModel(i, file));
    this.file = file;
  }
}
