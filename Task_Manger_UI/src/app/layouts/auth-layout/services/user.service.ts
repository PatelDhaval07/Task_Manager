import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AppConfig, App_Config } from 'src/app/app.config.module'
import { HttpHelper } from '../../../shared/helper/http.helper'
import { HttpqService } from '../../../shared/services/httpq.service';
import * as constant from 'src/app/shared/common-constants'


@Injectable(
  {
    providedIn: 'root',
  }
)
export class UserService extends HttpHelper {
  constructor(
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

  ForgotPassword(Email: string): Observable<any> {
    return this.httpqService.getwithouttoken(constant.ForgotPassword + Email);
  }

  ChangePassword(ChangePasswordModel: any): Observable<any> {
    return this.httpqService.post(constant.ChangePassword, ChangePasswordModel);
  }

  GetUsers(): Observable<any> {
    return this.httpqService.get(constant.GetAllUsers);
  }

  SendRemainder(email: string): Observable<any> {
    return this.httpqService.get(constant.SendRemainder + email);
  }

  ChangeActivation(userMasterId: number, checked: boolean) {
    return this.httpqService.get(constant.ChangeUserActivation + userMasterId + '/' + checked);
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
