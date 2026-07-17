import { Component, input } from '@angular/core';

@Component({
  selector: 'app-single-leaf',
  standalone: true,
  template: `
    <svg [attr.class]="className()" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path d="M30 52 C14 44, 8 28, 12 8 C32 12, 46 26, 30 52 Z" [attr.fill]="color()" />
      <path d="M30 52 C26 36, 22 24, 14 12" stroke="#faf7ef" stroke-width="2" stroke-linecap="round" opacity=".7" />
    </svg>
  `,
})
export class SingleLeafComponent {
  readonly className = input<string>('');
  readonly color = input<string>('#9ec49a');
}
