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
 *
 * The flight only plays for genuine user-driven scrolling (wheel/touch/
 * keyboard). Any navigation-triggered scroll (nav links, programmatic
 * scrollIntoView, browser back/forward) skips straight to the resting state
 * instead — see `jumpTo()`.
 */
@Injectable({ providedIn: 'root' })
export class JarFlightService {
  readonly startEl = signal<HTMLElement | null>(null);
  readonly endEl = signal<HTMLElement | null>(null);
  readonly progress = signal(0);

  /** false while a navigation-triggered scroll is suppressing the flight. */
  private manualScrollActive = true;

  constructor() {
    const resume = () => {
      this.manualScrollActive = true;
    };
    // Any of these indicate a real person is physically scrolling right now.
    window.addEventListener('wheel', resume, { passive: true });
    window.addEventListener('touchmove', resume, { passive: true });
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space', 'Home', 'End'].includes(e.code)) {
        resume();
      }
    });
  }

  registerStart(el: HTMLElement): void {
    this.startEl.set(el);
    // A fresh registration means Home just (re)mounted — start clean rather
    // than carrying over progress/suppression from a previous visit.
    this.manualScrollActive = true;
    this.progress.set(0);
  }

  registerEnd(el: HTMLElement): void {
    this.endEl.set(el);
  }

  /**
   * Recomputes flight progress (0..1) from the current scroll position.
   * 0  = jar still resting in the Hero.
   * 1  = jar has docked into the product card; the card's own jar takes over.
   * No-ops while a navigation jump is suppressing the flight.
   */
  update(): void {
    if (!this.manualScrollActive) return;

    const start = this.startEl();
    const end = this.endEl();
    if (!start || !end) return;

    const scrollY = window.scrollY;
    const vh = window.innerHeight || 1;

    const startTop = start.getBoundingClientRect().top + scrollY;
    const endTop = end.getBoundingClientRect().top + scrollY;

    // Flight begins once the hero jar is about to scroll past the upper third
    // of the viewport, and completes once the product card reaches the
    // vertical center of the viewport. Clamped to 0 so the flight can never
    // be considered "already underway" while the page is still at rest at
    // the very top.
    const flightStart = Math.max(0, startTop - vh * 0.35);
    const flightEnd = endTop - vh * 0.5;
    const range = Math.max(flightEnd - flightStart, 1);

    const raw = scrollY <= 0 ? 0 : (scrollY - flightStart) / range;
    this.progress.set(Math.min(1, Math.max(0, raw)));
  }

  /**
   * Called by navigation actions (nav-link clicks, programmatic scrolls,
   * route changes) instead of letting the scroll listener animate through
   * the flight. Immediately resolves to the resting state that matches
   * where the navigation is headed, and suppresses further updates until
   * the person actually scrolls by hand again.
   */
  jumpTo(resolvedProgress: 0 | 1): void {
    this.manualScrollActive = false;
    this.progress.set(resolvedProgress);
  }
}
