import { Component } from '@angular/core';
import { SproutLogoComponent } from '../leaf-art/sprout-logo.component';
import { RevealDirective } from '../../directives/reveal.directive';

interface FooterCol {
  title: string;
  items: string[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SproutLogoComponent, RevealDirective],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly cols: FooterCol[] = [
    {
      title: 'Contact',
      items: [
        'welloraorigins.co@gmail.com',
        '+91 90143 02248',
        'Guntur, Andhra Pradesh, India – 522409',
        'All Days · 9:00am – 8:00pm',
      ],
    },
    { title: 'Quick Links', items: ['Shop', 'About', 'Contact', 'Blog'] },
    {
      title: 'Policy',
      items: ['Terms & Conditions', 'Privacy Policy', 'Return & Refund Policy', 'Shipping Policy'],
    },
    { title: 'Follow', items: ['Instagram', 'YouTube'] },
  ];

  colDelay(i: number): number {
    return i * 0.1;
  }

  onSubscribe(e: Event): void {
    e.preventDefault();
  }
}
