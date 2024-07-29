import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminBookingServiceService } from 'src/app/services/adminService/adminBookingService/admin-booking-service.service';
import { HistoryService } from './../../../services/userService/history.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  stripe: any;
  card: any;

  bookingId: any;
  booking: any;

  constructor(private _route: ActivatedRoute, private bookingService: AdminBookingServiceService,
              private historyService: HistoryService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.bookingId = this._route.snapshot.params.bookingId;

    this.bookingService.bookingDetail(this.bookingId).subscribe(
      (data) => {
        this.booking = data;
      }, (error) => {
        Swal.fire("Error", "There is error while loading Booking Detail", "error");
      }
    );

    // Load Stripe
    this.stripe = await loadStripe('pk_test_51PXNaoRrHtGf4fJZoNDxVB2RMyfspDjKXKLzbBg5nsPP6TypOxG3QVxin9sZMK8yHWce5zQY0NY2UNzw4dw7mOh000p2fBudWb');

    // Create an instance of Elements
    const elements = this.stripe.elements();

    // Create an instance of the card Element
    this.card = elements.create('card');

    // Add an instance of the card Element into the `card-element` <div>
    this.card.mount('#card-element');
  }

  async doPayment() {
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.error(error);
      Swal.fire("Error", "Failed to create payment token", "error");
    } else {
      Swal.fire({ icon: 'info', title: 'Pay For Booking', confirmButtonText: 'Yes', showCancelButton: true }).then(
        (result) => {
          if (result.isConfirmed) {
            const amount = this.booking.totalCost; // Make sure the amount is correct
            this.historyService.doPayment(this.bookingId, token.id, amount).subscribe(
              (data) => {
                Swal.fire("Success", "Payment processed successfully", "success").then(() => {
                  this.router.navigate(['/user/bookingHistory']);
                });
              }, (error) => {
                Swal.fire("Success", "Payment processed successfully", "success").then(() => {
                  this.router.navigate(['/user/bookingHistory']);
                });              }
            );
          }
        }
      );
    }
  }



}
