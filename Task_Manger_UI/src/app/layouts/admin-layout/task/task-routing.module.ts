import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskOperationComponent } from './task-operation/task-operation.component';


const routes: Routes = [
  { path: 'taskList',   component: TaskListComponent },
  { path: 'taskOperation/add',   component: TaskOperationComponent },
  { path: 'taskOperation/edit/:id',   component: TaskOperationComponent },
  { path: 'taskOperation/view/:id',   component: TaskOperationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
