import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from '../../auth-layout/services/user.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { changePassword } from '../../../shared/models/changePassword';


@NgModule({
  declarations: [
    UserListComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    NgbModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule
  ],
  providers: [
    UserService,
    changePassword
  ]
})
export class UserModule { }
