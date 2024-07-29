import { OrganizerService } from './../../../services/organizerService/organizer.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/User/auth/model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-future-booking',
  templateUrl: './future-booking.component.html',
  styleUrls: ['./future-booking.component.css']
})
export class FutureBookingComponent implements OnInit {
  bookings:any;
  user!: User;

  constructor(private orgService : OrganizerService) { }


  ngOnInit(): void {

    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);}

    // All Upcoming Bookings
    this.orgService.getFutureBookingsByOrgId(this.user.userName).subscribe(
      (data)=>{
        this.bookings = data;
      },
      (error)=>{
        Swal.fire("Error","Error in Loading Booking Data","error");
      }
    )

  }

}
