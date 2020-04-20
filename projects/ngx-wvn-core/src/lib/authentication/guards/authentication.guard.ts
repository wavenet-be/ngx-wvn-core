import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanLoad, CanActivate, CanActivateChild {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkActivate(route, state);
  }

  canLoad(route: Route): boolean {
    return this.checkActivate(route);
  }

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return this.validateAuthenticationRequirement(state, childRoute);
  }

  private checkActivate(route: Route | ActivatedRouteSnapshot, state?: RouterStateSnapshot): boolean | undefined {
    return this.validateAuthenticationRequirement(state, route);
  }

  private validateAuthenticationRequirement(state: RouterStateSnapshot, route: Route | ActivatedRouteSnapshot) {
    if (!this.authenticationService.isAuthenticated()) {
      this.redirect(this.authenticationService.loginRedirectUrl, state);
      return false;
    }
    if (!route.data || !route.data.roles || this.authenticationService.hasAnyRole(route.data.roles)) {
      return true;
    }
    this.redirectForbidden(route, state);
    return false;
  }

  private redirectForbidden(route: Route | ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.data.redirectTo) {
      this.redirect(route.data.redirectTo, state);
    }
    this.redirect(this.authenticationService.forbiddenRedirectUrl, state);
  }

  private redirect(redirectUrl: string, state?: RouterStateSnapshot) {
    if (state) {
      this.router.navigate([redirectUrl], {queryParams: {returnUrl: state.url}});
    } else {
      this.router.navigate([redirectUrl]);
    }
  }
}
