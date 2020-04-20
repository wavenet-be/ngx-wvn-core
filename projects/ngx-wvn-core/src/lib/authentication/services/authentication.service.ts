import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loginRedirectUrl: string = '/login';
  forbiddenRedirectUrl: string = '/forbidden';

  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  isAuthenticated(): boolean {
    return this.user.value != null;
  };

  hasAnyRole(roles: Array<string>) {
    return this.user.value && this.user.value.roles && roles.some(r => this.hasRole(r));
  }

  hasRole(role: string) {
    return this.user.value && this.user.value.roles.indexOf(role) != -1;
  }

  clear() {
    this.user.next(null);
  }
}
