import { Component, inject } from '@angular/core';
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

  login(): void{
   this.accountService.login(this.creds).subscribe({
    next: response => console.log(JSON.stringify(response)),
    error: error => alert(error.message)
   })
  }
}
