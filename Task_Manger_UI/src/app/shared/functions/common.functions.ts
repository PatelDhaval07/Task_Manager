import { Inject, Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Subject } from 'rxjs'
//import * as Constant from 'src/app/shared/common-constants'
//import { CommonService } from '../services/common.service';
import { Router } from '@angular/router'
//import { DatePipe } from '@angular/common'
//import { User } from '../models/user'
// @ts-ignore
import * as CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root',
})
export class CommonFunctions {
  constructor(
    //    private CommonServices: CommonService,
    private SnackBar: MatSnackBar,
    private Router: Router,
    //private DatePipe: DatePipe,
    //  private CommonServices: CommonService,
  ) { }



  //Conmmon function to Show Snackbar messages
  openSnackBar(Message: any) {
    this.SnackBar.open(Message, '', {
      duration: 3500,
      verticalPosition: 'top',
    })
  }



  //Logout user if API responce is 401
  // Logout(ErrorStatus: any) {
  //   if (ErrorStatus == 401) {
  //     localStorage.clear();
  //     sessionStorage.clear();
  //     //redirect to common app
  //     let Url = this.ConfigUrl(Constant.AppLoginUrl);
  //     Url.subscribe(
  //       (UrlResponse) => {
  //         window.location.href = UrlResponse;
  //       });
  //   }
  // }



  //Common Acess Log insert
  // Logging(LogData: any) {
  //   this.CommonServices.AccessLogOperation(LogData)
  //     .subscribe(
  //       (Response) => {
  //         if (Response.statusCode == Constant.StatusCodeOk && Response.isSuccess == Constant.IsSuccess) {
  //           return Response;
  //         }
  //       },
  //       (Error) => { this.Logout(Error.status); return Error; });
  // }

  // GetUserDetails() {
  //   let UserDetails = JSON.parse(this.GetDecryptedString(localStorage.getItem(this.GetEncryptedString(Constant.LoginUserDetails)) || '{}') || '{}');
  //   var UserData = new User();
  //   UserData.FirstName = UserDetails?.firstName;
  //   UserData.LastName = UserDetails?.lastName;
  //   UserData.Email = UserDetails?.email;
  //   UserData.PhoneNumber = UserDetails?.phoneNumber;
  //   UserData.UserId = UserDetails?.userId;
  //   UserData.UserName = UserDetails?.userName;

  //   return UserData;
  // }

}
