import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/layouts/auth-layout/services/user.service';
import * as constant from 'src/app/shared/common-constants';
import { CommonFunctions } from 'src/app/shared/functions/common.functions';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userData?: User[];
  authToken: string = '';
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columns = [
    { columnDisplayName: 'First Name', columnDef: 'FirstName', header: 'First Name' },
    { columnDisplayName: 'Last Name', columnDef: 'LastName', header: 'Last Name' },
    { columnDisplayName: 'Email', columnDef: 'Email', header: 'Email' },
    { columnDisplayName: 'Role', columnDef: 'RoleName', header: 'Role' },
    { columnDisplayName: 'Active', columnDef: 'IsActive', header: 'Active' },
    { columnDisplayName: 'Action', columnDef: 'Action', header: 'Action' },
  ];
  NoRecordFound = "No Record Found";

  constructor(
    private userService: UserService,
    private commonFunctions: CommonFunctions,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authToken = this.route.snapshot.paramMap.get('AuthToken');
    if (this.authToken) {
      localStorage.setItem("AuthToken", this.authToken);
      this.router.navigate([constant.UserList]);
    }

    if (localStorage.getItem("AuthToken")) {
      this.router.navigate([constant.UserList]);
    }
    else {
      this.router.navigate([constant.FrontLogin]);
    }

    this.displayedColumns = this.columns.map(x => x.columnDef);
    this.retrieveData();
  }

  retrieveData(): void {
    this.userService.GetUsers().subscribe({
      next: (data: any) => {
        this.userData = data.Data;
        this.dataSource = new MatTableDataSource<any>(this.userData);
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

  refreshList(): void {
    this.retrieveData()
  }

  onSendRemainder(user: any) {
    this.userService.SendRemainder(user.Email).subscribe((Response: any) => {
      if (Response.StatusType == constant.IsSuccess) {
        this.commonFunctions.openSnackBar(Response.Message);
      } else {
        this.commonFunctions.openSnackBar(Response.Message);
      }
    },
      (err) => {
        this.commonFunctions.openSnackBar(constant.CommonErrorMessage);
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
    this.userService.ChangeActivation(row.UserId, event.checked).subscribe((result: any) => {
      if (result.StatusType == constant.IsSuccess) {
        this.refreshList();
      }
    });
  }
}
