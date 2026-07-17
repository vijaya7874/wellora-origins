import { Component, input } from '@angular/core';
import { SproutLogoComponent } from '../leaf-art/sprout-logo.component';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [SproutLogoComponent],
  templateUrl: './marquee.component.html',
})
export class MarqueeComponent {
  readonly dark = input<boolean>(true);

  readonly items = [
    '100% Natural',
    'No Added Sugar',
    'No Preservatives',
    'Small-Batch Made',
    'Farm to Family',
    'Single-Plant Jars',
    'Grown in Guntur',
  ];
}
