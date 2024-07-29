import { VenueUserService } from './../../../services/userService/venuesUser/venue-user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venue-detail-user',
  templateUrl: './venue-detail-user.component.html',
  styleUrls: ['./venue-detail-user.component.css']
})
export class VenueDetailUserComponent implements OnInit {

  venue:any;
  venueId=0;
  selectedFile: File | null = null;

  constructor(private route:ActivatedRoute,
    private venueUserservice:VenueUserService) { }

  ngOnInit(): void {
    this.venueId = this.route.snapshot.params.venueId;
    this.venueUserservice.getVenue(this.venueId).subscribe(
      (venue)=>{
        this.venue = venue;
      },
      (error)=>{
        console.log(error);
      }
    )

     

  }

    // Extracts the filename from a given file path.
    getImageFileName(path: string): string {
      const pathParts = path.split('/');
      const fileName = pathParts[pathParts.length - 1];
      return fileName;
    }

}
