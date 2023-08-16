import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task';
//import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  taskData?: Task[]

  constructor(
  //  private taskService: TaskService
    ) { }

  ngOnInit(): void {
    this.retrieveData()
  }
  retrieveData(): void {
    // this.taskService.TaskList().subscribe({
    //   next: (data: any) => {
    //     this.userData = data.data
    //   },
    //   error: (e) => console.error(e),
    // })
  }
  refreshList(): void {
    this.retrieveData()
  }
}
