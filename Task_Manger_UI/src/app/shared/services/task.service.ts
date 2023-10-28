import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { catchError, finalize, map } from 'rxjs/operators'
import { AppConfig, App_Config } from 'src/app/app.config.module';
import { HttpHelper } from '../helper/http.helper';
import * as constant from 'src/app/shared/common-constants';
import { HttpqService } from './httpq.service';


@Injectable({
  providedIn: 'root',
})
export class TaskService extends HttpHelper {
  constructor(
    private httpqService: HttpqService,
    @Inject(App_Config) private config: AppConfig,
  ) {
    super()
  }

  GetAllTasks() {
    return this.httpqService.get(constant.GetAllTasks);
  }

  UploadTasks(formData: any) {
    return this.httpqService.postForUpload(constant.UploadTasks, formData);
  }

  ChangeActivation(taskMasterId: number, checked: boolean) {
    return this.httpqService.get(constant.ChangeTaskActivation + taskMasterId + '/' + checked);
  }

  GetTaskDetail(taskMasterId: string) {
    return this.httpqService.get(constant.GetTaskDetail + taskMasterId);
  }

  AddorUpdateTask(taskData: any) {
    return this.httpqService.post(constant.AddorUpdateTask, taskData);
  }

  GetCalendarTasks(userId: number) {
    return this.httpqService.get(constant.GetCalendarTasks + userId);
  }
}
