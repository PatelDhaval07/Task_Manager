import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import { LocationStrategy, PathLocationStrategy } from '@angular/common'
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { CommonFunctions } from './shared/functions/common.functions';
import { CommonService } from './shared/services/common.service';
import { AppConfig, App_Config } from './app.config.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    AuthLayoutModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [
    {
      provide: App_Config, useValue: AppConfig
    },
    //{
    //  provide: LocationStrategy,
    //  useClass: PathLocationStrategy,
    //},
    CommonFunctions, CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
