import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentOrgService } from './../../../../services/organizerService/eventServiceOrg/equipment-org.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {

  equipment: any = {
    equipmentName: '',
    equipmentCost: null,
    venueId: 0
  };
  selectedFile: File | null = null;

  constructor(private eqService: EquipmentOrgService, private _route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.equipment.venueId = this._route.snapshot.params['venueId'];
  }

  addEquipment() {
    if (this.equipment.equipmentName && this.equipment.equipmentCost && this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('equipmentName', this.equipment.equipmentName);
      formData.append('equipmentCost', this.equipment.equipmentCost.toString());
      formData.append('venueId', this.equipment.venueId.toString());
      formData.append('image', this.selectedFile);

      this.eqService.addNewEquipment(formData).subscribe(
        (data) => {
          Swal.fire('Success', 'Equipment added successfully!', 'success');
          this.router.navigate(["organizer/venueDetails/" + this.equipment.venueId + "/showEquipments/" + this.equipment.venueId]);
        },
        (error) => {
          Swal.fire("Error", "Problem in adding Equipment", "error");
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
