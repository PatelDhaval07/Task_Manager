import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { catchError, finalize, map } from 'rxjs/operators'
//import { AppConfig, App_Config } from 'src/app/app-config.module'
import * as Constant from 'src/app/shared/common-constants'
import { HttpHelper } from '../helper/http.helper'


const HttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}
@Injectable({
  providedIn: 'root',
})
export class CommonService extends HttpHelper  {
  LocalIP: any
  //Currunt Screen Id
  private ScreenId = new BehaviorSubject<number>(0)
  CurrentScreenID = this.ScreenId.asObservable()
  //Sidebar Menu list
  private MenuData = new BehaviorSubject<any>(null)
  MenuList = this.MenuData.asObservable()
  //Top Menu list
  private TopMenuData = new BehaviorSubject<any>(null)
  TopMenuList = this.TopMenuData.asObservable()

  //NFA Temp selection Array
  SelectedNFAIds = []
  constructor(
    private http: HttpClient,
    // @Inject(App_Config) private config: AppConfig,
  ) {
    super()
  }


  // CommonDelete(Deletedata: any, DeleteAPIEndPoint = Constant.CommonDelete): Observable<any> {
  //   return this.http.post<any>(`${this.config.Api_Base_Url}${DeleteAPIEndPoint}`, Deletedata,
  //     {
  //       headers:
  //         this.SetHeaders()
  //     })
  //     .pipe(
  //       map((data: HttpResponse<any>) => { return this.onSucess<any>(data, 'CommonDelete'); }),
  //       catchError((error: HttpErrorResponse) => { return this.onError(error, 'CommonDelete'); }),
  //       finalize(() => { this.onComplete('CommonDelete'); })
  //     );
  // }

  SetHeaders(): HttpHeaders {
    this.LocalIP = localStorage.getItem(Constant.ClientIP)
    const HeadersConfig = {
      'Content-Type': 'application/json; charset= utf-8',
      Authorization: 'Bearer ' + localStorage.getItem(Constant.AuthToken),
    }

    return new HttpHeaders(HeadersConfig)
  }
}
