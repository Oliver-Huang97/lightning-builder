import { AutoWired, BaseModel } from '@lightning-builder/framework';
import { ProjectModel } from './project.model';
import { ProjectAddRequest, ProjectService } from '../services/project.service';

export class AppModel extends BaseModel {
  @AutoWired()
  private readonly projectService!: ProjectService;

  public projectList: Array<ProjectModel> = [];
  public currentProject: ProjectModel | null = null;

  public async getProjectList() {
    this.projectList = [];
    this.projectList = (await this.projectService.getProjectList()).map((i) =>
      this.createModel(new ProjectModel(i, this)),
    );
  }

  public createProject(data: ProjectAddRequest) {
    return this.projectService.createProject(data);
  }

  public selectProject(id: string) {
    this.currentProject = this.projectList.find((i) => i.id === id) || null;
  }
}
