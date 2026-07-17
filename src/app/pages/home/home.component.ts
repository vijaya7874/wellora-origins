import { Component, OnDestroy, signal } from '@angular/core';
import { PreloaderComponent } from '../../components/preloader/preloader.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { MarqueeComponent } from '../../components/marquee/marquee.component';
import { BestSellersComponent } from '../../components/best-sellers/best-sellers.component';
import { ProcessComponent } from '../../components/process/process.component';
import { WhyUsComponent } from '../../components/why-us/why-us.component';
import { StoryComponent } from '../../components/story/story.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FlyingJarComponent } from '../../components/flying-jar/flying-jar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PreloaderComponent,
    NavbarComponent,
    HeroComponent,
    MarqueeComponent,
    BestSellersComponent,
    ProcessComponent,
    WhyUsComponent,
    StoryComponent,
    FooterComponent,
    FlyingJarComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {
  readonly loading = signal(true);
  readonly started = signal(false);

  constructor() {
    // lock scroll while the intro plays
    document.body.style.overflow = 'hidden';
  }

  onReveal(): void {
    this.started.set(true);
  }

  onDone(): void {
    this.loading.set(false);
    document.body.style.overflow = '';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}
