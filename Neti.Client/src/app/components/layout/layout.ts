import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit, OnDestroy {
  private subscription?: Subscription;
  private baseTitle = 'Neti';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    // Get title from current route data
    this.updateTitle();

    // Listen to route changes
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle();
      });
  }

  private updateTitle() {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    route.data.subscribe(data => {
      const title = data['title'];
      if (title) {
        this.titleService.setTitle(`${title} - ${this.baseTitle}`);
      } else {
        this.titleService.setTitle(this.baseTitle);
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
