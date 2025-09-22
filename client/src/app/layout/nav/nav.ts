import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/service/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected creds: any = {};
  private accountService = inject(AccountService);
  protected loggedIn = signal(false);

  login(): void{
   this.accountService.login(this.creds).subscribe({
    next: response => {
      console.log(JSON.stringify(response)),
      this.loggedIn.set(true)
    },
    error: error => alert(error.message)
   })
  }

  logout(): void{
    this.loggedIn.set(false);
  }
}
