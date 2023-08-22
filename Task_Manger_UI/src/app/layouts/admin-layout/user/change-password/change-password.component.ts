import { Component, Inject, OnInit,OnDestroy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import * as Constant from 'src/app/shared/common-constants'
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  AuthToken: any;
  ChangePassForm : FormGroup = new FormGroup({
    OldPass: new FormControl(''),
    NewPass: new FormControl(''),
    ReEnterPass: new FormControl(''),
  })
  public noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g)
    return isSpace ? { whitespace: true } : null
  }
  Submitted = false
  constructor(
     //@Inject(App_Config) private Config: AppConfig,
  private Router: Router,
  private Route: ActivatedRoute,
  private FormBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    
    this.ChangePassForm = this.FormBuilder.group({
   
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
    })
  }
  get FormControl() {
    return this.ChangePassForm.controls
  }
  onSubmit() {
  }

}
