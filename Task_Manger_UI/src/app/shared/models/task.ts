export class Task {
  TaskMasterId: number;
  UserId: number;
  PartnerName: string;
  CompanyName: string;
  CompanyNo: string;
  DueDate: string;
  WorkNatureId: number;
  WorkNature: string;
  ReviewingUserId: number;
  ReviewingPerson: string;
  RecordIn: boolean;
  JobsInPlanner: boolean;
  WorkStartDate: string;
  IsActive: boolean = true;
}
