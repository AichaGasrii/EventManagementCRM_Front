import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthServiceService } from 'src/app/services/User/auth/auth-service.service';
import { Venue } from 'src/app/Model/Venue';
import { VenueOrgService } from 'src/app/services/organizerService/venueServiceOrg/venue-org.service';

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']
})
export class AddVenueComponent implements OnInit {

  venue: Venue = new Venue();
  selectedFile: File | null = null;

  constructor(
    private venueService: VenueOrgService,
    private login: AuthServiceService,
    private router: Router
  ) {
    // Assuming userName is available in AuthService and setting it in venue model
    this.venue.userName = this.login.getMember().userName;
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.selectedFile) {
      this.venueService.addVenueToDB(this.venue, this.selectedFile).subscribe(
        response => {
          Swal.fire('Success', 'Venue added successfully!', 'success');
          this.router.navigate(['/organizer/manageVenue']);
          form.reset();
        },
        error => {
          console.error('Error adding venue', error);
          Swal.fire('Error', 'Failed to add venue.', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Please fill all the fields correctly.', 'error');
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}
