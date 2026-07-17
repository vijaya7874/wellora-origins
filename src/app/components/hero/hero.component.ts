import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  computed,
  input,
  signal,
} from '@angular/core';
import { LeafBranchComponent } from '../leaf-art/leaf-branch.component';
import { SingleLeafComponent } from '../leaf-art/single-leaf.component';
import { StarIconComponent } from '../leaf-art/star-icon.component';
import { JarSvgComponent } from '../jar-svg/jar-svg.component';
import { JarFlightService } from '../../services/jar-flight.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LeafBranchComponent, SingleLeafComponent, StarIconComponent, JarSvgComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  readonly started = input<boolean>(false);

  @ViewChild('jarAnchor') jarAnchorRef?: ElementRef<HTMLElement>;

  readonly stars = [0, 1, 2, 3, 4];

  // mouse parallax (normalized -0.5..0.5 within the section)
  private readonly mx = signal(0);
  private readonly my = signal(0);

  readonly jarTransform = computed(() => `translate(${this.mx() * 26}px, ${this.my() * 18}px)`);
  readonly leafTransform = computed(() => `translate(${this.mx() * -30}px, ${this.my() * -20}px)`);
  readonly leafJarTransform = computed(() => `translate(${this.mx() * -30}px, ${this.my() * 18}px)`);
  readonly jarLeafTransform = computed(() => `translate(${this.mx() * 26}px, ${this.my() * -20}px)`);

  // hides the resting hero jar once the flying-jar overlay takes over,
  // while still respecting the original entrance reveal
  readonly jarAnchorOpacity = computed(() => {
    if (!this.started()) return 0;
    return this.flight.progress() > 0 ? 0 : 1;
  });

  constructor(private el: ElementRef<HTMLElement>, private flight: JarFlightService) {}

  ngAfterViewInit(): void {
    if (this.jarAnchorRef) {
      this.flight.registerStart(this.jarAnchorRef.nativeElement);
    }
  }

  onMouseMove(e: MouseEvent): void {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.mx.set((e.clientX - r.left) / r.width - 0.5);
    this.my.set((e.clientY - r.top) / r.height - 0.5);
  }

  /**
   * The "Shop our superfoods" button is a nav-style jump, same as the
   * navbar's Shop link: snap the jar straight to its docked state (no
   * mid-air animation) instead of letting the anchor-jump scroll leave it
   * stranded partway through an interpolation.
   */
  onShopCtaClick(event: Event): void {
    event.preventDefault();
    this.flight.jumpTo(1);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  starDelay(i: number): string {
    return `${1.65 + i * 0.09}s`;
  }
}
