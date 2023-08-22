import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { LocationStrategy, PathLocationStrategy } from '@angular/common'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { CommonFunctions } from 'src/app/shared/functions/common.functions';
// import { CommonService } from 'src/app/shared/services/common.service';
import { UserService } from './services/user.service';


@NgModule({
  imports: [
    CommonModule,
    AuthLayoutRoutes,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotPasswordComponent
  ],
  providers: [
    //{
    //  provide: LocationStrategy,
    //  useClass: PathLocationStrategy,
    //},
    //CommonFunctions,CommonService,
    UserService
  ],
})
export class AuthLayoutModule { }
