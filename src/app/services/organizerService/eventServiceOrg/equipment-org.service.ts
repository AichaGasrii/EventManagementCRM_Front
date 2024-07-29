import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from 'src/app/Model/Equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentOrgService {
  private baseUrl = 'http://localhost:8083/gestionEvent/equipment'; // Adjust the base URL according to your backend setup

  constructor(private _http: HttpClient) { }

  // Get Equipments by venue Id
   getEquipmentsByVenueId(venueId: number): Observable<Equipment[]> {
    return this._http.get<Equipment[]>(`${this.baseUrl}/getEquipments/${venueId}`);
  }

  // Add new Equipment to the database
   addNewEquipment(equipment: FormData): Observable<any> {
    return this._http.post(`${this.baseUrl}/add`, equipment);
  }

  // Delete Equipment
   deleteEquipment(equipmentId: number): Observable<number> {
    return this._http.delete<number>(`${this.baseUrl}/deleteEquipment/${equipmentId}`);
  }

  // Get a single Equipment
   getEquipment(equipmentId: number): Observable<Equipment> {
    return this._http.get<Equipment>(`${this.baseUrl}/getEquipment/${equipmentId}`);
  }

  
  updateEquipment(equipmentId: number, equipmentName: string, equipmentCost: number, image?: File): Observable<Equipment> {
    const formData: FormData = new FormData();
    formData.append('equipmentId', equipmentId.toString());
    formData.append('equipmentName', equipmentName);
    formData.append('equipmentCost', equipmentCost.toString());
    if (image) {
      formData.append('image', image);
    }

    return this._http.put<Equipment>(`${this.baseUrl}/updateEquipment`, formData);
  }


}
