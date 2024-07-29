import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venue } from 'src/app/Model/Venue';

@Injectable({
  providedIn: 'root'
})
export class VenueUserService {
  private baseUrl = 'http://localhost:8083/gestionEvent';

  constructor(private _http:HttpClient) { }

  public getAllVenues(): Observable<Venue[]> {
    return this._http.get<Venue[]>(`${this.baseUrl}/venue/getVenues`);
  }

  //get single venue fron server
  public getVenue(venueId:any){
    return this._http.get(`${this.baseUrl}/venue/getVenue/${venueId}`);
  }

  //get all places
  public getAllPlaces(){
    return this._http.get(`${this.baseUrl}/venue/places`);
  }

  //get venue of selected place
  public getVenueOfPlace(place:any){
    return this._http.get(`${this.baseUrl}/venue/getVenues/${place}`)
  }

  //get event by event name
  public getEventByEventName(eventName : any,venueId:any){
    return this._http.get(`${this.baseUrl}/event/getOne/${eventName}/${venueId}`)
  }



  // Book an event
  public bookEvent(booking: any): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/booking/add`, booking);
  }

  getBookedDates(): Observable<Date[]> {
    return this._http.get<Date[]>(`${this.baseUrl}/booking/bookings/bookedDates`);
  }

}
