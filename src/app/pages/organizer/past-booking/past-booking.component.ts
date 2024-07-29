import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/User/auth/model';
import { OrganizerService } from 'src/app/services/organizerService/organizer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-past-booking',
  templateUrl: './past-booking.component.html',
  styleUrls: ['./past-booking.component.css']
})
export class PastBookingComponent implements OnInit {
  user!: User;

  bookings:any;
  constructor(private orgService : OrganizerService) { }

  // Past Booking
  ngOnInit(): void {
    
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);}

    this.orgService.getPastBookingsByOrgId(this.user.userName).subscribe(
      (data)=>{
        this.bookings = data;
      },
      (error)=>{
        Swal.fire("Error","Error in Loading Booking Data","error");
      }
    )
  }

}
