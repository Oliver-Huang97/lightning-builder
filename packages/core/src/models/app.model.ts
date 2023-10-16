import { AutoWired, BaseModel } from '@lightning-builder/framework';
import { ProjectModel } from './project.model';
import { ProjectAddRequest, ProjectService } from '../services/project.service';

export class AppModel extends BaseModel {
  @AutoWired()
  private readonly projectService!: ProjectService;

  public projectList: Array<ProjectModel> = [];
  public currentProject: ProjectModel | null = null;

  public getProjectList() {
    this.projectList = [];
    this.projectService.getProjectList().then((res) => (this.projectList = res as any));
  }

  public createProject(data: ProjectAddRequest) {
    return this.projectService.createProject(data);
  }
}
