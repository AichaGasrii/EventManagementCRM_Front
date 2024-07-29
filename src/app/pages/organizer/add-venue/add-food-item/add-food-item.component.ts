import { FoodOrgService } from 'src/app/services/organizerService/eventServiceOrg/food-org.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.css']
})
export class AddFoodItemComponent implements OnInit {

  foodItem = {
    foodItemName: '',
    foodItemCost: null,
    venueId: 0
  };
  selectedFile: File | null = null;

  constructor(
    private _route: ActivatedRoute,
    private foodItemService: FoodOrgService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.foodItem.venueId = this._route.snapshot.params['venueId'];
  }

  addFoodItem() {
    if (this.foodItem.foodItemName && this.foodItem.foodItemCost && this.selectedFile) {
      this.foodItemService.addFoodItem(
        this.foodItem.foodItemName,
        this.foodItem.foodItemCost,
        this.foodItem.venueId,
        this.selectedFile
      ).subscribe(
        (data) => {
          Swal.fire('Success', 'Food item added successfully!', 'success');
          this.router.navigate(["organizer/venueDetails/" + this.foodItem.venueId + "/showFoodItems/" + this.foodItem.venueId]);
        },
        (error) => {
          Swal.fire('Error', 'Problem in adding Food Item', 'error');
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
