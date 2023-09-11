import { Component, Inject, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import * as constant from 'src/app/shared/common-constants'
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms'
import { UserService } from '../services/user.service';
import { CommonFunctions } from 'src/app/shared/functions/common.functions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotForm: FormGroup = new FormGroup({
    Email: new FormControl(''),
  })
  public noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g)
    return isSpace ? { whitespace: true } : null
  }
  Submitted = false
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private commonFunctions: CommonFunctions
  ) { }

  ngOnInit(): void {
    this.ForgotForm = this.formBuilder.group({
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],

    })
  }
  get FormControl() {
    return this.ForgotForm.controls
  }
  onSubmit() {
    this.Submitted = true;
    if (this.ForgotForm.invalid) {
      return;
    } else {
      var email = this.ForgotForm.controls['Email'].value;
      this.userService.ForgotPassword(email).subscribe(
        (response: any) => {
          if (response.StatusType == constant.IsSuccess) {
            this.commonFunctions.openSnackBar(response.Message)
            this.router.navigate(['/auth/login']);
          } else {
            this.commonFunctions.openSnackBar(response.Message);
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
