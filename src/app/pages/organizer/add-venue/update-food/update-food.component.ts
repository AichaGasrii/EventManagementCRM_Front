import { FoodOrgService } from 'src/app/services/organizerService/eventServiceOrg/food-org.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html',
  styleUrls: ['./update-food.component.css']
})
export class UpdateFoodComponent implements OnInit {
  foodItemId = 0;
  foodItem: any = {
    foodItemName: null,
    foodItemCost: null,
    venueId: null,
    imagePath: null // Assuming this is the path to the current image
  };
  selectedFile: File | null = null;

  constructor(
    private _route: ActivatedRoute,
    private foodService: FoodOrgService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.foodItemId = this._route.snapshot.params.foodItemId;

    // Get Food Item Details from Server
    this.foodService.getFoodItem(this.foodItemId).subscribe(
      (data) => {
        this.foodItem = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Update Food Item
  public updateFoodItem() {
    if (this.foodItem.foodItemName && this.foodItem.foodItemCost) {
      const fileToSend: File | undefined = this.selectedFile || undefined;
      this.foodService.updateFoodItem(
        this.foodItem.foodItemId,
        this.foodItem.foodItemName,
        this.foodItem.foodItemCost,
        fileToSend
      ).subscribe(
        (data) => {
          Swal.fire('Success', 'Food item updated successfully!', 'success');
          this.router.navigate(["organizer/venueDetails/" + this.foodItem.venueId + "/showFoodItems/" + this.foodItem.venueId]);
        },
        (error) => {
          Swal.fire('Error', 'Error in updating Food Item', 'error');
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
