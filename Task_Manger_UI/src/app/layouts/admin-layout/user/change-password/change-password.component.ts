import { Component, Inject, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import * as constant from 'src/app/shared/common-constants'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { CommonFunctions } from 'src/app/shared/functions/common.functions';
import { UserService } from '../../../auth-layout/services/user.service';
import { changePassword } from '../../../../shared/models/changePassword';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  AuthToken: any;
  ChangePassForm: FormGroup = new FormGroup({
    OldPass: new FormControl(''),
    NewPass: new FormControl(''),
    ReEnterPass: new FormControl('')
  })
  public noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g)
    return isSpace ? { whitespace: true } : null
  }
  Submitted = false;
  authToken = '';
  constructor(
    //@Inject(App_Config) private Config: AppConfig,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commonFunctions: CommonFunctions,
    private userService: UserService,
    private changePasswordData: changePassword
  ) { }

  ngOnInit(): void {
    this.authToken = this.route.snapshot.paramMap.get('AuthToken');
    if (this.authToken) {
      localStorage.setItem("AuthToken", this.authToken);
      this.router.navigate([constant.ChangePassword]);
    }

    if (localStorage.getItem("AuthToken")) {
      this.router.navigate([constant.FrontChangePassword]);
    }
    else {
      this.router.navigate([constant.FrontLogin]);
    }

    this.ChangePassForm = this.formBuilder.group({
      OldPass: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          this.noWhitespaceValidator,
        ],
      ],
      NewPass: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          this.noWhitespaceValidator,
        ],
      ],
      ReEnterPass: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          this.noWhitespaceValidator,
        ],
      ],
    },
      {
        validator: this.ConfirmedValidator('NewPass', 'ReEnterPass'),
      })
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get changePassFormControl() {
    return this.ChangePassForm.controls
  }

  onSubmit() {
    this.Submitted = true
    //form data post
    if (this.ChangePassForm.invalid)
      return;
    else {
      this.changePasswordData.Email = localStorage.getItem('Email');
      this.changePasswordData.OldPassword = this.ChangePassForm.controls['OldPass'].value;
      this.changePasswordData.NewPassword = this.ChangePassForm.controls['NewPass'].value;
      this.userService.ChangePassword(this.changePasswordData).subscribe(
        (Response: any) => {
          if (Response.StatusType == constant.IsSuccess) {
            this.commonFunctions.openSnackBar(Response.Message);
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.commonFunctions.openSnackBar(Response.Message);
          }
        },
        (err) => {
          this.router.navigate(['/auth/login'])
          this.commonFunctions.openSnackBar(constant.CommonErrorMessage);
        }
      )
    }
  }

}
