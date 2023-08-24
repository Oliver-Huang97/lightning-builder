import { ProjectAddRequest, ProjectRecord, ProjectService } from '../services/project.service';
import { uuid } from '../utils/utils';
import { db } from './database';

export class ProjectLocalService extends ProjectService {
  public getProjectList(): Promise<ProjectRecord[]> {
    return db.project.toArray();
  }

  public async createProject(data: ProjectAddRequest): Promise<string> {
    const id = uuid();
    await db.project.add({
      ...data,
      id,
      create_at: new Date(),
    });
    return id;
  }

  public async deleteProject(id: string): Promise<number> {
    await db.project.delete(id);
    return 1;
  }
}
