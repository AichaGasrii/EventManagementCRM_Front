import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { Task } from 'src/app/Model/Task';

@Injectable({
  providedIn: 'root'
})
export class EventOrgService {
  private baseUrl = 'http://localhost:8083/gestionEvent';
  constructor(private _http:HttpClient) { }

  //get events by venue Id
  public getEventsByVenueId(venueId:any){
    return this._http.get(`${this.baseUrl}/event/getEvents/${venueId}`);
  }
     //Add new Event to database
  public addNewEvent(event:any){
   return this._http.post(`${this.baseUrl}/event/add`,event);
}

//Delete Event
public deleteEvent(eventId:any){
  return this._http.delete(`${this.baseUrl}/event/deleteEvent/${eventId}`);
 }


 //get the sigle Event
public getEvent(eventId: any){
  return this._http.get(`${this.baseUrl}/event/getEvent/${eventId}`);
}

//update Event
public updateEvent(event:any){
  return this._http.put(`${this.baseUrl}/event/updateEvent`,event);
}

  getTasksByBookingId(bookingId: number): Observable<Task[]> {
    return this._http.get<Task[]>(`${this.baseUrl}/task/booking/${bookingId}`);
  }
  private baseUrlv = 'http://localhost:8083/gestionEvent/task/booking';

  createTask(task: Task,bookingId: number): Observable<Task> {
    return this._http.post<Task>(`${this.baseUrlv}/${bookingId}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this._http.delete<void>(`${this.baseUrl}/task/${id}`);
  }
  updateTask(task: Task): Observable<void> {
    return this._http.put<void>(`${this.baseUrl}/task/${task.id}`, task);
  }
}
