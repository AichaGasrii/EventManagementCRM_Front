import { Component } from '@angular/core';
import { User } from 'src/app/services/User/auth/model';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrl: './top-header.component.css'
})
export class TopHeaderComponent {
  isLoggedIn: boolean = false;
  user!: User;

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('jwtToken'); // Adjust this based on how you check for logged-in status
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    
  }

  logout() {
    // Implement your logout logic here, like clearing localStorage and navigating to login page
    localStorage.clear();
    window.location.reload(); // or navigate to login page
  }
}
