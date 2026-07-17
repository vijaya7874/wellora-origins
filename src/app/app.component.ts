import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // AppComponent is only ever constructed on a genuine full page load
    // (hard refresh, direct URL entry, bookmark) — in-app navigation via
    // routerLink swaps out the routed component but never recreates this
    // one. So this is exactly the right place to enforce "every hard
    // refresh starts at Home", regardless of what path was requested.
    if (window.location.pathname !== '/') {
      this.router.navigateByUrl('/');
    }
  }
}
