import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, observable, of } from 'rxjs';
import { ExceptionHandlerService } from './exceptionHandler.service';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import * as constant from 'src/app/shared/common-constants'
import { Router } from '@angular/router';
//import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class HttpqService {

  constructor(private httpClient: HttpClient
    , private exceptionHandler: ExceptionHandlerService
    , private snackBar: MatSnackBar
    , private router: Router
    //, private spinner: NgxSpinnerService
  ) { }

  postWithoutToken(resourse: string, modelData: any) {
    //this.spinner.show();
    return this.httpClient.post(environment.TaskManagerApiEndpoint + resourse, modelData, this.setRequestHeaders()).pipe(
      map((response: any) => {
        //this.spinner.hide();
        if (response.StatusType == constant.IsSuccess) {
          if (response.Message != null) {
            this.snackBar.open(response.Message, "Success", { duration: 2000 });
          }
          return response;
        }
        else if (response.StatusType != constant.IsSuccess) {
          if (response.Message != null) {
            this.snackBar.open(response.Message, "Error", { duration: 2000 });
          }
          return response;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        //this.spinner.hide();
        this.exceptionHandler.handleError(error);
        return of([])
      })
    )
  }

  get(resourse: string) {
    // this.snackBar.openFromComponent(SnackbarComponent, {
    //   data: { message: 'Dashboard.SidebarTitle',action:'warning' }
    // });
    //this.spinner.show();
    return this.httpClient.get(environment.TaskManagerApiEndpoint + resourse, this.setRequestHeadersWithToken()).pipe(
      map((response: any) => {
        //this.spinner.hide();
        if (response.StatusType == constant.IsSuccess) {
          if (response.Message != null) {
            this.snackBar.open(response.Message, "Success", { duration: 2000 });
          }
          return response;
        }
        else if (response.StatusType != constant.IsSuccess) {
          if (response.Message != null) {
            this.snackBar.open(response.Message, "Error", { duration: 2000 });
          }
          return response;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        //this.spinner.hide();
        this.exceptionHandler.handleError(error)

        return of([])
      })
    )
  }

  //delete(resourse: string) {
  //  this.spinner.show();
  //  return this.httpClient.delete(environment.apidomain + resourse, this.setRequestHeadersWithToken()).pipe(
  //    map((response: any) => {
  //      this.spinner.hide();
  //      if (response.StatusType == StatusType.Success) {
  //        if (response.Message != null) {
  //          this.snackBar.open(response.Message, "Success", { duration: 2000 });
  //        }
  //        return response;
  //      }
  //      else if (response.StatusType == StatusType.Fail) {
  //        if (response.Message != null) {
  //          this.snackBar.open(response.Message, "Error", { duration: 2000 });
  //        }
  //        return response;
  //      }
  //    }),
  //    catchError((error: HttpErrorResponse) => {
  //      this.spinner.hide();
  //      this.exceptionHandler.handleError(error);
  //      return of([])
  //    })
  //  )
  //}

  post(resourse: string, modelData: any) {
    //this.spinner.show();
    return this.httpClient.post(environment.TaskManagerApiEndpoint + resourse, modelData, this.setRequestHeadersWithToken()).pipe(
      map((response: any) => {
        //this.spinner.hide();
        if (response.StatusType == constant.IsSuccess) {
          if (response.Message != null) {
            this.snackBar.open(response.Message, "Success", { duration: 2000 });
          }
          return response;
        }
        else if (response.StatusType != constant.IsSuccess) {
          if (response.Message != null) {
            this.snackBar.open(response.Message, "Error", { duration: 2000 });
          }
          return response;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        //this.spinner.hide();
        this.exceptionHandler.handleError(error);
        return of([])
      })
    )
  }

  /**Request Header Method */
  setRequestHeaders() {
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return httpOptions;
  }

  setRequestHeadersWithToken() {
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + localStorage.getItem(constant.AuthToken))
    };
    return httpOptions;
  }

  setRequestHeadersWithTokenUpload() {
    let httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + localStorage.getItem(constant.AuthToken))
    };
    return httpOptions;
  }

}
