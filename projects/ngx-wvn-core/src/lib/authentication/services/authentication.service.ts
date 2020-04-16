import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  redirectUrl: string = '/account/login';

  roles: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>(null);

  isAuthenticated(): boolean {
    return this.roles.value != null;
  };

  hasAnyRole(roles: Array<string>) {
    return this.roles.value && roles.some(r => this.hasRole(r));
  }

  hasRole(role: string) {
    return this.roles.value && this.roles.value.indexOf(role) != -1;
  }
}
