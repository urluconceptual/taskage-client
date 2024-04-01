import { JobTitle } from "./JobTitle";
import { Team } from "./Team";

export interface LogInRequestObj {
  username?: string;
  password?: string;
}

export interface CurrentUser {
  user: User;
  token: string;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  authRole: string;
  jobTitle: JobTitle;
  team: Team;
}

export interface UserRequestObj {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  authRole: string;
  jobTitle: JobTitle;
}
