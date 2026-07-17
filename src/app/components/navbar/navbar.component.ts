import { Component, HostListener, input, signal } from '@angular/core';
import { SproutLogoComponent } from '../leaf-art/sprout-logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SproutLogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly started = input<boolean>(false);

  readonly links = ['Home', 'Shop', 'About', 'Contact'];
  readonly scrolled = signal(false);
  readonly open = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
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
