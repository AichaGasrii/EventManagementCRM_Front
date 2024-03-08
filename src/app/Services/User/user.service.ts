import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8083'; 
 

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/registerNewUser`, user);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/auth/${username}`);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/auth/users`);
  }

  updateUser(username: string, userDetails: User): Observable<User> {
    const url = `${this.baseUrl}/auth/updateUser/${username}`;
    return this.http.put<User>(url, userDetails, this.httpOptions);
  }

  updateUserImage(username: string, userDetails: User, imageFile?: File): Observable<User> {
    const formData: FormData = new FormData();

    formData.append('userName', username);
    formData.append('userFirstName', userDetails.userFirstName);
    formData.append('userLastName', userDetails.userLastName);
    if (imageFile) {
        formData.append('image', imageFile, imageFile.name);
    }
    formData.append('siteWeb', userDetails.siteWeb);
    formData.append('facebook', userDetails.facebook);
    formData.append('linkedIn', userDetails.linkedIn);
    formData.append('aboutMe', userDetails.aboutMe);
    formData.append('location', userDetails.location);

    const url = `http://localhost:8083/auth/user/updateAvecImage/${username}`;
    return this.http.put<User>(url, formData); // You don't need httpOptions as we're sending FormData now.
}


}

export interface User {
  userName: string;
  userFirstName: string;
  userLastName: string;
  userPassword: string;
  facebook: string;
  linkedIn: string;
  siteWeb: string;
  aboutMe: string;
  image: string;
  location: string;
  Domaines: string;
  userEmail:string;
  roleDemander: string;
}