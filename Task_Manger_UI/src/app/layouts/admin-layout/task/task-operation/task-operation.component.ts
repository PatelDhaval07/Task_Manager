import { Component, Inject, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Task } from 'src/app/shared/models/task';
import { TaskService } from 'src/app/shared/services/task.service';
import { UserService } from 'src/app/layouts/auth-layout/services/user.service';
import * as Constant from 'src/app/shared/common-constants'
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, AbstractControl } from '@angular/forms'
import { CommonFunctions } from 'src/app/shared/functions/common.functions'
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-task-operation',
  templateUrl: './task-operation.component.html',
  styleUrls: ['./task-operation.component.scss']
})
export class TaskOperationComponent implements OnInit {
  Label: string = "Add";
  TaskId: string = "";
  ListData: any;
  UserListData: any;
  Submitted = false;
  IsDisabled: boolean = false;
  //model:any;
  TaskForm: FormGroup = new FormGroup({
    TaskId: new FormControl(''),
    TaskName: new FormControl(''),
    CompanyName: new FormControl(''),
    PartnerName: new FormControl(''),
    CompanyNumber: new FormControl(''),
    NextDueDate: new FormControl(''),
    NatureOfWork: new FormControl(''),
    ReviewBy: new FormControl(''),
    RecordIn: new FormControl(''),
    JobsInPlanner: new FormControl(''),
    WorkStartDate: new FormControl(''),
    Status: new FormControl(''),
  })
  constructor(
    private Router: Router,
    private Route: ActivatedRoute,
    private CommonFunctions: CommonFunctions,
    private FormBuilder: FormBuilder,
    private taskService: TaskService,
    private userService: UserService
  ) {
    if (this.Route.snapshot.paramMap.get('id')) {
      this.TaskId = this.Route.snapshot.paramMap.get('id');
    }
  }

  ngOnInit(): void {
    this.GetAllUserList();
    this.TaskForm = this.FormBuilder.group({
      TaskId: 0,
      TaskName: [''],
      CompanyName: [''],
      PartnerName: [''],
      CompanyNumber: [''],
      NextDueDate: [''],
      NatureOfWork: [''],
      ReviewBy: [''],
      RecordIn: String,
      JobsInPlanner: [''],
      WorkStartDate: [''],
      Status: [''],
      IsActive: true,
    })
    if (parseInt(this.TaskId) > 0) {
      this.GetAllTaskList(parseInt(this.TaskId));
      this.Label = "Update";
    }
    // if(this.Route.snapshot.paramMap.get('id')){
    //   this.IsDisabled=true;
    //   this.TaskForm.disable();
    // this.Label = "View";
    // }
  }
  get taskFormControl() {
    return this.TaskForm.controls
  }

  GetAllTaskList(TaskId) {
    this.ListData =
    {
      TaskId: TaskId
    };
    var datePipe = new DatePipe('en-US');

    this.taskService.GetTaskDetail(this.TaskId)
      .subscribe((Response) => {
        if (Response.StatusType == Constant.IsSuccess) {
          if (Response.Data) {
            this.TaskForm.controls.TaskId.setValue(Response.Data.TaskMasterId);
            this.TaskForm.controls.TaskName.setValue(Response.Data.TaskName);
            this.TaskForm.controls.CompanyName.setValue(Response.Data.CompanyName);
            this.TaskForm.controls.PartnerName.setValue(Response.Data.UserId);
            this.TaskForm.controls.CompanyNumber.setValue(Response.Data.CompanyNo);
            this.TaskForm.controls.NextDueDate.setValue(formatDate(Response.Data.DueDate, 'yyyy-MM-dd', 'en'));
            this.TaskForm.controls.NatureOfWork.setValue(Response.Data.WorkNatureId);
            this.TaskForm.controls.RecordIn.setValue(Response.Data.RecordIn);
            this.TaskForm.controls.ReviewBy.setValue(Response.Data.ReviewingUserId);
            this.TaskForm.controls.JobsInPlanner.setValue(Response.Data.JobsInPlanner);
            this.TaskForm.controls.WorkStartDate.setValue(formatDate(Response.Data.WorkStartDate, 'yyyy-MM-dd', 'en'));
            this.TaskForm.controls.Status.setValue(Response.Data.Status);
            this.TaskForm.controls.IsActive.setValue(Response.Data.IsActive);
          }
          else {
            this.CommonFunctions.openSnackBar(Response.responseMessage);
          }
        } else {
          this.CommonFunctions.openSnackBar(Response.responseMessage);
        }

      },
        (Error) => { this.CommonFunctions.openSnackBar(Constant.CommonErrorMessage); }
      );
  }

  GetAllUserList() {
    this.userService.GetUsers().subscribe({
      next: (data: any) => {
        this.UserListData = data.Data;
        this.UserListData = this.UserListData.filter(user => user.IsActive == true)
      },
      error: (e) => this.CommonFunctions.openSnackBar(Constant.CommonErrorMessage)
    })
  }

  onSubmit() {
    this.Submitted = true

    if (this.TaskForm.invalid) {
      return
    }
    else {
      //Set Data in Company class
      var TaskData = new Task();
      TaskData.TaskMasterId = this.TaskId != "" ? parseInt(this.TaskId) : 0;
      TaskData.TaskName = this.TaskForm.controls['TaskName'].value;
      TaskData.CompanyName = this.TaskForm.controls['CompanyName'].value;
      TaskData.UserId = parseInt(this.TaskForm.controls['PartnerName'].value);
      TaskData.CompanyNo = this.TaskForm.controls['CompanyNumber'].value;
      TaskData.DueDate = this.TaskForm.controls['NextDueDate'].value;
      TaskData.WorkNatureId = parseInt(this.TaskForm.controls['NatureOfWork'].value);
      TaskData.RecordIn = JSON.parse(this.TaskForm.controls['RecordIn'].value);
      TaskData.ReviewingUserId = parseInt(this.TaskForm.controls['ReviewBy'].value);
      TaskData.JobsInPlanner = JSON.parse(this.TaskForm.controls['JobsInPlanner'].value);
      TaskData.WorkStartDate = this.TaskForm.controls['WorkStartDate'].value;
      TaskData.Status = parseInt(this.TaskForm.controls['Status'].value);
      TaskData.IsActive = this.TaskForm.controls['IsActive'].value;
      this.taskService.AddorUpdateTask(TaskData)
        .subscribe(
          (Response) => {
            if (Response.StatusType == Constant.IsSuccess) {
              this.CommonFunctions.openSnackBar(Response.Message);
              this.Router.navigate(['/admin/task/taskList']);
            } else {
              this.CommonFunctions.openSnackBar(Response.Message);
            }

          },
          (Error) => { this.CommonFunctions.openSnackBar(Constant.CommonErrorMessage); });
    }

  }

}
