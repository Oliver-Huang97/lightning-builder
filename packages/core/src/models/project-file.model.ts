import { FileListItem } from '../services';
import { ComponentContentModel } from './component-content.model';
import { FileModel } from './file.model';
import { ProjectModel } from './project.model';

export class ProjectFileModel extends FileModel {
  public content: ComponentContentModel | null = null;

  public constructor(data: FileListItem, project: ProjectModel) {
    super(data, project);
  }

  public async getContent() {
    const file = await this.fileService.getFileDetail(this.id);
    if (!file) {
      throw new Error();
    }
    this.content = new ComponentContentModel(file.content || null, this);
  }
}
