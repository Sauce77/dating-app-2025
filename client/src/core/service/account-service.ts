import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../types/users';
import { Observable, tap } from 'rxjs';
import { RegisterCreds } from '../../types/registerCreds';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);

  currentUser = signal<User | null>(null);
  base_url = "http://localhost:5201/api/"


  register(creds: RegisterCreds) {
    return this.http.post<User>(this.base_url + "account/register", creds)
  }


  login(creds: Observable<User>){
    return this.http.post<User>(this.base_url + "account/login", creds).pipe(
      tap(user => {
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem("user");
    this.currentUser.set(null);
  }

  setCurrentUser(user: User){
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUser.set(user);
  }
}