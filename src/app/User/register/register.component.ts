import { Component } from '@angular/core';
import { UserService } from '../../Services/User/user.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: any = {}; 
  siteKey: string = '6LeTUGQoAAAAAJ2-8XWWWkPMzneUkWOrLRmNwPch';
  captchaResponse!: string;
  
  
  constructor(private userService: UserService, private router: Router) {}
  
  ngOnInit(): void {
    const userId = this.getUserIdFromToken();
    console.log('User id:', userId);  }
  storageUserAsStr: any = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') || '{}') : null

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  registerUser() {
   
    this.userService.register(this.user).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        window.alert('Registration successful! You will be redirected to the login page. Please check your email to activate your account ');
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('Registration error:', error);
        window.alert('Registration failed. Please try again.');
      }
    );
  }
  

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = window.atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);
      return parsedPayload.sub;
    }
    return null;
  }


  getRoleFromToken(): string | null {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = window.atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);
      const resourceAccess = parsedPayload.resource_access;
      if (resourceAccess && resourceAccess['products-app']) {
        const roles = resourceAccess['products-app'].roles;
        if (roles.includes('admin')) {
          return 'admin';
        } else if (roles.includes('user')) {
          return 'user';
        }
      }
    }
    return null;
  }
  

}
