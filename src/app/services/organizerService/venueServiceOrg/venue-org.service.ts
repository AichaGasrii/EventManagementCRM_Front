import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venue } from 'src/app/Model/Venue';

@Injectable({
  providedIn: 'root'
})
export class VenueOrgService {
  private baseUrl = 'http://localhost:8083/gestionEvent'; 


  constructor(private http: HttpClient) { }

  // Add new venue to database
  public addVenueToDB(venue: Venue, imageFile: File): Observable<Venue> {
    const formData: FormData = new FormData();
    formData.append('venueName', venue.venueName);
    formData.append('venuePlace', venue.venuePlace);
    formData.append('venueContact', venue.venueContact);
    formData.append('userName', venue.userName); // Assuming userName is a property of the Venue model
    formData.append('image', imageFile, imageFile.name);

    return this.http.post<Venue>(`${this.baseUrl}/venue/add`, formData);
  }

  // Other methods remain unchanged...
  public deleteVenue(venueId: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/venue/deleteVenue/${venueId}`);
  }

  public getVenue(venueId: any): Observable<Venue> {
    return this.http.get<Venue>(`${this.baseUrl}/venue/getVenue/${venueId}`);
  }

  public updateVenue(venue: Venue, imageFile: File | null): Observable<Venue> {
    const formData: FormData = new FormData();
    formData.append('venueId', venue.venueId.toString());
    formData.append('venueName', venue.venueName);
    formData.append('venuePlace', venue.venuePlace);
    formData.append('venueContact', venue.venueContact);
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }
    console.log('Form Data: ', formData);
  
    return this.http.put<Venue>(`${this.baseUrl}/venue/updateVenue`, formData);
  }

  public getAllVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${this.baseUrl}/venue/getVenues`);
  }

  public checkActiveBooking(venueId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/booking/checkActiveBookings/${venueId}`);
  }
}
