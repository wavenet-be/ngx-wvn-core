export interface User {

  /**
   * Identifier / Username
   */
  userId: any;
  /**
   * Security roles
   */
  roles: Array<string>;
  /**
   * Email address
   */
  email?: string;
  /**
   * Firstname
   */
  firstName?: string;
  /**
   * Lastname
   */
  lastName?: string;
}
