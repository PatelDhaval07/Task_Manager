import { Component, OnInit, LOCALE_ID, ChangeDetectorRef } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventSourceInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timegridPlugin from '@fullcalendar/timegrid';
import { TaskService } from 'src/app/shared/services/task.service';
import * as constant from 'src/app/shared/common-constants';

@Component({
  selector: 'app-calendartasks',
  templateUrl: './calendartasks.component.html',
  styleUrls: ['./calendartasks.component.scss'],
})

export class CalendartasksComponent implements OnInit {

  calendarEvents: any = [];
  //title: string = "Dhaval";
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    headerToolbar: {
      center: 'title',
      left: "prev,next today",
      //right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
      //right: "dayGridMonth"
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    plugins: [dayGridPlugin, interactionPlugin, timegridPlugin],
  };
  eventsPromise: Promise<EventSourceInput>;
  authToken: string = '';
  eventGuid = 0;
  calendarVisible = true;

  constructor(private route: ActivatedRoute, private changeDetector: ChangeDetectorRef,
    private router: Router, private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.authToken = this.route.snapshot.paramMap.get('AuthToken');
    if (this.authToken) {
      localStorage.setItem("AuthToken", this.authToken);
      this.router.navigate([constant.TaskList]);
    }

    if (localStorage.getItem("AuthToken")) {
      this.router.navigate([constant.TaskList]);
    }
    else {
      this.router.navigate([constant.FrontLogin]);
    }

    this.retrieveData();
  }

  retrieveData(): void {
    debugger
    this.taskService.GetCalendarTasks(0).subscribe({
      next: (data: any) => {
        for (var i = 0; i < data.Data.CalendarTasks.length; i++) {
          this.calendarEvents.push({
            title: data.Data.CalendarTasks[i].TaskName,
            date: formatDate(data.Data.CalendarTasks[i].DueDate, 'yyyy-MM-dd', 'en-US'),
            color: data.Data.CalendarTasks[i].ColourName,
          });
        }

        this.calendarOptions.events = this.calendarEvents;
      },
      error: (e) => console.error(e),
    })
  }
}
