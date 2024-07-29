import { HistoryService } from 'src/app/services/userService/history.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from 'src/app/services/User/auth/model';

@Component({
  selector: 'app-booking-history-user',
  templateUrl: './booking-history-user.component.html',
  styleUrls: ['./booking-history-user.component.css']
})
export class BookingHistoryUserComponent implements OnInit {

  bookings: any;
  todayDate: any;
  user!: User; // Assuming the user object contains the userName property

  constructor(private historyService: HistoryService) { }

  showCancelButton: any;

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
    this.showCancelButton = 1;

    var date = new Date();
    var toDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    if (toDate < 10) { toDate = '0' + toDate; }
    if (month < 10) { month = '0' + month; }
    var year = date.getFullYear();
    this.todayDate = year + "-" + month + "-" + toDate;

    this.historyService.getBookingByUserId(this.user.userName).subscribe(
      (data) => {
        this.bookings = data;
        this.sortBookingsByDate(); // Sort bookings by date
      },
      (error) => {
        Swal.fire("Error", "Error in Loading Booking Data", "error");
      }
    );
  }

  sortBookingsByDate(): void {
    this.bookings.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  cancelBooking(bookingId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Yes, Cancel',
      showCancelButton: true
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.historyService.cancelBooking(bookingId).subscribe(
            (data) => {
              this.bookings = this.bookings.filter((booking: any) => booking.bookingId != bookingId);
            }, (error) => {
              console.log(error)
            }
          );
        }
      });
  }
}
