export interface Team {
  id: number;
  name: string;
  teamLeadId: number;
}

export interface TeamRequestObj {
  id?: number;
  name: string;
  teamLeadId: number;
  teamMemberIds: number[];
}
