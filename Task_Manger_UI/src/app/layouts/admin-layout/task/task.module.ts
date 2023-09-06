import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskOperationComponent } from './task-operation/task-operation.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskOperationComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }
