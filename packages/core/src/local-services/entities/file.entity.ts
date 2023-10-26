export interface FileEntity {
  id: string;
  name: string;
  is_directory: boolean;
  parent_id?: string;
  project_id: string;
  content?: any;
  create_at: Date;
  update_at?: Date;
}
