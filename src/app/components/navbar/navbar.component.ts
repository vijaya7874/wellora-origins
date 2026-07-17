import { Component, HostListener, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SproutLogoComponent } from '../leaf-art/sprout-logo.component';
import { CartService } from '../../services/cart.service';
import { JarFlightService } from '../../services/jar-flight.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SproutLogoComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly started = input<boolean>(false);

  readonly links = ['Home', 'Shop', 'About', 'Contact'];
  readonly scrolled = signal(false);
  readonly open = signal(false);

  constructor(readonly cart: CartService, private flight: JarFlightService, private router: Router) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  /**
   * "Home" and "Shop" both get special handling: each jumps the flying-jar
   * effect straight to its resting state (jar sitting in the Hero, or jar
   * docked in the Amla card) with no mid-air animation, then just scrolls
   * there normally. The flight itself only ever plays for genuine
   * hand-scrolling — see JarFlightService.
   */
  onNavLinkClick(event: Event, label: string): void {
    if (label === 'Home') {
      event.preventDefault();
      this.closeMenu();
      this.flight.jumpTo(0);

      if (this.router.url.split(/[?#]/)[0] !== '/') {
        this.router.navigate(['/']);
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (label === 'Shop') {
      event.preventDefault();
      this.closeMenu();
      this.flight.jumpTo(1);

      if (this.router.url.split(/[?#]/)[0] !== '/') {
        this.router.navigate(['/'], { fragment: 'shop' });
        return;
      }
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMenu(): void {
    this.open.update((v) => !v);
  }

  closeMenu(): void {
    this.open.set(false);
  }

  linkDelay(i: number): string {
    return `${0.35 + i * 0.08}s`;
  }

  navClasses(): string {
    return this.scrolled()
      ? 'bg-cream/85 shadow-[0_10px_40px_-18px_rgba(18,38,26,.35)] backdrop-blur-xl'
      : 'bg-transparent';
  }

  underlineClasses(i: number): string {
    return i === 0
      ? 'absolute -bottom-1.5 left-0 h-[2px] w-full origin-left bg-forest transition-transform duration-300 ease-in-out scale-x-100'
      : 'absolute -bottom-1.5 left-0 h-[2px] w-full origin-left bg-forest transition-transform duration-300 ease-in-out scale-x-0 group-hover:scale-x-100';
  }
}
