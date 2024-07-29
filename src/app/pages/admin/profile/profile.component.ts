import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User/user.service';
import { User } from 'src/app/services/User/auth/model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

    // Extracts the filename from a given file path.
    getImageFileName(path: string): string {
      const pathParts = path.split('/');
      const fileName = pathParts[pathParts.length - 1];
      return fileName;
    }
}
