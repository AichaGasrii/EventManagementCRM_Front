import { VenueUserService } from './../../../services/userService/venuesUser/venue-user.service';
import { Component, OnInit } from '@angular/core';
import { Venue } from 'src/app/Model/Venue';
import { User } from 'src/app/services/User/auth/model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-venues',
  templateUrl: './view-venues.component.html',
  styleUrls: ['./view-venues.component.css']
})
export class ViewVenuesComponent implements OnInit {
  venues: Venue[] = []; // Adjusted to Venue array
  user!: User; // Assuming the user object contains the userName property
 
  constructor(private venueUserService: VenueUserService) { }

  ngOnInit(): void {
    this.venueUserService.getAllVenues().subscribe(
      (venues: Venue[]) => {
        // Sort venues by venueId in descending order
        this.venues = venues.sort((a, b) => b.venueId - a.venueId);      },
      (error) => {
        Swal.fire("Error", "Problem in loading Venues", "error");
      }
    );
  }

  // Extracts the filename from a given file path.
  getImageFileName(path: string): string {
    const pathParts = path.split('/');
    const fileName = pathParts[pathParts.length - 1];
    return fileName;
  }
}
