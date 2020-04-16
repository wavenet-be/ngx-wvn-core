import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanLoad, CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkActivate(route, state);
  }

  canLoad(route: Route): boolean {
    return this.checkActivate(route);
  }

  constructor(private roleService: AuthenticationService, private router: Router) {
  }

  private checkActivate(route: Route | ActivatedRouteSnapshot, state?: RouterStateSnapshot): boolean | undefined {
    if (this.roleService.isAuthenticated()) {
      if (state) {
        this.router.navigate([this.roleService.redirectUrl], {queryParams: {returnUrl: state.url}});
      } else {
        this.router.navigate([this.roleService.redirectUrl]);
      }
      return false;
    }
    if (!route.data) {
      return true;
    }
    if (route.data.roles) {
      const expectedRoles: string[] = route.data.roles;
      if (this.roleService.hasAnyRole(expectedRoles)) {
        return true;
      }
    } else {
      return true;
    }
    if (route.data.redirectTo) {
      this.router.navigate([route.data.redirectTo]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
