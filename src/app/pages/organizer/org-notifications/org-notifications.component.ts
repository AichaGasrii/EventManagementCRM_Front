import { Component, OnInit } from '@angular/core';
import { Notification as CustomNotification } from 'src/app/Model/Notification';
import { User } from 'src/app/services/User/auth/model';
import { HistoryService } from 'src/app/services/userService/history.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-org-notifications',
  templateUrl: './org-notifications.component.html',
  styleUrls: ['./org-notifications.component.css']
})
export class OrgNotificationsComponent implements OnInit {
  notifications: CustomNotification[] = [];
  user!: User;

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    // Get user object from local storage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
      if (this.user && this.user.userName) {
        this.getNotifications(this.user.userName);
      } else {
        console.log('User name not found in user object');
      }
    } else {
      console.log('User object not found in local storage');
    }
  }

  public deleteNoti(notificationId: any) {
    this.historyService.deleteNoti(notificationId).subscribe(
      (data) => {
        this.notifications = this.notifications.filter((notification: any) => notification.notificationId != notificationId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getNotifications(userName: string): void {
    this.historyService.getNotifications(userName).subscribe(
      (notifications: CustomNotification[]) => {
        this.notifications = notifications.map((notification: CustomNotification) => ({
          ...notification,
          checked: notification.checked === true // Ensure checked is correctly mapped
        }));
      },
      (error) => {
        Swal.fire('Error', 'Problem in loading Notifications', 'error');
      }
    );
  }

  updateNotificationCheckedStatus(notification: CustomNotification): void {
    // Toggle local checked status
    notification.checked = !notification.checked;

    // Send update request to backend
    this.historyService.updateNotificationCheckedStatus(notification).subscribe(
      () => {
        console.log('Notification status updated successfully');
      },
      (error) => {
        console.error('Error updating notification status:', error);
        // Revert local checked status if update fails
        notification.checked = !notification.checked;
      }
    );
  }
}
