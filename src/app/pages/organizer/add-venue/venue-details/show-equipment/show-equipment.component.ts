import { EquipmentOrgService } from './../../../../../services/organizerService/eventServiceOrg/equipment-org.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventOrgService } from 'src/app/services/organizerService/eventServiceOrg/event-org.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-equipment',
  templateUrl: './show-equipment.component.html',
  styleUrls: ['./show-equipment.component.css']
})
export class ShowEquipmentComponent implements OnInit {

  equipments: any;
  venueId = 0;

  constructor(private _route: ActivatedRoute, private equipmentService: EquipmentOrgService) { }

  ngOnInit(): void {
    this.venueId = this._route.snapshot.params['venueId'];
    this.equipmentService.getEquipmentsByVenueId(this.venueId).subscribe(
      (equipments) => {
        this.equipments = equipments;
      },
      (error) => {
        alert("Something went wrong");
      }
    );
  }

  public deleteEquipment(equipmentId: any) {
    this.equipmentService.deleteEquipment(equipmentId).subscribe(
      (data) => {
        this.equipments = this.equipments.filter((equipment: any) => equipment.equipmentId != equipmentId);
      },
      (error) => {
        Swal.fire("Error", "Error in deleting Equipment", "error");
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
