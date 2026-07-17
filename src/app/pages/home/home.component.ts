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

// Module-level, not component state: only the very first Home mount in this
// browser tab (a hard refresh or first load) should defer a URL fragment.
// Subsequent in-app navigations back to Home should behave normally.
let hasBootstrapped = false;

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

  private pendingFragment: string | null = null;

  constructor() {
    // lock scroll while the intro plays — lock both html and body since
    // different browsers treat either as the actual scrolling container
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    if (!hasBootstrapped) {
      hasBootstrapped = true;
      const hash = window.location.hash?.slice(1);
      if (hash) {
        // A direct/refreshed load landed with e.g. #contact or #about in
        // the URL. Rather than race the browser's/router's native
        // scroll-to-fragment behavior, strip the hash from the URL right
        // away so there's nothing for either to auto-scroll to. The intro
        // always plays from the Hero first; the fragment is restored and
        // acted on manually once it finishes.
        this.pendingFragment = hash;
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      window.scrollTo(0, 0);
    }
  }

  onReveal(): void {
    this.started.set(true);
  }

  onDone(): void {
    // Re-assert top position in case anything scrolled underneath while
    // the intro had the page locked, then release the lock.
    window.scrollTo(0, 0);
    this.loading.set(false);
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    if (this.pendingFragment) {
      const targetId = this.pendingFragment;
      this.pendingFragment = null;
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${targetId}`);
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  }

  ngOnDestroy(): void {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }
}
