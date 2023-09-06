import { Component, Inject, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import * as Constant from 'src/app/shared/common-constants'
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms'
//import { AppConfig, App_Config } from '../app-config.module'
import { UserService } from '.././services/user.service'
import { User } from 'src/app/shared/models/user'
import { CommonFunctions } from 'src/app/shared/functions/common.functions'
//import { MatSnackBar } from '@angular/material/snack-bar'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  AuthToken: any;
  UserLoginForm: FormGroup = new FormGroup({
    Email: new FormControl(''),
    Password: new FormControl(''),
  })
  public noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g)
    return isSpace ? { whitespace: true } : null
  }
  Submitted = false
  constructor(
    //@Inject(App_Config) private Config: AppConfig,
    @Inject(UserService) private userService: UserService,
    private Router: Router,
    private Route: ActivatedRoute,
    private CommonFunctions: CommonFunctions,
    private FormBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.UserLoginForm = this.FormBuilder.group({
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          this.noWhitespaceValidator,
        ],
      ],
    })
  }
  get loginFormControl() {
    return this.UserLoginForm.controls
  }

  onSubmit() {
    this.Submitted = true
    //form data post
    if (this.UserLoginForm.invalid) {
      return;
    } else {
      var UserData = new User()
      UserData.Email = this.UserLoginForm.controls['Email'].value
      UserData.Password = this.UserLoginForm.controls['Password'].value
      this.userService.Login(UserData).subscribe(
        (Response: any) => {
          if (Response.StatusType == Constant.IsSuccess) {
            if (Response.Data.jwtToken != null) {
              localStorage.setItem("AuthToken", Response.Data.jwtToken);
              localStorage.setItem("FirstName", Response.Data.FirstName);
              localStorage.setItem("LastName", Response.Data.LastName);
              this.CommonFunctions.openSnackBar(Constant.LoginMessage)
              this.Router.navigate(['/admin/dashboard']);
            } else {
              this.CommonFunctions.openSnackBar(Response.Message);
            }
          } else {
            this.CommonFunctions.openSnackBar(Response.Message);
          }
        },
        (err) => {
          this.Router.navigate(['/auth/login'])
          this.CommonFunctions.openSnackBar(Constant.CommonErrorMessage);
        }
      )
    }
  }
}

}
