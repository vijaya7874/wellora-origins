import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sprout-logo',
  standalone: true,
  template: `
    <svg [attr.class]="className()" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 28 C16 20, 16 14, 16 8" [attr.stroke]="color()" stroke-width="2.2" stroke-linecap="round" />
      <path d="M16 16 C10 16, 6 12, 5 6 C11 6, 15 10, 16 16 Z" [attr.fill]="color()" />
      <path d="M16 12 C20 12, 25 9, 27 3 C21 3, 17 7, 16 12 Z" fill="#9ec49a" />
      <path d="M16 22 C12 22, 9 20, 8 16 C12 16, 15 18, 16 22 Z" [attr.fill]="color()" opacity=".75" />
      <path d="M16 22 C20 22, 23 20, 24 16 C20 16, 17 18, 16 22 Z" fill="#9ec49a" opacity=".8" />
    </svg>
  `,
})
export class SproutLogoComponent {
  readonly className = input<string>('');
  readonly color = input<string>('#6ea877');
}
