import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/shared/models/task';
import { TaskService } from 'src/app/shared/services/task.service';
import { CommonFunctions } from 'src/app/shared/functions/common.functions';
import * as constant from 'src/app/shared/common-constants';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  taskData?: Task[];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columns = [
    { columnDisplayName: 'Partner Name', columnDef: 'PartnerName', header: 'Partner Name' },
    { columnDisplayName: 'Company Name', columnDef: 'CompanyName', header: 'Company Name' },
    { columnDisplayName: 'Company Number', columnDef: 'CompanyNo', header: 'Company Number' },
    { columnDisplayName: 'Due Date', columnDef: 'DueDate', header: 'Due Date' },
    { columnDisplayName: 'Work Nature', columnDef: 'WorkNature', header: 'Work Nature' },
    { columnDisplayName: 'Reviewing Person', columnDef: 'ReviewingPerson', header: 'Reviewing Person' },
    { columnDisplayName: 'Record In', columnDef: 'RecordIn', header: 'Record In' },
    { columnDisplayName: 'Jobs In Planner', columnDef: 'JobsInPlanner', header: 'Jobs In Planner' },
    { columnDisplayName: 'Work Start Date', columnDef: 'WorkStartDate', header: 'Work Start Date' },
    { columnDisplayName: 'Active', columnDef: 'IsActive', header: 'Active' },
    { columnDisplayName: 'Action', columnDef: 'Action', header: 'Action' },
  ];

  NoRecordFound = "No Record Found";
  authToken: string = '';

  constructor(
    private taskService: TaskService,
    private commonFunctions: CommonFunctions,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authToken = this.route.snapshot.paramMap.get('AuthToken');
    if (this.authToken) {
      localStorage.setItem("AuthToken", this.authToken);
      this.router.navigate([constant.TaskList]);
    }

    if (localStorage.getItem("AuthToken")) {
      this.router.navigate([constant.TaskList]);
    }
    else {
      this.router.navigate([constant.FrontLogin]);
    }

    this.displayedColumns = this.columns.map(x => x.columnDef);
    this.retrieveData();

  }
  retrieveData(): void {
    this.taskService.GetAllTasks().subscribe({
      next: (data: any) => {
        this.taskData = data.Data;
        this.dataSource = new MatTableDataSource<any>(this.taskData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }

          return data[sortHeaderId];
        };
      },
      error: (e) => console.error(e),
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngModifyActivation(event: any, row: any) {
    this.taskService.ChangeActivation(row.TaskMasterId, event.checked).subscribe((result: any) => {
      if (result.StatusType == constant.IsSuccess) {
        this.refreshList();
      }
    });
  }

  refreshList(): void {
    this.retrieveData()
  }

  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    var filetypearr = fileToUpload.name.split(".").reverse();
    if (constant.INVOICEFILEFORMATES.indexOf(filetypearr[0]) != -1) {
      if (fileToUpload.size > 2000000000) {
        this.commonFunctions.openSnackBar(constant.uploadSizeError)
        return;
      }
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);

      this.taskService.UploadTasks(formData)
        .subscribe((response: any) => {
          if (response.StatusType == constant.IsSuccess) {
            this.commonFunctions.openSnackBar(response.Message);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            this.commonFunctions.openSnackBar(response.Message);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        },
          (err) => {
            this.commonFunctions.openSnackBar(constant.CommonErrorMessage);
          })
    }
    else {
      this.commonFunctions.openSnackBar(constant.FILETYPEERROR);
    }
  }
}
