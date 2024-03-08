import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/User/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName!: string;
  userPassword!: string;
  errorMessage: string | undefined;
  roleDemanders: string[] = ['Entreprises', 'Représentant','entreprise','Visiteur','Investisseur','Collaborateur','externe','Entrepreneur'];


  
  constructor(private authService: AuthServiceService, private router: Router) {}
  login() {
    const credentials = {
      userName: this.userName,
      userPassword: this.userPassword
    };
  
    this.authService.login(credentials).subscribe(
      (response) => {
        // Successful login
        console.log('Login successful:', response);

        
    
  
        // Retrieve the user role from local storage
        const userRole = localStorage.getItem('userRole');
  
        // Navigate based on the user role
        if (userRole === 'User' || userRole === 'Entreprises' || 
        userRole === 'Représentant' || userRole === 'Visiteur' 
        || userRole === 'entreprise' || userRole === 'Investisseur' 
        || userRole === 'Collaborateur'|| userRole === 'externe' || userRole === 'Entrepreneur') {  
          this.router.navigate(['/Dashboard']).then(() => {
            window.location.reload();
          });
        } else if (userRole === 'Dashboard') {
          this.router.navigate(['/Dashboard']).then(() => {
            window.location.reload();
          });
        } else {
          console.error('Unexpected user role:', userRole);
          window.alert('Unexpected user role. Please contact support.');
        }
      },
      (error) => {
        console.error('Login error:', error);
        window.alert('Login error. Please try again.');
      }
    );
  }
  






}