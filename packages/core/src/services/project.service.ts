export interface ProjectRecord {
  id: string;
  name: string;
}

export interface ProjectAddRequest {
  name: string;
}

export abstract class ProjectService {
  public abstract getProjectList(): Promise<Array<ProjectRecord>>;

  public abstract createProject(data: ProjectAddRequest): Promise<string>;

  public abstract deleteProject(id: string): Promise<number>;
}
