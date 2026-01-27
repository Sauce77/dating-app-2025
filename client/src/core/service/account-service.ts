<<<<<<< HEAD
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCreds, User } from '../../types/users';
import { Observable, tap } from 'rxjs';
import { RegisterCreds } from '../../types/registerCreds';
=======
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/users'
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
>>>>>>> parcial03

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
<<<<<<< HEAD

  currentUser = signal<User | null>(null);
  base_url = "http://localhost:5201/api/"


  register(creds: RegisterCreds): Observable<User>{
    return this.http.post<User>(this.base_url + "account/register", creds).pipe(
      tap(user => {
        if(user){
=======
  currentUser = signal<User | null>(null);
  baseUrl = environment.apiUrl;

  register(creds: RegisterCreds): Observable<User> {
    return this.http.post<User>(this.baseUrl + "account/register", creds).pipe(
      tap(user => {
        if (user) {
>>>>>>> parcial03
          this.setCurrentUser(user);
        }
      })
    );
  }

<<<<<<< HEAD

  login(creds: LoginCreds): Observable<User> {
    return this.http.post<User>(this.base_url + "account/login", creds).pipe(
      tap(user => {
        if(user){
=======
  login(creds: LoginCreds): Observable<User> {
    return this.http.post<User>(this.baseUrl + "account/login", creds).pipe(
      tap(user => {
        if (user) {
>>>>>>> parcial03
          this.setCurrentUser(user);
        }
      })
    );
  }

<<<<<<< HEAD
=======
  setCurrentUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUser.set(user);
  }

>>>>>>> parcial03
  logout() {
    localStorage.removeItem("user");
    this.currentUser.set(null);
  }
<<<<<<< HEAD

  setCurrentUser(user: User){
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUser.set(user);
  }
=======
>>>>>>> parcial03
}