import { Component, input } from '@angular/core';

@Component({
  selector: 'app-leaf-branch',
  standalone: true,
  template: `
    <svg [attr.class]="className()" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path d="M60 112 C58 80, 58 46, 62 10" [attr.stroke]="color()" stroke-width="3" stroke-linecap="round" />
      <path d="M60 92 C44 90, 32 80, 28 62 C46 64, 58 74, 60 92 Z" [attr.fill]="color()" />
      <path d="M61 72 C77 70, 89 60, 93 42 C75 44, 63 54, 61 72 Z" [attr.fill]="color()" opacity=".85" />
      <path d="M60 50 C46 47, 37 39, 34 24 C49 27, 58 35, 60 50 Z" [attr.fill]="color()" opacity=".7" />
      <path d="M62 32 C73 28, 80 21, 83 8 C71 11, 64 19, 62 32 Z" [attr.fill]="color()" opacity=".55" />
    </svg>
  `,
})
export class LeafBranchComponent {
  readonly className = input<string>('');
  readonly color = input<string>('#6ea877');
}
