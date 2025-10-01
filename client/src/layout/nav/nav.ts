import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/service/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected creds: any = {};
  protected accountService = inject(AccountService);
  private router = inject(Router)

  login(): void{
   this.accountService.login(this.creds).subscribe({
    next: response => {
      this.router.navigateByUrl("/members")
      this.creds = {};
    },
    error: error => alert(error.message)
   })
  }

  logout(): void{
    this.accountService.logout();
  }
}
