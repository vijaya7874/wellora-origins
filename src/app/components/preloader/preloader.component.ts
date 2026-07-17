import { Component, OnDestroy, OnInit, output, signal } from '@angular/core';

/**
 * Cinematic intro: dark screen -> glowing neon line draws itself like a pulse,
 * blooms into a sprout -> brand name reveals -> curtain lifts.
 * Angular port of the React Preloader (framer-motion timers replaced with setTimeout + signals).
 */
@Component({
  selector: 'app-preloader',
  standalone: true,
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss',
})
export class PreloaderComponent implements OnInit, OnDestroy {
  readonly reveal = output<void>();
  readonly done = output<void>();

  readonly leaving = signal(false);

  private t1?: ReturnType<typeof setTimeout>;
  private t2?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.t1 = setTimeout(() => {
      this.leaving.set(true);
      this.reveal.emit();
    }, 3000);
    this.t2 = setTimeout(() => this.done.emit(), 3900);
  }

  ngOnDestroy(): void {
    clearTimeout(this.t1);
    clearTimeout(this.t2);
  }
}
