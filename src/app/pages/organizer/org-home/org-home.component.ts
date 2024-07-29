import { HistoryService } from 'src/app/services/userService/history.service';
import { OrganizerService } from 'src/app/services/organizerService/organizer.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/User/auth/model';
import { Venue } from 'src/app/Model/Venue';
import { Notification as CustomNotification } from 'src/app/Model/Notification'; // Alias to avoid conflict

@Component({
  selector: 'app-org-home',
  templateUrl: './org-home.component.html',
  styleUrls: ['./org-home.component.css']
})
export class OrgHomeComponent implements OnInit {

  venues:any;
  numVenue:any;
  UpBookings:any;
  numUpBookings:any;
  notifications: CustomNotification[] = []; 
  numNoti:any;
  pastBookings:any;
  numPast:any;
  user!: User;
  constructor(private orgService:OrganizerService,
              private historyService:HistoryService) { }

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

          // Number of Upcoming Bookings
          if (this.user && this.user.userName) {
          this.orgService.getFutureBookingsByOrgId(this.user.userName).subscribe(
            (data)=>{
              this.UpBookings = data;
              this.numUpBookings = this.UpBookings.length;


              // Number of Past Bookings
              
             this.orgService.getPastBookingsByOrgId(this.user.userName).subscribe(
              (data)=>{
               this.pastBookings = data;
               this.numPast = this.pastBookings.length;
              },
             (error)=>{
               console.log(error);
               }
              );
             
            },
            (error)=>{
              console.log(error);
            }
          );
        }
      // Number of Venues 
            if (this.user && this.user.userName) {
            this.orgService.getVenuesByOrganizerId(this.user.userName).subscribe(
              (venues: Venue[]) => {
                this.venues = venues;
                this.numVenue = this.venues.length;
              },
              (error) => {
                console.log(error);
              }
            );
          }
         }
}

}

