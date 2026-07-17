import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { JarSvgComponent } from '../jar-svg/jar-svg.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { WordRevealComponent } from '../reveal/word-reveal.component';

interface Step {
  n: string;
  title: string;
  text: string;
  side: 'left' | 'right';
}

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [JarSvgComponent, RevealDirective, WordRevealComponent],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss',
})
export class ProcessComponent implements AfterViewInit, OnDestroy {
  @ViewChild('growLine') growLineRef?: ElementRef<HTMLElement>;
  @ViewChild('jarReveal') jarRevealRef?: ElementRef<HTMLElement>;
  private observers: IntersectionObserver[] = [];

  readonly steps: Step[] = [
    {
      n: '01',
      title: 'Choose your plant',
      text: 'Every jar names a single plant — moringa, amla, or the ABC trio. Then it stops. Nothing added.',
      side: 'left',
    },
    {
      n: '02',
      title: 'Harvest at peak',
      text: 'Leaves and fruits are picked from trusted Guntur farms at peak potency, never before.',
      side: 'right',
    },
    {
      n: '03',
      title: 'Gentle processing',
      text: 'Shade-dried and stone-milled in small batches. Low heat keeps taste, aroma and nutrition intact.',
      side: 'left',
    },
    {
      n: '04',
      title: 'Straight to you',
      text: 'Sealed fresh the same week and shipped to your kitchen — farm to family, with no middlemen.',
      side: 'right',
    },
  ];

  ngAfterViewInit(): void {
    this.observeReveal(this.growLineRef?.nativeElement, '-100px');
    this.observeReveal(this.jarRevealRef?.nativeElement, '-120px');
  }

  private observeReveal(node: HTMLElement | undefined, rootMargin: string): void {
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('is-visible');
            observer.unobserve(node);
          }
        }
      },
      { threshold: 0.1, rootMargin }
    );
    observer.observe(node);
    this.observers.push(observer);
  }

  ngOnDestroy(): void {
    this.observers.forEach((o) => o.disconnect());
  }
}
