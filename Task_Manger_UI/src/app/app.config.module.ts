import { InjectionToken, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { environment } from 'src/environments/environment'

export let App_Config = new InjectionToken<AppConfig>('app.config')

export class AppConfig {
  Api_Base_Url: any
}

export const App_Config_Class: AppConfig = {
  Api_Base_Url: environment.TaskManagerApiEndpoint,
}

@NgModule({
  providers: [
    {
      provide: App_Config,
      useValue: App_Config_Class,
    },
  ],
  declarations: [],
  imports: [CommonModule],
})
export class AppConfigModule { }
