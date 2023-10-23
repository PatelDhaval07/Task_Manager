import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Inject, LOCALE_ID, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

//import {
//  endOfDay,
//  addMonths
//} from 'date-fns';
//import {
//  DAYS_IN_WEEK,
//  SchedulerViewDay,
//  SchedulerViewHour,
//  SchedulerViewHourSegment,
//  CalendarSchedulerEvent,
//  CalendarSchedulerEventAction,
//  startOfPeriod,
//  endOfPeriod,
//  addPeriod,
//  subPeriod,
//  SchedulerDateFormatter,
//  SchedulerEventTimesChangedEvent
//} from 'angular-calendar-scheduler';
//import {
//  CalendarView,
//  CalendarDateFormatter,
//  DateAdapter
//} from 'angular-calendar';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendartasks',
  templateUrl: './calendartasks.component.html',
  styleUrls: ['./calendartasks.component.scss'],
})

export class CalendartasksComponent implements OnInit {

  title = 'Angular Calendar Scheduler Demo';
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      /*right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"*/
      right: "dayGridMonth"
    },
    editable: true,
    droppable: true,
    plugins: [dayGridPlugin, interactionPlugin],
    events: [
      { title: 'event 1', date: '2023-10-01', color: 'red' },
      { title: 'event 2', date: '2023-10-05', color: 'red' }
    ],
  };
  eventsPromise: Promise<EventSourceInput>;


  constructor() {
  }

  ngOnInit(): void {
  }

}
