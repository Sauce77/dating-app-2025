import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/service/account-service';
import { User } from '../types/users';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  protected router = inject(Router)

  protected readonly title = signal('Dating App');

  protected members = signal<User[]>([]);

  async ngOnInit(): Promise<void> {
    this.setCurrentUser();
    this.members.set(await this.getMembers());
  }

  setCurrentUser(){
    const userString = localStorage.getItem("user");
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async getMembers(): Promise<User[]>{
    try{
      return lastValueFrom(this.http.get<User[]>("http://localhost:5201/api/members"));
    } catch(error){
        console.log(error);
        throw error;
      }
  }
}
