import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodItem } from 'src/app/Model/FoodItem';

@Injectable({
  providedIn: 'root'
})
export class FoodOrgService {
  private baseUrl = 'http://localhost:8083/gestionEvent/foodItem'; // Adjust the base URL according to your backend setup

  constructor(private http: HttpClient) { }

  getFoodItemsByVenueId(venueId: number): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.baseUrl}/getFoodItems/${venueId}`);
  }

  addFoodItem(foodItemName: string, foodItemCost: number, venueId: number, image: File): Observable<FoodItem> {
    const formData: FormData = new FormData();
    formData.append('foodItemName', foodItemName);
    formData.append('foodItemCost', foodItemCost.toString());
    formData.append('venueId', venueId.toString());
    formData.append('image', image);

    return this.http.post<FoodItem>(`${this.baseUrl}/add`, formData);
  }

  updateFoodItem(foodItemId: number, foodItemName: string, foodItemCost: number, image?: File): Observable<FoodItem> {
    const formData: FormData = new FormData();
    formData.append('foodItemId', foodItemId.toString());
    formData.append('foodItemName', foodItemName);
    formData.append('foodItemCost', foodItemCost.toString());
    if (image) {
      formData.append('image', image);
    }

    return this.http.put<FoodItem>(`${this.baseUrl}/updateFoodItem`, formData);
  }

  getFoodItem(foodItemId: number): Observable<FoodItem> {
    return this.http.get<FoodItem>(`${this.baseUrl}/getFoodItem/${foodItemId}`);
  }

  deleteFoodItem(foodItemId: number): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}/deleteFoodItem/${foodItemId}`);
  }
}
