import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private http = inject(HttpClient);

  protected readonly title = signal('Dating App');

  ngOnInit(): void {
    this.http.get("http://localhost:5201/api/members").subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
      complete: () => console.log("Ahi esta tu pinche empanada, panzon pendejo")
    });
  }
}
