import { HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { throwError } from 'rxjs'
import * as Constant from 'src/app/shared/common-constants'
//import { environment } from 'src/environments/environment'
export abstract class HttpHelper {
  constructor() {}

  onSucess<T>(res: HttpResponse<T>, functionName: string) {
    return res
  }
  onError(error: HttpErrorResponse, functionName: string) {
    return throwError(error)
  }
  onComplete(functionName: string) {}
}
