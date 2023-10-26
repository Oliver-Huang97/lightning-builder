import { BaseModel } from '@lightning-builder/framework';
import { FileModel } from './file.model';
import { ComponentNode } from '../interfaces/component-content';

export class ComponentNodeModel extends BaseModel {
  public id: string;
  public definitionId: string;
  public props: any;
  public on: Record<string, Array<Function>>;
  public children: Array<ComponentNodeModel>;

  public file: FileModel;

  public get app() {
    return this.file.app;
  }

  public constructor(data: ComponentNode, file: FileModel) {
    super();
    this.id = data.id;
    this.definitionId = data.definitionId;
    this.props = data.props;
    this.on = data.on;
    this.children = data.children.map((i) => new ComponentNodeModel(i, file));
    this.file = file;
  }
}
