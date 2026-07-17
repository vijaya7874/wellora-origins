import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { JarSvgComponent } from '../../components/jar-svg/jar-svg.component';
import { CartService } from '../../services/cart.service';

type PaymentMethod = 'card' | 'upi' | 'cod';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, RouterLink, NavbarComponent, FooterComponent, JarSvgComponent],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  readonly orderPlaced = signal(false);
  readonly orderNumber = signal('');
  readonly placing = signal(false);

  readonly form = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi' as PaymentMethod,
  };

  constructor(readonly cart: CartService) {}

  readonly paymentMethods: { id: PaymentMethod; label: string }[] = [
    { id: 'upi', label: 'UPI' },
    { id: 'card', label: 'Card' },
    { id: 'cod', label: 'Cash on delivery' },
  ];

  setPayment(method: PaymentMethod): void {
    this.form.paymentMethod = method;
  }

  placeOrder(ngForm: NgForm): void {
    if (ngForm.invalid || this.cart.items().length === 0) {
      Object.values(ngForm.controls).forEach((c) => c.markAsTouched());
      return;
    }

    this.placing.set(true);
    // simulate a brief processing delay, same as a real payment round-trip
    setTimeout(() => {
      const rand = Math.floor(100000 + Math.random() * 900000);
      this.orderNumber.set(`WO-${rand}`);
      this.orderPlaced.set(true);
      this.placing.set(false);
      this.cart.clear();
    }, 900);
  }
}
