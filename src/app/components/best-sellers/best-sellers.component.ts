import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { JarSvgComponent, JarIcon } from '../jar-svg/jar-svg.component';
import { StarIconComponent } from '../leaf-art/star-icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { WordRevealComponent } from '../reveal/word-reveal.component';
import { JarFlightService } from '../../services/jar-flight.service';

interface Stat {
  big: string;
  small: string;
}

interface Product {
  name: string;
  weight: string;
  price: string;
  mrp?: string;
  rating: string;
  reviews: number;
  badge?: string;
  badgeTone: 'green' | 'amber';
  jar: { icon: JarIcon; top: string; bottom: string; sub: string };
  tagline: string;
  stats: Stat[];
  footnote: string;
  tint: string;
}

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [JarSvgComponent, StarIconComponent, RevealDirective, WordRevealComponent],
  templateUrl: './best-sellers.component.html',
})
export class BestSellersComponent implements AfterViewInit {
  readonly starRow = [0, 1, 2, 3, 4];

  constructor(private el: ElementRef<HTMLElement>, readonly flight: JarFlightService) {}

  readonly products: Product[] = [
    {
      name: 'Moringa Powder',
      weight: '100g / 200g',
      price: '₹199',
      rating: '4.8',
      reviews: 214,
      badge: 'Best Seller',
      badgeTone: 'green',
      jar: { icon: 'moringa', top: '#9dbb83', bottom: '#6f9a5c', sub: 'Pure leaf powder' },
      tagline: 'A Spoonful of Superpower',
      stats: [
        { big: '17x', small: 'Calcium than Milk' },
        { big: '9x', small: 'Vitamin A than Carrots' },
        { big: '3x', small: 'Potassium than Bananas' },
        { big: '4x', small: 'Vitamin C than Oranges' },
      ],
      footnote: 'Complete plant protein · gram for gram',
      tint: '#eef3e6',
    },
    {
      name: 'Amla Powder',
      weight: '200g',
      price: '₹275.54',
      mrp: '₹599',
      rating: '4.7',
      reviews: 168,
      badge: '−54%',
      badgeTone: 'amber',
      jar: { icon: 'amla', top: '#d3c98f', bottom: '#b3a05e', sub: 'Whole fruit powder' },
      tagline: 'The Vitamin C Powerhouse',
      stats: [
        { big: '20x', small: 'Vitamin C than Oranges' },
        { big: '100%', small: 'Whole fruit, nothing added' },
        { big: '★', small: 'Skin & hair support' },
      ],
      footnote: 'Sun-dried · sour by nature',
      tint: '#f5eedd',
    },
    {
      name: 'ABC Powder',
      weight: '200g',
      price: '₹499',
      mrp: '₹599',
      rating: '4.9',
      reviews: 302,
      badge: '−17%',
      badgeTone: 'amber',
      jar: { icon: 'abc', top: '#d98a8f', bottom: '#b95f6d', sub: 'Apple · Beetroot · Carrot' },
      tagline: 'Three Plants, One Scoop',
      stats: [
        { big: '3-in-1', small: 'Apple · Beetroot · Carrot' },
        { big: '★', small: 'Natural stamina' },
        { big: '★', small: 'Glowing skin' },
      ],
      footnote: 'How to use: 2 tsp in water or milk, daily',
      tint: '#f6e8e4',
    },
  ];

  cardRotate(i: number): number {
    return i === 1 ? 0 : i === 0 ? -3 : 3;
  }

  cardDelay(i: number): number {
    return i * 0.16;
  }

  ngAfterViewInit(): void {
    const amlaSlot = this.el.nativeElement.querySelector<HTMLElement>('#product-jar-amla');
    if (amlaSlot) {
      this.flight.registerEnd(amlaSlot);
    }
  }

  /** The Amla card's own jar stays hidden until the flying jar has docked. */
  jarSlotOpacity(icon: JarIcon): number {
    return icon === 'amla' && this.flight.progress() < 1 ? 0 : 1;
  }
}
