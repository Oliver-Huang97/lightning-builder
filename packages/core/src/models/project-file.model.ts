import { ComponentContent } from '../interfaces/component-content';
import { FileListItem } from '../services';
import { ComponentContentModel } from './component-content.model';
import { FileModel } from './file.model';
import { ProjectModel } from './project.model';

export class ProjectFileModel extends FileModel {
  public content: ComponentContentModel | null = null;

  public project: ProjectModel;

  public get app() {
    return this.project.app;
  }

  public constructor(data: FileListItem, project: ProjectModel) {
    super(data);
    this.project = project;
  }

  public async getContent() {
    const file = await this.fileService.getFileDetail<ComponentContent>(this.id);
    if (!file) {
      throw new Error();
    }
    this.content = new ComponentContentModel(file.content || null, this);
  }

  public async save() {
    const { id, content } = this;
    const newContent = {
      variables: content?.variables,
      methods: content?.methods,
      render: content?.renderNodes,
    };
    this.fileService.patchFile({ id, content: newContent });
  }
}
