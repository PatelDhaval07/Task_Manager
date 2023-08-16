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
  export class TaskService extends HttpHelper {
    constructor(
      private http: HttpClient,
      private CommonFunctions: CommonFunctions,
      private CommonService: CommonService,
    //  @Inject(App_Config) private config: AppConfig,
    ) {
      super()
    }
    
    // TaskList(): Observable<any> {
    //   return this.http.post<any>(`${this.config.Api_Base_Url}${Constant.ValidateUser}`,
    //   )
    //   .pipe(
    //   map((data: HttpResponse<any>) => { return this.onSucess<any>(data, 'Get All Task Data'); }),
    //   catchError((error: HttpErrorResponse) => { return this.onError(error, 'Get All Task List Failed'); }),
    //   finalize(() => { this.onComplete('Get All Task Data'); })
    //   );
    // }
  }
  