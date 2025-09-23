import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../types/users';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);

  currentUser = signal<User | null>(null);
  base_url = "http://localhost:5201/api/"

  login(creds: Observable<User>){
    return this.http.post<User>(this.base_url + "account/login", creds).pipe(
      tap(user => {
        if(user){
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem("user");
    this.currentUser.set(null);
  }
}