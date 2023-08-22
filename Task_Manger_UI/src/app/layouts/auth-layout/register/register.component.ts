import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as constant from 'src/app/shared/common-constants';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
//import { AppConfig, App_Config } from '../app-config.module'
import { UserService } from '../services/user.service';
import { User } from 'src/app/shared/models/user';
import { CommonFunctions } from 'src/app/shared/functions/common.functions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  AuthToken: any;
  RegisterForm: FormGroup = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    Email: new FormControl('')
  })
  public noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g)
    return isSpace ? { whitespace: true } : null
  }
  Submitted = false
  constructor(
    private userService: UserService,
    private Router: Router,
    private Route: ActivatedRoute,
    private CommonFunctions: CommonFunctions,
    private FormBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.RegisterForm = this.FormBuilder.group({
      FirstName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      LastName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ]
    })
  }
  get registerFormControl() {
    return this.RegisterForm.controls;
  }
  onSubmit() {
    this.Submitted = true
    //form data post
    if (this.RegisterForm.invalid) {
      return
    } else {
      var UserData = new User();
      UserData.FirstName = this.RegisterForm.controls['FirstName'].value;
      UserData.LastName = this.RegisterForm.controls['LastName'].value;
      UserData.Email = this.RegisterForm.controls['Email'].value;
      this.userService.RegisterUser(UserData).subscribe(
        (Response: any) => {
          if (Response.StatusType == constant.IsSuccess) {
            this.CommonFunctions.openSnackBar(Response.Message)
            this.Router.navigate([constant.FrontLogin]);
          }
          else {
            this.CommonFunctions.openSnackBar(Response.Message);
          }
        },
        (err) => {
          this.Router.navigate([constant.FrontLogin])
          this.CommonFunctions.openSnackBar(constant.CommonErrorMessage);
        }
      )
    }
  }


}
