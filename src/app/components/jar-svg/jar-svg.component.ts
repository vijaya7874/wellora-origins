import { Component, input } from '@angular/core';

let uidCounter = 0;

export type JarIcon = 'moringa' | 'amla' | 'abc';

@Component({
  selector: 'app-jar-svg',
  standalone: true,
  templateUrl: './jar-svg.component.html',
})
export class JarSvgComponent {
  readonly powderTop = input.required<string>();
  readonly powderBottom = input.required<string>();
  readonly label = input.required<string>();
  readonly sub = input.required<string>();
  readonly icon = input.required<JarIcon>();
  readonly className = input<string>('');

  readonly uid = `${uidCounter++}`;

  get gradId(): string {
    return `powder-${this.icon()}-${this.uid}`;
  }

  get glassId(): string {
    return `glass-${this.icon()}-${this.uid}`;
  }
}
