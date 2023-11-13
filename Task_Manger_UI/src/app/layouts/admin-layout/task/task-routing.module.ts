import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskOperationComponent } from './task-operation/task-operation.component';
import { CalendartasksComponent } from './calendartasks/calendartasks.component';


const routes: Routes = [
  { path: 'taskList', component: TaskListComponent },
  { path: 'taskOperation/add', component: TaskOperationComponent },
  { path: 'taskOperation/edit/:id', component: TaskOperationComponent },
  { path: 'taskOperation/view/:id', component: TaskOperationComponent },
  { path: 'calendar', component: CalendartasksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
