import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css'
})
export class  TestErrors {
  private http = inject(HttpClient);
  baseUrl = "http://localhost:5201/api/";

  get400ValidationError(): void {
    this.http.post(this.baseUrl + "account/register", {}).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get400error(): void {
    this.http.get(this.baseUrl + "error/bad-request").subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get401error(): void {
    this.http.get(this.baseUrl + "error/auth").subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get404error(): void {
    this.http.get(this.baseUrl + "error/not-found").subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get500error(): void {
    this.http.get(this.baseUrl + "error/server-error").subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }
}
