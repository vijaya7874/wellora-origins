import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'app-word-reveal',
  standalone: true,
  host: {
    style: 'display: inline-block;',
  },
  template: `
    @for (w of words(); track $index) {
      <span class="word-reveal-mask">
        <span class="word-reveal-word" [style.--word-delay]="wordDelay($index) + 's'">{{ w }}&nbsp;</span>
      </span>
    }
  `,
})
export class WordRevealComponent implements OnInit, OnDestroy {
  readonly text = input.required<string>();
  readonly delay = input<number>(0);
  readonly stagger = input<number>(0.07);

  readonly words = computed(() => this.text().split(' '));

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  wordDelay(i: number): number {
    return this.delay() + i * this.stagger();
  }

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
