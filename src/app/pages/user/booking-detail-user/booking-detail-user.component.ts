import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminBookingServiceService } from 'src/app/services/adminService/adminBookingService/admin-booking-service.service';
import { EventOrgService } from '../../../services/organizerService/eventServiceOrg/event-org.service';
import { Task } from '../../../Model/Task';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-detail-user',
  templateUrl: './booking-detail-user.component.html',
  styleUrls: ['./booking-detail-user.component.css']
})
export class BookingDetailUserComponent implements OnInit {

  bookingId: any;
  booking: any;
  showPayButton: any;
  todayDate: any;
  tasks: Task[] = [];
  taskProgressPercentage: number = 0;

  constructor(
    private _route: ActivatedRoute,
    private bookingService: AdminBookingServiceService,
    private taskService: EventOrgService // Inject the Task Service
  ) {}

  ngOnInit(): void {
    this.bookingId = this._route.snapshot.params.bookingId;

    this.bookingService.bookingDetail(this.bookingId).subscribe(
      (data) => {
        this.booking = data;
        this.showPayButton = 1;

        this.calculateTodayDate();
        this.checkPaymentButton();

        // Fetch tasks here
        this.fetchTasks();
      },
      (error) => {
        Swal.fire("Error", "There is an error while loading Booking Detail", "error");
      }
    );
  }

  calculateTodayDate() {
    const date = new Date();
    const toDate: any = date.getDate();
    const month: any = date.getMonth() + 1;
    const year = date.getFullYear();
    this.todayDate = `${year}-${month < 10 ? '0' : ''}${month}-${toDate < 10 ? '0' : ''}${toDate}`;
  }

  checkPaymentButton() {
    if (this.todayDate > this.booking.date) {
      this.showPayButton = 0;
    }
  }

  fetchTasks() {
    this.taskService.getTasksByBookingId(this.bookingId).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.calculateProgress();
    });
  }

  calculateProgress() {
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter(task => task.status === 'completed').length;
    const inProgressTasks = this.tasks.filter(task => task.status === 'inprogress').length;

    // Calculate progress percentage
    this.taskProgressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  }
}
