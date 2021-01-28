import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  private currentUser: User = null;

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public loadUser(): Promise<any> {
    console.debug("loadUser", environment.YUCCA_USER_INFO_URL)
    return new Promise((resolve, reject) => {
      this.httpClient.get<User>(environment.YUCCA_USER_INFO_URL).subscribe((response: User) => {
        console.debug("AUTH SERVICE", response);
        this.currentUser = response;
        resolve(true);
      });
    });
  }

  public logout() {
    // return this.httpClient.get<any>(environment.YUCCA_USER_LOGOUT_URL);
    return;
  }
}
