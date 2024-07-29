import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthServiceService } from 'src/app/services/User/auth/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements  OnInit {

  socialUser!: SocialUser;
  userLogged!: SocialUser;
  isLogged!:boolean;
  userName!: string;
  userPassword!: string;
  errorMessage: string | undefined;
  
  
  constructor(
    private authService: AuthServiceService, 
    private router: Router, 
    private socialauthService: SocialAuthService
    ) {  }

    ngOnInit():void {
      this.socialauthService.authState.subscribe(
        data => {
          this.userLogged = data;
          this.isLogged = (this.userLogged != null);
        }
        );
      }

  signInWithGoogle(): void {
    this.socialauthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
            this.socialUser = data;
            this.isLogged = true;
              // Retrieve the user role from local storage
        const userRole = localStorage.getItem('userRole');
  
        if(userRole == "User"){
          this.router.navigate(['user']);
           
        }else if(userRole == "Organiser"){
          this.router.navigate(['organizer']);
          
        }else if(userRole == "Admin"){
          this.router.navigate(['admin']);
        };
          }
        );
      }

  
  // signInWithFB(): void {
  //   this.socialauthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
  //     data => {
  //       this.socialUser = data;
  //       this.isLogged = true;
  //        // Retrieve the user role from local storage
  //        const userRole = localStorage.getItem('userRole');
  
  //        // Navigate based on the user role
  //    if (userRole === 'User' || userRole === 'Entrepreneur') {  
  //      this.router.navigate(['/Dashboard']).then(() => {
  //        window.location.reload();
  //      });
  //    } else if (userRole === 'Admin') {
  //      this.router.navigate(['/Dashboard']).then(() => {
  //        window.location.reload();
  //      });
  //    } else {
  //      console.error('Unexpected user role:', userRole);
  //      window.alert('Unexpected user role. Please contact support.');
  //    }
  //         }
  //       );
  // }

 

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
        if(userRole == "User"){
          this.router.navigate(['user']);
           
        }else if(userRole == "Organiser"){
          this.router.navigate(['organizer']);
          
        }else if(userRole == "Admin"){
          this.router.navigate(['admin']);
        }
         else {
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