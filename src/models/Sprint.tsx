import { Task } from "./Task";

export interface Sprint {
  id: number;
  startDate: string;
  endDate: string;
  tasks: Task[];
}

export interface SprintCreateRequest extends Omit<Sprint, "id" | "tasks"> {
  teamId: number;
}
