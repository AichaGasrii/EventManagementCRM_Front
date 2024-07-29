import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from './../../../services/userService/history.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateRange } from 'src/app/Model/DateRange';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {

  venueId: string | null = null;
  dates: DateRange[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    dateClick: this.handleDateClick.bind(this)
  };

  constructor(private historyService: HistoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.venueId = this.route.snapshot.paramMap.get('venueId');
    if (this.venueId) {
      this.historyService.getDates(this.venueId).subscribe(
        (dates: DateRange[]) => {
          this.dates = dates;
          this.initializeCalendar(this.dates);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  initializeCalendar(dates: DateRange[]): void {
    console.log('Booking dates:', dates); // Log the dates to the console
    const events = dates.map(date => ({
      title: 'Booked',
      start: date.start,
      end: date.end
    }));

    this.calendarOptions = {
      ...this.calendarOptions,
      events: events
    };
  }

  handleDateClick(arg: any): void {
    alert('Date clicked: ' + arg.dateStr);
  }
}
