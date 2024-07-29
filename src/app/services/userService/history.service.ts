import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from '../User/auth/auth-service.service';
import { Observable } from 'rxjs';
import { Notification as CustomNotification } from 'src/app/Model/Notification';
import { DateRange } from 'src/app/Model/DateRange';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private baseUrl = 'http://localhost:8083/gestionEvent';

  constructor(private login: AuthServiceService, private http: HttpClient) { }

  // Get Booking By User Id
  public getBookingByUserId(userName: any) {
    return this.http.get(`${this.baseUrl}/booking/bookingsByUserId/${userName}`);
  }

  // Make Payment
 /* public doPayment(bookingId: any) {
    return this.http.get(`${this.baseUrl}/booking/doPayment/${bookingId}`);
  }
*/
  // // Get Booked Dates
  // public getDates(venueId: any) {
  //   return this.http.get(`${this.baseUrl}/booking/getDates/${venueId}`);
  // }

  getDates(venueId: string): Observable<DateRange[]> {
    return this.http.get<DateRange[]>(`${this.baseUrl}/booking/getDates/${venueId}`);
  }

  // Get Notifications
  public getNotifications(userName: string): Observable<CustomNotification[]> {
    return this.http.get<CustomNotification[]>(`${this.baseUrl}/notification/getNotification/${userName}`);
  }

  // Update Notification Checked Status
  public updateNotificationCheckedStatus(notification: CustomNotification): Observable<any> {
    return this.http.put(`${this.baseUrl}/notification/updateNotificationCheckedStatus`, notification, { responseType: 'text' });
  }

  // Cancel Booking
  public cancelBooking(bookingId: any) {
    return this.http.delete(`${this.baseUrl}/booking/deleteBooking/${bookingId}`);
  }

  // Delete Notifications
  public deleteNoti(notiId: any) {
    return this.http.delete(`${this.baseUrl}/notification/deleteNotification/${notiId}`);
  }

  doPayment(bookingId: number, token: string, amount: number) {
    return this.http.post(`${this.baseUrl}/payment/charge`, { bookingId, token, amount });
  }


}
