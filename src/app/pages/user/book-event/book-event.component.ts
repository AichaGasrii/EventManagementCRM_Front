import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodOrgService } from 'src/app/services/organizerService/eventServiceOrg/food-org.service';
import { VenueUserService } from './../../../services/userService/venuesUser/venue-user.service';
import { EventOrgService } from 'src/app/services/organizerService/eventServiceOrg/event-org.service';
import { EquipmentOrgService } from 'src/app/services/organizerService/eventServiceOrg/equipment-org.service';
import Swal from 'sweetalert2';
import { AuthServiceService } from 'src/app/services/User/auth/auth-service.service';
import { User } from 'src/app/services/User/auth/model';

@Component({
  selector: 'app-book-event',
  templateUrl: './book-event.component.html',
  styleUrls: ['./book-event.component.css']
})
export class BookEventComponent implements OnInit {
  user!: User;

  eventCost = 0;
  totalCost = 0;
  userName: any;
  booking: any = {
    bookingId: 0,
    venueId: "Select Venue",
    eventName: 'Select Event',
    date: null,
    guestCount: 0,
    eventCost: this.eventCost,
    totalCost: this.totalCost,
    paymentStatus: 'Pending',
    userName: null,
    selectedFoodItems: [],
    selectedEquipments: [],
  }
  event: any;
  places: any;
  venues: any;
  events: any;
  foodItems: any;
  equipments: any;
  equipmentCost = 0;
  foodCost = 0;
  helpCost = 0;
  reservedDates: string[] = []; // Reserved dates

  constructor(private venueUserService: VenueUserService,
              private eventService: EventOrgService,
              private foodService: FoodOrgService,
              private equipmentService: EquipmentOrgService,
              private login: AuthServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.getDate();

    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
      this.userName = this.user.userName;
      this.booking.userName = this.userName; // Ensure userName is set
      console.log('User loaded from localStorage:', this.user);
    }

    this.places = this.venueUserService.getAllPlaces().subscribe(
      (places) => {
        console.log(places);
        this.places = places;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  minDate: any;
  getDate() {
    var date = new Date();
    var toDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    if (toDate < 10) { toDate = '0' + toDate; }
    if (month < 10) { month = '0' + month; }
    var year = date.getFullYear();
    this.minDate = year + "-" + month + "-" + toDate;
  }

  // Get Venue for selected place
  public onSelectPlace(place: any) {
    console.log('Place selected:', place.target.value);

    this.booking.venueId = "Select Venue";
    this.booking.eventName = 'Select Event';
    this.booking.date = null;
    this.booking.guestCount = 0;
    this.foodItems = null;
    this.equipments = null;
    this.totalCost = 0;
    this.foodCost = 0;
    this.equipmentCost = 0;
    this.eventCost = 0;

    this.venueUserService.getVenueOfPlace(place.target.value).subscribe(
      (venues) => {
        this.venues = venues;
      }, (error) => {
        console.log(error);
      }
    );
  }

  // Get Components for selected Venue
  venueHasError = true;
  public onSelectVenue(venue: any) {
    if (venue.target.value === "Select Venue") {
      this.venueHasError = true;
    } else {
      this.venueHasError = false;
      // Get reserved dates for the selected venue
      this.venueUserService.getBookedDates().subscribe(
        (dates: Date[]) => {
          this.reservedDates = dates.map(date => new Date(date).toISOString().split('T')[0]);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    this.booking.eventName = 'Select Event';
    this.booking.date = null;
    this.booking.guestCount = 0;
    this.foodItems = null;
    this.equipments = null;
    this.totalCost = 0;
    this.foodCost = 0;
    this.equipmentCost = 0;
    this.eventCost = 0;

    // Events
    this.eventService.getEventsByVenueId(venue.target.value).subscribe(
      (events) => {
        this.events = events;
      },
      (error) => {
        alert("error in loading events");
      }
    );

    // Foods
    this.foodService.getFoodItemsByVenueId(venue.target.value).subscribe(
      (foodItems) => {
        this.foodItems = foodItems;
      },
      (error) => {
        alert("error in loading Food Items");
      }
    );

    // Equipments
    this.equipmentService.getEquipmentsByVenueId(venue.target.value).subscribe(
      (equipments) => {
        this.equipments = equipments;
      },
      (error) => {
        alert("error in loading Equipments");
      }
    );
  }

  eventName = '';
  eventHasError = true;
  // Event Selected Processes
  public onSelectedEvent(event: any) {
    console.log('Event selected:', event.target.value);

    if (event.target.value === "Select Event") {
      this.eventHasError = true;
    } else {
      this.eventHasError = false;
    }

    this.eventName = event.target.value;
    this.venueUserService.getEventByEventName(this.eventName, parseInt(this.booking.venueId)).subscribe(
      (event) => {
        console.log('Event details loaded:', event);

        this.event = event;
        this.eventCost = this.event.eventCost;
        this.booking.eventCost = this.eventCost;
      }
    );
  }

  // Selected Food Items
  public onSelectfoodItems(event: any, foodItem: any) {
    console.log('Food item selected:', foodItem.foodItemName, event.target.checked);

    if (event.target.checked) {
      this.booking.selectedFoodItems.push(foodItem.foodItemId);
      this.foodCost = this.foodCost + (foodItem.foodItemCost);
      this.booking.totalCost = this.totalCost + foodItem.foodItemCost;
    } else {
      this.booking.selectedFoodItems = this.booking.selectedFoodItems.filter((m: any) => m != foodItem.foodItemId);
      this.foodCost = this.foodCost - foodItem.foodItemCost;
      this.booking.totalCost = this.totalCost - foodItem.foodItemCost;
    }
    console.log('Selected food items:', this.booking.selectedFoodItems);
    console.log('Current food cost:', this.foodCost);
  }

  // Selected Equipments
  public onSelectEquipments(event: any, equipment: any) {
    console.log('Equipment selected:', equipment.equipmentName, event.target.checked);
    if (event.target.checked) {
      this.booking.selectedEquipments.push(equipment.equipmentId);
      console.log(this.booking.selectedEquipments);
      this.equipmentCost = this.equipmentCost + equipment.equipmentCost;
      this.booking.totalCost = this.totalCost + equipment.equipmentCost;
    } else {
      this.booking.selectedEquipments = this.booking.selectedEquipments.filter((m: any) => m != equipment.equipmentId);
      this.equipmentCost = this.equipmentCost - equipment.equipmentCost;
      this.booking.totalCost = this.totalCost - equipment.equipmentCost;
      console.log('Selected equipments:', this.booking.selectedEquipments);
      console.log('Current equipment cost:', this.equipmentCost);
    }
  }

  check: any;

  public validateDate(event: any): void {
    const selectedDate: string = event.target.value; // This should already be in 'yyyy-mm-dd' format
    if (this.reservedDates.includes(selectedDate)) {
      Swal.fire({
        icon: 'error',
        title: 'Ohh No',
        text: 'It seems that this date is already taken for this venue. Please try to choose another date or Venue',
        confirmButtonText: 'OK'
      });
      this.booking.date = null; // Reset the date field
    }
  }

  // Book Event
  public bookEvent() {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure  ?',
      confirmButtonText: 'Yes, Book',
      showCancelButton: true
    }).then(
      (result) => {
        if (result.isConfirmed) {
          console.log('Booking event:', this.booking);

          this.booking.selectedFoodItems = this.booking.selectedFoodItems.toString();
          this.booking.selectedEquipments = this.booking.selectedEquipments.toString();

          this.venueUserService.bookEvent(this.booking).subscribe(
            (data) => {

              this.check = data;
              if (this.check =data) {
                this.router.navigate(['user/payMessage']);
              } else if (this.check == 0) {
                Swal.fire("Ohh No", "It seems that this date is already taken for this venue" +
                  " Please try to choose another date or Venue ", "error")
              }
              console.log("check is " + this.check);

            }, (error) => {
              Swal.fire("Sorry", "There is an error while Booking this Event", "error");
              console.error('Error booking event:', error);
            }
          );
        }
      });
  }

  // Extracts the filename from a given file path.
  getImageFileName(path: string): string {
    const pathParts = path.split('/');
    const fileName = pathParts[pathParts.length - 1];
    return fileName;
  }
}
