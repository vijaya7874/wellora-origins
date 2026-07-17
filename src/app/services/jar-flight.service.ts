import { Injectable, signal } from '@angular/core';

/**
 * Coordinates the "flying jar" effect: the featured jar in the Hero section
 * visually descends and docks into its matching product card in BestSellers
 * as the user scrolls between the two sections.
 *
 * Both the Hero (start anchor) and the BestSellers card for the same product
 * (end anchor) register their DOM element here. A single fixed-position
 * <app-flying-jar> overlay (rendered once at the page level) reads both rects
 * every scroll frame and interpolates between them.
 */
@Injectable({ providedIn: 'root' })
export class JarFlightService {
  readonly startEl = signal<HTMLElement | null>(null);
  readonly endEl = signal<HTMLElement | null>(null);
  readonly progress = signal(0);

  registerStart(el: HTMLElement): void {
    this.startEl.set(el);
  }

  registerEnd(el: HTMLElement): void {
    this.endEl.set(el);
  }

  /**
   * Recomputes flight progress (0..1) from the current scroll position.
   * 0  = jar still resting in the Hero.
   * 1  = jar has docked into the product card; the card's own jar takes over.
   */
  update(): void {
    const start = this.startEl();
    const end = this.endEl();
    if (!start || !end) return;

    const scrollY = window.scrollY;
    const vh = window.innerHeight || 1;

    const startTop = start.getBoundingClientRect().top + scrollY;
    const endTop = end.getBoundingClientRect().top + scrollY;

    // Flight begins once the hero jar is about to scroll past the upper third
    // of the viewport, and completes once the product card reaches the
    // vertical center of the viewport.
    const flightStart = startTop - vh * 0.35;
    const flightEnd = endTop - vh * 0.5;
    const range = Math.max(flightEnd - flightStart, 1);

    const raw = (scrollY - flightStart) / range;
    this.progress.set(Math.min(1, Math.max(0, raw)));
  }
}
