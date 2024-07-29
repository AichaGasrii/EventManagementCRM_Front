import { EquipmentOrgService } from './../../../../services/organizerService/eventServiceOrg/equipment-org.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.css']
})
export class UpdateEquipmentComponent implements OnInit {
  equipmentId = 0;

  equipment: any = {
    equipmentName: null,
    equipmentCost: null,
    venueId: null,
    imagePath: null // Assuming this is the path to the current image
  };
  selectedFile: File | null = null;

  constructor(private _route: ActivatedRoute, 
    private equipmentService: EquipmentOrgService, 
    private router: Router) { }

  ngOnInit(): void {
    this.equipmentId = this._route.snapshot.params.equipmentId;

    // Get Equipment Details from Server
    this.equipmentService.getEquipment(this.equipmentId).subscribe(
      (data) => {
        this.equipment = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Update Equipment
  public updateEquipment() {
    if (this.equipment.equipmentName && this.equipment.equipmentCost) {
      const fileToSend: File | undefined = this.selectedFile || undefined;
      this.equipmentService.updateEquipment(
        this.equipment.equipmentId,
        this.equipment.equipmentName,
        this.equipment.equipmentCost,
        fileToSend
      ).subscribe( (data) => {
          Swal.fire('Success', 'Equipment updated successfully!', 'success');
          this.router.navigate(["organizer/venueDetails/" + this.equipment.venueId + "/showEquipments/" + this.equipment.venueId]);
        },
        (error) => {
          Swal.fire('Error', 'Error in updating Equipment', 'error');
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

  
     // Extracts the filename from a given file path.
     getImageFileName(path: string): string {
      const pathParts = path.split('/');
      const fileName = pathParts[pathParts.length - 1];
      return fileName;
    }

}
