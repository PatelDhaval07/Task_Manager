import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { catchError, finalize, map } from 'rxjs/operators'
//import { AppConfig, App_Config } from 'src/app/app-config.module'
import { CommonFunctions } from '../functions/common.functions'
import { HttpHelper } from '../helper/http.helper'
import { CommonService } from './common.service'
import * as Constant from 'src/app/shared/common-constants'


@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpHelper {
  constructor(
    private http: HttpClient,
    private CommonFunctions: CommonFunctions,
    private CommonService: CommonService,
  //  @Inject(App_Config) private config: AppConfig,
  ) {
    super()
  }
  // ValidateUser(ListData:any): Observable<any> {
  //   return this.http.post<any>(`${this.config.Api_Base_Url}${Constant.ValidateUser}`, ListData,
  //   )
  //   .pipe(
  //   map((data: HttpResponse<any>) => { return this.onSucess<any>(data, 'ValidateUser'); }),
  //   catchError((error: HttpErrorResponse) => { return this.onError(error, 'ValidateUser'); }),
  //   finalize(() => { this.onComplete('ValidateUser'); })
  //   );
  // }

  // RegisterUser(UserData:any): Observable<any> {
  //   return this.http.post<any>(`${this.config.Api_Base_Url}${Constant.ValidateUser}`, UserData,
  //   )
  //   .pipe(
  //   map((data: HttpResponse<any>) => { return this.onSucess<any>(data, 'User Register'); }),
  //   catchError((error: HttpErrorResponse) => { return this.onError(error, 'User Registration Failed'); }),
  //   finalize(() => { this.onComplete('User Register'); })
  //   );
  // }
  // UserList(): Observable<any> {
  //   return this.http.post<any>(`${this.config.Api_Base_Url}${Constant.ValidateUser}`,
  //   )
  //   .pipe(
  //   map((data: HttpResponse<any>) => { return this.onSucess<any>(data, 'Get All User Data'); }),
  //   catchError((error: HttpErrorResponse) => { return this.onError(error, 'Get All User List Failed'); }),
  //   finalize(() => { this.onComplete('Get All User Data'); })
  //   );
  // }
}
