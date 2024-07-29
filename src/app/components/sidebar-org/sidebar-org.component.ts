import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/User/auth/model';

@Component({
  selector: 'app-sidebar-org',
  templateUrl: './sidebar-org.component.html',
  styleUrls: ['./sidebar-org.component.css']
})
export class SidebarOrgComponent implements OnInit {

  constructor(private router: Router) {}
  
  user!: User;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');    
    }

    logout() {
      // Implement your logout logic here, like clearing localStorage and navigating to login page
      localStorage.clear();
      window.location.reload(); // or navigate to login page
    }

  

    isActive(route: string): boolean {
      return this.router.url === route;
    }
  
    setActive(route: string): void {
      // Optionally, you can add logic here to handle additional tasks when a page is clicked.
      // For example, closing the sidebar menu on mobile devices.
    }

}
