import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from '../User/auth/auth-service.service';
import { Venue } from 'src/app/Model/Venue';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  private baseUrl = 'http://localhost:8083/gestionEvent'; 

  orgID :any;
  venueList:any;
  constructor(private login:AuthServiceService ,private http: HttpClient) {
    
    }

    // Get all venues by organizer ID
  public getVenuesByOrganizerId(userName: string): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${this.baseUrl}/venue/organizer/${userName}`);
  }

      //get List of venues 
      getVenueList(){return this.venueList};
     public  getFutureBookingsByOrgId(userName: any){
        return this.http.get(`${this.baseUrl}/booking/upcomingBookings/${userName}`);
      }

      // List of Past Bookings
      public  getPastBookingsByOrgId(userName: any){
          return this.http.get(`${this.baseUrl}/booking/previousBookings/${userName}`);
        }

        // Get Notifications
        public getNotifications(userName: string): Observable<Notification[]> {
          return this.http.get<Notification[]>(`${this.baseUrl}/notification/getNotification/${userName}`)
        }
};

  