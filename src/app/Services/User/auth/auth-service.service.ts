import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { Role, User } from './model';




interface DecodedToken {
  sub: string;
  role: string[]; // or string if the role is not an array
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = 'http://localhost:8083/auth'; 
  private jwtToken!: string; // Store the JWT token here
  public currentUser: Observable<User> | undefined;
  private currentUserSubject!: BehaviorSubject<User>;


 /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<User>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  public clear() {
    localStorage.clear();
  }


 
  login(credentials: { userName: string; userPassword: string }): Observable<any> {
    console.log(credentials);
  
    return this.http.post(`${this.baseUrl}/authenticate`, credentials)
      .pipe(
        tap((response: any) => {
          // Store the JWT token
          this.jwtToken = response.jwtToken;
          localStorage.setItem('jwtToken', response.jwtToken);
  
          // Access the user role directly from the response
          const userRole = response.user.role[0].roleName; // Adjust this based on the actual structure of your response
          console.log('User Role:', userRole);
  
          // Store the user role in local storage
          localStorage.setItem('userRole', userRole);
  
          // Store the user information in local storage
          // Ensure you pick the correct properties from the response
          const userInfo: User = {
            userName: response.user.userName, // Adjust these property names
            userFirstName: response.user.userFirstName, // Adjust these property names
            userLastName: response.user.userLastName, // Adjust these property names
            userPassword: response.user.userPassword, // Adjust these property names
            facebook: response.user.facebook, // Adjust these property names
            linkedIn: response.user.linkedIn, // Adjust these property names
            siteWeb: response.user.siteWeb, // Adjust these property names
            aboutMe: response.user.aboutMe, // Adjust these property names
            image: response.user.image, // Adjust these property names
            location: response.user.location, // Adjust these property names
            Domaines: response.user.Domaines,
            userEmail: response.user.userEmail, // Adjust these property names
            role: response.user.role, // Adjust this based on the actual structure of your response
            roleDemander: response.user.roleDemander
          };
       

        
          localStorage.setItem('user', JSON.stringify(userInfo));


  
          // If you have a User object and want to set its role, you can do so
          const user: User = new User();
          user.role = response.user.role; // Adjust this based on the actual structure of your response
          // ... set other user properties ...
  
          // If you have a BehaviorSubject for the current user, you can update it
          this.currentUserSubject.next(user);
        }),
        catchError((error) => {
          throw error;
        })
      );
  }
  
  
  

  checkEmail(email: string): Observable<any> {
    const url = `${this.baseUrl}/checkEmail`;
    const payload = { email: email };
    return this.http.post<any>(url, payload);
  }

  resetPassword(email: string, code: string, password: string): Observable<any> {
    const data = {
      email: email,
      code: code,
      password: password
    };
    return this.http.post(`${this.baseUrl}/resetPassword`, data);
  }

  // Add methods to retrieve and use the JWT token in your application as needed
  getJwtToken(): string {
    return this.jwtToken;
  }




 



  public setRoles(roles: Role[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }
  

  
  private getToken(): string {
    return localStorage.getItem('jwtToken') || '';
}




  

  addRoleToUser(roleName: string, userName: string): Observable<any> {
    console.log(this.getToken());
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()  // replace this.getToken() with your token retrieval logic
    });

    return this.http.put(`${this.baseUrl}/addRole/${roleName}/${userName}`, {}, { headers: headers });
  }
  
  
}