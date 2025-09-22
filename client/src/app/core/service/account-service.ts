import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);

  base_url = "http://localhost:5201/api/"

  login(creds: any){
    return this.http.post(this.base_url + "account/login", creds);
  }
}
