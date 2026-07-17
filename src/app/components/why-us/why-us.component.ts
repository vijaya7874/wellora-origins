import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { WordRevealComponent } from '../reveal/word-reveal.component';

interface WhyItem {
  title: string;
  text: string;
  d: string;
}

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [RevealDirective, WordRevealComponent],
  templateUrl: './why-us.component.html',
})
export class WhyUsComponent {
  readonly items: WhyItem[] = [
    {
      title: 'Naturally Sourced',
      text: 'Sourced from trusted farms following natural growing practices.',
      d: 'M12 21 C12 14, 12 9, 12 4 M12 13 C8 13, 5 10, 4.5 6 C8.5 6, 11.5 9, 12 13 Z M12 9 C14.5 9, 17 7, 18 3.5 C14.5 3.5, 12.5 6, 12 9 Z',
    },
    {
      title: 'Quality Processing',
      text: 'Prepared in small, controlled batches with strict hygiene.',
      d: 'M9 3 h6 M10 3 v5 L5 19 a2 2 0 0 0 2 2 h10 a2 2 0 0 0 2-2 L14 8 V3 M7.5 14 h9',
    },
    {
      title: 'Nothing Unnecessary',
      text: 'No added colours, sugar, preservatives, or artificial flavours.',
      d: 'M12 3 C7 9, 5 12, 5 15 a7 7 0 0 0 14 0 C19 12, 17 9, 12 3 Z M9.5 14.5 a2.5 2.5 0 0 0 2.5 2.5',
    },
    {
      title: 'Thoughtfully Made',
      text: 'Gentle, low-heat processing to retain taste, aroma and nutrition.',
      d: 'M12 20 C6 16, 3.5 12.5, 3.5 9.5 A4.5 4.5 0 0 1 12 6 a4.5 4.5 0 0 1 8.5 3.5 C20.5 12.5, 18 16, 12 20 Z',
    },
  ];

  cardRotate(i: number): number {
    return i % 2 === 0 ? -1.2 : 1.2;
  }

  cardDelay(i: number): number {
    return i * 0.12;
  }

  iconDelay(i: number): string {
    return `${0.35 + i * 0.15}s`;
  }
}
