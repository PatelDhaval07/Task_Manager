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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotForm : FormGroup = new FormGroup({
    Email: new FormControl(''),
  })
  public noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g)
    return isSpace ? { whitespace: true } : null
  }
  Submitted = false
  constructor(
    private Router: Router,
    private Route: ActivatedRoute,
    private FormBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.ForgotForm = this.FormBuilder.group({
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
  }
}
