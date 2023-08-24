import { ProjectService } from '../services/project.service';
import { ProjectModel } from './project.model';

export class AppModel {
  public projectList: Array<ProjectModel> = [];

  public getProjectList() {
    this.projectList = [];
  }
}
