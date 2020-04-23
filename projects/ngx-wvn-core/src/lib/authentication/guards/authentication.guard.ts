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

  /**
   * Create a new authentication guard
   * @param authenticationService service providing current user identity
   * @param router
   */
  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }

  /**
   * Returns true if the route is not protected or if the user is logged and has required role(s)
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.validateAuthenticationRequirement(state, route);
  }

  /**
   * Returns true if the route is not protected or if the user is logged and has required role(s)
   * @param route
   */
  canLoad(route: Route): boolean {
    return this.validateAuthenticationRequirement(undefined, route);
  }

  /**
   * Returns true if the route is not protected or if the user is logged and has required role(s)
   * @param childRoute
   * @param state
   */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return this.validateAuthenticationRequirement(state, childRoute);
  }

  /**
   * Validate security requirements regarding authenticated user and route configuration
   * @param state
   * @param route
   */
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

  /**
   * Redirect in case the user is forbidden
   * @param route
   * @param state
   */
  private redirectForbidden(route: Route | ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.data.redirectTo) {
      this.redirect(route.data.redirectTo, state);
    }
    this.redirect(this.authenticationService.forbiddenRedirectUrl, state);
  }

  /**
   * Redirect the user to the given url
   * @param redirectUrl url of the page to which redirect the user
   * @param state
   */
  private redirect(redirectUrl: string, state?: RouterStateSnapshot) {
    if (state) {
      this.router.navigate([redirectUrl], {queryParams: {returnUrl: state.url}});
    } else {
      this.router.navigate([redirectUrl]);
    }
  }
}
