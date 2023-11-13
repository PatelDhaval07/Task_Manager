import { Component, OnInit, LOCALE_ID, ChangeDetectorRef } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventSourceInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TaskService } from 'src/app/shared/services/task.service';
import * as constant from 'src/app/shared/common-constants';

@Component({
  selector: 'app-calendartasks',
  templateUrl: './calendartasks.component.html',
  styleUrls: ['./calendartasks.component.scss'],
})

export class CalendartasksComponent implements OnInit {

  calendarEvents: any = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: "prev,next today",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
      //right: "dayGridMonth"
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    plugins: [dayGridPlugin, interactionPlugin],
    events: [
      { title: 'event 1', date: '2023-10-01', color: 'red' },
      { title: 'event 2', date: '2023-10-05', color: 'red' }
    ],
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

  }

}
