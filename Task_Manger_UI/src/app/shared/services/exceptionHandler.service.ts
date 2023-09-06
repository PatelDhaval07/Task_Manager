import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as constant from '../common-constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ExceptionHandlerService {

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status == 0) {
      // Server-side errors
      errorMessage = 'Error Connection Refuse';
    }
    else if (error.status == 401) {
      // Unauthorized Error
      errorMessage = 'Your session has expired. Please log in';
      localStorage.removeItem(constant.LoginUserDetails);
      this.router.navigate(['/login']);
    }
    this.snackBar.open(errorMessage, "Error", { duration: 2000 });
    return throwError(errorMessage);
  }
}
