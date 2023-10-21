import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public firstName: string = "";
  public lastName: string = "";
  public email: string = "";

  constructor() { }

  ngOnInit() {
    this.firstName = localStorage.getItem("FirstName");
    this.lastName = localStorage.getItem("LastName");
    this.email = localStorage.getItem("Email");
  }

}
