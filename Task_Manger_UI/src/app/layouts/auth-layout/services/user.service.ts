import { HttpClient, HttpErrorResponse, HttpResponse, } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { catchError, finalize, map } from 'rxjs/operators'
import { AppConfig, App_Config } from 'src/app/app.config.module'
import { CommonFunctions } from '../../../shared/functions/common.functions'
import { HttpHelper } from '../../../shared/helper/http.helper'
import { CommonService } from '../../../shared/services/common.service';
import { HttpqService } from '../../../shared/services/httpq.service';
import * as constant from 'src/app/shared/common-constants'


@Injectable(
  {
    providedIn: 'root',
  }
)
export class UserService extends HttpHelper {
  constructor(
    private http: HttpClient,
    private CommonFunctions: CommonFunctions,
    private CommonService: CommonService,
    private httpqService: HttpqService,
    @Inject(App_Config) private config: AppConfig,
  ) {
    super()
  }

  Login(loginModel: any) {
    return this.httpqService.postWithoutToken(constant.ValidateUser, loginModel);
  }

  RegisterUser(UserData: any): Observable<any> {
    return this.httpqService.postWithoutToken(constant.RegisterUser, UserData);
  }

  //UserList(): Observable<any> {
  //  return this.http.post<any>(`${this.config.Api_Base_Url}${Constant.ValidateUser}`,
  //  )
  //    .pipe(
  //      map((data: HttpResponse<any>) => { return this.onSucess<any>(data, 'Get All User Data'); }),
  //      catchError((error: HttpErrorResponse) => { return this.onError(error, 'Get All User List Failed'); }),
  //      finalize(() => { this.onComplete('Get All User Data'); })
  //    );
  //}
}
