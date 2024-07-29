import { VenueUserService } from 'src/app/services/userService/venuesUser/venue-user.service';
import { Notification as CustomNotification } from 'src/app/Model/Notification'; // Alias to avoid conflict
import { HistoryService } from 'src/app/services/userService/history.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/User/auth/model';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  venues:any;
  numVenue:any;
  bookings:any;
  numBookings:any;
  notifications: CustomNotification[] = []; 
  numNoti:any;
  user!: User; // Assuming the user object contains the userName property
  constructor(private historyService :HistoryService,
              private venueUserService:VenueUserService) { }

  ngOnInit(): void {

    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
      if (this.user && this.user.userName) {
        this.historyService.getNotifications(this.user.userName).subscribe(
          (notifications: CustomNotification[]) => {
            this.notifications = notifications;
            this.numNoti = this.notifications.length;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    
    this.historyService.getBookingByUserId(this.user.userName).subscribe(
      (data)=>{
        this.bookings = data;
        this.numBookings = this.bookings.length;
      },
      (error)=>{
        console.log(error);
      }
    );

   

      this.venueUserService.getAllVenues().subscribe(
        (venues)=>{
          this.venues = venues;
          this.numVenue = this.venues.length;
        },
        (error)=>{
          console.log(error);
         
        }
        )
  }

}
}
