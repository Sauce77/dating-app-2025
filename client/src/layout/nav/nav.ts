import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/service/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/service/toast-service';

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
  private toast = inject(ToastService)

  login(): void{
   this.accountService.login(this.creds).subscribe({
    next: response => {
      this.router.navigateByUrl("/members")
      this.creds = {};
      this.toast.success("Logged In", 2000)
    },
    error: error => {
      this.toast.error(error.error, 5000)
    }
   })
  }

  logout(): void{
    this.accountService.logout();
    this.router.navigateByUrl("")
    this.toast.info("Au revoir, putain!")
  }
}
