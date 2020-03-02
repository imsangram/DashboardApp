import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "./_services/index";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    isLoggedIn$: Observable<boolean>;
    ngOnInit(): void {
        this.isLoggedIn$ = this.authenticationService.isSignedIn;
        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter((route) => route.outlet === 'primary')
            .mergeMap((route) => route.data)
            .subscribe((event) => {
                this.titleService.setTitle(event['title']);
            });
    }

    isLoggedIn: boolean;
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title) {

    }

}
