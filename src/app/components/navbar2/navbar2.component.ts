import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/User/auth/model';
import Swal from 'sweetalert2';
import { Notification as CustomNotification } from 'src/app/Model/Notification'; // Alias to avoid conflict
import { HistoryService } from 'src/app/services/userService/history.service';


@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {
  isLoggedIn: boolean = false;
  notifications: CustomNotification[] = []; 
  numNoti: number = 0;
  user!: User;

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    // Get user object from local storage
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
    }

    this.isLoggedIn = !!localStorage.getItem('jwtToken'); // Adjust this based on how you check for logged-in status
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getNotifications(userName: string): void {
    this.historyService.getNotifications(userName).subscribe(
      (notifications: CustomNotification[]) => {
        this.notifications = notifications.map((notification: CustomNotification) => ({
          ...notification,
          checked: notification.checked === true // Convert 1 to true and 0 to false
        }));
      },
      (error) => {
        Swal.fire('Error', 'Problem in loading Notifications', 'error');
      }
    );
  }

  logout() {
    // Implement your logout logic here, like clearing localStorage and navigating to login page
    localStorage.clear();
    window.location.reload(); // or navigate to login page
  }
}

