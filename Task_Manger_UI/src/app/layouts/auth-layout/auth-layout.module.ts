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
// import { CommonFunctions } from 'src/app/shared/functions/common.functions';
// import { CommonService } from 'src/app/shared/services/common.service';
// import { UserService } from 'src/app/shared/services/user.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
     NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  // providers: [
  //   {
  //     provide: LocationStrategy,
  //     useClass: PathLocationStrategy,
  //   },
  //   CommonFunctions,CommonService,
  //   UserService
  // ],
})
export class AuthLayoutModule { }