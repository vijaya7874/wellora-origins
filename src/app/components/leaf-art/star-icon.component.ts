import { Component, input } from '@angular/core';

@Component({
  selector: 'app-star-icon',
  standalone: true,
  template: `
    <svg [attr.class]="className()" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 1.5 L12.4 6.9 L18.2 7.5 L13.9 11.4 L15.2 17.1 L10 14.2 L4.8 17.1 L6.1 11.4 L1.8 7.5 L7.6 6.9 Z" />
    </svg>
  `,
})
export class StarIconComponent {
  readonly className = input<string>('');
}
