import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/User/auth/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  

  userEmail: string = '';
  userCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordsDoNotMatch: boolean = false;
  passwordsMatch: boolean = false;
  siteKey: string = '6LeTUGQoAAAAAJ2-8XWWWkPMzneUkWOrLRmNwPch';
  captchaResponse!: string;

  constructor(private authservice: AuthServiceService, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve email from query parameters
    this.route.queryParams.subscribe(params => {
      this.userEmail = params['email'];
    });
  }
  onResetPassword(): void {
    console.log('New Password:', this.newPassword);
    console.log('Confirm Password:', this.confirmPassword);

    // Check if passwords match
    if (this.newPassword !== this.confirmPassword) {
      console.log('Passwords do not match');
      this.passwordsDoNotMatch = true;
      this.passwordsMatch = false;
      return; // Do not proceed further if passwords do not match
    } else {
      console.log('Passwords match');
      this.passwordsDoNotMatch = false;
      this.passwordsMatch = true;
    }

    // If passwords match, proceed with password reset
    this.authservice.resetPassword(this.userEmail, this.userCode, this.newPassword).subscribe(
      response => {
        console.log('Reset Password Response:', response); // Handle the response here
        if (response.result === 1) {
          // Password reset successful
          console.log('Password reset successful');
          window.alert('Password reset successful! You can now log in with your new password.');
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        } else {
          // Password reset failed
          console.log('Password reset failed');
          window.alert('Password reset failed. Please try again.');
        }
      },
      error => {
        console.error('There was an error during the request', error);
        window.alert('Error occurred while resetting password. Please try again.');
      }
    );
  }
}