import { AfterViewInit, Component, HostListener, computed } from '@angular/core';
import { NgStyle } from '@angular/common';
import { JarFlightService } from '../../services/jar-flight.service';
import { JarSvgComponent } from '../jar-svg/jar-svg.component';

@Component({
  selector: 'app-flying-jar',
  standalone: true,
  imports: [NgStyle, JarSvgComponent],
  templateUrl: './flying-jar.component.html',
  styleUrl: './flying-jar.component.scss',
})
export class FlyingJarComponent implements AfterViewInit {
  constructor(readonly flight: JarFlightService) {}

  ngAfterViewInit(): void {
    // let Hero/BestSellers finish registering their anchors first
    setTimeout(() => this.flight.update());
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onScroll(): void {
    this.flight.update();
  }

  readonly visible = computed(() => {
    const p = this.flight.progress();
    return p > 0.001 && p < 0.999;
  });

  readonly boxStyle = computed(() => {
    const start = this.flight.startEl();
    const end = this.flight.endEl();
    if (!start || !end) return {};

    const p = this.flight.progress();
    const sr = start.getBoundingClientRect();
    const er = end.getBoundingClientRect();

    const top = sr.top + (er.top - sr.top) * p;
    const left = sr.left + (er.left - sr.left) * p;
    const width = sr.width + (er.width - sr.width) * p;
    const height = sr.height + (er.height - sr.height) * p;

    return {
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  });
}
