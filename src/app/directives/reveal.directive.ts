import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  input,
} from '@angular/core';

/**
 * Fades + rises an element into view once it crosses the viewport threshold.
 * Angular equivalent of the React <Reveal> component (framer-motion whileInView).
 *
 * Usage: <div appReveal [delay]="0.2" [y]="44">...</div>
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  readonly delay = input<number>(0);
  readonly y = input<number>(44);
  readonly rotate = input<number>(0);
  readonly once = input<boolean>(true);

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    const node = this.el.nativeElement;
    this.renderer.addClass(node, 'reveal-init');
    this.renderer.setStyle(node, '--reveal-delay', `${this.delay()}s`);
    this.renderer.setStyle(node, '--reveal-y', `${this.y()}px`);
    this.renderer.setStyle(node, '--reveal-rotate', `${this.rotate()}deg`);

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(node, 'is-visible');
            if (this.once()) {
              this.observer?.unobserve(node);
            }
          } else if (!this.once()) {
            this.renderer.removeClass(node, 'is-visible');
          }
        }
      },
      { threshold: 0.1, rootMargin: '-80px' }
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
