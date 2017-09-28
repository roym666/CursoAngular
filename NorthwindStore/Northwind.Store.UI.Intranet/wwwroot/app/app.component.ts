import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { AuthService } from './user/auth.service';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})
export class AppComponent {
    loading: boolean;

    constructor(private authService:AuthService, private router: Router) {
        this.router.events.subscribe((routerEvent: Event) => {
            if (routerEvent instanceof NavigationStart) {
                this.loading = true;
                console.log('inicio navegacion');
            }

            if (routerEvent instanceof NavigationEnd ||
                routerEvent instanceof NavigationCancel ||
                routerEvent instanceof NavigationError) {
                this.loading = false;
            }
        });
    }

    goHome(): void {
        this.router.navigate(['/home']);
    }
}
