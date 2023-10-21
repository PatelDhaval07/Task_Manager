export class Task {
  TaskMasterId: number;
  TaskName: string;
  UserId: number;
  PartnerName: string;
  CompanyName: string;
  CompanyNo: string;
  DueDate: Date;
  WorkNatureId: number;
  WorkNature: string;
  ReviewingUserId: number;
  ReviewingPerson: string;
  RecordIn: boolean;
  JobsInPlanner: boolean;
  WorkStartDate: Date;
  Status: number;
  IsActive: boolean = true;
  IsDeleted: boolean = false;
  CreatedBy: number;
  CratedDate: Date;
  UpdatedBy: number;
  UpdatedDate: Date;
}
