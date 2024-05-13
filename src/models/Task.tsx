export interface Task {
  id: number;
  title: string;
  description: string;
  statusId: number;
  estimation: number;
  progress: number;
  priorityId: number;
  assigneeId: number;
  sprintId: number;
}
