import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminBookingServiceService {
  private baseUrl = 'http://localhost:8083/gestionEvent';
  constructor(private http: HttpClient) { }

  // List of All Bookings
 public getAllBookings(){
  return this.http.get(`${this.baseUrl}/booking/getAllBookings`);
 }

 // Single Booking Detail
  public bookingDetail(bookingId:any){
    return this.http.get(`${this.baseUrl}/booking/bookingDetail/${bookingId}`);
}

}
