import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad, Router, Route } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate, CanLoad {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('LoginGuard.canActivate');
        return true;
    }

    canLoad(): boolean {
        console.log('LoginGuard.canLoad');
        return true;
    }
}
