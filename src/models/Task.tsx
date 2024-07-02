import { TaskType } from "./TaskType";

export interface Task {
  id: number;
  title: string;
  description: string;
  statusId: number;
  effortPoints: number;
  estimation: number;
  progress: number;
  priorityId: number;
  taskType: TaskType;
  assigneeId: number;
  sprintId: number;
}
