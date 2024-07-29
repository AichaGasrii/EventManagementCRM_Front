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
 
  getUsersByRoleUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/auth/byRoleName/User`);
  }

  getUsersByRoleOrganiser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/auth/byRoleName/Organiser`);
  }
  
  ///List of Users
public getAllUsers(): Observable<User[]>{
  return this.http.get<User[]>(`${this.baseUrl}/auth/getAllUsers`);
}

///List of Organizers
public getAllOrganizers(): Observable<User[]>{
  return this.http.get<User[]>(`${this.baseUrl}/auth/getAllOrganizers`);

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
    formData.append('number', userDetails.userNumber);
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }
    formData.append('domaines', userDetails.domaines);
    formData.append('siteWeb', userDetails.siteWeb);
    formData.append('aboutMe', userDetails.aboutMe);
    formData.append('location', userDetails.location);

    const url = `${this.baseUrl}/auth/user/updateAvecImage/${username}`;
    return this.http.put<User>(url, formData);
  }
}

export interface User {
  userName: string;
  userFirstName: string;
  userLastName: string;
  userPassword: string;
  siteWeb: string;
  aboutMe: string;
  image: string;
  location: string;
  domaines: string;
  userEmail:string;
  userNumber:string;
  role: Role[];
}

export interface Role {
  roleName: string;
  roleDescription: string;
}