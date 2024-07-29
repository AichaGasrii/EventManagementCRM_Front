import { VenueOrgService } from './../../../services/organizerService/venueServiceOrg/venue-org.service';
import { OrganizerService } from './../../../services/organizerService/organizer.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Venue } from 'src/app/Model/Venue';
import { User } from 'src/app/services/User/auth/model';

@Component({
  selector: 'app-manage-venue',
  templateUrl: './manage-venue.component.html',
  styleUrls: ['./manage-venue.component.css']
})

export class ManageVenueComponent implements OnInit {

  venues: Venue[] = []; // Assuming Venue model is imported
  user!: User; // Assuming the user object contains the userName property
  constructor(private orgService: OrganizerService,private venueService:VenueOrgService) { }

  ngOnInit(): void {
    // Get user object from local storage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
      if (this.user && this.user.userName) {
        this.getVenuesByOrganizerId(this.user.userName);
      } else {
        console.log('User name not found in user object');
      }
    } else {
      console.log('User object not found in local storage');
    }
  }

  // Fetch all venues by organizer ID
  getVenuesByOrganizerId(userName: string): void {
    this.orgService.getVenuesByOrganizerId(userName).subscribe(
      (venues: Venue[]) => {
        // Sort venues by venueId in descending order
        this.venues = venues.sort((a, b) => b.venueId - a.venueId); 
        console.log(venues);
      },
      (error) => {
        Swal.fire("Error", "Problem in loading Venues", "error");
        console.log(error);
      }
    );
  }

    // Extracts the filename from a given file path.
    getImageFileName(path: string): string {
      const pathParts = path.split('/');
      const fileName = pathParts[pathParts.length - 1];
      return fileName;
    }

  checkAct:any;
  // delete venue..
  deleteVenue(venueId:any){
    this.venueService.checkActiveBooking(venueId).subscribe(
      (data)=>{
        this.checkAct = data;
        if(this.checkAct == 1 ){
          Swal.fire("You can not Delete this venue when there is an Active Booking")
        }else if(this.checkAct == 0){

          Swal.fire({icon:'info',
          title:'All your data, related to this venue such as events, equipments will also get delet. Do you want to Proceed ??',
          confirmButtonText:'Yes, Delete',
          showCancelButton:true}).then(
            (result)=>{
              if (result.isConfirmed){
          
                this.venueService.deleteVenue(venueId).subscribe(
                  (data)=>{
                    this.venues = this.venues.filter((venue:any)=>venue.venueId!=venueId);
                    Swal.fire("Success","Venue Deleted","success");
                  },(error)=>{
                    Swal.fire("Error","Error in deleting Venue","error");
                  }
                )
              }})

        }

      },
      (error:any)=>{console.log(error)}
    )

    Swal.fire({icon:'info',
    title:'Are you sure ?',
    confirmButtonText:'Delete',
    showCancelButton:true}).then(
      (result)=>{
        if (result.isConfirmed){
          
          this.venueService.deleteVenue(venueId).subscribe(
            (data)=>{
              this.venues = this.venues.filter((venue:any)=>venue.venueId!=venueId);
              Swal.fire("Success","Venue Deleted","success");
            },(error)=>{
              Swal.fire("Error","Error in deleting Venue","error");
            }
          )
        }})
  }

}
