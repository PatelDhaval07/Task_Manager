import { Component, Inject, OnInit,OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Task } from 'src/app/shared/models/task';

import * as Constant from 'src/app/shared/common-constants'
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormsModule,
  AbstractControl,
} from '@angular/forms'
import { CommonFunctions } from 'src/app/shared/functions/common.functions'
//import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task-operation',
  templateUrl: './task-operation.component.html',
  styleUrls: ['./task-operation.component.scss']
})
export class TaskOperationComponent implements OnInit {
  Label: string = "Add";
  TaskId: string;
  ListData: any;
  UserListData:any;
  Submitted = false;
  IsDisabled:boolean=false;
  //model:any;
  TaskForm : FormGroup = new FormGroup({
    TaskId: new FormControl(''),
    TaskName: new FormControl(''),
    CompanyName: new FormControl(''),
    PartnerName: new FormControl(''),
    CompanyNumber: new FormControl(''),
    NextDueDate: new FormControl(''),
    NatureOfWork: new FormControl(''),
    ReviewBy: new FormControl(''),
    RecordIn: new FormControl(''),
    JobsInPlaner: new FormControl(''),
    WorkStartDate: new FormControl(''),
    Status: new FormControl(''),
  })
  constructor(
    private Router: Router,
    private Route: ActivatedRoute,
  private CommonFunctions: CommonFunctions,
    private FormBuilder: FormBuilder,
  //  private TaskService:TaskService
  ) { 
    if(this.Route.snapshot.paramMap.get('id')){
      this.TaskId = this.Route.snapshot.paramMap.get('id');
    }
  }

  ngOnInit(): void {
    this.GetAllUserList();
    this.TaskForm = this.FormBuilder.group({
      TaskId: 0,
      TaskName: [
        '',
        [
          Validators.required,
        ],
      ],
      CompanyName:[
        '',
        [
          Validators.required,
        ],
      ],
      PartnerName:[''],
      CompanyNumber:[
        '',
        [
          Validators.required,
        ],
      ],
      NextDueDate:[''],
      NatureOfWork:[''],
      ReviewBy:[''],
      RecordIn:['YES'],
      JobsInPlaner:['YES'],
      WorkStartDate:[''],
      Status:['Open'],
      IsActive:true,
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
      TaskId:TaskId
    };
  
    // this.TaskService.GetAllTaskList(this.ListData)
    //   .subscribe(
    //     (Response) => {
    //       if (Response.statusCode == Constant.StatusCodeOk && Response.isSuccess == Constant.IsSuccess) {
    //         if (Response.responseData.ResultData) {
    //           this.TaskForm.controls.TaskId.setValue(Response.responseData.ResultData.taskId);
    //           this.TaskForm.controls.TaskName.setValue(Response.responseData.ResultData.TaskName);
    //           this.TaskForm.controls.CompanyName.setValue(Response.responseData.ResultData.CompanyName);
    //           this.TaskForm.controls.PartnerName.setValue(Response.responseData.ResultData.PartnerName);
    //           this.TaskForm.controls.CompanyNumber.setValue(Response.responseData.ResultData.CompanyNumber);
    //           this.TaskForm.controls.NextDueDate.setValue(Response.responseData.ResultData.NextDueDate);
    //           this.TaskForm.controls.NatureOfWork.setValue(Response.responseData.ResultData.NatureOfWork);
    //           this.TaskForm.controls.RecordIn.setValue(Response.responseData.ResultData.RecordIn);
    //           this.TaskForm.controls.ReviewBy.setValue(Response.responseData.ResultData.ReviewBy);
    //           this.TaskForm.controls.JobsInPlaner.setValue(Response.responseData.ResultData.JobsInPlaner);
    //           this.TaskForm.controls.WorkStartDate.setValue(Response.responseData.ResultData.WorkStartDate);
    //           this.TaskForm.controls.TaskStatus.setValue(Response.responseData.ResultData.TaskStatus);
    //           this.TaskForm.controls.IsActive.setValue(Response.responseData.ResultData.isActive);
    //         }
    //         else{
    //           this.CommonFunctions.openSnackBar(Response.responseMessage);
    //         }
    //       }else{
    //         this.CommonFunctions.openSnackBar(Response.responseMessage);
    //       }
        
    //     },
    //     (Error) => { this.CommonFunctions.openSnackBar(Constant.CommonErrorMessage); }
    //     );
  }

  GetAllUserList(){
    // this.UserService.GetAllIndexList()
    //   .subscribe(
    //     (Response) => {
    //       if (Response.statusCode == Constant.StatusCodeOk && Response.isSuccess == Constant.IsSuccess) {
    //         this.UserListData = Response.responseData.ResultData;    
    //       } else {
    //         this.CommonFunctions.openSnackBar(Response.responseMessage);
    //       }
    //     },
    //     (Error) => {  this.CommonFunctions.openSnackBar(Constant.CommonErrorMessage); });
  }

  onSubmit(){
    this.Submitted = true
   
    if (this.TaskForm.invalid) {
      return
    } 
    else {
      // if (parseInt(this.TaskId) > 0) {
      //   this.TaskForm.controls.TaskId.setValue(parseInt(this.TaskId));
      //   this.TaskForm.controls.OperationType.setValue(Constant.Update);
      // }
      
      // //Set Data in Company class
      // var TaskData = new Task();
      // TaskData.TaskId = this.TaskForm.controls['TaskId'].value;
      // TaskData.TaskName = this.TaskForm.controls['IndexName'].value;
      // TaskData.CompanyName   = this.TaskForm.controls['CompanyName'].value;
      // TaskData.PartnerName = this.TaskForm.controls['PartnerName'].value;;
      // TaskData.CompanyNumber = this.TaskForm.controls['CompanyNumber'].value;
      // TaskData.NextDueDate = this.TaskForm.controls['NextDueDate'].value;
      // TaskData.NatureOfWork   = this.TaskForm.controls['NatureOfWork'].value;
      // TaskData.RecordIn = this.TaskForm.controls['RecordIn'].value;
      // TaskData.ReviewBy = this.TaskForm.controls['ReviewBy'].value;
      // TaskData.JobsInPlaner = this.TaskForm.controls['JobsInPlaner'].value;
      // TaskData.WorkStartDate = this.TaskForm.controls['WorkStartDate'].value;
      // TaskData.TaskStatus = this.TaskForm.controls['TaskStatus'].value;
      // TaskData.OperationType   = this.TaskForm.controls['OperationType'].value;
      // TaskData.IsActive   = this.TaskForm.controls['IsActive'].value;
      //  this.TaskService.IndexListOperation(TaskData)
      //     .subscribe(
      //       (Response) => {
      //         if (Response.statusCode == Constant.StatusCodeOk && Response.isSuccess == Constant.IsSuccess) {
      //             this.CommonFunctions.openSnackBar(Response.responseMessage); 
      //             this.Router.navigate(['/Task/taskList']);
      //         } else {
      //           this.CommonFunctions.openSnackBar(Response.responseMessage);           
      //         }
              
      //       },
      //       (Error) => { this.CommonFunctions.openSnackBar(Constant.CommonErrorMessage); });
    }

  }

}
