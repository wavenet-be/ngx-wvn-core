import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * Url used to redirect the user when not authenticated
   */
  loginRedirectUrl: string = '/login';
  /**
   * Url used to redirect the user when forbidden (missing role)
   */
  forbiddenRedirectUrl: string = '/forbidden';

  /**
   * Logged user
   */
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  /**
   * Check if the user is authenticated
   * @return true if the user is authenticated
   */
  isAuthenticated(): boolean {
    return this.user.value != null;
  };

  /**
   * Check if a user has a any of given roles
   * @param roles the roles to test
   * @return true if the user has any of the given roles
   */
  hasAnyRole(roles: Array<string>) : boolean{
    return this.user.value && this.user.value.roles && roles.some(r => this.hasRole(r));
  }

  /**
   * Check if a user has a given role
   * @param role the role to test
   * @return true if the user has the given role
   */
  hasRole(role: string) : boolean{
    return this.user.value && this.user.value.roles.indexOf(role) != -1;
  }

  /**
   * Clear the current logged user if any
   */
  clear():void{
    this.user.next(null);
  }
}
