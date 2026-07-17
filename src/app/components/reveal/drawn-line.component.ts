import { Component, ElementRef, OnDestroy, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-drawn-line',
  standalone: true,
  template: '',
  host: {
    class: 'drawn-line',
    '[style.--line-delay]': `delay() + 's'`,
    '[class]': 'className()',
  },
})
export class DrawnLineComponent implements OnInit, OnDestroy {
  readonly delay = input<number>(0);
  readonly className = input<string>('');

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const node = this.el.nativeElement;
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('is-visible');
            this.observer?.unobserve(node);
          }
        }
      },
      { threshold: 0.1, rootMargin: '-60px' }
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
