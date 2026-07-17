import { Component, ElementRef, HostListener, computed, signal } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { WordRevealComponent } from '../reveal/word-reveal.component';
import { DrawnLineComponent } from '../reveal/drawn-line.component';

interface Palm {
  x: number;
  y: number;
  scale: number;
  delay: number;
}

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [RevealDirective, WordRevealComponent, DrawnLineComponent],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss',
})
export class StoryComponent {
  readonly palms: Palm[] = [
    { x: 130, y: 252, scale: 1.05, delay: 0.35 },
    { x: 282, y: 244, scale: 0.9, delay: 0.5 },
    { x: 420, y: 254, scale: 1.12, delay: 0.65 },
  ];

  readonly sunSpikes = Array.from({ length: 12 }, (_, i) => i);
  readonly cropRows = Array.from({ length: 6 }, (_, i) => i);

  private readonly progress = signal(0.5); // 0 = section below viewport, 1 = above

  readonly sunTransform = computed(() => `translateY(${(this.progress() - 0.5) * -60}px)`);
  readonly fieldTransform = computed(() => `translateY(${(this.progress() - 0.5) * -26}px)`);

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('window:scroll')
  onScroll(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    // 0 when section top is at viewport bottom, 1 when section bottom is at viewport top
    const p = 1 - Math.min(1, Math.max(0, (rect.top + rect.height) / (vh + rect.height)));
    this.progress.set(p);
  }

  palmTransform(p: Palm): string {
    return `translate(${p.x} ${p.y}) scale(${p.scale})`;
  }

  cropPath(i: number): string {
    return `M${-40 + i * 30} ${280 + i * 28} C 180 ${262 + i * 28}, 400 ${262 + i * 28}, 620 ${286 + i * 28}`;
  }
}
