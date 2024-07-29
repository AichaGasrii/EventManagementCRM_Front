import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodOrgService } from 'src/app/services/organizerService/eventServiceOrg/food-org.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-food',
  templateUrl: './show-food.component.html',
  styleUrls: ['./show-food.component.css']
})
export class ShowFoodComponent implements OnInit {

  foodItems: any;
  venueId = 0;

  constructor(private _route: ActivatedRoute, private foodService: FoodOrgService) { }

  ngOnInit(): void {
    this.venueId = this._route.snapshot.params['venueId'];
    this.foodService.getFoodItemsByVenueId(this.venueId).subscribe(
      (foodItems) => {
        this.foodItems = foodItems;
      },
      (error) => {
        alert("Something went wrong");
      }
    );
  }

  public deleteFoodItem(foodItemId: any) {
    this.foodService.deleteFoodItem(foodItemId).subscribe(
      (data) => {
        this.foodItems = this.foodItems.filter((foodItem: any) => foodItem.foodItemId != foodItemId);
      },
      (error) => {
        Swal.fire("Error", "Error in deleting Food Item", "error");
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
