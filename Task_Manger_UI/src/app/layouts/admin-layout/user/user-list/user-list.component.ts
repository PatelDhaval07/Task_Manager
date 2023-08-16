import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
//import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userData?: User[]
  constructor(
  //  private userService: UserService
    ) { }

  ngOnInit(): void {
    this.retrieveData()
  }
  retrieveData(): void {
    // this.userService.UserList().subscribe({
    //   next: (data: any) => {
    //     this.userData = data.data
    //   },
    //   error: (e) => console.error(e),
    // })
  }
  refreshList(): void {
    this.retrieveData()
  }
}
